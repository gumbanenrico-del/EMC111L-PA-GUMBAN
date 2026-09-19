// LIGHT
function createAmbientLight() {
  return new THREE.AmbientLight( 0x30343a, 0.7 );
}
// SUN LIGHT
function createSunLight() {
  const sunLight = new THREE.DirectionalLight( 0xffdca8, 0.55 );
  sunLight.position.set( -6, 8, -5 );
  return sunLight;
}
// DESK LAMP
function createDeskLamp() {
  const lamp = new THREE.Group();

  const baseGeometry = new THREE.CylinderGeometry( 0.12, 0.14, 0.04, 20 );
  const lampMaterial = new THREE.MeshStandardMaterial( { color: 0x222222 } );
  const base = new THREE.Mesh( baseGeometry, lampMaterial );
  lamp.add( base );

  const shadeGeometry = new THREE.ConeGeometry( 0.16, 0.25, 20 );
  const shadeMaterial = new THREE.MeshStandardMaterial( { color: 0xf2c14e, emissive: 0xf2c14e, emissiveIntensity: 0.6 } );
  const shade = new THREE.Mesh( shadeGeometry, shadeMaterial );
  shade.position.y = 0.37;
  lamp.add( shade );

  const lampLight = new THREE.PointLight( 0xffe9b3, 0.9, 4 );
  lampLight.position.y = 0.32;
  lamp.add( lampLight );

  return lamp;
}
//CEILING LIGHT
function createCeilingLight() {
  const fixture = new THREE.Group();

  const bulbGeometry = new THREE.SphereGeometry( 0.22, 16, 16 );
  const bulbMaterial = new THREE.MeshStandardMaterial( { color: 0xfff4d6, emissive: 0xfff0c0, emissiveIntensity: 0.5 } );
  const bulb = new THREE.Mesh( bulbGeometry, bulbMaterial );
  fixture.add( bulb );

  const ceilingPointLight = new THREE.PointLight( 0xffe9c2, 0.5, 15 );
  fixture.add( ceilingPointLight );

  return fixture;
}
// WINDOW LIGHT
function createWindowLight() {
  const fixture = new THREE.Group();

  // soft cool glow sitting just inside the glass
  const glow = new THREE.PointLight( 0xbfe3ff, 0.7, 7, 2 );
  fixture.add( glow );

  // gentle directional fill so shadows read as sunlight streaming in
  const beam = new THREE.SpotLight( 0xdff0ff, 0.5, 9, Math.PI / 4, 0.6, 1 );
  beam.position.set( 0, 0, 0 );
  fixture.add( beam );

  const beamTarget = new THREE.Object3D();
  beamTarget.position.set( 0, -2, 4 );
  fixture.add( beamTarget );
  beam.target = beamTarget;

  return fixture;
}
// POSTER FRAME
// Returns a group: a wooden frame + a flat canvas plane named "posterCanvas".
// The canvas starts as a plain placeholder color — swap in your own photo by
// loading a texture and assigning it to that mesh's material.map (see main.js).
function createPosterFrame( width = 1.3, height = 1.7 ) {
  const group = new THREE.Group();

  const frameGeometry = new THREE.BoxGeometry( width + 0.12, height + 0.12, 0.06 );
  const frameMaterial = new THREE.MeshStandardMaterial( { color: 0x2a1a10, roughness: 0.6 } );
  const frame = new THREE.Mesh( frameGeometry, frameMaterial );
  frame.castShadow = true;
  group.add( frame );

  const canvasGeometry = new THREE.PlaneGeometry( width, height );
  const placeholderMaterial = new THREE.MeshStandardMaterial( { color: 0xd8d3c8, roughness: 0.85 } );
  const posterCanvas = new THREE.Mesh( canvasGeometry, placeholderMaterial );
  posterCanvas.name = "posterCanvas";
  posterCanvas.position.z = 0.031;
  group.add( posterCanvas );

  return group;
}

// ---------------------------------------------------------
// PROCEDURAL TEXTURES
// Generated on canvas at runtime, no external image files needed.
// ---------------------------------------------------------

// WOOD FLOOR TEXTURE (planks + grain)
function createWoodFloorTexture() {
  const canvas = document.createElement( "canvas" );
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext( "2d" );

  // base plank color
  ctx.fillStyle = "#3e2a1c";
  ctx.fillRect( 0, 0, 512, 512 );

  // individual planks
  const plankHeight = 64;
  for ( let y = 0; y < 512; y += plankHeight ) {
    const shade = 20 + Math.random() * 18;
    ctx.fillStyle = `rgb(${ 62 - shade * 0.4 }, ${ 42 - shade * 0.3 }, ${ 28 - shade * 0.2 })`;
    ctx.fillRect( 0, y, 512, plankHeight - 2 );

    // grain streaks
    for ( let i = 0; i < 8; i++ ) {
      ctx.strokeStyle = `rgba(0,0,0,${ Math.random() * 0.15 + 0.05 })`;
      ctx.lineWidth = Math.random() * 1.5 + 0.3;
      ctx.beginPath();
      const gy = y + Math.random() * plankHeight;
      ctx.moveTo( 0, gy );
      ctx.bezierCurveTo( 160, gy + ( Math.random() * 8 - 4 ), 340, gy + ( Math.random() * 8 - 4 ), 512, gy + ( Math.random() * 6 - 3 ) );
      ctx.stroke();
    }

    // plank seam
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo( 0, y );
    ctx.lineTo( 512, y );
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture( canvas );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 5, 4 );
  return texture;
}

// PLASTER WALL TEXTURE (subtle speckled noise)
function createPlasterTexture( baseColor ) {
  const canvas = document.createElement( "canvas" );
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext( "2d" );

  ctx.fillStyle = baseColor;
  ctx.fillRect( 0, 0, 256, 256 );

  const imageData = ctx.getImageData( 0, 0, 256, 256 );
  const data = imageData.data;
  for ( let i = 0; i < data.length; i += 4 ) {
    const noise = ( Math.random() - 0.5 ) * 18;
    data[ i ] = Math.min( 255, Math.max( 0, data[ i ] + noise ) );
    data[ i + 1 ] = Math.min( 255, Math.max( 0, data[ i + 1 ] + noise ) );
    data[ i + 2 ] = Math.min( 255, Math.max( 0, data[ i + 2 ] + noise ) );
  }
  ctx.putImageData( imageData, 0, 0 );

  // faint patchy blotches for plaster feel
  for ( let i = 0; i < 30; i++ ) {
    ctx.fillStyle = `rgba(0,0,0,${ Math.random() * 0.05 })`;
    ctx.beginPath();
    ctx.arc( Math.random() * 256, Math.random() * 256, Math.random() * 30 + 10, 0, Math.PI * 2 );
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture( canvas );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 3, 2 );
  return texture;
}

// WOVEN FABRIC TEXTURE (blanket / mattress)
function createFabricTexture( colorA, colorB ) {
  const canvas = document.createElement( "canvas" );
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext( "2d" );

  ctx.fillStyle = colorA;
  ctx.fillRect( 0, 0, 128, 128 );

  const weave = 8;
  ctx.fillStyle = colorB;
  for ( let y = 0; y < 128; y += weave ) {
    for ( let x = 0; x < 128; x += weave ) {
      if ( ( x / weave + y / weave ) % 2 === 0 ) {
        ctx.fillRect( x, y, weave, weave );
      }
    }
  }

  // soft texture
  const imageData = ctx.getImageData( 0, 0, 128, 128 );
  const data = imageData.data;
  for ( let i = 0; i < data.length; i += 4 ) {
    const noise = ( Math.random() - 0.5 ) * 12;
    data[ i ] += noise;
    data[ i + 1 ] += noise;
    data[ i + 2 ] += noise;
  }
  ctx.putImageData( imageData, 0, 0 );

  const texture = new THREE.CanvasTexture( canvas );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 6, 6 );
  return texture;
}

// RUG TEXtuRE (FAZE RUGGGG)
function createRugTexture( baseColor ) {
  const canvas = document.createElement( "canvas" );
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext( "2d" );

  ctx.fillStyle = baseColor;
  ctx.fillRect( 0, 0, 256, 256 );

  for ( let i = 0; i < 900; i++ ) {
    ctx.fillStyle = `rgba(255,255,255,${ Math.random() * 0.05 })`;
    ctx.fillRect( Math.random() * 256, Math.random() * 256, 1.5, 1.5 );
    ctx.fillStyle = `rgba(0,0,0,${ Math.random() * 0.06 })`;
    ctx.fillRect( Math.random() * 256, Math.random() * 256, 1.5, 1.5 );
  }

  const texture = new THREE.CanvasTexture( canvas );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 2, 2 );
  return texture;
}