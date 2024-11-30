// Deceleration
var move = document.getElementById("signup-caption");
var waves = document.getElementById("waves");
// Deceleration signUp
var userNameInput = document.getElementById("inputSignupName");
var userEmailInput = document.getElementById("inputSignupEmail");
var userPasswordInput = document.getElementById("inputSignupPass");
// Deceleration signIn
var inputLoginEmail = document.getElementById("inputLoginEmail");
var inputLoginPass = document.getElementById("inputLoginPass");
// Other Deceleration
var popUp = document.getElementById("popup");
var popUpLogin = document.getElementById("popupLogin");
var closeIcon = document.getElementById("close-icon");
var closeIconLogin = document.getElementById("close-iconLogin");
var eyeIcon = document.getElementById("eyeIcon");
var eyeIconLogin = document.getElementById("eyeIconLogin");



var userAccounts = [];

if (localStorage.getItem("users")) {
   userAccounts = JSON.parse(localStorage.getItem("users"));
}
else {
   console.log("not good");
}

function signUp() {
   move.style.cssText = `
   transform: translateX(650px);
   z-index: 1000;
   transition: .9s;
   border-radius: 0 20px 20px 0;
   `
   waves.style.visibility = "hidden"
   setTimeout(() => {
      waves.style.cssText = `
      visibility = "hidden";
      transform: rotate(90deg);
      z-index: 9999;
      right: 52%;
      `
   }, 1000);
}
var popupFadeLogin;
function signUpData() {
   if (validationInputs(userNameInput) &&
      validationInputs(userEmailInput) &&
      validationInputs(userPasswordInput)) {

      var found = false;
      for (var i = 0; i < userAccounts.length; i++) {

         if (userEmailInput.value == userAccounts[i].email) {
            popUp.classList.remove("d-none");
            popUp.classList.add("d-flex");
            popupFade = setTimeout(() => {
               popUp.classList.add("d-none");
               popUp.classList.remove("d-flex");
            }, 3000);
            found = true;
            break;
         }
      }
      if (!found) {
         var user = {
            name: userNameInput.value,
            email: userEmailInput.value,
            pass: userPasswordInput.value,
         }
         userAccounts.push(user)
         localStorage.setItem("users", JSON.stringify(userAccounts));
         // remove is-valid Class
         userNameInput.classList.remove("is-valid");
         userEmailInput.classList.remove("is-valid");
         userPasswordInput.classList.remove("is-valid");
         // move The Slider
         move.style.cssText = `
            transform: translateX(0px);
            z-index: 1000;
            transition: .9s;
            border-radius: 20px 0 0 20px;
            `
         // move The Waves
         waves.style.visibility = "hidden"
         setTimeout(() => {
            waves.style.cssText = `
               visibility = "visible"
               right: 54%;
               transform: rotate(270deg);
               z-index : 9999;
               `
         }, 1000);
         resetInputs();
      }
   }
}

function validationInputs(el) {
   var regexObj = {
      inputSignupName: /^[A-Z][a-zA-Z0-9\s]{2,}$/,
      inputSignupEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
      inputSignupPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&&_+\-]).{8,}$/,
   }
   var errorMessage = document.getElementById(`msg-${el.id}`);

   if (regexObj[el.id].test(el.value)) {
         el.classList.add("is-valid");
         el.classList.remove("is-invalid");
         errorMessage.classList.add("d-none");
         
         return true
      }
      else {
         el.classList.add("is-invalid");
         el.classList.remove("is-valid");
         errorMessage.classList.remove("d-none");
         return false
      }
}

function resetInputs() {
   userNameInput.value = "";
   userEmailInput.value = "";
   userPasswordInput.value = "";

}

var popupFade;
function logIn() {
   var msgEmail = document.getElementById("msgEmail");
   var msgPass = document.getElementById("msgPass");

   if (inputLoginEmail.value == "") {
      msgEmail.classList.remove("d-none");
   } else {
      msgEmail.classList.add("d-none");
   }

   if (inputLoginPass.value == "") {
      msgPass.classList.remove("d-none");
   } else {
      msgPass.classList.add("d-none");
   }

   if (inputLoginEmail.value !== "" && inputLoginPass.value !== "") {
      let found = false;
      for (var i = 0; i < userAccounts.length; i++) {
         if (userAccounts[i].email == inputLoginEmail.value && userAccounts[i].pass == inputLoginPass.value) {
            found = true;
            localStorage.setItem("userName", userAccounts[i].name);
            break;
         }
      }
      if (found) {
         window.location.href ="../home.html";
      } else {
         popUpLogin.classList.remove("d-none");
         popUpLogin.classList.add("d-flex");
         popupFade = setTimeout(() => {
            popUpLogin.classList.add("d-none");
            popUpLogin.classList.remove("d-flex");
         }, 3000);
      }
   }
   resetInputs();
}

closeIcon.addEventListener("click", function () {
   clearTimeout(popupFadeLogin);
   popUp.classList.add("d-none");
   popUp.classList.remove("d-flex");
});

closeIconLogin.addEventListener("click", function () {
   clearTimeout(popupFade);
   popUpLogin.classList.add("d-none");
   popUpLogin.classList.remove("d-flex");
});

function showPass() {
   if (userPasswordInput.type === "password") {
      userPasswordInput.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
   } else {
      userPasswordInput.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
   }
}
function showPassLogin() {
   if (inputLoginPass.type === "password") {
      inputLoginPass.type = "text";
      eyeIconLogin.classList.remove("fa-eye");
      eyeIconLogin.classList.add("fa-eye-slash");
   } else {
      inputLoginPass.type = "password";
      eyeIconLogin.classList.remove("fa-eye-slash");
      eyeIconLogin.classList.add("fa-eye");
   }
}


