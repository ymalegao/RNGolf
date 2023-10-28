// Exercise 02: RNGolf
// Name: Yash Malegaonkar
// Date: 10/27/09
//I did the Add logic so the ball resets to the bottom on a successful “hole-in”
// Improve shot logic by making the input pointer’s relative x-position shoot the ball in the correct x direction
//Create and display (1) a shot counter (2) score (“hole-in”) and (3) successful shot percentage
'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    physics: {
        default: 'arcade',
        aracade:{
            debug: true
        }
    },
    scene: [ Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config