import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/';

// animations should look and feel same regardless of the viwers fps
// performing the same steps as before from firstlessons.js
const scene = new THREE.Scene()
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
)
scene.add(cube)
const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)
scene.add(camera)

camera.lookAt(cube.position)
camera.position.set(0, 0, 5)

const canvas = document.querySelector("canvas.webgl")
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)


// animating part (NEW!)
// we need some functionality to handle the game/event loop, window.requestanimationframe
// will handle that part, it accepts a function that it needs for the next frame as a parameter

const eventLoop = () => {

    // what we want to animate? lets go for a simple rotation on the x axis
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // render called here will be updated because of the next line, which updates everything on a fps basis
    renderer.render(scene, camera)
    window.requestAnimationFrame(eventLoop)

}

eventLoop()