import { Player } from "./player/index.js";
import { InputHandler } from "./player/controls.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.screen.width;
  canvas.height = window.screen.height;
  
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.keyInput = new InputHandler();
    };
    update() {
      this.player.update(this.keyInput.keys);
    };
    draw(context) {
      this.player.draw(context);
    };
  }

  const game = new Game(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
