$(document).ready(function() {
    var canvas = $('#defaultCanvas0')
    $('#defaultCanvas0').remove()
    $('#canvasContainer').html(canvas)
});

var canvasHeight = 600;
var canvasWidth = 600;

function setup() {
    createCanvas(canvasWidth, canvasHeight)
    noCursor();
}

var playerOneX = 20;
var playerOneY = 20;

function draw() {
    background(15);
    rect(playerOneX, playerOneY, 10, 70);
    rect(canvasWidth - 20, 10, 10, 70);
}

window.addEventListener('keydown', function(e) {
    if (e.key == 's') {
        if (playerOneY + 77 < canvasHeight) {
            playerOneY += 20;
        }
    }
    if (e.key == 'w') {
        if (playerOneY > 0) {
            playerOneY -= 20;
        }
    }
   
})