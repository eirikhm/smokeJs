///<reference path="../definitions/backbone/backbone.d.ts" />
///<reference path="../definitions/fpsmeter/fpsmeter.d.ts" />
///<reference path="./world/Level.ts" />
///<reference path="./entities/Player.ts" />
///<reference path="./math/Vector2D.ts" />
///<reference path="./ParticleEmitter.ts" />

class Game
{
    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private then:any;
    private entities:Entity[] = [];
    private projectiles:Bullet[] = [];
    private player:Player;
    private level:Level;
    private width:number;
    private height:number;
    private meter:FPSMeter;

    public run():void
    {
        this.meter = new FPSMeter();
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx)
        {
            // TODO: Show error
            return;
        }

        $.getJSON("resources/level.json", (req) =>
        {
            this.level = new Level();
            this.entities.push(this.level);

            var objects = this.level.initializeAndReturnObjects(req);

            this.onMapLodaedForor(objects);

            this.width = this.canvas.width = this.level.map.width * Level.TILE_PIXEL_SIZE;
            this.height = this.canvas.height = this.level.map.height * Level.TILE_PIXEL_SIZE;

            $('body .info .health').html(this.player.health.toString());
            this.onReady();
        });
    }

    private onMapLodaedForor(objects):void
    {
        var obj = null;
        var entity:PhysicsEntity = null;

        for (var n = 0; n < objects.length; n++)
        {
            obj = objects[n];
            entity = this.createEntity(obj);
            if (entity.type == 'player')
            {
                this.player = <Player>entity;
            }
            this.entities.push(entity);
        }
    }

    private createEntity(obj):PhysicsEntity
    {
        var entity:PhysicsEntity = null;
        switch(obj.type)
        {
            case 'monster':
                entity = new Monster(obj);
                break;
            case 'player':
                entity = new Player(obj);
                break;
            case 'treasure':
                entity = new Treasure(obj);
                break;
        }
        return entity;
    }

    private onReady():void
    {
        // TODO: do not use singleton for this.
        Keyboard.setup();
        Keyboard.on('keydown', (e) =>
        {
            this.onKeyboard(e);
        });

        this.then = Date.now();
        this.loop();
    }

    private onKeyboard(e)
    {
        if (e.keys[38] || e.keys[32])
        {
            this.player.jump();
        }

        if (e.keys[39])
        {
            this.player.moveRight();
        }

        if (e.keys[37])
        {
            this.player.moveLeft();
        }

        if (e.keys[90]) // z
        {
            this.projectiles.push(this.player.shoot());
        }
    }

    public loop():void
    {
        var now = Date.now();
        var delta = now - this.then;

        this.update(delta / 1000);
        this.render();

        this.then = now;
        requestAnimationFrame(() =>
        {
            this.loop();
        });
    }

    private update(delta):void
    {

        for (var i = 0; i < this.projectiles.length; i++)
        {
            this.projectiles[i].update(delta);
            this.level.checkWorldCollision(this.projectiles[i]);
            if (this.projectiles[i].killed) // TODO: run cleanup first.
            {
                // do not use delete, will not reindex array.
                this.projectiles.splice( i, 1 );
            }
        }

        for (var i = 0; i < this.entities.length; i++)
        {
            if (this.entities[i] instanceof PhysicsEntity)
            {
                var entity = <PhysicsEntity>this.entities[i];

                entity.update(delta);
                this.level.checkWorldCollision(entity);

                if (entity.type == "monster")
                {
                    if (entity.overlaps(this.player))
                    {
                        entity.onCollide(this.player);
                    }
                    this.bulletOverlaps(entity);
                }

                if (entity.type == 'treasure')
                {
                    if (entity.overlaps(this.player))
                    {
                        entity.onCollide(this.player);
                    }
                }

                if (entity.killed) // TODO: run cleanup first.
                {
                    // do not use delete, will not reindex array.
                    this.entities.splice( i, 1 );
                }
            }
        }
    }

    private bulletOverlaps(entity):void
    {
        for (var i = 0; i < this.projectiles.length; i++)
        {
            if (this.projectiles[i].overlaps(entity))
            {
                this.projectiles[i].onCollide(entity);
                this.projectiles[i].killed = true;
                this.projectiles.splice( i, 1 );
            }
        }
    }

    private render()
    {
        this.meter.tickStart();
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.entities.length; i++)
        {
            this.entities[i].render(this.ctx);
        }

        for (var i = 0; i < this.projectiles.length; i++)
        {
            this.projectiles[i].render(this.ctx);
        }

        this.meter.tick();
    }
}
