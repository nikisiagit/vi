/**
 * Sockets Store.
 *
 * This store is used to wrap and manage the websocket connections to Platform.
 */
export const state = () => ({
  /**
   * The list of Sockets.
   */
  // sockets: [
  //   // {
  //   //   name: 'public|protected|owner|organiser|content-creator'
  //   //   readyState: 0 connecting, 1 open, 2 closing, 3 closed,
  //   //   connected: true|false,
  //   //   error: true|false,
  //   //   connecting: true|false,
  //   //   state: 'error', 'close'
  //   // }
  // ],

  sockets: {
    admin: {},
    protected: {},
    public: {}
  },

  /**
   * The list of Messages that have come through the Sockets.
   */
  messages: [
    // {
    //    ...
    // }
  ],

  loading: false,

  loaded: false,

  initialised: false,

  initialising: false,
});

export const mutations = {
  /**
   * Add or merge a Socket.
   *
   * @param state
   * @param socket
   */
  // socket (state, socket) {
  //   try {
  //     const {name} = socket;
  //     const index = state.sockets.findIndex(s => s.name === name);
  //
  //     if (index < 0) {
  //       state.sockets.push(socket);
  //     } else {
  //       state.sockets.splice(
  //         index, 1,
  //         Object.assign(state.sockets[index], socket)
  //       );
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  adminSocket (state, socket) {
    state.sockets.admin = socket;
  },

  protectedSocket (state, socket) {
    state.sockets.protected = socket;
  },

  publicSocket (state, socket) {
    state.sockets.public = socket;
  }
};

export const getters = {
  /**
   * Return a list of the Sockets.
   *
   * @param state
   * @returns {{protected: {}, public: {}, admin: {}}}
   */
  sockets: (state) => {
    return state.sockets;
  },

  adminSocket: (state) => state.sockets.admin,
  protectedSocket: (state) => state.sockets.protected,
  publicSocket: (state) => state.sockets.public,

  /**
   * Return the number of Sockets.
   *
   * @param state
   * @returns {number|number}
   */
  // numberOfSockets: (state) => {
  //   return state.sockets.length || 0;
  // },

  /**
   * Return the loading state.
   *
   * @param state
   * @returns {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Return the loaded state.
   *
   * @param state
   * @returns {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Return the Socket with the specified name.
   *
   * @param state
   * @return {function(*): *}
   */
  // socketWithName: (state) => (name) => {
  //   return state.sockets.find(socket => socket.name === name);
  // },
}

/**
 *
 */
export const actions = {

  /**
   * Connect the specified Socket.
   */
  async connect ({commit, getters}, name = undefined) {
    const socketName = `${name}Socket`;
    try {
      const socket = this.$socket(name);
      commit(socketName, {...getters[socketName], ...socket, connecting: true});
      await socket.connect();
    } catch (error) {
      console.log('## SOCKETS CONNECT - ERROR');
      console.log(error);
      throw error;
    }
  },

  /**
   * Disconnect the specified Socket.
   */
  async disconnect (context, name = undefined) {
    try {
      const socket = this.$socket(name);
      await socket.disconnect();
    } catch (error) {
      console.log('## SOCKETS DISCONNECT - ERROR');
      console.log(error);
      throw error;
    }
  },

  /**
   * Subscribe to the specified `channel`
   */
  async subscribe (context, {name = undefined, channel}) {
    try {
      const socket = this.$socket(name);
      await socket.connect();
      await socket.subscribe(channel);
    } catch (error) {
      console.log(`## SOCKETS SUBSCRIBE - ERROR`);
      console.log(error);
      throw error;
    }
  },

  /**
   * Unsubscribe from the specified `channel`.
   *
   * @param context
   * @param name
   * @param channel
   * @returns {Promise<void>}
   */
  async unsubscribe (context, {name = undefined, channel}) {
    try {
      const socket = this.$socket(name);
      await socket.unsubscribe(channel);
    } catch (error) {
      console.log(`## SOCKETS UNSUBSCRIBE - ERROR`);
      console.log(error);
      throw error;
    }
  },

  /**
   * Send a message via the Socket.
   *
   * @param context
   * @param name
   * @param message
   * @returns {Promise<void>}
   */
  async send (context, {name, message}) {
    try {
      const socket = this.$socket(name);
      await socket.connect();
      await socket.send(message);
    } catch (error) {
      console.log('## SOCKETS DISCONNECT - ERROR');
      console.log(error);
      throw error;
    }
  },


  /**
   * @param context
   * @param socket
   */
  onOpen({commit, getters}, socket) {
    const { name } = socket;
    const socketName = `${name}Socket`;
    commit(socketName, {
      ...getters[socketName],
      ...socket,
      open: true
    });
  },

  /**
   * @param context
   * @param event
   */
  onMessage(context, event) {
    console.log(event);
    // context.commit("ADD_MESSAGE", message);
  },

  onConnect({commit, getters}, socket) {
    const { name } = socket;
    const socketName = `${name}Socket`;
    commit(socketName, {
      ...getters[socketName],
      ...socket,
      connected: true,
      connecting: false,
    });
  },

  onDisconnect({commit, getters}, socket) {
    const { name } = socket;
    const socketName = `${name}Socket`;
    commit(socketName, {
      ...getters[socketName],
      ...socket,
      connected: false
    });
  },

  onClose({commit, getters}, socket) {
    const { name } = socket;
    const socketName = `${name}Socket`;
    commit(socketName, {
      ...getters[socketName],
      ...socket,
      open: false
    });
  },

  onError({commit, getters}, socket) {
    const { name, state: error } = socket;
    const socketName = `${name}Socket`;
    commit(socketName, {
      ...getters[socketName],
      ...socket,
      error
    });
  },
};

