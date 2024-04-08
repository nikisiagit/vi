/**
 * Admin Api - Users Repository.
 *
 * It's like 'User Management'
 */
const baseUrl = '/users';


export const usersRepository = (client) => ({
  /**
   * List the Users.
   *
   * OperationId: ListUsers
   *
   * @return {Promise<{roles, token}>}
   */
  async listUsers () {
    const {users, token} = await client.$get(`${baseUrl}`);
    return {users, token};
  },

  /**
   * @deprecated
   *
   * Return the User identified by the supplied name value.
   *
   * OperationId: GetUserWithName
   *
   * @param name {string} '12345'
   * @return {Promise<any>}
   */
  async getUserWithName (name) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(name)}`);
  },

  /**
   * Return the User identified by the supplied UserId.
   *
   * @param userId {string}
   * @returns {Promise<any>}
   */
  async getUserWithUserId (userId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(userId)}`);
  },

  /**
   * Create a User.
   *
   * OperationId: CreateUser
   *
   * @param createUser {{name: string}}
   * @return {Promise<any>}
   */
  async createUser (createUser) {
    return await client.$post(`${baseUrl}`, createUser);
  },

  /**
   * Update User.
   *
   * @param update {{}}
   * @returns {Promise<any>}
   */
  async updateUser(userId, update) {
    return await client.$patch(`${baseUrl}/${encodeURIComponent(userId)}`, update);
  },

  /**
   * Remove a User.
   *
   * OperationId: RemoveUser
   *
   * @param removeUser {{name: string}}
   * @return {Promise<any>}
   */
  async removeUser(userId) {
    return client.$delete(`${baseUrl}/${encodeURIComponent(userId)}`);
  }
});
