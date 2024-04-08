/**
 * Venue App Admin Addresses Repository.
 */
const baseUrl = '/addresses';

export const addressesRepository = (client) => ({

  /**
   * Return a list of the Addresses that belong to the Venue.
   *
   * OperationId: ListAddresses
   *
   * @return {Promise<{tags, token}>}
   */
  async listAddresses () {
    const {addresses, token} = await client.$get(`${baseUrl}`);
    return {addresses, token};
  },

  /**
   * Create an Address.
   *
   * OperationId: CreateAddress
   *
   * @param addressToCreate {{name: string}}
   * @return {Promise<any>}
   */
  async createAddress (addressToCreate) {
    return await client.$post(`${baseUrl}`, addressToCreate);
  },

  /**
   * Return the Address with the specified AddressId.
   *
   * OperationId: GetAddressWithAddressId
   *
   * @return {Promise<void>}
   */
  async getAddressWithAddressId (addressId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(addressId)}`);
  },

});
