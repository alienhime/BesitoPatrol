let menuMusic;

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_bat', './assets/bat_sfx.wav');
        this.load.audio('sfx_kiss', './assets/kiss.wav');
        this.load.audio('menu_bgm', './assets/POL_dreamcourse.wav');
        this.load.audio('play_bgm', './assets/HenryHomesweet_DeadDisco.mp3');
    }

    create() {
        // set background color
        this.cameras.main.setBackgroundColor('#BBBDF2');

        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#4D4373',
            color: '#BBBDF2',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'BESITO PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use ⭠⭢ arrows to move & (S) to Smooch', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#D95291';
        menuConfig.color = '#FFB8D9';
        this.add.text(centerX, centerY + textSpacer, 'Press ⭠ for Easy or ⭢ for Hard', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // add bgm
        menuMusic = this.sound.add('menu_bgm');
        menuMusic.play({
            loop:true
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                batSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            menuMusic.stop();
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                batSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            menuMusic.stop();
            this.scene.start("playScene");
        }
    }
}