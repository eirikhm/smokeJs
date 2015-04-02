class Entity
{
    public x = 0;
    public y = 0;
    public width = 32;
    public height = 32;
    public type:string;

    constructor(obj?:any)
    {
        if (obj)
        {
            this.x = obj.x;
            this.y = obj.y;
        }



        /*this.maxdx    = METER * (obj.properties.maxdx   || MAXDX);
        this.maxdy    = METER * (obj.properties.maxdy   || MAXDY);
        this.impulse  = METER * (obj.properties.impulse || IMPULSE);*/

        //entity.accel    = entity.maxdx / (obj.properties.accel    || ACCEL);
       // entity.friction = entity.maxdx / (obj.properties.friction || FRICTIO
//        this.start    = { x: obj.x, y: obj.y }

        //entity.left     = obj.properties.left;
        //entity.right    = obj.properties.right;

    }

    public update(delta:number):void
    {

    }

    public render(ctx:any):void
    {

    }
}