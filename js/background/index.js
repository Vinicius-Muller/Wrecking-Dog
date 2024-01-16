class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  };
  update() {
    if(this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  };
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  };
};

export class Background {
  constructor(game) {
    this.game = game;
    this.width = window.screen.width;
    this.height = window.screen.height;
    this.layerOneImage = document.getElementById("layerOne");
    this.layerTwoImage = document.getElementById("layerTwo");
    this.layerThreeImage = document.getElementById("layerThree");
    this.layerFourImage = document.getElementById("layerFour");
    this.layerFiveImage = document.getElementById("layerFive");
    this.layerOne = new Layer(this.game, this.width, this.height, 0, this.layerOneImage);
    this.layerTwo = new Layer(this.game, this.width, this.height, 0.2, this.layerTwoImage);
    this.layerThree = new Layer(this.game, this.width, this.height, 0.4, this.layerThreeImage);
    this.layerFour = new Layer(this.game, this.width, this.height, 0.8, this.layerFourImage);
    this.layerFive = new Layer(this.game, this.width, this.height, 1, this.layerFiveImage);
    this.backgroundLayers = [
      this.layerOne, 
      this.layerTwo, 
      this.layerThree, 
      this.layerFour, 
      this.layerFive
    ];
  };

  update() {
    this.backgroundLayers.forEach(layer => {
      layer.update();
    });
  };
  draw(context) {
    this.backgroundLayers.forEach(layer => {
      layer.draw(context);
    });
  };
}