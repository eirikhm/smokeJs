///<reference path="../entities/PhysicsEntity.ts" />

class Monster extends PhysicsEntity
{
    constructor(obj)
    {
        super(obj);
        this.type = 'monster';
    }

    public render(ctx):void
    {
        super.render(ctx);
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    public onCollide(entity:PhysicsEntity):void
    {
        if (entity.type == 'player')
        {
            entity.hurt(1);
        }
    }
}