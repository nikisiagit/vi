<template>
  <div ref="textureForm" class="texture-form">
    <texture-form
      v-show="showForm"
      :color="textureColor"
      :file="textureFile"
      :link="textureLink"
      :type="textureType"
      @color-changed="setColor"
      @file-changed="setFile"
      @link-changed="setLink"
      @close="closeForm"
    ></texture-form>
  </div>
</template>
<style scoped>
.texture-form {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
<script>
import createNavHandler from "@/components/booth/createNavHandler";
import TextureForm from "@/components/booth/TextureForm";
import {Color3, Vector3} from "@babylonjs/core/Maths/math";
import {VideoTexture} from "@babylonjs/core/Materials/Textures/videoTexture";
import {StandardMaterial} from "@babylonjs/core/Materials/standardMaterial";
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial";
import {Texture} from "@babylonjs/core/Materials/Textures/texture";
import {EasingFunction, QuadraticEase} from "@babylonjs/core/Animations/easing";
import {Animation} from "@babylonjs/core/Animations/animation";
import {HighlightLayer} from "@babylonjs/core/Layers/highlightLayer";

const framerate = 60;
const animationDuration = framerate;
const highlightColor = Color3.White();
const tableMeshNames = ["Left Stool Top", "Left Stool Bottom", "Right Stool Top", "Right Stool Bottom", "Table", "Table Front Panel"];

let scene;
let highlightLayer;
let selectedMesh;

function disposeMaterial(material) {
  material.dispose();
  if(material.video) {
    while(material.video.firstChild) {
      material.video.removeChild(material.video.firstChild);
    }
    material.video.src = '';
    material.video.removeAttribute('src');
    material.video.load();
    material.video.remove();
  }
}

export default {
  name: "BoothSetup",
  components: {
    TextureForm
  },
  props: {
    sceneEventBus: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    navHandler: null,
    textureColor: '',
    textureFile: null,
    textureLink: '',
    textureType: 'color',
    showForm: false,
    textures: []
  }),
  methods: {
    setColor(color) {
      if (!selectedMesh) return;

      if (selectedMesh.material) {
        disposeMaterial(selectedMesh.material);
      }

      this.textureColor = color;
      this.textureType = 'color';

      const index = this.textures.findIndex(texture => texture.name === selectedMesh.name);

      if (!color) {
        if(index !== -1) {
          delete this.textures[index].color;
        }
        selectedMesh.material = new PBRMaterial(selectedMesh.name, scene);
        selectedMesh.material.roughness = 1;
        selectedMesh.material.metallic = 0;
        return;
      }

      const texture = {
        name: selectedMesh.name,
        type: 'color',
        color
      }

      if(index === -1) {
        this.textures.push(texture);
      } else {
        this.textures[index] = {...this.textures[index], ...texture};
      }

      selectedMesh.material = new PBRMaterial(selectedMesh.name, scene);
      selectedMesh.material.roughness = 1;
      selectedMesh.material.metallic = 0;
      selectedMesh.material.albedoColor = Color3.FromHexString(color).toLinearSpace();
    },
    setFile(file) {
      if (!selectedMesh) return;

      if (selectedMesh.material) {
        disposeMaterial(selectedMesh.material);
      }

      this.textureFile = file;
      this.textureType = 'file';

      const index = this.textures.findIndex(texture => texture.name === selectedMesh.name);

      if(!file) {
        if(index !== -1) {
          delete this.textures[index].file;
        }
        selectedMesh.material = new PBRMaterial(selectedMesh.name, scene);
        selectedMesh.material.roughness = 1;
        selectedMesh.material.metallic = 0;
        return;
      }

      const texture = {
        name: selectedMesh.name,
        type: 'file',
        file
      }

      if(index === -1) {
        this.textures.push(texture);
      } else {
        this.textures[index] = {...this.textures[index], ...texture};
      }

      const blob = window.URL.createObjectURL(file);

      switch (file.type.split('/')[0]) {
        case 'video':
          const video = new VideoTexture(
            selectedMesh.name,
            blob,
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
          selectedMesh.material = new StandardMaterial(selectedMesh.name, scene);
          selectedMesh.material.diffuseTexture = video;
          selectedMesh.material.emissiveColor = new Color3(1, 1, 1);
          break;

        case 'image':
          selectedMesh.material = new PBRMaterial(selectedMesh.name, scene);
          selectedMesh.material.roughness = 1;
          selectedMesh.material.metallic = 1;
          selectedMesh.material.albedoTexture = new Texture(blob, scene);
          break;

        default:
          throw new Error("Unknown file type used as texture.");
      }
    },
    setLink(link) {
      if (!selectedMesh) return;

      this.textureLink = link;

      const index = this.textures.findIndex(texture => texture.name === selectedMesh.name);

      if(!link && index !== -1) {
        delete this.textures[index].link;
        return;
      }

      const texture = {
        name: selectedMesh.name,
        link
      }

      if(index === -1) {
        this.textures.push(texture);
      } else {
        this.textures[index] = {...this.textures[index], ...texture};
      }
    },
    closeForm() {
      this.showForm = false;
      highlightLayer.removeAllMeshes();
    },
    animateVisibility(mesh, value) {
      const easing = new QuadraticEase();
      easing.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

      const initialValue = mesh.visibility;

      const animation = new Animation("meshVisibility", "visibility", framerate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
      animation.setKeys([
        {
          frame: 0,
          value: initialValue
        },
        {
          frame: animationDuration,
          value: value
        }
      ])
      animation.setEasingFunction(easing);
      mesh.animations = [animation];
      mesh.getScene().beginAnimation(mesh, 0, animationDuration, false);
    },
    setBoothVisibility(value) {
      scene.getTransformNodeByName("Booth").getChildMeshes()
        .filter(mesh => ["Back Wall", "Floor"].indexOf(mesh.name) === -1)
        .forEach(mesh => {
          mesh.material.needDepthPrePass = true;
          this.animateVisibility(mesh, value)
        });
    },
    setTableVisibility(value) {
      scene.meshes
        .filter(mesh => tableMeshNames.indexOf(mesh.name) !== -1)
        .forEach(mesh => {
          mesh.material.needDepthPrePass = true;
          this.animateVisibility(mesh, value)
        });
    },
    keyPressed(keyCode) {
      if (!this?.navHandler) return;
      if (keyCode === null) return;
      const navState = this.navHandler.getCurrentNavState();
      if (!navState) return;
      switch (keyCode) {
        case "Backquote":
          if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
          } else {
            scene.debugLayer.show();
          }
          break;

        case "Escape":
          this.closeForm();
          break;
      }
    },
    navStateChanged({mesh}) {
      selectedMesh = mesh;
      this.showForm = !!mesh;

      const index = mesh ? this.textures.findIndex(texture => texture.name === mesh.name) : -1;

      if (!mesh || index === -1) {
        this.textureColor = mesh ? mesh.material.albedoColor.toGammaSpace().toHexString() : '#FFFFFF';
        this.textureFile = null;
        this.textureLink = '';
        this.textureType = 'color';
        return;
      }

      ({
        color: this.textureColor,
        file: this.textureFile,
        link: this.textureLink,
        type: this.textureType
      } = this.textures[index]);
    },
    initialiseNavigation() {
      // Create highlight layer
      highlightLayer = new HighlightLayer("highlight", scene);

      // Create the navigation handler
      this.navHandler = createNavHandler(scene, scene.cameras[0]);

      this.navHandler.subscribe('nav-state-changed', this.navStateChanged);

      // Add the navigation states
      this.navHandler.addNavState({
        target: new Vector3(0, 1.1, 0),
        alpha: Math.PI / 2,
        beta: Math.PI / 2.1,
        radius: 3.5 // distance from target
      }, null, {enableMeshActions: true});

      const backWall = scene.getMeshByName("Back Wall");
      const backWallPosition = backWall.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: backWallPosition,
          alpha: Math.PI / 2,
          beta: Math.PI / 2,
          radius: 5.5
        },
        backWall,
        {enableMeshActions: true},
        {
          enter: () => {
            scene.getTransformNodeByName("Booth").getChildMeshes()
              .forEach(highlightLayer.addExcludedMesh, highlightLayer);
            highlightLayer.addMesh(backWall, highlightColor);
            this.setBoothVisibility(0.1);
          },
          leave: () => {
            this.setBoothVisibility(1);
            highlightLayer.removeMesh(backWall);
            scene.getTransformNodeByName("Booth").getChildMeshes()
              .forEach(highlightLayer.removeExcludedMesh, highlightLayer);
          }
        }
      );

      const floor = scene.getMeshByName("Floor");
      const floorPosition = floor.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: floorPosition,
          alpha: Math.PI / 2,
          beta: Math.PI / 4,
          radius: 3.5
        },
        floor,
        {enableMeshActions: true},
        {
          enter: () => {
            scene.getTransformNodeByName("Booth").getChildMeshes()
              .forEach(highlightLayer.addExcludedMesh, highlightLayer);
            highlightLayer.addMesh(floor, highlightColor);
            this.setBoothVisibility(0.1);
          },
          leave: () => {
            this.setBoothVisibility(1);
            highlightLayer.removeMesh(floor);
            scene.getTransformNodeByName("Booth").getChildMeshes()
              .forEach(highlightLayer.removeExcludedMesh, highlightLayer);
          }
        }
      );

      const tableFrontPanel = scene.getMeshByName("Table Front Panel");
      const tableFrontPanelPosition = tableFrontPanel.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: tableFrontPanelPosition,
          alpha: 2.27,
          beta: 1.2,
          radius: 3.5
        },
        tableFrontPanel,
        {enableMeshActions: true},
        {
          enter: () => highlightLayer.addMesh(tableFrontPanel, highlightColor),
          leave: () => highlightLayer.removeMesh(tableFrontPanel)
        }
      );

      const table = scene.getMeshByName("Table");
      const tablePosition = table.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: tablePosition,
          alpha: 2.27,
          beta: 1.2,
          radius: 3.5
        },
        table,
        {enableMeshActions: true},
        {
          enter: () => {
            const rightStoolMeshes = scene.getTransformNodeByName("Right Stool").getChildMeshes();
            rightStoolMeshes.forEach(mesh => {
              mesh.material.needDepthPrePass = true;
              highlightLayer.addExcludedMesh(mesh);
              this.animateVisibility(mesh, 0.1);
            });
            highlightLayer.addMesh(table, highlightColor);
          },
          leave: () => {
            highlightLayer.removeMesh(table);
            const rightStoolMeshes = scene.getTransformNodeByName("Right Stool").getChildMeshes();
            rightStoolMeshes.forEach(mesh => {
              mesh.material.needDepthPrePass = true;
              highlightLayer.removeExcludedMesh(mesh);
              this.animateVisibility(mesh, 1)
            });
          }
        }
      );

      const leftStool = scene.getMeshByName("Left Stool Top");
      const leftStoolPosition = leftStool.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: leftStoolPosition,
          alpha: Math.PI / 2,
          beta: 1.2,
          radius: 3.5
        },
        leftStool,
        {enableMeshActions: true},
        {
          enter: () => {
            [
              scene.getMeshByName("Table Front Panel"),
              scene.getMeshByName("Table")
            ].forEach(highlightLayer.addExcludedMesh, highlightLayer);
            highlightLayer.addMesh(leftStool, highlightColor);
          },
          leave: () => {
            highlightLayer.removeMesh(leftStool);
            [
              scene.getMeshByName("Table Front Panel"),
              scene.getMeshByName("Table")
            ].forEach(highlightLayer.removeExcludedMesh, highlightLayer);
          }
        }
      );

      const rightStool = scene.getMeshByName("Right Stool Top");
      const rightStoolPosition = rightStool.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: rightStoolPosition,
          alpha: Math.PI / 2,
          beta: 1.2,
          radius: 3.5
        },
        rightStool,
        {enableMeshActions: true},
        {
          enter: () => {
            [
              scene.getMeshByName("Table Front Panel"),
              scene.getMeshByName("Table")
            ].forEach(highlightLayer.addExcludedMesh, highlightLayer);
            highlightLayer.addMesh(rightStool, highlightColor);
          },
          leave: () => {
            highlightLayer.removeMesh(rightStool);
            [
              scene.getMeshByName("Table Front Panel"),
              scene.getMeshByName("Table")
            ].forEach(highlightLayer.removeExcludedMesh, highlightLayer);
          }
        }
      );

      const topLeftPanel = scene.getMeshByName("Top Left Panel");
      const topLeftPanelPosition = topLeftPanel.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: topLeftPanelPosition,
          alpha: 2.27,
          beta: Math.PI / 2,
          radius: 3.5
        },
        topLeftPanel,
        {enableMeshActions: true},
        {
          enter: () => highlightLayer.addMesh(topLeftPanel, highlightColor),
          leave: () => highlightLayer.removeMesh(topLeftPanel)
        }
      );

      const leftTV = scene.getMeshByName("Left TV Panel");
      const leftTVPosition = leftTV.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: leftTVPosition,
          alpha: 2.27,
          beta: Math.PI / 2,
          radius: 3.5
        },
        leftTV,
        {enableMeshActions: true},
        {
          enter: () => highlightLayer.addMesh(leftTV, highlightColor),
          leave: () => highlightLayer.removeMesh(leftTV)
        });

      const bottomLeftPanel = scene.getMeshByName("Bottom Left Panel");
      const bottomLeftPanelPosition = bottomLeftPanel.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: bottomLeftPanelPosition,
          alpha: 2.27,
          beta: Math.PI / 2,
          radius: 3.5,
        },
        bottomLeftPanel,
        {enableMeshActions: true},
        {
          enter: () => {
            tableMeshNames
              .map(scene.getMeshByName, scene)
              .forEach(highlightLayer.addExcludedMesh, highlightLayer);
            highlightLayer.addMesh(bottomLeftPanel, highlightColor);
            this.setTableVisibility(0.1);
          },
          leave: () => {
            this.setTableVisibility(1);
            highlightLayer.removeMesh(bottomLeftPanel);
            tableMeshNames
              .map(scene.getMeshByName, scene)
              .forEach(highlightLayer.removeExcludedMesh, highlightLayer);
          }
        }
      );

      const centrePanel = scene.getMeshByName("Centre Panel");
      const centrePanelPosition = centrePanel.getBoundingInfo().boundingBox.centerWorld;
      this.navHandler.addNavState(
        {
          target: centrePanelPosition,
          alpha: Math.PI / 2,
          beta: Math.PI / 2,
          radius: 3.5
        },
        centrePanel,
        {enableMeshActions: true},
        {
          enter: () => {
            tableMeshNames
              .map(scene.getMeshByName, scene)
              .forEach(highlightLayer.addExcludedMesh, highlightLayer);
            highlightLayer.addMesh(centrePanel, highlightColor);
            this.setTableVisibility(0.1);
          },
          leave: () => {
            this.setTableVisibility(1);
            highlightLayer.removeMesh(centrePanel);
            tableMeshNames
              .map(scene.getMeshByName, scene)
              .forEach(highlightLayer.removeExcludedMesh, highlightLayer);
          }
        }
      );

      const topRightPanel = scene.getMeshByName("Top Right Panel");
      const topRightPanelPosition = topRightPanel.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: topRightPanelPosition,
          alpha: 0.87,
          beta: Math.PI / 2,
          radius: 3.5
        },
        topRightPanel,
        {enableMeshActions: true},
        {
          enter: () => highlightLayer.addMesh(topRightPanel, highlightColor),
          leave: () => highlightLayer.removeMesh(topRightPanel)
        }
      );

      const rightTV = scene.getMeshByName("Right TV Panel");
      const rightTVPosition = rightTV.getBoundingInfo().boundingSphere.centerWorld;
      this.navHandler.addNavState(
        {
          target: rightTVPosition,
          alpha: 0.87,
          beta: Math.PI / 2,
          radius: 3.5
        },
        rightTV,
        {enableMeshActions: true},
        {
          enter: () => {
            highlightLayer.addMesh(rightTV, highlightColor);
          },
          leave: () => {
            highlightLayer.removeMesh(rightTV);
          }
        }
      );

      const bottomRightPanel = scene.getMeshByName("Bottom Right Panel");
      const bottomRightPanelPosition = bottomRightPanel.getBoundingInfo().boundingBox.centerWorld;
      this.navHandler.addNavState(
        {
          target: bottomRightPanelPosition,
          alpha: 0.87,
          beta: Math.PI / 2,
          radius: 3.5
        },
        bottomRightPanel,
        {enableMeshActions: true},
        {
          enter: () => {
            tableMeshNames
              .map(scene.getMeshByName, scene)
              .forEach(highlightLayer.addExcludedMesh, highlightLayer);
            this.setTableVisibility(0.1);
            highlightLayer.addMesh(bottomRightPanel, highlightColor);
          },
          leave: () => {
            this.setTableVisibility(1)
            highlightLayer.removeMesh(bottomRightPanel);
            tableMeshNames
              .map(scene.getMeshByName, scene)
              .forEach(highlightLayer.removeExcludedMesh, highlightLayer);
          }
        }
      );

      this.navHandler.navigateTo(0);
    }
  },
  mounted() {
    this.sceneEventBus.subscribe('scene-loaded', newScene => {
      scene = newScene;
      this.initialiseNavigation();
      this.sceneEventBus.subscribe('key-down', this.keyPressed);
    });
  }
}
</script>
