const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x1b2a3a );

const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 5, 9, 5  );
camera.lookAt( 1, 2, 0 );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const ambientLight = createAmbientLight();
scene.add( ambientLight );

const sunLight = createSunLight();
sunLight.castShadow = true;
sunLight.shadow.mapSize.set( 2048, 2048 );
sunLight.shadow.camera.left = -10;
sunLight.shadow.camera.right = 10;
sunLight.shadow.camera.top = 10;
sunLight.shadow.camera.bottom = -10;
scene.add( sunLight );

// TEXTURES
const woodFloorTexture = createWoodFloorTexture();
const wallTexture = createPlasterTexture( "#3a3430" );
const ceilingTexture = createPlasterTexture( "#2b2723" );
const cabinetWoodTexture = createWoodFloorTexture();
cabinetWoodTexture.repeat.set( 1, 2 );
const blanketTexture = createFabricTexture( "#33454f", "#3d515c" );
const mattressTexture = createFabricTexture( "#cfc6b4", "#d9d1c0" );
const rugOuterTexture = createRugTexture( "#0a4a29" );
const rugMidTexture = createRugTexture( "#b9d6c4" );

// FLOOR
const floorGeometry = new THREE.PlaneGeometry( 14, 12 );
const floorMaterial = new THREE.MeshStandardMaterial( { map: woodFloorTexture, roughness: 0.85 } );
const floor = new THREE.Mesh( floorGeometry, floorMaterial );
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add( floor );
// BACK WALL
const backWallGeometry = new THREE.PlaneGeometry( 14, 6 );
const wallMaterial = new THREE.MeshStandardMaterial( { map: wallTexture, side: THREE.DoubleSide, roughness: 0.95 } );
const backWall = new THREE.Mesh( backWallGeometry, wallMaterial );
backWall.position.set( 0, 3, -6 );
backWall.receiveShadow = true;
scene.add( backWall );
// LEFT WALL
const leftWallGeometry = new THREE.PlaneGeometry( 12, 6 );
const leftWall = new THREE.Mesh( leftWallGeometry, wallMaterial );
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set( -7, 3, 0 );
leftWall.receiveShadow = true;
scene.add( leftWall );
// RIGHT WALL
const rightWallGeometry = new THREE.PlaneGeometry( 12, 6 );
const rightWall = new THREE.Mesh( leftWallGeometry, wallMaterial );
rightWall.rotation.y = Math.PI / 2;
rightWall.position.set( 7, 3, 0 );
rightWall.receiveShadow = true;
scene.add( rightWall );
// CEILING
const ceilingGeometry = new THREE.PlaneGeometry( 14, 12 );
const ceilingMaterial = new THREE.MeshStandardMaterial( { map: ceilingTexture, roughness: 0.95 } );
const ceiling = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
ceiling.rotation.x = Math.PI / 2;
ceiling.position.set( 0, 6, 0 );
ceiling.receiveShadow = true;
scene.add( ceiling );
// WINDOW
const windowFrameGeometry = new THREE.BoxGeometry( 2.4, 2, 0.1 );
const windowFrameMaterial = new THREE.MeshStandardMaterial( { color: 0x3a2418 } );
const windowGlassGeometry = new THREE.PlaneGeometry( 2.1, 1.7 );
const windowGlassMaterial = new THREE.MeshStandardMaterial( { color: 0x6fa0c2, emissive: 0x5b8fb5, emissiveIntensity: 0.35 } );

const windowFrameA = new THREE.Mesh( windowFrameGeometry, windowFrameMaterial );
windowFrameA.position.set( -3, 3.5, -5.94 );
windowFrameA.castShadow = true;
scene.add( windowFrameA );

const windowGlassA = new THREE.Mesh( windowGlassGeometry, windowGlassMaterial );
windowGlassA.position.set( -3, 3.5, -5.88 );
scene.add( windowGlassA );

const windowFrameB = new THREE.Mesh( windowFrameGeometry, windowFrameMaterial );
windowFrameB.position.set( 3, 3.5, -5.94 );
windowFrameB.castShadow = true;
scene.add( windowFrameB );

const windowGlassB = new THREE.Mesh( windowGlassGeometry, windowGlassMaterial );
windowGlassB.position.set( 3, 3.5, -5.88 );
scene.add( windowGlassB );
// WINDOW LIGHTS
const windowLightA = createWindowLight();
windowLightA.position.set( -3, 3.5, -5.5 );
scene.add( windowLightA );

const windowLightB = createWindowLight();
windowLightB.position.set( 3, 3.5, -5.5 );
scene.add( windowLightB );
// BED FRAME
const bedFrameGeometry = new THREE.BoxGeometry( 3.4, 0.4, 5.2 );
const bedFrameMaterial = new THREE.MeshStandardMaterial( { color: 0x40281a, roughness: 0.7 } );
const bedFrame = new THREE.Mesh( bedFrameGeometry, bedFrameMaterial );
bedFrame.position.set( -5.2, 0.4, -3.3 );
bedFrame.castShadow = true;
scene.add( bedFrame );

const headboardGeometry = new THREE.BoxGeometry( 3.4, 1.4, 0.2 );
const headboard = new THREE.Mesh( headboardGeometry, bedFrameMaterial );
headboard.position.set( -5.2, 1.1, -5.9 );
headboard.castShadow = true;
scene.add( headboard );
// MATTRESS
const mattressGeometry = new THREE.BoxGeometry( 3.2, 0.35, 5 );
const mattressMaterial = new THREE.MeshStandardMaterial( { map: mattressTexture, roughness: 0.9 } );
const mattress = new THREE.Mesh( mattressGeometry, mattressMaterial );
mattress.position.set( -5.2, 0.78, -3.3 );
mattress.castShadow = true;
scene.add( mattress );
// BLANKET
const blanketGeometry = new THREE.BoxGeometry( 3.24, 0.18, 3.2 );
const blanketMaterial = new THREE.MeshStandardMaterial( { map: blanketTexture, roughness: 0.95 } );
const blanket = new THREE.Mesh( blanketGeometry, blanketMaterial );
blanket.position.set( -5.2, 1, -2.3 );
blanket.castShadow = true;
scene.add( blanket );
// PILLOW
const pillowGeometry = new THREE.BoxGeometry( 1.2, 0.25, 0.8 );
const pillowMaterial = new THREE.MeshStandardMaterial( { color: 0xe8e4d8, roughness: 0.9 } );
const pillowLeft = new THREE.Mesh( pillowGeometry, pillowMaterial );
pillowLeft.position.set( -5.95, 1.05, -5.45 );
pillowLeft.castShadow = true;
scene.add( pillowLeft );

const pillowRight = new THREE.Mesh( pillowGeometry, pillowMaterial );
pillowRight.position.set( -4.45, 1.05, -5.45 );
pillowRight.castShadow = true;
scene.add( pillowRight );
// DESKTOP
const deskTopGeometry = new THREE.BoxGeometry( 1.2, 0.12, 2.6 );
const deskMaterial = new THREE.MeshStandardMaterial( { color: 0x5c3d24, roughness: 0.75 } );
const deskTop = new THREE.Mesh( deskTopGeometry, deskMaterial );
deskTop.position.set( -6.3, 1.5, 1.5 );
deskTop.castShadow = true;
scene.add( deskTop );

const deskLegGeometry = new THREE.BoxGeometry( 0.1, 1.5, 0.1 );
const deskLegPositions = [
  [ -6.7, 0.75, 0.4 ],
  [ -6.7, 0.75, 2.6 ],
  [ -5.9, 0.75, 0.4 ],
  [ -5.9, 0.75, 2.6 ],
];
deskLegPositions.forEach( ( position ) => {
  const deskLeg = new THREE.Mesh( deskLegGeometry, deskMaterial );
  deskLeg.position.set( position[ 0 ], position[ 1 ], position[ 2 ] );
  deskLeg.castShadow = true;
scene.add( deskLeg );
} );
// MONITOR
const monitorStandGeometry = new THREE.CylinderGeometry( 0.05, 0.08, 0.35, 12 );
const monitorMaterial = new THREE.MeshStandardMaterial( { color: 0x141414 } );
const monitorStand = new THREE.Mesh( monitorStandGeometry, monitorMaterial );
monitorStand.position.set( -6.3, 1.68, 1.2 );
monitorStand.castShadow = true;
scene.add( monitorStand );

const monitorScreenGeometry = new THREE.BoxGeometry( 0.9, 0.55, 0.04 );
const monitorScreen = new THREE.Mesh( monitorScreenGeometry, monitorMaterial );
monitorScreen.position.set( -6.3, 2.15, 1.2 );
monitorScreen.castShadow = true;
scene.add( monitorScreen );
// SCREEN
const screenDisplayGeometry = new THREE.PlaneGeometry( 0.8, 0.46 );
const screenDisplayMaterial = new THREE.MeshStandardMaterial( { color: 0x6fb8e0, emissive: 0x6fb8e0, emissiveIntensity: 0.35 } );
const screenDisplay = new THREE.Mesh( screenDisplayGeometry, screenDisplayMaterial );
screenDisplay.position.set( -6.3, 2.15, 1.22 );
scene.add( screenDisplay );
// KEYBOARD
const keyboardGeometry = new THREE.BoxGeometry( 0.65, 0.03, 0.22 );
const keyboardMaterial = new THREE.MeshStandardMaterial( { color: 0xcfcfcf } );
const keyboard = new THREE.Mesh( keyboardGeometry, keyboardMaterial );
keyboard.position.set( -6.3, 1.57, 2.2 );
keyboard.castShadow = true;
scene.add( keyboard );
// crazy chair
const chairSeatGeometry = new THREE.BoxGeometry( 0.7, 0.1, 0.7 );
const chairMaterial = new THREE.MeshStandardMaterial( { color: 0x1c1c1c } );
const chairSeat = new THREE.Mesh( chairSeatGeometry, chairMaterial );
chairSeat.position.set( -6.3, 0.9, 3.2 );
chairSeat.castShadow = true;
scene.add( chairSeat );

const chairBackGeometry = new THREE.BoxGeometry( 0.7, 0.8, 0.1 );
const chairBack = new THREE.Mesh( chairBackGeometry, chairMaterial );
chairBack.position.set( -6.3, 1.3, 3.5 );
chairBack.castShadow = true;
scene.add( chairBack );

const chairPoleGeometry = new THREE.CylinderGeometry( 0.05, 0.05, 0.85, 12 );
const chairPole = new THREE.Mesh( chairPoleGeometry, chairMaterial );
chairPole.position.set( -6.3, 0.475, 3.2 );
chairPole.castShadow = true;
scene.add( chairPole );
//  DESK
const deskLamp = createDeskLamp();
deskLamp.position.set( -6.7, 1.58, 0.8 );
deskLamp.castShadow = true;
scene.add( deskLamp );
// CEILING LIGHT
const ceilingLight = createCeilingLight();
ceilingLight.position.set( 0.5, 5.7, 2 );
ceilingLight.castShadow = true;
scene.add( ceilingLight );
// RUG (faze rug)
const rugOuterGeometry = new THREE.CircleGeometry( 1.6, 64 );
const rugOuterMaterial = new THREE.MeshStandardMaterial( { map: rugOuterTexture, roughness: 0.95 } );
const rugOuter = new THREE.Mesh( rugOuterGeometry, rugOuterMaterial );
rugOuter.rotation.x = -Math.PI / 2;
rugOuter.position.set( 0.5, 0.015, 2.5 );
rugOuter.receiveShadow = true;
scene.add( rugOuter );

const rugMidGeometry = new THREE.CircleGeometry( 1.3, 64 );
const rugMidMaterial = new THREE.MeshStandardMaterial( { map: rugMidTexture, roughness: 0.95 } );
const rugMid = new THREE.Mesh( rugMidGeometry, rugMidMaterial );
rugMid.rotation.x = -Math.PI / 2;
rugMid.position.set( 0.5, 0.02, 2.5 );
scene.add( rugMid );

const rugInnerRingGeometry = new THREE.CircleGeometry( 1.0, 64 );
const rugInnerRingMaterial = new THREE.MeshStandardMaterial( { map: rugOuterTexture, roughness: 0.95 } );
const rugInnerRing = new THREE.Mesh( rugInnerRingGeometry, rugInnerRingMaterial );
rugInnerRing.rotation.x = -Math.PI / 2;
rugInnerRing.position.set( 0.5, 0.025, 2.5 );
scene.add( rugInnerRing );

const rugCenterGeometry = new THREE.CircleGeometry( 0.55, 64 );
const rugCenterMaterial = new THREE.MeshStandardMaterial( { map: rugMidTexture, roughness: 0.95 } );
const rugCenter = new THREE.Mesh( rugCenterGeometry, rugCenterMaterial );
rugCenter.rotation.x = -Math.PI / 2;
rugCenter.position.set( 0.5, 0.03, 2.5 );
scene.add( rugCenter );
// PLANT
const plantPotGeometry = new THREE.CylinderGeometry( 0.28, 0.2, 0.4, 16 );
const plantPotMaterial = new THREE.MeshStandardMaterial( { color: 0x6f3d22, roughness: 0.85 } );
const plantPot = new THREE.Mesh( plantPotGeometry, plantPotMaterial );
plantPot.position.set( 6.2, 0.2, 4.5 );
plantPot.castShadow = true;
scene.add( plantPot );

const plantLeafGeometry = new THREE.SphereGeometry( 0.3, 8, 8 );
const plantLeafMaterial = new THREE.MeshStandardMaterial( { color: 0x274d27 } );
const plantLeaf = new THREE.Mesh( plantLeafGeometry, plantLeafMaterial );
plantLeaf.position.set( 6.2, 0.75, 4.5 );
plantLeaf.scale.set( 0.7, 1, 0.7 );
plantLeaf.castShadow = true;
scene.add( plantLeaf );
// CABINET (against the right wall, near the bed)
const cabinetMaterial = new THREE.MeshStandardMaterial( { map: cabinetWoodTexture, roughness: 0.7 } );
const cabinetTrimMaterial = new THREE.MeshStandardMaterial( { color: 0x2a1a10, roughness: 0.7 } );
const cabinetKnobMaterial = new THREE.MeshStandardMaterial( { color: 0xd4af37, metalness: 0.6, roughness: 0.3 } );

const cabinetBodyGeometry = new THREE.BoxGeometry( 0.55, 2, 1.3 );
const cabinetBody = new THREE.Mesh( cabinetBodyGeometry, cabinetMaterial );
cabinetBody.position.set( 6.7, 1.15, -4.3 );
cabinetBody.castShadow = true;
cabinetBody.receiveShadow = true;
scene.add( cabinetBody );

// door seam 
const cabinetSeamGeometry = new THREE.BoxGeometry( 0.02, 1.9, 0.02 );
const cabinetSeam = new THREE.Mesh( cabinetSeamGeometry, cabinetTrimMaterial );
cabinetSeam.position.set( 6.43, 1.15, -4.3 );
scene.add( cabinetSeam );

// top trim 
const cabinetTopGeometry = new THREE.BoxGeometry( 0.62, 0.08, 1.4 );
const cabinetTop = new THREE.Mesh( cabinetTopGeometry, cabinetTrimMaterial );
cabinetTop.position.set( 6.7, 2.19, -4.3 );
cabinetTop.castShadow = true;
scene.add( cabinetTop );

// door knobs
const cabinetKnobGeometry = new THREE.SphereGeometry( 0.04, 10, 10 );
const cabinetKnobLeft = new THREE.Mesh( cabinetKnobGeometry, cabinetKnobMaterial );
cabinetKnobLeft.position.set( 6.42, 1.15, -4.65 );
scene.add( cabinetKnobLeft );

const cabinetKnobRight = new THREE.Mesh( cabinetKnobGeometry, cabinetKnobMaterial );
cabinetKnobRight.position.set( 6.42, 1.15, -3.95 );
scene.add( cabinetKnobRight );

// short legs
const cabinetLegGeometry = new THREE.CylinderGeometry( 0.04, 0.04, 0.16, 10 );
const cabinetLegPositions = [
  [ 6.48, 0.08, -4.9 ],
  [ 6.48, 0.08, -3.7 ],
  [ 6.92, 0.08, -4.9 ],
  [ 6.92, 0.08, -3.7 ],
];
cabinetLegPositions.forEach( ( position ) => {
  const cabinetLeg = new THREE.Mesh( cabinetLegGeometry, cabinetTrimMaterial );
  cabinetLeg.position.set( position[ 0 ], position[ 1 ], position[ 2 ] );
  cabinetLeg.castShadow = true;
  scene.add( cabinetLeg );
} );

window.addEventListener( "resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
} );

function animate() {
  renderer.render( scene, camera );
}