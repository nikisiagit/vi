/**
 * Venue App Public Rooms Repository.
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
});
