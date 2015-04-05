///<reference path="./Entity.ts" />

class PhysicsEntity extends Entity
{

    get velocityX():number
    {
        return this.get('velocityX');
    }

    set velocityX(val:number)
    {
        this.set('velocityX',val);
    }

    get velocityY():number
    {
        return this.get('velocityY');
    }

    set velocityY(val:number)
    {
        this.set('velocityY',val);
    }

    public gravity = WorldConstants.GRAVITY;
    public speed = 5;
    public jumping:boolean = false;
    public falling:boolean = false;

    public facing:string;

    public health:number = 100;

    public killed:boolean;

    constructor(obj)
    {
        super(obj);
        if (obj.hasOwnProperty('properties'))
        {
            this.gravity = WorldConstants.METER * (obj.properties.gravity || WorldConstants.GRAVITY);
            this.velocityX = WorldConstants.METER * (obj.properties.maxdx) || WorldConstants.METER;
            if (obj.properties.left )
            {
                this.facing = 'left';
            }

            if (obj.properties.right)
            {
                this.facing = 'right';
            }
        }
        else
        {
            this.gravity = WorldConstants.METER * WorldConstants.GRAVITY;
        }

        this.killed = false;


        if (!this.facing)
        {
            this.facing = 'left'
        }

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

    public hitFloor():void
    {

    }

    public hitWall():void
    {

    }

    public hurt(damage:number):void
    {
        this.health -= damage;
        if (this.health <= 0)
        {
            this.onKilled();
        }
        else
        {
            this.onHurt();
        }
    }

    protected onHurt():void
    {

    }

    protected onKilled():void
    {
        this.killed = true;
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