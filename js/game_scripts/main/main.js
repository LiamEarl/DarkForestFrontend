import { Application, Assets, Sprite} from 'pixi.js';
import {Loader} from '../sprites/sprite_loader.js';
// import { Client } from '@stomp/stompjs';
// import { WebSocket } from 'ws';

(async () =>
{
    const app = new Application();

    await app.init({ background: '#000000', resizeTo:window});

    document.body.appendChild(app.canvas);
 
    const loader = new Loader();
    await loader.load();
    const renderer = new Renderer(loader.get_images());
    
    const submitButton = document.getElementById("submitUsernameButton");
    if (submitButton) {
        submitButton.addEventListener("click", () => {
            const username = document.getElementById("usernameInput").value;
            
        });
    }
    
    const background = new Sprite(textures.get('spacebackground'));
    //const hexmap = new Sprite(textures.get('hexmap'));



    
    background.pivot.set(background.width / 2, background.height / 2);
    background.position.set(app.renderer.width / 2, app.renderer.height / 2);
    
    app.stage.addChild(background);
})();
