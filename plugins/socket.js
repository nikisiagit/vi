/**
 * Socket Plugin
 *
 * This plugin injects a function into the context ($socket) that accepts the name of the
 * socket to return.
 *
 * Sockets available:
 *
 * - protected
 * - public
 * - admin

 * ```js
 * const socket = this.$socket(); // returns public or protected depending on Me state.
 *
 * const protected = this.$socket('protected');
 * const public = this.$socket('public');
 * const admin = this.$socket('admin');
 * ```
 *
 * If a name parameter is NOT supplied - this function will return either the 'public' or 'protected'
 * socket depending on the authentication state of the User.
 *
 *
 * ## Checking the Socket connected state.
 *
 * ```js
 * const socket = this.$socket();
 * const isConnected = socket.isConnected();
 * ```
 *
 * ## Connecting a Socket
 *
 * ```js
 * const socket = this.$socket();
 * await socket.connect();
 * ```
 *
 * ##
 * * * *
 *
 * ## Connecting a Socket (using store)
 *
 * Sockets are backed by the Sockets Store and can be using via calls to the Sockets Store.
 *
 * ```js
 * $sockets = store.dispatch('sockets/connect', {'admin'});
 * ```
 */
import SocketClient from "./../utils/socketClient"
import { getIdToken } from "@/utils/auth";

/**
 * The list of sockets.
 *
 * We dont actually put the Socket instances in the store.
 *
 * @type {{}}
 */
const sockets = {
  // the public socket
  public: undefined,

  // the protected socket
  protected: undefined,

  // the admin socket
  admin: undefined,
};


export default function ({store, $partition}, inject) {
  console.log("## SOCKET PLUGIN");
  console.log(`## SOCKET PLUGIN - INJECTING SOCKET FUNCTION`);


  const {region, rootDomain, name: partition} = $partition;

  /**
   * Create a new Socket instance.
   *
   * @param name {string} The name of the Socket.
   * @param url {string}  The ws(s) url
   * @param partition {string} Socket options
   * @returns {SocketClient}
   */
  const createSocket = (name, url, partition) => {
    console.log(`## CREATING SOCKET ${name}`);

    // state
    const state = {
      url,
      partition,
      name
    };

    // client
    const client = new SocketClient(url, partition, name);
    console.log(client);

    // onConnect
    client.onConnect = () => {
      const socket = {
        name,
        partition,
        state: 'connect'
      };

      store.dispatch('sockets/onConnect', socket);
    }

    // onDisconnect
    client.onDisconnect = () => {
      const socket = {
        name,
        partition,
        state: 'disconnect'
      };

      store.dispatch('sockets/onDisconnect', socket);
    }

    // onOpen
    client.onOpen = (event) => {
      console.log(`${name} onOpen`);
      const {type: state} = event;
      const socket = {
        name,
        partition,
        state
      }
      store.dispatch('sockets/onOpen', socket);
    };

    // onMessage
    client.onMessage = (event) => {
      console.log(event);

      const {type: state} = event;
      const message = JSON.parse(event.data);

      const socket = {
        name,
        partition,
        state,
        message,
      };
      store.dispatch('sockets/onMessage', socket);
    };

    // onClose
    client.onClose = (event) => {
      console.log(event);

      const {type: state} = event;
      const socket = {
        name,
        partition,
        state
      };
      store.dispatch('sockets/onClose', socket);
    };

    // onError
    client.onError = (event) => {
      console.log(event);

      const {type: state} = event;
      const socket = {
        name,
        partition,
        state
      };
      store.dispatch('sockets/onError', socket);
    };

    return client;
  };

  /**
   * Return the Socket with the specified name.
   *
   * @param name
   * @returns {undefined}
   */
  const socket = (name) => {
    let socket = sockets[name] || undefined;

    if (socket) {
      return socket;
    }

    let url;

    switch (name) {
      case 'admin':
        url = `wss://admin.ws.${region}.${rootDomain}`;
        socket = createSocket('admin', url, partition);
        break

      case 'protected':
        url = `wss://protected.ws.${region}.${rootDomain}`;
        socket = createSocket('protected', url, partition);
        break

      default:
        url = `wss://public.ws.${region}.${rootDomain}`;
        socket = createSocket('public', url, partition);
        break
    }

    sockets[name] = socket;

    return sockets[name];
  };

  /**
   * Listen to the Me mutations
   *
   * If a Profile signs in - we need to switch the Sockets.
   *
   * Connect and disconnect the appropriate Sockets.
   */
  store.subscribe(async (mutation, state) => {
    if (mutation.type === 'me/setMe') {
      console.log(`## SOCKET PLUGIN - SET ME MUTATION`);

      const idToken = await getIdToken();

      if (! idToken ) {
        // disconnect the protected socket
        console.log(`## SOCKET PLUGIN - DISCONNECTING PROTECTED SOCKET`);
        socket('protected').disconnect();

        // disconnect the admin socket
        console.log(`## SOCKET PLUGIN - DISCONNECTING ADMIN SOCKET`);
        socket('admin').disconnect();

        // connect the public socket
        console.log(`## SOCKET PLUGIN - CONNECTING PUBLIC SOCKET`);
        socket('public').connect();

      } else {
        // disconnect the public socket
        console.log(`## SOCKET PLUGIN - DISCONNECTING PUBLIC SOCKET`);
        socket('public').disconnect();

        // connect the protected socket
        console.log(`## SOCKET PLUGIN - CONNECTING PROTECTED SOCKET`);
        socket('protected').connect(idToken);

        // connect the admin socket
        console.log(`## SOCKET PLUGIN - CONNECTING ADMIN SOCKET`);
        socket('admin').connect(idToken);
      }
    }
  });

  /**
   * Context plugin
   *
   * Inject a function into the nuxt config - $socket
   */
  inject ('socket', function (name = undefined) {
    const me = store.getters['me/me'];
    if (! name) {
      name = me ? 'protected' : 'public'
    }

    if (! ['protected', 'public', 'admin'].includes(name)) {
      throw new Error(`Invalid socket name ${name} supplied`);
    }

    return socket(name);
  });

  // connect the public socket by default
  socket('public').connect();
}
