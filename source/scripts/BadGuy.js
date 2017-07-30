import * as Pixi from "pixi.js"

import {FRAME} from "scripts/Constants.js"
import Projectile from "scripts/Projectile.js"

export default class Boss extends Pixi.Sprite {
    constructor() {
        super(Pixi.Texture.from(require("images/pixel.png")))

        this.width = 32
        this.height = 32

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.position.x = FRAME.WIDTH - (this.width * this.anchor.x)
        this.position.y = FRAME.HEIGHT / 2

        this.tint = 0

        this.time = 0
        this.surges = [
            // {amount: 1, time: 0.5, speed: 0.5},
            // {amount: 3, time: 2, speed: 1},
            // {amount: 5, time: 0.25},
            // {amount: 7, time: 0.25},
        ]

        this.rotationTime = 0
        this.rotation = Math.PI

        this.maxhull = 10 * 1000
        this.hull = this.maxhull
    }
    update(delta) {
        if(!this.parent) {
            return
        }

        this.rotationTime += delta.s
        this.time += delta.s

        // this.rotation = Math.PI - (Math.sin(this.rotationTime / 4) / 2)

        if(this.surges.length > 0) {
            var surge = this.surges[0]

            if(this.time > surge.time) {
                this.time -= surge.time
                this.shootProjectiles(surge, this.rotation, this.position)
                this.surges.push(this.surges.shift())
            }
        }

        if(!!this.parent
        && !!this.parent.goodguy) {
            if(this.parent.goodguy.isAttacking) {
                this.hull -= delta.ms
                if(this.hull <= 0) {
                    this.hull = 0
                    console.log("You Win!!")
                }
            }
        }
    }
    shootProjectiles(surge, direction, position) {
        direction = direction || Math.PI
        var half = (surge.amount - 1) / 2
        for(var i = -half; i <= half; i += 1) {
            this.parent.addChild(new Projectile({
                "direction": direction + (i * (Math.PI/16)),
                "speed": surge.speed,
                "position": position,
            }))
        }
    }
}
