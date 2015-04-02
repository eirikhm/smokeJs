class Entity
{
    public x = 0;
    public y = 0;

    public width = 32;
    public height = 32;

    public type:string;

    protected children:Entity[] = [];

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

        for (var i = 0; i < this.children.length; i++)
        {
            var entity = <PhysicsEntity>this.children[i];
            if (entity.killed) // TODO: run cleanup first.
            {
                // do not use delete, will not reindex array.
                this.children.splice( i, 1 );
                continue;
            }
            entity.update(delta);
        }
    }

    public render(ctx:any):void
    {
        for (var i = 0; i < this.children.length; i++)
        {
            this.children[i].render(ctx);
        }
    }
}