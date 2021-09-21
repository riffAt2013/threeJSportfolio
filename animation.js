import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/'


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

// for adaptive framerate
// let time = Date.now() // depracated
const clock = new THREE.Clock()

// animating part (NEW!)
// we need some functionality to handle the game/event loop, window.requestanimationframe
// will handle that part, it accepts a function that it needs for the next frame as a parameter
const eventLoop = () => {

    // the following lines helps adapt the framerate between differnet screen refresh rate
    // reqestanimationframe has no idea of framerate adoption, so the more the hertz of the monitor, the more it is called
    // without the following lines the animation may vary
    // we get the timestamp
    // const currentTime = Date.now()
    // const timeDelta = currentTime - time
    // time = currentTime

    const elapsedTime = clock.getElapsedTime()


    // what we want to animate? lets go for a simple rotation on the x axis
    // multiplyting the values with timedelta adapts the animation framerate. the faster the hertz of the enduser monitor is, the lesser the timedelta and vice-versa
    // makes the animation stable across all monitors

    // the elapsed time is built in adaptive :)
    cube.rotation.x = elapsedTime
    cube.rotation.y = elapsedTime

    // basic math. recall sin and cos function. recall how the values reset and gives a sense of oscillation. recall the fact the we can combine their oscillations at 
    // multiple axis to get circlish pattern
    cube.position.x = Math.sin(elapsedTime)
    cube.position.y = Math.cos(elapsedTime)

    // render called here will be updated because of the next line, which updates everything on a fps basis
    renderer.render(scene, camera)
    window.requestAnimationFrame(eventLoop)

}

eventLoop()