/**
 * Admin Api - Chats Repository.
 */

/**
 * @type {string}
 */
const baseUrl = '/chats';

/**
 * @param client {Axios}
 * @returns {{}}
 */
export const chatsRepository = (client) => ({
  /**
   * Return a ChatsList containing the Chats that belong to the Partition.
   *
   * OperationId: ListChats
   *
   * @returns {Promise<{chats, token}>}
   */
  async listChats () {
    const {chats, token} = await client.$get(`${baseUrl}`);
    return {chats, token};
  },

  /**
   * Create a new Chat.
   *
   * OperationId: CreateChat
   *
   * @param chatToCreate {{ title: {text: string, languageId: string}, description: {text: string, languageId: string},}}
   * @returns {Promise<any>}
   */
  async createChat (chatToCreate) {
    return await client.$post(`${baseUrl}`, chatToCreate);
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
    return await client.$get(`${baseUrl}/${encodeURIComponent(chatId)}`);
  },

  /**
   * Return a list of the ChatProfiles that belong to the specified Chat.
   *
   * This is a list of the Profiles that have joined the Chat.
   *
   * OperationId: ListChatProfilesWithChatId
   *
   * @param chatId {string}
   * @returns {Promise<*>}
   */
  async listChatProfilesWithChatId (chatId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(chatId)}/profiles`);
  },

  /**
   * Return a list of the ChatMessages that belong to the specified Chat.
   *
   * This is a list of the Messages that the Chat has sent/from it.
   *
   * OperationId: ListChatMessagesWithChatId
   *
   * @param chatId {string}
   * @returns {Promise<*>}
   */
  async listChatMessagesWithChatId (chatId) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(chatId)}/messages`);
  },

  /**
   * Remove the Chat with ticket id.
   *
   * @param ticketId
   * @returns {Promise<any>}
   */
  async removeChatWithChatId(ticketId) {
    return await client.$delete(`${baseUrl}/${encodeURIComponent(ticketId)}`);
  },
});
