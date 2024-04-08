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

  room: undefined,

  /**
   * The list of CreatingRoom items.
   */
  creatingRooms: [],

  /**
   * The list of UpdatingRoom items.
   */
  updatingRooms: [],


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

  setRoom (state, room = []) {
    state.room = room;
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
   * Remove the Room from the events state.
   *
   * @param state
   * @param room
   */
  removeRoom(state, room) {
    const index = state.events.findIndex((item) => {
      return item.roomId === room.roomId
    })

    if (index > -1) {
      state.events.splice(index, 1)
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

  /**
   * Update (or insert) the specified CreatingRoom item.
   *
   * @param state
   * @param creatingRoom {{name: string}}
   */
  updateCreatingRoom (state, creatingRoom) {
    const {name} = creatingRoom;
    const index = state.creatingRooms.findIndex(item =>  item.name === name);

    if (index < 0) {
      state.creatingRooms.push(creatingRoom);
    } else {
      state.creatingRooms.splice(index, 1, {...state.creatingRooms[index], ...creatingRoom})
    }
  },

  /**
   * Update the UpdatingRoom instance.
   *
   * @param state
   * @param updatingRoom {{executionArn: string}}
   */
  updateUpdatingRoom (state, updatingRoom) {
    const {executionArn} = updatingRoom;
    const index = state.updatingRooms.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.updatingRooms.push(updatingRoom);
    } else {
      state.updatingRooms.splice(index, 1, {
        ...state.updatingRooms[index],
        ...updatingRoom
      });
    }
  }
}

export const getters = {

  /**
   * @param state
   * @return {undefined}
   */
  rooms: (state) => {
    return state.rooms || [];
  },

  room: (state) => {
    return state.room || undefined;
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

    return state.room

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

  /**
   * Return the CreatingRoom identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingRoomWithExecutionArn: (state) => (executionArn) => {
    return state.creatingRooms.find(creatingRoom => creatingRoom.executionArn === executionArn);
  },

  /**
   * Return the UpdatingRoom instance identified by the supplied executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  updatingRoomWithExecutionArn: (state) => (executionArn) => {
    return state.updatingRooms.find(updatingRoom => updatingRoom.executionArn === executionArn);
  },

  removingRoomWithExecutionArn: (state) => (executionArn) => {
    return state.removingEvents.find(removingEvent => removingEvent.executionArn === executionArn);
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
      console.log(`## VENUE APP ADMIN - ROOMS STORE - LOAD`);
      commit('loading', true);
      commit('loaded', false);

      const {rooms, token} = await this.$api('admin').rooms.listRooms();

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

    commit('setRoom', room);


    try {
      room = await this.$api('admin').rooms.getRoomWithRoomId(roomId);
      room = {
        ...room,
        ...{
          loading: false,
          loaded: true,
          error: undefined,
        }
      }

      console.log("STORE LOG --------------------")
      console.log(room)

      commit('setRoom', room);


    } catch (error) {
      room = {
        ...room,
        ...{
          loading: false,
          loaded: false,
          error: error,
        }
      }
      commit('setRoom', room);
    }
  },


  async returnRoomWithRoomId({commit}, roomId) {
    return await this.$api('admin').rooms.getRoomWithRoomId(roomId);
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
    commit('setRoom', undefined);
  },

  /**
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Create a new Room.
   *
   * @param commit
   * @param room {{name: string}}
   * @return {Promise<any>}
   */
  async createRoom ({commit}, room) {
    let roomToCreate = {
      ...room,
      ...{creating: true}
    };
    commit('updateCreatingRoom', roomToCreate);

    try {
      const creatingRoom = await this.$api('admin').rooms.createRoom(room);
      const {executionArn} = creatingRoom;

      roomToCreate = {
        ...roomToCreate,
        ...creatingRoom,
      };
      commit('updateCreatingRoom', roomToCreate);

      // start the polling function
      ((executionArn) => {
        const getExecution = async () => {
          roomToCreate = {
            ...roomToCreate,
            ...{
              loading: true
            }
          };
          commit('updateCreatingRoom', roomToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## CREATE ROOMS - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;
          roomToCreate = {
            ...roomToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingRoom', roomToCreate);


          if (status === 'RUNNING') {
            console.log('## CREATE ROOMS - RUNNING');
            setTimeout(getExecution, 3000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE ROOMS - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE ROOMS - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            console.log(`## OUTPUT`);
            console.log(output);

            let {error, room: createdRoom} = output;

            if (error) {
              roomToCreate = {
                ...roomToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingRoom', roomToCreate);
            }

            if (createdRoom) {
              roomToCreate = {
                ...roomToCreate,
                ...createdRoom,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingRoom', roomToCreate);

              createdRoom = {
                ...createdRoom,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateRoom', createdRoom);
            }
          }
        };

        setTimeout(getExecution, 3000);
      })(executionArn);

      return creatingRoom;

    } catch (error) {
      const {message} = error;
      roomToCreate = {
        ...roomToCreate,
        ...{
          error: message,
          creating: false
        }
      };
      commit('updateCreatingRoom', roomToCreate);
    }
  },

  /**
   * Update a Room.
   *
   * @param commit
   * @param roomUpdate {{roomId: string, }}
   * @returns {Promise<void>}
   */
  async updateRoom ({commit}, roomUpdate) {
    console.log(`## ADMIN ROOMS - UPDATE ROOM`);
    console.log(roomUpdate);

    const {roomId} = roomUpdate;

    if (! roomId) {
      throw new Error(`A roomId is required`);
    }

    let update = {};

    const allowed = [
      'maxParticipants',
      'themeId',
      'languageId',
      'tagIds',
    ];

    for (const name in roomUpdate) {
      update[name] = roomUpdate[name];
      /*
      if (allowed.includes(name)) {
        update[name] = roomUpdate[name];
      }
       */
    }

    console.log(`## UPDATE`);
    console.log(update);

    let updateRoom = {
      roomId,
      update,
      updating: true,
      updated: false,
    };

    try {
      const updatingRoom = await this.$api('admin').rooms.updateRoomWithRoomId(roomId, update);
      console.log(`## UPDATING ROOM`);
      console.log(updatingRoom);

      const {executionArn} = updatingRoom;

      console.log(executionArn);

      updateRoom = {
        ...updateRoom,
        ...updatingRoom,
      };
      commit('updateUpdatingRoom', updateRoom);

      // start the polling function
      ((executionArn) => {
        const getExecution = async () => {
          updateRoom = {
            ...updateRoom,
            ...{
              loading: true,
            },
          };
          commit('updateUpdatingRoom', updateRoom);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## UPDATE ROOM - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          updateRoom = {
            ...updateRoom,
            ...{
              loading: false,
              status,
              stopDate,
            }
          };
          commit('updateUpdatingRoom', updateRoom);

          if (status === 'RUNNING') {
            console.log('## UPDATE ROOM - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## UPDATE ROOM - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## UPDATE ROOM - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, room: updatedRoom} = output;

            if (error) {
              updateRoom = {
                ...updateRoom,
                ...{
                  error,
                  updating: false,
                }
              };
              commit('updateUpdatingRoom', updateRoom);
            }

            if (updatedRoom) {
              updateRoom = {
                ...updateRoom,
                ...{
                  updating: false,
                  updated: true,
                }
              };
              commit('updateUpdatingRoom', updateRoom);

              let room = {
                ...updatedRoom,
                ...{
                  loaded: true,
                  loading: false,
                }
              }
              commit('updateRoom', room);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return updatingRoom;
    } catch (error) {
      const {message} = error;
      updateRoom = {
        ...updateRoom,
        ...{
          error: message,
          updating: false,
        },
      };
      commit('updateUpdatingRoom', updateRoom);
      throw error;
    }
  },

  async removeRoom (context, roomId) {
    console.log(`## ROOM STORE - REMOVE-ROOM`);
    console.log(`## ROOM ID TO REMOVE`);

    try {
      const removingRoom = await this.$api('admin').rooms.removeRoomWithRoomId(roomId);
      const {executionArn} = removingRoom;

      context.commit('updateRemovingRoom',
        Object.assign({}, removingRoom, {
          removing: true,
        })
      );

      /**
       * The Polling function we will create to retrieve the status of the RemoveRoom request.
       *
       * @link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
       * @param removingEvent
       */
      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {

          context.commit('updateRemovingRoom',
            Object.assign({}, removingRoom, {
              loading: true,
            })
          );

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## REMOVING ROOM - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          context.commit('updateRemovingRoom',
            Object.assign({}, removingRoom, {
              loading: false,
              status,
              stopDate,
            })
          );

          if (status === 'RUNNING') {
            console.log('## REMOVING ROOM - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## REMOVING ROOM - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## REMOVING ROOM - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, event: removedRoom} = output;

            if (error) {

              context.commit('updateRemovingRoom',
                Object.assign({}, removingRoom, {
                  error,
                  removing: false,
                })
              );
            }

            if (removedRoom) {
              context.commit('updateRemovingRoom',
                Object.assign({}, removingRoom, {
                  removing: false,
                  removed: true,
                })
              );

              /**
               ** Remove the specific Event from the store
               */
              context.commit('removeRoom', removedRoom);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return removingRoom;

    } catch (error) {
      const {message} = error;

      context.commit('updateRemovingRoom', {
        ...{
          error: message,
          removing: false,
          removed: false
        }
      });
      throw error;
    }
  },
};
