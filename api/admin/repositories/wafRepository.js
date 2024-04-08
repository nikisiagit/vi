/**
 * Venue App Admin WAF Repository.
 */
const baseUrl = '/waf';

export const wafRepository = (client) => ({

  /**
   * Return a list of the country codes that belong to the partition rule.
   *
   * OperationId: ListCountryCodes
   *
   * @return {Promise<{tags, token}>}
   */
  async listRuleCountryCodes () {
    return await client.$get(`${baseUrl}/countries`);
  },

  /**
   * Create a Rule.
   *
   * OperationId: CreateRule
   *
   * @param countryCodes [string]
   * @return {Promise<any>}
   */
  async createRuleWithCountryCodes (countryCodes) {
    return await client.$post(`${baseUrl}/rule`, countryCodes);
  },

  /**
   * Delete a Rule.
   *
   * OperationId: DeleteRule
   */
  deleteRule () {
    return client.$delete(`${baseUrl}/rule`);
  }

});
