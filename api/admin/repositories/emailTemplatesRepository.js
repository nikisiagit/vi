/**
 * Admin Api - EmailTemplates Repository.
 */

/**
 * @type {string}
 */
const baseUrl = '/email-templates';

/**
 * @param client {Axios}
 * @returns {{}}
 */
export const emailTemplatesRepository = (client) => ({
  /**
   * Return a EmailTemplatesList containing the EmailTemplates that belong to the Partition.
   *
   * OperationId: ListEmailTemplates
   *
   * @returns {Promise<{emailTemplates, token}>}
   */
  async listEmailTemplates () {
    const {emailTemplates, token} = await client.$get(`${baseUrl}`);
    return {emailTemplates, token};
  },

  /**
   * Create a new EmailTemplate.
   *
   * OperationId: CreateEmailTemplate
   *
   * @param emailTemplateToCreate {{ title: {text: string, languageId: string}, description: {text: string, languageId: string},}}
   * @returns {Promise<any>}
   */
  async createEmailTemplate (emailTemplateToCreate) {
    return await client.$post(`${baseUrl}`, emailTemplateToCreate);
  },

  /**
   * Return the EmailTemplate identified by the supplied EmailTemplateId.
   *
   * OperationId: GetEmailTemplateWithEmailTemplateId
   *
   * @param emailTemplateId {string}
   * @returns {Promise<any>}
   */
  async getEmailTemplateWithEmailTemplateId (emailTemplateId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(emailTemplateId)}`);
  },

  /**
   * Remove the EmailTemplate identified by the supplied EmailTemplateId.
   *
   * @param emailTemplateId {string}
   * @returns {Promise<any>}
   */
  async removeEmailTemplateWithEmailTemplateId(emailTemplateId) {
    return await client.$delete(`${baseUrl}/${encodeURIComponent(emailTemplateId)}`);
  },


  /**
   * @param updateEmailTemplate
   * @returns {Promise<*>}
   */
  async updateTemplateWithTemplateId(updateEmailTemplate) {
    const {emailTemplateId} = updateEmailTemplate;
    return await client.$put(`${baseUrl}/${encodeURIComponent(emailTemplateId)}`, updateEmailTemplate);
  }
});
