// canvas setup

var canvasWidth = 700;
var canvasHeight = 700;

function setup() {
    createCanvas(canvasWidth, canvasHeight)
    noCursor();
    for (let i = 0; i < 50; i++) {
        var newEnemy = new enemy();
        enemies.push(newEnemy)
    }
}

// draw loop

function draw() {
    background(150);
    showPlayersStats();
    playerOne.draw()
        // check if an object is colliding with the player.
    for (e of enemies) {
        e.draw()
        if (playerOne.intersects(e)) {
            playerOne.hit()
        }
    }
    // draw all the bullets when shot.
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw()
            // check if a bullet is hitting an enemy
        for (let j = 0; j < enemies.length; j++) {
            enemies[j].checkIfHit(bullets[i])
            if (enemies[j].checkIfHit(bullets[i])) {
                enemies.splice(j, 1)
            }
        }
    }

    // cursor
    fill('rgba(0,0,0,0.7)');
    circle(mouseX, mouseY, 10)
}

//  game logic

var enemies = [];
var bullets = [];

class player {
    constructor() {
        this.position = {
            'x': canvasWidth / 2,
            'y': canvasHeight / 2,
        }
        this.diameter = 50;
        this.colour = 'rgba(255,255,255, 0.9)';
        this.life = 100;
    }
    draw() {
        fill(this.colour)
        circle(this.position.x, this.position.y, this.diameter)
    }
    hit() {
        if (this.life > 0) {
            this.life -= 1;
            this.colour = 'rgba(255,0,0,0.9)'
        } else {
            endGame()
        }
    }
    intersects(e) {
        var distance = dist(e.position.x, e.position.y, this.position.x, this.position.y)
        var diameters = e.diameter / 2 + this.diameter / 2
        return (distance < diameters)
    }
}

var playerOne = new player();

class bullet {
    constructor() {
        this.speed = 7;
        this.position = {
            x: playerOne.position.x,
            y: playerOne.position.y,
        };
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.diameter = 5;
        this.colour = 'rgba(0,0,0,0.8)';
    }
    draw() {
        fill(this.colour)
        circle(this.position.x, this.position.y, this.diameter)
        this.update()
    }
    update() {
        for (let i = 0; i < this.speed; i++) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}

class enemy {
    constructor() {
        this.position = {
            'x': Math.floor(Math.random() * canvasWidth),
            'y': 0,
        }
        this.diameter = Math.floor(Math.random() * 50 + 10);
        this.colour = 'rgba(255,0,0, 0.5)';
        this.speed = 0.5;
    }
    draw() {
        fill(this.colour)
        circle(this.position.x, this.position.y, this.diameter)
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
        var diameters = playerOne.diameter / 2 + this.diameter / 2
        return (distance < diameters)
    }
    checkIfHit(bullet) {
        var distance = dist(bullet.position.x, bullet.position.y, this.position.x, this.position.y)
        var diameters = bullet.diameter / 2 + this.diameter / 2
        if (distance < diameters) {
            // this.diameter -= this.diameter / 2;
            // if (this.diameter < 40) {
            //     return true
            // }
            return true
        }
    }
}


function showPlayersStats() {
    textSize(20);
    fill(0, 0, 0);
    text(`Life: ${playerOne.life}`, 10, 30);
}

function endGame() {
    $('#endGameModal').modal('show');
}

function mouseClicked() {
    var newBullet = new bullet();
    const angle = Math.atan2(
        mouseX - playerOne.position.x,
        mouseY - playerOne.position.y,
    )
    newBullet.velocity.x = Math.sin(angle)
    newBullet.velocity.y = Math.cos(angle)
    bullets.push(newBullet)
}