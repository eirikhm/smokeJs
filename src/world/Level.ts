///<reference path="../entities/PhysicsEntity.ts" />
///<reference path="../entities/Player.ts" />
///<reference path="../entities/Monster.ts" />
///<reference path="../entities/Treasure.ts" />

class Level extends Entity
{
    public map = {width: 64, height: 48};

    public player:Player;

    private static COLOR = {
        BLACK: '#000000',
        YELLOW: '#ECD078',
        BRICK: '#D95B43',
        PINK: '#C02942',
        PURPLE: '#542437',
        GREY: '#333',
        SLATE: '#53777A',
        GOLD: 'gold'
    };

    private static COLORS = [
        Level.COLOR.YELLOW,
        Level.COLOR.BRICK,
        Level.COLOR.PINK,
        Level.COLOR.PURPLE,
        Level.COLOR.GREY
    ];

    private cells = [];

    public static TILE_PIXEL_SIZE = 32;


    private cell(x:number, y:number):number
    {
        return this.getCell(this.pixel2tile(x), this.pixel2tile(y));
    }

    private getCell(tx:number, ty:number):number
    {
        return this.cells[tx + (ty * this.map.width)];
    }

    private tile2pixel(tiles:number):number
    {
        return tiles * Level.TILE_PIXEL_SIZE;
    }

    private pixel2tile(pixels:number):number
    {
        return Math.floor(pixels / Level.TILE_PIXEL_SIZE);
    }

    public render(ctx)
    {
        var x:number;
        var y:number;
        var cell:number;
        for (y = 0; y < this.map.height; y++)
        {
            for (x = 0; x < this.map.width; x++)
            {
                cell = this.getCell(x, y);
                if (cell)
                {
                    ctx.fillStyle = Level.COLORS[cell - 1];
                    ctx.fillRect(x * Level.TILE_PIXEL_SIZE, y * Level.TILE_PIXEL_SIZE, Level.TILE_PIXEL_SIZE, Level.TILE_PIXEL_SIZE);
                }
            }
        }

        super.render(ctx);

    }


    public initializeAndReturnObjects(map:any)
    {
        var mapData = map.layers[0].data;
        var objects = map.layers[1].objects;
        this.cells = mapData;
        return map.layers[1].objects;
    }

    public checkWorldCollision(entity:PhysicsEntity):void
    {
        var xTile = this.pixel2tile(entity.x);
        var yTile = this.pixel2tile(entity.y);
        var nx:number = entity.x % Level.TILE_PIXEL_SIZE;
        var ny:number = entity.y % Level.TILE_PIXEL_SIZE;
        var currentCell:number = this.getCell(xTile, yTile);
        var cellRight = this.getCell(xTile + 1, yTile);
        var cellBelow = this.getCell(xTile, yTile + 1);
        var cellDiagonal = this.getCell(xTile + 1, yTile + 1);

        if (entity.type == 'bullet')
        {
            console.log('cellBelow ',cellBelow );
            console.log('yTile',yTile);
            console.log('xTile',xTile);
            console.log('-------------');

        }

        if (entity.velocityY > 0)
        {
            if ((cellBelow && !currentCell) || (cellDiagonal && !cellRight && nx))
            {

                entity.y = this.tile2pixel(yTile);
                entity.velocityY = 0;
                entity.falling = false;
                entity.jumping = false;
                ny = 0;
                entity.hitFloor();
                
            }
        }
        else if (entity.velocityY < 0)
        {
            if ((currentCell && !cellBelow) || (cellRight && !cellDiagonal && nx))
            {
                entity.y = this.tile2pixel(yTile + 1);
                entity.velocityY = 0;
                currentCell = cellBelow;
                cellRight = cellDiagonal;
                ny = 0;
                //entity.hitCeiling();
            }
        }

        if (entity.velocityX > 0)
        {
            if ((cellRight && !currentCell) || (cellDiagonal && !cellBelow && ny))
            {
                entity.x = this.tile2pixel(xTile);
                entity.velocityX = 0;
                entity.hitWall();
            }
        }
        else if (entity.velocityX < 0)
        {
            if ((currentCell && !cellRight) || (cellBelow && !cellDiagonal && ny))
            {
                entity.x = this.tile2pixel(xTile + 1);
                entity.velocityX = 0;
                entity.hitWall();
            }
        }

        if (entity.facingLeft && (currentCell || !cellBelow))
        {
            entity.onEdge('left');
        }
        else if (entity.facingRight && (cellRight|| !cellDiagonal)) {
            entity.onEdge('right');
        }

        entity.falling = !(cellBelow || (nx && cellDiagonal));
    }
}