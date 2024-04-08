/**
 * Admin Api Integrations Repository.
 */

/**
 * @type {string}
 */
const baseUrl = '/integrations';

export const integrationsRepository = (api) => ({
  /**
   * @param token
   * @return {Promise<any>}
   */
  async listIntegrations (token = undefined) {
    return await api.$get(`${baseUrl}`);
  },

  /**
   * Create an Integration.
   *
   * OperationId: CreateIntegration
   *
   * @param integrationToCreate {{integrationType: string, apiKey: string}}
   * @return {Promise<any>}
   */
  async createIntegration (integrationToCreate) {
    return await api.$post(`${baseUrl}`, integrationToCreate);
  },

  /**
   * @param name
   * @return {Promise<any>}
   */
  async getIntegrationWithIntegrationType (integrationType) {
    return await api.$get(`${baseUrl}/${encodeURIComponent(integrationType)}`);
  },


});
