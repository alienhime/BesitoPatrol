let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Credits ],
};

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    batSpeed: 3,
    gameTimer: 60000
}

// reserve some keyboard variables
let keyS, keyC, keyLEFT, keyRIGHT;

// initialize high score variable
let highScore = 0;