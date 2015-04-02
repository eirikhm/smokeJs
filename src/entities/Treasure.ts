///<reference path="../entities/PhysicsEntity.ts" />
///<reference path="../entities/Player.ts" />

class Treasure extends PhysicsEntity
{
    constructor(obj)
    {
        super(obj);
        this.type = 'treasure';
    }


    public render(ctx):void
    {
        //ctx.globalAlpha = 0.25 + tweenTreasure(frame, 60);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);


        /*
         ctx.globalAlpha = 0.25 + tweenTreasure(frame, 60);
         var n, max, t;
         for(n = 0, max = treasure.length ; n < max ; n++) {
         t = treasure[n];
         if (!t.collected)
         ctx.fillRect(t.x, t.y + TILE/3, TILE, TILE*2/3);
         }
         ctx.globalAlpha = 1;
         */
    }

    public onCollide(entity:PhysicsEntity):void
    {
        if (entity.type == 'player')
        {
            var p = <Player>entity;
            p.color = 'purple';
            this.killed = true;
        }
    }

}