/**
 * Rooms With Venue State.
 */
export const state = () => ({
  /**
   * The loaded state.
   */
  loaded: false,

  /**
   * The loading state.
   */
  loading: false,

  /**
   * The last error seen by this store.
   */
  error: undefined,

  /**
   * The list of Rooms.
   */
  rooms: [],
    // {
    //   name: '',
    //   title: '',
    //   description: '',
    //   roomType: '',
    //   startDate: '',
    //   endDate: '',
    //
    //   enableChat: true,
    //   enablePeople: true,
    //   enableRecording: true,
    // }

  initialising: false,

  initialised: false,
});

export const mutations = {
  /**
   * @deprecated - Please use setRooms
   * @param state
   * @param rooms
   */
  rooms (state, rooms ) {
    state.rooms = rooms;
  },

  /**
   * Set the Rooms state to whatever is supplied.
   *
   * @param state
   * @param rooms [{}]
   */
  setRooms (state, rooms = []) {
    state.rooms = rooms;
  },


  loading (state, loading = false) {
    state.loading = loading;
  },

  loaded (state, loaded = false) {
    state.loaded = loaded;
  },

  error (state, error = undefined) {
    state.error = error;
  },

  /**
   * @param state
   * @param token
   */
  token (state, token = undefined) {
    state.token = token;
  },

  /**
   * Update the specified Room.
   *
   * @param state
   * @param room {{ roomId: string, name: string, partition: string, type: string}}
   */
  updateRoom (state, room) {
    const {roomId} = room;
    const index = state.rooms.findIndex(item =>  item.roomId === roomId);

    if (index < 0) {
      state.rooms.push(room);
    } else {
      state.rooms.splice(index, 1, {...state.rooms[index], ...room})
    }
  },
}

export const getters = {

  /**
   * @param state
   * @return {undefined}
   */
  rooms: (state) => {
    return state.rooms || [];
  },

  /**
   * Return the number of Rooms.
   *
   * @param state
   * @return {number|number}
   */
  numberOfRooms: (state) => {
    return state.rooms.length || 0;
  },

  /**
   * Return the Rooms identified by the supplied roomName.
   *
   * @param state
   * @param roomId {string}
   */
  roomWithRoomId: (state) => (roomId) => {

    // console.log(state.rooms);

    // console.log("roomId", roomId)

    return roomId && state.rooms.find(room => {
      // console.log("roomId", roomId.toLowerCase(), room.name.toLowerCase())
      return room.roomId.toLowerCase() === roomId.toLowerCase()
    });

  },


  loading: (state) => {
    return state.loading || false;
  },

  loaded: (state) => {
    return state.loaded || false;
  },

  error: (state) => {
    return state.error || undefined;
  },
}

export const actions = {
  /**
   * Load the Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load({commit}) {
    try {
      console.log(`## VENUE APP - ROOMS STORE - LOAD`);
      commit('loading', true);
      commit('loaded', false);

      const {rooms, token} = await this.$api('public').rooms.listRooms();

      commit('setRooms',
        rooms.map(room => {
          return Object.assign({}, room, {
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
   * Load the Room with the specified RoomId.
   *
   * @param commit
   * @param roomId
   * @return {Promise<void>}
   */
  async loadRoomWithRoomId({commit}, roomId) {
    let room = {
      roomId,
      loading: true,
      loaded: false,
    };
    commit('updateRoom', room);

    try {
      room = await this.$api('public').rooms.getRoomWithRoomId(roomId);
      room = {
        ...room,
        ...{
          loading: false,
          loaded: true,
          error: undefined,
        }
      }
      commit('updateRoom', room);

    } catch (error) {
      room = {
        ...room,
        ...{
          loading: false,
          loaded: false,
          error: error,
        }
      }
      commit('updateRoom', room);
    }
  },

  /**
   * @param commit
   * @return {Promise<void>}
   */
  async unload({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setRooms', []);
  },

  /**
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },
};
