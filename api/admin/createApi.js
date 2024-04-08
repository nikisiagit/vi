import {
  venueRepository,
  languagesRepository,
  advertisementsRepository,
  usersRepository,
  usersSettingsRepository,
  regionRepository,
  integrationsRepository,
  themesRepository,
  executionsRepository,
  resourcesRepository,
  eventsRepository,
  tagsRepository,
  ticketsRepository,
  addressesRepository,
  roomsRepository,
  contentsRepository,
  labelsRepository,
  chatsRepository,
  areasRepository,
  emailTemplatesRepository,
  emailSettingsRepository,
  emailIdentitiesRepository,
  componentsRepository,
  wafRepository,
  registrationsRepository
} from './../admin'

/**
 *
 * @param client
 * @return {{venues}}
 */
const createApi = (client) => {
  return {
    emailTemplates: emailTemplatesRepository(client),
    emailSettings: emailSettingsRepository(client),
    emailIdentities: emailIdentitiesRepository(client),
    venue: venueRepository(client),
    languages: languagesRepository(client),
    advertisements: advertisementsRepository(client),
    users: usersRepository(client),
    usersSettings: usersSettingsRepository(client),
    region: regionRepository(client),
    integrations: integrationsRepository(client),
    themes: themesRepository(client),
    executions: executionsRepository(client),
    resources: resourcesRepository(client),
    events: eventsRepository(client),
    tags: tagsRepository(client),
    tickets: ticketsRepository(client),
    addresses: addressesRepository(client),
    contents: contentsRepository(client),
    rooms: roomsRepository(client),
    labels: labelsRepository(client),
    chats: chatsRepository(client),
    areas: areasRepository(client),
    components: componentsRepository(client),
    waf: wafRepository(client),
    registrations: registrationsRepository(client),
  }
}

export default createApi
