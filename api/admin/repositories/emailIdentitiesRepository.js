/**
 * Admin Api - EmailIdentities Repository
 */

/**
 * @type {string}
 */
const baseUrl = '/email-identities';

export const emailIdentitiesRepository = (client) => ({
  /**
   * Return an EmailIdentitiesList containing the EmailIdentities that belong to the Partition.
   *
   * OperationId: ListEmailIdentities
   *
   * @returns {Promise<{emailTemplates, token}>}
   */
  async listEmailIdentities() {
    const {emailIdentities, token} = await client.$get(`${baseUrl}`);
    return {emailIdentities, token};
  },

  /**
   * Create a new EmailIdentity.
   *
   * OperationId: CreateEmailIdentity
   *
   * @param createEmailIdentity {{emailAddress: string}}
   * @returns {Promise<any>}
   */
  async createEmailIdentity (createEmailIdentity) {
    return await client.$post(`${baseUrl}`, createEmailIdentity);
  },
});
