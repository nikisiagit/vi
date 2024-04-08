/**
 * Admin - Field Store
 *
 */
export const state = () => ({
  /**
   * The Fields in the store.
   */
  fields: [],

  /**
   * The CreatingField(s)
   */
  creatingFields: [],

  /**
   * The UpdatingField(s)
   */
  updatingFields: [],

  /**
   * The list of Fields that are being/have been deleted.
   */
  deletingFields: [],

  /**
   * The Fields collection pagination token.
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

  fieldErrors: ''
});


export const mutations = {
  /**
   * Set the Fields state.
   *
   * @param state
   * @param fields
   */
  fields(state, fields) {
    state.fields = fields
  },

  /**
   * Add the Field to the store.
   *
   * @param state
   * @param field {{fieldId: string, name: string, type: string, required: boolean, options: []}}
   */
  field(state, field) {
    const index = state.fields.findIndex(item => item.fieldId === field.fieldId);

    if (index > -1) {
      state.fields.splice(
        index,
        1,
        Object.assign({}, state.fields[index], field)
      );
    } else {
      state.fields.push(field);
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
   * Add the Field to the field state.
   *
   * @param state
   * @param field {object}
   */
  addField(state, field) {
    state.fields.push(field);
  },

  /**
   * delete the Field from the fields state.
   *
   * @param state
   * @param field
   */
  deleteField(state, field) {
    const index = state.fields.findIndex((item) => {
      return item.fieldId === field.fieldId
    })

    if (index > -1) {
      state.fields.splice(index, 1)
    }
  },

  setFieldsErrors(state, errors) {
    state.fieldErrors = errors
  },

  fieldToCreate(state, fieldToCreate) {
    state.fieldToCreate = fieldToCreate;
  },

  /**
   * Set the Fields in the state.
   *
   * @param state
   * @param fields []
   *
   */
  setFields (state, fields = []) {
    state.fields = fields || [];
  },

  /**
   * @param state
   * @param creatingFields
   */
  setCreatingFields (state, creatingFields = []) {
    state.creatingFields = creatingFields || [];
  },

  /**
   * @param state
   * @param updatingFields
   */
  setUpdatingFields (state, updatingFields = []) {
    state.updatingFields = updatingFields || [];
  },

  /**
   * @param state
   * @param deletingFields
   */
  setDeletingFields (state, deletingFields = []) {
    state.deletingFields = deletingFields || [];
  },

  /**
   * Update the supplied Field.
   *
   * @param state
   * @param field {{ fieldId: string}}
   */
  updateField (state, field) {
    const {fieldId} = field;
    const index = state.fields.findIndex(item =>  item.fieldId === fieldId);

    if (index < 0) {
      state.fields.push(field);
    } else {
      state.fields.splice(index, 1, {...state.fields[index], ...field})
    }
  },

  /**
   * @param state
   * @param creatingField
   */
  updateCreatingField (state, creatingField) {
    const {executionArn} = creatingField;
    const index = state.creatingFields.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.creatingFields.push(creatingField);
    } else {
      state.creatingFields.splice(index, 1, {
        ...state.creatingFields[index],
        ...creatingField
      });
    }
  },

  /**
   * @param state
   * @param updatingField
   */
  updateUpdatingField (state, updatingField) {
    const {executionArn} = updatingField;
    const index = state.updatingFields.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.updatingFields.push(updatingField);
    } else {
      state.updatingFields.splice(index, 1, {
        ...state.updatingFields[index],
        ...updatingField
      });
    }
  },

  /**
   * @param state
   * @param deletingField
   */
  updateDeletingField (state, deletingField) {
    const {executionArn} = deletingField;
    const index = state.deletingFields.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.deletingFields.push(deletingField);
    } else {
      state.deletingFields.splice(index, 1, {
        ...state.deletingFields[index],
        ...deletingField
      });
    }
  },


  /**
   * Add or update a deletingField item.
   *
   * @param state
   * @param deletingField {{name: string, email: string, creating: boolean, executionArn }}
   */
  deletingField (state, deletingField) {
    const index = state.deletingFields.findIndex(item => item.executionArn === deletingField.executionArn);

    if (index > -1) {
      state.deletingFields.splice(
        index, 1,
        Object.assign({}, state.deletingFields[index], deletingField)
      )
    } else {
      state.deletingFields.push(deletingField);
    }
  },

}

export const getters = {
  /**
   * Return the fields state.
   *
   * @param state
   * @return {[]}
   */
  fields: (state) => {
    return state.fields || [];
  },

  /**
   * Return the number of Fields.
   *
   * @param state
   * @return {number|number}
   */
  numberOfFields: (state) => {
    return state.fields.length || 0
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
   * Return the Fields identified by the supplied fieldId.
   *
   * @param state
   * @param fieldId {string}
   */
  fieldWithFieldId: (state) => (fieldId) => {
    return state.fields.find(field => {
      return field.fieldId.toLowerCase() === fieldId.toLowerCase()
    });
  },

  /**
   * Return the CreatingField identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingFieldWithExecutionArn: (state) => (executionArn) => {
    return state.creatingFields.find(creatingField => creatingField.executionArn === executionArn);
  },

  /**
   * Return the UpdateField identified with the specified executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  updatingFieldWithExecutionArn: (state) => (executionArn) => {
    return state.updatingFields.find(updatingField => updatingField.executionArn === executionArn);

  },

  /**
   * Return the deletingField item identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  deletingFieldWithExecutionArn: (state) => (executionArn) => {
    return state.deletingFields.find(deletingField => deletingField.executionArn === executionArn);
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

    commit('setFields', []);
    commit('setCreatingFields', []);
    commit('setUpdatingFields', []);
    commit('setDeletingFields', []);
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
   * Load the Fields from the api.
   *
   * @param context
   */
  async load({commit},registrationId) {
    try {
      commit('loading', true);
      let {fields, token} = await this.$api('admin').registrations.listFields(registrationId);

      fields.map(field => commit('updateField',  {
        ...field,
        ...{
          error: undefined,
          loading: false,
          loaded: true
        }
      }));

      commit('token', token);
      commit('loaded', true);
    } catch (error) {
      console.log("FIELDS ERROR", error)
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  /**
   * Load the Field with the specified FieldId.
   *
   * @param commit
   * @param registrationId {string}
   * @param fieldId {string}
   * @return {Promise<void>}
   */
  async loadFieldWithFieldId({commit}, registrationId,fieldId) {
    let field = {
      fieldId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateField', field);
      field = await this.$api('admin').registrations.getFieldWithFieldId(registrationId,fieldId);

      field = {
        ...field,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateField', field);

    } catch (error) {
      const {message} = error;
      field = {
        ...field,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateField', field);
    }
  },

  /**
   * Create a Field.
   *
   * @param context
   * @param field {object}
   * @return {Promise<unknown>}
   */
  async createField({commit, dispatch}, field) {
    let fieldToCreate = {
      ...field,
      ...{
        error: undefined,
        creating: true,
      }
    };

    const {registrationId} = field;

    try {
      let creatingField = await this.$api('admin').registrations.createField(registrationId,field);
      const {executionArn, startDate} = creatingField;

      fieldToCreate = {
        ...fieldToCreate,
        ...creatingField,
      };
      commit('updateCreatingField', fieldToCreate);

      // start the polling function...
      ((executionArn) => {

        const getExecution = async () => {
          fieldToCreate = {
            ...fieldToCreate,
            ...{
              loading: true,
            },
          };
          commit('updateCreatingField', fieldToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          fieldToCreate = {
            ...fieldToCreate,
            ...{
              loading: false,
              status,
              stopDate,
            },
          };
          commit('updateCreatingField', fieldToCreate);

          if (status === 'RUNNING') {
            console.log('## CREATE FIELD - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE FIELD - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE FIELD - SUCCEEDED');
            let {output} = execution;
            output = JSON.parse(output);

            let {error, field: createdField} = output;

            if (error) {
              fieldToCreate = {
                ...fieldToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingField', fieldToCreate);
            }

            if (createdField) {
              fieldToCreate = {
                ...fieldToCreate,
                ...createdField,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingField', fieldToCreate);

              createdField = {
                ...createdField,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateField', createdField);

            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return creatingField;

    } catch (error) {
      const { message } = error;

      fieldToCreate = {
        ...fieldToCreate,
        ...{
          error: message,
          creating: false,
          created: false,
        },
      };
      commit('updateCreatingField', fieldToCreate);
      throw error;
    }
  },

  /**
   * Update the Field.
   *
   * @param commit
   *
   * @param updateField
   * @returns {Promise<*>}
   */
  async updateField ({commit}, registrationId,updateField) {
    console.log(updateField);

    const {fieldId} = updateField

    if (! fieldId) {
      throw new Error(`fieldId is required`);
    }

    // the update
    let update = {};

    const allowed = [
      'name',
      'title',
      'description',
      'label',
      'hint',
      'placeholder',
      'required',
      'visible',
      'editable',
    ];

    for (const name in updateField) {
      if (allowed.includes(name)) {
        update[name] = updateField[name];
      }
    }

    let fieldUpdate = {
      fieldId,
      update,
      updating: true,
      updated: false,
    }

    try {
      const updatingField = await this.$api('admin').registrations.updateFieldWithFieldId(registrationId,fieldId, update);
      const {executionArn} = updatingField;

      fieldUpdate = {
        ...fieldUpdate,
        ...updatingField,
      };
      commit('updateUpdatingField', fieldUpdate);

      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {
          fieldUpdate = {
            ...fieldUpdate,
            ...{
              loading: true,
            }
          };
          commit('updateUpdatingField', fieldUpdate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## UPDATE FIELD - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          fieldUpdate = {
            ...fieldUpdate,
            ...{
              loading: false,
              status,
              stopDate,
            }
          };
          commit('updateUpdatingField', fieldUpdate);

          if (status === 'RUNNING') {
            console.log('## UPDATE FIELD - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## UPDATE FIELD - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## UPDATE FIELD - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, field: updatedField} = output;

            if (error) {
              fieldUpdate = {
                ...fieldUpdate,
                ...{
                  error,
                  updating: false,
                }
              };
              commit('updateUpdatingField', fieldUpdate);
            }

            if (updatedField) {
              fieldUpdate = {
                ...fieldUpdate,
                ...{
                  updating: false,
                  updated: true,
                }
              };
              commit('updateUpdatingField', fieldUpdate);

              /**
               ** Change/Mutate the specific Field in the store
               */
              commit('updateField', {
                ...updatedField,
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

      return updatingField;

    } catch (error) {
      const {message} = error;
      fieldUpdate = {
        ...fieldUpdate,
        ...{
          error: message,
          updating: false,
        }
      };
      commit('updateUpdatingField', fieldUpdate);
      throw error;
    }
  },

  /**
   * Delete the Field.
   *
   * @param context
   * @param registrationId
   * @param fieldId
   * @returns {Promise<void>}
   */
  async deleteField (context, registrationId,fieldId) {
    console.log(`## FIELD STORE - DELETE-FIELD`);

    try {
      const deletingField = await this.$api('admin').registrations.deleteFieldWithFieldId(registrationId,fieldId);
      const {executionArn} = deletingField;

      context.commit('updateDeletingField',
        Object.assign({}, deletingField, {
          deleting: true,
        })
      );

      /**
       * The Polling function we will create to retrieve the status of the deleteField request.
       *
       * @link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
       * @param deletingField
       */
      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {

          context.commit('updateDeletingField',
            Object.assign({}, deletingField, {
              loading: true,
            })
          );

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## DELETING FIELD - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          context.commit('updateDeletingField',
            Object.assign({}, deletingField, {
              loading: false,
              status,
              stopDate,
            })
          );

          if (status === 'RUNNING') {
            console.log('## DELETING FIELD - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## DELETING FIELD - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## DELETING FIELD - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, field: deletedField} = output;

            if (error) {
              context.commit('updateDeletingField',
                Object.assign({}, deletedField, {
                  error,
                  deleting: false,
                })
              );
            }

            if (deletedField) {
              context.commit('updateDeletingField',
                Object.assign({}, deletedField, {
                  deleting: false,
                  deleted: true,
                })
              );

              /**
               ** delete the specific Field from the store
               */
              context.commit('deleteField', deletedField);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return deletingField;

    } catch (error) {
      const {message} = error;

      context.commit('updatedDeletingField', {
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
