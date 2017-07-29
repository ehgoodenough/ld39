import * as Pixi from "pixi.js"
import Keyb from "keyb"

import {FRAME} from "scripts/Constants.js"

import Player from "scripts/Player.js"
import Projectile from "scripts/Projectile.js"

export default class Game extends Pixi.Container {
    constructor() {
        super()

        this.renderer = Pixi.autoDetectRenderer({
            width: FRAME.WIDTH, height: FRAME.HEIGHT,
            transparent: true
        })

        // this.addChild(this.player = new Player())
        this.addChild(new Boss())

        if("DEVELOPMENT") {
            window.game = this
        }
    }
    update(delta) {
        this.children.forEach((child) => {
            if(child.update instanceof Function) {
                child.update(delta)
            }
        })
    }
    render() {
        this.renderer.render(this)
    }
}

class Boss extends Pixi.Sprite {
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
            {amount: 3, time: 2, speed: 1},
            {amount: 5, time: 0.25},
            {amount: 7, time: 0.25},
        ]

        this.rotationTime = 0
        this.rotation = Math.PI
    }
    update(delta) {
        if(!this.parent) {
            return
        }

        this.rotationTime += delta.s
        this.time += delta.s

        this.rotation = Math.PI - (Math.sin(this.rotationTime / 4) / 2)

        if(this.surges.length > 0) {
            var surge = this.surges[0]

            if(this.time > surge.time) {
                this.time -= surge.time
                this.shootProjectiles(surge, this.rotation, this.position)
                this.surges.push(this.surges.shift())
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
