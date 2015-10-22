//
// Display a Mandelbrot set
//

var canvas;
var gl;


/* default data*/

/* N x M array to be generated */

var scale = 0.125;
var cx = -2.5;             /* center of window in complex plane */
var cy = -2.0;

var n = 1024;
var m =1024;

var program;

//----------------------------------------------------------------------------

onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );


    // Create and initialize a buffer object
    
    var points = [
       
    vec4(0.0, 0.0, 0.0, 1.0),
	vec4(0.0, 1.0, 0.0, 1.0),
	vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
    vec4(0.0, 0.0, 0.0, 1.0)
];

    // Load shaders and use the resulting shader program
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // set up vertex arrays
    var buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    
    gl.enableVertexAttribArray( vPosition );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0,0);
    gl.bufferData( gl.ARRAY_BUFFER,  flatten(points), gl.STATIC_DRAW );
    
    gl.uniform1f( gl.getUniformLocation(program, "scale"), scale);
    gl.uniform1f( gl.getUniformLocation(program, "cx"), cx);
    gl.uniform1f( gl.getUniformLocation(program, "cy"), cy);

	document.onkeydown = function(event) {
		if(event.keyCode == 187)
		{
			scale = scale + 0.05*scale;
			gl.uniform1f( gl.getUniformLocation(program, "scale"), scale);	
		}
		else if(event.keyCode == 189)
		{
			scale = scale - 0.05*scale;
			gl.uniform1f( gl.getUniformLocation(program, "scale"), scale);	
		}
		else if(event.keyCode == 38)
		{
			cy = cy + 0.05/scale;
			gl.uniform1f( gl.getUniformLocation(program, "cy"), cy);
			return false;
		}
		else if(event.keyCode == 40)
		{
			cy = cy - 0.05/scale;
			gl.uniform1f( gl.getUniformLocation(program, "cy"), cy);
			return false;
		}
		else if(event.keyCode == 37)
		{
			cx = cx - 0.05/scale;
			gl.uniform1f( gl.getUniformLocation(program, "cx"), cx);
			return false;
		}
		else if(event.keyCode == 39)
		{
			cx = cx + 0.05/scale;
			gl.uniform1f( gl.getUniformLocation(program, "cx"), cx);
			return false;
		}
	};
	document.getElementById( "gl-canvas" ).addEventListener('mousewheel', eventHandler);

       
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    render();
}

//----------------------------------------------------------------------------

function eventHandler(event)
{
	if(event.wheelDelta>0)
	{
		scale = scale + 0.05*scale;
		gl.uniform1f( gl.getUniformLocation(program, "scale"), scale);	
	}
	else if(event.wheelDelta<0)
	{
		scale = scale - 0.05*scale;
		gl.uniform1f( gl.getUniformLocation(program, "scale"), scale);
	}
	event.preventDefault();
}

var render = function() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
    requestAnimFrame(render);
}



