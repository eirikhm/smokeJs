///<reference path="../entities/PhysicsEntity.ts" />

class Monster extends PhysicsEntity
{
    constructor(obj)
    {
        super(obj);
        this.type = 'monster';
    }

    public update(delta:number):void
    {

    }
    public render(ctx):void
    {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}