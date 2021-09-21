import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/';

// 4 things at least in 3js
// A Scene, some objects, a camera, a renderer
const scene = new THREE.Scene()

// an object creation, object = geometry + material
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
    color: 'blueviolet'
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
camera.position.z = 2
scene.add(camera)

// objects can be transformed in various ways
// 1. rotaation, 2. scale, 3. position, 4. quaternion. Any classes inheriting
// Object3D class from 3js, has the ability to transform, so camera, mesh they can move
// x -> moving left to right\
// y -> moving up down, z -> towards you(+ve) | towards the computer(-ve)
physicalEntity.position.x = 1


// position is inherited from Vector3 (recall Unity days). so it has many more useful
// functionalites other than just moving. like length which tells you the distance from the center to your object3d instance
console.log('Distance from center to object', physicalEntity.position.length(), ' unit.')
console.log('Distance from camera to object ', physicalEntity.position.distanceTo(camera.position), ' unit!')

// changing poisiton using x,y,z property can be a hassel. use set()
physicalEntity.position.set(2, 1, -2)

// very difficult to understand the movement in such a dull scene. we can add a axishelper to
// better illustrate the movementes. Its an object that gives us a reference on movment
const axishelper = new THREE.AxisHelper(2)
scene.add(axishelper)

// scaling. set() also works on anything as long as it is Vector3
physicalEntity.scale.x = 2
physicalEntity.scale.y = 0.6

// rotation. can be done using rotation | quaternion. rotation values are not Vector3. they are euler angle value on XYZ axis. the values are no in degree but in radians. so 3.14 is half rotation
// 2 * 3.14 is full on so on.
physicalEntity.rotation.set(1, 0, 0)


// its difficult to look directly at the center using difficult mathematics and remembering the coordinates. use lookAt(). 
// since my object have moved/rotated a lot, I can tell the camera to lookAt that using a one liner. takes a Vector3
camera.lookAt(physicalEntity.position)


// to move multiple objects at the same time, or creating an object which houses multiple objects, moving can be a hassle one thing at a time. you can 
// group them using a Group class.
const cubeGroup = new THREE.Group()

// a new cube to be added in the group. we have directly created a cube rather than creating one separate part at a time
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00
    })
)

// add objects to the group, then add group to the scene
cubeGroup.add(cube1)
cubeGroup.add(cube2)
scene.add(cubeGroup)
cube1.position.x = 2

// now I can scale both the cube at once since they belong in a group
cubeGroup.scale.y = 3

camera.position.set(0, 0, 9)

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