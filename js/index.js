window.onload = function() {
    var userNameElement = document.getElementById("userName");
    var userName = localStorage.getItem("userName");

    if (userName) {
        userNameElement.textContent = `${userName}`;
    } else {
        userNameElement.textContent = "User not logged in ...";
    }
}
function logOut(){
    window.location = "../index.html"
}