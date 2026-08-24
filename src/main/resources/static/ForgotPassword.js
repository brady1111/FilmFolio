
const newPassword = document.getElementById("newpassword");
const confirmPassword = document.getElementById("password");

const resetButton = document.getElementById("resetPasswordButton");
const resetMessage = document.getElementById("resetMessage");

//password requirements
const lengthRequirement = document.getElementById("lengthRequirement");
const capitalRequirement = document.getElementById("capitalRequirement");
const numberRequirement = document.getElementById("numberRequirement");
const specialRequirement = document.getElementById("specialRequirement");

//get reset token from the URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

const toggleNewPassword = document.getElementById("toggleNewPassword");
const newEyeOpen = document.getElementById("newEyeOpen");
const newEyeClosed = document.getElementById("newEyeClosed");

toggleNewPassword.addEventListener("click", function () {
    if(newPassword.type === "password") {
        newPassword.type = "text";
        newEyeOpen.style.display = "none";
        newEyeClosed.style.display = "block";
        toggleNewPassword.setAttribute("aria-label", "Hide password");
    }else{
        newPassword.type = "password";
        newEyeOpen.style.display = "block";
        newEyeClosed.style.display = "none";
        toggleNewPassword.setAttribute("aria-label", "Show password");
    }
});


const togglePassword = document.getElementById("togglePassword");
const confirmEyeOpen = document.getElementById("confirmEyeOpen");
const confirmEyeClosed = document.getElementById("confirmEyeClosed");

togglePassword.addEventListener("click", function () {
    if(confirmPassword.type === "password") {
        confirmPassword.type = "text";
        confirmEyeOpen.style.display = "none";
        confirmEyeClosed.style.display = "block";
        togglePassword.setAttribute("aria-label", "Hide password");
    }else{
        confirmPassword.type = "password";
        confirmEyeOpen.style.display = "block";
        confirmEyeClosed.style.display = "none";
        togglePassword.setAttribute("aria-label", "Show password");
    }
});

newPassword.addEventListener("input", function () {
    const password = newPassword.value;
    //10 characters
    if(password.length >= 10) {
        lengthRequirement.textContent = "✓ At least 10 characters";
    }else{
        lengthRequirement.textContent = "✕ At least 10 characters";
    }

    //capital letter
    if(/[A-Z]/.test(password)) {
        capitalRequirement.textContent = "✓ At least one capital letter";
    }else{
        capitalRequirement.textContent = "✕ At least one capital letter";
    }

    //number
    if(/[0-9]/.test(password)) {
        numberRequirement.textContent = "✓ At least one number";
    }else{
        numberRequirement.textContent = "✕ At least one number";
    }

    //special character
    if(/[^A-Za-z0-9]/.test(password)) {
        specialRequirement.textContent = "✓ At least one special character";
    }else{
        specialRequirement.textContent = "✕ At least one special character";
    }
});

resetButton.addEventListener("click", async function () {
    const password = newPassword.value;
    const confirm = confirmPassword.value;
    //check token
    if(!token) {
        resetMessage.textContent =
            "Invalid password reset link.";
        return;
    }

    //check password requirements
    if(password.length < 10) {
        resetMessage.textContent =
            "Password must be at least 10 characters.";
        return;
    }
    if(!/[A-Z]/.test(password)) {
        resetMessage.textContent =
            "Password must contain at least one capital letter.";
        return;
    }
    if(!/[0-9]/.test(password)) {
        resetMessage.textContent =
            "Password must contain at least one number.";
        return;
    }
    if(!/[^A-Za-z0-9]/.test(password)) {
        resetMessage.textContent =
            "Password must contain at least one special character.";
        return;
    }

    //check that passwords match
    if(password !== confirm) {
        resetMessage.textContent =
            "Passwords do not match.";
        return;
    }

    try{
        const response = await fetch(
            `http://localhost:8080/forgot-password/reset?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(password)}`,
{
    method: "POST"
}
);
const result = await response.text();
resetMessage.textContent = result;

//send user back to login
if(response.ok && result === "Password successfully changed.") {

    setTimeout(function () {
        window.location.href = "LogIn.html";
    }, 2000);
}

}catch(error) {
    resetMessage.textContent =
        "Something went wrong. Please try again.";
    console.error(error);
}
});
