import * as Pixi from "pixi.js"

const COLLISION_DISTANCE = 10 - 2
import {FRAME} from "scripts/Constants.js"
import {getDistance} from "scripts/Geometry.js"

export default class Projectile extends Pixi.Sprite {
    constructor(protoprojectile) {
        super(Pixi.Texture.from(require("images/pixel.png")))

        this.width = 5
        this.height = 5

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.position.x = protoprojectile.position.x || 0
        this.position.y = protoprojectile.position.y || 0

        this.direction = protoprojectile.direction || 0
        this.speed = protoprojectile.speed || 1
    }
    update(delta) {
        this.position.x += Math.cos(this.direction) * this.speed
        this.position.y += Math.sin(this.direction) * this.speed

        this.rotation -= Math.PI / 24

        if(!!this.parent) {
            // Collision with the good guy.
            if(!!this.parent.goodguy
            && !this.parent.goodguy.isExploding) {
                if(getDistance(this.position, this.parent.goodguy.position) < COLLISION_DISTANCE) {
                    this.parent.goodguy.isExploding = true
                }
            }

            // Collision with the frame.
            if(this.position.x < 0 - this.width
            || this.position.y < 0 - this.height
            || this.position.x > FRAME.WIDTH + this.width
            || this.position.y > FRAME.HEIGHT + this.height) {
                this.parent.removeChild(this)
            }
        }
    }
}
