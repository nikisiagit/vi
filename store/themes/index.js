export const state = () => ({
  /**
   * Which mode is this store working in?
   */
  mode: 'public',

  /**
   * Is this store initialising?
   */
  initialising: false,

  /**
   * Has this store been initialised?
   */
  initialised: false,

  /**
   * Is this store loading data?
   */
  loading: false,

  /**
   * Has this store loaded data?
   */
  loaded: false,

  /**
   * The array of loaded/loading Themes.
   */
  themes: [],

  /**
   * The current Theme applied in the Vuetify library for the Venue App.
   */
  currentTheme: undefined,

  /**
   * Pagination token.
   */
  token: undefined,

  /**
   * The last error that this store came across
   */
  error: undefined,
});

export const mutations = {
  /**
   * Set the mode of this store.
   *
   * @param state
   * @param mode {string}
   */
  setMode (state, mode = 'public') {
    state.mode = mode;
  },

  /**
   * Set the initialising value.
   *
   * @param state
   * @param initialising {boolean}
   */
  setInitialising (state, initialising = false) {
    state.initialising = initialising;
  },

  /**
   * Set the initialised value.
   *
   * @param state
   * @param initialised {boolean}
   */
  setInitialised (state, initialised = false) {
    state.initialised = initialised;
  },

  /**
   * @param state
   * @param loading
   */
  setLoading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * @param state
   * @param loaded
   */
  setLoaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * @param state
   * @param error
   */
  setError (state, error = undefined) {
    state.error = error;
  },

  /**
   * Set the themes state to whatever is supplied.
   *
   * @param state
   * @param themes
   */
  setThemes (state, themes = []) {
    state.themes = themes;
  },

  /**
   * Set the currentTheme state to whatever is supplied.
   *
   * @param state
   * @param theme
   */
  setCurrentTheme (state, theme = []) {
    state.currentTheme = theme;

    // load theme into Vuetify library
    if (theme?.dark) {

      if (theme?.dark?.primary) {
        this.app.vuetify.framework.theme.themes.dark.primary = theme.dark.primary
      }

    }

    if (theme?.light) {

      if (theme?.light?.primary) {
        this.app.vuetify.framework.theme.themes.light.primary = theme.light.primary
      }

    }
  },

  /**
   * Update the Theme.
   *
   * @param state
   * @param theme
   */
  updateTheme (state, theme) {
    const {themeId} = theme;
    const index = state.themes.findIndex(item =>  item.themeId === themeId);

    if (index < 0) {
      state.themes.push(theme);
    } else {
      state.themes.splice(index, 1, {...state.themes[index], ...theme})
    }
  },

  /**
   * Set the token to whatever is supplied.
   *
   * @param state
   * @param token {string|undefined}
   */
  setToken (state, token = undefined) {
    state.token = token;
  },
};

export const getters = {
  /**
   * Return the store mode.
   *
   * @param state
   * @returns {string|undefined}
   */
  mode: (state) => {
    return state.mode || undefined;
  },

  /**
   * Return the initialising state.
   *
   * @param state
   * @return {boolean}
   */
  initialising: (state) => {
    return state.initialising || false;
  },

  /**
   * Return the initialised state.
   *
   * @param state
   * @return {boolean}
   */
  initialised: (state) => {
    return state.initialised || false;
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
   * @param state
   * @return {[]|*[]}
   */
  themes: (state) => {
    return state.themes || [];
  },
};

export const actions = {

  /**
   * Init the store.
   *
   * @param commit
   * @param getters
   * @param dispatch
   * @param mode
   * @returns {Promise<void>}
   */
  async initialise ({commit, getters, dispatch}, mode = 'public') {
    console.log(`## THEMES STORE - INITIALISE - ${mode}`);

    const currentInitialised = getters['initialised'];
    const currentMode = getters['mode'];

    console.log(currentMode, currentInitialised);

    if (currentInitialised && mode === currentMode) {
      return;
    }

    if (currentInitialised) {
      await dispatch('unload');
      await commit('setInitialised', false);
      await commit('setInitialising', false);
    }

    commit('setInitialising', true);
    commit('setMode', mode);

    // do initialisation work
    await this.subscribe(async(mutation, state) => {
      if (mutation.type === 'venue/setVenue' && state.venue.venue) {

        const themeId = state.venue.venue?.themeId
        if (themeId) {
          // retrieve/load theme
          dispatch('loadThemeWithThemeId', themeId)

        }
      }
    });

    commit('setInitialising', false);
    commit('setInitialised', true);
  },

  /**
   * Load the store.
   *
   * @param commit
   * @param getters
   * @returns {Promise<void>}
   */
  async load ({commit, getters}) {
    const mode = getters['mode'];
    console.log(`## THEMES STORE - MODE ${mode}`);

    try {
      commit('loading', true);
      commit('loaded', false);

      const {themes, token} = await this.$api(mode).themes.listThemes();

      themes.map(theme => {
        commit('updateTheme', {
          ...theme,
          ...{
            loading: true,
            loaded: true,
            error: undefined,
          }
        });
      })

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
   * Unload the store.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async unload({commit}) {
    commit('setToken', undefined);
    commit('setError', undefined);
    commit('setLoading', false);
    commit('setLoaded', false);
    commit('setThemes', []);
  },

  /**
   * Reload the store.
   *
   * @param dispatch
   * @returns {Promise<void>}
   */
  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the Theme with the specified themeId.
   *
   * @param commit
   * @param themeId
   * @return {Promise<void>}
   */
  async loadThemeWithThemeId({commit}, themeId) {
    console.log(`## VENUE PUBLIC APP - THEMES STORE - loadThemeWithThemeId`);

    let theme = {
      themeId,

      loading: true,
      loaded: false,
    };
    commit('updateTheme', theme);

    try {
      theme = await this.$api('public').themes.getThemeWithThemeId(themeId);

      if (theme?.default) {
        // set current theme
        commit('setCurrentTheme', theme)
      }

      commit('updateTheme',
        {
          ...theme,
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
