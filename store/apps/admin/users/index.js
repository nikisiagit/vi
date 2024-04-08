import dayjs from "dayjs";

export const state = () => ({

  // INITIALISING

  /**
   * Is the store/module initialising?
   */
  initialising: false,

  /**
   * Has the store initialised
   */
  initialised: false,



  // LOADING

  /**
   * Has the Store loaded its "data"?
   */
  loaded: false,

  /**
   * Is this store currently making an api request - typically when calling "load"
   */
  loading: false,

  /**
   * The last load error this store received.
   */
  error: undefined,



  //
  // ALERTS
  //
  alerts: [],



  //
  // USERS
  //

  /**
   * The local Users.
   *
   * This list contains the Users.
   *
   * See Region - Users.
   */
  users: [],



  //
  // CREATING USERS
  //

  /**
   * The Users that are currently being "created" (or have been created).
   *
   * This is typically execution/statemachine responses.
   *
   * See Region - Users - CreateUser StateMachine
   */
  creatingUsers: [],



  //
  // TRIGGERS
  //
  // @todo - to implement
  //
  triggers: [],

});

export const mutations = {

  // INITIALISING

  /**
   * Set the initialised state of the store.
   *
   * @param state
   * @param initialised
   */
  setInitialised (state, initialised = false) {
    state.initialised = initialised;
  },

  /**
   * Set the initialising state of the store.
   *
   * @param state
   * @param initialising
   */
  setInitialising (state, initialising = false) {
    state.initialising = initialising;
  },


  // LOADING

  /**
   * Set the loading state of the store.
   *
   * @param state
   * @param loading
   */
  setLoading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * Set the loaded state of the store.
   *
   * @param state
   * @param loaded
   */
  setLoaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * Set the value of the last "load" error.
   *
   * @param state
   * @param error
   */
  setError (state, error = undefined) {
    state.error = error;
  },


  /**
   * Set the Users state to whatever is supplied.
   *
   * @param state
   * @param users [*]
   */
  setUsers (state, users = []) {
    state.users = users;
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
   * Set the local User to whatever is supplied.
   *
   * @param state
   * @param user {{ userId}}
   */
  setUser (state, user) {
    let {userId} = user;

    const index = state.users.findIndex(item => item.userId === userId);

    // replace
    if (index > -1) {
      state.users.splice(index, 1, user);
    // insert
    } else {
      state.users.push(user);
    }
  },

  /**
   * Update the supplied User by merging in the matching User.
   *
   * @param state
   * @param user {{userId: string, name: string, type: string}}
   */
  updateUser (state, user) {
    let {userId} = user;
    const index = state.users.findIndex(item => item.userId === userId);

    if (index > -1) {
      state.users.splice(
        index, 1,
        {
          ...state.users[index],
          ...user
        }
      )
    } else {
      state.users.push(user);
    }
  },

  /**
   * Remove the local User from the state.
   *
   * @param state
   * @param user
   */
  removeUser(state, user){
    const index = state.users.findIndex(item => item.userId === user.userId);

    if (index > -1) {
      state.users.splice(index, 1);
    }
  },

  /**
   * Set the current pagination token.
   *
   * This is required for loading more Users from the api.
   *
   * @param state
   * @param token
   */
  setToken (state, token = undefined) {
    state.token = token;
  },


  // CREATING USERS

  /**
   * Set the creatingUsers state to whatever is supplied.
   *
   * @param state
   * @param creatingUsers [{email: string}]
   */
  setCreatingUsers (state, creatingUsers = []) {
    state.creatingUsers = creatingUsers;
  },

  /**
   * Update the CreatingUser item in the store.
   *
   * @param state
   * @param creatingUser {{email: string, fullname: (undefined|string)}}
   */
  updateCreatingUser (state, creatingUser) {
    const {email} = creatingUser;

    if (! email) {
      throw new Error(`email is a required attribute`);
    }

    const index = state.creatingUsers.findIndex(item =>  item.email === email);

    if (index < 0) {
      state.creatingUsers.push(creatingUser);
    } else {
      state.creatingUsers.splice(index,1, {...state.creatingUsers[index], ...creatingUser})
    }
  },


  // TRIGGERS
  // @todo -
}

export const getters = {

  // INITIALISING

  /**
   * Return the initialised state of the store.
   *
   * @param state
   * @returns {boolean}
   */
  initialised: (state) => {
    return state.initialised || false;
  },

  /**
   * Return the initialising state of the store.
   *
   * @param state
   * @returns {boolean}
   */
  initialising: (state) => {
    return state.initialising || false;
  },



  // LOADING

  /**
   * Return the loading state of the store.
   *
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Return the loaded state of the Store.
   *
   * @param state
   * @return {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Get the last error seen by this store.
   *
   * @param state
   * @return {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },



  // USERS

  /**
   * @param state
   * @return {[]|*[]}
   */
  users: (state) => {
    return state.users || [];
  },

  /**
   * @deprecated
   *
   * @param state
   * @return {function(*): *}
   */
  userWithName: (state) => (name) => {
    return state.users.find(user => user.fullname === name);
  },

  /**
   * Return the User identified by the supplied UserId.
   *
   * @param state
   * @return {function(*): *}
   */
  userWithUserId: (state) => (userId) => {
    return state.users.find(user => user.userId === userId);
  },

  /**
   * Return the number of loaded Users.
   *
   * @param state
   * @return {number|number}
   */
  numberOfUsers: (state) => {
    return state.users.length || 0;
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
   * Return the CreatingUser identified by the supplied executionArn.
   *
   * @param state
   * @return {(function(*))|*}
   */
  creatingUserWithExecutionArn: (state) => (executionArn) => {
    return state.creatingUsers.find(creatingUser => creatingUser.executionArn === executionArn);
  },
}

export const actions = {

  /**
   * Start up(initialise) the "Admin Users" app/module/store(?)
   *
   * This process "starts up" the module store.
   *
   * It cleans the local cache/state to a "clean" state.
   * It connects to the various WS endpoints.
   *
   * @param dispatch
   * @param commit
   * @param getters
   * @returns {Promise<void>}
   */
  async initialise ({dispatch, commit, getters}) {
    console.log(`## Admin - UsersApp - Initialising`);

    const isInitialised = getters['initialised'];

    if (isInitialised) {
      console.log(`## Admin - UsersApp - UnInitialising`);
      await dispatch('unload');
      await commit('setInitialised', false);
      await commit('setInitialising', false);
      console.log(`## Admin UsersApp - UnInitialised`);
    }

    commit('setInitialising', true);

    // @todo any other initialising steps
    //       connect to the ws server?
    //       trigger user activity events?

    commit('setInitialising', false);
    commit('setInitialised', true);
    console.log(`## Admin UsersApp - Initialised`);
  },

  /**
   * Load the Store.
   *
   * Make a request to the Api to retrieve a list of Users.
   *
   * @todo - this might need to be refactored if we are going to also "load" Triggers etc
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    console.log(`## Admin UsersApp - Load`);
    try {
      commit('setLoading', true);
      commit('setLoaded', false);

      const {users, token} = await this.$api('admin').users.listUsers();

      commit('setUsers', users.map(user => {
        return Object.assign({}, user, {
          loading: false,
          loaded: true,
          error: undefined,
        });
      }));

      commit('setToken', token);
      commit('setLoaded', true);
    } catch (error) {
      console.log('error');
      console.log(error);
      commit('setError', error);
      commit('setLoaded', false);
    } finally {
      commit('setLoading', false);
    }
  },

  /**
   * Unload the state - reset it.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    commit('setLoading', false);
    commit('setLoaded', false);
    commit('setError', undefined);

    commit('setUsers', []);
    commit('setToken', undefined);

    commit('setCreatingUsers', []);
  },

  /**
   * Reload the state - effectively reload the store.
   *
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the User identified by the supplied userId.
   *
   * @param commit
   * @param userId {string}
   * @returns {Promise<void>}
   */
  async loadUserWithUserId ({commit}, userId) {
    let userToLoad = {
      userId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateUser', userToLoad);
      const user = await this.$api('admin').users.getUserWithUserId(userId);

      userToLoad= {
        ...user,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateUser', userToLoad);

    } catch (error) {
      const {message} = error;
      userToLoad = {
        ...userToLoad,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateUser', userToLoad);
    }
  },

  /**
   * @deprecated
   * Load the User with the specified name value.
   *
   * @param commit
   * @param name {string} i.e.
   * @return {Promise<void>}
   */
  async loadUserWithName ({commit}, name) {
    try {
      console.log(`## ADMIN APP - USERS STORE - LOAD USER WITH NAME ${name}`);
      commit('loading', true);
      commit('loaded', false);

      const user = await this.$api('admin').users.getUserWithName(name);

      commit('user', Object.assign({}, user, {
        loading: false,
        loaded: true,
        error: undefined,
      }));

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
   * Create a User in the Partition/Venue.
   *
   * @param commit
   * @param user {{email: string, fullname: (undefined|string)}
   * @return {Promise<*>}
   */
  async createUser ({commit}, user) {
    const {email} = user;

    // validate
    if (! email) {
      throw new Error(`'email' is a required value`);
    }

    // update the store
    let userToCreate = {
      ...user,
      ...{creating: true}
    };
    commit('updateCreatingUser', userToCreate);

    // make the api request
    const creatingUser = await this.$api('admin').users.createUser(user);

    // update the store
    userToCreate = {
      ...userToCreate,
      ...creatingUser,
      ...{creating: true, error: undefined}
    }
    commit('updateCreatingUser', userToCreate);

    // process the api response
    const {executionArn} = creatingUser;

    // polling function
    ((executionArn) => {
      const getExecution = async () => {

        userToCreate = {
          ...userToCreate,
          ...{loading: true}
        }
        commit('updateCreatingUser', userToCreate);

        const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
        const {status, stopDate} = execution;

        userToCreate = {
          ...userToCreate,
          ...{loading: false, status, stopDate}
        }
        commit('updateCreatingUser', userToCreate);


        if (status === 'RUNNING') {
          setTimeout(getExecution, 3000);
        }

        if (status === 'FAILED') {
          console.log('## CREATE USER - FAILED');
        }

        if (status === 'SUCCEEDED') {
          let {output} = execution;
          output = JSON.parse(output);

          let {error, user: createdUser} = output;

          if (error) {
            userToCreate = {
              ...userToCreate,
              ...{error, creating: false}
            }
            commit('updateCreatingUser', userToCreate);
          }

          if (createdUser) {
            userToCreate = {
              ...userToCreate,
              ...createdUser,
              ...{created: true, creating: false, }
            }
            commit('updateCreatingUser', userToCreate);

            createdUser = {
              ...createdUser,
              ...{loading: false, loaded: true, error: undefined}
            }
            commit('updateUser', createdUser);

            commit('setAlerts', {
              type: 'success',
              message: `User called '${userToCreate.fullname || userToCreate.email}' created successfully`,
              time: dayjs(new Date().toISOString()).format("hh:mm A")});
          }
        }
      };

      setTimeout(getExecution, 1000);

    })(executionArn);

    // return the api response
    return creatingUser;
  },

  /**
   * @param commit
   * @param updateUser
   * @returns {Promise<*>}
   */
  async updateUser ({commit}, updateUser) {
    const {userId} = updateUser

    if (!userId) {
      throw new Error(`userId is required`);
    }

    let update = {};

    // NOT Allowed = ['isAdmin'];
    // isAdmin is a de-normalised read-only attribute

    // ALLOWED

    const allowed = ['fullname',"isAdmin"];

    for (const name in updateUser) {
      if (allowed.includes(name)) {
        update[name] = updateUser[name];
      }
    }

    let userUpdate = {
      userId,
      update,
      updating: true,
      updated: false,
    }

    try {
      const updatingEvent = await this.$api('admin').users.updateUser(userId, update);
      const {executionArn} = updatingEvent;

      userUpdate = {
        ...userUpdate,
        ...updatingEvent,
      };
      commit('updateUser', userUpdate);

      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {
          userUpdate = {
            ...userUpdate,
            ...{
              loading: true,
            }
          };
          commit('updateUser', userUpdate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          userUpdate = {
            ...userUpdate,
            ...{
              loading: false,
              status,
              stopDate,
            }
          };
          commit('updateUser', userUpdate);

          if (status === 'RUNNING') {
            console.log('## UPDATE USER - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## UPDATE USER - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## UPDATE USER - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, user: updatedUser} = output;

            if (error) {
              userUpdate = {
                ...userUpdate,
                ...{
                  error,
                  updating: false,
                }
              };
              commit('updateUser', userUpdate);
            }

            if (updatedUser) {

              userUpdate = {
                ...userUpdate,
                ...{
                  updating: false,
                  updated: true,
                }
              };
              commit('updateUser', userUpdate);

              let updatedUserData = {
                ...userUpdate,
                ...{
                  loaded: true,
                  loading: false,
                }
              };

              commit('updateUser', updatedUserData);

              commit('setAlerts', {
                type: 'success',
                message: `User called '${updatedUser.fullname || updatedUser.email}' updated successfully`,
                time: dayjs(new Date().toISOString()).format("hh:mm A")});
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return updatingEvent;

    } catch (error) {
      const {message} = error;
      userUpdate = {
        ...userUpdate,
        ...{
          error: message,
          updating: false,
        }
      };
      commit('updateUser', userUpdate);
      throw error;
    }
  },

  /**
   * @todo refactor to `deleteUser`
   *
   * @param commit
   * @param userId
   * @returns {Promise<*>}
   */
  async removeUser ({commit}, userId) {
      const removingUser = await this.$api('admin').users.removeUser(userId);
      const {executionArn} = removingUser;

    ((executionArn) => {
      const getExecution = async () => {
        const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
        const {status, stopDate} = execution;

        if (status === 'RUNNING') {
          console.log('## DELETE USER - RUNNING');
          setTimeout(getExecution, 2000);
        }

        if (status === 'FAILED') {
          console.log('## DELETE USER - FAILED');
        }

        if (status === 'SUCCEEDED') {
          console.log('## DELETE USER - SUCCEEDED');
          commit('removeUser', userId);

          let {output} = execution;
          output = JSON.parse(output);

          let {error, user: removedUser} = output;
          if (error) {
            commit('removeUser', removedUser);
          }
          if(removedUser) {
            commit('removeUser', removedUser);
            commit('setAlerts', {
              type: 'success',
              message: `User called '${removedUser.fullname || removedUser.email}' deleted successfully`,
              time: dayjs(new Date().toISOString()).format("hh:mm A")});
          }

        }
      };
      setTimeout(getExecution, 1000);
      })(executionArn);

      return removingUser;
  },

  /**
   * Clear Alerts
   *
   * @param commit
   */
  clearAlerts({ commit }) {
    commit('clearAlerts')
  }
};
