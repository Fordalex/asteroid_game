// style the page on load.
$(document).ready(function() {
    $('#defaultCanvas0').parent().addClass('d-flex justify-content-between pt-2')
    $('#defaultCanvas0').parent().prepend(`
    <div class="container-fluid" id="itemShopcontainer"></div>
    `);
    $('#defaultCanvas0').parent().append(`
    <div class="container-fluid">
        <p>Database with high scores</p>
        <ul>
            <li>Name: blur blur. Score: 500</li>
        </ul>
    </div>
    `);
    updateShop();
    var playersName = localStorage.getItem('playersName');
    $('#playersNameInput').val(playersName)
    $('#enterNameModal').modal({
        backdrop: 'static',
        keyboard: false
    });
});

var difficuly = '';
// get the game difficuly and start the game
$('#ready').on('click', function() {
    difficuly = $('input[name="difficuly"]:checked').val();
    if (difficuly == 'easy') {
        gameDifficulty = 1;
    }
    if (difficuly == 'medium') {
        gameDifficulty = 5;
    }
    if (difficuly == 'hard') {
        gameDifficulty = 10;
    }
    if (difficuly == 'extream') {
        gameDifficulty = 20;
    }
    localStorage.setItem('playersName', $('#playersNameInput').val())
    playersColour = $('#playersColour').val();
});

var bulletSpeedCost = 10;
var medipackCost = 10;
var bulletSizeCost = 10;
var fuleCost = 10;
var miniGunCost = 10;
var moneyMultiplierCost = 10;

// canvas setup

var gamePaused = true;
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
    if (!gamePaused) {
        playerOne.draw()
            // check if an object is colliding with the player.
        for (e of enemies) {
            const angle = Math.atan2(
                playerOne.position.x - e.position.x,
                playerOne.position.y - e.position.y,
            )
            e.velocity.x = Math.sin(angle) / enemySpeed;
            e.velocity.y = Math.cos(angle) / enemySpeed;
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
                        money += 5 * moneyMultiplier;
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
        // stop the player if they have ran out of fule while moving
        if (fule == 0) {
            playerOne.velocity.x = 0;
            playerOne.velocity.y = 0;
        }
        if (miniGunTimer > 0) {
            miniGunTimer--;
        }
    } else {
        textSize(30);
        fill(200, 200, 200);
        text('PAUSED', 290, 350);
        textSize(15);
        text('Press space to resume', 275, 370);
    }
    console.log(playerOne.colour)
}

//  game logic

var enemies = [];
var bullets = [];
var debris = [];

var score = 0;
var money = 0;
var bulletSpeed = 1;
var bulletSize = 5;
var fule = 50;
var moneyMultiplier = 1;
var miniGunTimer = 0;
var miniGunActivated = false;
var playersColour = '';

class Player {
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
        this.colour = playersColour;
        this.life = 100;
    }
    draw() {
        this.colour = playersColour;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        var colour = color(this.colour)
        fill(colour)
        circle(this.position.x, this.position.y, this.diameter)
    }
    hit() {
        if (this.life > 0) {
            this.life -= 1;
            this.colour = 'rgb(255,0,0)'
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

var playerOne = new Player();

// move the player
window.addEventListener('keydown', function(e) {
    if (fule > 0) {
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
        fule--
    } else {
        textSize(15);
        fill(200, 200, 200);
        text('No fule!', 350, 350);
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
        this.colour = playersColour;
    }
    draw() {
        fill(this.colour)
        circle(this.position.x, this.position.y, this.diameter)
        circle(this.position.x - this.velocity.x * 5, this.position.y - this.velocity.y * 5, this.diameter / 1.5)
        circle(this.position.x - this.velocity.x * 10, this.position.y - this.velocity.y * 10, this.diameter / 2)
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
        this.diameter = Math.floor(Math.random() * 8);
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
        fill('#fffff')
        circle(this.position.x, this.position.y, 50)
        if (this.diameter < 20) {
            return true
        }
    }
}

function showPlayersStats() {
    textSize(15);
    fill(200, 200, 200);
    text(`Life: ${playerOne.life}`, 10, 20);
    text(`Score: ${score}`, 10, 40);
    text(`Money Multiplyer: ${moneyMultiplier}`, 10, 60);
    text(`Money: ${money}`, 10, 80);

    text(`Bullet Speed: ${bulletSpeed}`, 580, 20);
    text(`Bullet Size: ${bulletSize}`, 580, 40);
    text(`MiniGun: ${miniGunTimer}`, 580, 60);

    text(`Difficulty: ${difficuly.toUpperCase()}`, 10, 650);
    text(`Enemy Delay: ${enemySpawnSpeed}`, 10, 670);
    text(`Enemy Speed: ${enemySpeed.toFixed(2)}`, 10, 690);

    text(`Fule: ${fule}`, 620, 630);
    text('Velocity', 620, 650);
    text(`Y:${playerOne.velocity.y.toFixed(2)}`, 620, 670);
    text(`X:${playerOne.velocity.x.toFixed(2)}`, 620, 690);
    // text(`Time:`, 390, 30);
}

function endGame() {
    $('#playersScore').html(score)
    var playersName = localStorage.getItem('playersName');
    $('#playersName').html(playersName)
    $('#endGameModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    gamePaused = true;
}


function mouseMoved() {
    if (miniGunActivated && miniGunTimer > 0) {
        var newBullet = new bullet();
        const angle = Math.atan2(
            mouseX - playerOne.position.x,
            mouseY - playerOne.position.y,
        )
        newBullet.velocity.x = Math.sin(angle)
        newBullet.velocity.y = Math.cos(angle)
        bullets.push(newBullet)
    } else {
        miniGunActivated = false;
    }
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
var gameDifficulty = 1;

function spawnEnemies() {
    if (!gamePaused) {
        if (enemySpawnSpeed > 200) {
            enemySpawnSpeed -= gameDifficulty;
        }
        if (enemySpeed > 0.3) {
            enemySpeed -= gameDifficulty / 1000;
        } else {
            enemySpeed = 0.3;
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
        }, enemySpawnSpeed)
    }
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
        if (money >= medipackCost) {
            money -= medipackCost;
            playerOne.life += 50;
            medipackCost += medipackCost;
        }
    }
    if (e.key == 3) {
        if (money >= bulletSizeCost) {
            money -= bulletSizeCost
            bulletSizeCost += bulletSizeCost;
            bulletSize++;
        }
    }
    if (e.key == 4) {
        if (money >= fuleCost) {
            money -= fuleCost
            fuleCost += fuleCost;
            fule += 200;
        }
    }
    if (e.key == 5) {
        if (money >= miniGunCost) {
            miniGunActivated = true;
            money -= miniGunCost;
            miniGunCost += miniGunCost;
            miniGunTimer += 750;
        }
    }
    if (e.key == 6) {
        if (money > moneyMultiplierCost) {
            money -= moneyMultiplierCost;
            moneyMultiplierCost += moneyMultiplierCost;
            moneyMultiplier += 1;

        }
    }
    if (e.key == ' ') {
        if (gamePaused) {
            gamePaused = false;
            spawnEnemies();
        } else {
            gamePaused = true;
        }
    }
    updateShop();
});

// update the shop
function updateShop() {
    shopItems = `
    <div class="item-shop-container">
        <h3>Item Shop</h3>
        <p class="m-0">Purchase Items using your keyboard.</p>
        <p>Feel free to pause the game and purchase your upgrades.</p>
        <p><img src="https://img.icons8.com/color/45/000000/1-key.png"><img src="https://img.icons8.com/android/20/000000/speed.png"/> Faster Bullets <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> ${bulletSpeedCost}</p>
        <p class="mt-3"><img src="https://img.icons8.com/color/45/000000/2-key.png"/><img src="https://img.icons8.com/cotton/20/000000/like--v3.png"/> Medipack  <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> ${medipackCost}</p>
        <p><img src="https://img.icons8.com/color/45/000000/3-key.png"/><img src="https://img.icons8.com/color/20/000000/bullet.png"/> Bigger Bullets <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> ${bulletSizeCost}</p>
        <p><img src="https://img.icons8.com/color/45/000000/4-key.png"/><img src="https://img.icons8.com/color/20/000000/oil-industry.png"/> 200 Fule <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> ${fuleCost}</p>
        <p><img src="https://img.icons8.com/color/45/000000/5-key.png"/><img src="https://img.icons8.com/color/20/000000/gatling-gun.png"/> Mini gun <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> ${miniGunCost}</p>
        <p><img src="https://img.icons8.com/color/45/000000/6-key.png"/> <img src="https://img.icons8.com/cotton/20/000000/economic-growth-.png"/> Earn More per kill <img src="https://img.icons8.com/office/20/000000/cheap-2.png"/> ${moneyMultiplierCost}</p>
        <hr>
        <h3>Controls</h3>    
        <p class="m-0 mb-1">Moving will use your fule supply!</p>
        <div class="d-flex justify-content-between">
            <div>
                <p class="m-0 ml-2">Up</p>
                <img src="https://img.icons8.com/color/45/000000/w-key.png"/>
            </div>
            <div>
                <p class="m-0 ml-2">Left</p>
                <img src="https://img.icons8.com/color/45/000000/a-key.png"/>
            </div>
            <div>
                <p class="m-0 ml-2">Down</p>
                <img src="https://img.icons8.com/color/45/000000/s-key.png"/>
            </div>
            <div>
                <p class="m-0 ml-2">Right</p>
                <img src="https://img.icons8.com/color/45/000000/d-key.png"/>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div>
                <p class="m-0 ml-2">Pause</p>
                <img src="https://img.icons8.com/color/48/000000/space-key.png"/>
            </div>
            <div>
                <p class="m-0 ml-2">Aim & Shoot</p>
                <img src="https://img.icons8.com/ios-filled/50/000000/mouse-left-click.png"/>
            </div>
        </div>
    </div>
        `;
    $('#itemShopcontainer').html(shopItems)
}