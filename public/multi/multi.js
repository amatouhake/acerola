var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var io = io();
io.emit('join', {name: 'Player', room: 'multi'});

var platforms;
var player;
var gumis = {};
var w;
var s;
var a;
var d;
var space;
var time;

function preload () {
    this.load.image('background', 'assets/background.png');
    this.load.image('grass', 'assets/grass.png');
    this.load.image('gumi', 'assets/gumi.png');
}

function create () {
    this.add.image(config.width/2, config.height/2, 'background');

    platforms = this.physics.add.staticGroup();
    platforms.create(config.width/2, config.height*0.9, 'grass');

    player = this.physics.add.sprite(config.width/2, config.height/2, 'gumi');

    w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    this.physics.add.collider(player, platforms);
}

function update () {
    time += 1;

    if(a.isDown) player.setVelocityX(-200);
    if(d.isDown) player.setVelocityX(200);
    if(a.isUp && d.isUp) player.setVelocityX(0);

    if (space.isDown && player.body.touching.down) player.setVelocityY(-500);

    io.emit('multi', {
        x: player.x,
        y: player.y
    });
    io.on('multi', msg => {
        Object.keys(msg).filter(k => k != io.id).forEach(id => {
            if(!Boolean(gumis[id])) {
                gumis[id] = this.physics.add.sprite(msg[id].x, msg[id].y, 'gumi');
                this.physics.add.collider(gumis[id], player);
                this.physics.add.collider(gumis[id], platforms);
            } else {
                gumis[id].x = msg[id].x;
                gumis[id].y = msg[id].y;
            }
        });
    });
    io.on('multi-dis', msg => {
        gumis[msg].destroy();
    });
}
