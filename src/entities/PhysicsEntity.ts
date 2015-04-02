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

    public facing:string;

    public health:number = 100;

    public killed:boolean;

    constructor(obj)
    {
        super(obj);
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = WorldConstants.METER * (obj.properties.gravity || WorldConstants.GRAVITY);
        this.killed = false;

        if (obj.properties.left )
        {
            this.facing = 'left';
        }

        if (obj.properties.right)
        {
            this.facing = 'right';
        }
        this.facing = obj.facing || 'left';
        this.velocityX = WorldConstants.METER * (obj.properties.maxdx) || WorldConstants.METER;
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

    public onEdge(direction:string):void
    {

    }

    public update(delta):void
    {
        super.update(delta);

        this.velocityX *= WorldConstants.FRICTION;
        this.velocityY += WorldConstants.GRAVITY;

        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    public onCollide(entity:PhysicsEntity):void
    {

    }

    public hurt(damage:number):void
    {
        this.health -= damage;
        console.log('hurt', damage);
        if (this.health <= 0)
        {
            this.killed = true;
        }
    }

    get facingLeft():boolean
    {
        return this.facing == 'left';
    }

    // no no no todo fix me
    set facingLeft(value:boolean)
    {
        this.facing = 'left';
    }

    get facingRight():boolean
    {
        return this.facing == 'right';
    }

    set facingRight(value:boolean)
    {
        this.facing = 'right';
    }


}