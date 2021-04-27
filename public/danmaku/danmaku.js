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
var bullet;
var bullets;
var meteos;
var turbo;
var turbo_time = 0;
var turbo_delay = 0;
var hp = 20;
var hpText;
var gameOver = false;
var gameOverText;
var score = 0;
var scoreText;

function preload () {
    this.load.image('space', 'assets/space.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('meteo', 'assets/meteo.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
}

function create () {
    this.add.image(225, 400, 'space');
    this.physics.world.setBoundsCollision(true, true, true, true);

    cursors = this.input.keyboard.createCursorKeys();
    shot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    turbo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    player = this.physics.add.sprite(225, 600, 'player');
    player.setCollideWorldBounds(true);
    
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
    
    bullets = this.physics.add.group();
    meteos = this.physics.add.group();
    hpText = this.add.text(16, 16, 'HP: 20', { fontSize: '32px', fill: '#fff' });
    scoreText = this.add.text(16, 48, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    this.physics.add.collider(bullets, meteos, hitBullet, null, this);
    this.physics.add.collider(player, meteos, hitPlayer, null, this);
}

function update () {
    if(gameOver) return;

    time += 1;
    if(shot.isDown) {
        if(time%20 == 0) player_shot();
    };
    if(time%3 == 0) spawn_enemy();
    if(time%13 == 0) spawn_enemy_two();
    if(time%50 == 0) spawn_enemy_three();

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

    if(cursors.left.isDown && !cursors.right.isDown) {
        player.setVelocityX(-160*speed);
    } 
    if(cursors.right.isDown && !cursors.left.isDown) {
        player.setVelocityX(160*speed);
    }
    if(cursors.up.isDown && cursors.down.isUp) {
        player.setVelocityY(-160*speed);
    }
    if(cursors.down.isDown && cursors.up.isUp) {
        player.setVelocityY(160*speed);
    }
    if(cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp) {
        player.setVelocityX(0);
        player.setVelocityY(0)
    }
}

function player_shot() {
    var bullet = bullets.create(player.x, player.y, 'bullet');
    bullet.setVelocityY(-320);
}

function spawn_enemy() {
    var enemy = meteos.create(450/2, 0, 'meteo');
    var angle = Math.sin(time)*Math.PI*0.3;
    enemy.setVelocityX(Math.sin(angle)*320);
    enemy.setVelocityY(Math.cos(angle)*320);
}

function spawn_enemy_two() {
    var enemy = meteos.create(450/2, 0, 'meteo');
    var angle = Math.sin(time)*Math.PI*0.3;
    enemy.setVelocityX(Math.sin(angle)*480);
    enemy.setVelocityY(Math.cos(angle)*480);
    enemy.setTint(0x00ffff);
} 

function spawn_enemy_three() {
    var enemy = meteos.create(450/2, 0, 'meteo');
    var angle = Math.sin(time)*Math.PI*0.01;
    enemy.setVelocityX(Math.sin(angle)*200);
    enemy.setVelocityY(Math.cos(angle)*200);
    enemy.setTint(0x00ff00);
} 

function hitBullet(bullet, meteo) {
    bullet.disableBody(true, true);
    meteo.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}

function hitPlayer(bullet, meteo) {
    hp -= 1;
    hpText.setText('HP: ' + hp);
    if(hp == 0) {
        gameOverText = this.add.text(48, 368, 'GAME OVER', { fontSize: '64px', fill: '#f00' });
        this.physics.pause();
        player.setTint(0xff0000);
        gameOver = true;
    }
    meteo.disableBody(true, true);
}
