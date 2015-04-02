///<reference path="../entities/PhysicsEntity.ts" />

class Monster extends PhysicsEntity
{
    constructor(obj)
    {
        super(obj);
        this.type = 'monster';
        this.speed = (Math.random() +1)*2;
        this.velocityX = this.speed;
        console.log(this);
    }

    public render(ctx):void
    {
        super.render(ctx);
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // add simple line to show where it's facing
        ctx.fillStyle = "blue";
        if (this.facingLeft)
        {
            ctx.fillRect(this.x, this.y, 10, 15);
        }
        else
        {
            ctx.fillRect(this.x + this.width-10, this.y, 10, 15);
        }
    }

    public update(delta):void
    {

        if (this.facingLeft)
        {
            this.x -= this.velocityX;
        }
        else
        {
            this.x += this.velocityX;
        }

    }


    public onCollide(entity:PhysicsEntity):void
    {
        if (entity.type == 'player')
        {
            entity.hurt(1);
        }
    }
    public onEdge(direction:string):void
    {
        if (direction == 'left')
        {
            this.facingRight = true;
        }
        else
        {
            this.facingLeft = true;
        }
    }

}