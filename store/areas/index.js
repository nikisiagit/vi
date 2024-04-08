/**
 * Areas Store.
 */
export const state = () => ({
  /**
   * Which mode is this store in?
   *
   * public | protected
   */
  mode: 'public', // protected

  /**
   * Is this store initialising?
   */
  initialising: false,

  /**
   * Has this store been initialised?
   */
  initialised: false,

  /**
   * Areas in the Venue
   */
  areas: [],

  /**
   * Has the Areas store been loaded?
   */
  loaded: false,

  /**
   * Is the Areas store loading?
   */
  loading: false,

  /**
   * The last error seen by this store.
   */
  error: undefined,
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
   * Set the Areas to whatever is supplied.
   *
   * @param state
   * @param areas
   */
  setAreas (state, areas  = []) {
    state.areas = areas;
  },

  /**
   * Update the supplied Area.
   *
   * @param state
   * @param area {{ areaId: string}}
   */
  updateArea (state, area) {
    const {areaId} = area;
    const index = state.areas.findIndex(item =>  item.areaId === areaId);

    if (index < 0) {
      state.areas.push(area);
    } else {
      state.areas.splice(index, 1, {...state.areas[index], ...area})
    }
  },

  /**
   * Set the initialising value.
   *
   * @param state
   * @param initialising {boolean}
   */
  setInitialising (state, initialising = false) {
    state.initialising = initialising;
  },

  /**
   * Set the initialised value.
   *
   * @param state
   * @param initialised {boolean}
   */
  setInitialised (state, initialised = false) {
    state.initialised = initialised;
  },

  /**
   * Set the loading value.
   *
   * @param state
   * @param loading {boolean}
   */
  setLoading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * Set the loaded value.
   *
   * @param state
   * @param loaded {boolean}
   */
  setLoaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * Set the last error.
   *
   * @param state
   * @param error {undefined}
   */
  setError (state, error = undefined) {
    state.error = error;
  },
}

export const getters = {
  /**
   * Return the Areas List.
   *
   * @param state
   * @return {undefined}
   */
  areas: (state) => {
    return state.areas || undefined;
  },

  numberOfAreas: (state) => {
    return state.areas.length || 0;
  },

  areaWithAreaId: (state) => (areaId) => {
    return state.areas.find(area => area.areaId === areaId);
  },

  componentsWithAreaId: (state) => (areaId) => {
    return state.areas.find(area => area.areaId === areaId)?.components;
  },

  /**
   * Return the List of Components associated with an AreaId.
   *
   * @param state
   * @return {function(string, string): []}
   */
  componentWithAreaIdAndComponentType: (state) => (areaId, componentType) => {
    let componentWithComponentType = null;

    const area = state.areas.find(area => area.areaId === areaId)
    if (! area) return componentWithComponentType

    if (area?.components) {
      componentWithComponentType = area.components.find(component => component.componentType === componentType)
    }

    return componentWithComponentType;
  },

  /**
   * Return the initialising value.
   *
   * @param state
   * @returns {boolean}
   */
  initialising: (state) => {
    return state.initialising || false;
  },

  /**
   * Return the initialise value.
   *
   * @param state
   * @returns {boolean}
   */
  initialised: (state) => {
    return state.initialised || false;
  },

  /**
   * Return the loading value.
   *
   * @param state
   * @returns {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Get the loaded value.
   *
   * @param state
   * @returns {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Return the last error seen by this store.
   *
   * @param state
   * @returns {undefined}
   */
  error: (state) => {
    return state.error || undefined;
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
   * Initialise the Store.
   *
   * The store can be initialised as `public` or `protected`.
   *
   * Initialise is akin to `starting up` the store.
   *
   * @param commit
   * @param getters
   * @param dispatch
   * @param mode {string}
   * @return {Promise<void>}
   */
  async initialise ({commit, getters, dispatch}, mode = 'public') {
    console.log(`## AREAS STORE - INITIALISE - ${mode}`);

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

    commit('setInitialising', true);
    commit('setMode', mode);

    // this.subscribe(async(mutation) => {
    //   if (mutation.type === 'sockets/socket') {
    //     const {payload} = mutation;
    //     const {name, state} = payload;
    //
    //     if (name === mode) {
    //       if (state === 'open') {
    //         console.log(`## AREAS STORE - ${mode} SOCKET HAS OPENED`);
    //
    //         await this.$socket(mode).subscribe('venue');
    //
    //         await this.$socket(mode).addListener('venue', (type, subtype, message) => {
    //           switch (subtype) {
    //             default:
    //               console.log(`## AREAS STORE - EVENT ${subtype} NOT RECOGNISED`);
    //           }
    //         });
    //       }
    //
    //       if (state === 'close') {
    //         console.log(`## AREAS STORE - ${mode} SOCKET HAS CLOSED`);
    //       }
    //     }
    //   }
    // });

    commit('setInitialising', false);
    commit('setInitialised', true);
  },

  /**
   * Unload all state/data from the store.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async unload ({commit}) {
    commit('setLoading', false);
    commit('setLoaded', false);
    commit('setAreas', []);
    commit('setError', undefined);
  },

  /**
   * Reload the store.
   *
   * @param commit
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({commit, dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the Store.
   *
   * This function will load the Areas.
   *
   * @param commit
   * @param getters
   * @return {Promise<void>}
   */
  async load ({commit, getters}) {
    console.log(`## AREAS STORE - LOAD`);

    const mode = getters['mode'];
    console.log(`## AREAS STORE - MODE ${mode}`);

    try {
      commit('setLoading', true);
      commit('setLoaded', false);

      const {areas} = await this.$api(mode).areas.listAreas();

      areas.map(area => commit('updateArea',  {
        ...area,
        ...{
          error: undefined,
          loading: false,
          loaded: true
        }
      }));

      commit('setAreas', areas);
      commit('setLoaded', true);
    } catch (error) {
      commit('setError', error);
      commit('setLoaded', false);
    } finally {
      commit('setLoading', false);
    }
  },

  async loadAreaWithAreaId ({commit, getters}, areaId) {
    let areaToLoad = {
      areaId,
      loading: true,
      loaded: false,
    };

    try {
      const mode = getters['mode'];

      commit('updateArea', areaToLoad);

      let area;
      if (areaId === 'area:demo:event:demo:eventheads-gamification:landing') {

        area = {
          areaId: "area:demo:event:demo:eventheads-gamification:landing",
          name: "area:demo:event:demo:eventheads-gamification:landing",
          eventId: "event:demo:eventheads-gamification",
          partition: "demo",
          type: "area",
        }
        // {
        //   areaId: "area:demo:event:demo:eventheads-gamification:landing",
        //   chatId: "chat:demo:123",
        //   componentId: "component:activity:chat",
        //   componentType: "activity:chat",
        //   eventId: "event:demo:eventheads-gamification",
        //   name: "activity:chat",
        //   partition: "demo",
        //   type: "component",
        // }

      }

      else if (areaId === 'area:demo:event:demo:virtual-open-day:landing') {

        area = {
          areaId: "area:demo:event:demo:virtual-open-day:landing",
          name: "area:demo:event:demo:virtual-open-day:landing",
          eventId: "event:demo:virtual-open-day",
          partition: "demo",
          type: "area",
        }

      }

      else {
        area = await this.$api(mode).areas.getAreaWithAreaId(areaId);
      }

      areaToLoad = {
        ...area,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateArea', areaToLoad);

    } catch (error) {
      const {message} = error;
      areaToLoad = {
        ...areaToLoad,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateArea', areaToLoad);
    }
  },

  async loadComponentsWithAreaId ({commit, getters}, areaId) {
    let areaToLoad = {
      areaId,
      componentsLoading: true,
      componentsLoaded: false
    };

    try {
      commit('updateArea', areaToLoad);

      // find area with areaId in the store
      const area = getters.areaWithAreaId(areaId)
      const mode = getters['mode'];
      let components;

      /**
       * ! Mock data
       */
      if (areaId === 'area:demo: event:demo:eventheads-gamification:landing') {
        components = [
          {
            areaId: "area:demo:event:demo:eventheads-gamification:landing",
            componentId: "component:header",
            componentType: "header",
            name: "header",
            partition: "demo",
            resourceId: "resource:demo:component:eventheads-header",
            eventId: "event:demo:eventheads-gamification",
            type: "component",

            heading: {
              titleId: null, //@todo this is the title of the card component
              showTitle: false,
              showDescription: false,
              descriptionId: null, //@todo this is the description of the card component
            }

          },
          {
            areaId: "area:demo:event:demo:eventheads-gamification:landing",
            componentId: "component:event-details",
            componentType: "event-details",
            name: "event-details",
            partition: "demo",
            eventId: "event:demo:eventheads-gamification",
            type: "component",

            heading: {
              titleId: null,
              showTitle: false,
              showDescription: false,
              descriptionId: null,
            }
            //... will read/retrieve information from the event data.
          },
          {
            areaId: "area:demo: event:demo:eventheads-gamification:landing",
            componentId: "component:countdown",
            componentType: "countdown",
            name: "countdown",
            partition: "demo",
            eventId: "event:demo:eventheads-gamification",
            type: "component",

            heading: {
              titleId: null,
              showTitle: false,
              showDescription: false,
              descriptionId: null,
            }
            //... will read/retrieve information from the event data.
          },

          {
            areaId: "area:demo: event:demo:eventheads-gamification:landing",
            componentId: "component:event-tabs",
            componentType: "event-tabs",
            name: "event-tabs",
            partition: "demo",
            eventId: "event:demo:eventheads-gamification",
            type: "component",

            heading: {
              titleId: null,
              showTitle: false,
              showDescription: false,
              descriptionId: null,
            },
            tabItems: [
              "component:text",
              "component:schedule-list",
              "component:sponsors-list",
              "component:speakers-list",
              "component:exhibitors-list",

              "component:registration-tickets",
            ], // Array of componentIds
          },

          {
            areaId: "area:demo:event:demo:eventheads-gamification:landing",
            componentId: "component:text",
            componentType: "text",
            name: "text",
            partition: "demo",
            eventId: "event:demo:eventheads-gamification",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:eventheads-gamification:landing:component:text:title',
              showTitle: false,
              showDescription: false,
              descriptionId: null,
            }
          },

          {
            areaId: "area:demo:event:demo:eventheads-gamification:landing",
            componentId: "component:sponsors-list",
            componentType: "sponsors-list",
            name: "sponsors-list",
            partition: "demo",
            eventId: "event:demo:eventheads-gamification",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:eventheads-gamification:landing:component:sponsors-list:title', //@todo this is the title of the card component
              showTitle: true,
              showDescription: false,
              descriptionId: null, //@todo this is the description/text of the card component
            }
          },
          {
            areaId: "area:demo:event:demo:eventheads-gamification:landing",
            componentId: "component:speakers-list",
            componentType: "speakers-list",
            name: "speakers-list",
            partition: "demo",
            eventId: "event:demo:eventheads-gamification",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:eventheads-gamification:landing:component:speakers-list:title', //@todo this is the title of the card component
              showTitle: true,
              showDescription: false,
              descriptionId: null, //@todo this is the description/text of the card component
            }
          },
          {
            areaId: "area:demo:event:demo:eventheads-gamification:landing",
            componentId: "component:exhibitors-list",
            componentType: "exhibitors-list",
            name: "exhibitors-list",
            partition: "demo",
            eventId: "event:demo:eventheads-gamification",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:eventheads-gamification:landing:component:exhibitors-list:title', //@todo this is the title of the card component
              showTitle: true,
              showDescription: false,
              descriptionId: null, //@todo this is the description/text of the card component
            }
          },
          {
            areaId: "area:demo:event:demo:eventheads-gamification:landing",
            componentId: "component:schedule-list",
            componentType: "schedule-list",
            name: "schedule-list",
            partition: "demo",
            eventId: "event:demo:eventheads-gamification",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:eventheads-gamification:landing:component:schedule-list:title', //@todo this is the title of the card component
              showTitle: true,
              showDescription: false,
              descriptionId: null, //@todo this is the description/text of the card component
            }
          },



          {
            areaId: "area:demo:event:demo:eventheads-gamification:landing",
            componentId: "component:registration-tickets",
            componentType: "registration-tickets",
            name: "registration-tickets",
            partition: "demo",
            eventId: "event:demo:eventheads-gamification",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:eventheads-gamification:landing:component:registration-tickets:title',
              showTitle: true,
              showDescription: false,
              descriptionId: null,
            }
          },


        ]
      }

      else if (areaId === 'area:demo:event:demo:virtual-open-day:landing') {
        components = [
          {
            areaId: "area:demo:event:demo:virtual-open-day:landing",
            componentId: "component:header",
            componentType: "header",
            name: "header",
            partition: "demo",
            resourceId: "resource:demo:component:uni-london-header",
            eventId: "event:demo:virtual-open-day",
            type: "component",

            heading: {
              titleId: null,
              showTitle: false,
              showDescription: false,
              descriptionId: null,
            }

          },
          {
            areaId: "area:demo:event:demo:virtual-open-day:landing",
            componentId: "component:event-details",
            componentType: "event-details",
            name: "event-details",
            partition: "demo",
            eventId: "event:demo:virtual-open-day",
            type: "component",

            heading: {
              titleId: null,
              showTitle: false,
              showDescription: false,
              descriptionId: null,
            }
            //... will read/retrieve information from the event data.
          },
          {
            areaId: "area:demo:event:demo:virtual-open-day:landing",
            componentId: "component:countdown",
            componentType: "countdown",
            name: "countdown",
            partition: "demo",
            eventId: "event:demo:virtual-open-day",
            type: "component",

            heading: {
              titleId: null,
              showTitle: false,
              showDescription: false,
              descriptionId: null,
            }
            //... will read/retrieve information from the event data.
          },

          {
            areaId: "area:demo:event:demo:virtual-open-day:landing",
            componentId: "component:event-tabs",
            componentType: "event-tabs",
            name: "event-tabs",
            partition: "demo",
            eventId: "event:demo:virtual-open-day",
            type: "component",

            heading: {
              titleId: null,
              showTitle: false,
              showDescription: false,
              descriptionId: null,
            },
            tabItems: [
              "component:text",
              "component:schedule-list",
              "component:sponsors-list",
              "component:speakers-list",
              "component:exhibitors-list",

              "component:registration-tickets",
            ], // Array of componentIds

          },

          {
            areaId: "area:demo:event:demo:virtual-open-day:landing",
            componentId: "component:text",
            componentType: "text",
            name: "text",
            partition: "demo",
            eventId: "event:demo:virtual-open-day",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:virtual-open-day:landing:component:text:title',
              showTitle: false,
              showDescription: false,
              descriptionId: null,
            }
          },

          {
            areaId: "area:demo:event:demo:virtual-open-day:landing",
            componentId: "component:sponsors-list",
            componentType: "sponsors-list",
            name: "sponsors-list",
            partition: "demo",
            eventId: "event:demo:virtual-open-day",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:virtual-open-day:landing:component:sponsors-list:title', //@todo this is the title of the card component
              showTitle: true,
              showDescription: false,
              descriptionId: null, //@todo this is the description/text of the card component
            }
          },
          {
            areaId: "area:demo:event:demo:virtual-open-day:landing",
            componentId: "component:speakers-list",
            componentType: "speakers-list",
            name: "speakers-list",
            partition: "demo",
            eventId: "event:demo:virtual-open-day",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:virtual-open-day:landing:component:speakers-list:title', //@todo this is the title of the card component
              showTitle: true,
              showDescription: false,
              descriptionId: null, //@todo this is the description/text of the card component
            }
          },
          {
            areaId: "area:demo:event:demo:virtual-open-day:landing",
            componentId: "component:exhibitors-list",
            componentType: "exhibitors-list",
            name: "exhibitors-list",
            partition: "demo",
            eventId: "event:demo:virtual-open-day",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:virtual-open-day:landing:component:exhibitors-list:title', //@todo this is the title of the card component
              showTitle: true,
              showDescription: false,
              descriptionId: null, //@todo this is the description/text of the card component
            }
          },
          {
            areaId: "area:demo:event:demo:virtual-open-day:landing",
            componentId: "component:schedule-list",
            componentType: "schedule-list",
            name: "schedule-list",
            partition: "demo",
            eventId: "event:demo:virtual-open-day",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:virtual-open-day:landing:component:schedule-list:title', //@todo this is the title of the card component
              showTitle: true,
              showDescription: false,
              descriptionId: null, //@todo this is the description/text of the card component
            }
          },


          {
            areaId: "area:demo:event:demo:virtual-open-day:landing",
            componentId: "component:registration-tickets",
            componentType: "registration-tickets",
            name: "registration-tickets",
            partition: "demo",
            eventId: "event:demo:virtual-open-day",
            type: "component",

            heading: {
              titleId: 'label:demo:area:demo:event:demo:virtual-open-day:landing:component:registration-tickets:title',
              showTitle: true,
              showDescription: false,
              descriptionId: null,
            }
          },

        ]
      }

      else {
        const {components: componentsResult} = await this.$api(mode).areas.listComponentsWithAreaId(areaId);
        components = componentsResult
      }



      // iterate each component to add properties (error, loading, loaded AND order/priority)
      area.components = components.map((component, pos, listComponents) => {
        let order;
        if (component.componentType === 'header') {
          order = 1
        }

        /** !!
         * @todo: this need refactoring into 'text' component
         */
        if (component.componentType === 'about') {
          order = 2
        }

        if (component.componentType === 'advertisement') {
          order = 3
        }

        if (component.componentType === 'events-list') {
          order = 4
        }

        return {
          ...component,
          ...{
            error: undefined,
            loading: false,
            loaded: true,
            order
          }
        }
      });

      areaToLoad = {
        ...area,
        ...{
          componentsLoading: false,
          componentsLoaded: true
        }
      };
      commit('updateArea', areaToLoad);

    } catch (error) {
      const {message} = error;
      areaToLoad = {
        ...areaToLoad,
        ...{
          componentsLoading: false,
          componentsLoaded: false,
          error: message
        }
      };
      commit('updateArea', areaToLoad);
    }
  },
};
