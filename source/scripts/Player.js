import * as Pixi from "pixi.js"
import Keyb from "keyb"

export default class Player extends Pixi.Sprite {
    constructor() {
        super(Pixi.Texture.from(require("images/pixel.png")))

        this.width = 12
        this.height = 12

        this.speed = 1.5

        this.position.x = 160 / 2
        this.position.y = 90 / 2

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        window.navigator.getBattery().then((battery) => {
            this.battery = battery
        }).catch((error) => {
            console.log("Could not get battery")
            console.log(error)
        })
    }
    update(delta) {
        if(Keyb.isDown("W") || Keyb.isDown("<up>")) {
            this.position.y -= 1
        }
        if(Keyb.isDown("S") || Keyb.isDown("<down>")) {
            this.position.y += 1
        }
        if(Keyb.isDown("A") || Keyb.isDown("<left>")) {
            this.position.x -= 1
        }
        if(Keyb.isDown("D") || Keyb.isDown("<right>")) {
            this.position.x += 1
        }

        if(this.battery != undefined) {
            if(this.battery.charging) {
                this.tint = 0xCC0000
            } else {
                this.tint = 0x00CC00
            }
        }
    }
}
