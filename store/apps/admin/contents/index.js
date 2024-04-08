/**
 * Venue App Admin - Contents Store
 */

export const state = () => ({
  /**
   * The list of Contents that belong to the Venue/Partition.
   */
  contents: [],

  /**
   * The list of CreatingContents.
   */
  creatingContents: [],

  token: undefined,

  loaded: false,

  loading: false,

  error: undefined,
});

export const mutations = {
  /**
   * Set the Contents to whatever is supplied.
   *
   * @param state
   * @param contents []
   */
  setContents (state, contents = []) {
    state.contents = contents;
  },

  /**
   * Update the specified Content.
   *
   * @param state
   * @param content {{ contentId: string, name: string }}
   */
  updateContent (state, content) {
    const {contentId} = content;

    const index = state.contents.findIndex(content => content.contentId === contentId);

    if (index < 0) {
      state.contents.push(content);
    } else {
      state.contents.splice(index, 1, {...state.contents[index], ...content});
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
   * @param state
   * @param creatingContents
   */
  setCreatingContents (state, creatingContents = []) {
    state.creatingContents = creatingContents || [];
  },

  /**
   * Update the supplied CreatingContent.
   *
   * @param state
   * @param creatingContent {{name: string}}
   */
  updateCreatingContent (state, creatingContent) {
    const {name} = creatingContent;
    const index = state.creatingContents.findIndex(item =>  item.name === name);

    if (index < 0) {
      state.creatingContents.push(creatingContent);
    } else {
      state.creatingContents.splice(index, 1, {...state.creatingContents[index], ...creatingContent})
    }
  },
};

export const getters = {
  // CONTENTS

  /**
   * Return the list of Contents.
   *
   * @param state
   * @returns {[]|*[]}
   */
  contents: (state) => {
    return state.contents || [];
  },

  /**
   * Return the Content identified by the supplied ContentId.
   *
   * @param state
   * @returns {function(*): *}
   */
  contentWithContentId: (state) => (contentId) => {
    return state.contents.find(content => content.contentId === contentId);
  },

  /**
   * Return the number of Contents in the store.
   *
   * @param state
   * @returns {number|number}
   */
  numberOfContents: (state) => {
    return state.contents.length || 0;
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

  // CREATING CONTENTS

  /**
   * Return the CreatingContent identified by the supplied executionArn.
   *
   * @param state
   * @return {(function(*))|*}
   */
  creatingContentWithExecutionArn: (state) => (executionArn) => {
    return state.creatingContents.find(creatingContent => creatingContent.executionArn === executionArn);
  },
};


export const actions = {

  /**
   * Load the store with a list of Contents.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loading', true);
      let {contents, token} = await this.$api('admin').contents.listContents();

      contents.map(content => commit('updateContent', {
        ...content,
        ...{
          loaded: true,
          loading: false,
          error: undefined,
        }
      }));

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
   * Load the store with the Content identified by the supplied ContentId.
   *
   * @param commit
   * @param contentId {string}
   * @returns {Promise<void>}
   */
  async loadContentWithContentId ({commit}, contentId) {
    let contentToLoad = {
      contentId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateContent', contentToLoad);
      const content = await this.$api('admin').contents.getContentWithContentId(contentId);

      contentToLoad = {
        ...content,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateContent', contentToLoad);

    } catch (error) {
      const {message} = error;
      contentToLoad = {
        ...contentToLoad,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateContent', contentToLoad);
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
    commit('setContents', []);
    commit('setCreatingContents', []);
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
   * Create a new Content.
   *
   * @param commit
   * @param content {{ name: string }}
   * @returns {Promise<*>}
   */
  async createContent ({commit}, content) {
    console.log('## CONTENTS CREATE CONTENT');
    const {name} = content;

    if (! name) {
      throw new Error('name is a required attribute when creating a Content');
    }

    let contentToCreate = {
      ...content,
      ...{
        creating: true,
        error: undefined,
      }
    };
    commit('updateCreatingContent', contentToCreate);

    try {
      const creatingContent = await this.$api('admin').contents.createContent(content);
      const {executionArn} = creatingContent;

      contentToCreate = {
        ...contentToCreate,
        ...creatingContent,
      };
      commit('updateCreatingContent', contentToCreate);

      ((executionArn) => {

        const getExecution = async () => {

          contentToCreate = {
            ...contentToCreate,
            ...{
              loading: true
            },
          };
          commit('updateCreatingContent', contentToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);

          const {status, stopDate} = execution;

          contentToCreate = {
            ...contentToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingContent', contentToCreate);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE CONTENT - FAILED');
            contentToCreate = {
              ...contentToCreate,
              ...{
                error: 'Failed to create the Content',
                creating: false,
                loaded: false
              }
            };
            commit('updateCreatingContent', contentToCreate);
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, content: createdContent} = output;

            if (error) {
              contentToCreate = {
                ...contentToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingContent', contentToCreate);
            }

            if (createdContent) {
              contentToCreate = {
                ...contentToCreate,
                ...createdContent,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingContent', contentToCreate);

              createdContent = {
                ...createdContent,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateContent', createdContent);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return creatingContent;

    } catch (error) {
      const {message} = error;
      contentToCreate = {
        ...contentToCreate,
        ...{
          error: message,
          loading: false,
          loaded: false,
          creating: false,
        }
      };
      commit('updateCreatingContent', contentToCreate);
      throw error;
    }

  }
};
