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
    this.winSound = document.getElementById("winSound");
  };

  draw() {
    if(this.game.gameOver) {
      document.getElementById("endMsg").innerHTML = this.game.score > 0 ? "Parabéns !" : "Fracassou !"
      document.getElementById("score").innerText = this.game.score;
      this.element.style.display = "initial";
      this.winSound.play();
    }
  };

  closeLeaderBoard() {
    this.element.style.display = "none";
    this.buildKey = 0;
  };
};

export class Tutorial extends UI {
  constructor(game) {
    super();
    this.game = game;
    this.tutorialView = document.getElementById("tutorialView");
  };

  draw() {
    if(this.game.tutorial) this.tutorialView.style.display = "flex";
    else this.tutorialView.style.display = "none";
  };
};