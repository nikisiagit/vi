import axios from "axios";

const baseUrl = 'https://api.daily.co/v1/';
const roomUrl = '/rooms';
const meetingsUrl = '/meetings';
const meetingTokensUrl = '/meeting-tokens';

// daily axios
const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Authorization': `Bearer bfa5c70ded6f2d7d93c3e32561cd5e83db4b540196da2799abe1bc4768f1c6c4`
  }
})


export const intDailyRepository = () => ({
  /**
   * Ref: https://docs.daily.co/reference/rest-api/your-domain/set-domain-config
   * @returns {Promise<any>}
   */
  enableTranscription () {
    return api.post(baseUrl, JSON.stringify({
      properties: {
        enable_transcription: "deepgram:e80f78ef148e19874494e58d7d0a9579af7628b6"
      }
    }));
  },

  /**
   * Ref: https://docs.daily.co/reference#create-room
   * @param options
   * @returns {Promise<any>}
   */
  createRoom (options) {
    return api.post(roomUrl, JSON.stringify(options));
  },

  /**
   * Ref: https://docs.daily.co/reference/rest-api/rooms/list-rooms
   * @param limit
   * @param starting_after
   * @param ending_before
   * @returns {Promise<any>}
   */
  listRooms (limit = 50, starting_after = '', ending_before = '') {
    const queryParams = `?limit=${limit}`
    return api.get(`${roomUrl}${queryParams}`);
  },

  /**
   * Ref: https://docs.daily.co/reference/rest-api/meetings/get-meeting-information
   * @param room
   * @param timeframe_start
   * @param timeframe_end
   * @param limit
   * @param starting_after
   * @param ending_before
   * @returns {Promise<any>}
   */
  listMeetings (room, timeframe_start = 0, timeframe_end = 0, limit = 50, starting_after = '', ending_before = '') {
    const queryParams = `?room=${room}`
    return api.get(`${meetingsUrl}${queryParams}`);
  },

  /**
   * Ref: https://docs.daily.co/reference/rest-api/meeting-tokens/create-meeting-token
   * @param options
   * @returns {Promise<any>}
   */
  createMeetingToken (options) {
    return api.post(meetingTokensUrl, JSON.stringify(options));
  },

});
