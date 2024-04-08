/**
 * [PRO-239] Venue App - Users
 *
 * @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-239
 *
 * Users Repository for interfacing with the 'protected' view of Users.
 */

/**
 * @type {string}
 */
const baseUrl = '/users'

export const usersRepository = (api) => ({
  /**
   * Retrieve the protected view of the User identified by the supplied UserId.
   *
   * OperationId: GetUserWithUserId
   *
   * @return {Promise<any>}
   */
  async getUser(userId) {
    return await api.$get(`${baseUrl}/${encodeURIComponent(userId)}`);
  },

  async getAllUsers(searchTerm) {
    let filtersReq = '';

    if (searchTerm) {
      filtersReq = `?search=${searchTerm}`

    }

    const response = await api.$get(`${baseUrl}` + filtersReq);
    return response;
  }
})
