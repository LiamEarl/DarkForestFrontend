export function homepage() {
    const accountStatus = document.getElementById("accountstatus");
    const logoutButton = document.getElementById("logout");
    const loginButton = document.getElementById("login");
    const profileImage = document.getElementById("profileimage");
    logoutButton.hidden = true;

    const adjustAccountStatus = function() {
        let user = JSON.parse(localStorage.getItem("user"));

        if(user != null) {  
            profileImage.src = "../../public/assets/websiteAssets/loggedIn.png";
            accountStatus.textContent = "Status: Logged in, ".concat(user.username);
            logoutButton.hidden = false;
            loginButton.hidden = true;
        }else {
            profileImage.src = "../../public/assets/websiteAssets/loggedOut.png";
            accountStatus.textContent = "Status: Logged out.";
            logoutButton.hidden = true;
            loginButton.hidden = false;
        }
    }

    adjustAccountStatus();
    

    function logout() {
        localStorage.clear();
        adjustAccountStatus();
    }
    logoutButton.removeEventListener("click", logout);
    logoutButton.addEventListener("click", logout);

}