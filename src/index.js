import Phaser from 'phaser';
import { MyGame } from './scenes/Game_Scene';

var worldWidth = 500;
var worldHeight = 500;

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-cube',
    width: worldWidth,
    height: worldHeight,
    scene: MyGame,
    backgroundColor: "#000000"
};

document.body.style.margin = 0;
document.body.style.padding = 0;

const game = new Phaser.Game(config);