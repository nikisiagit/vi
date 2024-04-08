/**
 * Admin - Events Store
 *
 */
export const state = () => ({
  /**
   * The Events in the store.
   */
  events: [

  ],

  /**
   * The CreatingEvent(s)
   */
  creatingEvents: [

  ],

  /**
   * The UpdatingEvent(s)
   */
  updatingEvents: [

  ],

  /**
   * The list of Event that are being/have been removed.
   */
  removingEvents: [],

  /**
   * The Events collection pagination token.
   */
  token: undefined,

  /**
   * The error state
   */
  error: undefined,

  /**
   * The loading state
   */
  loading: false,

  /**
   * The loaded state
   */
  loaded: false,




  eventErrors: '', // EventErrors => All errors that can be catch when performing operations like put/post/delete to an Event

  /**
   * WIP?
   */
  // meta values for when we are creating an Event.
  creating: {
    error: undefined,
    loading: false,
  },

  // the Events that we are currently creating.
  executions: [
    // {
    //   name, startDate, endDate, about, title, languageId, // @todo add languageId
    // }
  ],

  /**
   * New Events presentation (webinar,workshop,podcast..) type.
   * Array of object that contains all events
   * *PROPERTY eventType could contain any preset type or "custom"
   */
  // event: {
  //   presetId: '', // webinar, livestream, audio-space, networking, workshop
  //   name: '',
  //   title: '',
  //   subtitle: '', // OR accreditation
  //   description: '', // about
  //   descriptionLanguageId: '',
  //   bannerImg: null,
  //   startDate: '', // UTC format
  //   endDate: '', // UTC format or null
  //   timezoneId: '',
  //   languageIds: [],
  //   tags: [
  //     // { (Example Prototype)
  //     //   tagId: 'tag::hybrid' // @todo: Ask Damian
  //     // },
  //     // {
  //     //   tagId: 'tag::eventprofs'
  //     // },
  //     // {
  //     //   tagId: 'tag::webinar'
  //     // }
  //   ],
  //
  //   owners: [], //  Array of ProfileIds
  //   hostedBy: [], // Array of ProfileIds
  //   presenters: [], // Array of ProfileIds
  //   moderators: [], // Array of ProfileIds
  //   translators: [
  //     // {
  //     //   profileId: '',
  //     //   languageId: ''
  //     // }
  //   ],
  //
  //   presentersControls: {
  //     // (Example Prototype) proConfig: {
  //     //   enable_participants_audio: false, // bring participants on stage
  //     //   enable_offers: false,
  //     //   enable_polls: false,
  //     //   enable_handouts: false,
  //     //   enable_chat: false,
  //     //   enable_chat_moderation: false,
  //     // },
  //     // dailyConfig: {
  //     //   is_owner: false, // Means is owner of the room in which token will be created
  //     //   enable_screenshare: false,
  //     //   start_audio_off: false,
  //     //   start_video_off: false,
  //     //   enable_recording: null // - Options: "cloud","local","rtp-tracks","output-byte-stream","null". Default: null
  //     // },
  //   },
  //
  //   moderatorsControls: {},
  //
  //   translatorsControls: {},
  //
  //   participantsControls: {},
  //
  //   invitations: [
  //     // {
  //     //   name: 'Ben Harding',
  //     //   email: 'ben.harding@fresh-productions.com',
  //     //   role: 'presenter',
  //     // },
  //     // {
  //     //   name: 'John Harding',
  //     //   email: 'john.harding@fresh-productions.com',
  //     //   role: 'moderator',
  //     // }
  //   ],
  //
  //   tickets: [
  //     // {
  //     //   // eventId: '',
  //     //
  //     //   name: '',
  //     //   title: '',
  //     //   description: '',
  //     //   languageId: '',
  //     //
  //     //
  //     //   currencyCode: '',
  //     //
  //     //   price: 0,
  //     //   ticketType: 'free',
  //     //   saleable: true,
  //     //   saleStart: '',
  //     //   saleEnd: '',
  //     //   totalTickets: 200
  //     // }
  //   ],
  //
  //   theme: {
  //     light: {
  //       background: ''
  //     },
  //     dark: {
  //       background: ''
  //     },
  //     backgroundImage: null,
  //   },
  //
  //   area: {
  //     //   name: '', // i.e stage
  //     //   title: '',
  //     //   description: '',
  //     //   languageId: '',
  //     //   icon: '',
  //
  //
  //     // theme: {
  //     //   light: {
  //     //     background: ''
  //     //   },
  //     //   dark: {
  //     //     background: ''
  //     //   },
  //     //   backgroundImage: null,
  //     // },
  //
  //     components: [
  //       /**
  //        *  --- Components to be added ----
  //        * 1- Banner Branding Component (Area Header).
  //        * 2- Stage Component (daily call/panel).
  //        * (Prop: "section" can include: Header, Hero Section, Content/body Section, Sidebar Section, & Footer Section)
  //        */
  //       // {
  //       //   type: 'Banner', // (Text, Title, Spotlight, Stage)
  //       //   name: 'banner.title-logo or banner.text-logo', // branding
  //       //   section: 'header',
  //       //   data: { title: '', images: [] },
  //       //   theme: {
  //       //     dark: {},
  //       //     light: {}
  //       //   }
  //       // },
  //
  //       // {
  //       //   type: 'Stage', // (Text, Title, Spotlight, Stage)
  //       //   name: 'stage-prebuilt', // 'stage-prebuilt' | 'stage-custom'
  //       //   section: 'body',
  //       //   data: {},
  //       //   theme: {
  //       //     dark: {},
  //       //     light: {}
  //       //   }
  //       // }
  //     ],
  //   },
  //
  //   // @todo: Handle PERMISSIONS to interact components? (Something to ask to David, was designed but not implemented fully)
  // },

  /**
   * Define which controls will be displayed
   */
  uiPresetsControls: {
    // owner: {},
    moderator: {
      controls: [
        {
          label: 'Camera',

          prop: {
            name: 'enable_video',
            type: 'proConfig'
          }
        },
        {
          label: 'Microphone',

          prop: {
            name: 'enable_audio',
            type: 'proConfig'
          }
        },
        {
          label: 'Screen-sharing',

          prop: {
            name: 'enable_screenshare',
            type: 'dailyConfig'
          }
        },
        {
          label: 'Record Session',

          prop: {
            name: 'enable_recording',
            type: 'dailyConfig'
          }
        },
        {
          label: 'Bring Participants on Stage',

          prop: {
            name: 'enable_participants_audio',
            type: 'proConfig'
          }
        },
        {
          label: 'Add Offers',

          prop: {
            name: 'enable_offers',
            type: 'proConfig'
          }
        },
        {
          label: 'Live Chat',

          prop: {
            name: 'enable_chat',
            type: 'proConfig'
          }
        },
        {
          label: 'Chat Moderation',

          prop: {
            name: 'enable_chat_moderation',
            type: 'proConfig'
          }
        },
        {
          label: 'Add and Manage Polls',

          prop: {
            name: 'enable_polls',
            type: 'proConfig'
          }
        },
        {
          label: 'Add Handouts',

          prop: {
            name: 'enable_handouts',
            type: 'proConfig'
          }
        },
      ]
    },

    presenter: {
      controls: [
        {
          label: 'Camera',

          prop: {
            name: 'enable_video',
            type: 'proConfig'
          }
        },
        {
          label: 'Microphone',

          prop: {
            name: 'enable_audio',
            type: 'proConfig'
          }
        },
        {
          label: 'Screen-sharing',

          prop: {
            name: 'enable_screenshare',
            type: 'dailyConfig'
          }
        },
        {
          label: 'Record Session',

          prop: {
            name: 'enable_recording',
            type: 'dailyConfig'
          }
        },
        {
          label: 'Bring Participants on Stage',

          prop: {
            name: 'enable_participants_audio',
            type: 'proConfig'
          }
        },
        {
          label: 'Add Offers',

          prop: {
            name: 'enable_offers',
            type: 'proConfig'
          }
        },
        {
          label: 'Live Chat',

          prop: {
            name: 'enable_chat',
            type: 'proConfig'
          }
        },
        {
          label: 'Chat Moderation',

          prop: {
            name: 'enable_chat_moderation',
            type: 'proConfig'
          }
        },
        {
          label: 'Add and Manage Polls',

          prop: {
            name: 'enable_polls',
            type: 'proConfig'
          }
        },
        {
          label: 'Add Handouts',

          prop: {
            name: 'enable_handouts',
            type: 'proConfig'
          }
        },
      ]
    },

    participant: {
      controls: [
        {
          label: 'Voting',

          prop: {
            name: 'enable_polls',
            type: 'proConfig'
          }
        },
        {
          label: 'Ask Questions',

          prop: {
            name: 'enable_qna',
            type: 'proConfig'
          }
        },
        {
          label: 'Raise a Hand',

          prop: {
            name: 'enable_hand_raising',
            type: 'proConfig'
          }
        },
        {
          label: 'See Other Viewers',

          prop: {
            name: 'enable_people',
            type: 'proConfig'
          }
        },
        {
          label: 'Reactions',

          prop: {
            name: 'enable_reactions',
            type: 'proConfig'
          }
        },
        {
          label: 'Direct Message Presenters',

          prop: {
            name: 'enable_dm_presenters',
            type: 'proConfig'
          }
        },
        {
          label: 'Live Captions',

          prop: {
            name: 'enable_transcriptions',
            type: 'proConfig'
          }
        },
        {
          label: 'Live Chat',

          prop: {
            name: 'enable_chat',
            type: 'proConfig'
          }
        },
        {
          label: 'Access Offers',

          prop: {
            name: 'enable_offers',
            type: 'proConfig'
          }
        },
        {
          label: 'View Handouts',

          prop: {
            name: 'enable_handouts',
            type: 'proConfig'
          }
        },
      ]
    },

    translator: {
      controls: [
        {
          label: 'Camera',

          prop: {
            name: 'enable_video',
            type: 'proConfig'
          }
        },
        {
          label: 'Microphone',

          prop: {
            name: 'enable_audio',
            type: 'proConfig'
          }
        },
      ]
    }
  },

  /**
   * Tokens by role: Combination of Daily tokens config and Pro token config. Default Structure values.
   * All props are defined by DEFAULT. The UI can still change them unless property 'disabled' is true in uiPresetControls.
   */
  controlsToken: {
    owner: {
      proConfig: {
        is_host: true,
        // @todo: TBD with Nik

        enable_audio: true,
        enable_video: true,
      },
      dailyConfig: {
        is_owner: true, // Means is owner of the room in which token will be created
        enable_screenshare: true,

        enable_recording: 'cloud' // - Options: "cloud","local","rtp-tracks","output-byte-stream","null". Default: null
      },
    },

    presenter: {
      proConfig: {
        enable_participants_audio: false, // bring participants on stage
        enable_offers: false,
        enable_polls: false,
        enable_handouts: false,
        enable_chat: false,
        enable_chat_moderation: false,
        // enable_media: false, @todo: TBD with Nik

        enable_audio: true,
        enable_video: true,
      },
      dailyConfig: {
        is_owner: false, // Means is owner of the room in which token will be created
        enable_screenshare: true,

        enable_recording: null // - Options: "cloud","local","rtp-tracks","output-byte-stream","null". Default: null
      },
    },

    moderator: {
      proConfig: {
        enable_participants_audio: true, // bring participants on stage
        enable_offers: true,
        enable_polls: true,
        enable_handouts: true,
        enable_chat: true,
        enable_chat_moderation: true,
        // enable_media: false, @todo: TBD with Nik

        enable_audio: true,
        enable_video: true,
      },
      dailyConfig: {
        is_owner: false, // Means is owner of the room in which token will be created
        enable_screenshare: true,

        enable_recording: 'cloud' // - Options: "cloud","local","rtp-tracks","output-byte-stream","null". Default: null
      },
    },

    translator: {
      proConfig: {
        enable_audio: true,
        enable_video: true,
      },
      // dailyConfig: {
      //   enable_screenshare: false,
      // }
    },

    participant: {
      proConfig: {
        enable_polls: true, // if role is participant and enable_polls === true ? "voting"
        enable_qna: true,
        enable_hand_raising: true,
        enable_people: true, // or people in the call [participant list - see other participants]
        enable_reactions: true,
        enable_dm_presenters: true,
        enable_transcriptions: true, // liveCaptions
        enable_chat: true,
        enable_offers: true,
        enable_handouts: true,

        enable_audio: true,
        enable_video: true,
      },
      dailyConfig: {
        enable_screenshare: false,
      },

    }
  },

  /**
   * Event's Preset (webinar, livestream, audio-space, networking, workshop)
   */
  eventPresets: [
    {
      presetId: 'livestream',
      name: 'Livestream',
      description: 'Go big, or go home. Deliver a professional-grade stream to wow your audience.',
      text: 'Works great with audience up to 10,000',
      icon: 'mdi-video-input-antenna',
      enabled: false
    },
    {
      presetId: 'audio_space',
      name: 'Audio Space',
      description: 'The easiest way to choose a topic and chat about it with thousands from your audience.',
      text: 'Works great with audience up to 10,000',
      icon: 'mdi-podcast',
      enabled: false
    },
    {
      presetId: 'webinar',
      name: 'Webinar',
      description: 'Deliver a panel presentation or an interactive discussion with your audience.',
      text: 'Works great with audience up to 300',
      icon: 'mdi-laptop',
      enabled: true
    },
    {
      presetId: 'networking',
      name: 'Networking',
      description: 'Create a cozy (or sponsored) space and connect your audience in topical discussions.',
      text: 'Works great with audience up to 100',
      icon: 'mdi-account-group',
      enabled: false
    },
    {
      presetId: 'workshop',
      name: 'Workshop',
      description: 'Teach or learn from your audience in a structured workshop with breakout rooms.',
      text: 'Works great with audience up to 50',
      icon: 'mdi-book-education',
      enabled: false
    },
    {
      presetId: 'custom',
      name: 'Custom',
      description: 'You decide what this event means to you. Go wild.',
      text: 'Works great with audience up to ¯\\_(ツ)_/¯',
      icon: 'mdi-cog',
      enabled: false
    },
  ],

  /**
   * @NOT-IN-USE: This is an idea of who can we manipulate or create rules on top of different presets.
   * Just ignore for now.
   */
  eventPresetsConfiguration: {
    livestream: {},
    audioSpace: {},
    webinar: {
      hasOwner: true, // otherwise it could be a free space/event where people gather to chat/talk (i.e networking type)

      dailyConfig: {
        // All rooms are private and require a token to enter.
        requireMeetingToken: true,
        room: {
          // name: "", // @todo auto-generated or filled in after (matches event-name-slug?)
          privacy: 'private',
          properties: {
            enable_screenshare: false,
            start_audio_off: false,
            start_video_off: false
          }
        },
      }
    },
    networking: {},
    workshop: {},

    eventToCreate: undefined
  },

  defaultEvent: {

    // name: '',
    // createdAt: '',
    // createdBy: '',
    // lastModifiedAt: '',
    // format: ''

  }

})

export const mutations = {
  /**
   * Set the Events state.
   *
   * @param state
   * @param events
   */
  events(state, events) {
    state.events = events
  },

  /**
   * Add the Event to the store.
   *
   * @param state
   * @param event {{eventId: string, loaded: boolean, loading: boolean}}
   */
  event(state, event) {
    const index = state.events.findIndex(item => item.eventId === event.eventId);

    if (index > -1) {
      state.events.splice(
        index,
        1,
        Object.assign({}, state.events[index], event)
      );
    } else {
      state.events.push(event);
    }
  },

  creating(state, creating = undefined) {
    state.creating = creating;
  },

  executions(state, executions = []) {
    state.executions = executions;
  },

  execution(state, execution) {
    const index = state.executions.findIndex(item => item.executionArn === execution.executionArn);

    if (index > -1) {
      state.executions.splice(
        index,
        1,
        Object.assign({}, state.executions[index], execution)
      );
    } else {
      state.executions.push(execution);
    }
  },


  /**
   * Set the loading state.
   *
   * @param state
   * @param loading {boolean}
   */
  loading(state, loading = false) {
    state.loading = loading
  },

  loaded(state, loaded = false) {
    state.loaded = loaded;
  },

  error(state, error) {
    state.error = error
  },

  /**
   * Set the token state.
   *
   * @param state
   * @param token {string | undefined}
   */
  token(state, token) {
    state.token = token
  },


  /**
   * Add the Event to the event state.
   *
   * @param state
   * @param event {object}
   */
  addEvent(state, event) {
    state.events.push(event);
  },

  /**
   * Remove the Event from the events state.
   *
   * @param state
   * @param event
   */
  removeEvent(state, event) {
    const index = state.events.findIndex((item) => {
      return item.eventId === event.eventId
    })

    if (index > -1) {
      state.events.splice(index, 1)
    }
  },


  setEventErrors(state, errors) {
    state.eventErrors = errors
  },

  eventToCreate(state, eventToCreate) {
    state.eventToCreate = eventToCreate;
  },

  /**
   * Set the Events in the state.
   *
   * @param state
   * @param events []
   *
   */
  setEvents (state, events = []) {
    state.events = events || [];
  },

  /**
   * @param state
   * @param creatingEvents
   */
  setCreatingEvents (state, creatingEvents = []) {
    state.creatingEvents = creatingEvents || [];
  },

  /**
   * @param state
   * @param updatingEvents
   */
  setUpdatingEvents (state, updatingEvents = []) {
    state.updatingEvents = updatingEvents || [];
  },

  /**
   * @param state
   * @param removingEvents
   */
  setRemovingEvents (state, removingEvents = []) {
    state.removingEvents = removingEvents || [];
  },

  /**
   * Update the supplied Event.
   *
   * @param state
   * @param event {{ eventId: string}}
   */
  updateEvent (state, event) {
    const {eventId} = event;
    const index = state.events.findIndex(item =>  item.eventId === eventId);

    if (index < 0) {
      state.events.push(event);
    } else {
      state.events.splice(index, 1, {...state.events[index], ...event})
    }
  },

  /**
   * @param state
   * @param creatingEvent
   */
  updateCreatingEvent (state, creatingEvent) {
    const {executionArn} = creatingEvent;
    const index = state.creatingEvents.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.creatingEvents.push(creatingEvent);
    } else {
      state.creatingEvents.splice(index, 1, {
        ...state.creatingEvents[index],
        ...creatingEvent
      });
    }
  },

  /**
   * @param state
   * @param updatingEvent
   */
  updateUpdatingEvent (state, updatingEvent) {
    const {executionArn} = updatingEvent;
    const index = state.updatingEvents.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.updatingEvents.push(updatingEvent);
    } else {
      state.updatingEvents.splice(index, 1, {
        ...state.updatingEvents[index],
        ...updatingEvent
      });
    }
  },

  /**
   * @param state
   * @param removingEvent
   */
  updateRemovingEvent (state, removingEvent) {
    const {executionArn} = removingEvent;
    const index = state.removingEvents.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.removingEvents.push(removingEvent);
    } else {
      state.removingEvents.splice(index, 1, {
        ...state.removingEvents[index],
        ...removingEvent
      });
    }
  },


  /**
   * Add or update a removingEvent item.
   *
   * @param state
   * @param removingEvent {{name: string, email: string, creating: boolean, executionArn }}
   */
  removingEvent (state, removingEvent) {
    console.log("add removingEvent", removingEvent);

    const index = state.removingEvents.findIndex(item => item.executionArn === removingEvent.executionArn);

    if (index > -1) {
      state.removingEvents.splice(
        index, 1,
        Object.assign({}, state.removingEvents[index], removingEvent)
      )
    } else {
      state.removingEvents.push(removingEvent);
    }
  },

}

export const getters = {
  /**
   * Return the events state.
   *
   * @param state
   * @return {[]}
   */
  events: (state) => {
    return state.events || [];
  },

  /**
   * Return the number of Events.
   *
   * @param state
   * @return {number|number}
   */
  numberOfEvents: (state) => {
    return state.events.length || 0
  },

  // executions: (state) => {
  //   return state.executions || [];
  // },

  /**
   * Return the loading state.
   *
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading
  },

  loaded: (state) => {
    return state.loaded;
  },

  error: (state) => {
    return state.error || undefined;
  },

  /**
   * Return the Events identified by the supplied eventId.
   *
   * @param state
   * @param eventId {string}
   */
  eventWithEventId: (state) => (eventId) => {
    return state.events.find(event => {
      return event.eventId.toLowerCase() === eventId.toLowerCase()
    });
  },

  /**
   * Return the CreatingEvent identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingEventWithExecutionArn: (state) => (executionArn) => {
    return state.creatingEvents.find(creatingEvent => creatingEvent.executionArn === executionArn);
  },

  /**
   * Return the UpdateEvent identified with the specified executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  updatingEventWithExecutionArn: (state) => (executionArn) => {
    return state.updatingEvents.find(updatingEvent => updatingEvent.executionArn === executionArn);

  },

  /**
   * Return the RemovingEvent item identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  removingEventWithExecutionArn: (state) => (executionArn) => {
    return state.removingEvents.find(removingEvent => removingEvent.executionArn === executionArn);
  },





  eventErrors(state) {
    return state.eventErrors
  },

  eventPresets(state) {
    return state.eventPresets
  },

  eventUiPresetsControls(state) {
    return state.uiPresetsControls
  },

  controlsToken(state) {
    return state.controlsToken
  },
}

export const actions = {

  /**
   * @param commit
   * @return {Promise<void>}
   */
  async unload({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);

    commit('setEvents', []);
    commit('setCreatingEvents', []);
    commit('setUpdatingEvents', []);
    commit('setRemovingEvents', []);
  },

  /**
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the Events from the api.
   *
   * @param context
   */
  async load({commit}) {
    try {
      commit('loading', true);
      let {events, token} = await this.$api('admin').events.listEvents();

      events.map(event => commit('updateEvent',  {
        ...event,
        ...{
          error: undefined,
          loading: false,
          loaded: true
        }
      }));

      commit('token', token);
      commit('loaded', true);
    } catch (error) {
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  /**
   * Load the Event with the specified EventId.
   *
   * @param commit
   * @param eventId
   * @return {Promise<void>}
   */
  async loadEventWithEventId({commit}, eventId) {
    let event = {
      eventId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateEvent', event);
      event = await this.$api('admin').events.getEventWithEventId(eventId);

      event = {
        ...event,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateEvent', event);

    } catch (error) {
      const {message} = error;
      event = {
        ...event,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateEvent', event);
    }
  },

  /**
   * Create a Event.
   *
   * @param context
   * @param event {{ name: string, endDateTime: string, startDateTime: string}}
   * @return {Promise<unknown>}
   */
  async createEvent({commit, dispatch}, event) {
    const {name} = event;

    if (! name) {
      throw new Error (`name is required`);
    }

    let eventToCreate = {
      ...event,
      ...{
        error: undefined,
        creating: true,
      }
    };
    // commit('updateCreatingEvent', eventToCreate);

    try {
      let creatingEvent = await this.$api('admin').events.createEvent(event);
      const {executionArn, startDate} = creatingEvent;

      eventToCreate = {
        ...eventToCreate,
        ...creatingEvent,
      };
      commit('updateCreatingEvent', eventToCreate);

      // start the polling function...
      ((executionArn) => {

        const getExecution = async () => {
          eventToCreate = {
            ...eventToCreate,
            ...{
              loading: true,
            },
          };
          commit('updateCreatingEvent', eventToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          eventToCreate = {
            ...eventToCreate,
            ...{
              loading: false,
              status,
              stopDate,
            },
          };
          commit('updateCreatingEvent', eventToCreate);

          if (status === 'RUNNING') {
            console.log('## CREATE EVENT - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE EVENT - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE EVENT - SUCCEEDED');
            let {output} = execution;
            output = JSON.parse(output);

            let {error, event: createdEvent} = output;

            if (error) {
              eventToCreate = {
                ...eventToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingEvent', eventToCreate);
            }

            if (createdEvent) {
              eventToCreate = {
                ...eventToCreate,
                ...createdEvent,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingEvent', eventToCreate);

              createdEvent = {
                ...createdEvent,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateEvent', createdEvent);

            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return creatingEvent;

    } catch (error) {
      const { message } = error;

      eventToCreate = {
        ...eventToCreate,
        ...{
          error: message,
          creating: false,
          created: false,
        },
      };
      commit('updateCreatingEvent', eventToCreate);

      throw error;
    }
  },

  /**
   * Update the Event.
   *
   * @param commit
   *
   * @param updateEvent
   * @returns {Promise<*>}
   */
  async updateEvent ({commit}, updateEvent) {
    console.log(updateEvent);

    const {eventId} = updateEvent

    if (! eventId) {
      throw new Error(`eventId is required`);
    }

    // the update
    let update = {};

    const allowed = [
      'tagIds',
      'themeId',
      'languageId',
      'currencyId',
      'format',
      'addressId',
      'timezoneId',
      'startDateTime',
      'endDateTime',
    ];

    for (const name in updateEvent) {
      if (allowed.includes(name)) {
        update[name] = updateEvent[name];
      }
    }

    let eventUpdate = {
      eventId,
      update,
      updating: true,
      updated: false,
    }

    try {
      const updatingEvent = await this.$api('admin').events.updateEventWithEventId(eventId, update);
      const {executionArn} = updatingEvent;

      eventUpdate = {
        ...eventUpdate,
        ...updatingEvent,
      };
      commit('updateUpdatingEvent', eventUpdate);

      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {
          eventUpdate = {
            ...eventUpdate,
            ...{
              loading: true,
            }
          };
          commit('updateUpdatingEvent', eventUpdate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## UPDATE EVENT - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          eventUpdate = {
            ...eventUpdate,
            ...{
              loading: false,
              status,
              stopDate,
            }
          };
          commit('updateUpdatingEvent', eventUpdate);

          if (status === 'RUNNING') {
            console.log('## UPDATE EVENT - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## UPDATE EVENT - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## UPDATE EVENT - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, event: updatedEvent} = output;

            if (error) {
              eventUpdate = {
                ...eventUpdate,
                ...{
                  error,
                  updating: false,
                }
              };
              commit('updateUpdatingEvent', eventUpdate);
            }

            if (updatedEvent) {
              eventUpdate = {
                ...eventUpdate,
                ...{
                  updating: false,
                  updated: true,
                }
              };
              commit('updateUpdatingEvent', eventUpdate);

              /**
               ** Change/Mutate the specific Event in the store
               */
              commit('updateEvent', {
                ...updatedEvent,
                ...{
                  loaded: true,
                  loading: false,
                }
              });
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return updatingEvent;

    } catch (error) {
      const {message} = error;
      eventUpdate = {
        ...eventUpdate,
        ...{
          error: message,
          updating: false,
        }
      };
      commit('updateUpdatingEvent', eventUpdate);
      throw error;
    }
  },

  /**
   * Remove the Event.
   *
   * @param context
   * @param eventId
   * @returns {Promise<void>}
   */
  async removeEvent (context, eventId) {
    console.log(`## EVENT STORE - REMOVE-EVENT`);
    console.log(`## EVENT ID TO REMOVE`);

    try {
      const removingEvent = await this.$api('admin').events.removeEventWithEventId(eventId);
      const {executionArn} = removingEvent;

      context.commit('updateRemovingEvent',
        Object.assign({}, removingEvent, {
          removing: true,
        })
      );

      /**
       * The Polling function we will create to retrieve the status of the RemoveEvent request.
       *
       * @link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
       * @param removingEvent
       */
      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {

          context.commit('updateRemovingEvent',
            Object.assign({}, removingEvent, {
              loading: true,
            })
          );

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## REMOVING EVENT - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          context.commit('updateRemovingEvent',
            Object.assign({}, removingEvent, {
              loading: false,
              status,
              stopDate,
            })
          );

          if (status === 'RUNNING') {
            console.log('## REMOVING EVENT - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## REMOVING EVENT - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## REMOVING EVENT - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, event: removedEvent} = output;

            if (error) {

              context.commit('updateRemovingEvent',
                Object.assign({}, removingEvent, {
                  error,
                  removing: false,
                })
              );
            }

            if (removedEvent) {
              context.commit('updateRemovingEvent',
                Object.assign({}, removingEvent, {
                  removing: false,
                  removed: true,
                })
              );

              /**
               ** Remove the specific Event from the store
               */
              context.commit('removeEvent', removedEvent);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return removingEvent;

    } catch (error) {
      const {message} = error;

      context.commit('updateRemovingEvent', {
        ...{
          error: message,
          removing: false,
          removed: false
        }
      });
      throw error;
    }
  },
};
