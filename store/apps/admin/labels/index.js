export const state = () => ({
  /**
   * The list of Label that have been added to the Partition.
   *
   */
  labels: [],

  /**
   * The list of Label Updates.
   */
  updatingLabels: [],

  loaded: false,

  loading: false,

  error: undefined,

});

export const mutations = {

  /**
   * Update the Label.
   *
   * @param state
   * @param label
   */
  updateLabel (state, label) {
    const {labelId, name} = label;
    const index = state.labels.findIndex(item =>  item.labelId === labelId);

    if (index < 0) {
      state.labels.push(label);
    } else {
      state.labels.splice(index, 1, {...state.labels[index], ...label});
    }
  },

  updateUpdatingLabel (state, updatingLabel) {
    const {labelId} = updatingLabel;
    const index = state.labels.findIndex(item =>  item.labelId === labelId);

    if (index < 0) {
      state.updatingLabels.push(updatingLabel);
    } else {
      state.updatingLabels.splice(index, 1, {...state.updatingLabels[index], ...updatingLabel});
    }
  },
};

export const getters = {
  /**
   *
   * @param state
   * @return {[]|*[]}
   */
  labels: (state) => {
    return state.labels || [];
  },

  /**
   * Return the Label identified by the supplied LabelId.
   *
   * @param state
   * @returns {function(*): *}
   */
  labelWithLabelId: (state) => (labelId) => {
    return state.labels.find(label => label.labelId === labelId);
  },

  /**
   * Retrieve the UpdatingLabel identified by the supplied executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  updatingLabelWithExecutionArn: (state) => (executionArn) => {
    return state.updatingLabels.find(updatingLabel => updatingLabel.executionArn === executionArn);
  },

};

export const actions = {

  /**
   * Load the Label identified by the specified Label.
   *
   * @param commit
   * @param labelId { string }
   * @returns {Promise<void>}
   */
  async loadLabelWithLabelId ({commit}, labelId) {
    let label = {
      labelId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateLabel', label);
      label = await this.$api('admin').labels.getLabelWithLabelId(labelId);

      label = {
        ...label,
        ...{
          loading: false,
          loaded: true
        }
      }
      commit('updateLabel', label);

    } catch (error) {
      const {message} = error;
      label = {
        ...label,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateLabel', label);
    }
  },

  /**
   * @param commit
   * @param label
   * @returns {Promise<void>}
   */
  async updateLabel ({commit}, label) {

    const {
      labelId,
      text,
      languageId,
    } = label;

    if (! labelId) {
      throw new Error(`labelId is a required attribute when updating a Label`)
    }

    let update = {text, languageId}

    let labelUpdate = {
      labelId,
      update,
      updating: true,
      updated: false,
    };
    // commit('updateUpdatingLabel', labelUpdate);

    try {
      const updatingLabel = await this.$api('admin').labels.updateLabelWithLabelId(labelId, update);
      const {executionArn, startDate} = updatingLabel;

      labelUpdate = {
        ...labelUpdate,
        ...updatingLabel,
      };
      commit('updateUpdatingLabel', labelUpdate);

      // set up the Poll...
      ((executionArn) => {

        const getExecution = async () => {

          labelUpdate = {
            ...labelUpdate,
            ...{
              loading: true,
            }
          };
          commit('updateUpdatingLabel', labelUpdate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## UPDATE LABEL - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          labelUpdate = {
            ...labelUpdate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateUpdatingLabel', labelUpdate);

          if (status === 'RUNNING') {
            console.log('## UPDATE LABEL - RUNNING');
            setTimeout(getExecution, 3000);
          }

          if (status === 'FAILED') {
            console.log('## UPDATE LABEL - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## UPDATE LABEL - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, label: updatedLabel} = output;

            console.log(`## UPDATED LABEL`);
            console.log(updatedLabel);

            if (error) {
              labelUpdate = {
                ...labelUpdate,
                ...{
                  error,
                  updating: false,
                  updated: false,
                }
              };
              commit('updateUpdatingLabel', labelUpdate);
            }

            if (updatedLabel) {
              labelUpdate = {
                ...labelUpdate,
                ...{
                  updating: false,
                  updated: true,
                }
              };
              commit('updateUpdatingLabel', labelUpdate);

              commit('updateLabel', updatedLabel);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return updatingLabel;

    } catch (error) {
      const {message} = error;
      labelUpdate = {
        ...labelUpdate,
        ...{
          error: message,
          updating: false,
        }
      };
      commit('updateUpdatingLabel', labelUpdate);
      throw error;
    }
  },
};
