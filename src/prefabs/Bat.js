// Bat prefab
class Bat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, direction) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        // store pointValue
        this.points = pointValue;
        // store direction
        this.facing = direction;
        
    }

    update() {
        // move bat left or right depending on which way it's facing
        if (this.facing == "left"){
            this.x -= game.settings.batSpeed;

            // wraparound screen bounds
            if (this.x <= 0 - this.width) {
                this.reset();
            }
        }else {
            this.x += game.settings.batSpeed;

            // wraparound screen bounds
            if (this.x >= game.config.width) {
                this.reset();
            }
        }
        
    }

    reset() {
        if (this.facing == "left"){
            this.x = game.config.width;
        } else {
            this.x = 0;
        }
        
    }

}