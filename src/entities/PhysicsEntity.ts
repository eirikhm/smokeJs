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
        this.gravity  = WorldConstants.METER * (obj.properties.gravity || WorldConstants.GRAVITY);
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

    public update(delta:number):void
    {

    }

    public render(ctx:any):void
    {

    }
}