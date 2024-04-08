import {
  usersRepository,
  meRepository,
  venueRepository,
  chatsRepository,
  eventsRepository,
  languagesRepository,
  timezonesRepository,
  executionsRepository,
  intDailyRepository,
  searchRepository
} from './../protected'

/**
 *
 * @param client
 * @return {{venues}}
 */
const createApi = (client) => {
  return {
    venue: venueRepository(client),
    me: meRepository(client),
    languages: languagesRepository(client),
    chats: chatsRepository(client),
    timezones: timezonesRepository(client),
    events: eventsRepository(client),
    executions: executionsRepository(client),
    daily: intDailyRepository(client),
    users: usersRepository(client),
    search: searchRepository(client),
  }
}

export default createApi
