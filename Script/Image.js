// texture loader
const textureLoader = new THREE.TextureLoader();

// POSTER

// your picture
const guyGardenerMat = new THREE.MeshLambertMaterial( { map: textureLoader.load( 'img/GUY GARDNER.jpg' ), side: THREE.DoubleSide } );

// poster geo n stuff
const bedPosterGeo = new THREE.PlaneGeometry( 1.1, 1.5 );
const bedPoster = new THREE.Mesh( bedPosterGeo, guyGardenerMat );
bedPoster.position.set( -6.94, 3, -0.9 );
bedPoster.rotation.y = Math.PI / 2; // faces into the room, same as the left wall
scene.add( bedPoster );

// MEAT

// meat texture
const meatMat = new THREE.MeshLambertMaterial( { map: textureLoader.load( 'img/meat.jpg' ) } );

// cube geo n stuff
const meatCubeGeo = new THREE.BoxGeometry( 0.6, 0.6, 0.6 );
const meatCube = new THREE.Mesh( meatCubeGeo, meatMat );
meatCube.position.set( 2.5, 0.3, -1 );
meatCube.castShadow = true;
meatCube.receiveShadow = true;
scene.add( meatCube );