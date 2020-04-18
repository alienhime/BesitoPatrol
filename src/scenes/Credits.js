let creditsMusic;

class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        // load audio
        this.load.audio('credits_bgm', './assets/POL_starryisland.wav');
    }

    create() {
        // set background color
        this.cameras.main.setBackgroundColor('#BBBDF2');

        // credits display
        let creditsConfig = {
            fontFamily: 'Courier',
            fontSize: '15px',
            backgroundColor: '#BBBDF2',
            color: '#4D4373',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show credit text
        let centerX = game.config.width/2;
        let topY = 20;
        let textSpacer = 50;

        this.add.text(centerX, topY, 'CREDITS', creditsConfig).setOrigin(0.5);
        this.add.text(centerX, topY + textSpacer, 'Created by Mikayla Roberts', creditsConfig).setOrigin(0.5);
        this.add.text(centerX, topY + textSpacer * 2, 'Inspired by Rocket Patrol (1978) for the APF MP-1000 videogame system', creditsConfig).setOrigin(0.5);
        this.add.text(centerX, topY + textSpacer * 3, 'Code modified from Nathan Altice\'s Phaser 3 Rocket Patrol Tutorial', creditsConfig).setOrigin(0.5);
        this.add.text(centerX, topY + textSpacer * 5, 'Music:', creditsConfig).setOrigin(0.5);
        this.add.text(centerX, topY + textSpacer * 6, '"Dream Course" & "Starry Island" from PlayOnLoop.com', creditsConfig).setOrigin(0.5);
        this.add.text(centerX, topY + textSpacer * 7, '"Dead Disco" by Henry Homesweet', creditsConfig).setOrigin(0.5);
        this.add.text(centerX, game.config.height - 20, 'Press ⭠ to return to menu', creditsConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        
        // add bgm
        creditsMusic = this.sound.add('credits_bgm');
        creditsMusic.play({
            loop:true
        });
    }

    update() {
        // return to menu
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            creditsMusic.stop();
            this.scene.start("menuScene");
        }
    }
}