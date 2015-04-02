///<reference path="../entities/PhysicsEntity.ts" />

class Player extends PhysicsEntity
{
    public color = "blue";

    constructor(obj)
    {
        super(obj);
        this.type = 'player';
        this.velocityX = this.velocityY  = 0;
    }

    public render(ctx):void
    {
        super.render(ctx);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'red';

        if (this.facingLeft)
        {
            ctx.fillRect(this.x, this.y, 10, 15);
        }
        else
        {
            ctx.fillRect(this.x + this.width-10, this.y, 10, 15);
        }
    }

    public jump():void
    {
        if (!this.jumping)
        {
            this.jumping = true;
            this.velocityY = -this.speed * 3;
        }
    }

    public moveLeft():void
    {
        this.facingLeft = true;
        if (this.velocityX > -this.speed)
        {
            this.velocityX--;
        }
    }

    public moveRight():void
    {
        this.facingRight = true;
        if (this.velocityX < this.speed)
        {
            this.velocityX++;
        }
    }
}