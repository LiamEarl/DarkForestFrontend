import { homepage } from "./homepage.js";
import { creategame } from "./creategame.js";
import { header_background } from "./headerbackground.js";
import { login } from "./login.js";
import { register } from "./register.js";
import { joingame } from "./joingame.js";

function switch_page(pages, target) {

    if(target != "creategame") {
        window.history.replaceState(null, "", window.location.origin);
    }

    pages.forEach(page => {
        page.hidden = page.id !== target;
    });
    run_page_script(target);
    
}

function run_page_script(page) {

    if(page != "play") header_background();

    switch(page) {
        case "home":
            homepage();
            break;
        case "login":
            login();
            break;
        case "register":
            register();
            break;
        case "joingame":
            joingame();
            break;
        case "creategame":
            creategame();
            break;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const buttons = document.querySelectorAll(".navigate");
    switch_page(pages, "home");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            switch_page(pages, button.dataset.page);
        });
    });
});