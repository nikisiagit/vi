/**
 * snackbar store
 */

export const state = () => ({
  /**
   * The text/message to show.
   */
  text: '',
  /**
   * The color/status of the toast.
   */
  type: '',

  /**
   * The state of the toast.
   */
  show: false
});

export const mutations = {

  show (state, show = false) {
    state.show = show;
  },

  type (state, type = '') {
    state.type = type;
  },

  text (state, text = '') {
    state.text = text;
  }
};

export const getters = {
  show: (state) => {
    return state.show;
  },

  type: (state) => {
    return state.type;
  },

  text: (state) => {
    return state.text;
  },
};

export const actions = {
  showSnackbar ({commit}, payload) {
    commit('text', payload.text);
    commit('type', payload.type);
    commit('show', true);
  },

  hideSnackbar ({commit}) {
    commit('text', '');
    commit('type', '');
    commit('show', false);
  },

  changeType ({commit}, type) {
    commit('type', type);
  },

  changeText ({commit}, text) {
    commit('text', text);
  },
};
