## The goal

Create a simple template for creating games with phaser.js and NUXT

## Knowledge to have

If you want to get started here, you should learn some things before:

- [Vue.js](https://vuejs.org/) -> With vue.js we can easily build reuseable web components
- [NUXT](https://nuxtjs.org/) -> nuxt.js builts a server side rendering functionality on top of vue.js
- [Phaser.js](http://phaser.io/) -> a powerful game framework for webgl and canvas games

## Requirements

- nodejs >= 9
- yarn -> you can install it with: ``` npm install -g yarn ```

## Basic setup

create a new folder and create your package.json in the terminal with ``` yarn init ``` Answer the few questions to your project (or just hit enter a few times :) )

## Dependencies

We need some vendor packages, install them with:

``` bash
yarn add nuxt
yarn add phaser-ce
```


after installing the dependencies, start configuring your package.json.

## package.json update

Open your package.json file.

We are creating 4 tasks, we can start afterwards:

``` json
"scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
},
```

After the edit, your package.json file should look like:

``` json
{
    "name": "your-project-name",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "scripts": {
        "dev": "nuxt",
        "build": "nuxt build",
        "start": "nuxt start"
    },
    "dependencies": {
        "nuxt": "^1.4.0",
        "phaser-ce": "^2.10.5"
    }
}
```

## Project tasks

These 4 tasks we just created, have following functionality

| task           | function |
| -------------- | ------------- |
| yarn run dev   | This is our task, while we are developing. Everytime we change a file, the project will automatically recompiled |
| yarn run build | After developing, when we deploy, start this task to compile and optimize the web package |
| yarn run start | This task starts a production node server |

## NUXT config

create a new file on your project root folder named ``` nuxt.config.js ```

``` js
module.exports = {

    // setting the currents page html header params
    head: {
        titleTemplate: 'Phaser Game - %s', // the title of the site, %s is the placeholder for the current page's title
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    },

    build: {
        extractCSS: true // extract all inline CSS to external css files
    },


    plugins: [
        { src: '~/plugins/phaser', ssr: false } // load phaser into our site
    ]
    
}
```

As you see, we need a new file at ``` /plugins/phaser.js ```. This plugin is used to load our game into our NUXT site.

``` js
import Game from '~/game/Game'

window.Game = Game;
```

As you see, we import our Game class and give the global window object the reference to it.

## The game class

now we need the Game class at the location: ``` /game/Game.js ```

``` js
import '~/game/PhaserBridge'

class Game extends Phaser.Game {

    constructor(settings){
        super(settings.width, settings.height, Phaser.AUTO, settings.containerId, null);
        
        this.$settings = settings;
    }

}

export default Game;
```

First, we import the PhaserBridge file, which we create now and then we extend the Phaser.Game class. In the constructor, we set the settings of the Phaser game.

The PhaserBridge is needed, because phaser wasn't designed to be used in an ES6 environment. Create a new file at: ``` /game/PhaserBridge.js ```

``` js
window.PIXI = window.PIXI || require('phaser-ce/build/custom/pixi');
window.p2 = window.p2 || require('phaser-ce/build/custom/p2');
window.Phaser = window.Phaser || require('phaser-ce/build/custom/phaser-split');

export default {
    Phaser: window.Phaser,
    PIXI: window.PIXI,
    p2: window.p2
}
```

We are loading the PIXI and Phaser classes into the global window object, and we also load the P2 physics (you can also load the arcade physics or other plugins here).

## The game page

Now, it's time to create our first game page. Create a new file at ``` /pages/index.vue ```

``` html
<template>
    <game></game>
</template>

<script>
import Game from '~/components/Game'

export default {
    components: {
        Game
    },

    head(){
        return {
            title: 'Game'
        }
    }
}
</script>

```

As you see, we load a component named Game, which is a vue component, we create now. And in the template itself, we just show the component.

So, create a new component at ``` /components/Game.vue ```

``` html
<template>
    <div class="game">
        <div id="game-container"></div>
    </div>
</template>

<script>
import settings from '~/game/Settings'

export default {

    data(){
        return {
            game: null
        }
    },

    mounted(){
        this.game = new Game(settings);
    },

}
</script>
```

In our game component, we just load a settings file, which we create now, and then we create a new Game class instance. All the rest is handled within the Game class, we extend later.

The settings file is located at: ``` /game/Settings.js ```

``` js
export default {
    containerId: 'game-container',
    debug: true, // while developing a game, we want to have an FPS counter
    width: 1280,
    height: 720
}   
```

Now, we are ready to create our actual game. Start the dev task on the terminal with ``` yarn run dev ``` and head to [http://localhost:3000](http://localhost:3000) in your browser.

you should see a black box. 

## Game states

Now, that our game is running, we need to define some game states, like a Boot state and a Preloading State, also a MainMenu and the Game state itself.

Every state has the same structure:

``` js
import '~/game/PhaserBridge'

class MyState extends Phaser.State {

    init(){
        
    }

    preload(){

    }

    create(){
        
    }

    update(){

    }

}

export default MyState;
```

So we import our PhaserBridge, then we extend the Phaser.State class and override the functions we need.

| function | description |
| -------- | ----------- |
| init | Is used to set phaser settings, like auto scaling, or pointer settings, etc. |
| preload | Is used to load assets like json, textures, texturemaps, audios etc. |
| create | Is used to create instances of your assets |
| update | Is used to update your asset instances over runtime |

## BootState

create our first BootState at ``` /game/states/BootState.js ```

``` js
import '~/game/PhaserBridge'

class BootState extends Phaser.State {

    init(){
        this.input.maxPointers = 1;
        this.scale.pageAlignHorizontally = true;
    }

    preload(){

    }

    create(){
        this.state.start('Preload');
    }

}

export default BootState;
```

Now, we need to create a reference to this state in our Game class at ``` /game/Game.js ```

``` js
import '~/game/PhaserBridge'

import BootState from '~/game/states/BootState' 

class Game extends Phaser.Game {

    constructor(settings){
        super(settings.width, settings.height, Phaser.AUTO, settings.containerId, null);
        
        this.$settings = settings;

        this.state.add('Boot', BootState, false);

        this.state.start('Boot');
    }

}

export default Game;
```

As you see, we import our BootState and add this state to our game. Then we start the State.

The BootState itself makes nothing else, than define all the settings we need in our game. In that case, we just allow only one pointer and we center the game in the middle of the screen. After everything is created, we start the next state, in our case, the PreloadState.

## PreloadState

It's the same procedure. Create a new State at ``` /game/states/PreloadState.js ``` and create a reference to it in our game class at ``` /game/Game.js ```

#### /game/states/PreloadState.js

``` js
import '~/game/PhaserBridge'

class PreloadState extends Phaser.State {

    preload(){
        
    }

    create(){
        this.state.start('MainMenu');
    }

}

export default PreloadState;
```

#### /game/Game.js

``` js
import '~/game/PhaserBridge'

import BootState from '~/game/states/BootState'
import PreloadState from '~/game/states/PreloadState' 

class Game extends Phaser.Game {

    constructor(settings){
        super(settings.width, settings.height, Phaser.AUTO, settings.containerId, null);
        
        this.$settings = settings;

        this.state.add('Boot', BootState, false);
        this.state.add('Preload', PreloadState, false);

        this.state.start('Boot');
    }

}

export default Game;
```

## MainMenuState

It's the same procedure. Create a new State at ``` /game/states/MainMenuState.js ``` and create a reference to it in our game class at ``` /game/Game.js ```

#### /game/states/MainMenuState.js

``` js
import '~/game/PhaserBridge'

class MainMenuState extends Phaser.State {

    create(){
        this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    update(){
        if(this.spacebar.isDown){
            this.StartGame();
        }
    }

    StartGame(){
        this.state.start('Game');
    }

}

export default MainMenuState;
```

As you see, we define a key listener, which listens to the spacebar key. In the update function, we check, if the user hits the spacebar, and if he does, we start the GameState.

#### /game/Game.js

``` js
import '~/game/PhaserBridge'

import BootState from '~/game/states/BootState'
import PreloadState from '~/game/states/PreloadState' 
import MainMenuState from '~/game/states/MainMenuState' 

class Game extends Phaser.Game {

    constructor(settings){
        super(settings.width, settings.height, Phaser.AUTO, settings.containerId, null);
        
        this.$settings = settings;

        this.state.add('Boot', BootState, false);
        this.state.add('Preload', PreloadState, false);
        this.state.add('MainMenu', MainMenuState, false);

        this.state.start('Boot');
    }

}

export default Game;
```

Now, we need just the game itself, which we can code in the GameState

## GameState

#### /game/states/GameState.js

``` js
import '~/game/PhaserBridge'

class GameState extends Phaser.State {

    create() {
        if(this.game.$settings.debug){
            this.game.time.advancedTiming = true;
        }
    }

    render(){
        if(this.game.$settings.debug){
            this.game.debug.text('FPS: ' + this.game.time.fps || 'FPS: --', 40, 40, "#00ff00"); 
        }
    }

}

export default GameState;
```

#### /game/Game.js

``` js
import '~/game/PhaserBridge'

import BootState from '~/game/states/BootState'
import PreloadState from '~/game/states/PreloadState' 
import MainMenuState from '~/game/states/MainMenuState' 
import GameState from '~/game/states/GameState' 

class Game extends Phaser.Game {

    constructor(settings){
        super(settings.width, settings.height, Phaser.AUTO, settings.containerId, null);
        
        this.$settings = settings;

        this.state.add('Boot', BootState, false);
        this.state.add('Preload', PreloadState, false);
        this.state.add('MainMenu', MainMenuState, false);
        this.state.add('Game', GameState, false);

        this.state.start('Boot');
    }

}

export default Game;
```

Now, you can start to create games within your NUXT or vue.js construct. Have fun :)

You can find a template for this tutorial @ [github](https://github.com/daspete/phaser-nuxt)