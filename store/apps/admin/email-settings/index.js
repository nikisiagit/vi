/**
 * Venue App Admin - EmailSettings Store
 *
 */

export const state = () => ({

  /**
   * The list of EmailSettings that have been added to the Partition.
   */
  emailSettings: undefined,

  /**
   * The list of EmailSettings that are being/have been updated.
   */
  // creatingEmailSettings: [],

  /**
   * The list of EmailSettings that are being/have been updated.
   */
  updatingEmailSettings: [],

  /**
   * The list of EmailSettings that are being/have been removed.
   */
  // removingEmailSettings: [],

  /**
   * Pagination token.
   */
  token: undefined,

  /**
   *
   */
  loaded: false,

  /**
   *
   */
  loading: false,

  /**
   *
   */
  error: undefined,
});

export const mutations = {

  /**
   * Set the EmailSettings to whatever is supplied.
   *
   * @param state
   * @param emailSettings []
   */
  setEmailSettings (state, emailSettings = {}) {

    state.emailSettings = emailSettings || {};
  },

  /**
   * Update the EmailSettings in the store.
   *
   * @param state
   * @param emailSettings {{emailSettingsId: string}}
   */
  // updateEmailSettings (state, emailSettings) {
  //   const {partition} = emailSettings;
  //   const index = state.emailSettings.findIndex(item => item.partition === partition);
  //
  //   if (index < 0) {
  //     state.emailSettings.push(emailSettings);
  //   } else {
  //     state.emailSettings.splice(index, 1,
  //       {
  //         ...state.emailSettings[index],
  //         ...emailSettings
  //       }
  //     );
  //   }
  // },

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
   * Set the creatingEmailSettings state to whatever is supplied.
   *
   * @param state
   * @param creatingEmailSettings []
   */
  // setCreatingEmailSettings (state, creatingEmailSettings = []) {
  //   state.creatingEmailSettings = creatingEmailSettings;
  // },

  /**
   * Update the UpdatingEmailSettings.
   *
   * @param state
   * @param updatingEmailSettings {{executionArn: string}}
   */
  updateUpdatingEmailSettings (state, updatingEmailSettings) {
    const index = state.updatingEmailSettings.findIndex(item => item.executionArn === executionArn);

    if (index < 0) {
      state.updatingEmailSettings.push(updatingEmailSettings);
    } else {
      state.updatingEmailSettings.splice(index, 1,
        {
          ...state.updatingEmailSettings[index],
          ...updatingEmailSettings
        }
      );
    }
  },

  /**
   * Add or update a removingEmailSettings item.
   *
   * @param state
   * @param removingEmailSettings {{name: string, email: string, creating: boolean, executionArn }}
   */
  // removingEmailSettings (state, removingEmailSettings) {
  //   console.log("add removingEmailSettings", removingEmailSettings);
  //
  //   const index = state.removingEmailSettings.findIndex(item => item.executionArn === removingEmailSettings.executionArn);
  //
  //   if (index > -1) {
  //     state.removingEmailSettings.splice(
  //       index, 1,
  //       Object.assign({}, state.removingEmailSettings[index], removingEmailSettings)
  //     )
  //   } else {
  //     state.removingEmailSettings.push(removingEmailSettings);
  //   }
  // },

  /**
   * Remove the given emailSettings form the state
   *
   * @param state
   * @param emailSettings
   */
  // removeEmailSettings(state, emailSettings) {
  //   const index = state.emailSettings.findIndex(item => item.emailSettingsId === emailSettings.emailSettingsId);
  //
  //   if (index > -1) {
  //     state.emailSettings.splice(index, 1)
  //   }
  // },
};

export const getters = {
  // TEMPLATE

  /**
   * @param state
   * @returns {[]|*[]}
   */
  emailSettings: (state) => {
    return state.emailSettings || undefined;
  },

  /**
   * @param state
   * @returns {function(*): *}
   */
  emailSettingsWithEmailSettingsId: (state) => (emailSettingsId) => {
    return state.emailSettings.find(emailSettings => emailSettings.emailSettingsId === emailSettingsId);
  },

  /**
   * @param state
   * @returns {function(*): *}
   */
  emailSettingsWithPartition: (state) => (partition) => {
    return state.emailSettings.find(emailSettings => emailSettings.partition === partition);
  },

  // /**
  //  * Return the number of EmailSettings in the Venue/Partition.
  //  *
  //  * @param state
  //  * @returns {number|number}
  //  */
  // numberOfEmailSettings: (state) => {
  //   return state.emailSettings.length || 0;
  // },

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

  // TEMPLATE - TEMPLATE PROFILES

  // TEMPLATE - TEMPLATE MESSAGES

  /**
   * Return the UpdatingEmailSettings identified by the supplied executionArn.
   *
   * @param state
   * @return {(function(*))|*}
   */
  updatingEmailSettingsWithExecutionArn: (state) => (executionArn) => {
    return state.updatingEmailSettings.find(updatingEmailSettings => updatingEmailSettings.executionArn === executionArn);
  },

  /**
   * Return the RemovingEmailSettings item identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  // removingEmailSettingsWithExecutionArn: (state) => (executionArn) => {
  //   return state.removingEmailSettings.find(removingEmailSettings => removingEmailSettings.executionArn === executionArn);
  // },
};

export const actions = {

  /**
   * Load the Store with the EmailSettings.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loaded', false);
      commit('loading', true);
      const emailSettings = await this.$api('admin').emailSettings.getEmailSettings();

      commit('setEmailSettings', emailSettings);

      console.log(`## EMAIL SETTINGS STORE - EMAIL SETTINGS`);
      console.log(emailSettings);

      commit('loaded', true);
    } catch (error) {
      console.log(error);
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  /**
   * Load the EmailSettings with the specified partition.
   *
   * @param commit
   * @param partition {string}
   * @returns {Promise<void>}
   */
  // async loadEmailSettingsWithPartition ({commit}, partition) {
  //   let emailSettingsToLoad = {
  //     partition,
  //     loading: true,
  //     loaded: false
  //   };
  //
  //   try {
  //     commit('updateEmailSettings', emailSettingsToLoad);
  //     const emailSettings = await this.$api('admin').emailSettings.getEmailSettingsWithPartition(partition);
  //
  //     console.log("emailSettings", emailSettings);
  //
  //     emailSettingsToLoad = {
  //       ...emailSettingsToLoad,
  //       ...emailSettings,
  //       ...{
  //         loading: false,
  //         loaded: true
  //       }
  //     };
  //     commit('updateEmailSettings', emailSettingsToLoad);
  //
  //   } catch (error) {
  //     const {message} = error;
  //     emailSettingsToLoad = {
  //       ...emailSettingsToLoad,
  //       ...{
  //         loading: false,
  //         loaded: false,
  //         error: message
  //       }
  //     };
  //     commit('updateEmailSettings', emailSettingsToLoad);
  //   }
  // },

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
    commit('setEmailSettings', undefined);
    // commit('setUpdatingEmailSettings', []);
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

  async updateEmailSettings(context, emailSettingsToUpdate) {
    await this.$api('admin').emailSettings.updateEmailSettings(emailSettingsToUpdate);
    // console.log(`## EMAIL SETTINGS STORE - UPDATE-EMAIL SETTINGS`);
    // console.log(`## EMAIL SETTINGS ID TO UPDATE`);
    //
    // try {
    //   const updatingEmailSettings = await this.$api('admin').emailSettings.updateEmailSettingsWithEmailSettingsId(emailSettingsToUpdate);
    //
    //   context.commit('updatingEmailSettings',
    //     Object.assign({}, updatingEmailSettings, {
    //       updating: true,
    //     })
    //   );
    //
    //   /**
    //    * The Polling function we will create to retrieve the status of the UpdateEmailSettings request.
    //    *
    //    * @link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
    //    * @param updatingEmailSettings
    //    */
    //   const poll = (updatingEmailSettings) => {
    //
    //     const {executionArn} = updatingEmailSettings;
    //
    //     console.log(`## POLL:${executionArn}`);
    //     console.log(updatingEmailSettings);
    //
    //     const getExecution = async () => {
    //
    //       context.commit('updatingEmailSettings',
    //         Object.assign({}, updatingEmailSettings, {
    //           loading: true,
    //         })
    //       );
    //
    //       const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
    //
    //       context.commit('updatingEmailSettings',
    //         Object.assign({}, updatingEmailSettings, {
    //           loading: false,
    //         })
    //       );
    //
    //       console.log(`## POLL:${executionArn} - EXECUTION`);
    //       console.log(execution);
    //
    //       if (! execution) {
    //         console.log(`## POLL:${executionArn} - ERROR - NO EXECUTION`);
    //       }
    //
    //       const {status} = execution
    //       console.log(`## POLL:${executionArn} STATUS ${status}`);
    //       console.log(status);
    //
    //       if (status === 'FAILED') {
    //         console.log(`UPDATE EMAIL SETTINGS POLL - FAILED`);
    //         context.commit('creating', {executionArn, status});
    //       }
    //
    //       if (status === 'SUCCEEDED') {
    //         console.log(`UPDATE EMAIL SETTINGS POLL - SUCCEEDED`);
    //
    //         const {executionArn, stopDate} = execution;
    //
    //         let {output} = execution;
    //         output = JSON.parse(output);
    //         console.log(`POLL:${executionArn} - OUTPUT`);
    //         console.log(output);
    //
    //         const {error, emailSettings} = output;
    //
    //         if (emailSettings) {
    //           console.log(`## POLL:${executionArn} - EMAIL SETTINGS ID`);
    //           console.log(emailSettings);
    //
    //           // add the execution to the updatingEmailSettings.executions[] list
    //           // update the updatingEmailSettings state - update the updatingEmailSettings item
    //           context.commit('updatingEmailSettings', {emailSettings, executionArn, stopDate, status, updating: false});
    //
    //           console.log("updateEmailSettings");
    //
    //           // update the EmailSettings from the emailSettings state
    //           context.commit('updateEmailSettings', { emailSettingsId: emailSettings });
    //         }
    //
    //         if (error) {
    //           console.log(`## POLL:${executionArn} - ERROR`);
    //           console.log(error);
    //
    //           context.commit('updatingEmailSettings', {error, executionArn, stopDate, status, updating: false});
    //         }
    //       }
    //     };
    //
    //     setTimeout(getExecution, 5000);
    //   }
    //   poll(updatingEmailSettings);
    //
    //   console.log(updatingEmailSettings);
    //   return updatingEmailSettings;
    //
    //
    // } catch (error) {
    //   console.log(`## EMAIL SETTINGS STORE - UPDATE-EMAIL SETTINGS - ERROR`);
    //   console.log(JSON.stringify(error));
    //
    //   if (error.response) {
    //     console.log(JSON.stringify(error.response.data.message));
    //     // this.error = error.response.data.message;
    //   }
    //   context.commit('error', error);
    //   context.commit('loading', false);
    // }
  }
};
