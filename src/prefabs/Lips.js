// Lips prefab
class Lips extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isSmooching = false;      // track lips' smooching status
        this.sfxSmooch = scene.sound.add('sfx_kiss'); // add smooching sfx
    }

    update() {
        // left/right movement
        if(!this.isSmooching) {
            if(keyLEFT.isDown && this.x >= 47) {
                this.x -= 2;
            } else if (keyRIGHT.isDown && this.x <= 578) {
                this.x += 2;
            }
        }
        // smooch button
        if(Phaser.Input.Keyboard.JustDown(keyS) && !this.isSmooching) {
            this.isSmooching = true;
            this.sfxSmooch.play();  //play sfx
        }

        // if smooching, move up
        if(this.isSmooching && this.y >= 108) {
            this.y -= 2;
        }
        // reset on miss
        if(this.y <= 108) {
            this.isSmooching = false;
            this.y = 431;
        }
    }

    // reset lips to "ground"
    reset() {
        this.isSmooching = false;
        this.y = 431;
    }
}