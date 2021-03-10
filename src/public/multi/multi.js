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
    player.setCollideWorldBounds(true);

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
    
    Object.keys(gumis).forEach(id => {
        gumis[id].setCollideWorldBounds(true);
        this.physics.add.collider(gumis[id], player);
        this.physics.add.collider(gumis[id], platforms);
        if(time%100) gumis[id].disableBody(true, true);
    });

    io.emit('multi', [io.id, player.x, player.y]);
    io.on('multi', data => {
        if(data[0] != io.id) {
            if(!gumis[data[0]]) {
                gumis[data[0]] = this.physics.add.sprite(config.width/2, config.height/2, 'gumi');
            }
            else {
                gumis[data[0]].enableBody(false, false);
                gumis[data[0]].x = data[1];
                gumis[data[0]].y = data[2];
            }
        }
    });
}
