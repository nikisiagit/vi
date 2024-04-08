/**
 * Admin Api - Users Settings Repository.
 */

/**
 * @type {string}
 */
const baseUrl = '/users-settings';

export const usersSettingsRepository = (client) => ({
  /**
   * Return the UsersSettings.
   *
   * @returns {Promise<*>}
   */
  async getUsersSettings () {
    return await client.$get(`${baseUrl}`);
  },

  /**
   * Update the UsersSettings.
   *
   * @param update
   * @returns {Promise<*>}
   */
  async updateUsersSettings (userSettingsUpdate) {
    return await client.$patch(`${baseUrl}`, userSettingsUpdate)
  },

  /**
   * Create the UsersSettings.
   */
  async createUsersSettings (usersSettings) {
    return await client.$post(`${baseUrl}`, usersSettings);
  },

  /**
   * Create the Social Provider.
   * @param socialProvider
   * @returns {Promise<any>}
   */
  async createSocialProvider (socialProvider) {
    return await client.$post(`${baseUrl}/social-provider`, socialProvider);
  }
});
