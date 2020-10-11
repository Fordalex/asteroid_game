var canvasWidth = 700;
var canvasHeight = 700;

function setup() {
    createCanvas(canvasWidth, canvasHeight)
    for (let i = 0; i < 100; i++) {
        var newEnemy = new enemy();
        enemies.push(newEnemy)
    }
}

function draw() {
    background(150);
    showPlayersStats();
    playerOne.draw()
    for (e of enemies) {
        e.draw()
        if (e.intersects()) {
            playerOne.hit()
        }
    }
}

var enemies = [];

class player {
    constructor() {
        this.position = {
            'x': canvasWidth / 2,
            'y': canvasHeight / 2,
        }
        this.diameters = 50;
        this.colour = 'rgba(255,255,255, 0.9)';
        this.life = 100;
    }
    draw() {
        fill(this.colour)
        circle(this.position.x, this.position.y, this.diameters)
    }
    hit() {
        if (this.life > 0) {
            this.life -= 1;
            this.colour = 'rgba(255,0,0,0.9)'
        } else {
            endGame()
        }

    }
}

class enemy {
    constructor() {
        this.position = {
            'x': Math.floor(Math.random() * canvasWidth),
            'y': Math.floor(Math.random() * canvasHeight),
        }
        this.diameters = Math.floor(Math.random() * 50 + 10);
        this.colour = 'rgba(255,0,0, 0.5)';
        this.speed = 0.1;
    }
    draw() {
        fill(this.colour)
        circle(this.position.x, this.position.y, this.diameters)
        this.movePosition()
    }
    movePosition() {
        if (playerOne.position.y > this.position.y) {
            this.position.y += this.speed;
        } else {
            this.position.y -= this.speed;
        }
        if (playerOne.position.x > this.position.x) {
            this.position.x += this.speed;
        } else {
            this.position.x -= this.speed;
        }
    }
    intersects() {
        var distance = dist(playerOne.position.x, playerOne.position.y, this.position.x, this.position.y)
        var diameters = playerOne.diameters / 2 + this.diameters / 2
        return (distance < diameters)
    }
}

var playerOne = new player();


function showPlayersStats() {
    textSize(20);
    fill(0, 0, 0);
    text(`Life: ${playerOne.life}`, 10, 30);
}

function endGame() {
    $('#endGameModal').modal('show');
}