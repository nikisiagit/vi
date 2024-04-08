/**
 * Api Plugin
 *
 * This plugin injects a function into the context ($api) that accepts the name
 * of the api to return.
 *
 * ```js
 * const protected = this.$api('protected');
 * ```
 *
 * If a name parameter is NOT supplied - this function will default to loading
 * either the `public` or `protected` (venue) apis depending on the authentication
 * status of the User.
 *
 * Authenticated Users can access the `protected` api.
 *
 * Apis available:
 *
 * - protected (venue)
 * - public    (venue)
 * - admin     (admin app)
 */
import createProtectedApi  from './../api/protected/createApi';
import createPublicApi from './../api/public/createApi';
import createAdminApi from './../api/admin/createApi';

import {createAxios} from "../utils/apiClient";

export default async function ({store, $partition, $axios}, inject) {
  console.log(`## API PLUGIN`)
  console.log(`## API PLUGIN - INJECTING API FUNCTION`);

  inject('api', function (name = undefined) {

      const user = store.getters['auth/user'];
      if (! name) {
        name = user ? 'protected' : 'public'
      }

      console.log(`## API FUNCTION - API TO GET: ${name}`);

      let api = apis[name] || undefined;

      if (api) {
        console.log(`## API FUNCTION - RETURNING CACHED API: ${name}`);
        return api;
      }

      const {
        rootDomain,
        name: partition,
        region,
        exists,
      } = $partition;

      // let timeout = 3000;
      let baseUrl;
      let client;

      switch (name) {
        case 'admin':
          client = clients['admin'] || undefined;

          if (! client) {
            baseUrl = `https://admin.api.${region}.${rootDomain}/${partition}`;

            try {
              client = createAxios($axios, baseUrl)
              clients['admin'] = client
            } catch (error) {
              console.log("## API FUNCTION - ERROR - CREATING AXIOS CLIENT FOR:", name);
              throw error;
              // store.dispatch('auth/logout');
            }
          }

          api = createAdminApi(client);
          apis[name] = api;
          return api;

        case 'protected':
          client = clients['protected'] || undefined;

          if (! client) {
            console.log(`## API FUNCTION - CREATING "protected" CLIENT`);
            baseUrl = `https://protected.api.${region}.${rootDomain}/${partition}`;
            try {
              client = createAxios($axios, baseUrl)
              clients['protected'] = client;
            } catch (error) {
              console.log("## ERROR WHEN CREATING AXIOS CLIENT FOR: ", name)
              throw error;
            }
          }

          console.log(`## API FUNCTION - CREATING "protected" API`);
          api = createProtectedApi(client);
          apis[name] = api;

          return api;

        case 'public':
        default:
          client = clients['public'] || undefined;


          if (! client) {
            console.log(`## API FUNCTION - CREATING "public" CLIENT`);

            baseUrl = `https://public.api.${region}.${rootDomain}/${partition}`;

            client = createAxios($axios, baseUrl, true)
            clients['public'] = client;
          }

          api = createPublicApi(client);
          apis['public'] = api;

          return api;
      }
    });
}


/**
 * The list of the Api objects
 *
 * @type {{}}
 */
const apis = {

};

/**
 * The list of Axios clients.
 *
 * @type {{}}
 */
const clients = {

};
