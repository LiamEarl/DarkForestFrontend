const user = JSON.parse(localStorage.getItem("user"));
if(user == null) window.location.href = "../views/login.html";

statusMessage = document.getElementById("statusmessage");
joinButton = document.getElementById("joinbutton");
codeInput = document.getElementById("gamecode");
statusMessage.hidden = true;


joinButton.addEventListener("click", (event) => {
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
            window.location.href = "creategame.html?code=".concat(gameCode); 
        }, 1500);
        
    }).then((userList) => {
        if(userList == null) return;
        updateUserList(userList);
    }).catch((e) => {
        console.log(e);
    });
});