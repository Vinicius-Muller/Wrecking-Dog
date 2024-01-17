import { Player } from "./player/index.js";
import { InputHandler } from "./player/controls.js";
import { Background } from "./background/index.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies/index.js";

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
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
    };
    update(deltaTime) {
      this.background.update();
      this.player.update(this.keyInput.keys, deltaTime);
      if(this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime);
        if(enemy.markedToDeletion) {
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }
      });
    };
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });
    };
    addEnemy() {
      if(this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this))
      } else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
      console.log(this.enemies)
    }
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
