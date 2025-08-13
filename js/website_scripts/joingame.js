export function joingame() {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user == null) window.location.href = "../views/login.html";

    statusMessage = document.getElementById("statusmessage");
    joinButton = document.getElementById("joinbutton");
    codeInput = document.getElementById("gamecode");
    statusMessage.hidden = true;

    function join() {
        const gameCode = codeInput.value;

        if(gameCode.length != 9) {
            statusMessage.hidden = false;
            statusMessage.textContent = "The game code must be 9 characters.";
            statusMessage.style.color = "red";
            return;
        }
        
        fetch("http://localhost:8080/api/games/".concat(gameCode), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("JWT")}`
            }
        }).then((response) => {
            if(response.status != 200) {
                statusMessage.textContent = "The game code is not valid.";
                statusMessage.style.color = "red";
                return;
            }
            statusMessage.hidden = false;
            statusMessage.textContent = "Joining...";
            statusMessage.style.color = "green";
            setTimeout(() => {
                const params = new URLSearchParams(window.location.search);
                params.set("code", gameCode);

                const newUrl = `${window.location.pathname}?${params.toString()}`;
                history.pushState(null, "", newUrl);

                const pages = document.querySelectorAll(".page");
                pages.forEach(page => {
                    page.hidden = page.id !== "creategame";
                });
            }, 1500);     
        }).catch((e) => {
            console.log(e);
        });
    }
    joinButton.removeEventListener("click", join);
    joinButton.addEventListener("click", join);
}