class Vector2D
{
    public x:number;
    public y:number;

    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    public add(vector:Vector2D):void
    {
        this.x += vector.x;
        this.y += vector.y;
    }

    get magnitude():number
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get angle():number
    {
        return Math.atan2(this.y, this.x);
    }

    public static fromAngle(angle:number, magnitude:number):Vector2D
    {
        return new Vector2D(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
    }
}