/**
 *  Api [Partition]/ Timezones Repository.
 */
/**
 * @type {string}
 */
const baseUrl = '/timezones';

export const timezonesRepository = (api) => ({

  /**
   * Return a list of the Timezones.
   *
   * @param token {undefined|string}
   * @return {Promise<any>}
   */
  async listTimezones (token = undefined) {
    return await api.$get(`${baseUrl}`);
  },
})
