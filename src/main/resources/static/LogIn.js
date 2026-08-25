const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeOpen = document.getElementById("eyeOpen");
const eyeClosed = document.getElementById("eyeClosed");
const loginButton = document.querySelector(".loginButton");
const loginError = document.getElementById("loginError");

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

loginButton.addEventListener("click", async function () {

    const email = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    loginError.textContent = "";

    if (email === "" || passwordValue === "") {
        loginError.textContent = "Please enter your email and password.";
        return;
    }

    const formData = new URLSearchParams();

    formData.append("email", email);
    formData.append("password", passwordValue);

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        });

        const result = await response.text();

        if (response.ok) {

            if (result === "Login successful") {
                window.location.href = "Home.html";
            } else {
                loginError.textContent = result;
            }

        } else {
            loginError.textContent = result;
        }

    } catch (error) {
        console.error(error);
        loginError.textContent = "Could not connect to the server.";
    }
});

email.addEventListener("input", function () {
    loginError.textContent = "";
});

password.addEventListener("input", function () {
    loginError.textContent = "";
});

