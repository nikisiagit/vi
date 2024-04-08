/**
 * Admin Api Advertisements Repository.
 */
/**
 * @type {string}
 */
const baseUrl = '/advertisements';

export const advertisementsRepository = (api) => ({

  /**
   * Return a list of the Advertisements that belong to the Venue/Partition.
   *
   * @param token {undefined|string}
   * @return {Promise<any>}
   */
  async listAdvertisements (token = undefined) {
    return await api.$get(`${baseUrl}`);
  },

  /**
   * Return the Advertisement identified by the supplied name value.
   *
   * @param name {string} 'en'
   * @return {Promise<any>}
   */
  async getAdvertisementWithName (name) {
    return await api.$get(`${baseUrl}/${encodeURIComponent(name)}`);
  },

  /**
   * Create a Advertisement.
   *
   * OperationId: CreateAdvertisement
   *
   * @param advertisementToCreate {{ name: string }}
   * @return {Promise<any>}
   */
  async createAdvertisement (advertisementToCreate) {
    return await api.$post(`${baseUrl}`, advertisementToCreate);
  },

  /**
   * Return the Advertisement with the specified advertisement id.
   *
   * @param advertisementId {string} 'ucas.en'
   * @return {Promise<any>}
   */
  async getAdvertisementWithAdvertisementId (advertisementId) {
    return await api.$get(`${baseUrl}/${encodeURIComponent(advertisementId)}`);
  },


})
