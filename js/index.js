import { Player } from "./player/index.js";
import { InputHandler } from "./player/controls.js";
import { Background } from "./background/index.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies/index.js";
import { UI, LeaderBoard } from "./UI/index.js";

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
      this.keyInput = new InputHandler(this);
      this.UI = new UI(this);
      this.leaderBoard = new LeaderBoard(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = []
      this.maxParticles = 50;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = "white";
      this.timer = 0;
      this.maxTime = 10000000;
      this.gameOver = false;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    };
    update(deltaTime) {
      if(!this.gameOver) this.timer += deltaTime;
      if(this.timer > this.maxTime) {
        this.gameOver = true;
      }
      this.background.update();
      this.player.update(this.keyInput.keys, deltaTime);
      if(!game.gameOver && this.enemyTimer > this.enemyInterval) {
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
      this.particles.forEach((particle, index) => {
        particle.update();
        if(particle.markedToDeletion) this.particles.splice(index, 1);
      });
      if(this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
        if(collision.markedToDeletion) {
          this.collisions.splice(index, 1);
        }
      });
      if(this.gameOver && this.leaderBoard.buildKey === 0) {
        this.leaderBoard.draw();
        this.leaderBoard.buildKey++;
        this.enemies = [];
        this.resetGame();
      }
    };
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });
      this.particles.forEach(particle => {
        particle.draw(context);
      });
      this.collisions.forEach(collision => {
        collision.draw(context);
        collision.drawPoint(context);
      });
      this.UI.draw(context);
    };
    addEnemy() {
      if(this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this))
      } else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    };
    resetGame() {
      const reload = document.getElementById("reloadBtn");
      reload.addEventListener("click", () => {
        this.timer = 0;
        this.score = 0;
        this.player.x = 0;
        this.gameOver = false;
        this.leaderBoard.closeLeaderBoard();
      });
    };
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
