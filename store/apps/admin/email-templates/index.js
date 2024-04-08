/**
 * Venue App - Admin - EmailTemplates Store
 *
 * @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-151
 */
export const state = () => ({

  /**
   * The list of EmailTemplate that have been added to the Partition.
   */
  emailTemplates: [],

  /**
   * The list of CreatingEmailTemplate that are being/have been updated.
   */
  creatingEmailTemplates: [],

  /**
   * The list of UpdatingEmailTemplate that are being/have been updated.
   */
  updatingEmailTemplates: [],

  /**
   * The list of RemovingEmailTemplate that are being/have been removed.
   */
  removingEmailTemplates: [],

  /**
   * Pagination token.
   */
  token: undefined,

  /**
   * Has the store loaded?
   */
  loaded: false,

  /**
   * Is the store loading?
   */
  loading: false,

  /**
   * The last error the store saw(?)
   */
  error: undefined,
});

export const mutations = {
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


  // EmailTemplate

  /**
   * Set the EmailTemplates to whatever is supplied.
   *
   * @param state
   * @param emailTemplates []
   */
  setEmailTemplates (state, emailTemplates = []) {
    this.emailTemplates = emailTemplates || [];
  },

  /**
   * Update the EmailTemplate in the store.
   *
   * @param state
   * @param emailTemplate {{emailTemplateId: string}}
   */
  updateEmailTemplate (state, emailTemplate) {
    const {emailTemplateId} = emailTemplate;
    const index = state.emailTemplates.findIndex(item => item.emailTemplateId === emailTemplateId);

    if (index < 0) {
      state.emailTemplates.push(emailTemplate);
    } else {
      state.emailTemplates.splice(index, 1,
        {
          ...state.emailTemplates[index],
          ...emailTemplate
        }
      );
    }
  },

  /**
   * Remove the given EmailTemplate form this state
   *
   * @param state
   * @param emailTemplate {{emailTemplateId: string}}
   */
  removeEmailTemplate(state, emailTemplate) {
    const index = state.emailTemplates.findIndex(item => item.emailTemplateId === emailTemplate.emailTemplateId);

    if (index > -1) {
      state.emailTemplates.splice(index, 1)
    }
  },


  // CREATING

  /**
   * Set the creatingEmailTemplates state to whatever is supplied.
   *
   * @param state
   * @param creatingEmailTemplates []
   */
  setCreatingEmailTemplates (state, creatingEmailTemplates = []) {
    state.creatingEmailTemplates = creatingEmailTemplates;
  },


  /**
   * Update the CreatingEmailTemplate.
   *
   * @param state
   * @param creatingEmailTemplate
   */
  updateCreatingEmailTemplate (state, creatingEmailTemplate) {
    const {executionArn} = creatingEmailTemplate;
    const index = state.creatingEmailTemplates.findIndex(item => item.executionArn === executionArn);

    if (index < 0) {
      state.creatingEmailTemplates.push(creatingEmailTemplate);
    } else {
      state.creatingEmailTemplates.splice(index, 1,
        {
          ...state.creatingEmailTemplates[index],
          ...creatingEmailTemplate
        }
      );
    }
  },

  // UPDATING

  /**
   * Set the updatingEmailTemplates state to whatever is supplied.
   *
   * @param state
   * @param updatingEmailTemplates []
   */
  setUpdatingEmailTemplates (state, updatingEmailTemplates = []) {
    state.updatingEmailTemplates = updatingEmailTemplates;
  },

  /**
   * Update the UpdatingEmailTemplate.
   *
   * @param state
   * @param updatingEmailTemplate {{executionArn: string}}
   */
  updateUpdatingEmailTemplate (state, updatingEmailTemplate) {
    const {executionArn} = updatingEmailTemplate;
    const index = state.updatingEmailTemplates.findIndex(item => item.executionArn === executionArn);

    if (index < 0) {
      state.updatingEmailTemplates.push(updatingEmailTemplate);
    } else {
      state.updatingEmailTemplates.splice(index, 1,
        {
          ...state.updatingEmailTemplates[index],
          ...updatingEmailTemplate
        }
      );
    }
  },


  // REMOVING

  /**
   * Set the removingEmailTemplates state to whatever is supplied.
   *
   * @param state
   * @param removingEmailTemplates []
   */
  setRemovingEmailTemplates (state, removingEmailTemplates = []) {
    state.removingEmailTemplates = removingEmailTemplates;
  },

  /**
   * Update the RemovingEmailTemplate.
   *
   * @param state
   * @param removingEmailTemplate {{name: string, email: string, creating: boolean, executionArn }}
   */
  updateRemovingEmailTemplate (state, removingEmailTemplate) {
    const {executionArn} = removingEmailTemplate;
    const index = state.removingEmailTemplates.findIndex(item => item.executionArn === executionArn);

    if (index > -1) {
      state.removingEmailTemplates.splice(
        index, 1,
        Object.assign({}, state.removingEmailTemplates[index], removingEmailTemplate)
      )
    } else {
      state.removingEmailTemplates.push(removingEmailTemplate);
    }
  },
};

export const getters = {
  // TEMPLATE

  /**
   * @param state
   * @returns {[]|*[]}
   */
  emailTemplates: (state) => {
    return state.emailTemplates || [];
  },

  /**
   * @param state
   * @returns {function(*): *}
   */
  emailTemplateWithEmailTemplateId: (state) => (emailTemplateId) => {
    return state.emailTemplates.find(template => template.emailTemplateId === emailTemplateId);
  },

  /**
   * Return the number of EmailTemplates in the Partition.
   *
   * @param state
   * @returns {number|number}
   */
  numberOfEmailTemplates: (state) => {
    return state.emailTemplates.length || 0;
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

  /**
   * Return the CreatingEmailTemplate identified by the supplied executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  creatingEmailTemplateWithExecutionArn: (state) => (executionArn) => {
    return state.creatingEmailTemplates.find(creatingEmailTemplate => creatingEmailTemplate.executionArn === executionArn);
  },

  /**
   * Return the UpdatingEmailTemplate identified by the supplied executionArn.
   *
   * @param state
   * @return {(function(*))|*}
   */
  updatingEmailTemplateWithExecutionArn: (state) => (executionArn) => {
    return state.updatingEmailTemplates.find(updatingTemplate => updatingTemplate.executionArn === executionArn);
  },

  /**
   * Return the RemovingTemplate item identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  removingEmailTemplateWithExecutionArn: (state) => (executionArn) => {
    return state.removingEmailTemplates.find(removingEmailTemplate => removingEmailTemplate.executionArn === executionArn);
  },
};

export const actions = {
  /**
   * Load the Store with a list of EmailTemplates.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async load ({commit}) {
   try {
     commit('loading', true);

     const {token, emailTemplates} = await this.$api('admin').emailTemplates.listEmailTemplates();

     emailTemplates.map((emailTemplate) => {

       commit('updateEmailTemplate', {
         ...emailTemplate,
         ...{
           loaded: true,
           loading: false,
           error: undefined
         }
       })
     });

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
   * Load the EmailTemplate with the specified EmailTemplateId.
   *
   * @param commit
   * @param templateId {string}
   * @returns {Promise<void>}
   */
  async loadEmailTemplateWithEmailTemplateId ({commit}, emailTemplateId) {
    let emailTemplateToLoad = {
      emailTemplateId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateEmailTemplate', emailTemplateToLoad);
      const emailTemplate = await this.$api('admin').emailTemplates.getEmailTemplateWithEmailTemplateId(emailTemplateId);

      emailTemplateToLoad = {
        ...emailTemplateToLoad,
        ...emailTemplate,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateEmailTemplate', emailTemplateToLoad);

    } catch (error) {
      const {message} = error;
      emailTemplateToLoad = {
        ...emailTemplateToLoad,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateEmailTemplate', emailTemplateToLoad);
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
    commit('setEmailTemplates', []);
    commit('setCreatingEmailTemplates', []);
    commit('setUpdatingEmailTemplates', []);
    commit('setRemovingEmailTemplates', []);
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
   * Create an EmailTemplate.
   *
   * @param commit
   * @param createEmailTemplate {{ }}
   * @returns {Promise<void>}
   */
  async createEmailTemplate({commit}, createEmailTemplate) {
    console.log(`## EMAIL TEMPLATE STORE - CREATE EMAIL TEMPLATE`);
    console.log(createEmailTemplate);

    try {
      let creatingEmailTemplate = await this.$api('admin').emailTemplates.createEmailTemplate(createEmailTemplate)
      const {executionArn} = creatingEmailTemplate;

      creatingEmailTemplate = {
        ...createEmailTemplate,
        ...creatingEmailTemplate,
        ...{
          error: undefined,
          creating: true
        }
      };
      commit('updateCreatingEmailTemplate', creatingEmailTemplate);

      ((executionArn) => {
        const getExecution = async () => {
          creatingEmailTemplate = {
            ...creatingEmailTemplate,
            ...{
              loading: true,
            }
          };
          commit('updateCreatingEmailTemplate', creatingEmailTemplate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          creatingEmailTemplate = {
            ...creatingEmailTemplate,
            ...{
              loading: false,
              status,
              stopDate,
            }
          };
          commit('updateCreatingEmailTemplate', creatingEmailTemplate);


          if (status === 'RUNNING') {
            console.log('## CREATE EMAIL TEMPLATE - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE EMAIL TEMPLATE - FAILED');
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, emailTemplate: createdEmailTemplate} = output;

            if (error) {
              creatingEmailTemplate = {
                ...creatingEmailTemplate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingEmailTemplate', creatingEmailTemplate);
            }

            if (createdEmailTemplate) {

            }
          }
        };

        setTimeout(getExecution, 3000);
      })(executionArn);

      return creatingEmailTemplate;

    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  /**
   * Update the EmailTemplate.
   *
   * @param context
   * @param emailTemplateUpdate {{ }}
   * @returns {Promise<*>}
   */
  async updateEmailTemplate({commit}, emailTemplateUpdate) {
    console.log(`## EMAIL TEMPLATE STORE - UPDATE EMAIL TEMPLATE`);

    try {
      const updatingEmailTemplate = await this.$api('admin').emailTemplates.updateEmailTemplateWithEmailTemplateId(emailTemplateUpdate);
      const {executionArn} = updatingEmailTemplate;

      let updateEmailTemplate = {
        ...updatingEmailTemplate,
        ...{
          updating: true
        }
      };
      commit('updateUpdatingEmailTemplate', updatingEmailTemplate)


      const poll = (executionArn) => {
        const getExecution = async () => {
          updateEmailTemplate = {
            ...updateEmailTemplate,
            ...{
              loading: true
            }
          };
          commit('updatingUpdatingEmailTemplate', updateEmailTemplate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution

          updateEmailTemplate = {
            ...updateEmailTemplate,
            ...{
              loading: false
            }
          };
          commit('updatingUpdatingEmailTemplate', updateEmailTemplate);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {

          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, emailTemplate: updatedEmailTemplate} = output;

            if (error) {
              updateEmailTemplate = {
                ...updateEmailTemplate,
                ...{
                  error,
                  updating: false,
                  loaded: false
                },
              };
              commit('updateUpdatingEmailTemplate', updateEmailTemplate);
            }

            if (updatedEmailTemplate) {
              updateEmailTemplate = {
                ...updateEmailTemplate,
                ...updatedEmailTemplate,
                ...{
                  updated: true,
                  updating: false,
                  loaded: false
                },
              };
              commit('updateUpdatingEmailTemplate', updateEmailTemplate);

              updatedEmailTemplate = {
                ...updatedEmailTemplate,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined,
                }
              };

              commit('updateTemplate', updatedEmailTemplate);
            }
          }
        };

        setTimeout(getExecution, 2000);
      }
      poll(executionArn);

      return updatingEmailTemplate;

    } catch (error) {
      console.log(`## TEMPLATES STORE - UPDATE-TEMPLATE - ERROR`);
      console.log(JSON.stringify(error));
      commit('error', error);
      commit('loading', false);
    }
  },

  /**
   * Remove the EmailTemplate identified by the supplied EmailTemplateId.
   *
   * @param context
   * @param emailTemplateId {string}
   * @returns {Promise<*>}
   */
  async removeEmailTemplate ({commit}, emailTemplateId) {
    console.log(`## EMAIL TEMPLATES STORE - REMOVE EMAIL TEMPLATE`);
    console.log(`## EMAIL TEMPLATES STORE - EMAIL TEMPLATE ID TO REMOVE - ${emailTemplateId}`);

    try {
      let removingEmailTemplate = await this.$api('admin').emailTemplates.removeEmailTemplateWithEmailTemplateId(emailTemplateId);
      const {executionArn} = removingEmailTemplate;

      removingEmailTemplate = {
        ...removingEmailTemplate,
        ...{
          removed: false
        }
      };
      commit('updateRemovingEmailTemplate', removingEmailTemplate)

      ((executionArn) => {
        const getExecution = async () => {

          removingEmailTemplate = {
            ...removingEmailTemplate,
            ...{
              loading: true
            }
          };
          commit('updateRemovingEmailTemplate', removingEmailTemplate)

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);

          const {status, stopDate} = execution

          removingEmailTemplate = {
            ...removingEmailTemplate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateRemovingEmailTemplate', removingEmailTemplate)

          if (status === 'RUNNING') {
            setTimeout(getExecution, 3000);
          }

          if (status === 'FAILED') {
            console.log(`## UPDATE EMAIL TEMPLATE - FAILED`);
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, emailTemplate: removedEmailTemplate} = output;

            if (error) {
              removingEmailTemplate = {
                ...removingEmailTemplate,
                ...{
                  error: error,
                  removed: false,
                }
              };
              commit('updateRemovingEmailTemplate', removedEmailTemplate);
            }

            if (removedEmailTemplate) {

              removingEmailTemplate = {
                ...removingEmailTemplate,
                ...removedEmailTemplate,
                ...{
                  removed: true,
                }
              };
              commit('updateRemovingEmailTemplate', removedEmailTemplate);

              removedEmailTemplate = {
                ...removedEmailTemplate,
                ...{
                  loading: false,
                  loaded: false,
                  error: undefined,
                }
              };
              commit('updateEmailTemplate', removedEmailTemplate);

            }
          }
        };

        setTimeout(getExecution, 3000);
      })(executionArn);

      return removingEmailTemplate;

    } catch (error) {
      console.log(`## EMAIL TEMPLATES STORE - REMOVE EMAIL TEMPLATE - ERROR`);
      console.log(JSON.stringify(error));
      commit('error', error);
      commit('loading', false);
    }
  },
};
