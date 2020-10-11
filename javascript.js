// style the page on load.
$(document).ready(function() {
    $('#defaultCanvas0').parent().prepend(`
    <div class="container-fluid" id="itemShopcontainer">
        ${shopItems}
    </div>
    `);
    $('#defaultCanvas0').parent().addClass('d-flex justify-content-between pt-2')
    $('#defaultCanvas0').parent().append(`
    <div class="container-fluid">
        <p>Database with high scores</p>
        <ul>
            <li>Name: blur blur. Score: 500</li>
        </ul>
    </div>
    `);
});

var bulletSpeedCost = 100;

var shopItems = `
    <h3>Item Shop</h3>
    <small>Purchase Items using your keyboard</small>
    <p><img src="https://img.icons8.com/color/45/000000/1-key.png"><img src="https://img.icons8.com/android/20/000000/speed.png"/> Faster Bullets <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> ${bulletSpeedCost}</p>
    <p class="mt-3"><img src="https://img.icons8.com/color/45/000000/2-key.png"/><img src="https://img.icons8.com/cotton/20/000000/like--v3.png"/> Small medipack  <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> 500</p>
    <p><img src="https://img.icons8.com/color/45/000000/3-key.png"/><img src="https://img.icons8.com/color/20/000000/bullet.png"/> Bigger Bullets <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> 500</p>
    <p><img src="https://img.icons8.com/color/45/000000/4-key.png"/><img src="https://img.icons8.com/color/20/000000/oil-industry.png"/> Fule <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> 500</p>
    <p><img src="https://img.icons8.com/color/45/000000/5-key.png"/><img src="https://img.icons8.com/color/20/000000/gatling-gun.png"/> 30 Secs mini gun <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> 500</p>
    <p><img src="https://img.icons8.com/color/45/000000/6-key.png"/> <img src="https://img.icons8.com/cotton/20/000000/economic-growth-.png"/> Earn More per kill <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> 500</p>
`;

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

    background(15);
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
    for (var i = 0; i < bullets.length; i++) {
        var theBullet = bullets[i]
        theBullet.draw()
            // check if a bullet is hitting an enemy
        for (let j = 0; j < enemies.length; j++) {
            if (enemies[j].checkIfHit(theBullet)) {

                if (enemies[j].dead()) {
                    money += 10;
                    score += 1;
                    var velocity = 0;
                    for (let i = 0; i < 15; i++) {
                        var newDebri = new debri();
                        newDebri.position.y = enemies[j].position.y;
                        newDebri.position.x = enemies[j].position.x;
                        newDebri.velocity.x = theBullet.velocity.x * 2 + Math.random() * 2;
                        newDebri.velocity.y = theBullet.velocity.y * 2 + Math.random() * 2;
                        newDebri.colour = enemies[j].colour;
                        debris.push(newDebri)
                        velocity += 4
                    }
                    enemies.splice(j, 1)
                }
                bullets.splice(i, 1)
                break
            }
        }
    }
    // draw all the debri
    for (d of debris) {
        d.draw()
    }
    // cursor
    fill('rgba(255,255,255,0.9)');
    circle(mouseX, mouseY, 5)
    if (bullets.length > 50) {
        bullets.shift()
    }
    if (debris.length > 50) {
        debris.shift()
    }
}

//  game logic

var enemies = [];
var bullets = [];
var debris = [];
var score = 0;
var money = 0;
var bulletSpeed = 1;
var bulletSize = 5;

class player {
    constructor() {
        this.position = {
            'x': canvasWidth / 2,
            'y': canvasHeight / 2,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.diameter = 50;
        this.colour = 'rgba(255,255,255, 0.9)';
        this.life = 100;
    }
    draw() {
        this.colour = 'rgba(255,255,255, 0.9)';
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
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
    moveUp() {
        this.velocity.y -= 0.2;
    }
    moveDown() {
        this.velocity.y += 0.2;
    }
    moveLeft() {
        this.velocity.x -= 0.2;
    }
    moveRight() {
        this.velocity.x += 0.2;
    }
}

var playerOne = new player();

// move the player
window.addEventListener('keydown', function(e) {
    if (e.key == 'w') {
        playerOne.moveUp()
    }
    if (e.key == 's') {
        playerOne.moveDown()
    }
    if (e.key == 'd') {
        playerOne.moveRight()
    }
    if (e.key == 'a') {
        playerOne.moveLeft()
    }
})

class bullet {
    constructor() {
        this.speed = bulletSpeed;
        this.position = {
            x: playerOne.position.x,
            y: playerOne.position.y,
        };
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.diameter = bulletSize;
        this.colour = 'rgba(255,255,255,0.9)';
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
        this.diameter = 7;
        this.colour = 0;
        this.position = {
            x: 0,
            y: 0,
        }
        this.velocity = {
            x: Math.floor(Math.random() * 3 + 1),
            y: Math.floor(Math.random() * 3 + 1),
        }
    }
    draw() {
        fill(this.colour)
        circle(this.position.x, this.position.y, this.diameter)
        this.update()
    }
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class enemy {
    constructor() {
        this.position = {
            'x': Math.floor(Math.random() * canvasWidth),
            'y': Math.floor(Math.random() * canvasHeight),
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.diameter = Math.floor(Math.random() * 50 + 10);
        this.colour = `rgba(${Math.floor(Math.random() * 255) + 40},${Math.floor(Math.random() * 255) + 40},${Math.floor(Math.random() * 255) + 40},0.8)`;
        this.speed = 0.5;
    }
    draw() {
        fill(this.colour)
        circle(this.position.x, this.position.y, this.diameter)
        this.movePosition()
    }
    movePosition() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
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
            return true
        }
    }
}

function showPlayersStats() {
    textSize(15);
    fill(200, 200, 200);
    text(`Life: ${playerOne.life}`, 10, 20);
    text(`Score: ${score}`, 90, 20);
    text(`Money: ${money}`, 580, 20);
    textSize(15);
    text(`Enemy Delay: ${enemySpawnSpeed}`, 10, 690);
    text(`Enemy Speed: ${enemySpeed}`, 150, 690);
    text(`Bullet Speed: ${bulletSpeed}`, 290, 690);
    text(`Bullet Size: ${bulletSize}`, 420, 690);
    textSize(10);
    text('Velocity', 640, 660);
    text(`Y:${playerOne.velocity.y}`, 640, 675);
    text(`X:${playerOne.velocity.x}`, 640, 690);
    // text(`Time:`, 390, 30);
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

//  spawn the enemies

var enemySpawnSpeed = 1000;
var enemySpawnAmount = 1;
var enemySpeed = 2;

function spawnEnemies() {
    if (enemySpawnSpeed > 300) {
        enemySpawnSpeed -= 1;
    }

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
        const angle = Math.atan2(
            playerOne.position.x - newEnemy.position.x,
            playerOne.position.y - newEnemy.position.y,
        )
        newEnemy.velocity.x = Math.sin(angle) / enemySpeed;
        newEnemy.velocity.y = Math.cos(angle) / enemySpeed;
        enemies.push(newEnemy)
    }
    setTimeout(function() {
        spawnEnemies();
        updateShop();
    }, enemySpawnSpeed)
}
spawnEnemies()

// Purchasing items with the keyboard
window.addEventListener('keypress', function(e) {
    if (e.key == 1) {
        if (money >= bulletSpeedCost) {
            money -= bulletSpeedCost;
            bulletSpeedCost += bulletSpeedCost;
            bulletSpeed += 2;
        }
    }
    if (e.key == 2) {

    }
    if (e.key == 3) {

    }
    if (e.key == 4) {

    }
    if (e.key == 5) {

    }
    if (e.key == 6) {

    }
});

// update the shop
function updateShop() {
    shopItems = `
    <h3>Item Shop</h3>
    <small>Purchase Items using your keyboard</small>
    <p><img src="https://img.icons8.com/color/45/000000/1-key.png"><img src="https://img.icons8.com/android/20/000000/speed.png"/> Faster Bullets <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> ${bulletSpeedCost}</p>
    <p class="mt-3"><img src="https://img.icons8.com/color/45/000000/2-key.png"/><img src="https://img.icons8.com/cotton/20/000000/like--v3.png"/> Small medipack  <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> 500</p>
    <p><img src="https://img.icons8.com/color/45/000000/3-key.png"/><img src="https://img.icons8.com/color/20/000000/bullet.png"/> Bigger Bullets <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> 500</p>
    <p><img src="https://img.icons8.com/color/45/000000/4-key.png"/><img src="https://img.icons8.com/color/20/000000/oil-industry.png"/> Fule <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> 500</p>
    <p><img src="https://img.icons8.com/color/45/000000/5-key.png"/><img src="https://img.icons8.com/color/20/000000/gatling-gun.png"/> 30 Secs mini gun <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> 500</p>
    <p><img src="https://img.icons8.com/color/45/000000/6-key.png"/> <img src="https://img.icons8.com/cotton/20/000000/economic-growth-.png"/> Earn More per kill <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> 500</p>
`;
    $('#itemShopcontainer').html(shopItems)
}