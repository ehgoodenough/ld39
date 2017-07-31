import * as Pixi from "pixi.js"
import Keyb from "keyb"

const FRICTION = 0.8 // in percent
const EXPLODING_DURATION = 500 // in ms

import {FRAME} from "scripts/Constants.js"

export default class GoodGuy extends Pixi.Sprite {
    constructor() {
        Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST
        super(Pixi.Texture.from(require("images/starship.png")))

        this.stack = 0

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.position.x = 160 / 4
        this.position.y = 90 / 2

        this.velocity = new Pixi.Point()

        this.maxpower = 5000
        this.power = this.maxpower

        window.navigator.getBattery().then((battery) => {
            this.battery = battery
        }).catch((error) => {
            console.log("Could not get battery")
            console.log(error)
        })
    }
    update(delta) {
        if(this.isExploding) {
            this.explode(delta)
        } else {
            this.move(delta)
            this.attack(delta)
            this.charge(delta)
        }

        // if(!!this.battery) {
        //     if(this.battery.charging) {
        //         this.tint = 0xCC0000
        //     } else {
        //         this.tint = 0x00CC00
        //     }
        // }
    }
    move(delta) {
        // Polling for input
        if(Keyb.isDown("W") || Keyb.isDown("<up>")) {
            this.velocity.y = -1 * this.speed
        }
        if(Keyb.isDown("S") || Keyb.isDown("<down>")) {
            this.velocity.y = +1 * this.speed
        }
        if(Keyb.isDown("A") || Keyb.isDown("<left>")) {
            this.velocity.x = -1 * this.speed
        }
        if(Keyb.isDown("D") || Keyb.isDown("<right>")) {
            this.velocity.x = +1 * this.speed
        }

        // Translation via velocity
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // Collision with the frame
        this.position.x = Math.min(Math.max(this.position.x, 0), FRAME.WIDTH)
        this.position.y = Math.min(Math.max(this.position.y, 0), FRAME.HEIGHT)

        // Deceleration via friction
        this.velocity.x *= FRICTION
        this.velocity.y *= FRICTION
    }
    attack(delta) {
        if(this.isAttacking) {
            this.power -= delta.ms
            if(this.power < 0) {
                this.power = 0
            }
        }
    }
    charge(delta) {
        if(this.isPluggedIn) {
            this.power += delta.ms
            if(this.power > this.maxpower) {
                this.power = this.maxpower
            }
        }
    }
    explode(delta) {
        this.rotation += (Math.PI / 12) * delta.f

        this.isExploding += delta.ms
        if(this.isExploding > EXPLODING_DURATION) {
            if(!!this.parent) {
                this.parent.restart()
            }
        }
    }
    get isAttacking() {
        return this.power > 0
            && !this.isPluggedIn
            && this.position.x < FRAME.WIDTH * 0.85
    }
    get isPluggedIn() {
        return Keyb.isDown("<space>")
    }
    get speed() {
        return this.power > 0 ? 1 : 0.75
    }
}
