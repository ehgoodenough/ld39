import * as Pixi from "pixi.js"

import {FRAME} from "scripts/Constants.js"
import Projectile from "scripts/Projectile.js"

const SURGES = [
    [
        {amount: 3, time: 2, speed: 1},
        {amount: 5, time: 0.25},
        {amount: 7, time: 0.25},
    ],
]

export default class BadGuy  extends Pixi.Sprite {
    constructor() {
        super(Pixi.Texture.from(require("images/ufo.png")))

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.stack = 20

        this.position.x = FRAME.WIDTH * 0.85
        this.position.y = FRAME.HEIGHT / 2

        this.maxhull = 20 * 1000 // in ms
        this.hull = this.maxhull

        this.gun = {
            time: 0,
            surges: SURGES[0]
        }

        this.time = 0 // in ms
    }
    update(delta) {
        this.time += delta.ms
        this.rotation = Math.sin(this.time / 500) / 3
        this.position.y = (FRAME.HEIGHT / 2) + (Math.sin(this.time / 500) * 10)

        this.attack(delta)
        this.die(delta)
    }
    attack(delta) {
        this.gun.time += delta.s

        if(this.gun.time > this.gun.surges[0].time) {
            this.gun.time -= this.gun.surges[0].time

            this.performSurge({
                position: this.position,
                direction: this.rotation + Math.PI,
                definition: this.gun.surges[0],
            })

            this.gun.surges.push(this.gun.surges.shift())
        }
    }
    die(delta) {
        if(!!this.parent
        && !!this.parent.goodguy) {
            if(this.parent.goodguy.isAttacking) {
                this.hull -= delta.ms

                if(this.hull < this.maxhull / 2) {
                    this.scale.x = 2
                    this.scale.y = 2
                }

                if(this.hull <= 0) {
                    this.hull = 0
                    console.log("You Win!!")
                }
            }
        }
    }
    performSurge(surge) {
        surge.direction = surge.direction || Math.PI
        surge.position = surge.position || new Pixi.Point()
        surge.definition = surge.definition || new Object()

        var half = (surge.definition.amount - 1) / 2
        for(var i = -half; i <= half; i += 1) {
            this.parent.addChild(new Projectile({
                "direction": surge.direction + (i * (Math.PI/16)),
                "speed": surge.definition.speed,
                "position": surge.position,
            }))
        }
    }
}
