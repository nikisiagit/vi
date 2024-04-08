/**
 * Venue App Admin Rooms Repository.
 */
const baseUrl = '/rooms';

export const roomsRepository = (client) => ({

  /**
   * Return a list of the Rooms that belong to the Venue.
   *
   * OperationId: ListRooms
   *
   * @return {Promise<{rooms, token}>}
   */
  async listRooms() {
    const {rooms, token} = await client.$get(`${baseUrl}`);
    return {rooms, token};
  },

  /**
   * @deprecated Please use getRoomWithRoomId
   *
   * Return the Room identified by the supplied name value.
   *
   * @param name {string}
   * @return {Promise<any>}
   */
  async getRoomWithName (name) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(name)}`);
  },

  /**
   * Return the Room with the specified RoomId.
   *
   * @param roomId {string}
   * @return {Promise<any>}
   */
  async getRoomWithRoomId (roomId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(roomId)}`);
  },

  /**
   * Create a Room.
   *
   * OperationId: CreateRoom
   *
   * @param roomToCreate {{name: string}}
   * @return {Promise<any>}
   */
  async createRoom(roomToCreate) {
    return await client.$post(`${baseUrl}`, roomToCreate);
  },

  /**
   * Update the specified Room.
   *
   * OperationId: UpdateRoom
   *
   * @param roomId {string}
   * @param update {{}}
   * @returns {Promise<*>}
   */
  async updateRoomWithRoomId (roomId, update) {
    return await client.$patch(`${baseUrl}/${encodeURIComponent(roomId)}`, update);
  },

  /**
   * Remove the specified Room.
   *
   * OperationId: RemoveRoom
   *
   * @param roomId {string}
   * @returns {Promise<*>}
   */
  async removeRoomWithRoomId (roomId) {
    return await client.$delete(`${baseUrl}/${encodeURIComponent(roomId)}`);
  },
});
