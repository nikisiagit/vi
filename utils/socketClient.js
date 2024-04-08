/**
 * Socket Client Wrapper.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
 *
 */
export default class SocketClient {
  /**
   * Create a new SocketClient instance.
   *
   * @param url {string} The WS url to connect to
   * @param name {undefined|string} The socket name
   * @param partition {undefined|string} The venue/partition name
   */
  constructor(
    url,
    partition = undefined,
    name = undefined
  ) {
    console.log('## SOCKET CLIENT - CONSTRUCT');

    this.url = url;
    this.partition = partition;
    this.name = name;

    // the connected state
    this.connected = false;

    // the actual websocket instance
    this.webSocket = null;

    // callback properties
    this.onConnect = null;
    this.onOpen = null;
    this.onMessage = null;
    this.onClose = null;
    this.onError = null;

    this.listeners = new Map();
  }

  /**
   * Connect
   *
   * @param token {undefined|string}
   */
  async connect(token = undefined) {
    console.log(`## SOCKET CLIENT - CONNECT`);

    if (! this.url) {
      return null;
    }

    try {

      // if we have an onConnect callback
      if (typeof this.onConnect === "function") {
        this.onConnect();
      }

      // create the url params
      let searchParams;
      searchParams = new URLSearchParams();

      if (token) {
        searchParams.append('token', token);
      }

      if (this.partition) {
        searchParams.append('partition', this.partition);
      }



      // create the instance
      this.webSocket = new WebSocket(`${this.url}?${searchParams.toString()}`);

    } catch (error) {
      console.log(`## SOCKET CLIENT - ERROR `);
      console.log(error);
      return;
    }

    // Connect our internal listeners to the WebSocket instance
    // @link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events

    // There are 4 events to connect to:
    // - open
    // - close
    // - error
    // - message

    // open
    // Fired when a connection with a WebSocket is opened. Also available via the onopen property
    // @link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/open_event
    this.webSocket.addEventListener('open', (event) => {
      console.log(`## SOCKET CLIENT - OPEN`);
      console.log(event);

      this.connected = true;

      if (typeof this.onOpen === "function") {
        this.onOpen(event);
      }
    });

    // close
    // The close event is fired when a connection with a WebSocket is closed.
    // @link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close_event
    this.webSocket.addEventListener('close', (event) => {
      this.connected = false;

      if (typeof this.onClose === "function") {
        this.onClose(event);
      }

      delete this.webSocket;
      this.webSocket = undefined;

      // @todo https://5-guys.atlassian.net/browse/PRK-135
      // this.reconnect();
    })

    // error
    // The error event is fired when a connection with a WebSocket has been closed due to an error (some data couldn't be sent for example).
    // @link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/error_event
    this.webSocket.addEventListener('error', (event) => {
      this.connected = false;

      if (typeof this.onError === "function") {
        this.onError(event);
      }

      // @todo https://5-guys.atlassian.net/browse/PRK-135
      // this.reconnect();
    });

    // message
    // @link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/message_event
    this.webSocket.addEventListener('message', (msgEvent) => {
      const message = JSON.parse(msgEvent.data);

      try {
        this.emit(message.type, message);
      } catch (e) {
        console.log(e);
        console.info("Plain message, is not possible to parse into JSON.");
      }
    });
  }

  /**
   * Return a boolean indicating the connected state of the WebSocket.
   *
   * @returns {*|boolean}
   */
  isConnected () {
    return this.connected || false;
  }

  /**
   * Disconnect the Socket.
   * @link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close
   */
  disconnect() {
    console.log(`## SOCKET CLIENT - DISCONNECT`);
    if (! this.webSocket) {
      return;
    }

    this.webSocket.close();
  }

  /**
   * Reconnect the Socket.
   *
   * @todo https://5-guys.atlassian.net/browse/PRK-135
   */
  reconnect() {
    console.log(`## SOCKET CLIENT - RECONNECT`);
    // delete this.webSocket;
    // this.listeners.clear();

    // setTimeout(() => {
    //   this.connect(this.token);
    // }, 5000);
  }


  /**
   * Send a send message to the Socket.
   *
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#methods
   * @link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   * @param args
   */
  send (args) {
    if ( !this.webSocket ) return

    const message = JSON.stringify({ action: "send", ...args });
    return this.webSocket.send(message);
  }

  /**
   * Send a subscribe message to Socket.
   *
   * @param channelId
   * @param options
   */
  subscribe (channelId, options) {
    if ( !this.webSocket ) return

    const message = JSON.stringify({ action: "subscribe", channelId, options });
    return this.webSocket.send(message);
  }

  /**
   * Send an unsubscribe message to the Socket
   * @param channelId
   */
  unsubscribe (channelId) {
    if ( !this.webSocket ) return

    const message = JSON.stringify({ action: "unsubscribe", channelId });
    return this.webSocket.send(message);
  }



  /**
   * broadcast incoming event to components
   * @param event
   * @param args
   */
  emit(event, args) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((listener) => {
        listener.callback.call(listener.vm, args);
      });
    }
  }

  /**
   * register new event listener with vue instance
   * @param event
   * @param callback
   * @param vm
   */
  addListener(event, callback, vm) {
    if (typeof callback === "function") {
      if (!this.listeners.has(event)) this.listeners.set(event, []);
      this.listeners.get(event).push({ callback, vm });
    } else {
      throw new Error(`callback must be a function`);
    }
  }

  /**
   * register new event listener for Vuex
   * @param event
   * @param callback
   * @todo: remove listeners for vuex. (When is a good place to call removeListener for vuex? When App is destroyed?)
   */
  addVuexListener(event, callback) {
    if (typeof callback === "function") {
      if (!this.listeners.has(event)) this.listeners.set(event, []);
      this.listeners.get(event).push({ callback });
    } else {
      throw new Error(`callback must be a function`);
    }
  }

  /**
   * remove a listener
   * @param event
   * @param vm
   */
  removeListener(event, vm) {
    if (this.listeners.has(event)) {
      const listeners = this.listeners
        .get(event)
        .filter((listener) => listener.vm !== vm);

      if (listeners.length > 0) {
        // in case other components or Vue instances are still connected to this listener
        this.listeners.set(event, listeners);
      } else {
        // remove listener from component or Vue instance
        this.listeners.delete(event);
      }
    }
  }
}
