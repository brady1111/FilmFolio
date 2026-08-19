const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeOpen = document.getElementById("eyeOpen");
const eyeClosed = document.getElementById("eyeClosed");

togglePassword.addEventListener("click", function () {
    if(password.type === "password") {
        password.type = "text";
        eyeOpen.style.display = "none";
        eyeClosed.style.display = "block";
        togglePassword.setAttribute("aria-label", "Hide password");
    }else{
        password.type = "password";
        eyeOpen.style.display = "block";
        eyeClosed.style.display = "none";
        togglePassword.setAttribute("aria-label", "Show password");
    }
});

