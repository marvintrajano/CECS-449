
var gl;

var theta = 0.0;
var thetaLoc;

var speed = 100;
var spin = false;
var direction = true;

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
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertices = [
		//Center
		vec2(0, 0),
		
		//Stem
		vec2(-0.05, -0.1),
		vec2(-0.05, -1),
		vec2(0.05, -1),
		vec2(0.05, -0.1),
		
		//Leaf 1
		vec2(0.125, -0.7),
		vec2(0.2, -0.8),
		vec2(0.4, -0.8),
		vec2(0.5, -0.7),
		vec2(0.55, -0.55),
		vec2(0.7, -0.5),
		vec2(0.8, -0.4),
		vec2(0.8, -0.2),
		vec2(0.7, -0.05),
		vec2(0.1, -0.5),
		
		//Leaf 2
		vec2(0.1, 0.5),
		vec2(0.7, 0.05),
		vec2(0.8, 0.2),
		vec2(0.8, 0.4),
		vec2(0.7, 0.5),
		vec2(0.55, 0.55),
		vec2(0.5, 0.7),
		vec2(0.4, 0.8),
		vec2(0.2, 0.8),
		vec2(0.05, 0.7),
		vec2(0.5, 0.1),
		
		//Leaf 3
		vec2(-0.5, 0.1),
		vec2(-0.05, 0.7),
		vec2(-0.2, 0.8),
		vec2(-0.4, 0.8),
		vec2(-0.5, 0.7),
		vec2(-0.55, 0.55),
		vec2(-0.7, 0.5),
		vec2(-0.8, 0.4),
		vec2(-0.8, 0.2),
		vec2(-0.7, 0.05),
		vec2(-0.1, 0.5),
		
		//Leaf 4
		vec2(-0.1, -0.5),
		vec2(-0.7, -0.05),
		vec2(-0.8, -0.2),
		vec2(-0.8, -0.4),
		vec2(-0.7, -0.5),
		vec2(-0.55, -0.55),
		vec2(-0.5, -0.7),
		vec2(-0.4, -0.8),
		vec2(-0.2, -0.8),
		vec2(-0.125, -0.7),
		vec2(-0.5, -0.1)
    ];

    // Load the data into the GPU    
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(vPosition);
    
    thetaLoc = gl.getUniformLocation(program, "theta");
    
    // Initialize event handlers
    
    document.getElementById("slider").onchange = function() {
        speed = 100 - Math.abs(event.srcElement.value);
		if(event.srcElement.value == 0)
		{
			spin = false;
		}
		else if(event.srcElement.value < 0)
		{
			spin = true;
			direction = true;
		}
		else
		{
			spin = true;
			direction = false;
		}
    };

    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

	if(spin)
	{
		theta += (direction ? 0.1 : -0.1);
		gl.uniform1f(thetaLoc, theta);
	}

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 48);

    setTimeout(
        function () {requestAnimFrame( render );},
        speed
    );
}
