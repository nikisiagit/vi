import {
  venueRepository,
  stripeRepository,
  regionsRepository,
  licencesRepository,
  eventsRepository,
  chatsRepository,
  languagesRepository,
  areasRepository,
  i18nRepository,
  themesRepository,
  roomsRepository
} from './../public'

/**
 * @param client
 * @returns {{venue: {getVenue(): Promise<*>}, regions: {listRegions(): Promise<*>}, stripe: {postPaymentIntent(*): Promise<*>}, licences: {listLicences(): Promise<*>}}}
 */
const createApi = (client) => {
  return {
    venue: venueRepository(client),
    stripe: stripeRepository(client),
    regions: regionsRepository(client),
    licences: licencesRepository(client),
    events: eventsRepository(client),
    chats: chatsRepository(client),
    languages: languagesRepository(client),
    areas: areasRepository(client),
    i18n: i18nRepository(client),
    themes: themesRepository(client),
    rooms: roomsRepository(client),
  }
}

export default createApi
