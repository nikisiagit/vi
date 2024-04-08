import {Amplify, Analytics} from 'aws-amplify'

/**
 * @param context
 * @returns {Promise<{}>}
 */
export default async function ({ $partition }) {
  console.log(`## AMPLIFY PLUGIN`);

  if (! $partition.exists) {
    console.log(`## AMPLIFY PLUGIN - PARTITION DOES NOT EXIST - RETURNING`);
    return;
  }

  const {
    userPoolRegion,
    userPoolId,
    webClientId,
    name,
    pinpointId,
    identityPoolId
  } = $partition;

  /**
   ** @link: (PRK-735) https://5-guys.atlassian.net/browse/PRK-735
   ** @TODO: Check for existence of IdentityPoolId and PinpointId, then configure amplify for analytics.
   */

  const amplify = Amplify.configure({
    aws_cognito_region: userPoolRegion,
    aws_user_pools_id: userPoolId,
    aws_user_pools_web_client_id: webClientId,


    aws_cognito_identity_pool_id: identityPoolId,
    oauth: {
      domain: `${name}.auth.eu-west-2.amazoncognito.com`,
      scope: ["openid"],
      redirectSignIn:window.location.origin ,
      redirectSignOut: window.location.origin,
      responseType: "code"
    }
  });

  /**
  const analyticsConfig = {
    AWSPinpoint: {
        // Amazon Pinpoint App Client ID
        appId: 'cfb087beab614a7f951ba71c73157107',
        // Amazon service region
        region: userPoolRegion,
        mandatorySignIn: false,
        immediate: true,
      }
  }

  Analytics.configure(analyticsConfig);
  // console.log(analytics);

  Analytics.autoTrack('pageView', {
    enable: true,
    type: 'SPA',
    getUrl: () => {
      // the default function
      return window.location.origin + window.location.pathname;
    }
  });

  Analytics.autoTrack('event', {
    enable: true,
    // OPTIONAL, events you want to track, by default is 'click'
    events: ['click'],
  });
   **/

  console.log(amplify);

  return amplify;
}
