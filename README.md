Simple HTML / Canvas game

Some code is borrowed from https://github.com/jakesgordon/javascript-tiny-platformer

Map editor http://www.mapeditor.org/


TODO high to low:
- Fix multikey input problem where walk + jump + release jump stops all movement
- Level collide must consider smaller objects than tileSize
- Implement XP for kills, look at http://www.wowwiki.com/Formulas:Mob_XP#Basic_Formula
- Implement player level
- Add audio 
 - http://blog.sklambert.com/html5-canvas-game-html5-audio-and-finishing-touches/
 - http://www.html5rocks.com/en/tutorials/webaudio/games/

- Add sound support for pickups etc


- Clean up level code to allow loading other levels

- Make Keyboard non-singleton

- Add support for multiple BGs
- Implement textures
- Particle and emitter should be entities
- Support collide for particles
- Support 360degree particle emit
- Implement particle fields ref http://html5hub.com/build-a-javascript-particle-system/
- Implement ladders
- Implement teleports
- Implement lifts
- Implement multiple weapon types (meele and more ranged)
- Implement other monsters (stationary, flying, creeping)

License MIT
