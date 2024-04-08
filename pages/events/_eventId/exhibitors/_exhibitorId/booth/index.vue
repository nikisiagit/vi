<template>
  <div>
    <div class="nav-button"
         id="back-nav"
         v-show="canNavigateBack"
         @click="navHandler.navigate('back')">
      <v-icon>mdi-keyboard-return</v-icon>
    </div>
    <div class="nav-button"
         id="top-nav"
         v-show="canNavigateUp"
         @click="navHandler.navigate('up')">
      <v-icon>mdi-chevron-up</v-icon>
    </div>
    <div class="nav-button"
         id="fullscreen"
         v-show="!isFullScreen"
         @click="fullscreen(true)">
      <v-icon>mdi-fullscreen</v-icon>
    </div>
    <div class="nav-button"
         id="fullscreen-exit"
         v-show="isFullScreen"
         @click="fullscreen(false)">
      <v-icon>mdi-fullscreen-exit</v-icon>
    </div>
    <div class="nav-button"
         id="left-nav"
         v-show="canNavigateLeft"
         @click="navHandler.navigate('left')">
      <v-icon>mdi-chevron-left</v-icon>
    </div>
    <div class="nav-button"
         id="right-nav"
         v-show="canNavigateRight"
         @click="navHandler.navigate('right')">
      <v-icon>mdi-chevron-right</v-icon>
    </div>
    <div class="nav-button"
         id="bottom-nav"
         v-show="canNavigateDown"
         @click="navHandler.navigate('down')">
      <v-icon>mdi-chevron-down</v-icon>
    </div>
  </div>
</template>
<style scoped>
  .nav-button {
    width: 6vmax;
    height: 6vmax;
    opacity: 0.7;
    border-radius: 50%;
    border: 0.3vmax solid #fff;
    background-color: #2222aa;
    margin: auto;
    position: absolute;
    cursor: pointer;
  }
  .nav-button .v-icon.v-icon {
    font-size: 5.5vmax;
  }
  #back-nav {
    top: 3vmax;
    left: 3vmax;
  }
  #top-nav {
    top: 3vmax;
    left: 0;
    right: 0;
  }
  #left-nav {
    top: 0;
    left: 3vmax;
    bottom: 0;
  }
  #right-nav {
    top: 0;
    right: 3vmax;
    bottom: 0;
  }
  #bottom-nav {
    left: 0;
    right: 0;
    bottom: 3vmax;
  }
  #fullscreen, #fullscreen-exit {
    top: 3vmax;
    right: 3vmax;
  }
</style>
<script>
import createNavHandler from "@/components/booth/createNavHandler";
import {Color3, Vector3} from "@babylonjs/core/Maths/math";
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial";
import {Texture} from "@babylonjs/core/Materials/Textures/texture";
import {VideoTexture} from "@babylonjs/core/Materials/Textures/videoTexture";
import {StandardMaterial} from "@babylonjs/core/Materials/standardMaterial";

export default {
  name: "BoothMain",
  props: {
    sceneEventBus: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    navHandler: null,
    canNavigateUp: false,
    canNavigateDown: false,
    canNavigateLeft: false,
    canNavigateRight: false,
    canNavigateBack: false,
    isFullScreen: false,
  }),
  methods: {
    fullscreenChanged: function(_) {
      this.isFullScreen = (document.fullscreenElement !== null);
    },
    fullscreen: function(enable) {
      this.sceneEventBus.emit("fullscreen", enable);
    },
    restartVideoOnEnter: function(texture) {
      if(!texture?.video) return;

      texture.video.pause();
      texture.video.muted = false;
      texture.video.loop = false;
      texture.video.controls = true;
      texture.video.play();
      texture.video.currentTime = 0;
    },
    muteVideoOnLeave: function(texture) {
      if(!texture?.video) return;

      texture.video.muted = true;
      texture.video.loop = true;
    },
    keyPressed: function(keyCode, scene) {
      if(!this?.navHandler) return;
      if(keyCode === null) return;

      const navState = this.navHandler.getCurrentNavState();
      if(!navState) return;

      switch(keyCode) {
        case "Backquote":
          if(scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
          } else {
            scene.debugLayer.show();
          }
          break;
        case "ArrowLeft":
          if(typeof navState.left === 'undefined') break;
          this.navHandler.navigate('left');
          break;
        case "ArrowUp":
          if(typeof navState.up === 'undefined') break;
          this.navHandler.navigate('up');
          break;
        case "ArrowRight":
          if(typeof navState.right === 'undefined') break;
          this.navHandler.navigate('right');
          break;
        case "ArrowDown":
          if(typeof navState.down !== 'undefined') {
            this.navHandler.navigate('down');
          } else if(typeof navState.back !== 'undefined') {
            this.navHandler.navigate('back');
          }
          break;
        case "Escape":
        case "Home":
        case "Numpad0":
          if(typeof navState.back === 'undefined') break;
          this.navHandler.navigate('back');
          break;
        default:
          break;
      }
    },
    initialiseNavigation: function(scene) {

      // Create the navigation handler
      this.navHandler = createNavHandler(scene, scene.cameras[0]);

      // Handle navigation state changes
      this.navHandler.subscribe('nav-state-changed', ({navigation}) => {
        this.canNavigateUp = navigation.enableHUDNavigation && navigation.up !== undefined;
        this.canNavigateDown = navigation.enableHUDNavigation && navigation.down !== undefined;
        this.canNavigateLeft = navigation.enableHUDNavigation && navigation.left !== undefined;
        this.canNavigateRight = navigation.enableHUDNavigation && navigation.right !== undefined;
        this.canNavigateBack = navigation.enableHUDNavigation && navigation.back !== undefined;
      });

      // Add the navigation states
      // the nav states are added by index 0, 1,2 etc
      this.navHandler.addNavState({
        target: new Vector3(0, 1.1, 0),
        alpha: Math.PI / 2,
        beta: Math.PI / 2.1,
        radius: 3.5 // distance from target
      }, null, {enableMeshActions: true, up: 4});


      const backWall = scene.getMeshByName("Back Wall");
      backWall.material = new PBRMaterial(backWall.name, scene);
      backWall.material.roughness = 1;
      backWall.material.metallic = 1;
      backWall.material.albedoTexture = new Texture('http://demo.localhost:3001/back-wall.png', scene);

      const tableFrontPanel = scene.getMeshByName("Table Front Panel");
      tableFrontPanel.material = new PBRMaterial(tableFrontPanel.name, scene);
      tableFrontPanel.material.roughness = 1;
      tableFrontPanel.material.metallic = 1;
      tableFrontPanel.material.albedoTexture = new Texture('http://demo.localhost:3001/table-front.png', scene);


      const table = scene.getMeshByName("Table");
      table.material = new PBRMaterial(table.name, scene);
      table.material.roughness = 1;
      table.material.metallic = 0;
      table.material.albedoColor = Color3.FromHexString('#1e1e5e').toLinearSpace();


      // Chairs
      const leftStoolTop = scene.getMeshByName("Left Stool Top");
      leftStoolTop.material = new PBRMaterial(leftStoolTop.name, scene);
      leftStoolTop.material.roughness = 1;
      leftStoolTop.material.metallic = 0;
      leftStoolTop.material.albedoColor = Color3.FromHexString('#3949AB').toLinearSpace();

      const rightStoolTop = scene.getMeshByName("Right Stool Top");
      rightStoolTop.material = new PBRMaterial(rightStoolTop.name, scene);
      rightStoolTop.material.roughness = 1;
      rightStoolTop.material.metallic = 0;
      rightStoolTop.material.albedoColor = Color3.FromHexString('#3949AB').toLinearSpace();


      const topLeftPanel = scene.getMeshByName("Top Left Panel");
      topLeftPanel.material = new PBRMaterial(topLeftPanel.name, scene);
      topLeftPanel.material.roughness = 1;
      topLeftPanel.material.metallic = 1;
      topLeftPanel.material.albedoTexture = new Texture('http://demo.localhost:3001/left-top.png', scene);



      const leftTV = scene.getMeshByName("Left TV Panel");
      const leftTVPosition = leftTV.getBoundingInfo().boundingSphere.centerWorld;

      const video = new VideoTexture(
        leftTV.name,
        'http://demo.localhost:3001/IVent-final.mp4',
        scene,
        true,
        false,
        undefined,
        {
          autoPlay: true,
          muted: true,
          loop: true,
          autoUpdateTexture: true
        }
      );
      leftTV.material = new StandardMaterial(leftTV.name, scene);
      leftTV.material.diffuseTexture = video;
      leftTV.material.emissiveColor = new Color3(1, 1, 1);

      this.navHandler.addNavState({
        target: leftTVPosition,
        alpha: 2.27,
        beta: Math.PI / 2,
        radius: 0.8
      }, leftTV, {
        enableHUDNavigation: true, // show the buttons
        back: 0, // state 0
        right: 4, // state 4
        down: 2 // state 3
      }, {
        enter: () => this.restartVideoOnEnter(video),
        leave: () => this.muteVideoOnLeave(video),
      });

      const bottomLeftPanel = scene.getMeshByName("Bottom Left Panel");
      const bottomLeftPanelVectors = bottomLeftPanel.getBoundingInfo().boundingBox.vectorsWorld;
      const bottomLeftPanelHeight = Math.abs(bottomLeftPanelVectors[0].y - bottomLeftPanelVectors[1].y);
      const bottomLeftPanelUpperHalf = bottomLeftPanel.getBoundingInfo().boundingSphere.centerWorld.add(new Vector3(0, bottomLeftPanelHeight / 4, 0));
      const bottomLeftPanelLowerHalf = bottomLeftPanel.getBoundingInfo().boundingSphere.centerWorld.subtract(new Vector3(0, bottomLeftPanelHeight / 4, 0));

      bottomLeftPanel.material = new PBRMaterial(bottomLeftPanel.name, scene);
      bottomLeftPanel.material.roughness = 1;
      bottomLeftPanel.material.metallic = 1;
      bottomLeftPanel.material.albedoTexture = new Texture('http://demo.localhost:3001/left-bottom.png', scene);

      this.navHandler.addNavState({
        target: bottomLeftPanelUpperHalf,
        alpha: 2.27,
        beta: Math.PI / 2,
        radius: 0.8,
      }, bottomLeftPanel, {
        enableHUDNavigation: true,
        back: 0,
        up: 1,
        right: 4,
        down: 3
      });
      this.navHandler.addNavState({
          target: bottomLeftPanelLowerHalf,
          alpha: 2.27,
          beta: Math.PI / 2,
          radius: 0.8,
        }, null, {
          enableHUDNavigation: true,
          back: 0,
          up: 2,
          right: 4}
      );

      const centrePanel = scene.getMeshByName("Centre Panel");
      const centrePanelVectors = centrePanel.getBoundingInfo().boundingBox.vectorsWorld;
      const centrePanelHeight = Math.abs(centrePanelVectors[0].y - centrePanelVectors[1].y);
      const centrePanelUpperHalf = centrePanel.getBoundingInfo().boundingSphere.centerWorld.add(new Vector3(0, centrePanelHeight / 4, 0));

      centrePanel.material = new PBRMaterial(centrePanel.name, scene);
      centrePanel.material.roughness = 1;
      centrePanel.material.metallic = 1;
      centrePanel.material.albedoTexture = new Texture('http://demo.localhost:3001/centre.png', scene);


      //const centrePanelLowerHalf = centrePanel.getBoundingInfo().boundingSphere.centerWorld.subtract(new Vector3(0, centrePanelHeight / 4, 0));
      this.navHandler.addNavState({
        target: centrePanelUpperHalf,
        alpha: Math.PI / 2,
        beta: Math.PI / 2,
        radius: 0.8
      }, centrePanel, {
        enableHUDNavigation: true,
        back: 0,
        left: 1,
        right: 5
      });

      const topRightPanel = scene.getMeshByName("Top Right Panel");
      topRightPanel.material = new PBRMaterial(topRightPanel.name, scene);
      topRightPanel.material.roughness = 1;
      topRightPanel.material.metallic = 1;
      topRightPanel.material.albedoTexture = new Texture('http://demo.localhost:3001/right-top.png', scene);


      const rightTV = scene.getMeshByName("Right TV Panel");
      const rightTVPosition = rightTV.getBoundingInfo().boundingSphere.centerWorld;

      rightTV.material = new PBRMaterial(rightTV.name, scene);
      rightTV.material.roughness = 1;
      rightTV.material.metallic = 1;
      rightTV.material.albedoTexture = new Texture('http://demo.localhost:3001/tv-blank.png', scene);


      this.navHandler.addNavState({
        target: rightTVPosition,
        alpha: 0.87,
        beta: Math.PI / 2,
        radius: 0.8
      }, rightTV, {
        enableHUDNavigation: true,
        back: 0,
        left: 4,
        down: 6
      }, {
        // enter: this.restartVideoOnEnter,
        // leave: this.muteVideoOnLeave
      });

      const bottomRightPanel = scene.getMeshByName("Bottom Right Panel");
      const bottomRightPanelVectors = bottomRightPanel.getBoundingInfo().boundingBox.vectorsWorld;
      const bottomRightPanelHeight = Math.abs(bottomRightPanelVectors[0].y - bottomRightPanelVectors[1].y);
      const bottomRightPanelUpperHalf = bottomRightPanel.getBoundingInfo().boundingSphere.centerWorld.add(new Vector3(0, bottomRightPanelHeight / 4, 0));
      const bottomRightPanelLowerHalf = bottomRightPanel.getBoundingInfo().boundingSphere.centerWorld.subtract(new Vector3(0, bottomRightPanelHeight / 4, 0));


      bottomRightPanel.material = new PBRMaterial(bottomRightPanel.name, scene);
      bottomRightPanel.material.roughness = 1;
      bottomRightPanel.material.metallic = 1;
      bottomRightPanel.material.albedoTexture = new Texture('http://demo.localhost:3001/right-bottom.png', scene);

      this.navHandler.addNavState({
        target: bottomRightPanelUpperHalf,
        alpha: 0.87,
        beta: Math.PI / 2,
        radius: 0.8
      }, bottomRightPanel, {
        enableHUDNavigation: true,
        back: 0,
        left: 4,
        up: 5,
        down: 7
      });
      this.navHandler.addNavState({
          target: bottomRightPanelLowerHalf,
          alpha: 0.87,
          beta: Math.PI / 2,
          radius: 0.8
        }, null, {
          enableHUDNavigation: true,
          back: 0,
          left: 4,
          up: 6}
      );

      this.navHandler.navigateTo(0);
    }
  },
  mounted() {
    this.sceneEventBus.subscribe('scene-loaded', scene => {
      this.initialiseNavigation(scene);

      const camera = scene.getCameraByName('cam')
      camera.attachControl(document.getElementById("stage"), true);
      camera.wheelDeltaPercentage = 0.05;

      this.sceneEventBus.subscribe('key-down', keyCode => {
        this.keyPressed(keyCode, scene);
      });
    });

    document.addEventListener('fullscreenchange', this.fullscreenChanged);
  },
  unmounted() {
    document.removeEventListener('fullscreenchange', this.fullscreenChanged);
  }
}
</script>
