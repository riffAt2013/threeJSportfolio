import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/';
import {
    OrbitControls
} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';


const canvas = document.querySelector("canvas.webgl")

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(5, 5, 5)
const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color('mistyrose')

// physical existence of the object requires the body and the skin aka geometry and material
const physicalEntity = new THREE.Mesh(geometry, material)

scene.add(physicalEntity)