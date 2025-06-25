const statusMessage = document.getElementById("statusmessage");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {    
    event.preventDefault();
    
    statusMessage.textContent = "Awaiting server response...";
    statusMessage.style.color = "yellow";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
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
        console.log(loginDto.user.username.concat("  ").concat(loginDto.user.id))
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500); 
    }).catch((e) => {
        console.log(e);
        statusMessage.textContent = "Login failed. Maybe the server is down?";
        statusMessage.style.color = "red";
    });
});