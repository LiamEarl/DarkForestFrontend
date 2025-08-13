export function register() {
    const statusMessage = document.getElementById("statusmessage");
    const registerForm = document.getElementById("registerForm");

    function attemptRegister(event) {    
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
            console.log(response.status)
            if(response.status == 200) {
                statusMessage.textContent = "Successfuly registered!";
                statusMessage.style.color = "green";
            }else if(response.status == 401) { 
                statusMessage.textContent = "That username is already in use.";
            }else {
                statusMessage.textContent = "Registration failed.";
            }
            statusMessage.style.color = "red";
        }).catch((e) => {
            console.log(e);
            statusMessage.textContent = "Registration failed. Maybe the server is down?";
            statusMessage.style.color = "red";
        });
    }

    registerForm.removeEventListener("submit", attemptRegister);
    registerForm.addEventListener("submit", attemptRegister);
}