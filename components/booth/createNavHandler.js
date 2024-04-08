import {EasingFunction, QuadraticEase} from "@babylonjs/core/Animations/easing";
import {Animation} from "@babylonjs/core/Animations/animation";
import {ActionManager} from "@babylonjs/core/Actions/actionManager";
import {ExecuteCodeAction} from "@babylonjs/core/Actions/directActions";

export default function(scene, camera) {
  const navStates = [];
  const subscriptions = {};
  let currentStateId;

  /* Initialise animations */

  const framerate = 60;
  const animationDuration = framerate;

  const createCameraTransition = (function() {

    const easing = new QuadraticEase();
    easing.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

    return function(from, to) {
      const target = new Animation("cameraMovementTarget", "target", framerate, Animation.ANIMATIONTYPE_VECTOR3);
      target.setKeys([
        {
          frame: 0,
          value: from.target
        },
        {
          frame: animationDuration,
          value: to.target
        }
      ])
      target.setEasingFunction(easing);

      const alpha = new Animation("cameraMovementAlpha", "alpha", framerate, Animation.ANIMATIONTYPE_FLOAT);
      alpha.setKeys([
        {
          frame: 0,
          value: from.alpha
        },
        {
          frame: animationDuration,
          value: to.alpha
        }
      ]);
      alpha.setEasingFunction(easing);

      const beta = new Animation("cameraMovementBeta", "beta", framerate, Animation.ANIMATIONTYPE_FLOAT);
      beta.setKeys([
        {
          frame: 0,
          value: from.beta
        },
        {
          frame: animationDuration,
          value: to.beta
        }
      ]);
      beta.setEasingFunction(easing);

      const radius = new Animation("cameraMovementRadius", "radius", framerate, Animation.ANIMATIONTYPE_FLOAT);
      radius.setKeys([
        {
          frame: 0,
          value: from.radius
        },
        {
          frame: animationDuration,
          value: to.radius
        }
      ])
      radius.setEasingFunction(easing);

      return [target, alpha, beta, radius];
    }
  })();

  function getCurrentPosition() {
    return {
      target: camera.target,
      alpha: camera.alpha,
      beta: camera.beta,
      radius: camera.radius
    };
  }

  function navigate(direction) {
    if(typeof navStates[currentStateId].navigation?.[direction] === 'undefined') {
      throw new Error("Invalid navigation state.");
    }

    navigateTo(navStates[currentStateId].navigation[direction]);
  }

  function navigateTo(stateId) {
    if(!navStates[stateId]) {
      throw new Error("Invalid state.")
    }

    if(navStates[currentStateId].actions) {
      const { leave } = navStates[currentStateId].actions;
      if(typeof leave === "function") leave(navStates[currentStateId].mesh);
    }

    camera.animations = createCameraTransition(getCurrentPosition(), navStates[stateId].cameraPosition);
    scene.beginAnimation(camera, 0, animationDuration, false);
    currentStateId = stateId;

    if(navStates[currentStateId].navigation?.enableMeshActions) {
      navStates.forEach((state, stateId) => {
        if(!state.mesh) return;
        state.mesh.actionManager = new ActionManager(scene);
        state.mesh.actionManager.registerAction(
          new ExecuteCodeAction(
            ActionManager.OnPickTrigger,
            () => navigateTo(stateId),
          )
        );
      });
    } else {
      for(const state of navStates) {
        if(!state.mesh) continue;
        delete state.mesh.actionManager;
      }
    }

    if(Array.isArray(subscriptions['nav-state-changed'])) {
      subscriptions['nav-state-changed'].forEach(callback => callback(navStates[currentStateId]));
    }

    if(navStates[currentStateId].actions) {
      const { enter } = navStates[currentStateId].actions;
      if(typeof enter === "function") enter(navStates[currentStateId].mesh);
    }
  }

  return {
    addNavState: function (cameraPosition, mesh, navigation, actions) {
      navStates.push({cameraPosition, mesh, navigation, actions});
      if(!currentStateId) {
        currentStateId = 0;
      }
      return navStates.length - 1;
    },
    removeNavState: function(stateId) {
      if(stateId === currentStateId) throw new Error("Unable to remove the state as it is the current state.");
      navStates.splice(stateId, 1);
      if(currentStateId > stateId) --currentStateId;
    },
    navigate,
    navigateTo,
    getCurrentNavState: function() {
      return navStates[currentStateId].navigation;
    },
    subscribe: function(event, callback) {
      if(typeof subscriptions[event] === "undefined") {
        subscriptions[event] = [];
      }
      subscriptions[event].push(callback);
    },
    unsubscribe: function(event, callback) {
      if(!Array.isArray(subscriptions[event])) return;
      subscriptions[event] = subscriptions[event].filter(item => item !== callback);
    }
  }
}
