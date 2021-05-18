var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d"); 

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

// src is source
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

var gap = 85; // space for bird to fly through
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;
var noGravity = false;

var score = 0;
var highScore = localStorage.getItem("highScore"); // take high score from local storage
highScore ? 1 : highScore = 0 // if null, set to 0

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down
// any key pressed
document.addEventListener("keydown", moveUp);

// will change in future to fit the requirement
function moveUp() {
    bY -= 25; // move up 
    fly.play(); // make sound
}

var str = [] // array contains string

// add typing function
function typing(pattern, input) {
    if(pattern == input) {
    	for(var i = 0; i < pipe.length; i++){ 
	        if(pipe[i].x - bX > 0) {
	        	bY = (pipe[i].y+pipeNorth.height + Math.floor((gap-bird.width)/2)) // fly
	        	fly.play(); // make sound
	        	noGravity = true;
	        	break;
	        }           
	    }
    } 	
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    // logic 
    for(var i = 0; i < pipe.length; i++){ 
        
        constant = pipeNorth.height+gap; 
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y); 
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){ // add a new pipe when meet the condition
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) /* check if bird collide with a pipe*/
        	|| bY + bird.height >=  cvs.height - fg.height /* check if bird hit the foreground*/){
        	highScore < score ? localStorage.setItem("highScore", score) : 0 // push high score to localStorage
            location.reload(); // reload the page, actually reload the cvs
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }

        if(pipe[i].x + pipeNorth.width == 10)
        	noGravity = false;
        
    }

    // foreground
    ctx.drawImage(fg,0,cvs.height - fg.height);
    // bird on screen
    ctx.drawImage(bird,bX,bY);
    // draw text on bird to type
    ctx.fillStyle = "#272";
    ctx.font = "20px Verdana";
    ctx.fillText("Unknown",bX , bY-10)
    // fall down 
    noGravity ? 0 : bY += gravity // if no gravity, not change bY
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20); // text, x, y || show score 
    ctx.fillText("High Score : "+highScore, 10, 20); // show high Score

    requestAnimationFrame(draw); // callback function to render animation
    
}

draw();
























