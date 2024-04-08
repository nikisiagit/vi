/**
 * Venue App Admin Tags Store.
 *
 * This Store handles the Admin Tags.
 */

export const state = () => ({
  /**
   * The list of Tags that have been added to the Venue/Partition
   */
  tags: [],

  /**
   * The list of Tags that are being created.
   */
  creatingTags: [],

  /**
   * Has this store loaded data from the Api.
   */
  loaded: false,

  /**
   * Is this store loading data from the Api.
   */
  loading: false,

  /**
   * The last error that this Store received.
   */
  error: undefined,
})

export const mutations = {
  /**
   * Set the Tags to whatever is supplied.
   *
   * @param state
   * @param tags [{tagId: string}]
   */
  setTags (state, tags = []) {
    state.tags = tags;
  },

  /**
   * Update the supplied Tag.
   *
   * @param state
   * @param tagToUpdate {{ tagId: string, name: string, partition: string }}
   */
  updateTag (state, tagToUpdate) {
    const {tagId} = tagToUpdate;
    const index = state.tags.findIndex(tag => tag.tagId === tagId);

    if (index < 0) {
      state.tags.push(tagToUpdate)
    } else {
      state.tags.splice(index, 1, {...state.tags[index], ...tagToUpdate});
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
   * Set the error string.
   *
   * @param state
   * @param error {undefined|string}
   */
  error (state, error = undefined) {
    state.error = error;
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
   * Set the CreatingTags to whatever is supplied.
   *
   * @param state
   * @param creatingTags [{name: string}]
   */
  setCreatingTags (state, creatingTags = []) {
    state.creatingTags = creatingTags;
  },

  /**
   * Update the supplied CreatingTag.
   *
   * @param state
   * @param creatingTagToUpdate {{name: string, partition: string}}
   */
  updateCreatingTag (state, creatingTagToUpdate) {
    const {name} = creatingTagToUpdate;
    const index = state.creatingTags.findIndex(tag => tag.name === name);

    if (index < 0) {
      state.creatingTags.push(creatingTagToUpdate)
    } else {
      state.creatingTags.splice(index, 1, {...state.creatingTags[index], ...creatingTagToUpdate});
    }
  },
};

export const getters = {
  // Tags

  /**
   * Return the Tags.
   *
   * @param state
   * @return {[]|*[]}
   */
  tags: (state) => {
    return state.tags || [];
  },

  /**
   * Return the number of Tags.
   *
   * @param state
   * @return {number|number}
   */
  numberOfTags: (state) => {
    return state.tags.length || 0;
  },

  /**
   * Return the loading state.
   *
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Return the loaded state.
   *
   * @param state
   * @return {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Return the last error.
   *
   * @param state
   * @return {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },

  /**
   * Return the Tag with the specified TagId.
   *
   * @param state
   * @return {function(*): *}
   */
  tagWithTagId: (state) => (tagId) => {
    return state.tags.find(tag => tag.tagId === tagId);
  },

  // CreatingTags

  creatingTags: (state) => {
    return state.creatingTags || [];
  },

  /**
   * Return the CreatingTag identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingTagWithExecutionArn: (state) => (executionArn) => {
    return state.creatingTags.find(creatingTag => creatingTag.executionArn === executionArn);
  },
};

export const actions = {

  /**
   * Load the store with a list of Tags.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loading', true);

      const {tags, token} = await this.$api('admin').tags.listTags();

      tags.map((tag) => {
        commit('updateTag', {
          ...tag,
          ...{
            loading: false,
            loaded: true,
            error: undefined,
          }
        })
      });

      commit('token', token);
      commit('loaded', true);
    } catch (error) {
      const {message} = error;
      commit('error', message);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  async loadTagWithTagId ({commit}, tagId) {
    let tagToLoad = {
      tagId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateTag', tagToLoad);
      const tag = await this.$api('admin').tags.getTagWithTagId(tagId);

      tagToLoad = {
        ...tag,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateTag', tagToLoad);

    } catch (error) {
      const {message} = error;
      tagToLoad = {
        ...tagToLoad,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateTag', tagToLoad);
    }
  },

  /**
   * Unload this Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setTags', []);
    commit('setCreatingTags', []);
  },

  /**
   * Reload this Store.
   *
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Create a new Tag in the Api.
   *
   * @param commit
   * @param tag {{ name: string }}
   * @return {Promise<void>}
   */
  async createTag ({commit}, tag) {
    const {name} = tag;

    if (! name) {
      throw new Error(`name is a required attribute when creating a Tag`);
    }

    let tagToCreate = {
      ...tag,
      ...{
        error: undefined,
        creating: true,
      }
    };
    commit('updateCreatingTag', tagToCreate);

    try {
      const creatingTag = await this.$api('admin').tags.createTag(tag);
      const {executionArn} = creatingTag;

      tagToCreate = {
        ...tagToCreate,
        ...creatingTag
      };
      commit('updateCreatingTag', tagToCreate);

      // start the polling function...
      ((executionArn) => {

        const getExecution = async () => {
          tagToCreate = {
            ...tagToCreate,
            ...{
              loading: true
            }
          };
          commit('updateCreatingTag', tagToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          tagToCreate = {
            ...tagToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingTag', tagToCreate);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE TAG - FAILED');
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, tag: createdTag} = output;

            if (error) {
              tagToCreate = {
                ...tagToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingTag', tagToCreate);
            }

            if (createdTag) {
              tagToCreate = {
                ...tagToCreate,
                ...createdTag,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingTag', tagToCreate);

              createdTag = {
                ...createdTag,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateTag', createdTag);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return creatingTag;

    } catch (error) {
      const {message} = error;
      tagToCreate = {
        ...tagToCreate,
        ...{
          error: message,
          creating: false,
          created: false,
        }
      };
      commit('updateCreatingTag', tagToCreate);

      throw error;
    }
  },
};
