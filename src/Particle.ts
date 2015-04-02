class Particle
{
    public position:Vector2D;
    public velocity:Vector2D;
    public acceleration:Vector2D;
    public particleSize:number;
    public drawColor:string;

    constructor(point?:Vector2D, velocity?:Vector2D, acceleration?:Vector2D,particleSize?:number,drawColor?:string)
    {
        this.position = point || new Vector2D();
        this.velocity = velocity || new Vector2D();
        this.acceleration = acceleration || new Vector2D();
        this.particleSize = particleSize || 1;
        this.drawColor = drawColor || 'red';
    }

    public move():void
    {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    public render(ctx):void
    {
        ctx.fillStyle = this.drawColor;
        ctx.fillRect(this.position.x, this.position.y, this.particleSize, this.particleSize);
    }

}