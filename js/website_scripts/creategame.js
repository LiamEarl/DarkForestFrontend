export function creategame() {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user == null) window.location.href = "../views/login.html";

    const gameCodeText = document.getElementById("gamecode");
    const statusMessage = document.getElementById("startstatus");
    const selectEmpireType = document.getElementById("selecttype");
    const empireIcon = document.getElementById("empireicon");
    const bonusText = document.getElementById("empirebonus");
    const startButton = document.getElementById("startbutton");
    const playerList = document.getElementById("playerlist");
    const menu = document.getElementById("menu");
    const copyButton = document.getElementById("copycode");
    const copiedMessage = document.getElementById("copiedmessage");
    copiedMessage.hidden = true;
    document.getElementById("leavehome").hidden = true;

    const bonusDescriptions = {
        "human": "Humans may trade credits for any other resource at a 2:1 ratio, instead of 3:1.",
        "hive mind": "Hive Mind empires always have maximum fleet morale.",
        "machine": "Machine empires do not have to worry about food production."
    };

    const empireIcons = {
        "human": "HumanIcon.png",
        "hive mind": "HiveMindIcon.png",
        "machine": "MachineIcon.png",
    };

    function getCode() {
        const url = new URL(window.location.href);
        return url.searchParams.get("code");
    }

    function changeURL(gameCode) {
        const url = new URL(window.location.href);
        url.searchParams.set("code", gameCode);
        window.history.pushState({}, "", url);
    }

    function generateCode(numChars) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var code = "";
        for(var i = 0; i < numChars; i++) {
            code = code.concat(chars.charAt(Math.floor(Math.random() * chars.length)));
        }
        return code;
    }

    function updateUserList(userList) {
        playerList.innerHTML = "<label>Players:</label>";
        for(var i = 0; i < userList.length; i++) {
            playerList.innerHTML +=`<p>${userList[i].username}</p>`;
        }
    }

    updateUserList([user]);

    var gameCode = getCode(); 
    if(gameCode == null) {
        gameCode = generateCode(9);
        changeURL(gameCode);
        fetch("http://localhost:8080/api/games/create/".concat(gameCode), {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("JWT")}`
            }
        }).then((response) => {
            if(response.status != 200) {
                statusMessage.textContent = "Something went wrong when attempting to create this game.";
                statusMessage.hidden = false;
            }
        }).catch((e) => {
            console.log(e);
        });
    }else {
        fetch("http://localhost:8080/api/games/join/".concat(gameCode), {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("JWT")}`
            }
        }).then((response) => {
            return response.status == 200 ? response.json() : null;
        }).then((userList) => {
            if(userList == null) return;
            updateUserList(userList);
        }).catch((e) => {
            console.log(e);
        });
    }

    gameCodeText.textContent = gameCode;

    const intervalId = setInterval(() => {
        if(getCode() == null) clearInterval(intervalId); 

        fetch("http://localhost:8080/api/games/getConnected/".concat(gameCode), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("JWT")}`
            }
        }).then((response) => {
            return response.status == 200 ? response.json() : null;
        }).then((userList) => {
            if(userList == null) return;
            updateUserList(userList);
        }).catch((e) => {
            console.log(e);
        });
    }, 5000);

    function changeEmpireType() {
        bonusText.textContent = bonusDescriptions[this.value];     
        empireIcon.src = "../../public/assets/empireIcons/".concat(empireIcons[this.value]);
    }

    

    function startGame() {    
        fetch("http://localhost:8080/api/empires/create", {
            method: "POST",
            body: JSON.stringify({
                type: selectEmpireType.value,
                name: user.username,
                owner_id: -1
            }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("JWT")}`
            }
        }).then((response) => {
            if(response.status == 200) {
                statusMessage.textContent = "Successfully created game!";
                statusMessage.style.color = "green";
            }else if(response.status == 401) {
                statusMessage.textContent = "Authorization credentials invalid. Try logging in again.";
                statusMessage.style.color = "red";
            }else {
                statusMessage.textContent = "Game creation failed. Maybe the server is down?";
                statusMessage.style.color = "red";
            }
        }).catch((e) => {
            console.log(e);
            statusMessage.textContent = "Game creation failed. Maybe the server is down?";
            statusMessage.style.color = "red";
        });
    }
    

    function copy() {
        copiedMessage.hidden = false; 
        navigator.clipboard.writeText(gameCode);
        setTimeout(() => {
            copiedMessage.hidden = true;
        }, 5000) 
    }

    selectEmpireType.removeEventListener('change', changeEmpireType)
    selectEmpireType.addEventListener('change', changeEmpireType);
    startButton.removeEventListener("click", startGame); 
    startButton.addEventListener("click", startGame); 
    copyButton.removeEventListener("click", copy);
    copyButton.addEventListener("click", copy);
}