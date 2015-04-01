class Monster extends Entity
{
    constructor(obj)
    {
        super(obj);
        this.type = 'monster';
    }

    public render(ctx):void
    {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}