export const Empty = new Audio(require("sounds/empty.wav"))
Empty.volume = 0.05

export const BadGuyDeathLoop = new Audio(require("sounds/badguy-death-loop.wav"))
export const BadGuyDeathEnd = new Audio(require("sounds/badguy-death-conclusion.wav"))
BadGuyDeathLoop.volume = 0.25
BadGuyDeathLoop.loop = true
BadGuyDeathEnd.volume = 0.45

export const Win = new Audio(require("sounds/victory.wav"))
Win.volume = 0.25

export const BadGuyGrowing = new Audio(require("sounds/badguy-growing.wav"))
BadGuyGrowing.volume = 0.35

export const GoodGuyDeath = new Audio(require("sounds/goodguy-death.wav"))
GoodGuyDeath.volume = 0.15

export const Attacking = new Audio(require("sounds/shooting2.wav"))
Attacking.volume = 0.05
Attacking.playbackRate = 0.5

export const Recharging = new Audio(require("sounds/recharging1.wav"))
export const Recharged = new Audio(require("sounds/recharged.wav"))
Recharging.volume = 0.1
Recharged.volume = 0.15

Attacking.addEventListener("canplay", () => Attacking.isLoaded = true)
Recharged.addEventListener("canplay", () => Recharged.isLoaded = true)
Recharging.addEventListener("canplay", () => Recharging.isLoaded = true)
