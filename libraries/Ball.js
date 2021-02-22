// creating ball class
class Ball {
    constructor(x, y, r) {
        var options = {
            restitution: 0.2
        }
        this.body = Bodies.circle(x, y, r, options);
        this.image = loadImage("Ball.png")
        this.r = r;
        World.add(world, this.body);
    }
    display() {
        push();
        var pos = this.body.position;
        var angle = this.body.angle;
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, ((this.r * 2) / 10) * 9, ((this.r * 2) / 10) * 8);
        pop();
    }
};
