class Projectile extends PhysicsEntity
{
    get damage():number
    {
        return this.get('damage');
    }

    constructor(obj?)
    {
        super(obj);
        this.type = Entity.EntityTypes.PROJECTILE;
    }

    public render(ctx):void
    {
        super.render(ctx);
        ctx.fillStyle = this.get('color');
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
            entity.hurt(this.damage);
            this.killed = true;
        }
    }
}