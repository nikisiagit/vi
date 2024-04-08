/**
 * Global App components store
 */

export const state = () => ({
  sideTemporaryUserData: {},
  sideTemporaryContentOpen: false,

  sideNavigationOpen: false,
  sideActivityNavigationOpen: false,
  lastNavigationOpened: [], // main, activity
  themeMode: '',

  agendaList: [
    {
      startTime: '12:30 PM',
      endTime: '13:30 PM',
      track: {
        name: 'Panel',
        color: 'info lighten-2'
      },
      isLive: true,
      status: 'join',
      stageId: 'stage-3',
      name: 'group-discussion-virtual-events',
      title: 'Group discussion: How to achieve success in virtual events',
      description: 'Pellentesque rhoncus viverra vestibulum, purus purus quisque quisque sed. Cras vestibulum facilisis dictumst consequat. In bibendum diam nunc dignissim magna morbi mattis.',
      presenters: [
        {
          name: 'Ralph Edwards',
          description: 'Founder & CEO at Strapi',
          avatar: 'https://silicon.createx.studio/assets/img/team/24.jpg'
        },
        {
          name: 'Gavin Newman',
          description: 'CEO and Co-founder at iVent',
          avatar: 'https://ivent-hq.com/wp-content/uploads/2021/07/Gav-Selfie-ForWeb-1.png'
        }
      ],
    },

  ]

});

export const mutations = {

  setLastNavigationOpened (state, navType = null) {
    // clean
    if (! navType)
      state.lastNavigationOpened = []

    if (state.lastNavigationOpened.includes(navType)) {
      const index = state.lastNavigationOpened.findIndex(l => l === navType)
      state.lastNavigationOpened.splice(index, 1);
    } else {
      state.lastNavigationOpened.push(navType);
    }
  },

  setSideNavigationOpen (state, open = false) {
    state.sideNavigationOpen = open;
  },

  setSideActivityNavigationOpen (state, open = false) {
    state.sideActivityNavigationOpen = open;
  },

  setSideTemporaryContentOpen (state, open = false) {
    state.sideTemporaryContentOpen = open;
  },

  addItem (state, item) {
    state.agendaList.push(item);
  },

  removeItem (state, item) {
    const index = state.agendaList.findIndex(i => i.name === item.name)
    state.agendaList.splice(index, 1)
  },

  setSideTemporaryUserData (state, data) {
    state.sideTemporaryUserData = data;
  },
  setChangeThemeMode (state, mode) {
    state.themeMode = mode;
  },
  setTimeFormat (state, format) {
    state.timeFormat = format;
  }
};

export const getters = {
  lastNavigationOpened: (state) => {
    return state.lastNavigationOpened;
  },

  sideNavigationOpen: (state) => {
    return state.sideNavigationOpen;
  },

  sideActivityNavigationOpen: (state) => {
    return state.sideActivityNavigationOpen;
  },

  sideTemporaryContentOpen: (state) => {
    return state.sideTemporaryContentOpen;
  },

  agendaList: (state) => {
    return state.agendaList
  },

  agendaWithName: (state) => (name) => {
    return state.agendaList.find(item => item.name === name);
  },

  sideTemporaryUserData: (state) => {
    return state.sideTemporaryUserData;
  },
  themeMode: (state) => {
    return state.themeMode;
  },
  timeFormat: (state) => {
    return state.timeFormat;
  }
};

export const actions = {
  setLastNavigationOpened ({commit}, navType) {
    commit('setLastNavigationOpened', navType);
  },

  cleanLastNavigationOpened ({commit}) {
    commit('setLastNavigationOpened', null);
  },

  openSideNavigation ({commit}) {
    commit('setSideNavigationOpen', true);
  },

  closeSideNavigation ({commit}) {
    commit('setSideNavigationOpen', false);
  },

  openSideActivityNavigation ({commit}) {
    commit('setSideActivityNavigationOpen', true);
  },

  closeSideActivityNavigation ({commit}) {
    commit('setSideActivityNavigationOpen', false);
  },

  openSideTemporaryContent ({commit}) {
    commit('setSideTemporaryContentOpen', true);
  },

  closeSideTemporaryContent ({commit}) {
    commit('setSideTemporaryContentOpen', false);
  },

  addItemToAgenda ({commit}, item) {
    commit('addItem', item);
  },

  removeItemFromAgenda ({commit}, item) {
    commit('removeItem', item);
  },

  addSideTemporaryUserData ({commit}, data) {
    commit('setSideTemporaryUserData', data);
  },
  changeThemeMode({commit}, mode) {
    this.app.vuetify.framework.theme.dark = mode === 'dark';
    commit('setThemeMode', mode);
  },
  changeTimeFormat({commit}, format) {
    commit('setTimeFormat', format);
  }
};
