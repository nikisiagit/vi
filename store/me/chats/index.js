function chatIdToChannelId(chatId) {
  const [_, partition, chatName] = chatId.split(':');
  return `channel:${partition}:chat:${chatName}`;
}

/**
 * My Chats Store
 */
export const state = () => ({
  /**
   * The list of Chats
   */
  chats: [],

  /**
   * The pagination token
   */
  token: undefined,

  /**
   * Is this store initialising?
   */
  initialising: false,

  /**
   * Has this store initialised?
   */
  initialised: false,

  /**
   * Is this store loading?
   */
  loading: false,

  /**
   * Has this store loaded?
   */
  loaded: false,

  /**
   * The last error message
   */
  error: undefined,

});

export const mutations = {

  /**
   * Set the Chats to whatever is supplied.
   *
   * @param state
   * @param chats []
   */
  setChats (state, chats = [] ) {
    state.chats = chats;
  },

  /**
   * Set the pagination token
   * @param state
   * @param token
   */
  setToken (state, token) {
     state.token = token;
  },

  /**
   * Set the Chat in the Store.
   *
   * @param state
   * @param chat {{ chatId: string, name: string, partition: string, type: string, languageId: string, messages: []}}
   */
  setChat (state, chat = {}) {
    const {chatId} = chat;
    const index = state.chats.findIndex(item => item.chatId === chatId);

    if (index < 0) {
      state.chats.push(chat);
    } else {
      state.chats.splice(index, 1, chat);
    }
  },

  /**
   * Update an existing Chat.
   *
   * @param state
   * @param chatToUpdate
   */
  updateChat (state, chatToUpdate) {
    const {chatId} = chatToUpdate;
    const index = state.chats.findIndex(item => item.chatId === chatId);
    if (index < 0) {
      state.chats.push(chatToUpdate);
    } else {
      state.chats.splice(
        index,
        1,
        {
          ...state.chats[index],
          ...chatToUpdate
        }
      );
    }
  },

  addMessage (state, {chat, message}) {
    const {chatId} = chat;
    const index = state.chats.findIndex(item => item.chatId === chatId);
    state.chats[index].messages.push(message);
  },

  /**
   * @param state
   * @param initialising
   */
  setInitialising (state, initialising = false) {
    state.initialising = initialising;
  },

  /**
   * @param state
   * @param initialised
   */
  setInitialised (state, initialised = false) {
    state.initialised = initialised;
  },

  /**
   * @param state
   * @param loading
   */
  setLoading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * @param state
   * @param loaded
   */
  setLoaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * @param state
   * @param error
   */
  setError (state, error = undefined) {
    state.error = error;
  },

}

export const getters = {
  /**
   * Return the list of Chats.
   *
   * @param state
   * @returns {[]}
   */
  chats: state => state.chats,

  token: state => state.token,

  /**
   * Return the Chat identified by the specified ChatId.
   *
   * @param state
   * @returns {function(*): *}
   */
  chatWithChatId: state => chatId => state.chats.find(item => item.chatId === chatId),

  /**
   * @param state
   * @returns {boolean}
   */
  initialising: (state) => {
    return state.initialising || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  initialised: (state) => {
    return state.initialised || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * @param state
   * @returns {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },
};

export const actions = {
  /**
   * Unload the store of all state.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async unload ({commit}) {
    commit('setLoading', false);
    commit('setLoaded', false);
    commit('setChats', []);
    commit('setError', undefined);
  },

  /**
   * Reload the stores state.
   *
   * @param dispatch
   * @returns {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the Store with state from the api.
   *
   * @param commit
   * @param getters
   * @returns {Promise<void>}
   */
  async load ({commit, getters}) {
    console.log(`## MY CHATS STORE - LOAD`);

    try {
      commit('setLoading', true);
      commit('setLoaded', false);

      const {profileChats: chats, token} = await this.$api().me.listProfileChats();
      console.log("CHATS: ", chats);

      for (const chat of chats) {
        commit('setChat', {
          ...chat,
          loaded: true,
          loading: false,
          messages: chat?.messages ? chat.messages: []
        });

        const socket = this.$socket();
        if(!socket?.isConnected()) {
          await new Promise((resolve, reject) => {
            this.subscribe(async(mutation, state) => {
              if (mutation.type === 'sockets/protectedSocket') {
                console.log("PROTECTED SOCKET MUTATION: ", mutation);
                if (socket.connected) {
                  resolve();
                }
              }
            });
          })
        }

        const channelId = chatIdToChannelId(chat.chatId);
        socket.addListener(channelId, ({message}) => {
          commit('addMessage', {chat, message});
        });
        console.log(`## MY CHAT STORE - SUBSCRIBING VIA '${socket.name}' WEB SOCKET`);
        await socket.subscribe(channelId, {});
      }

      commit('setToken', token);
      commit('setLoaded', true);

    } catch (error) {
      console.log(error);

      commit('setError', error);
      commit('setLoaded', false);
    } finally {
      commit('setLoading', false);
    }
  },

  /**
   * Load the Chat with the specified ChatId.
   *
   * @param commit
   * @param chatId {string}
   * @returns {Promise<void>}
   */
  async loadChatWithChatId({commit}, chatId) {
    let chatToLoad = {
      chatId,
      loading: true,
      loaded: false,
    };
    commit('setChat', chatToLoad);

    try {
      let chat = this.$api().chats.loadChatWithChatId(chatId);

      chatToLoad = {
        ...chatToLoad,
        ...chat,
        ...{
          loaded: true,
          loading: false,
        }
      };
      commit('updateChat', chatToLoad);

    } catch (error) {
      const {message} = error;
      chatToLoad = {
        ...chatToLoad,
        ...{
          error: message,
          loaded: false,
          loading: false,
        }
      };
      commit('updateChat', chatToLoad);
    }
  },

  async sendMessage({commit}, {chatId, message}) {
    const channelId = chatIdToChannelId(chatId);
    await this.$socket().send({channelId, message});
  },

  async setLanguage({commit, getters}, {chatId, languageId}) {
    const chat = getters.chatWithChatId(chatId);
    commit('updateChat', {...chat, languageId});

    const channelId = chatIdToChannelId(chatId);
    await this.$socket().unsubscribe(`channel:${channelId}`);
    await this.$socket().subscribe(`channel:${channelId}`, {translateMessagesTo: languageId});
  }
};

