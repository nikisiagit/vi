import dayjs from "dayjs";

/**
 * Admin - Registrations Store
 *
 */
export const state = () => ({
  /**
   * The Registrations in the store.
   */
  registrations: [],

  /**
   * The CreatingRegistration(s)
   */
  creatingRegistrations: [],

  /**
   * The UpdatingRegistration(s)
   */
  updatingRegistrations: [],

  /**
   * The list of Registration that are being/have been deleted.
   */
  deletingRegistrations: [],

  /**
   * The Registrations collection pagination token.
   */
  token: undefined,

  /**
   * The Registrations alerts.
   */
  alerts: [],

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

  registrationErrors: '', // RegistrationErrors => All errors that can be catch when performing operations like put/post/delete to an Registration
});
export const mutations = {
  /**
   * Set the Registrations state.
   *
   * @param state
   * @param registrations
   */
  registrations(state, registrations) {
    state.registrations = registrations
  },

  /**
   * Add the Registration to the store.
   *
   * @param state
   * @param registration {{registrationId: string, loaded: boolean, loading: boolean}}
   */
  registration(state, registration) {
    const index = state.registrations.findIndex(item => item.registrationId === registration.registrationId);

    if (index > -1) {
      state.registrations.splice(
        index,
        1,
        Object.assign({}, state.registrations[index], registration)
      );
    } else {
      state.registrations.push(registration);
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
   * Add the Registration to the registration state.
   *
   * @param state
   * @param registration {object}
   */
  addRegistration(state, registration) {
    state.registrations.push(registration);
  },

  /**
   * delete the Registration from the registrations state.
   *
   * @param state
   * @param registration
   */
  deleteRegistration(state, registration) {
    const index = state.registrations.findIndex((item) => {
      return item.registrationId === registration.registrationId
    })
    if (index > -1) {
      state.registrations.splice(index, 1)
    }
  },

  /**
   * Set the Alerts state to whatever is supplied.
   *
   * @param state
   * @param alerts [*]
   */
  setAlerts(state, alert = {}) {
    state.alerts.push(alert);
  },

  /**
   * Clear the Alerts state
   *
   * @param state
   * @param alerts [*]
   */
  clearAlerts(state) {
    state.alerts = [];
  },

  /**
   * Set the Registrations in the state.
   *
   * @param state
   * @param registrations []
   *
   */
  setRegistrations (state, registrations = []) {
    state.registrations = registrations || [];
  },

  /**
   * @param state
   * @param creatingRegistrations
   */
  setCreatingRegistrations (state, creatingRegistrations = []) {
    state.creatingRegistrations = creatingRegistrations || [];
  },

  /**
   * @param state
   * @param updatingRegistrations
   */
  setUpdatingRegistrations (state, updatingRegistrations = []) {
    state.updatingRegistrations = updatingRegistrations || [];
  },

  /**
   * @param state
   * @param deletingRegistrations
   */
  setDeletingRegistrations (state, deletingRegistrations = []) {
    state.deletingRegistrations = deletingRegistrations || [];
  },

  /**
   * Update the supplied Registration.
   *
   * @param state
   * @param registration {{ registrationId: string}}
   */
  updateRegistration (state, registration) {
    const {registrationId} = registration;
    const index = state.registrations.findIndex(item =>  item.registrationId === registrationId);

    if (index < 0) {
      state.registrations.push(registration);
    } else {
      state.registrations.splice(index, 1, {...state.registrations[index], ...registration})
    }
  },

  /**
   * @param state
   * @param creatingRegistration
   */
  updateCreatingRegistration (state, creatingRegistration) {
    const {executionArn} = creatingRegistration;
    const index = state.creatingRegistrations.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.creatingRegistrations.push(creatingRegistration);
    } else {
      state.creatingRegistrations.splice(index, 1, {
        ...state.creatingRegistrations[index],
        ...creatingRegistration
      });
    }
  },

  /**
   * @param state
   * @param updatingRegistration
   */
  updateUpdatingRegistration (state, updatingRegistration) {
    const {executionArn} = updatingRegistration;
    const index = state.updatingRegistrations.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.updatingRegistrations.push(updatingRegistration);
    } else {
      state.updatingRegistrations.splice(index, 1, {
        ...state.updatingRegistrations[index],
        ...updatingRegistration
      });
    }
  },

  /**
   * @param state
   * @param deletingRegistration
   */
  updateDeletingRegistration (state, deletingRegistration) {
    const {executionArn} = deletingRegistration;
    const index = state.deletingRegistrations.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.deletingRegistrations.push(deletingRegistration);
    } else {
      state.deletingRegistrations.splice(index, 1, {
        ...state.deletingRegistrations[index],
        ...deletingRegistration
      });
    }
  },
}

export const getters = {
  /**
   * Return the registrations state.
   *
   * @param state
   * @return {[]}
   */
  registrations: (state) => {
    return state.registrations || [];
  },

  /**
   * Return the number of Registrations.
   *
   * @param state
   * @return {number|number}
   */
  numberOfRegistrations: (state) => {
    return state.registrations.length || 0
  },

  /**
   * Return the list of "alerts".
   *
   * @param state
   * @returns {(function(*))|*[]}
   */
  alerts: (state) => {
    return state.alerts || [];
  },

  /**
   * Return the number of "alerts" in the store.
   *
   * @param state
   * @returns {number}
   */
  numberOfAlerts: (state) => {
    return state.alerts.length || 0;
  },

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
   * Return the Registrations identified by the supplied registrationId.
   *
   * @param state
   * @param registrationId {string}
   */
  registrationWithRegistrationId: (state) => (registrationId) => {
    return state.registrations.find(registration => {
      return registration.registrationId.toLowerCase() === registrationId.toLowerCase()
    });
  },

  /**
   * Return the CreatingRegistration identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingRegistrationWithExecutionArn: (state) => (executionArn) => {
    return state.creatingRegistrations.find(creatingRegistration => creatingRegistration.executionArn === executionArn);
  },

  /**
   * Return the UpdateRegistration identified with the specified executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  updatingRegistrationWithExecutionArn: (state) => (executionArn) => {
    return state.updatingRegistrations.find(updatingRegistration => updatingRegistration.executionArn === executionArn);

  },

  /**
   * Return the deletingRegistration item identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */

  deletingRegistrationWithExecutionArn: (state) => (executionArn) => {
    return state.deletingRegistrations.find(deletingRegistration => deletingRegistration.executionArn === executionArn);
  },

  controlsToken(state) {
    return state.controlsToken
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

    commit('setRegistrations', []);
    commit('setCreatingRegistrations', []);
    commit('setUpdatingRegistrations', []);
    commit('setDeletingRegistrations', []);
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
   * Load the Registrations from the api.
   *
   * @param context
   */
  async load({commit}) {
    try {
      commit('loading', true);
      let {registrations, token} = await this.$api('admin').registrations.listRegistrations();

      for (const registration of registrations) {
        const titleResponse = await this.$api('admin').labels.getLabelWithLabelId(registration.titleId);
        registration.title = titleResponse.text;

        const descriptionResponse = await this.$api('admin').labels.getLabelWithLabelId(registration.descriptionId);
        registration.description = descriptionResponse.text

        registration.registrants = 100;
        registration.status = true;
      }

      registrations.map(registration => commit('updateRegistration',  {
        ...registration,
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
   * Load the Registration with the specified RegistrationId.
   *
   * @param commit
   * @param registrationId
   * @return {Promise<{loaded: boolean, registrationId: *, loading: boolean}>}
   */
  async loadRegistrationWithRegistrationId({commit}, registrationId) {
    let registration = {
      registrationId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateRegistration', registration);
      registration = await this.$api('admin').registrations.getRegistrationWithRegistrationId(registrationId);

      const titleResponse = await this.$api('admin').labels.getLabelWithLabelId(registration.titleId);
      registration.title = titleResponse.text;

      const descriptionResponse = await this.$api('admin').labels.getLabelWithLabelId(registration.descriptionId);
      registration.description = descriptionResponse.text

      registration = {
        ...registration,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateRegistration', registration);
      return registration;

    } catch (error) {
      const {message} = error;
      registration = {
        ...registration,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateRegistration', registration);
    }
  },

  /**
   * Create a Registration.
   *
   * @param context
   * @param registration {{ name: string, endDateTime: string, startDateTime: string}}
   * @return {Promise<unknown>}
   */
  async createRegistration({commit, dispatch}, registration) {
    commit('loading', true);
    const {name} = registration;

    if (! name) {
      throw new Error (`name is required`);
    }

    let registrationToCreate = {
      ...registration,
      ...{
        error: undefined,
        creating: true,
      }
    };
    // commit('updateCreatingRegistration', registrationToCreate);

    try {
      let creatingRegistration = await this.$api('admin').registrations.createRegistration(registration);
      const {executionArn, startDate} = creatingRegistration;
      commit('loading', false);

      registrationToCreate = {
        ...registrationToCreate,
        ...creatingRegistration,
      };
      commit('updateCreatingRegistration', registrationToCreate);

      // start the polling function...
      ((executionArn) => {

        const getExecution = async () => {
          registrationToCreate = {
            ...registrationToCreate,
            ...{
              loading: true,
            },
          };
          commit('updateCreatingRegistration', registrationToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          registrationToCreate = {
            ...registrationToCreate,
            ...{
              loading: false,
              status,
              stopDate,
            },
          };
          commit('updateCreatingRegistration', registrationToCreate);

          if (status === 'RUNNING') {
            console.log('## CREATE REGISTRATION - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE REGISTRATION - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE REGISTRATION - SUCCEEDED');
            let {output} = execution;
            output = JSON.parse(output);

            let {error, registration: createdRegistration} = output;

            if (error) {
              registrationToCreate = {
                ...registrationToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingRegistration', registrationToCreate);
            }

            if (createdRegistration) {
              registrationToCreate = {
                ...registrationToCreate,
                ...createdRegistration,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingRegistration', registrationToCreate);

              createdRegistration = {
                ...createdRegistration,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateRegistration', createdRegistration);

              commit('setAlerts', {
                type: 'success',
                alerts: `Registration called '${registrationToCreate.name}' created successfully`,
                generated: dayjs().format("MMM DD, YYYY"),
            });
            }
          }
        };
        setTimeout(getExecution, 1000);
      })(executionArn);

      return registrationToCreate;

    } catch (error) {
      const { message } = error;

      registrationToCreate = {
        ...registrationToCreate,
        ...{
          error: message,
          creating: false,
          created: false,
        },
      };
      commit('updateCreatingRegistration', registrationToCreate);
      commit('setAlerts', {
        type: 'error',
        alerts: `Registration called '${registrationToCreate.name || registrationToCreate.title.text}' could not be created`,
        generated: dayjs().format("MMM DD, YYYY"),
      });

      throw error;
    }
  },

  /**
   * Update the Registration.
   *
   * @param commit
   *
   * @param updateRegistration
   * @returns {Promise<*>}
   */
  async updateRegistration ({commit}, updateRegistration) {
    console.log(updateRegistration);

    const {registrationId} = updateRegistration

    if (! registrationId) {
      throw new Error(`registrationId is required`);
    }

    // the update
    let update = {};

    const allowed = [
      "name",
      "description",
      "title",
      "registrationStatus",
    ];

    for (const name in updateRegistration) {
      if (allowed.includes(name)) {
        update[name] = updateRegistration[name];
      }
    }

    let registrationUpdate = {
      registrationId,
      update,
      updating: true,
      updated: false,
    }

    try {
      const updatingRegistration = await this.$api('admin').registrations.updateRegistrationWithRegistrationId(registrationId, update);
      const {executionArn} = updatingRegistration;

      registrationUpdate = {
        ...registrationUpdate,
        ...updatingRegistration,
      };
      commit('updateUpdatingRegistration', registrationUpdate);

      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {
          registrationUpdate = {
            ...registrationUpdate,
            ...{
              loading: true,
            }
          };
          commit('updateUpdatingRegistration', registrationUpdate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## UPDATE REGISTRATION - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          registrationUpdate = {
            ...registrationUpdate,
            ...{
              loading: false,
              status,
              stopDate,
            }
          };
          commit('updateUpdatingRegistration', registrationUpdate);

          if (status === 'RUNNING') {
            console.log('## UPDATE REGISTRATION - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## UPDATE REGISTRATION - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## UPDATE REGISTRATION - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, registration: updatedRegistration} = output;

            if (error) {
              registrationUpdate = {
                ...registrationUpdate,
                ...{
                  error,
                  updating: false,
                }
              };
              commit('updateUpdatingRegistration', registrationUpdate);
            }

            if (updatedRegistration) {
              registrationUpdate = {
                ...registrationUpdate,
                ...{
                  updating: false,
                  updated: true,
                }
              };
              commit('updateUpdatingRegistration', registrationUpdate);

              /**
               ** Change/Mutate the specific Registration in the store
               */
              commit('updateRegistration', {
                ...updatedRegistration,
                ...{
                  loaded: true,
                  loading: false,
                }
              });

              commit('setAlerts', {
                type: 'success',
                alerts: `Registration called '${registrationUpdate.name || registrationUpdate.title.text}' updated successfully`,
                generated: dayjs().format("MMM DD, YYYY"),
            });
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return updatingRegistration;

    } catch (error) {
      const {message} = error;
      registrationUpdate = {
        ...registrationUpdate,
        ...{
          error: message,
          updating: false,
        }
      };
      commit('updateUpdatingRegistration', registrationUpdate);
      commit('setAlerts', {
        type: 'error',
        alerts: `Registration called '${registrationUpdate.name || registrationUpdate.title.text}' could not be updated`,
        generated: dayjs().format("MMM DD, YYYY"),
      });

      throw error;
    }
  },

  /**
   * Delete the Registration.
   *
   * @param context
   * @param registrationId
   * @returns {Promise<void>}
   */
  async deleteRegistration (context, registrationId) {
    let deletingRegistration = null
    try {
      deletingRegistration = await this.$api('admin').registrations.deleteRegistrationWithRegistrationId(registrationId);
      const {executionArn} = deletingRegistration;

      context.commit('updateDeletingRegistration',
        Object.assign({}, deletingRegistration, {
          deleting: true,
        })
      );
      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {

          context.commit('updateDeletingRegistration',
            Object.assign({}, deletingRegistration, {
              loading: true,
            })
          );

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          context.commit('updateDeletingRegistration',
            Object.assign({}, deletingRegistration, {
              loading: false,
              status,
              stopDate,
            })
          );

          if (status === 'RUNNING') {
            console.log('## DELETING REGISTRATION - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## DELETING REGISTRATION - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## DELETING REGISTRATION - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, registration: deletedRegistration} = output;

            if (error) {

              context.commit('updateDeletingRegistration',
                Object.assign({}, deletingRegistration, {
                  error,
                  deleting: false,
                })
              );
            }

            if (deletedRegistration) {
              context.commit('updateDeletingRegistration',
                Object.assign({}, deletingRegistration, {
                  deleting: false,
                  deleted: true,
                })
              );

              context.commit('deleteRegistration', deletedRegistration);
            }
          }
        };
        setTimeout(getExecution, 1000);
      })(executionArn);

      return deletingRegistration;
    }
    catch (error) {
      const {message} = error;

      context.commit('updateDeletingRegistration', {
        ...{
          error: message,
          deleting: false,
          deleted: false
        }
      });

      context.commit('setAlerts', {
        type: 'error',
        alerts: `Registration called '${deletingRegistration.name || deletingRegistration.title.text}' could not be deleted`,
        generated: dayjs().format("MMM DD, YYYY"),
      });
      throw error;
    }
  },

  /**
   * Clear Alerts
   *
   * @param commit
   */
  clearAlerts({ commit }) {
    commit('clearAlerts')
  },

};
