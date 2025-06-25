const statusMessage = document.getElementById("statusmessage");
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event) {    
    event.preventDefault();

    statusMessage.textContent = "Awaiting server response...";
    statusMessage.style.color = "yellow";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    fetch("http://localhost:8080/api/users/register", {
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
            statusMessage.textContent = "Successfuly registered!";
            statusMessage.style.color = "green";
            return response.json();
        }else if(response.status == 401) { 
            statusMessage.textContent = "That username is already in use.";
        }else {
            statusMessage.textContent = "Registration failed.";
        }
        statusMessage.style.color = "red";
        return null;
    }).then((json) => {
        if(json == null) return;
        localStorage.setItem("user", json);

        setTimeout(() => {
           window.location.href = "login.html";
        }, 1500);
    }).catch((e) => {
        console.log(e);
        statusMessage.textContent = "Registration failed. Maybe the server is down?";
        statusMessage.style.color = "red";
    });
});