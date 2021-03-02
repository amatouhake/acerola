var config = {
    type: Phaser.AUTO,
    width: 450,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
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

var cursors;
var player;
var speed = 1;
var time = 0;
var shot;
var shots;
var turbo;
var turbo_time = 0;
var turbo_delay = 0;

function preload () {
    this.load.image('space', 'assets/space.png');
    this.load.image('shot', 'assets/shot.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
}

function create () {
    this.add.image(225, 400, 'space');
    player = this.physics.add.sprite(225, 600, 'player');

    player.setCollideWorldBounds(true);
    shots = this.physics.add.group();

    this.anims.create({
        key: 'normal',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turbo',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    player.anims.play('normal', true);

    cursors = this.input.keyboard.createCursorKeys();
    shot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    turbo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
}

function goodbye(obj) { obj.kill();  obj.destroy();}

function update () {
    time += 1;
    if(shot.isDown) {
        if(time%5 == 0) player_shot();
    }

    if(turbo.isDown && turbo_time <= 100) {
        player.anims.play('turbo', true);
        speed = 2;
        turbo_time += 1;
    } else {
        player.anims.play('normal', true);
        speed = 1;
        if(turbo_time > 100) {
            turbo_delay += 1;
            if(turbo_delay > 400) {
                turbo_time = 0;
                turbo_delay = 0;
            }
        }
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-160*speed);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160*speed);
    } else if (cursors.up.isDown) {
        player.setVelocityY(-160*speed);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160*speed);
    } else {
        player.setVelocityX(0);
        player.setVelocityY(0)
    }
}

function player_shot() {
    var shot = shots.create(player.x, player.y, 'shot');
    shot.setVelocityY(-320);
}