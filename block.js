class Block{
    constructor(x,y) {
      var properties ={
        isStatic : true
      }
      this.body = Bodies.rectangle(x,y,20, 140, properties);
      this.width = width;
      this.height = height;
      World.add(world, this.body);
    }
    display(){
    var pos = this.body.position;
    this.width = width;
    this.height = height;
    rectMode(CENTER);
    rect(pos.x, pos.y, 20,140);
    }
}