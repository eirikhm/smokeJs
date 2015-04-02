///<reference path="../entities/PhysicsEntity.ts" />
///<reference path="../entities/Player.ts" />
///<reference path="../ParticleEmitter.ts" />
///<reference path="../math/Vector2D.ts" />

class Treasure extends PhysicsEntity
{
    private isColleted:boolean = false;
    private timer:number = 0;
    constructor(obj)
    {
        super(obj);
        this.type = 'treasure';
    }

    public render(ctx):void
    {
        super.render(ctx);
        if (!this.isColleted)
        {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    public update(delta:number):void
    {
        super.update(delta);
        if (this.isColleted)
        {
            this.timer += delta;
            if (this.timer > 1)
            {
                this.killed = true;
            }
        }
    }

    public onCollide(entity:PhysicsEntity):void
    {
        if (!this.isColleted && entity.type == 'player')
        {
            var player = <Player>entity;
            player.color = 'purple';

            this.isColleted = true;

            var particleOptions = {
                width:10000, // TODO : constraint to world
                height:10000,
                spread:1,
                maxParticles: 20,
                emissionRate: 6,
                drawColor: 'FF9900',
                particleSize: 4
            };

            var emitter:ParticleEmitter = new ParticleEmitter(new Vector2D(this.x, this.y), Vector2D.fromAngle(180, 4),particleOptions);
            this.children.push(emitter);
        }
    }
}