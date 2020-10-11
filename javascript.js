// canvas setup

var canvasWidth = 700;
var canvasHeight = 700;

function setup() {
    createCanvas(canvasWidth, canvasHeight)
    noCursor();
}

// draw loop

function draw() {
    // check players score and increase the difficulty
    if (score % 10 == 0) {
        if (enemySpawnSpeed > 300) {
            enemySpawnSpeed -= 50;
        }
    }

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
            if (enemies[j].checkIfHit(bullets[i])) {
                if (enemies[j].dead()) {
                    enemies.splice(j, 1)
                }
                bullets.splice(i, 1)
                break
            }
        }
    }

    // cursor
    fill('rgba(0,0,0,0.7)');
    circle(mouseX, mouseY, 5)
}

//  game logic

var enemies = [];
var bullets = [];
var score = 0;
var money = 0;

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
        this.colour = 'rgba(255,255,255, 0.9)';
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
        fill(this.colour)
        circle(this.position.x, this.position.y, this.diameter)
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
        this.speed = 15;
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

class debri {
    constructor() {
        this.diameter = Math.floor(Math.random() * 5 + 5)
        this.colour = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.8)`
    }
    draw() {
        fill(this.colour)
        circle(50, 50, this.diameter)
    }
}

class enemy {
    constructor() {
        this.position = {
            'x': Math.floor(Math.random() * canvasWidth),
            'y': Math.floor(Math.random() * canvasHeight),
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
            this.diameter -= this.diameter / 2;
            if (this.diameter < 50) {
                return true
            }

        }
    }
    dead() {
        if (this.diameter < 20) {
            money += 10;
            score += 1;
            return true
        }
    }
}


function showPlayersStats() {
    textSize(20);
    fill(0, 0, 0);
    text(`Life: ${playerOne.life}`, 10, 30);
    text(`Score: ${score}`, 100, 30);
    text(`Money: ${money}`, 200, 30);
}

function endGame() {
    $('#playersScore').html(score)
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

var enemySpawnSpeed = 500;
var enemySpawnAmount = 1;

function spawnEnemies() {
    for (let i = 0; i < enemySpawnAmount; i++) {
        var newEnemy = new enemy();
        var spawn = Math.floor(Math.random() * 5)
        if (spawn > 3) {
            newEnemy.position.x = Math.floor(Math.random() * canvasWidth)
            newEnemy.position.y = 0
        } else if (spawn > 2) {
            newEnemy.position.x = 0
            newEnemy.position.y = Math.floor(Math.random() * canvasHeight)
        } else if (spawn > 1) {
            newEnemy.position.x = Math.floor(Math.random() * canvasWidth)
            newEnemy.position.y = canvasHeight
        } else {
            newEnemy.position.x = canvasWidth
            newEnemy.position.y = Math.floor(Math.random() * canvasHeight)
        }
        enemies.push(newEnemy)
    }
    setTimeout(function() {
        spawnEnemies()
    }, enemySpawnSpeed)
}
spawnEnemies()