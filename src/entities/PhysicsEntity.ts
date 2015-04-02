///<reference path="./Entity.ts" />

class PhysicsEntity extends Entity
{
    public velocityX = 0;
    public velocityY = 0;
    public gravity = WorldConstants.GRAVITY;
    public speed = 5;
    public jumping:boolean = false;
    public falling:boolean = false;
    public type:string;

    public killed:boolean;

    constructor(obj)
    {
        super(obj);
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = WorldConstants.METER * (obj.properties.gravity || WorldConstants.GRAVITY);
        this.killed = false;

        /*this.maxdx    = METER * (obj.properties.maxdx   || MAXDX);
         this.maxdy    = METER * (obj.properties.maxdy   || MAXDY);
         this.impulse  = METER * (obj.properties.impulse || IMPULSE);*/

        //entity.accel    = entity.maxdx / (obj.properties.accel    || ACCEL);
        // entity.friction = entity.maxdx / (obj.properties.friction || FRICTIO
//        this.start    = { x: obj.x, y: obj.y }

        //entity.left     = obj.properties.left;
        //entity.right    = obj.properties.right;

    }

    overlaps(other:PhysicsEntity)
    {
        return !(((this.x + this.width - 1) < other.x) ||
        ((other.x + other.width - 1) < this.x) ||
        ((this.y + this.height - 1) < other.y) ||
        ((other.y + other.height - 1) < this.y))
    }

    public onCollide(entity:PhysicsEntity):void
    {

    }
}