/**
 * partition.js
 */
import config from 'config'

/**
 * This plugin retrieve the necessary configuration to `boot-up` the Partition.
 *
 * The resulting config object is injected into the context as $partition.
 *
 * Perhaps it should be called `$partitionConfig`.
 *
 * @param $axios
 * @param store
 * @param redirect
 * @param app
 * @param route
 * @param inject
 * @return {Promise<void>}
 */
export default async function ({$axios, store, redirect, app, route}, inject) {
  try {
    console.log('## PARTITION PLUGIN');

    let {rootDomain} = config;
    if (! rootDomain) {
      throw new Error(`## PARTITION PLUGIN - ERROR - ROOT DOMAIN NOT FOUND`);
    }

    const url = new URL(window.location.href);
    const hostname = url.hostname;
    const name = hostname.split('.')[0];

    if (! name) {
      throw new Error(`PARTITION PLUGIN - ERROR - PARTITION NAME NOT LOCATED`);

    }

    let partition = {
      rootDomain,
      url: url.toString(),
      hostname,
      name,
      exists: false,
    };

    let region;

    try {
      const globalUrl = `https://public.api.global.${rootDomain}/partitions/${name}`;

      let globalPartition = await $axios.$get(globalUrl);
      console.log(`## PARTITION PLUGIN - GLOBAL PARTITION`);
      console.log(globalPartition);

      ({region} = globalPartition);

    } catch (error) {
      console.log('## PARTITION PLUGIN - GLOBAL PARTITION NOT FOUND');

      // @luis - if this happens - we need to redirect to somewhere
      // perhaps buy-partition
    }

    if (region) {
      console.warn("LOAD REGION");
      try {
        const regionUrl = `https://public.api.${region}.${rootDomain}/${name}`;

        let config = await $axios.$get(regionUrl);
        console.log(`## PARTITION PLUGIN - CONFIG`);
        console.log("config",config);

        // const {
        //   partitionId,
        //   userPoolId,
        //   userPoolRegion,
        //   webClientId,
        //   identityPoolId,
        // } = config;

        let {
          partitionId,
          userPoolId,
          userPoolRegion,
          webClientId,
          identityPoolId,
          pinpointId
        } = config;

        // webClientId = '7e2mb3b4m0ph5ketob9vvpiht7'
        // userPoolId = 'eu-west-2_FkN00S531'
        // identityPoolId = 'eu-west-2:62e28539-74a0-421a-bba1-6ac10191a9c9'

        partition = {
          ...partition,
          ...{
            partitionId,
            region,
            webClientId,
            userPoolId,
            userPoolRegion,
            identityPoolId,
            pinpointId,
            exists: true,
          }
        };


      } catch (error) {
        console.log('## PARTITION PLUGIN - REGION PARTITION NOT FOUND');

        if (
          error.response.status === 403 &&
          error.response.data.status === 'restricted' &&
          route.name !== 'restricted'
        ) {
          console.log("TODO: WE SHOULD REDIRECT TO RESTRICTED PAGE");

          // Notify the restricted plugin that the Web APP is in restricted mode. [WAF]
          inject('restricted', true);
        }

        // @luis - if this happens - we need to redirect to somewhere
        // perhaps buy-partition
      }
    }

    console.log(`## PARTITION PLUGIN - PARTITION`);
    console.log(partition);

    // Save the Access configuration into the users/access store
    await store.dispatch('apps/admin/users-settings/createAccessConfig',partition)

    inject('partition', partition);

  } catch (error) {
    throw error;
  }
};
