import * as Pixi from "pixi.js"
import Keyb from "keyb"

export default class Player extends Pixi.Sprite {
    constructor() {
        Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST
        super(Pixi.Texture.from(require("images/starship.png")))

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.position.x = 160 / 2
        this.position.y = 90 / 2

        this.velocity = new Pixi.Point()

        this.speed = 1.5

        window.navigator.getBattery().then((battery) => {
            this.battery = battery
        }).catch((error) => {
            console.log("Could not get battery")
            console.log(error)
        })
    }
    update(delta) {
        if(this.isExploding) {
            return
        }

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

        // if(!!this.battery) {
        //     if(this.battery.charging) {
        //         this.tint = 0xCC0000
        //     } else {
        //         this.tint = 0x00CC00
        //     }
        // }
    }
    explode() {
        this.isExploding = true
    }
}
