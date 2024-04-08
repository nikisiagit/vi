/**
 * Venue Protected Chats Repository
 */

const baseUrl = '/chats';

export const chatsRepository = (client) => ({

  /**
   * Return a list of the Chats in the Venue/Partition.
   *
   * OperationId: ListChats
   *
   * @returns {Promise<any>}
   */
  async listChats () {
    return await client.$get(`${baseUrl}`);
  },

  /**
   * Return the Chat identified by the supplied ChatId.
   *
   * OperationId: GetChatWithChatId
   *
   * @param chatId {string}
   * @returns {Promise<any>}
   */
  async getChatWithChatId (chatId) {
    return await client.$get(`${baseUrl}/${chatId}`);
  },
});
