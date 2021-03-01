let c = document.createElement("canvas");
document.body.appendChild(c);
let ctx = c.getContext("2d");
let t, m;
let w = 900;
let h = 1600;
let k = new Set();

resize();
addEventListener('resize', resize);

addEventListener('mousedown', e => {
    k.add("mouse");
});

addEventListener('mouseup', e => {
    k.delete("mouse");
});

addEventListener('keydown', e => {
    k.add(e.key);
});

addEventListener('keyup', e => {
    k.delete(e.key);
});

function resize() {
    if(innerWidth/9<innerHeight/16) {
        c.width = innerWidth;
        c.height = innerWidth/9*16;
    } else {
        c.width = innerHeight/16*9;
        c.height = innerHeight;
    }
    m = c.width/w;
}

let p = new function() {
    this.x = 450;
    this.y = 1400;
    this.hp = 20;
}

function loop() {
    t += 1;

    if(k.has("w")) {
        p.y -= p.y > 0 ? 5 : 0;
    }
    if(k.has("s")) {
        p.y += p.y < h ? 5 : 0;
    }
    if(k.has("a")) {
        p.x -= p.x > 0 ? 5 : 0;
    }
    if(k.has("d")) {
        p.x += p.x < w ? 5 : 0;
    }

    draw();
    requestAnimationFrame(loop);
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 900*m, c.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(p.x*m, p.y*m, 20*m, 0, Math.PI * 2, true);
    ctx.fill();
}

loop();