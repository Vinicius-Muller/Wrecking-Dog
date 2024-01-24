export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
  };

  drawScore(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    context.fillText("Score: " + this.game.score, 20, 50);
  };

  drawTime(context) {
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + (this.game.timer * 0.001).toFixed(1), 20, 80);
    if(this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      if(this.game.score > 5) {
        context.fillText("Success", this.game.width * 0.5, this.game.height * 0.5);
      } else {
        context.fillText("Sorry, maybe try again ?", this.game.width * 0.5, this.game.height * 0.5);
      }
    }
  };
  
  draw(context) {
    context.save();
    this.drawScore(context);
    this.drawTime(context);
    context.restore();
  };


}