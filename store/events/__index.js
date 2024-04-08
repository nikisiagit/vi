/**
 * Events Store
 */
export const state = () => ({
  /**
   * The list of Events
   */
  events: [
    {
      "venue": "venue:demo-eventheads", //@todo: ignore is just for uniDemo stuff

      "addressId":null,
      "createdAt":"2022-10-27T12:33:16.724Z",
      "createdBy":"profile:demo:c3ce5d64-cf02-4ef3-ad7c-dd31fc9c01ed",
      "currencyId":"currency:gbp",
      "eventId":"event:demo:eventheads-gamification",
      "languageId":"language:demo:en",
      "lastModifiedAt":"2022-10-27T12:33:16.724Z",
      "name":"eventheads-gamification",
      "partition":"demo",
      "tagIds":[

      ],
      "timezoneId":"timezone:europe-london",
      "type":"event",

      theme: {
        dark: {
          primary: "#79D3CA",

        },
        light: {
          primary: "#79D3CA",
        }
      },

      /**
       * Area/Components I think should work generally reading from the source of truth (Entity/record in Dynamo).
       * As example the Area Exhibitors read from the record itself exhibit:demo:ivent-hq.
       * Any config added to the exhibit record will be readed and place in consideration for the rendering of the
       * Area/Components that should use based on rules applied. (chat: ON/OFF).
       *
       * Venue Admin Section should handle:
       * Enable Exhibitors Area: true/false
       * Enable Exhibitors Stage: true/false
       * Enable Exhibitors Schedule: true/false
       *
       * (** Example: IF Exhibitors EventArea is enabled then UI renders and allow any exhibit in the database as URL: /exhibitors/exhibit-id) (Read content/data from Exhibit record)
       *
       * Alternative they can use/enable custom areas. @todo: TBD
       */

      // EventDetails
      "titleId":"label:demo:event:demo:eventheads-gamification:title",
      "descriptionId":"label:demo:event:demo:eventheads-gamification:description",
      "startDateTime":"2023-01-28T10:30:00",
      "endDateTime":"2023-01-28T18:30:00",
      "format":"virtual",

      "totalRegistrations": 100,

      tickets: [
        {
          name: 'ticket:demo:event:demo:eventheads-gamification:full-access-free',
          titleId: '',
          title: 'Full Event Access + On Demand',
          descriptionId: '',
          description: 'All the goodies of the event, plus more after it’s finished.',
          price: 0,
          // ... currency + free/paid? @todo: to check current ticket schema in Admin API Tickets.
        },
      ],

      sponsors: [
        {
          name: 'sponsor:demo:ionic',
          text: 'ionic', // alt text for the image.. Also text could be used for tooltip in each image
          link: 'https://ionicframework.com/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/390/413/original/ionic-logo.svg?1631667534'
          },
        },

        {
          name: 'sponsor:demo:microsoft',
          text: 'microsoft', // alt text for the image..  Also text could be used for tooltip in each image
          link: 'https://www.microsoft.com/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/359/409/original/microsoft.svg?1627587361'
          },
        },

        {
          name: 'sponsor:demo:supabase',
          text: 'supabase', // alt text for the image..  Also text could be used for tooltip in each image
          link: 'https://supabase.io/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/441/477/original/supabase-logo-wordmark--light.svg?1637259187'
          },
        },

        {
          name: 'sponsor:demo:strapi',
          text: 'strapi', // alt text for the image..  Also text could be used for tooltip in each image
          link: 'https://strapi.io/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/359/704/original/PNG.logo.purple.dark.png?1627654132'
          },
        },

        {
          name: 'sponsor:demo:cloudinary',
          text: 'cloudinary', // alt text for the image..  Also text could be used for tooltip in each image
          link: 'https://cloudinary.rocks/fy8',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/359/408/original/cloudinary_logo_blue_0720_2x.png?1627587277'
          },
        }
      ],

      speakers: [
        { // profileId
          fullname: 'Theresa Sturm',
          headline: 'Co-Founder at Invision LTD',
          avatar: {
            image: 'https://cdn.hubilo.com/speaker/2116606/150/3025_7764_747756001636646162.png'
          },
          email: '',
          socialLinks: {
            website: '',
            twitter: '',
            facebook: '',
            linkedin: '',
          }
        },
        { // profileId
          fullname: 'Jenny Wilson',
          headline: 'UX Designer at Glassdoor',
          avatar: {
            image: 'https://silicon.createx.studio/assets/img/team/26.jpg'
          },
          email: '',
          socialLinks: {
            website: '',
            twitter: '',
            facebook: '',
            linkedin: '',
          }
        },
        { // profileId
          fullname: 'Jerome Bell',
          headline: 'Strategic Advisor at Shopify',
          avatar: {
            image: 'https://cdn.hubilo.com/speaker/2116606/150/1207_7616_896656001637156224.png'
          },
          email: '',
          socialLinks: {
            website: '',
            twitter: '',
            facebook: '',
            linkedin: '',
          }
        },
        { // profileId
          fullname: 'Marvin McKinney',
          headline: 'Product Manager at Google',
          avatar: {
            image: 'https://cdn.hubilo.com/speaker/2116606/150/1549_8254_024241001636454559.png'
          },
          email: '',
          socialLinks: {
            website: '',
            twitter: '',
            facebook: '',
            linkedin: '',
          }
        }
      ],
      exhibitors: [
        { // exhibit
          type: 'booth',
          exhibitorId: 'exhibitor:ivent', // exhibit:demo:ivent
          titleId: '',
          title: 'iVent HQ',
          name: 'ivent',
          description: '12 years, and counting. People that brought you virtual events and more.',
          descriptionId: '',
          email: '',
          // headline: '', // = short description
          tags: ["saas", "technology", "events"], // it should be an array of tagIds
          logo: require('~/assets/logo-ivent.png'),
          theme: {
            light: {
              primary: '#AAB6EB',
              background: 'https://ivent-hq.com/wp-content/themes/iVent/images/image-eventFormat-top-mob@2x.jpg', // this is an url of the image
              backgroundVideo: '' // url of the video
            },
            dark: {
              primary: '#AAB6EB',
              background: 'https://ivent-hq.com/wp-content/themes/iVent/images/image-eventFormat-top-mob@2x.jpg', // this is an url of the image
              backgroundVideo: '' // url of the video
            }
          },
          socialLinks: {
            website: '',
            twitter: '',
            facebook: '',
            linkedin: '',
          }
        },

        { // exhibit
          type: 'booth',
          exhibitId: 'exhibitor:noonah', // exhibit:demo:ivent
          titleId: '',
          title: 'Noonah',
          name: 'noonah',
          description: 'The best kind of engagement at your next event. Go Noonah 🚀',
          descriptionId: '',
          email: '',
          // headline: '', // = short description
          tags: ["saas", "technology", "events"], // it should be an array of tagIds
          logo: "data:image/jpeg;base64,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",
          theme: {
            light: {
              primary: '#3a3939',
              background: 'https://noonah.com/wp-content/uploads/2022/06/Top-3-Noonah-Technologies-for-your-Exhibition-Stand-feature-image-536x400.jpg', // this is an url of the image
              backgroundVideo: '' // url of the video
            },
            dark: {
              primary: '#3a3939',
              background: 'https://noonah.com/wp-content/uploads/2022/06/Top-3-Noonah-Technologies-for-your-Exhibition-Stand-feature-image-536x400.jpg', // this is an url of the image
              backgroundVideo: '' // url of the video
            }
          },
          socialLinks: {
            website: '',
            twitter: '',
            facebook: '',
            linkedin: '',
          }
        },
      ],
      schedule: [
        { // scheduleItem
          title: 'Product strategy: Defining your strategy, tactics, metrics & roadmap', // this could also come from the presentation title?.
          description: 'Find out when and where this lecture will happen. List of all dates, tasks and resources will be available in the presentation\'s detail',
          titleId: '',
          descriptionId: '',
          startDateTime: '2023-01-28T10:30:00',
          endDateTime: '2023-01-28T11:00:00',
          track: {
            colour: 'warning', //use hex colour
            title: 'Keynote',
            titleId: ''
          },
          itemType: 'stage', // stage, presentation, exhibit, networking, custom { link: {title, url} },
          stage: { stageId: 'stage-1'}, //  (state:demo:event:demo:eventheads:stage-1)
          areaId: "area:demo:event:demo:eventheads-gamification:stages", //areaId you can link to the schedule
          tags: [],
          speakers: [
            { // profileId
              fullname: 'Marvin McKinney',
              headline: 'Product Manager at Google',
              avatar: {
                image: 'https://cdn.hubilo.com/speaker/2116606/150/1549_8254_024241001636454559.png'
              },
              email: '',
              socialLinks: {
                website: '',
                twitter: '',
                facebook: '',
                linkedin: '',
              }
            }
          ],

          //@todo: bullshit stuff to figure it out differently
          isLive: false,
          status: 'join',
          stageId: 'stage-1',
        }
      ],
    },

    {
      "venue": "venue:demo-uni",

      "eventId":"event:demo:virtual-open-day",
      "lastModifiedAt":"2023-10-28T13:56:18.638Z",
      "tagIds": [

      ],

      "languageId":"language:demo:en",
      "type":"event",
      "addressId":null,
      "createdAt":"2022-10-28T13:56:18.638Z",
      "partition":"demo",
      "createdBy":"profile:demo:c3ce5d64-cf02-4ef3-ad7c-dd31fc9c01ed",
      "name":"event:demo:virtual-open-day",
      "timezoneId":"timezone:europe-london",
      "currencyId":"currency:gbp",

      theme: {
        dark: {
          primary: "#345783",

        },
        light: {
          primary: "#345783",
        }
      },

      // EventDetails
      "titleId":"label:demo:event:demo:virtual-open-day:title",
      "descriptionId":"label:demo:event:demo:virtual-open-day:description",
      "startDateTime":"2023-04-01T10:30:00",
      "endDateTime":"2023-04-01T16:00:00",
      "format":"virtual",

      "totalRegistrations": 300,

      tickets: [
        {
          name: 'ticket:demo:event:demo:supporting-student-workshop-2023:full-access-free',
          titleId: '',
          title: 'Full Event Access + On Demand',
          descriptionId: '',
          description: 'All the goodies of the event, plus more after it’s finished.',
          price: 0,
          // ... currency + free/paid? @todo: to check current ticket schema in Admin API Tickets.
        },
      ],

      sponsors: [
        {
          name: 'sponsor:demo:ionic',
          text: 'ionic', // alt text for the image..
          link: 'https://ionicframework.com/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/390/413/original/ionic-logo.svg?1631667534'
          },
        },

        {
          name: 'sponsor:demo:microsoft',
          text: 'microsoft', // alt text for the image..
          link: 'https://www.microsoft.com/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/359/409/original/microsoft.svg?1627587361'
          },
        },

        {
          name: 'sponsor:demo:supabase',
          text: 'supabase', // alt text for the image..
          link: 'https://supabase.io/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/441/477/original/supabase-logo-wordmark--light.svg?1637259187'
          },
        },

        {
          name: 'sponsor:demo:strapi',
          text: 'strapi', // alt text for the image..
          link: 'https://strapi.io/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/359/704/original/PNG.logo.purple.dark.png?1627654132'
          },
        },

        {
          name: 'sponsor:demo:cloudinary',
          text: 'cloudinary', // alt text for the image..
          link: 'https://cloudinary.rocks/fy8',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/359/408/original/cloudinary_logo_blue_0720_2x.png?1627587277'
          },
        }
      ]
    },

    {
      "venue": "venue:demo-uni",

      "eventId":"event:demo:supporting-student-workshop-2023",
      "lastModifiedAt":"2022-10-28T13:56:18.638Z",
      "tagIds":[

      ],

      "languageId":"language:demo:en",
      "type":"event",
      "addressId":null,
      "createdAt":"2022-10-28T13:56:18.638Z",
      "partition":"demo",
      "createdBy":"profile:demo:c3ce5d64-cf02-4ef3-ad7c-dd31fc9c01ed",
      "name":"event:demo:supporting-student-workshop-2023",
      "timezoneId":"timezone:europe-london",
      "currencyId":"currency:gbp",

      theme: {
        dark: {
          primary: "#345783",

        },
        light: {
          primary: "#345783",
        }
      },

      // EventDetails
      "titleId":"label:demo:event:demo:supporting-student-workshop-2023:title",
      "descriptionId":"label:demo:event:demo:supporting-student-workshop-2023:description",
      "startDateTime":"2023-01-12T09:30:00",
      "endDateTime":"2023-01-12T13:00:00",
      "format":"virtual",

      "totalRegistrations": 30,

      tickets: [
        {
          name: 'ticket:demo:event:demo:supporting-student-workshop-2023:full-access-free',
          titleId: '',
          title: 'Full Event Access + On Demand',
          descriptionId: '',
          description: 'All the goodies of the event, plus more after it’s finished.',
          price: 0,
          // ... currency + free/paid? @todo: to check current ticket schema in Admin API Tickets.
        },
      ],

      sponsors: [
        {
          name: 'sponsor:demo:ionic',
          text: 'ionic', // alt text for the image..
          link: 'https://ionicframework.com/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/390/413/original/ionic-logo.svg?1631667534'
          },
        },

        {
          name: 'sponsor:demo:microsoft',
          text: 'microsoft', // alt text for the image..
          link: 'https://www.microsoft.com/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/359/409/original/microsoft.svg?1627587361'
          },
        },

        {
          name: 'sponsor:demo:supabase',
          text: 'supabase', // alt text for the image..
          link: 'https://supabase.io/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/441/477/original/supabase-logo-wordmark--light.svg?1637259187'
          },
        },

        {
          name: 'sponsor:demo:strapi',
          text: 'strapi', // alt text for the image..
          link: 'https://strapi.io/',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/359/704/original/PNG.logo.purple.dark.png?1627654132'
          },
        },

        {
          name: 'sponsor:demo:cloudinary',
          text: 'cloudinary', // alt text for the image..
          link: 'https://cloudinary.rocks/fy8',
          image: {
            // resourceId: '',
            url: 'https://hopin.com/quiin/sponsors/logos/000/359/408/original/cloudinary_logo_blue_0720_2x.png?1627587277'
          },
        }
      ]
    },
  ],

  /**
   * Is this store loading
   */
  loading: false,

  /**
   * Is this store loaded?
   */
  loaded: false,

  /**
   * The last error seen by this store
   */
  error: undefined,

  /**
   * Is this store initialising?
   */
  initialising: false,

  /**
   * Has this store been initialised
   */
  initialised: false,

  /**
   * Which mode is this store in?
   *
   * public | protected
   */
  mode: 'public', // protected
});

export const mutations = {

  /**
   * Set the mode of this store.
   *
   * @param state
   * @param mode {string}
   */
  setMode (state, mode = 'public') {
    state.mode = mode;
  },

  /**
   * Set the Events to whatever is supplied.
   *
   * @param state
   * @param events []
   */
  setEvents (state, events = []) {
    state.events = events;
  },

  /**
   * Set the supplied Event.
   *
   * @param state
   * @param event {{eventId: string}}
   */
  setEvent (state, event) {
    const {eventId} = event;
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index < 0) {
      state.events.push(event);
    } else {
      state.events.splice(index, 1, event);
    }
  },

  /**
   * @param state
   * @param event
   */
  updateEvent (state, event) {
    const {eventId} = event;
    const index = state.events.findIndex(item => item.eventId === eventId);

    state.events.splice(
      index,
      1,
      {
        ...state.events[index],
        ...event
      }
    );
  },

  /**
   * Set the initialised state.
   *
   * @param state
   * @param initialised {boolean}
   */
  setInitialised(state, initialised = false) {
    state.initialised = initialised;
  },

  /**
   * Set the initialising state.
   *
   * @param state
   * @param initialising {boolean}
   */
  setInitialising(state, initialising = false) {
    state.initialising = initialising;
  },

  /**
   * Set the loading state.
   *
   * @param state
   * @param loading {boolean}
   */
  setLoading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * Set the loaded state.
   *
   * @param state
   * @param loaded {boolean}
   */
  setLoaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * Set the error state.
   *
   * @param state
   * @param error
   */
  setError (state, error = undefined) {
    state.error = error;
  },

  /**
   * Set the token state.
   *
   * @param state
   * @param token {string|undefined}
   */
  setToken (state, token = undefined) {
    state.token = token;
  },
}

export const getters = {
  /**
   * Return the list of Events.
   *
   * @param state
   * @returns {[]|*[]}
   */
  events: (state) => {
    return state.events || [];
  },

  /**
   * Return the Event identified by the specified EventId.
   *
   * @param state
   * @returns {function(*): *}
   */
  eventWithEventId: (state) => (eventId) => {
    return state.events.find(item => item.eventId === eventId);
  },

  /**
   * @param state
   * @returns {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * @param state
   * @returns {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  initialised: (state) => {
    return state.initialised || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  initialising: (state) => {
    return state.initialising || false;
  },

  /**
   * Return the store mode.
   *
   * @param state
   * @returns {string|undefined}
   */
  mode: (state) => {
    return state.mode || undefined;
  },
}

export const actions = {

  /**
   * Initialise the Events store.
   *
   * @param commit
   * @param getters
   * @param dispatch
   * @param mode {string}
   * @returns {Promise<void>}
   */
  async initialise ({commit, getters, dispatch}, mode = 'public') {
    console.log(`## EVENTS STORE - INITIALISE - ${mode}`);

    const currentInitialised = getters['initialised'];
    const currentMode = getters['mode'];

    if (currentInitialised && mode === currentMode) {
      return;
    }

    if (currentInitialised) {
      await dispatch('unload');
      await commit('setInitialised', false);
      await commit('setInitialising', false);
    }

    commit('setInitialised', false);
    commit('setInitialising', true);
    commit('setMode', mode);

    // this.$socket().addListener('events', (type, subtype, message) => {
    //   switch (subtype) {
    //     default:
    //       console.log(`## EVENTS STORE - EVENT ${subtype} NOT RECOGNISED`);
    //   }
    // });

    // await this.$socket().subscribe('events');

    commit('setInitialising', false);
    commit('setInitialised', true);
  },

  /**
   * Unload the store of all state.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async unload ({commit}) {
    commit('setLoading', false);
    commit('setLoaded', false);
    commit('setEvents', []);
    commit('setError', undefined);
  },

  /**
   * Reload the Store.
   *
   * @param dispatch
   * @returns {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the store with a list of Events.
   *
   * @param commit
   * @param getters
   * @returns {Promise<void>}
   */
  async load ({commit, getters}) {
    const mode = getters['mode'];
    console.log(`## EVENTS STORE - LOAD - ${mode}`);

    try {
      commit('setLoading', true);
      commit('setLoaded', false);

      const {events, token} = await this.$api(mode).events.listEvents();

      events.map(event => commit('setEvent', {
        ...event,
        ...{
          loaded: true,
          loading: false,
        }
      }));
      commit('setToken', token);
      commit('setLoaded', true);

    } catch (error) {
      console.log(error);
      commit('setError', error);
      commit('setLoaded', false);
    } finally {
      commit('setLoading', false);
    }
  },

  /**
   * Load the Event identified by the supplied EventId.
   *
   * @param commit
   * @param eventId {string}
   * @returns {Promise<void>}
   */
  async loadEventWithEventId({commit, getters}, eventId) {
    const mode = getters['mode'];
    console.log(`## EVENTS STORE - LOAD EVENT WITH EVENT ID - ${mode}`);

    let eventToLoad = {
      eventId,
      loading: true,
      loaded: false,
    };
    commit('setEvent', eventToLoad);

    try {
      let event = await this.$api(mode).events.getEventWithEventId(eventId);
      // console.log(event);

      eventToLoad = {
        ...eventToLoad,
        ...event,
        ...{
          loaded: true,
          loading: false,
        }
      };

      console.log(eventToLoad);

      commit('updateEvent', eventToLoad);

    } catch (error) {
      const {message} = error;
      eventToLoad = {
        ...eventToLoad,
        ...{
          error: message,
          loaded: false,
          loading: false,
        }
      };
      commit('updateEvent', eventToLoad);
    }
  },
};
