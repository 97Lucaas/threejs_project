import * as THREE from 'three'
//import gsap from 'gsap'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const light = new THREE.AmbientLight( 0x404040,100 ); // soft white light ------------------------------
//scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
//scene.add( directionalLight );
const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
//scene.add( directionalLight2 );
directionalLight2.position.x = -5;
directionalLight2.position.z = -5;

const loader = new GLTFLoader();

var model;

loader.load( 'poubelle.glb', function ( gltf ) {

    model = gltf.scene
	scene.add( model );
    model.position.x = -4.3;
    model.children[2].rotation.x = -5;

}, undefined, function ( error ) {

	console.error( error );

} );

let model_street_light;

loader.load( 'street_light.glb', function ( gltf ) {

    model_street_light = gltf.scene
	scene.add( model_street_light );
    model_street_light.position.x = 2;
    model_street_light.rotation.y = Math.PI + Math.PI / 2;

}, undefined, function ( error ) {

	console.error( error );

} );

let car;

loader.load( 'car.glb', function ( gltf ) {

    car = gltf.scene
	scene.add( car );
    car.position.x = -3;
    car.position.y = 0.7;
    car.position.z = -3;
    car.scale.x = 0.4
    car.scale.y = 0.4
    car.scale.z = 0.4
    //car.rotation.y = Math.PI + Math.PI / 2;

}, undefined, function ( error ) {

	console.error( error );

} );

const breakStopLightRight = new THREE.PointLight( 0xff0000, 1 ); //feu stop droite
scene.add( breakStopLightRight );
breakStopLightRight.position.set(-3.5,1,-5.5)

const breakStopLightLeft = new THREE.PointLight( 0xff0000, 1 ); //feu stop gauche
scene.add( breakStopLightLeft );
breakStopLightLeft.position.set(-2.5,1,-5.5)

const frontightRight = new THREE.PointLight( 0xffffff, 1 ); //lumière feu droite
scene.add( frontightRight );
frontightRight.position.set(-3.5,0.7,-0.8)

const frontLightLeft = new THREE.PointLight( 0xffffff, 1 ); //lumière feu gauche
scene.add( frontLightLeft );
frontLightLeft.position.set(-2.5,0.7,-0.8)

const luRight = new THREE.SpotLight( 0xffffff ); //lueur feu droite
luRight.position.set(-3.5,0.7,-0.8);
luRight.angle = Math.PI/9
luRight.intensity = 100;
luRight.penumbra = 1;
luRight.target.position.set(-3.5,0.3,4)
luRight.castShadow = true

scene.add(luRight)
scene.add( luRight.target ); 

const luLeft = new THREE.SpotLight( 0xffffff ); //lueur feu gauche
luLeft.position.set( -2.5,0.7,-0.8 );
luLeft.angle = Math.PI/9
luLeft.intensity = 100;
luLeft.penumbra = 1;
luLeft.target.position.set(-2.5,0.3,4)
luLeft.castShadow = true

scene.add(luLeft)
scene.add( luLeft.target ); 

const helper = new THREE.SpotLightHelper(luRight) //helper
//scene.add(helper)


const directionalStreetLight = new THREE.PointLight( 0xffffff, 1, 100 );
scene.add( directionalStreetLight );
directionalStreetLight.position.set(0.5,5.2,0)

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0.5, 5.3, 0 );
spotLight.angle = Math.PI/9
spotLight.intensity = 100;
spotLight.penumbra = 1;
spotLight.target.x = 0.5
spotLight.castShadow = true

scene.add(spotLight)
scene.add( spotLight.target ); 

const spotLightHelper = new THREE.PointLightHelper( directionalStreetLight );
//scene.add( spotLightHelper );

let model_tlight;

loader.load( 'traffic_light.glb', function ( gltf ) {

    gltf.scene.scale.set(0.002, 0.002, 0.002); 
    gltf.scene.rotation.y = Math.PI
    //gltf.scene.children[0].position.set(-1, 0, 0)
    gltf.scene.position.set(-2.5, 0, 3.8)
    model_tlight = gltf.scene
    //console.log(gltf.scene)
	scene.add( model_tlight );

    set_to_red(model_tlight)

}, undefined, function ( error ) {

	console.error( error );

} );

const directionalLightRed = new THREE.PointLight( 0xFF3D3D, 1.5, 100 );
scene.add( directionalLightRed );
directionalLightRed.position.set(-1.45,2.8,-0.2)
const directionalLightYellow = new THREE.PointLight( 0xFFFB40, 1.5 , 100);
scene.add( directionalLightYellow );
directionalLightYellow.position.set(-1.45,2.45,-0.2)
const directionalLightGreen = new THREE.PointLight( 0x63FF63, 1.5 , 100);
scene.add( directionalLightGreen );
directionalLightGreen.position.set(-1.45,2.05,-0.2)

//const sphereSize = 1;
//const pointLightHelper = new THREE.PointLightHelper( directionalLightGreen, sphereSize );
//scene.add( pointLightHelper );

function set_to_red(el){
    el.children[2].material.color.set(0xFF3D3D); //red
    el.children[3].material.color.set(0x111111); //vert
    el.children[4].material.color.set(0x111111); // jaune
    directionalLightRed.visible = true
    directionalLightYellow.visible = false
    directionalLightGreen.visible = false
    //console.log(el.children[2])
    setTimeout(function() {
        set_to_green(el);
    }, 5000);
}
function set_to_orange(el){
    el.children[2].material.color.set(0x111111); //red
    el.children[3].material.color.set(0x111111); //vert
    el.children[4].material.color.set(0xFFFB40); // jaune
    directionalLightRed.visible = false
    directionalLightYellow.visible = true
    directionalLightGreen.visible = false
    setTimeout(function() {
        set_to_red(el);
    }, 2000);
}
function set_to_green(el){
    el.children[2].material.color.set(0x111111); //red
    el.children[3].material.color.set(0x63FF63); //vert
    el.children[4].material.color.set(0x111111); // jaune
    directionalLightRed.visible = false
    directionalLightYellow.visible = false
    directionalLightGreen.visible = true
    setTimeout(function() {
        set_to_orange(el);
    }, 5000);
}

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({
        color:'#444444',
        metalness:0,
        roughness:0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)


const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = textureLoader.load("elgato.png")
texture.colorSpace = THREE.SRGBColorSpace

//texture.colorSpace = THREE.SRGBColorSpace

// Object
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material = new THREE.MeshBasicMaterial({ map: texture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
mesh.position.y = 1;
mesh.rotation.z = Math.PI;

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const OrbitControl = new OrbitControls(camera, canvas)
OrbitControl.target.set( 0, 1, 0 );


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))
renderer.render(scene, camera)

let cursor = {
    x:0,
    y:0
}

window.addEventListener('mousemove', (event) => {
    cursor = { x: event.clientX, y: event.clientY };
  });

window.addEventListener('resize', (event) => {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height)

})

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    //mesh.rotation.y = elapsedTime

    mesh.rotation.x = cursor.y /5
    mesh.rotation.y = cursor.x /5

    //console.log(scene)

    var rand = randomIntFromInterval(50,110)
    var randBug = randomIntFromInterval(1,4)

    if(randBug == 2){
        spotLight.intensity = 0 //100
        directionalStreetLight.intensity = 0
    }else{
        spotLight.intensity = rand //100
        directionalStreetLight.intensity = rand/120
    }

    //console.log(model)
    if(model){

        let rotate_value = (cursor.x/window.screen.width*4)*4.25;

        if(rotate_value < 0){
            rotate_value = 0
        }
        if(rotate_value > 4.25){
            rotate_value = 4.25
        }

        //console.log(rotate_value)

        model.children[2].rotation.x = (rotate_value);
        //console.log(model.children[2].rotation.x)
    }

    window.requestAnimationFrame(tick)
    renderer.render(scene, camera)
}
tick()
