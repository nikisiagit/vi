/**
 * Venue App Admin Tickets Repository.
 */
const baseUrl = '/tickets';

export const ticketsRepository = (client) => ({

  /**
   * Return a list of the Tickets that belong to the Venue.
   *
   * OperationId: ListTickets
   *
   * @return {Promise<{tickets, token}>}
   */
  async listTickets() {
    const {tickets, token} = await client.$get(`${baseUrl}`);
    return {tickets, token};
  },

  /**
   * Return the Ticket with the specified ticket id.
   *
   * @param ticketId {string}
   * @return {Promise<any>}
   */
  async getTicketWithTicketId (ticketId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(ticketId)}`);
  },

  /**
   * Remove the Ticket with ticket id.
   *
   * @param ticketId
   * @returns {Promise<any>}
   */
  async removeTicketWithTicketId(ticketId) {
    return await client.$delete(`${baseUrl}/${encodeURIComponent(ticketId)}`);
  },

  /**
   * Create a Ticket.
   *
   * OperationId: CreateTicket
   *
   * @param ticketToCreate {{name: string}}
   * @return {Promise<any>}
   */
  async createTicket(ticketToCreate) {
    return await client.$post(`${baseUrl}`, ticketToCreate);
  }

});
