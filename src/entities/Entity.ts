///<reference path="../../definitions/backbone/backbone.d.ts" />

class Entity extends Backbone.Model
{
    public type:string;

    protected children:Entity[] = [];

    get x():number
    {
        return this.get('x');
    }

    set x(val:number)
    {
        this.set('x',val);
    }

    get y():number
    {
        return this.get('y');
    }

    set y(val:number)
    {
        this.set('y',val);
    }

    get height():number
    {
        return this.get('height');
    }

    set height(val:number)
    {
        this.set('height',val);
    }

    get width():number
    {
        return this.get('width');
    }

    set width(val:number)
    {
        this.set('width',val);
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