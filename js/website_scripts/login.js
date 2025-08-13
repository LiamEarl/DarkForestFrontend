export function login() {
    const statusMessage = document.getElementById("lstatusmessage");
    const loginForm = document.getElementById("loginForm");

    function attemptLogin(event) {    
        event.preventDefault();
        
        statusMessage.textContent = "Awaiting server response...";
        statusMessage.style.color = "yellow";

        const username = document.getElementById("lusername").value;
        const password = document.getElementById("lpassword").value;

        fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then((response) => {
            if(response.status == 200) {
                statusMessage.textContent = "Login successful!";
                statusMessage.style.color = "green";
                return response.json();
            }else if(response.status == 401) {
                statusMessage.textContent = "The username or password is incorrect.";
            }else {
                statusMessage.textContent = "Login failed.";
            }
            statusMessage.style.color = "red";
            return {token:"FAILED"};
        }).then((loginDto) => {
            if(loginDto.token == "FAILED") return;
            console.log(loginDto.token);
            localStorage.setItem("JWT", loginDto.token);
            localStorage.setItem("user", JSON.stringify(loginDto.user));
            console.log(loginDto.user.username.concat("  ").concat(loginDto.user.id));
        }).catch((e) => {
            console.log(e);
            statusMessage.textContent = "Login failed. Maybe the server is down?";
            statusMessage.style.color = "red";
        });
    }

    loginForm.removeEventListener("submit", attemptLogin);
    loginForm.addEventListener("submit", attemptLogin);

}