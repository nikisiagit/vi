/**
 * Admin Api - Email Settings Repository.
 */

/**
 * @type {string}
 */
const baseUrl = '/email-settings';

export const emailSettingsRepository = (client) => ({
  /**
   * Return the EmailSettings.
   *
   * @returns {Promise<*>}
   */
  async getEmailSettings () {
    return await client.$get(`${baseUrl}`);
  },

  /**
   * Update the EmailSettings.
   *
   * @param update
   * @returns {Promise<*>}
   */
  async updateEmailSettings (update) {
    return await client.$patch(`${baseUrl}`, update)
  },
});
