import React from "react";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

class ThreeCanvas extends React.Component {
  componentDidMount() {
    let mixer;
    const clock = new THREE.Clock();
    const container = document.getElementById("canvas-container");

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(5, 2, 8);

    const controls = new OrbitControls(camera, container);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 0.4));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 2, 8);
    scene.add(dirLight);

    const dracoLoader = new DRACOLoader();

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "Flamingo.glb",
      function (gltf) {
        console.log("made it at least this far");
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.05, 0.05, 0.05);

        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        const animation = gltf.animations[0];
        const action = mixer.clipAction(animation);
        action.play();

        animate();
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    var animate = function () {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer.update(delta);
      renderer.render(scene, camera);
    };
  }

  render() {
    return <div id="canvas-container" />;
  }
}

export default ThreeCanvas;
