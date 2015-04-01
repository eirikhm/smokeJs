class Level
{
    private map = {width: 64, height: 48};


    private cell(x, y)
    {
        return this.tcell(this.pixel2tile(x), this.pixel2tile(y));
    }

    private cells = [];

    private static  TILE_PIXEL_SIZE = 32;

    private tcell(tx, ty)
    {
        return this.cells[tx + (ty * this.map.width)];
    }

    private tile2pixel(tiles)
    {
        return tiles * Level.TILE_PIXEL_SIZE;
    }

    private pixel2tile(pixels)
    {
        return Math.floor(pixels / Level.TILE_PIXEL_SIZE);
    }

    private static COLOR = {BLACK: '#000000', YELLOW: '#ECD078', BRICK: '#D95B43', PINK: '#C02942', PURPLE: '#542437', GREY: '#333', SLATE: '#53777A', GOLD: 'gold'};
    private static COLORS = [Level.COLOR.YELLOW, Level.COLOR.BRICK, Level.COLOR.PINK, Level.COLOR.PURPLE, Level.COLOR.GREY];

    public update(detal):void
    {

    }

    public render(ctx)
    {
        var x, y, cell;
        for (y = 0; y < this.map.height; y++)
        {
            for (x = 0; x < this.map.width; x++)
            {
                cell = this.tcell(x, y);
                if (cell)
                {
                    ctx.fillStyle = Level.COLORS[cell - 1];
                    ctx.fillRect(x * Level.TILE_PIXEL_SIZE, y * Level.TILE_PIXEL_SIZE, Level.TILE_PIXEL_SIZE, Level.TILE_PIXEL_SIZE);
                }
            }
        }
    }

    private setup(map:any)
    {
        var data = map.layers[0].data,
            objects = map.layers[1].objects,
            n, obj, entity;
        /*
         for (n = 0; n < objects.length; n++)
         {
         obj = objects[n];
         entity = setupEntity(obj);
         switch (obj.type)
         {
         case "player"   :
         player = entity;
         break;
         case "monster"  :
         monsters.push(entity);
         break;
         case "treasure" :
         treasure.push(entity);
         break;
         }
         }

         */
        this.cells = data;
    }


    public collideEntity(entity:Entity):void
    {
        var xTile = this.pixel2tile(entity.x);
        var yTile = this.pixel2tile(entity.y);
        var nx = entity.x % Level.TILE_PIXEL_SIZE;
        var ny = entity.y % Level.TILE_PIXEL_SIZE;
        var cell = this.tcell(xTile, yTile);
        var cellright = this.tcell(xTile + 1, yTile);
        var celldown = this.tcell(xTile, yTile + 1);
        var celldiag = this.tcell(xTile + 1, yTile + 1);

        if (entity.velocityY > 0)
        {
            if ((celldown && !cell) || (celldiag && !cellright && nx))
            {
                entity.y = this.tile2pixel(yTile);
                entity.velocityY = 0;
                entity.falling = false;
                entity.jumping = false;
                ny = 0;
            }
        }
        else if (entity.velocityY < 0)
        {
            if ((cell && !celldown) ||  (cellright && !celldiag && nx))
            {
                entity.y = this.tile2pixel(yTile + 1);
                entity.velocityY = 0;
                cell = celldown;
                cellright = celldiag;
                ny = 0;
            }
        }

        if (entity.velocityX > 0)
        {
            if ((cellright && !cell) ||
                (celldiag && !celldown && ny))
            {
                entity.x = this.tile2pixel(xTile);
                entity.velocityX = 0;
            }
        }
        else if (entity.velocityX < 0)
        {
            if ((cell && !cellright) ||
                (celldown && !celldiag && ny))
            {
                entity.x = this.tile2pixel(xTile + 1);
                entity.velocityX = 0;
            }
        }

        /*if (entity.monster) {
         if (entity.left && (cell || !celldown)) {
         entity.left = false;
         entity.right = true;
         }
         else if (entity.right && (cellright || !celldiag)) {
         entity.right = false;
         entity.left  = true;
         }
         }
         */
        entity.falling = !(celldown || (nx && celldiag));
    }
}