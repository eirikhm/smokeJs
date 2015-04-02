///<reference path="../entities/PhysicsEntity.ts" />

class Player extends PhysicsEntity
{
    constructor(obj)
    {
        super(obj);
        this.type = 'player';
    }

    public render(ctx):void
    {
        ctx.fillStyle = "blue";
        
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }

    public update(delta):void
    {
        this.velocityX *= WorldConstants.FRICTION;
        this.velocityY += WorldConstants.GRAVITY;
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    public jump():void
    {
        if (!this.jumping)
        {
            this.jumping = true;
            this.velocityY = -this.speed * 2;
        }
    }

    public moveLeft():void
    {
        if (this.velocityX > -this.speed)
        {
            this.velocityX--;
        }
    }

    public moveRight():void
    {
        if (this.velocityX < this.speed)
        {
            this.velocityX++;
        }
    }
}