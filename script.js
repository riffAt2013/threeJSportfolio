import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/';
import {
    OrbitControls
} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';


// 4 things at least in 3js
// A Scene, some objects, a camera, a renderer
const scene = new THREE.Scene()

// an object creation, object = geometry + material
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
    color: 'mistyrose'
})
const physicalEntity = new THREE.Mesh(geometry, material)
scene.add(physicalEntity)


const sizes = {
    width: 800,
    height: 600
}

// camera adding, requires two param
// 1. field of view -> vertical field of view -> more the number more things to be seen (distorted)
// 2. Aspect ratio (width/height) of the render, we can set custom values as well
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)
// camera by default will be inside the cube we're drawing here, recall from unity days the next line
camera.position.z = 4
camera.position.x = 2
scene.add(camera)

// render adding, renders scene from the camera pov
// renders inside HTML canvas using WebGL in the backend
// WebGLRenderer needs a canvas to draw on, we'll provide the canvas grabbing the DOMelement
const canvas = document.querySelector("canvas.webgl")
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})

// setting the viewport size of the render
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)