accountStatus = document.getElementById("accountstatus");
logoutButton = document.getElementById("logout");
loginButton = document.getElementById("login");
profileImage = document.getElementById("profileimage");
logoutButton.hidden = true;

const adjustAccountStatus = function() {
    let user = JSON.parse(localStorage.getItem("user"));

    if(user != null) {  
        profileImage.src = "../../public/assets/loggedIn.png";
        accountStatus.textContent = "Status: Logged in, ".concat(user.username);
        logoutButton.hidden = false;
        loginButton.hidden = true;
    }else {
        profileImage.src = "../../public/assets/loggedOut.png";
        accountStatus.textContent = "Status: Logged out.";
        logoutButton.hidden = true;
        loginButton.hidden = false;
    }
}

adjustAccountStatus();

logoutButton.addEventListener("click", () => {
    localStorage.clear();
    adjustAccountStatus();
});