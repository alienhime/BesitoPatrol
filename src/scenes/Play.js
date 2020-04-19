let gameMusic;

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/file sprite
        this.load.image('lips', './assets/lips.png');
        this.load.image('nightsky', './assets/nightsky.png');

        // load spritesheets
        this.load.spritesheet('bat', './assets/anibat.png', {frameWidth: 63, frameHeight: 32, startFrame: 0, endFrame: 1});
        this.load.spritesheet('smoochsplosion', './assets/smoochsplosion.png', {frameWidth: 63, frameHeight: 32, startFrame: 0, endFrame: 10});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'nightsky').setOrigin(0, 0);

        // animation config for bat sprite
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bat', {start: 0, end: 1, first: 0}),
            frameRate: 10,
            repeat: -1
        })

        // add bats (x3) going random directions
        if (Phaser.Math.Between(0, 10) <= 5){
            this.bat01 = new Bat(this, game.config.width + 192, 132, 'bat', 0, 30, "left").setOrigin(0,0).play('fly');
        } else{
            this.bat01 = new Bat(this, -192, 132, 'bat', 0, 30, "right").setOrigin(0,0).play('fly');
        }
        if (Phaser.Math.Between(0, 10) <= 5){
            this.bat02 = new Bat(this, game.config.width + 96, 196, 'bat', 0, 20, "left").setOrigin(0,0).play('fly');
        } else{
            this.bat02 = new Bat(this, -96, 196, 'bat', 0, 30, "right").setOrigin(0,0).play('fly');
        }
        if (Phaser.Math.Between(0, 10) <= 5){
            this.bat03 = new Bat(this, game.config.width, 260, 'bat', 0, 10, "left").setOrigin(0,0).play('fly');
        } else{
            this.bat03 = new Bat(this, 0, 260, 'bat', 0, 10, "right").setOrigin(0,0).play('fly');
        }

        // purple rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xBBBDF2).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xBBBDF2).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xBBBDF2).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xBBBDF2).setOrigin(0, 0);
        // pink UI background
        this.add.rectangle(37, 42, 566, 64, 0xD95291).setOrigin(0,0);

        // add lips (p1)
        this.p1Lips = new Lips(this, game.config.width/2, 431, 'lips').setOrigin(0, 0);

        // define keyboard keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'smooch',
            frames: this.anims.generateFrameNumbers('smoochsplosion', {start: 0, end: 10, first: 0}),
            frameRate: 30
        })

        // score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFB8D9',
            color: '#D95291',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        // display score, timer remaining, and high score
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(470, 54, `HS ${highScore}`, scoreConfig);
        let currentTime = game.settings.gameTimer/1000;
        scoreConfig.align = 'center';
        this.timeDisplay = this.add.text(270, 54, currentTime, scoreConfig);
        
        // decrement timer
        let timedEvent = this.time.addEvent({ 
            delay: 1000, 
            callback: function() {
                currentTime -= 1;
                this.timeDisplay.text = currentTime;
            }, 
            callbackScope: this, 
            repeat: game.settings.gameTimer/1000 - 1 
        });

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, '(S)mooch to Restart or ⭠ for Menu', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(C)redits', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // increase speed after 30 seconds
        this.speedChange = this.time.delayedCall(30000, () => {
            game.settings.batSpeed++;
        }, null, this);

        // add bgm
        gameMusic = this.sound.add('play_bgm', {volume: 0.5});
        gameMusic.play();
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser. Input.Keyboard.JustDown(keyS)) {
            gameMusic.stop();                   // stop music

            if (this.p1Score > highScore) {     // set high score
                highScore = this.p1Score;
            }
            
            // reset bat speed
            game.settings.batSpeed--;
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser. Input.Keyboard.JustDown(keyLEFT)) {
            gameMusic.stop();                   // stop music

            if (this.p1Score > highScore) {     // set high score
                highScore = this.p1Score;
            }

            this.scene.start("menuScene");
        }
        if (this.gameOver && Phaser. Input.Keyboard.JustDown(keyC)) {
            gameMusic.stop();                   // stop music

            if (this.p1Score > highScore) {     // set high score
                highScore = this.p1Score;
            }

            this.scene.start("creditsScene");
        }
        
        // scroll starfield
        this.starfield.tilePositionX -= 4;

        if (!this.gameOver) {
            // update lips
            this.p1Lips.update();
            // update bats
            this.bat01.update();
            this.bat02.update();
            this.bat03.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Lips, this.bat03)) {
            this.p1Lips.reset();
            this.batSmooch(this.bat03);
        }
        if (this.checkCollision(this.p1Lips, this.bat02)) {
            this.p1Lips.reset();
            this.batSmooch(this.bat02);
        }
        if (this.checkCollision(this.p1Lips, this.bat01)) {
            this.p1Lips.reset();
            this.batSmooch(this.bat01);
        }
    }

    checkCollision(lips, bat) {
        // simple AABB checking
        if (lips.x < bat.x + bat.width &&
            lips.x + lips.width > bat.x &&
            lips.y < bat.y + bat.height &&
            lips.height + lips.y > bat.y) {
                return true;
            } else {
                return false;
            }
    }

    batSmooch(bat) {
        bat.alpha = 0;             // temporarily hide bat
        // create smooch sprite at bat's position
        let boom = this.add.sprite(bat.x, bat.y, 'smoochsplosion').setOrigin(0, 0);
        boom.anims.play('smooch'); // play smooch animation 
        boom.on('animationcomplete', () => {
            bat.reset();           // reset bat position
            bat.alpha = 1;         // make bat visible again
            boom.destroy();         // remove bat sprite
        });
        
        // score increment and repaint
        this.p1Score += bat.points;
        this.scoreLeft.text = this.p1Score;

        // play happy bat sfx on contact
        this.sound.play('sfx_bat');
    }
}