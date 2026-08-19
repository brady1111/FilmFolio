//variables for first password entry
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeOpen = document.getElementById("eyeOpen");
const eyeClosed = document.getElementById("eyeClosed");

//variables for confirmation password entry
const confirmPassword = document.getElementById("confirmPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const confirmEyeOpen = document.getElementById("confirmEyeOpen");
const confirmEyeClosed = document.getElementById("confirmEyeClosed");

//variables to check password requirements
const lengthRequirement = document.getElementById("lengthRequirement");
const numberRequirement = document.getElementById("numberRequirement");
const specialRequirement = document.getElementById("specialRequirement");
const capitalRequirement = document.getElementById("capitalRequirement");

//variables to handle error handling
const signUpButton = document.getElementById("signUpButton");
const signUpError = document.getElementById("signUpError");
const email = document.getElementById("email");

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

toggleConfirmPassword.addEventListener("click", function () {
    if(confirmPassword.type === "password") {
        confirmPassword.type = "text";
        confirmEyeOpen.style.display = "none";
        confirmEyeClosed.style.display = "block";
        toggleConfirmPassword.setAttribute("aria-label", "Hide password");
    }else{
        confirmPassword.type = "password";
        confirmEyeOpen.style.display = "block";
        confirmEyeClosed.style.display = "none";
        toggleConfirmPassword.setAttribute("aria-label", "Show password");
    }
});

//check password requirements
password.addEventListener("input", function () {
    if(password.value.length >= 10) {
        lengthRequirement.textContent = "✓ At least 10 characters";
    }else{
        lengthRequirement.textContent = "x At least 10 characters";
    }
    if(/[0-9]/.test(password.value)) {
        numberRequirement.textContent = "✓ At least one number";
    }else{
        numberRequirement.textContent = "x At least one number";
    }
    if(/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
        specialRequirement.textContent = "✓ At least one special character";
    }else{
        specialRequirement.textContent = "x At least one special character";
    }
    if(/[A-Z]/.test(password.value)) {
        capitalRequirement.textContent = "✓ At least one capital letter";
    }else{
        capitalRequirement.textContent = "x At least one capital letter";
    }
});


//go back to login after creating account
signUpButton.addEventListener("click", function() {

    //password error handling
    if(password.value === "") {
        signUpError.textContent = "Please enter a password.";
    }else if(confirmPassword.value === "") {
        signUpError.textContent = "Please confirm your password.";
    }else if(password.value !== confirmPassword.value) {
        signUpError.textContent = "Passwords do not match.";
    }else if(!passwordRequirementsMet()) {
        signUpError.textContent = "Password does not meet the requirements."
    }

    //email error handling
    else if(email.value.trim() === "") {
        signUpError.textContent = "Please enter an email address.";
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        signUpError.textContent = "Please enter a valid email address.";
    }else{
        window.location.href = "LogIn.html";
    }

});

//function to check if password meets requirements
function passwordRequirementsMet() {
    return password.value.length >= 10 && //cannot be shorter than 10 characters
        password.value.length <= 64 && //cannot be longer than 64 characters
        /[0-9]/.test(password.value) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password.value) &&
        /[A-Z]/.test(password.value);
}