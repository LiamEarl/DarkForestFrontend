import { Application, Assets, Sprite} from 'pixi.js';
import {Loader} from '/src/sprites/sprite_loader.js';

(async () =>
{
    const app = new Application();

    await app.init({ background: '#000000', resizeTo:window});

    document.body.appendChild(app.canvas);
 
    const loader = new Loader();
    await loader.load();
    const textures = loader.get_images();
    
    const submitButton = document.getElementById("submitUsernameButton");
    if (submitButton) {
        submitButton.addEventListener("click", () => {
            const username = document.getElementById("usernameInput").value;

            fetch("http://localhost:8080/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username }),
            })
            .then((response) => response.text())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        });
    }

    //const background = new Sprite(textures.get('spacebackground'));
    //const hexmap = new Sprite(textures.get('hexmap'));



    /*
    hexmap.pivot.set(hexmap.width / 2, hexmap.height / 2);
    hexmap.position.set(app.renderer.width / 2, app.renderer.height / 2);

    background.pivot.set(background.width / 2, background.height / 2);
    background.position.set(app.renderer.width / 2, app.renderer.height / 2);
    
    app.stage.addChild(background);
    app.stage.addChild(hexmap);*/
})();
