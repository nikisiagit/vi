/**
 * Admin - Option Store
 *
 */
export const state = () => ({
  /**
   * The options in the store.
   */
  options: [],

  /**
   * The CreatingOption(s)
   */
  creatingOptions: [],

  /**
   * The UpdatingOption(s)
   */
  updatingOptions: [],

  /**
   * The list of Options that are being/have been deleted.
   */
  deletingOptions: [],

  /**
   * The Options collection pagination token.
   */
  token: undefined,

  /**
   * The error state
   */
  error: undefined,

  /**
   * The loading state
   */
  loading: false,

  /**
   * The loaded state
   */
  loaded: false,

  optionErrors: ''
});


export const mutations = {
  /**
   * Set the Options state.
   *
   * @param state
   * @param options
   */
  options(state, options) {
    state.options = options
  },

  /**
   * Add the Option to the store.
   *
   * @param state
   * @param option {{optionId: string, name: string, type: string, required: boolean, options: []}}
   */
  option(state, option) {
    const index = state.options.findIndex(item => item.optionId === option.optionId);

    if (index > -1) {
      state.options.splice(
        index,
        1,
        Object.assign({}, state.options[index], option)
      );
    } else {
      state.options.push(option);
    }
  },

  creating(state, creating = undefined) {
    state.creating = creating;
  },

  executions(state, executions = []) {
    state.executions = executions;
  },

  execution(state, execution) {
    const index = state.executions.findIndex(item => item.executionArn === execution.executionArn);

    if (index > -1) {
      state.executions.splice(
        index,
        1,
        Object.assign({}, state.executions[index], execution)
      );
    } else {
      state.executions.push(execution);
    }
  },


  /**
   * Set the loading state.
   *
   * @param state
   * @param loading {boolean}
   */
  loading(state, loading = false) {
    state.loading = loading
  },

  loaded(state, loaded = false) {
    state.loaded = loaded;
  },

  error(state, error) {
    state.error = error
  },

  /**
   * Set the token state.
   *
   * @param state
   * @param token {string | undefined}
   */
  token(state, token) {
    state.token = token
  },


  /**
   * Add the Option to the Option state.
   *
   * @param state
   * @param option {object}
   */
  addOption(state, option) {
    state.options.push(option);
  },

  /**
   * delete the option from the Options state.
   *
   * @param state
   * @param option
   */
  deleteOption(state, option) {
    const index = state.options.findIndex((item) => {
      return item.optionId === option.optionId
    })

    if (index > -1) {
      state.options.splice(index, 1)
    }
  },

  setOptionsErrors(state, errors) {
    state.optionErrors = errors
  },

  optionToCreate(state, optionToCreate) {
    state.optionToCreate = optionToCreate;
  },

  /**
   * Set the Options in the state.
   *
   * @param state
   * @param Options []
   *
   */
  setOptions (state, options = []) {
    state.options = options || [];
  },

  /**
   * @param state
   * @param creatingOptions
   */
  setCreatingOptions (state, creatingOptions = []) {
    state.creatingOptions = creatingOptions || [];
  },

  /**
   * @param state
   * @param updatingOptions
   */
  setUpdatingOptions (state, updatingOptions = []) {
    state.updatingOptions = updatingOptions || [];
  },

  /**
   * @param state
   * @param deletingOptions
   */
  setDeletingOptions (state, deletingOptions = []) {
    state.deletingOptions = deletingOptions || [];
  },

  /**
   * Update the supplied Option.
   *
   * @param state
   * @param option {{ optionId: string}}
   */
  updateOption (state, option) {
    const {optionId} = Option;
    const index = state.options.findIndex(item =>  item.optionId === optionId);

    if (index < 0) {
      state.options.push(option);
    } else {
      state.options.splice(index, 1, {...state.options[index], ...option})
    }
  },

  /**
   * @param state
   * @param creatingOption
   */
  updateCreatingOption (state, creatingOption) {
    const {executionArn} = creatingOption;
    const index = state.creatingOptions.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.creatingOptions.push(creatingOption);
    } else {
      state.creatingOptions.splice(index, 1, {
        ...state.creatingOptions[index],
        ...creatingOption
      });
    }
  },

  /**
   * @param state
   * @param updatingOption
   */
  updateUpdatingOption (state, updatingOption) {
    const {executionArn} = updatingOption;
    const index = state.updatingOptions.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.updatingOptions.push(updatingOption);
    } else {
      state.updatingOptions.splice(index, 1, {
        ...state.updatingOptions[index],
        ...updatingOption
      });
    }
  },

  /**
   * @param state
   * @param deletingOption
   */
  updateDeletingOption (state, deletingOption) {
    const {executionArn} = deletingOption;
    const index = state.deletingOptions.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.deletingOptions.push(deletingOption);
    } else {
      state.deletingOptions.splice(index, 1, {
        ...state.deletingOptions[index],
        ...deletingOption
      });
    }
  },


  /**
   * Add or update a deletingOption item.
   *
   * @param state
   * @param deletingOption {{name: string, email: string, creating: boolean, executionArn }}
   */
  deletingOption (state, deletingOption) {
    const index = state.deletingOptions.findIndex(item => item.executionArn === deletingOption.executionArn);

    if (index > -1) {
      state.deletingOptions.splice(
        index, 1,
        Object.assign({}, state.deletingOptions[index], deletingOption)
      )
    } else {
      state.deletingOptions.push(deletingOption);
    }
  },

}

export const getters = {
  /**
   * Return the Options state.
   *
   * @param state
   * @return {[]}
   */
  options: (state) => {
    return state.options || [];
  },

  /**
   * Return the number of options.
   *
   * @param state
   * @return {number|number}
   */
  numberOfOptions: (state) => {
    return state.options.length || 0
  },

  // executions: (state) => {
  //   return state.executions || [];
  // },

  /**
   * Return the loading state.
   *
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading
  },

  loaded: (state) => {
    return state.loaded;
  },

  error: (state) => {
    return state.error || undefined;
  },

  /**
   * Return the Options identified by the supplied OptionId.
   *
   * @param state
   * @param optionId {string}
   */
  optionWithOptionId: (state) => (optionId) => {
    return state.options.find(option => {
      return option.optionId.toLowerCase() === optionId.toLowerCase()
    });
  },

  /**
   * Return the CreatingOption identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingOptionWithExecutionArn: (state) => (executionArn) => {
    return state.creatingOptions.find(creatingOption => creatingOption.executionArn === executionArn);
  },

  /**
   * Return the UpdateOption identified with the specified executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  updatingOptionWithExecutionArn: (state) => (executionArn) => {
    return state.updatingOptions.find(updatingOption => updatingOption.executionArn === executionArn);

  },

  /**
   * Return the deletingOption item identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  deletingOptionWithExecutionArn: (state) => (executionArn) => {
    return state.deletingOptions.find(deletingOption => deletingOption.executionArn === executionArn);
  },

  optionErrors(state) {
    return state.optionErrors || [];
  },

}

export const actions = {

  /**
   * @param commit
   * @return {Promise<void>}
   */
  async unload({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);

    commit('setOptions', []);
    commit('setCreatingOptions', []);
    commit('setUpdatingOptions', []);
    commit('setDeletingOptions', []);
  },

  /**
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the Options from the api.
   *
   * @param context
   */
  async load({commit},registrationId,fieldId) {
    try {
      commit('loading', true);
      let {options, token} = await this.$api('admin').options.listOptions(registrationId,fieldId);

      options.map(option => commit('updateOption',  {
        ...option,
        ...{
          error: undefined,
          loading: false,
          loaded: true
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
   * Load the Option with the specified OptionId.
   *
   * @param commit
   * @param registrationId {string}
   * @param fieldId {string}
   * @param optionId {string}
   * @return {Promise<void>}
   */
  async loadOptionWithOptionId({commit}, registrationId,fieldId,optionId) {
    let option = {
      optionId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateOption', option);
      option = await this.$api('admin').registrations.getOptionWithOptionId(registrationId,fieldId,optionId);

      option = {
        ...option,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateOption', option);

    } catch (error) {
      const {message} = error;
      option = {
        ...option,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateOption', option);
    }
  },

  /**
   * Create an Option.
   *
   * @param context
   * @param Option {object}
   * @return {Promise<unknown>}
   */
  async createOption({commit, dispatch}, option) {
    let optionToCreate = {
      ...option,
      ...{
        error: undefined,
        creating: true,
      }
    };

    const {registrationId,fieldId} = option;

    try {
      let creatingOption = await this.$api('admin').registrations.createOption(registrationId, fieldId, optionToCreate);
      const {executionArn, startDate} = creatingOption;

      optionToCreate = {
        ...optionToCreate,
        ...creatingOption,
      };
      commit('updateCreatingOption', optionToCreate);

      // start the polling function...
      ((executionArn) => {

        const getExecution = async () => {
          optionToCreate = {
            ...optionToCreate,
            ...{
              loading: true,
            },
          };
          commit('updateCreatingOption', optionToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          optionToCreate = {
            ...optionToCreate,
            ...{
              loading: false,
              status,
              stopDate,
            },
          };
          commit('updateCreatingOption', optionToCreate);

          if (status === 'RUNNING') {
            console.log('## CREATE Option - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE Option - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE Option - SUCCEEDED');
            let {output} = execution;
            output = JSON.parse(output);

            let {error, option: createdOption} = output;

            if (error) {
              optionToCreate = {
                ...optionToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingOption', optionToCreate);
            }

            if (createdOption) {
              optionToCreate = {
                ...optionToCreate,
                ...createdOption,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingOption', optionToCreate);

              createdOption = {
                ...createdOption,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateOption', createdOption);

            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return creatingOption;

    } catch (error) {
      const { message } = error;

      optionToCreate = {
        ...optionToCreate,
        ...{
          error: message,
          creating: false,
          created: false,
        },
      };
      commit('updateCreatingOption', optionToCreate);
      throw error;
    }
  },

  /**
   * Update the Option.
   *
   * @param commit
   * @param registrationId
   * @param fieldId
   * @param updateOption
   * @returns {Promise<*>}
   */
  async updateOption ({commit}, registrationId,fieldId,updateOption) {
    console.log(updateOption);

    const {optionId} = updateOption

    if (! optionId) {
      throw new Error(`OptionId is required`);
    }

    // the update
    let update = {};

    const allowed = [
      'name',
      'value',
    ];

    for (const name in updateOption) {
      if (allowed.includes(name)) {
        update[name] = updateOption[name];
      }
    }

    let optionUpdate = {
      optionId,
      update,
      updating: true,
      updated: false,
    }

    try {
      const updatingOption = await this.$api('admin').registrations.updateOptionWithOptionId(registrationId,fieldId,optionId, update);
      const {executionArn} = updatingOption;

      optionUpdate = {
        ...optionUpdate,
        ...updatingOption,
      };
      commit('updateUpdatingOption', optionUpdate);

      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {
          optionUpdate = {
            ...optionUpdate,
            ...{
              loading: true,
            }
          };
          commit('updateUpdatingOption', optionUpdate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## UPDATE Option - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          optionUpdate = {
            ...optionUpdate,
            ...{
              loading: false,
              status,
              stopDate,
            }
          };
          commit('updateUpdatingOption', optionUpdate);

          if (status === 'RUNNING') {
            console.log('## UPDATE Option - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## UPDATE Option - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## UPDATE Option - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, option: updatedOption} = output;

            if (error) {
              optionUpdate = {
                ...optionUpdate,
                ...{
                  error,
                  updating: false,
                }
              };
              commit('updateUpdatingOption', optionUpdate);
            }

            if (updatedOption) {
              optionUpdate = {
                ...optionUpdate,
                ...{
                  updating: false,
                  updated: true,
                }
              };
              commit('updateUpdatingOption', optionUpdate);

              /**
               ** Change/Mutate the specific Option in the store
               */
              commit('updateOption', {
                ...updatedOption,
                ...{
                  loaded: true,
                  loading: false,
                }
              });
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return updatingOption;

    } catch (error) {
      const {message} = error;
      optionUpdate = {
        ...optionUpdate,
        ...{
          error: message,
          updating: false,
        }
      };
      commit('updateUpdatingOption', optionUpdate);
      throw error;
    }
  },

  /**
   * Delete the Option.
   *
   * @param context
   * @param registrationId
   * @param fieldId
   * @param OptionId
   * @returns {Promise<void>}
   */
  async deleteOption (context, registrationId,fieldId,optionId) {
    console.log(`## Option STORE - delete-Option`);
    console.log(`## Option ID TO delete`);

    try {
      const deletingOption = await this.$api('admin').registrations.deleteOptionWithOptionId(registrationId,fieldId,optionId);
      const {executionArn} = deletingOption;

      context.commit('updateDeletingOption',
        Object.assign({}, deletingOption, {
          deleting: true,
        })
      );

      /**
       * The Polling function we will create to retrieve the status of the deleteOption request.
       *
       * @link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
       * @param deletingOption
       */
      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {

          context.commit('updateDeletingOption',
            Object.assign({}, deletingOption, {
              loading: true,
            })
          );

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## Deleting Option - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          context.commit('updateDeletingOption',
            Object.assign({}, deletingOption, {
              loading: false,
              status,
              stopDate,
            })
          );

          if (status === 'RUNNING') {
            console.log('## Deleting Option - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## Deleting Option - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## Deleting Option - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, option: deletedOption} = output;

            if (error) {
              context.commit('updateDeletingOption',
                Object.assign({}, deletedOption, {
                  error,
                  deleting: false,
                })
              );
            }

            if (deletedOption) {
              context.commit('updateDeletingOption',
                Object.assign({}, deletedOption, {
                  deleting: false,
                  deleted: true,
                })
              );

              /**
               ** delete the specific Option from the store
               */
              context.commit('deleteOption', deletedOption);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return deletingOption;

    } catch (error) {
      const {message} = error;

      context.commit('updateDeletingOption', {
        ...{
          error: message,
          deleting: false,
          deleted: false
        }
      });
      throw error;
    }
  },
};
