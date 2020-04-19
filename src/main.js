/*  
    BESITO PATROL by Mikayla Roberts
    4-18-2020

    Points Breakdown:
    - Track a high score that persists across scenes and display it in the UI (10)
    - Add your own (copyright-free) background music to the Play scene (10)
    - Implement the speed increase that happens after 30 seconds in the original game (10)
    - Randomize each spaceship's movement direction at the start of each play (10)
    - Display the time remaining (in seconds) on the screen (15)
    - Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)
        * Made new artwork for all assets (tile sprite, animated bat sprite to replace spaceships, lips to replace 
          rocket, and a new collision animation), repainted all UI, and created and added new sfx (selection sound, 
          "kissing" sound, bat sounds on collision) to change the theme of the game from shooting spaceships to 
          kissing bats.
    
    TOTAL: 100 (+5 excess points)

    Credits (also accessible within the game):
    - Code modified from Nathan Altice's Phaser 3 Rocket Patrol Tutorial 
    - Menu BGM: "Dream Course" from PlayOnLoop.com
    - Play BGM: "Dead Disco" by Henry Homesweet
    - Credits BGM: "Starry Island" from PlayOnLoop.com
*/
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