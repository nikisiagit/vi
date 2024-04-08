/**
 * @type {string}
 */
const baseUrl = '/registrations';

export const registrationsRepository = (client) => ({
  /**
   * List the Registrations inside the Venue (Organisers)
   *
   * @return {Promise<any>}
   */
  async listRegistrations() {
    return await client.$get(`${baseUrl}`);
  },

  /**
   * Create an Registration.
   *
   * @param registrationToCreate
   * @return {Promise<any>}
   */
  async createRegistration (registrationToCreate) {
    return await client.$post(`${baseUrl}`, registrationToCreate);
  },

  /**
   * Return the Registration with the specified registration id.
   *
   * @param registrationId {string}
   * @return {Promise<any>}
   */
  async getRegistrationWithRegistrationId (registrationId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(registrationId)}`);
  },

  /**
   * Delete the Registration identified by the supplied RegistrationId.
   *
   * @param registrationId {string}
   * @return {Promise<void>}
   */
  async deleteRegistrationWithRegistrationId (registrationId) {
    return await client.$delete(`${baseUrl}/${encodeURIComponent(registrationId)}`);
  },

  /**
   * Update the Registration identified by the supplied Name.
   *
   * @param registrationId {string}
   * @param update {{tagIds: [string], }}
   * @return {Promise<any>}
   */
  async updateRegistrationWithRegistrationId (registrationId, update) {
    return await client.$patch(`${baseUrl}/${encodeURIComponent(registrationId)}`, update);
  },

  /**
   * Create a new Field for the Registration identified by the supplied RegistrationId.
   * @param registrationId {string}
   * @param fieldToCreate {{name: string, type: string, required: boolean, options: [string]}}
   * @return {Promise<any>}
   */
  async createField (registrationId, fieldToCreate) {
    return await client.$post(`${baseUrl}/${encodeURIComponent(registrationId)}/fields`, fieldToCreate);
  },

  /**
   * List the Fields for the Registration identified by the supplied RegistrationId.
   * @param registrationId {string}
   * @return {Promise<any>}
   */
  async listFields (registrationId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(registrationId)}/fields`);
  },

  /**
   * Update the Field identified by the supplied FieldId.
   * @param registrationId {string}
   * @param fieldId {string}
   * @param update {{name: string, type: string, required: boolean, options: [string]}}
   */
  async updateFieldWithFieldId (registrationId, fieldId, update) {
    return await client.$patch(`${baseUrl}/${encodeURIComponent(registrationId)}/fields/${encodeURIComponent(fieldId)}`, update);
  },

  /**
   * Return the Field with the specified field id.
   * @param registrationId {string}
   * @param fieldId {string}
   * @return {Promise<any>}
   */
  async getFieldWithFieldId (registrationId, fieldId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(registrationId)}/fields/${encodeURIComponent(fieldId)}`);
  },

  /**
   * Delete the Field identified by the supplied FieldId.
   * @param registrationId {string}
   * @param fieldId {string}
   * @return {Promise<void>}
   */
  async deleteFieldWithFieldId (registrationId, fieldId) {
    return await client.$delete(`${baseUrl}/${encodeURIComponent(registrationId)}/fields/${encodeURIComponent(fieldId)}`);
  },

  /**
   * Create a new Option for the Field identified by the supplied FieldId.
   * @param registrationId {string}
   * @param fieldId {string}
   * @param optionToCreate {{name: string}}
   * @return {Promise<any>}
   */
  async createOption (registrationId, fieldId, optionToCreate) {
    return await client.$post(`${baseUrl}/${encodeURIComponent(registrationId)}/fields/${encodeURIComponent(fieldId)}/options`, optionToCreate);
  },

  /**
   * List the Options for the Field identified by the supplied FieldId.
   * @param registrationId {string}
   * @param fieldId {string}
   * @return {Promise<any>}
   */
  async listOptions (registrationId, fieldId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(registrationId)}/fields/${encodeURIComponent(fieldId)}/options`);
  },

  /**
   * Update the Option identified by the supplied OptionId.
   * @param registrationId {string}
   * @param fieldId {string}
   * @param optionId {string}
   * @param update {{name: string}}
   */
  async updateOptionWithOptionId (registrationId, fieldId, optionId, update) {
    return await client.$patch(`${baseUrl}/${encodeURIComponent(registrationId)}/fields/${encodeURIComponent(fieldId)}/options/${encodeURIComponent(optionId)}`, update);
  },

  /**
   * Return the Option with the specified option id.
   * @param registrationId {string}
   * @param fieldId {string}
   * @param optionId {string}
   * @return {Promise<any>}
   */
  async getOptionWithOptionId (registrationId, fieldId, optionId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(registrationId)}/fields/${encodeURIComponent(fieldId)}/options/${encodeURIComponent(optionId)}`);
  },

  /**
   * Delete the Option identified by the supplied OptionId.
   * @param registrationId {string}
   * @param fieldId {string}
   * @param optionId {string}
   * @return {Promise<void>}
   */
  async deleteOptionWithOptionId (registrationId, fieldId, optionId) {
    return await client.$delete(`${baseUrl}/${encodeURIComponent(registrationId)}/fields/${encodeURIComponent(fieldId)}/options/${encodeURIComponent(optionId)}`);
  },

});
