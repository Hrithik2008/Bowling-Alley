//creating pin class
class Pin{
    constructor(x,y){
        var options = {
            restitution : 0.1,
            friction : 0.3
        }
        this.body = Bodies.rectangle(x,y,65,195,options);
        this.image = loadImage("Pin.png");
        this.x=x;
        this.y=y;
        this.time = 255;
        World.add(world,this.body);
    }
    display() {    
        var pos = this.body.position;
        var angle = this.body.angle;
        if(angle < 0.7 && angle > -0.7){
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,65,195);
        pop();
        }else{
            push();
            this.time = this.time - 5;
            tint(255,this.time);
            image(this.image, this.body.position.x, this.body.position.y, 65, 195);
            pop();
            World.remove(world, this.body);   
        }
    }
    scoring(){
        if(this.time < 0 && this.time > -1005){
           score++;
        }
    }
}