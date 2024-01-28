export class CollisionAnimation {
  constructor(game, point, hit, x, y) {
    this.game = game;
    this.point = point;
    this.hit = hit,
    this.image = document.getElementById("collisionAnimation");
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.sizeModifier = Math.random() + 0.5;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.frameX = 0;
    this.maxFrame = 4;
    this.markedToDeletion = false;
    this.fps = Math.random() * 10 + 5;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.fontSize = 30;
    this.fontFamily = "Sixtyfour";
  };
  
  update(deltaTime) {
    this.x -= this.game.speed;
    if(this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if(this.frameX > this.maxFrame) this.markedToDeletion = true;
  };

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth, 
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  drawPoint(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.fillStyle = this.hit ? "yellow" : "red";
    context.fillText(this.point, this.x + (this.width * 0.3), this.y);
  }
}