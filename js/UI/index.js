export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Sixtyfour";
  };

  drawScore(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    context.fillText("Pontos: " + this.game.score, 20, 50);
  };

  drawTime(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.fillText("Tempo: " + (this.game.timer * 0.001).toFixed(1), 20, 100);
    if(this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
    }
  };

  draw(context) {
    context.save();
    if(!this.game.gameOver) {
      this.drawScore(context);
      this.drawTime(context);
    }
    context.restore();
  };
}

export class LeaderBoard {
  constructor(game) {
    this.game = game;
    this.buildKey = 0;
    this.element = document.getElementById("leaderBoard");
  };

  draw() {
    if(this.game.gameOver) {
      document.getElementById("score").innerText = this.game.score;
      document.getElementById("time").innerText = `${(this.game.timer * 0.001).toFixed(0)}s`;
      this.element.style.display = "initial";
    }
  };

  closeLeaderBoard() {
    this.element.style.display = "none";
    this.buildKey = 0;
  };
}