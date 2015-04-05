
///<reference path="../definitions/fpsmeter/fpsmeter.d.ts" />
///<reference path="../definitions/webaudioapi/waa.d.ts" />
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
    private projectiles:Projectile[] = [];
    private player:Player;
    private level:Level;
    private width:number;
    private height:number;
    private meter:FPSMeter;
    private audioCtx:any;

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


        try
        {
            //window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext();
        }
        catch (e)
        {
            alert("Web Audio API is not supported in this browser");
        }


        $.getJSON("resources/level.json", (req) =>
        {
            this.level = new Level();
            this.entities.push(this.level);

            var objects = this.level.initializeAndReturnObjects(req);

            this.onMapLodaedForor(objects);

            this.player.on(Player.EVENT_PLAYER_ITEM_PICKUP,() => {
               this.updateGui();
            });
            this.player.on(Player.EVENT_PLAYER_HURT,() => {
                this.updateGui();
            });
            this.player.on(Player.EVENT_PLAYER_KILLED,() => {

                this.updateGui();
            });
            this.width = this.canvas.width = this.level.map.width * Level.TILE_PIXEL_SIZE;
            this.height = this.canvas.height = this.level.map.height * Level.TILE_PIXEL_SIZE;

            this.loadSounds(this.audioCtx);
            this.onReady();
        });
    }

    private buffers;

    public loadSounds(context)
    {
        var sounds = [
            'resources/sounds/m4a1.mp3',
            'resources/sounds/m1-garand.mp3'
        ];

        var loader = new BufferLoader(context, sounds, (buffers) => {
            this.buffers = buffers;
        });

        loader.load();
    }

    public playSound(soundId:number, numToPlay:number, delayInterval:number, startTimeModifier  = 0, playbackRateModifier = 0)
    {
        var time = this.audioCtx.currentTime;
        // Make multiple sources using the same buffer and play in quick succession.
        for (var i = 0; i < numToPlay; i++)
        {
            var source = this.makeSource(this.buffers[soundId]);
            source.playbackRate.value = 1 + Math.random() * playbackRateModifier;
            source.start(time + i * delayInterval + Math.random() * startTimeModifier);
        }
    }

    public makeSource(buffer)
    {
        var source = this.audioCtx.createBufferSource();
        var compressor = this.audioCtx.createDynamicsCompressor();
        var gain = this.audioCtx.createGain();
        gain.gain.value = 0.2;
        source.buffer = buffer;
        source.connect(gain);
        gain.connect(compressor);
        compressor.connect(this.audioCtx.destination);
        return source;
    }

    private onMapLodaedForor(objects):void
    {
        var obj = null;
        var entity:PhysicsEntity = null;

        for (var n = 0; n < objects.length; n++)
        {
            obj = objects[n];
            entity = this.createEntity(obj);
            if (!entity)
            {
                console.log('unknown entity',obj);
                continue;
            }
            if (entity.type == Entity.EntityTypes.PLAYER)
            {
                this.player = <Player>entity;
            }
            this.entities.push(entity);
        }
    }

    private createEntity(obj):PhysicsEntity
    {
        var entity:PhysicsEntity = null;
        switch (obj.type)
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
            //this.playSound(1, 10, 0.08, 0, 1);
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
                this.projectiles.splice(i, 1);
            }
        }

        for (var i = 0; i < this.entities.length; i++)
        {
            if (this.entities[i] instanceof PhysicsEntity)
            {
                var entity = <PhysicsEntity>this.entities[i];

                entity.update(delta);
                this.level.checkWorldCollision(entity);

                if (entity.type == Entity.EntityTypes.MONSTER)
                {
                    if (entity.overlaps(this.player))
                    {
                        entity.onCollide(this.player);
                    }
                    this.projectileOverlaps(entity);
                }

                if (entity.type == Entity.EntityTypes.TREASURE)
                {
                    if (entity.overlaps(this.player))
                    {
                        entity.onCollide(this.player);
                    }
                }

                if (entity.killed) // TODO: run cleanup first.
                {
                    // do not use delete, will not reindex array.
                    this.entities.splice(i, 1);
                }
            }
        }
    }


    private updateGui():void
    {
        $('[data-bind=health]').html(this.player.health.toString());
        $('[data-bind=xp]').html('0');
        $('[data-bind=lvl]').html('1');

    }

    private projectileOverlaps(entity):void
    {
        for (var i = 0; i < this.projectiles.length; i++)
        {
            if (this.projectiles[i].overlaps(entity))
            {
                this.projectiles[i].onCollide(entity);
                this.projectiles[i].killed = true;
                this.projectiles.splice(i, 1);
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
