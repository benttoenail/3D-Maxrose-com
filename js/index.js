/*
3D website Prototype
as of 160713
Max Rose
*/

//Init of camera, scene and renderer
var scene = new THREE.Scene();
var clock = new THREE.Clock();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({alpha : true, preserveDrawingBuffer: true});

//Init of Renderer and Canvas
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xf7e6f6, 0);

//Camera Controls
var controls;
controls = new THREE.OrbitControls( camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
camera.position.z = 10;

//Ground Helper
var ground = new THREE.GridHelper(10, 0.5, 0xd3d3d3, 0xd3d3d3);
ground.position.y = - 2;
//scene.add(ground);

//Lights
var light = new THREE.DirectionalLight(0xfffff, 1);
light.position.set(10, 10, 5);
scene.add(light);

var ambLight = new THREE.AmbientLight(0xfffff, 1);
scene.add(ambLight);

//Resize Window
var winResize = new THREEx.WindowResize(renderer, camera);


// -- -- -- CREATE GEO WITH RANDOM POINTS -- -- -- \\

var material = new THREE.MeshLambertMaterial({ color: 0x41433f});
var customGeo = new THREE.Geometry();
var verts = [];

function InitCustomGeo(){
    //create the points
    for(var i = 0; i < 500; i++){

        var x = Math.random();
        var y = Math.random();
        var z = Math.random();
        var vertex = new THREE.Vector3(x, y, z);

        verts.push(new THREE.Vector3(x, y, z));
        customGeo.vertices.push(vertex);

    }
    //push the points into the mesh
    for(var j = 0; j < verts.length; j+=4){

        customGeo.faces.push(new THREE.Face3(j, j+1, j+2));   
    }

    customGeo.computeFaceNormals();
    var customMesh = new THREE.Mesh(customGeo, material);
    customMesh.material.side = THREE.DoubleSide;

    scene.add(customMesh);
}

// -- -- -- END CUSTOM GEO -- -- -- \\


function AnimateScene(){
    
    var time = clock.getElapsedTime();
    
    customGeo.verticesNeedUpdate = true;
    var rand = Math.random();
    var speed = time / 10;
    
    for(var i = 0; i < customGeo.vertices.length; i++){ 
        
        var x = Math.sin(speed+i * .1);
        var y = Math.sin(speed+i * .4);
        var z = Math.sin(time);
        
        customGeo.vertices[i].x = x * i / 20;
        customGeo.vertices[i].y = customGeo.vertices[i].y + y / i;
        
    }
    
    
}

// -- -- -- END GEO RANDOM POINTS -- -- -- \\

//Basic Box Setup 

var geometry = new THREE.BoxGeometry(1, 1, 1);
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);

//Main Render Function 
var render = function() {
    requestAnimationFrame( render );
    
    AnimateScene();

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    controls.update();
    renderer.render(scene, camera);
};

InitCustomGeo();
render();