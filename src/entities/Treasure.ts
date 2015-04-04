///<reference path="../entities/PhysicsEntity.ts" />
///<reference path="../entities/Player.ts" />
///<reference path="../ParticleEmitter.ts" />
///<reference path="../math/Vector2D.ts" />

class Treasure extends PhysicsEntity
{
    private isCollected:boolean = false;
    private timer:number = 0;

    constructor(obj)
    {
        super(obj);
        this.type = 'treasure';
        this.velocityX = this.velocityY = 0;
    }

    public render(ctx):void
    {
        super.render(ctx);
        if (!this.isCollected)
        {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    public update(delta:number):void
    {
        super.update(delta);
        if (this.isCollected)
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
        if (!this.isCollected && entity.type == 'player')
        {
            var player = <Player>entity;
            player.color = 'purple';

            player.health += 20;
            this.isCollected = true;

            var particleOptions = {
                width: 10000, // TODO : constraint to world
                height: 10000,
                spread: 1,
                maxParticles: 20,
                emissionRate: 6,
                drawColor: 'FF9900',
                particleSize: 4
            };

            var emitter:any = new ParticleEmitter(new Vector2D(this.x, this.y), Vector2D.fromAngle(180, 4), particleOptions);
            this.children.push(<Entity>emitter); // this is a hack, the emitter is not Entity
        }
    }
}