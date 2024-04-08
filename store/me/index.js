/**
 * The Me Store
 */
export const state = () => ({
  /**
   * The Me Profile
   */
  me: undefined,

  /**
   * The list of updates to the Me Profile.
   */
  meUpdates: [],

  /**
   * The most recent error.
   */
  error: undefined,

  /**
   * Is this store loading?
   */
  loading: false,

  /**
   * Has this store loaded?
   */
  loaded: false,
});

export const mutations = {
  /**
   * Set the Me to whatever is supplied.
   *
   * @param state
   * @param me {{ name: string }}
   */
  setMe (state, me) {
    state.me = me;
  },

  /**
   * Update the me state.
   *
   * @param state
   * @param update {{ name: string }}
   */
  updateMe (state, update) {
    state.me = {
      ...state.me,
      ...update
    };
  },

  /**
   * Set the loading value.
   *
   * @param state
   * @param loading {boolean}
   */
  setLoading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * Set the loaded value.
   *
   * @param state
   * @param loaded {boolean}
   */
  setLoaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * Set the error to whatever is supplied.
   *
   * @param state
   * @param error
   */
  setError (state, error = undefined) {
    state.error = error;
  },

  /**
   * Update the Me Update
   *
   * @param state
   * @param meUpdate
   */
  updateMeUpdate (state, meUpdate) {
    const {executionArn} = meUpdate;
    const index = state.meUpdates.findIndex(meUpdate => meUpdate.executionArn === executionArn);

    if (index < 0) {
      state.meUpdates.push(meUpdate)
    } else {
      state.meUpdates.splice(index, 1, {...state.meUpdates[index], ...meUpdate});
    }
  },
};

/**
 * @type {{myProfileLoading: (function(*): boolean|mutations.myProfileLoading|string|*), myProfile: (function(*): mutations.myProfile|string|*)}}
 */
export const getters =
  {
  /**
   * me/me
   * @param state
   * @return {*}
   */
  me: (state) => {
    return state.me || undefined;
  },

  /**
   * Return the loading state.
   *
   * @param state
   * @returns {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Return the loaded state.
   *
   * @param state
   * @returns {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Return the last error that this store had.
   *
   * @param state
   * @returns {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },

  /**
   * Return the UpdatingMe identified by the supplied executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  updatingMeWithExecutionArn: (state) => (executionArn) => {
    return state.meUpdates.find(meUpdate => meUpdate.executionArn === executionArn);
  },

  /**
   * Return the list of Profile Roles.
   *
   * me/roles
   *
   * @param state
   * @return {[]|[{name: string, roleContext: string}, {name: string, roleContext: string}, {name: string, roleContext: string}]|mutations.roles|*|*[]}
   */
  roles: (state) => {
    return (state.me) ? state.me.roles || [] : [];
  },

  /**
   * Return a boolean that indicates that the Me is an Admin.
   *
   * @param state
   * @param getters
   * @returns {T|boolean}
   */
  isAdmin: (state, getters) => {
    return getters.roles.reduce((acc, {name}) => {
      return acc || name === 'admin'
    }, false) || false;
  },
};

/**
 * @type {{load(*): Promise<void>, unload(*): void}}
 */
export const actions = {
  /**
   * Get the Me Profile
   *
   * OperationId: GetMe
   *
   * @param context
   */
  async load({commit,dispatch}) {
    try {
      commit('setLoaded', false);
      commit('setLoading', true);

      let me = await this.$api().me.getMe();
      commit('setMe', me);


      for (const name in me) {
        // update the theme plugin
        if (name === 'themeMode') {
          dispatch('app/changeThemeMode', me[name], {root: true});
        }
        else if(name === "timeFormat") {
          dispatch('app/changeTimeFormat', me[name], {root: true});
        }
        // update the i18n plugin
        // ... others
      }

    /*  const {profileRoles, token} = await this.$api().me.listProfileRoles();

      commit('updateMe', Object.assign({}, me, {
        roles: profileRoles,
      }));*/


      const {profileChats} = await this.$api().me.listProfileChats();
      commit('updateMe', Object.assign({}, me, {
        profileChats: profileChats,
      }));

      const {tickets} = await this.$api().me.listTickets();
      commit('updateMe', Object.assign({}, me, {
        tickets: tickets,
      }));

      const library = await this.$api().me.listLibrary();
      commit('updateMe', Object.assign({}, me, {
        library: library,
      }));

      commit('setLoaded', true);

    } catch (error) {
      commit('setError', error);
      commit('setLoaded', false);

    } finally {
      commit('setLoading', false);
    }
  },

  /**
   * Reload the me state.
   *
   * @param dispatch
   * @returns {Promise<void>}
   */
  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Unload the Me store
   *
   * @param context
   */
  unload({commit}) {
    commit('setMe', undefined);
    commit('setError', undefined);
    commit('setLoaded', false);
    commit('setLoading', false);
  },

  /**
   * Update the Me Profile.
   *
   * @param meUpdate {{}}
   * @return {Promise<{}>}
   */
  async updateMe({commit, getters}, meUpdate) {
    // the list of attributes that can be updated
    const allowed = [
      'fullname',
      'avatar',
      'languageId',
      'timeFormat',
      'timezoneId',
      'themeMode',
      "biography",
      "headline",
      "socialLinks",
    ];

    for (const variable in meUpdate) {
      const name = variable;

      if (!allowed.includes(name)) {
        console.log(`## UPDATE ME - ${name} CANNOT BE UPDATED!`);
        continue;
      }
    }

    try {
      const updatingMe = await this.$api('protected').me.updateMe(meUpdate);
      console.log(`## UPDATING ME`);
      console.log(updatingMe);

      const {executionArn} = updatingMe;

      let update = {
        ...updatingMe,
        ...{
          updating: true
        },
      };
      commit('updateMeUpdate', update);

      // polling function
      ((executionArn) => {
        const getExecution = async () => {
          let update = {
            ...updatingMe,
            ...{
              loading: true
            },
          };
          commit('updateMeUpdate', update);

          const execution = await this.$api('protected').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          update = {
            ...update,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateMeUpdate', update);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## UPDATE ME - FAILED');
          }

          if (status === 'SUCCEEDED') {

            let {output} = execution;
            output = JSON.parse(output);
            let {error, user: updatedMe} = output;
            if (error) {
              update = {
                ...update,
                ...{
                  error,
                  updating: false,
                  loaded: false
                },
              };
              commit('updateMeUpdate', update);
            }


            if (updatedMe) {
              update = {
                ...update,
                ...updatedMe,
                ...{
                  updated: true,
                  updating: false,
                  loaded: true
                },
              };
              commit('updateMeUpdate', update);

              updatedMe = {
                ...updatedMe,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateMe', updatedMe);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return updatingMe;

    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a ProfileChat.
   *
   * Join a Chat.
   *
   * @param commit
   * @param getters
   * @param profileChat {{chatId: string}}
   * @returns {Promise<void>}
   */
  async createProfileChat({commit, getters}, profileChat) {
    try {
      let profileChatToCreate = {
        ...profileChat,
        ...{
          error: undefined,
          creating: true,
        }
      };


      let creatingProfileChat = await this.$api('protected').me.createProfileChat(profileChat);
      const {executionArn, startDate} = creatingProfileChat;
      console.log(creatingProfileChat);

      profileChatToCreate = {
        ...profileChatToCreate,
        ...creatingProfileChat,
      };
      commit('updateCreatingProfileChat', profileChatToCreate);

      return creatingProfileChat;

    } catch (error) {
      throw error;
    }
  },
};
