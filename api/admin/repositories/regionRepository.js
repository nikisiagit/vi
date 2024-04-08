/**
 * @type {string}
 */
const baseUrl = '/region';

/**
 * @param client
 * @return {{listRoles(): Promise<{roles, token}>}}
 */
export const regionRepository = (client) => ({
  /**
   * Return a list of the Roles that can be added to the Partition/Venue Profiles.
   *
   * OperationId: ListRegionRoles
   *
   * @return {Promise<{roles, token}>}
   */
  async listRoles () {
    // remove OWNER ROLE from Api
    const {roles, token} = await client.$get(`${baseUrl}/roles`);
    return {roles, token};
  },

  /**
   * Return a list of the Languages that can be added to the Partition/Venue.
   *
   * OperationId: ListRegionLanguages
   *
   * @return {Promise<{languages, token}>}
   */
  async listLanguages () {
    const {languages, token} = await client.$get(`${baseUrl}/languages`);
    return {languages, token};
  },

  /**
   * Return a list of the Currencies available to the Venue (from the Region).
   *
   * OperationId: ListRegionCurrencies
   * @return {Promise<{currencies, token}>}
   */
  async listCurrencies () {
    const {currencies, token} = await client.$get(`${baseUrl}/currencies`);
    return {currencies, token};
  },

  /**
   * Return a list of the Timezones available to the Venue (from the Region).
   *
   * OperationId: ListRegionTimezones
   *
   * @return {Promise<{timezones, token}>}
   */
  async listTimezones () {
    const {timezones, token} = await client.$get(`${baseUrl}/timezones`);
    return {timezones, token};
  },
});
