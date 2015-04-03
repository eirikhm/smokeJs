class Bullet extends PhysicsEntity
{
    constructor(obj?)
    {
        super(obj);
        this.velocityX = 100;
        this.velocityY = 0;
        this.width = 10;
        this.height = 10;
    }

    public render(ctx):void
    {
        super.render(ctx);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}