import * as Pixi from "pixi.js"

const COLORS = [
    0xFFFFFF, // WHITE
    // 0xB33A01, // BLUE
    // 0x7BCEEE, // LIGHER BLUE
    0xD7B45A, // ELECTRICITY,
    0xB33A01, // BAD GUY RED
    0xD7B45A, // ELECTRICITY,
    0xB33A01, // BAD GUY RED
]

import {FRAME} from "scripts/Constants.js"

export default class Star extends Pixi.Sprite {
    constructor() {
        super(Pixi.Texture.from(require("images/pixel.png")))

        this.position.x = Math.random() * FRAME.WIDTH
        this.position.y = Math.random() * FRAME.HEIGHT

        this.stack = -100000000

        this.speed = (Math.random() * 0.5) + 0.5

        this.tint = COLORS[Math.floor(Math.random() * COLORS.length)]
    }
    update(delta) {
        this.position.x -= this.speed

        if(this.position.x < -5) {
            this.position.x += FRAME.WIDTH + 10
            this.position.y = Math.random() * FRAME.HEIGHT
        }
    }
}
