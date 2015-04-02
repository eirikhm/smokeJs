class Particle
{
    public position:Vector2D;
    public velocity:Vector2D;
    public acceleration:Vector2D;
    public particleSize:number;
    constructor(point?:Vector2D, velocity?:Vector2D, acceleration?:Vector2D,particleSize?:number)
    {

        this.position = point || new Vector2D();
        this.velocity = velocity || new Vector2D();
        this.acceleration = acceleration || new Vector2D();
        this.particleSize = particleSize || 1;
    }


    public move():void
    {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    public render(ctx):void
    {
        ctx.fillRect(this.position.x, this.position.y, this.particleSize, this.particleSize);
    }

}