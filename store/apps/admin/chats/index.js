/**
 * Venue App Admin - Chats Store
 *
 */

export const state = () => ({

  /**
   * The list of Chats that have been added to the Partition.
   */
  chats: [],

  /**
   * The list of Chats that are being/have been created.
   */
  creatingChats: [],

  /**
   * The list of Chat that are being/have been removed.
   */
  removingChats: [],

  /**
   * Pagination token.
   */
  token: undefined,

  /**
   *
   */
  loaded: false,

  loading: false,

  error: undefined,
});

export const mutations = {

  /**
   * Set the Chats to whatever is supplied.
   *
   * @param state
   * @param chats []
   */
  setChats (state, chats = []) {
    this.chats = chats || [];
  },

  /**
   * Update the Chat in the store.
   *
   * @param state
   * @param chat {{chatId: string}}
   */
  updateChat (state, chat) {
    const {chatId} = chat;
    const index = state.chats.findIndex(item => item.chatId === chatId);

    if (index < 0) {
      state.chats.push(chat);
    } else {
      state.chats.splice(index, 1,
        {
          ...state.chats[index],
          ...chat
        }
      );
    }
  },

  /**
   * @param state
   * @param loading {boolean}
   */
  loading (state, loading = false) {
    state.loading = loading;
  },

  /**
   *
   * @param state
   * @param loaded {boolean}
   */
  loaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * Set th stores token.
   *
   * @param state
   * @param token
   */
  token (state, token = undefined) {
    state.token = token;
  },

  /**
   * Set the error string.
   *
   * @param state
   * @param error {undefined|string}
   */
  error (state, error = undefined) {
    state.error = error;
  },

  /**
   * Set the creatingChats state to whatever is supplied.
   *
   * @param state
   * @param creatingChats []
   */
  setCreatingChats (state, creatingChats = []) {
    state.creatingChats = creatingChats;
  },

  /**
   * Update the CreatingChat.
   *
   * @param state
   * @param creatingChat {{executionArn: string}}
   */
  updateCreatingChat (state, creatingChat) {
    const {executionArn} = creatingChat;
    const index = state.creatingChats.findIndex(item => item.executionArn === executionArn);

    if (index < 0) {
      state.creatingChats.push(creatingChat);
    } else {
      state.creatingChats.splice(index, 1,
        {
          ...state.creatingChats[index],
          ...creatingChat
        }
      );
    }
  },

  /**
   * Add or update a removingChat item.
   *
   * @param state
   * @param removingChat {{name: string, email: string, creating: boolean, executionArn }}
   */
  removingChat (state, removingChat) {
    console.log("add removingChat", removingChat);

    const index = state.removingChats.findIndex(item => item.executionArn === removingChat.executionArn);

    if (index > -1) {
      state.removingChats.splice(
        index, 1,
        Object.assign({}, state.removingChats[index], removingChat)
      )
    } else {
      state.removingChats.push(removingChat);
    }
  },

  /**
   * Remove the given chat form the state
   *
   * @param state
   * @param chat
   */
  removeChat(state, chat) {
    const index = state.chats.findIndex(item => item.chatId === chat.chatId);

    if (index > -1) {
      state.chats.splice(index, 1)
    }
  },
};

export const getters = {
  // CHAT

  /**
   * @param state
   * @returns {[]|*[]}
   */
  chats: (state) => {
    return state.chats || [];
  },

  /**
   * @param state
   * @returns {function(*): *}
   */
  chatWithChatId: (state) => (chatId) => {
    return state.chats.find(chat => chat.chatId === chatId);
  },

  /**
   * Return the number of Chats in the Venue/Partition.
   *
   * @param state
   * @returns {number|number}
   */
  numberOfChats: (state) => {
    return state.chats.length || 0;
  },

  /**
   * Is the store loading?
   *
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Is the store loaded?
   *
   * @param state
   * @return {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Return the error.
   *
   * @param state
   * @return {undefined|string}
   */
  error: (state) => {
    return state.error || undefined;
  },

  // CHAT - CHAT PROFILES

  // CHAT - CHAT MESSAGES

  // CREATING CHAT
  /**
   * Return the CreatingChat identified by the supplied executionArn.
   *
   * @param state
   * @return {(function(*))|*}
   */
  creatingChatWithExecutionArn: (state) => (executionArn) => {
    return state.creatingChats.find(creatingChat => creatingChat.executionArn === executionArn);
  },

  /**
   * Return the RemovingChat item identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  removingChatWithExecutionArn: (state) => (executionArn) => {
    return state.removingChats.find(removingChat => removingChat.executionArn === executionArn);
  },
};

export const actions = {

  /**
   * Load the Store with a list of Chats.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async load ({commit}) {
   try {
     commit('loading', true);

     const {token, chats} = await this.$api('admin').chats.listChats();

     console.log("chats", chats);

     chats.map((chat) => {
       console.log(chat.chatId);

       commit('updateChat', {
         ...chat,
         ...{
           loaded: true,
           loading: false,
           error: undefined
         }
       })
     })

     commit('token', token);
     commit('loaded', true);
   } catch (error) {
     commit('error', error);
     commit('loaded', false);
   } finally {
     commit('loading', false);
   }
  },

  /**
   * Load the Chat with the specified ChatId.
   *
   * @param commit
   * @param chatId {string}
   * @returns {Promise<void>}
   */
  async loadChatWithChatId ({commit}, chatId) {
    let chatToLoad = {
      chatId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateChat', chatToLoad);
      const chat = await this.$api('admin').chats.getChatWithChatId(chatId);

      chatToLoad = {
        ...chatToLoad,
        ...chat,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateChat', chatToLoad);

    } catch (error) {
      const {message} = error;
      chatToLoad = {
        ...chatToLoad,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateChat', chatToLoad);
    }
  },

  /**
   * Unload the entire Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setChats', []);
    commit('setCreatingChats', []);
  },

  /**
   * Reload the Store.
   *
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },


  /**
   * Create a new Chat in the Partition/Venue.
   *
   * @param commit
   * @param chat {{ title: {text: string, languageId: string}, description: {text: string, languageId: string}, tagIds: [string], }}
   * @returns {Promise<void>}
   */
  async createChat ({commit}, chat) {
    try {
      let chatToCreate = {
        ...chat,
        ...{
          error: undefined,
          creating: true,
        }
      };

      let creatingChat = await this.$api('admin').chats.createChat(chat);
      const {executionArn, startDate} = creatingChat;
      console.log(creatingChat);

      chatToCreate = {
        ...chatToCreate,
        ...creatingChat,
      };
      commit('updateCreatingChat', chatToCreate);

      ((executionArn) => {
        const getExecution = async () => {
          chatToCreate = {
            ...chatToCreate,
            ...{
              loading: true,
            }
          };
          commit('updateCreatingChat', chatToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          chatToCreate = {
            ...chatToCreate,
            ...{
              loading: false,
              status,
              stopDate,
            }
          };
          commit('updateCreatingChat', chatToCreate);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE CHAT - FAILED');
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, chat: createdChat} = output;

            if (error) {
              chatToCreate = {
                ...chatToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingChat', chatToCreate);
            }

            if (createdChat) {
              chatToCreate = {
                ...chatToCreate,
                ...createdChat,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingChat', chatToCreate);

              createdChat = {
                ...createdChat,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateChat', createdChat);
            }
          }
        };

        setTimeout(getExecution, 3000);
      })(executionArn);


      return creatingChat;

    } catch (error) {
      // const {message} = error;
      // chatToCreate = {
      //   ...chatToCreate,
      //   ...{
      //     creating: false,
      //     created: false,
      //     error: error,
      //   },
      // };
      // commit('updateCreatingChat', chatToCreate);
      throw error;
    }
  },

  async removeChatWithChatId (context, chatId) {
    console.log(`## CHAT STORE - REMOVE-CHAT`);
    console.log(`## CHAT ID TO REMOVE`);

    try {
      const removingChat = await this.$api('admin').chats.removeChatWithChatId(chatId);

      context.commit('removingChat',
        Object.assign({}, removingChat, {
          removing: true,
        })
      );

      /**
       * The Polling function we will create to retrieve the status of the RemoveChat request.
       *
       * @link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
       * @param removingChat
       */
      const poll = (removingChat) => {

        const {executionArn} = removingChat;

        console.log(`## POLL:${executionArn}`);
        console.log(removingChat);

        const getExecution = async () => {

          context.commit('removingChat',
            Object.assign({}, removingChat, {
              loading: true,
            })
          );

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);

          context.commit('removingChat',
            Object.assign({}, removingChat, {
              loading: false,
            })
          );

          console.log(`## POLL:${executionArn} - EXECUTION`);
          console.log(execution);

          if (! execution) {
            console.log(`## POLL:${executionArn} - ERROR - NO EXECUTION`);
          }

          const {status} = execution
          console.log(`## POLL:${executionArn} STATUS ${status}`);
          console.log(status);

          if (status === 'FAILED') {
            console.log(`REMOVE CHAT POLL - FAILED`);
            context.commit('creating', {executionArn, status});
          }

          if (status === 'SUCCEEDED') {
            console.log(`REMOVE CHAT POLL - SUCCEEDED`);

            const {executionArn, stopDate} = execution;

            let {output} = execution;
            output = JSON.parse(output);
            console.log(`POLL:${executionArn} - OUTPUT`);
            console.log(output);

            const {error, chat} = output;

            if (chat) {
              console.log(`## POLL:${executionArn} - CHAT ID`);
              console.log(chat);

              // add the execution to the removingChat.executions[] list
              // update the removingChats state - remove the removingChat item
              context.commit('removingChat', {chat, executionArn, stopDate, status, removing: false});

              console.log("removeChat");

              // remove the Chat from the chats state
              context.commit('removeChat', { chatId: chat });
            }

            if (error) {
              console.log(`## POLL:${executionArn} - ERROR`);
              console.log(error);

              context.commit('removingChat', {error, executionArn, stopDate, status, removing: false});
            }
          }
        };

        setTimeout(getExecution, 5000);
      }
      poll(removingChat);

      console.log(removingChat);
      return removingChat;


    } catch (error) {
      console.log(`## CHATS STORE - DELETE-CHAT - ERROR`);
      console.log(JSON.stringify(error));

      if (error.response) {
        console.log(JSON.stringify(error.response.data.message));
        // this.error = error.response.data.message;
      }
      context.commit('error', error);
      context.commit('loading', false);
    }
  }
};
