<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" no-gutters class="fill-height">
      <v-col cols="12" align-self="center">

        <v-sheet elevation="1" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">

          <v-container fluid>

            <v-row >
              <v-col>

                <v-card>
                  <v-card-text class="stageContainer" ref="container" @keydown="keyDown">
                    <canvas id="stage" />
<!--                    <div id="fps">0</div>-->
                    <nuxt-child
                      :sceneEventBus="sceneEventBus"
                    />
                  </v-card-text>
                </v-card>

              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

</template>
<style scoped>
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
  /*#fps {*/
  /*  display: block;*/
  /*  position: absolute;*/
  /*  background-color: black;*/
  /*  border: 2px solid red;*/
  /*  text-align: center;*/
  /*  font-size: 16px;*/
  /*  color: white;*/
  /*  top: 15px;*/
  /*  right: 10px;*/
  /*  width: 60px;*/
  /*  height: 20px;*/
  /*}*/
  .stageContainer{
    position: relative;
  }
</style>
<script>
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/core/Meshes/meshBuilder";
import {Engine} from "@babylonjs/core/Engines/engine";
import {Scene} from "@babylonjs/core/scene";
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera";
import {SceneLoader} from "@babylonjs/core/Loading/sceneLoader";
import {Vector3} from "@babylonjs/core/Maths/math";
import createEventBus from "@/components/booth/createEventBus";

const resourcesURL = "/";

const initialCameraPosition = {
  target: new Vector3(0, 1.1, 0), // what is the camera looking at
  alpha: Math.PI / 2,
  beta: Math.PI / 2,
  radius: 3.5 // distance from target
};

let divFps;

export default {
  name: "Booth",
  layout: "default-exhibit",
  scrollToTop: true,
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  data: () => ({
    navHandler: null,
    sceneEventBus: createEventBus()
  }),
  methods: {
    keyDown: function(e) {
      this.sceneEventBus.emit('key-down', e.code);
    },
    fullscreen: function(enable) {
      if(enable) {
        this.$refs.container.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
    resizeCanvas: function() {
      const stage = document.getElementById("stage");
      if(!stage) return;
      const rect = stage.getBoundingClientRect();
      stage.width = rect.width;
      stage.height = rect.height;
    }
  },
  async mounted() {
    window.addEventListener('resize', this.resizeCanvas);
    this.sceneEventBus.subscribe('fullscreen', this.fullscreen);

    // Initialise BabylonJS engine
    const engine = new Engine(document.getElementById("stage"), true, { stencil: true });
    const scene = new Scene(engine);

    // Initialise the camera
    const camera = new ArcRotateCamera(
      "cam",
      initialCameraPosition.alpha,
      initialCameraPosition.beta,
      initialCameraPosition.radius,
      initialCameraPosition.target,
      scene
    );
    camera.minZ = 0.1;
    // camera.attachControl(document.getElementById("stage"), true);
    // camera.wheelDeltaPercentage = 0.05;

    // Load the 3D models
    await SceneLoader.AppendAsync(resourcesURL, "booth-3.glb", scene);

    // Add UV maps to meshes that will be textured
    scene.getMeshByName("Back Wall").setVerticesData("uv", [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    scene.getMeshByName("Table Front Panel").setVerticesData("uv", [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    scene.getMeshByName("Left TV Panel").setVerticesData("uv", [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
    scene.getMeshByName("Right TV Panel").setVerticesData("uv", [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
    scene.getMeshByName("Top Left Panel").setVerticesData("uv", [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    scene.getMeshByName("Bottom Left Panel").setVerticesData("uv", [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1,0, 0,0, 0,0, 0,0, 1,0, 1,0, 1,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0]);
    scene.getMeshByName("Centre Panel").setVerticesData("uv", [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    scene.getMeshByName("Top Right Panel").setVerticesData("uv", [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    scene.getMeshByName("Bottom Right Panel").setVerticesData("uv", [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    // Load up textures
    // ToDo
    // const file = await fetch(url).then(r => r.blob())

    // Initialise the 3D environment
    scene.createDefaultEnvironment({
      createSkybox: false,
      createGround: false
    });

    divFps = document.getElementById("fps");
    engine.runRenderLoop(() => {
      // divFps.innerHTML = engine.getFps().toFixed() + " fps";
      scene.render();
    });

    this.sceneEventBus.emit('scene-loaded', scene);
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeCanvas);
  }
}
</script>
