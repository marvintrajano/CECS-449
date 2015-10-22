//Marvin Trajano

//Set up WebGL
var canvas;
var gl;
var maxNumTriangles = 200;  
var maxNumVertices  = 3 * maxNumTriangles;

var index = 0;
var first = true;

var t1, t2, point;

var cIndex = 0;
var sIndex = 0;

var shapes = 0;
var indices = [];
indices[0] = 0;
var start = [0];

var colors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );


    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
  
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    
    var c = document.getElementById("colorMenu");
    
    c.addEventListener("click", function() {
       cIndex = c.selectedIndex;
        });
		
	var s = document.getElementById("shapeMenu");
	
	s.addEventListener("click", function() {
		sIndex = s.selectedIndex;
		});

    canvas.addEventListener("mousedown", function()
	{
		if(sIndex == 0) //Circle
		{
			t = vec4(colors[cIndex]);
			if(first)
			{
				first = false;
				t1 = vec2(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1);
			}
			else
			{
				first = true;
				step = 2*Math.PI/30;
				count = 0;
				t2 = vec2(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1);
				radius = Math.sqrt(Math.pow((t2[0] - t1[0]), 2) + Math.pow((t2[1] - t1[1]), 2)); 
				for(var theta = 0; theta <= 2*Math.PI; theta += step)
				{
					gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
					point = vec2(t1[0] + radius*Math.cos(theta), t1[1] - radius*Math.sin(theta));
					gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+count), flatten(point));
					
					//Colors
					gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
					gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+count), flatten(t));
					
					count++;
				}
			}
			index += 30;
			indices[shapes] = 30;
		}
		else if(sIndex == 1) //Square
		{
			t = vec4(colors[cIndex]);
			if(first)
			{
				first = false;
				t1 = vec2(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1);
			}
			else
			{
				first = true;
				step = 2*Math.PI/4;
				count = 0;
				t2 = vec2(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1);
				deltaX = t2[0] - t1[0];
				deltaY = t1[1] - t2[1];
				radius = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)); 
				startAngle = Math.atan(deltaY / deltaX) * 180 / Math.PI;
				theta = startAngle * Math.PI / 180;
				for(var i = 0; i < 4; i++)
				{
				
					gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
					point = vec2(t1[0] + radius*Math.cos(theta), t1[1] - radius*Math.sin(theta));
					gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+count), flatten(point));

					//Colors
					gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
					gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+count), flatten(t));
					theta += step;
					count++;
				}
			}
			index += 4;
			indices[shapes] = 4;
		}
		else if(sIndex == 2) //Triangle
		{
			t = vec4(colors[cIndex]);
			if(first)
			{
				first = false;
				t1 = vec2(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1);
			}
			else
			{
				first = true;
				step = 2*Math.PI/3;
				count = 0;
				t2 = vec2(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1);
				deltaX = t2[0] - t1[0];
				deltaY = t1[1] - t2[1];
				radius = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)); 
				startAngle = Math.atan(deltaY / deltaX) * 180 / Math.PI;
				theta = startAngle * Math.PI / 180;
				for(var i = 0; i < 3; i++)
				{
				
					gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
					if(t1[0] > t2[0])
						point = vec2(t1[0] + radius*Math.cos(theta+1.047), t1[1] - radius*Math.sin(theta+1.047));
					else
						point = vec2(t1[0] + radius*Math.cos(theta), t1[1] - radius*Math.sin(theta));
					gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+count), flatten(point));

					//Colors
					gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
					gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+count), flatten(t));
					theta += step;
					count++;
				}
			}
			index += 3;
			indices[shapes] = 3;
			
			
		}
		//Reset for next shape
		shapes++;
		indices[shapes] = 0;
		start[shapes] = index;
    } );
    render();
}

function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT );
	for(var i = 0; i < shapes; i++)
	{
		gl.drawArrays( gl.TRIANGLE_FAN, start[i], indices[i] );
	}

    window.requestAnimFrame(render);
}
