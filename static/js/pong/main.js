$(document).ready(function() {
    var canvas = $('#defaultCanvas0')
    $('#defaultCanvas0').remove()
    $('#canvasContainer').html(canvas)
});

const socket = io.connect("http://localhost:5001/");

var canvasHeight = 600;
var canvasWidth = 600;

function setup() {
    createCanvas(canvasWidth, canvasHeight)
    noCursor();
}

var playerOneX = 20;
var playerOneY = 20;

var playerTwoX = canvasWidth - 20;
var playerTwoY = 20;

function draw() {
    background(15);
    rect(playerOneX, playerOneY, 10, 70);
    rect(playerTwoX, playerTwoY, 10, 70);
}

window.addEventListener('keydown', function(e) {
    if (e.key == 's') {
        if (playerOneY + 77 < canvasHeight) {
            playerOneY += 20;
            socket.emit('playerOne_position', {
                y: playerOneY,
            })
        }
    }
    if (e.key == 'w') {
        if (playerOneY > 0) {
            playerOneY -= 20;
            socket.emit('playerOne_position', {
                y: playerOneY,
            })
        }
    }
})

socket.on('playerOne_position_received', function(e) {
    playerOneY = e['y']
})