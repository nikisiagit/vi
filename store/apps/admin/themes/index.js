/**
 * Themes Store.
 *
 * This Store handles the Frontend copy of the Themes module.
 */

export const state = () => ({
  /**
   * The list of Themes that belong to the Venue/Partition.
   */
  themes: [
    // {
    //   themeId: 'theme:eventheads:default',
    //   type: 'theme',
    //   partition: 'eventheads',
    //   name: 'default',
    //   // ... other attributes
    // }
  ],

  /**
   * The list of Themes that are `being` created.
   */
  creatingThemes: [
    // {
    //   name: 'default',
    //   executionArn,
    //   startDate,
    //   stopDate,
    //   status
    //   // ... other attributes,
    // }
  ],

  loaded: false,

  loading: false,

  error: undefined,

  initialising: false,

  initialised: false,

  updating: false,
});


export const mutations = {
  /**
   * Set the themes to what ever is supplied.
   *
   * @param state
   * @param themes [{{name: string }}]
   */
  setThemes (state, themes = []) {
    state.themes = themes || [];
  },

  /**
   * Update this stores copy of the specified Theme.
   *
   * @param state
   * @param theme {{ name: string, themeId: (undefined|string) }}
   */
  updateTheme (state, theme) {
    const {themeId, name} = theme;
    const index = state.themes.findIndex(item =>  item.themeId === themeId);

    if (index < 0) {
      state.themes.push(theme);
    } else {
      state.themes.splice(index, 1, {...state.themes[index], ...theme});
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
   * @param state
   * @param creatingThemes
   */
  setCreatingThemes (state, creatingThemes = []) {
    state.creatingThemes = creatingThemes || [];
  },

  /**
   * @param state
   * @param creatingTheme {{name: string}}
   */
  updateCreatingTheme (state, creatingTheme) {
    const {name} = creatingTheme;
    const index = state.creatingThemes.findIndex(item =>  item.name === name);

    if (index < 0) {
      state.creatingThemes.push(creatingTheme);
    } else {
      state.creatingThemes.splice(index, 1, {...state.creatingThemes[index], ...creatingTheme})
    }
  },

  /**
   * @deprecated
   * @param state
   * @param updating
   */
  updating (state, updating) {
    state.updating = updating;
  },
};


export const getters = {
  // THEMES

  /**
   * Return a list of Themes.
   *
   * @param state
   * @return {[]|*[]}
   */
  themes: (state) => {
    return state.themes || [];
  },

  numberOfThemes: (state) => {
    return state.themes.length || 0;
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
   * Return the Theme with the specified ThemeId.
   *
   * @param state
   * @return {function(*): *}
   */
  themeWithThemeId: (state) => (themeId) => {
    return state.themes.find(theme => theme.themeId === themeId);
  },

  /**
   * @deprecated
   *
   * Return the Theme with the specified Name.
   *
   * @param state
   * @return {function(*): *}
   */
  themeWithName: (state) => (name) => {
    return state.themes.find(theme => theme.name === name);
  },


  // CREATING THEMES

  /**
   * @deprecated
   *
   * @param state
   * @return {function(*): *}
   */
  creatingThemeWithName: (state) => (name) => {
    return state.creatingThemes.find(theme => theme.name === name);
  },

  /**
   * Return the CreatingTheme identified by the supplied executionArn.
   *
   * @param state
   * @return {(function(*))|*}
   */
  creatingThemeWithExecutionArn: (state) => (executionArn) => {
    return state.creatingThemes.find(creatingTheme => creatingTheme.executionArn === executionArn);
  },

  /**
   * @deprecated
   *
   * @param state
   * @return {boolean}
   */
  updating: (state) => {
    return state.updating;
  },
};

export const actions = {

  /**
   * Load the store with a list of Themes.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    console.log(`## ADMIN THEMES - LOAD`);
    try {
      commit('loading', true);
      let {themes, token} = await this.$api('admin').themes.listThemes();

      themes = themes.map((theme) => {
        return {...theme, error: undefined, loading: false, loaded: true};
      });

      themes.map(theme => commit('updateTheme',  theme));

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
   * Load the Theme with the specified name.
   *
   * @param commit
   * @param themeId {string} ie. `default`
   *
   * @return {Promise<void>}
   */
  async loadThemeWithThemeId({commit}, themeId) {
    console.log(`## ADMIN THEMES - LOAD THEME WITH NAME ${name}`);

    let theme = {themeId, loading: true, loaded: false};

    try {
      commit('updateTheme', theme);
      theme = await this.$api('admin').themes.getThemeWithThemeId(themeId);

      theme = {...theme, loading: false, loaded: true}
      commit('updateTheme', theme);

    } catch (error) {
      const {message} = error;
      theme = {...theme, loading: false, loaded: false, error: message}
      commit('updateTheme', theme);
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
    commit('setThemes', []);
    commit('setCreatingThemes', []);
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
   * Create a new Theme in the Api.
   *
   * @param commit
   * @param theme {{name: string, light: {}, dark: {}}}
   * @return {Promise<*>}
   */
  async createTheme ({commit}, theme) {
    const {name} = theme;

    if (! name) {
      throw new Error(`name is a required value when creating a Theme.`)
    }

    let themeToCreate = {
      ...theme,
      ...{
        creating: true,
        error: undefined
      }
    };
    commit('updateCreatingTheme', themeToCreate);

    try {
      const creatingTheme = await this.$api('admin').themes.createTheme(theme);
      const {executionArn} = creatingTheme;

      themeToCreate = {
        ...themeToCreate,
        ...creatingTheme,
      };
      commit('updateCreatingTheme', themeToCreate);

      // start the polling function
      ((executionArn) => {
        const getExecution = async () => {

          themeToCreate = {...themeToCreate, ...{loading: true}};
          commit('updateCreatingTheme', themeToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);

          const {status, stopDate} = execution;
          themeToCreate = {
            ...themeToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingTheme', themeToCreate);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE THEME - FAILED');
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, theme: createdTheme} = output;

            if (error) {
              themeToCreate = {
                ...themeToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingTheme', themeToCreate);
            }

            if (createdTheme) {
              themeToCreate = {
                ...themeToCreate,
                ...createdTheme,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingTheme', themeToCreate);

              createdTheme = {
                ...createdTheme,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateTheme', createdTheme);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return creatingTheme;

    } catch (error) {
      const {message} = error;
      themeToCreate = {
        ...themeToCreate,
        ...{
          error: message,
          creating: false,
          loaded: false,
          loading: false
        }
      };
      commit('updateCreatingTheme', themeToCreate);

      throw error;
    }
  },


  async updateTheme ({commit}, theme) {
    // try {
      const { name } = theme
      delete theme.name

      commit('updating', true);
      const updatingTheme = await this.$api('admin').themes.updateThemeWithName(name, theme);

      commit('updating', false);

      return updatingTheme;

    // } catch (error) {
    //   console.log(`## ERROR ${error.message}`);
    //   commit('error', error);
    //   commit('updating', false);
    // }
  },

  async removeTheme ({commit}, name) {
    // try {
    commit('loading', true);
    const removingTheme = await this.$api('admin').themes.removeThemeWithName(name);

    commit('loading', false);

    return removingTheme;

    // } catch (error) {
    //   console.log(`## ERROR ${error.message}`);
    //   commit('error', error);
    //   commit('loading', false);
    // }
  },
};
