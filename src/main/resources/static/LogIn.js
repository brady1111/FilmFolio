const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

//allows the user to hide or show password
togglePassword.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        password.type = "password";
        togglePassword.textContent = "👁";
    }
});

