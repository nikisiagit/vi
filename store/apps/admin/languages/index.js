/**
 * Admin App Languages Store.
 */

/**
 * @return {{loaded: boolean, initialising: boolean, initialised: boolean, languages: *[], error: undefined, loading: boolean}}
 */
export const state = () => ({
  /**
   * The list of Languages that have been added to the Venue/Partition.
   */
  languages: [
    // {
    //   languageId: 'language:eventheads:en',
    //   type: 'language',
    //   partition: 'eventheads',
    //   name: 'en',
    //   code: 'en'
    //   // ... other attributes
    // }
  ],

  /**
   * The list of Languages that are being (or have been) created and added to the Venue.
   */
  creatingLanguages: [
    // {
    //   name: 'en',
    //   executionArn,
    //   startDate,
    //   stopDate,
    //   status,
    //   // ... others
    // }
  ],

  loaded: false,
  error: undefined,
  initialising: false,
  initialised: false,
  loading: false,
});

export const mutations = {
  /**
   * Set the Languages state to whatever is supplied.
   *
   * @param state
   * @param languages
   */
  setLanguages (state, languages = []) {
    state.languages = languages;
  },

  /**
   * Update the specified Language.
   *
   * @param state
   * @param language {{ languageId: string}}
   */
  updateLanguage (state, language) {
    const {languageId} = language;

    const index = state.languages.findIndex(item => item.languageId === languageId);

    if (index < 0) {
      state.languages.push(language);
    } else {
      state.languages.splice(index, 1, {...state.languages[index], ...language})
    }
  },

  /**
   * @param state
   * @param token
   */
  token (state, token = undefined) {
    state.token = token;
  },

  /**
   * @param state
   * @param loading
   */
  loading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * @param state
   * @param loaded
   */
  loaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * @param state
   * @param error
   */
  error (state, error = undefined) {
    state.error = error;
  },

  /**
   * Set the CreatingLanguages to whatever is supplied.
   *
   * @param state
   * @param creatingLanguages [{*}]
   */
  setCreatingLanguages (state, creatingLanguages = []) {
    state.creatingLanguages = creatingLanguages;
  },

  /**
   * Update the specified CreatingLanguage.
   *
   * @param state
   * @param creatingLanguage {{name: string}}
   */
  updateCreatingLanguage (state, creatingLanguage) {
    const {name} = creatingLanguage;
    const index = state.creatingLanguages.findIndex(item =>  item.name === name);

    if (index < 0) {
      state.creatingLanguages.push(creatingLanguage);
    } else {
      state.creatingLanguages.splice(index, 1, {...state.creatingLanguages[index], ...creatingLanguage})
    }
  },
};

export const getters = {
  /**
   * @param state
   * @return {[]|*[]}
   */
  languages: (state) => {
    return state.languages || [];
  },

  /**
   * Return the number of Languages.
   *
   * @param state
   * @returns {number|number}
   */
  numberOfLanguages: (state) => {
    return state.languages.length || 0;
  },

  /**
   * @deprecated
   *
   * Return the Language identified with the specified name.
   *
   * @param state
   * @return {function(*): *}
   */
  languageWithName: (state) => (name) => {
    return state.languages.find(language => language.name === name);
  },

  /**
   * Return the Language identified by the supplied LanguageId.
   *
   * @param state
   * @return {function(*): *}
   */
  languageWithLanguageId: (state) => (languageId) => {
    return state.languages.find(language => language.languageId === languageId);
  },


  /**
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * @param state
   * @return {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * @param state
   * @return {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },

  /**
   * @deprecated
   *
   * @param state
   * @return {function(*): *}
   */
  creatingLanguageWithName: (state) => (name) => {
    return state.creatingLanguages.find(language => language.name === name);
  },

  /**
   * @param state
   * @return {function(*): *}
   */
  creatingLanguageWithExecutionArn: (state) => (executionArn) => {
    return state.creatingLanguages.find(language => language.executionArn === executionArn);
  },
};

export const actions = {
  /**
   * Load the Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {
      console.log(`## ADMIN APP - LANGUAGES STORE - LOAD`);
      commit('loading', true);
      commit('loaded', false);

      const {languages, token} = await this.$api('admin').languages.listLanguages(); // getVenueWithName()

      commit('setLanguages',
        languages.map(language => {
          return Object.assign({}, language, {
            loading: false,
            loaded: true,
            error: undefined,
          })
        })
      );
      commit('token', token);
      commit('loaded', true);
    } catch (error) {
      console.log('error');
      console.log(error);
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  /**
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setLanguages', []);
    commit('setCreatingLanguages', []);
  },

  /**
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Create a new Language in the Venue.
   * @param commit
   * @param language {{ name: string }}
   * @return {Promise<void>}
   */
  async createLanguage ({commit}, language) {
    const {name} = language;

    if (! name) {
      throw new Error(`name is a required value when creating a Language.`);
    }

    let languageToCreate = {...language, ...{creating: true, error: undefined}};
    commit('updateCreatingLanguage', languageToCreate);

    try {
      const creatingLanguage = await this.$api('admin').languages.createLanguage(language);
      const {executionArn} = creatingLanguage;

      languageToCreate = {
        ...languageToCreate,
        ...creatingLanguage,
        ...{
          creating: true
        }
      };
      commit('updateCreatingLanguage', languageToCreate);

      // start the polling function
      ((executionArn) => {
        const getExecution = async () => {

          languageToCreate = {...languageToCreate, ...{loading: true}};
          commit('updateCreatingLanguage', languageToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## CREATE LANGUAGE - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;
          languageToCreate = {...languageToCreate, ...{loading: false, status, stopDate}};
          commit('updateCreatingLanguage', languageToCreate);


          if (status === 'RUNNING') {
            console.log('## CREATE LANGUAGE - RUNNING');
            setTimeout(getExecution, 3000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE LANGUAGE - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE LANGUAGE - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            console.log(`## OUTPUT`);
            console.log(output);

            let {error, language: createdLanguage} = output;

            if (error) {
              languageToCreate = {...createdLanguage, ...{error, creating: false, loaded: false}};
              commit('updateCreatingLanguage', createdLanguage);
            }

            if (createdLanguage) {
              languageToCreate = {...languageToCreate, ...createdLanguage, ...{created: true, creating: false, loaded: true}};
              commit('updateCreatingLanguage', languageToCreate);

              createdLanguage = {...createdLanguage, ...{loading: false, loaded: true, error: undefined}};
              commit('updateLanguage', createdLanguage);
            }
          }
        };
        setTimeout(getExecution, 2000);
      })(executionArn);


      return creatingLanguage;

    } catch (error) {
      const {message} = error;

      languageToCreate = {
        ...languageToCreate,
        ...{
          error: message,
          creating: false,
          loaded: false,
          loading: false
        }
      };
      commit('updateCreatingLanguage', languageToCreate);

      throw error;
    }
  },

  /**
   * Load the Language with the specified LanguageId.
   *
   * @param commit
   * @param languageId
   * @return {Promise<void>}
   */
  async loadLanguageWithLanguageId({commit}, languageId) {
    let language = {
      languageId,
      loading: true,
      loaded: false,
    };
    commit('updateLanguage', language);

    try {
      language = await this.$api('admin').languages.getLanguageWithLanguageId(languageId);

      commit('updateLanguage',
        {
          ...language,
          ...{
            loading: false,
            loaded: true,
            error: undefined
          }
        }
      );

    } catch (error) {
      console.log(error);
    }
  }
};
