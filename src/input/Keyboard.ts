///<reference path="../../definitions/backbone/backbone.d.ts" />

class Keyboard extends EventBase
{
    private static keysDown;

    public static setup():void
    {
        this.keysDown = {};

        $(document).keydown((e) => {
            this.keysDown[e.keyCode] = true;
            this.trigger('keydown',{keys:this.keysDown});
            return false;
        });

        $(document).keyup((e) => {
            delete this.keysDown[e.keyCode];
            return false;
        });
        /*
            addEventListener("keydown", (e:KeyboardEvent) => {

            this.keysDown[e.keyCode] = true;
            this.trigger('keydown',{keys:this.keysDown});
        }, false);

        addEventListener("keyup",  (e:KeyboardEvent) => {

            delete this.keysDown[e.keyCode];
        }, false);
        */
    }
}