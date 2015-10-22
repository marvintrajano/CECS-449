
var canvas;
var gl;

var NumVertices  = 36;

var points = [];
var points2 = [];
var colors = [];

var axis1 = 0;
var axis2 = 0;
var center2 = [ 0, 0, 0 ];
var center1 = [ -0.5, 0, 0 ];
var rotate2 = [ 0, 0, 0 ];
var rotate1 = [ 0, 0, 0 ];
var translate2 = [ 0.5, 0, 0 ];
var translate1 = [ -0.5, 0, 0 ];
var scale2 = [ 0.75, 0.75, 0.75 ];
var scale1 = [ 0.75, 0.75, 0.75 ];

var positive1 = true;
var positive2 = true;

var cube = 1;

var program1;
var program2;

var cBuffer1;
var cBuffer2;
var vBuffer1;
var vBuffer2;
var cubeVerticesTextureCoordBuffer;
var cubeVerticesBuffer;
var cubeVerticesIndexBuffer;

  
var verticesTest = [
    // Front face
    -0.25, -0.25,  0.25,
     0.25, -0.25,  0.25,
     0.25,  0.25,  0.25,
    -0.25,  0.25,  0.25,
    
    // Back face
    -0.25, -0.25, -0.25,
    -0.25,  0.25, -0.25,
     0.25,  0.25, -0.25,
     0.25, -0.25, -0.25,
    
    // Top face
    -0.25,  0.25, -0.25,
    -0.25,  0.25,  0.25,
     0.25,  0.25,  0.25,
     0.25,  0.25, -0.25,
    
    // Bottom face
    -0.25, -0.25, -0.25,
     0.25, -0.25, -0.25,
     0.25, -0.25,  0.25,
    -0.25, -0.25,  0.25,
    
    // Right face
     0.25, -0.25, -0.25,
     0.25,  0.25, -0.25,
     0.25,  0.25,  0.25,
     0.25, -0.25,  0.25,
    
    // Left face
    -0.25, -0.25, -0.25,
    -0.25, -0.25,  0.25,
    -0.25,  0.25,  0.25,
    -0.25,  0.25, -0.25
  ];
  
var cubeVertexIndices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
  ];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	cBuffer1 = gl.createBuffer();
    cBuffer2 = gl.createBuffer();
	vBuffer1 = gl.createBuffer();
	vBuffer2 = gl.createBuffer();
	cubeVerticesTextureCoordBuffer = gl.createBuffer();
	cubeVerticesBuffer = gl.createBuffer();
	cubeVerticesIndexBuffer = gl.createBuffer();
	
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
	program1 = initShaders( gl, "vertex-shader", "fragment-shader" );
	program2 = initShaders( gl, "texturevertex-shader", "texturefragment-shader" );
    

	cubeTexture = gl.createTexture();
	cubeImage = new Image();
	cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
	cubeImage.crossOrigin = "anonymous";
	cubeImage.src = "http://i.imgur.com/Y8IRBCa.jpg";

  

    //Buttons
    document.getElementById( "cButton" ).onclick = function () {
		if(cube == 1)
		{
			document.getElementById( "cButton" ).value="Cube 2";
			cube = 2;
		}
		else if(cube == 2)
		{
			document.getElementById( "cButton" ).value="Cube 1";
			cube = 1;
		}
    };    
    document.getElementById( "xButtonP" ).onclick = function () {
		if(cube == 1)
		{
			axis1 = 0;
			positive1 = true;
		}
		else if(cube == 2)
		{
			axis2 = 0;
			positive2 = true;
		}
    };
	document.getElementById( "xButtonN" ).onclick = function () {
		if(cube == 1)
		{
			axis1 = 0;
			positive1 = false;
		}
		else if(cube == 2)
		{
			axis2 = 0;
			positive2 = false;
		}
    };
    document.getElementById( "yButtonP" ).onclick = function () {
		if(cube == 1)
		{
			axis1 = 1;
			positive1 = true;
		}
		else if(cube == 2)
		{
			axis2 = 1;
			positive2 = true;
		}
    };
	document.getElementById( "yButtonN" ).onclick = function () {
        if(cube == 1)
		{
			axis1 = 1;
			positive1 = false;
		}
		else if(cube == 2)
		{
			axis2 = 1;
			positive2 = false;
		}
    };
    document.getElementById( "zButtonP" ).onclick = function () {
		if(cube == 1)
		{
			axis1 = 2;
			positive1 = true;
		}
		else if(cube == 2)
		{
			axis2 = 2;
			positive2 = true;
		}
    };
	document.getElementById( "zButtonN" ).onclick = function () {
		if(cube == 1)
		{
			axis1 = 2;
			positive1 = false;
		}
		else if(cube == 2)
		{
			axis2 = 2;
			positive2 = false;
		}
    };
	document.getElementById( "lButton" ).onclick = function () {
        if(cube == 1)
			translate1[0] -= 0.1;
		else if(cube == 2)
			translate2[0] -= 0.1;
    };
	document.getElementById( "rButton" ).onclick = function () {
        if(cube == 1)
			translate1[0] += 0.1;
		else if(cube == 2)
			translate2[0] += 0.1;
    };
	document.getElementById( "uButton" ).onclick = function () {
        if(cube == 1)
			translate1[1] += 0.1;
		else if(cube == 2)
			translate2[1] += 0.1;
    };
	document.getElementById( "dButton" ).onclick = function () {
        if(cube == 1)
			translate1[1] -= 0.1;
		else if(cube == 2)
			translate2[1] -= 0.1;
    };
	document.getElementById( "iButton" ).onclick = function () {
        if(cube == 1)
			translate1[2] += 0.1;
		else if(cube == 2)
			translate2[2] += 0.1;
    };
	document.getElementById( "oButton" ).onclick = function () {
        if(cube == 1)
			translate1[2] -= 0.1;
		else if(cube == 2)
			translate2[2] -= 0.1;
    };
	document.getElementById( "bButton" ).onclick = function () {
		if(cube == 1)
		{
			scale1[0] += 0.1;
			scale1[1] += 0.1;
			scale1[2] += 0.1;
		}
		else if(cube == 2)
		{
		    scale2[0] += 0.1;
			scale2[1] += 0.1;
			scale2[2] += 0.1;
		}
    };
	document.getElementById( "sButton" ).onclick = function () {
		if(cube == 1)
		{
			scale1[0] -= 0.1;
			scale1[1] -= 0.1;
			scale1[2] -= 0.1;
		}
		else if(cube == 2)
		{
		    scale2[0] -= 0.1;
			scale2[1] -= 0.1;
			scale2[2] -= 0.1;
		}
    }; 
	document.getElementById( "gl-canvas" ).onclick = function ()
	{
		if(cubeImage.src == "http://i.imgur.com/Mf3feXz.png")
		{
			cubeImage = new Image();
			cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
			cubeImage.crossOrigin = "anonymous";
			cubeImage.src = "http://i.imgur.com/Y8IRBCa.jpg";
		}
		else
		{
			cubeImage = new Image();
			cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
			cubeImage.crossOrigin = "anonymous";
			cubeImage.src = "http://i.imgur.com/Mf3feXz.png";
		}
    }; 
	
    render();
}

function handleTextureLoaded(image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function quad(a, b, c, d) 
{
	
	var vertices = [
        vec3( -0.75, -0.25,  0.25 ),
        vec3( -0.75,  0.25,  0.25 ),
        vec3(  -0.25,  0.25,  0.25 ),
        vec3(  -0.25, -0.25,  0.25 ),
        vec3( -0.75, -0.25, -0.25 ),
        vec3( -0.75,  0.25, -0.25 ),
        vec3(  -0.25,  0.25, -0.25 ),
        vec3(  -0.25, -0.25, -0.25 )
    ];
	
	var vertices2 = [
        vec3( 0.75, -0.25,  0.25 ),
        vec3( 0.75,  0.25,  0.25 ),
        vec3(  0.25,  0.25,  0.25 ),
        vec3(  0.25, -0.25,  0.25 ),
        vec3( 0.75, -0.25, -0.25 ),
        vec3( 0.75,  0.25, -0.25 ),
        vec3(  0.25,  0.25, -0.25 ),
        vec3(  0.25, -0.25, -0.25 )
    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 1.0, 1.0, 1.0, 1.0 ],  // white
        [ 0.0, 1.0, 1.0, 1.0 ]   // cyan
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    
    //vertex color assigned by the index of the vertex
    
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        colors.push( vertexColors[indices[i]] );
		points2.push( vertices2[indices[i]] );
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	//Program 1
    gl.useProgram( program1 );
	//Set attributes
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    gl.vertexAttribPointer( gl.getAttribLocation( program1, "vColor" ), 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( gl.getAttribLocation( program1, "vColor" ) );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    gl.vertexAttribPointer( gl.getAttribLocation( program1, "vPosition" ), 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( gl.getAttribLocation( program1, "vPosition" ) );
	//Set uniforms
	if(positive1 == true)
		rotate1[axis1] += 1.0;
	else
		rotate1[axis1] -= 1.0;
	gl.uniform3fv(gl.getUniformLocation(program1, "center"), center1);
	gl.uniform3fv(gl.getUniformLocation(program1, "rotate"), rotate1);
	gl.uniform3fv(gl.getUniformLocation(program1, "translate"), translate1);
	gl.uniform3fv(gl.getUniformLocation(program1, "scale"), scale1);
	//Draw
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
	

	//Program 2
    gl.useProgram( program2 );
    //Set attributes
    gl.bindBuffer( gl.ARRAY_BUFFER, cubeVerticesBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(verticesTest), gl.STATIC_DRAW );
    gl.vertexAttribPointer( gl.getAttribLocation(program2, "vPosition"), 3, gl.FLOAT, false, 0, 0);
	
	var textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Back
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Top
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Bottom
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Right
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0
  ];
	
	gl.bindBuffer( gl.ARRAY_BUFFER, cubeVerticesTextureCoordBuffer );
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(gl.getAttribLocation( program2, "aTextureCoord") );
	gl.vertexAttribPointer(gl.getAttribLocation( program2, "aTextureCoord"), 2, gl.FLOAT, false, 0, 0);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
	gl.uniform1i(gl.getUniformLocation( program2, "uSampler"), 0);
	
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer );
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
	
	//Set Uniforms
	if(positive2 == true)
		rotate2[axis2] += 1.0;
	else
		rotate2[axis2] -= 1.0;
	gl.uniform3fv(gl.getUniformLocation(program2, "center"), center2);
    gl.uniform3fv(gl.getUniformLocation(program2, "rotate"), rotate2);
	gl.uniform3fv(gl.getUniformLocation(program2, "translate"), translate2);
	gl.uniform3fv(gl.getUniformLocation(program2, "scale"), scale2);
	

	//Draw
    gl.drawElements(gl.TRIANGLES, NumVertices, gl.UNSIGNED_SHORT, 0);
    requestAnimFrame( render );
}

