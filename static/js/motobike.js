var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = 500;
c.height = 350;
document.body.appendChild(c);

var perm = [];
var floorHeight = 350;
while (perm.length < floorHeight) {
    // the height of the floor being generated
    while (perm.includes(val = Math.floor(Math.random() * floorHeight)));
    perm.push(val);
}


var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t*Math.PI)) /2;
var noise = x => {
    // x * val. is how close together the hills are. Greater the value closer the hills
    x = x * 0.01 % 255;
    return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}

var player = new function() {
    this.x = c.width / 2;
    this.y = 0;
    this.diameter = 5;
    this.ySpeed = 0;
    this.rot = 0;

    this.draw = function() {
        var p1 = c.height - noise(t + this.x) * 0.25;
        if (p1 - this.diameter> this.y) {
            this.ySpeed += 0.1;
        } else {
            this.ySpeed -= this.y - (p1-this.diameter);
            this.y = p1 - this.diameter;
        }
        this.y += this.ySpeed;

        ctx.beginPath();
      
        ctx.arc(this.x, this.y, this.diameter, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.fill()
    }
}

var t = 0;
function loop() {
    t += 2;
    ctx.fillStyle = "#f3ffd6";
    ctx.fillRect(0,0,c.width, c.height);

    ctx.fillStyle = "#242424";
    ctx.beginPath();
    ctx.moveTo(0, c.height)
    for (let i = 0; i < c.width; i++) {
        ctx.lineTo(i, c.height - noise(t + i) * 0.25);
    }

    ctx.lineTo(c.width, c.height);
    ctx.fill();

    player.draw();
    requestAnimationFrame(loop)
}

loop();