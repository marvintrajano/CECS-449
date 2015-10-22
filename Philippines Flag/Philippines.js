
var gl;

var vPosition, vPosition2;
var bufferId, bufferId2;
var program;

var blueVerts1 = new Float32Array([-1, 0.75, -0.15, 0, 1, 0.75]);
var blueVerts2 = new Float32Array([-0.15, 0, 1, 0.75, 1, 0]);
var redVerts1 = new Float32Array([-1, -0.75, -0.15, 0, 1, -0.75]);
var redVerts2 = new Float32Array([-0.15, 0, 1, -0.75, 1, 0]);
var starVerts1 = new Float32Array([-0.23, 0, -0.3, 0, -0.33, 0.05]);
var starVerts2 = new Float32Array([-0.23, 0, -0.3, 0, -0.33, -0.05]);
var starVerts3 = new Float32Array([-0.265, 0.075, -0.265, -0.075, -0.3, 0]);
var starVerts4 = new Float32Array([-0.96, 0.65, -0.93, 0.5, -0.92, 0.57]);
var starVerts5 = new Float32Array([-0.96, 0.65, -0.87, 0.56, -0.92, 0.57]);
var starVerts6 = new Float32Array([-0.92, 0.57, -0.985, 0.57, -0.9, 0.65]);
var starVerts7 = new Float32Array([-0.96, -0.65, -0.93, -0.5, -0.92, -0.57]);
var starVerts8 = new Float32Array([-0.96, -0.65, -0.87, -0.56, -0.92, -0.57]);
var starVerts9 = new Float32Array([-0.92, -0.57, -0.985, -0.57, -0.9, -0.65]);
var sunVerts = new Float32Array([-0.72, 0, -0.602, 0, -0.6117, 0.056, -0.6316, 0.0884, -0.6575, 0.12, -0.72, 0.1475, -0.7825, 0.12, -0.8084, 0.0884, -0.8283, 0.056, -0.842, 0, -0.8283, -0.056, -0.8084, -0.0884, -0.7825, -0.12, -0.72, -0.1475, -0.6575, -0.12, -0.6316, -0.0884, -0.6117, -0.056, -0.602, 0]);
var rayVerts1 = new Float32Array([-0.72, 0, -0.52, -0.05, -0.5, 0, -0.52, 0.05]);
var rayVerts2 = new Float32Array([-0.72, 0, -0.92, -0.05, -0.94, 0, -0.92, 0.05]);
var rayVerts3 = new Float32Array([-0.72, 0, -0.68, 0.24, -0.72, 0.27, -0.76, 0.24]);
var rayVerts4 = new Float32Array([-0.72, 0, -0.68, -0.24, -0.72, -0.27, -0.76, -0.24]);
var rayVerts5 = new Float32Array([-0.72, 0, -0.62, 0.20, -0.58, 0.18, -0.565, 0.12]);
var rayVerts6 = new Float32Array([-0.72, 0, -0.62, -0.20, -0.58, -0.18, -0.565, -0.12]);
var rayVerts7 = new Float32Array([-0.72, 0, -0.83, 0.20, -0.87, 0.18, -0.88, 0.12]);
var rayVerts8 = new Float32Array([-0.72, 0, -0.83, -0.20, -0.87, -0.18, -0.88, -0.12]);

var whiteVerts1 = new Float32Array([-0.72, 0, -0.4, -0.05, -0.4, -0.03]);
var whiteVerts2 = new Float32Array([-0.72, 0, -0.4, 0.05, -0.4, 0.03]);
var whiteVerts3 = new Float32Array([-0.72, 0, -1, -0.05, -1, -0.03]);
var whiteVerts4 = new Float32Array([-0.72, 0, -1, 0.05, -1, 0.03]);
var whiteVerts5 = new Float32Array([-0.72, 0, -0.7, 0.3, -0.68, 0.35]);
var whiteVerts6 = new Float32Array([-0.72, 0, -0.74, 0.3, -0.76, 0.35]);
var whiteVerts7 = new Float32Array([-0.72, 0, -0.7, -0.3, -0.68, -0.35]);
var whiteVerts8 = new Float32Array([-0.72, 0, -0.74, -0.3, -0.76, -0.35]);
var whiteVerts9 = new Float32Array([-0.72, 0, -0.54, -0.3, -0.52, -0.3]);
var whiteVerts10 = new Float32Array([-0.72, 0, -0.52, -0.2, -0.54, -0.2]);
var whiteVerts11 = new Float32Array([-0.72, 0, -0.54, 0.3, -0.52, 0.3]);
var whiteVerts12 = new Float32Array([-0.72, 0, -0.52, 0.2, -0.54, 0.2]);
var whiteVerts13 = new Float32Array([-0.72, 0, -0.92, 0.2, -0.94, 0.2]);
var whiteVerts14 = new Float32Array([-0.72, 0, -0.94, 0.3, -0.92, 0.3]);
var whiteVerts15 = new Float32Array([-0.72, 0, -0.92, -0.2, -0.94, -0.2]);
var whiteVerts16 = new Float32Array([-0.72, 0, -0.94, -0.3, -0.92, -0.3]);

var nameVerts1 = new Float32Array([-0.67, -1, -0.67, -0.8, -0.56, -0.8, -0.56, -0.9, -0.67, -0.9]);
var nameVerts2 = new Float32Array([-0.52, -1, -0.52, -0.8, -0.52, -0.9, -0.42, -0.9, -0.42, -0.8, -0.42, -1]);
var nameVerts3 = new Float32Array([-0.36, -1, -0.36, -0.8, -0.36, -0.9]);
var nameVerts4 = new Float32Array([-0.3, -1, -0.3, -0.8, -0.3, -1, -0.22, -1]);
var nameVerts5 = new Float32Array([-0.17, -1, -0.17, -0.8, -0.17, -0.9]);
var nameVerts6 = new Float32Array([-0.11, -1, -0.11, -0.8, 0, -0.8, 0, -0.9, -0.11, -0.9]);
var nameVerts7 = new Float32Array([0.04, -1, 0.04, -0.8, 0.15, -0.8, 0.15, -0.9, 0.04, -0.9]);
var nameVerts8 = new Float32Array([0.19, -1, 0.19, -0.8, 0.19, -0.9]);
var nameVerts9 = new Float32Array([0.25, -1, 0.25, -0.8, 0.36, -1, 0.36, -0.8]);
var nameVerts10 = new Float32Array([0.41, -1, 0.41, -0.8, 0.51, -0.8, 0.41, -0.8, 0.41, -0.9, 0.51, -0.9, 0.41, -0.9, 0.41, -1, 0.51, -1]);
var nameVerts11 = new Float32Array([0.55, -1, 0.65, -1, 0.65, -0.9, 0.55, -0.9, 0.55, -0.8, 0.65, -0.8]);

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    // Must be after initShaders
    var colorLocation = gl.getUniformLocation(program, "u_color");

    gl.useProgram( program );
    
    gl.clear( gl.COLOR_BUFFER_BIT );

    // Load the data into the GPU
	//Draw the blue parts
    bufferId1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId1 );
    gl.uniform4f(colorLocation, 0, 0.219, 0.65625, 1);
    gl.bufferData( gl.ARRAY_BUFFER, blueVerts1, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
    bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0.2190, 0.6563, 1);
    gl.bufferData( gl.ARRAY_BUFFER, blueVerts2, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	//Draw the red parts
	bufferId3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.8078, 0.0667, 0.1490, 1);
    gl.bufferData( gl.ARRAY_BUFFER, redVerts1, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId4 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.8078, 0.0667, 0.1490, 1);
    gl.bufferData( gl.ARRAY_BUFFER, redVerts2, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	//Draw the stars
	//1
	bufferId5 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, starVerts1, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId6 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, starVerts2, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId7 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, starVerts3, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	//2
	bufferId8 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, starVerts4, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId9 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, starVerts5, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

	bufferId10 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, starVerts6, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	//3
	bufferId11 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, starVerts7, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId12 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, starVerts8, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId13 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, starVerts9, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	//Draw the rays
	bufferId15 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, rayVerts1, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );

	bufferId16 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, rayVerts2, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	bufferId17 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, rayVerts3, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	bufferId18 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, rayVerts4, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	bufferId19 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, rayVerts5, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	bufferId20 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, rayVerts6, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	bufferId21 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, rayVerts7, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );

	bufferId22 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, rayVerts8, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	bufferId23 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts1, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId24 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts2, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId25 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts3, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId25 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts4, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId26 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts5, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId27 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts6, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId28 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts7, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId29 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts8, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId30 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts9, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId31 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts10, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId32 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts11, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId33 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts12, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId34 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts13, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId35 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts14, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId36 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts15, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	bufferId37 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 1, 1, 1, 1);
    gl.bufferData( gl.ARRAY_BUFFER, whiteVerts16, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
    //Draw the sun
	bufferId14 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0.9882, 0.8196, 0.0863, 1);
    gl.bufferData( gl.ARRAY_BUFFER, sunVerts, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 18 );
	
	//Write the flag name
	bufferId55 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts1, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 5 );
	
	bufferId56 = gl.createBuffer(); 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts2, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 6 );
	
	bufferId57 = gl.createBuffer(); 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts3, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 3 );
	
	bufferId58 = gl.createBuffer(); 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts4, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 4 );

	bufferId59 = gl.createBuffer(); 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts5, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 3 );
	
	bufferId60 = gl.createBuffer(); 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts6, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 5 );
	
	bufferId61 = gl.createBuffer(); 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts7, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 5 );
	
	bufferId62 = gl.createBuffer(); 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts8, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 3 );
	
	bufferId63 = gl.createBuffer(); 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts9, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 4 );
	
	bufferId64 = gl.createBuffer(); 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts10, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 9 );
	
	bufferId65 = gl.createBuffer(); 
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.uniform4f(colorLocation, 0, 0, 0, 1);
    gl.bufferData( gl.ARRAY_BUFFER, nameVerts11, gl.STATIC_DRAW );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.LINE_STRIP, 0, 6 );
};


