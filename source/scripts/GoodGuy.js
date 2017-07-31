import * as Pixi from "pixi.js"
import Keyb from "keyb"

const FRICTION = 0.8 // in percent
const EXPLODING_DURATION = 500 // in ms

import {FRAME} from "scripts/Constants.js"

import {Attacking} from "scripts/Sounds.js"
import {Recharging} from "scripts/Sounds.js"
import {Recharged} from "scripts/Sounds.js"
import {Empty} from "scripts/Sounds.js"

export default class GoodGuy extends Pixi.Sprite {
    constructor() {
        Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST
        super(Pixi.Texture.from(require("images/starship.png")))

        this.stack = 0

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.position.x = 160 * (1 - 0.85)
        this.position.y = 90 / 2

        this.velocity = new Pixi.Point()

        this.maxpower = 5000
        this.power = 0

        this.addChild(this.message = new Pixi.Sprite(Pixi.Texture.from(require("images/time-to-recharge.png"))))
        this.message.anchor.x = 0.5
        this.message.anchor.y = 1
        this.message.position.y = -9
        this.message.visible = false

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

        if(Attacking.isLoaded) {
            if(this.isAttacking) {
                Attacking.play()
            } else {
                Attacking.pause()
                Attacking.currentTime = 0
            }
        }

        if(this.power == 0) {
            this.tint = 0x888888
        } else {
            this.tint = 0xFFFFFF
        }

        if(this.power == 0) {
            this.message.visible = true
            this.message.position.x = Math.random() * 2 - 1
            this.message.position.y = -9 + (Math.random() * 2 - 1)
        } else {
            this.message.visible = false
        }

        if(this.parent && this.parent.prompt && this.parent.prompt.isDone != true) {
            this.message.visible = false
        }

        if(this.parent && this.parent.badguy && this.parent.badguy.isExploding) {
            this.message.visible = false
        }
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
            if(this.power > 0) {
                this.power -= delta.ms
                if(this.power < 0) {
                    this.power = 0
                    Empty.play()
                }
            }
        }
    }
    charge(delta) {
        if(this.isPluggedIn) {
            if(this.power < this.maxpower) {
                this.power += delta.ms
                if(this.power > this.maxpower) {
                    this.power = this.maxpower
                    if(Recharged.isLoaded) {
                        Recharged.play()
                    }
                } else {
                    if(Recharging.isLoaded) {
                        Recharging.play()
                    }
                }
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
        let badguy = this.parent.badguy
        return this.power > 0
            && !this.isPluggedIn
            && this.position.x < FRAME.WIDTH * 0.75
            && !!badguy
            && badguy.isExploding <= 0
    }
    get isPluggedIn() {
        if(Keyb.isDown("<space>")) {
            return true
        }
        if(this.battery) {
            return this.battery.charging
        }
    }
    get speed() {
        return this.power > 0 ? 1 : 0.75
    }
}
