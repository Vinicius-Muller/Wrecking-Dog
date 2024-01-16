import { Player } from "./player/index.js";
import { InputHandler } from "./player/controls.js";
import { Background } from "./background/index.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.screen.width;
  canvas.height = window.screen.height;
  
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 180;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.keyInput = new InputHandler();
    };
    update(deltaTime) {
      this.background.update();
      this.player.update(this.keyInput.keys, deltaTime);
    };
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
    };
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
