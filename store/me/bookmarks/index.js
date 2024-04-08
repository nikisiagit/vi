export const state = () => ({
  bookmarks: [],
  token: undefined,
  initialising: false,
  initialised: false,
  loading: false,
  loaded: false,
  error: undefined,

  /**
   * The CreatingBookmarks(s)
   */
  creatingBookmarks: [

  ],


  removingBookmarks: [],

})


export const mutations = {
  /**
   * Set the Bookmarks to whatever is supplied.
   *
   * @param state
   * @param bookmarks []
   */
  setBookmarks (state, bookmarks = [] ) {
    state.bookmarks = bookmarks;
  },

  /**
   * Set the Bookmarks in the Store.
   *
   * @param state
   * @param bookmarks {{ userId: string, itemType: string, itemId: string }}
   */
  setBookmark(state, bookmarks) {
    const {bookmarkId} = bookmarks;
    const index = state.bookmarks.findIndex(item => item.bookmarkId === bookmarkId);

    if (index < 0) {
      state.bookmarks.push(bookmarks);
    } else {
      state.bookmarks.splice(index, 1, bookmarks);
    }
  },

  /**
   * Update the Bookmark in the Store.
   * @param state
   * @param bookmarkToUpdate
   */
  updateBookmark (state,bookmarkToUpdate) {
    const {bookmarkId} = bookmarkToUpdate;
    const index = state.bookmarks.findIndex(item => item.bookmarkId === bookmarkId);
    if (index < 0) {
      state.bookmarks.push(bookmarkToUpdate);
    } else {
      state.bookmarks.splice(index, 1, {
          ...state.bookmarks[index],
          ...bookmarkToUpdate
        }
      );
    }
  },

  /**
   * Remove the Bookmark from the bookmarks state.
   *
   * @param state
   * @param bookmark
   */
  removeBookmark(state, bookmark) {
    const index = state.bookmarks.findIndex((item) => {
      return item.bookmarkId === bookmark.bookmarkId
    })

    if (index > -1) {
      state.bookmarks.splice(index, 1)
    }
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
   * Set the initialising state
   * @param state
   * @param initialising
   */
  setInitialising (state, initialising) {
    state.initialising = initialising;
  },

  /**
   * Set the initialised state
   * @param state
   * @param initialised
   */
  setInitialised (state, initialised) {
    state.initialised = initialised;
  },

  /**
   * Set the loading state
   * @param state
   * @param loading
   */
  setLoading (state, loading) {
    state.loading = loading;
  },

  /**
   * Set the loaded state
   * @param state
   * @param loaded
   */
  setLoaded (state, loaded) {
    state.loaded = loaded;
  },

  /**
   * Set the error message
   * @param state
   * @param error
   */
  setError (state, error) {
    state.error = error;
  },

  /**
   * @param state
   * @param creatingBookmark
   */
  updateCreatingBookmark (state, creatingBookmark) {
    const {executionArn} = creatingBookmark;
    const index = state.creatingBookmarks.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.creatingBookmarks.push(creatingBookmark);
    } else {
      state.creatingBookmarks.splice(index, 1, {
        ...state.creatingBookmarks[index],
        ...creatingBookmark
      });
    }
  },


  /**
   * @param state
   * @param creatingBookmarks
   */
  setCreatingBookmarks (state, creatingBookmarks = []) {
    state.creatingBookmarks = creatingBookmarks || [];
  },


  /**
   * @param state
   * @param removingBookmarks
   */
  setRemovingBookmarks (state, removingBookmarks = []) {
    state.removingBookmarks = removingBookmarks || [];
  },

  /**
   * @param state
   * @param removingBookmark
   */
  updateRemovingBookmark (state, removingBookmark) {
    const {executionArn} = removingBookmark;
    const index = state.removingBookmarks.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.removingBookmarks.push(removingBookmark);
    } else {
      state.removingBookmarks.splice(index, 1, {
        ...state.removingBookmarks[index],
        ...removingBookmark
      });
    }
  },

  /**
   * Add or update a removingBookmark item.
   *
   * @param state
   * @param removingBookmark
   */
  removingBookmark (state, removingBookmark) {
    console.log("add removingBookmark", removingBookmark);

    const index = state.removingBookmarks.findIndex(item => item.executionArn === removingBookmark.executionArn);

    if (index > -1) {
      state.removingBookmarks.splice(
        index, 1,
        Object.assign({}, state.removingBookmarks[index], removingBookmark)
      )
    } else {
      state.removingBookmarks.push(removingBookmark);
    }
  },
}

export const getters = {

  /**
   * Return the Bookmarks.
   * @param state
   * @returns {[]}
   */
  bookmarks: state => state.bookmarks,

  /**
   * Return the Bookmarks identified by the specified bookmarkId.
   *
   * @param state
   * @returns {function(*): *}
   */
  bookmarksWithBookmarkId: state => bookmarkId => state.bookmarks.find(item => item.bookmarkId === bookmarkId),

  token: state => state.token,

  initialising: state => state.initialising,

  initialised: state => state.initialised,

  loading: state => state.loading,

  loaded: state => state.loaded,

  error: state => state.error,


  /**
   * Return the CreatingBookmark identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingBookmarkWithExecutionArn: (state) => (executionArn) => {
    return state.creatingBookmarks.find(creatingBookmark => creatingBookmark.executionArn === executionArn);
  },

  /**
   * Return the RemovingBookmark item identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  removingBookmarkWithExecutionArn: (state) => (executionArn) => {
    return state.removingBookmarks.find(removingBookmark => removingBookmark.executionArn === executionArn);
  },
}

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
    commit('setBookmarks', []);
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
    console.log(`## BOOKMARKS STORE - LOAD`);

    try {
      commit('setLoading', true);
      commit('setLoaded', false);

      const {bookmarks, token} = await this.$api().me.listBookmarks();

      commit('setBookmarks', bookmarks.map(bookmarks => {
        return Object.assign({}, bookmarks, {
          loading: false,
          loaded: true,
          error: undefined,
        });
      }));

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
   * Load the Bookmark identified by the supplied type.
   *
   * @param commit
   * @param getters
   * @param type {string}
   * @returns {Promise<void>}
   */
  async loadBookmarkWithType({commit, getters}, type) {
    console.log(`## BOOKMARKS STORE - LOAD BOOKMARK WITH TYPE - ${type}`);
    commit('loading', true);

    try {
      let { bookmarks } = await this.$api().me.listBookmarksWithType(type);

      bookmarks.map(bookmark => commit('updateBookmark',  {
        ...bookmark,
        ...{
          error: undefined,
          loading: false,
          loaded: true
        }
      }));

      // commit('token', token);
      commit('loaded', true);

    } catch (error) {
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  async createBookmark({commit, dispatch}, bookmark) {

    let bookmarkToCreate = {
      ...bookmark,
      ...{
        error: undefined,
        creating: true,
      }
    };

    try {
      let creatingBookmark = await this.$api().me.createBookmark(bookmark);
      const {executionArn, startDate} = creatingBookmark;

      bookmarkToCreate = {
        ...bookmarkToCreate,
        ...creatingBookmark,
      };
      commit('updateCreatingBookmark', bookmarkToCreate);

      // start the polling function...
      ((executionArn) => {

        const getExecution = async () => {
          bookmarkToCreate = {
            ...bookmarkToCreate,
            ...{
              loading: true,
            },
          };
          commit('updateCreatingBookmark', bookmarkToCreate);

          const execution = await this.$api().executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          bookmarkToCreate = {
            ...bookmarkToCreate,
            ...{
              loading: false,
              status,
              stopDate,
            },
          };
          commit('updateCreatingBookmark', bookmarkToCreate);

          if (status === 'RUNNING') {
            console.log('## CREATE CONNECTION - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE CONNECTION - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE CONNECTION - SUCCEEDED');
            let {output} = execution;
            output = JSON.parse(output);

            let {error, bookmark: createdBookmark} = output;

            if (error) {
              bookmarkToCreate = {
                ...bookmarkToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingBookmark', bookmarkToCreate);
            }

            if (createdBookmark) {
              bookmarkToCreate = {
                ...bookmarkToCreate,
                ...createdBookmark,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingBookmark', bookmarkToCreate);

              createdBookmark = {
                ...createdBookmark,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateBookmark', createdBookmark);

            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return creatingBookmark;

    } catch (error) {
      const { message } = error;

      bookmarkToCreate = {
        ...bookmarkToCreate,
        ...{
          error: message,
          creating: false,
          created: false,
        },
      };
      commit('updateCreatingBookmark', bookmarkToCreate);

      throw error;
    }
  },

  /**
   * Remove the Bookmark.
   *
   * @param context
   * @param bookmarkId
   * @returns {Promise<void>}
   */
  async removeBookmark (context, bookmarkId) {
    console.log(`## ME BOOKMARK STORE - REMOVE-BOOKMARK`);
    console.log(`## BOOKMARK ID TO REMOVE`);

    try {
      const removingBookmark = await this.$api().me.removeBookmarkWithBookmarkId(bookmarkId);
      const {executionArn} = removingBookmark;

      context.commit('updateRemovingBookmark',
        Object.assign({}, removingBookmark, {
          removing: true,
        })
      );

      /**
       * The Polling function we will create to retrieve the status of the RemoveBookmark request.
       *
       * @link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
       * @param removingBookmark
       */
      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {

          context.commit('updateRemovingBookmark',
            Object.assign({}, removingBookmark, {
              loading: true,
            })
          );

          const execution = await this.$api().executions.getExecutionWithExecutionArn(executionArn);
          console.log('## REMOVING BOOKMARK - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          context.commit('updateRemovingBookmark',
            Object.assign({}, removingBookmark, {
              loading: false,
              status,
              stopDate,
            })
          );

          if (status === 'RUNNING') {
            console.log('## REMOVING BOOKMARK - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## REMOVING BOOKMARK - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## REMOVING BOOKMARK - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, bookmark: removedBookmark} = output;

            if (error) {

              context.commit('updateRemovingBookmark',
                Object.assign({}, removingBookmark, {
                  error,
                  removing: false,
                })
              );
            }

            if (removedBookmark) {
              context.commit('updateRemovingBookmark',
                Object.assign({}, removingBookmark, {
                  removing: false,
                  removed: true,
                })
              );

              /**
               ** Remove the specific Bookmark from the store
               */
              context.commit('removeBookmark', {
                ...removedBookmark,
                bookmarkId,
              });
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return removingBookmark;

    } catch (error) {
      const {message} = error;

      context.commit('updateRemovingBookmark', {
        ...{
          error: message,
          removing: false,
          removed: false
        }
      });
      throw error;
    }
  },
}
