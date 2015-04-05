class Projectile extends PhysicsEntity
{
    constructor(obj?)
    {
        super(obj);
        this.velocityX = 100;
        this.velocityY = 0;
        this.width = 32;
        this.height = 32;
        this.type = Entity.EntityTypes.PROJECTILE;
    }

    public render(ctx):void
    {
        super.render(ctx);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    public hitWall():void
    {
        this.killed = true;
    }

    public hitFloor():void
    {
        this.killed = true;
    }


    public onCollide(entity:PhysicsEntity):void
    {
        if (entity.type == Entity.EntityTypes.MONSTER)
        {
            entity.hurt(100);
            this.killed = true;
        }
    }

}