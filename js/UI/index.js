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
    context.fillText("Time: " + this.game.timer, 20, 80);
  };
  
  draw(context) {
    this.drawScore(context);
    this.drawTime(context);
  };


}