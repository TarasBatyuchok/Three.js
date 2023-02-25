import  * as THREE from 'three';
import gsap from "gsap"
import  './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



//scene
const scene = new THREE.Scene();

//crete our Sphere
const geometry = new THREE.SphereGeometry( 3, 64, 64)
const material = new THREE.MeshStandardMaterial( { color: 0xffff } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

//Sizes
const sizes  ={
    width: window.innerWidth,
    height: window.innerHeight
}

// light

const light = new THREE.PointLight(0xffff, 1, 100);
light.position.set(0,10,10)
scene.add(light);

// Camera
const camera  = new THREE.PerspectiveCamera(45 , sizes.width / sizes.height,0.1, 100);
camera.position.z = 30
scene.add(camera);




//Render
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2)
renderer.render(scene, camera);

// Resize

window.addEventListener('resize', () =>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // update camera

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true

// rerender  size
const loop =()=>{
  controls.update()
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}
loop();

// magic

const tl = gsap.timeline({defaults: {duration: 1}});

tl.fromTo(mesh.scale, {z:0, x:0, y:0 }, {z:1, x: 1, y: 1})
tl.fromTo("nav", { y: '-100%'}, {y: '0%'})
tl.fromTo('.title', { opacity: 0}, {opacity: 1})

// Mouse animation color
let mouseDown = false
let rgb = [];
window.addEventListener('mousedown', ()=> (mouseDown = true))
window.addEventListener("mouseup", ()=> (mouseDown = false))


window.addEventListener('mousemove', (e)=>{
    if(mouseDown){
      rgb = [
        Math.round((e.pageX /sizes.width) * 255),
        Math.round((e.pageY /sizes.height) * 255),
        150,
      ]
      //  Animation
      let newColor =new THREE.Color(`rgb(${rgb.join(',')})`)
      new THREE.Color(`rgb(0,100,150)`)
      gsap.to(mesh.material.color, {r:newColor.r, g:newColor.g, b:newColor.b})
    }
});