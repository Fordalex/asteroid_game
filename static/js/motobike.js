var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = 500;
c.height = 350;
document.body.appendChild(c);

var perm = [];
while (perm.length < 255) {
    while (perm.includes(val = Math.floor(Math.random() * 255)));
    perm.push(val);
}


var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t*Math.PI)) /2;
var noise = x => {
    x = x * 0.01 % 255;
    return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}


function loop() {
    ctx.fillStyle = "#19f";
    ctx.fillRect(0,0,c.width, c.height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, c.height)
    for (let i = 0; i < c.width; i++) {
        ctx.lineTo(i, c.height - noise(i) * 0.25);
    }

    ctx.lineTo(c.width, c.height);
    ctx.fill();
    requestAnimationFrame(loop)
}

loop();