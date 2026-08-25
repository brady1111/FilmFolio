const resetEmail = document.getElementById("resetEmail");

const forgotPasswordButton =
    document.getElementById("forgotPasswordButton");

const forgotPasswordMessage =
    document.getElementById("forgotPasswordMessage");

forgotPasswordButton.addEventListener("click", async function () {

    const email = resetEmail.value.trim();

    if(!email) {
        forgotPasswordMessage.textContent =
            "Please enter your email address.";
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:8080/forgot-password/request?email=${encodeURIComponent(email)}`,
            {
                method: "POST"
            }
        );

        const result = await response.text();

        forgotPasswordMessage.textContent = result;

    } catch(error) {

        forgotPasswordMessage.textContent =
            "Something went wrong. Please try again.";

        console.error(error);
    }
});