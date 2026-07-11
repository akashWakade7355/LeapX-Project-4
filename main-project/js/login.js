

// ===============================
// Elements
// ===============================

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const togglePassword = document.getElementById("togglePassword");

const btnText = document.getElementById("btnText");
const spinner = document.getElementById("spinner");

// ===============================
// Show / Hide Password
// ===============================

togglePassword.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";
        togglePassword.innerHTML =
        '<i class="bi bi-eye-slash-fill"></i>';

    }else{

        password.type = "password";
        togglePassword.innerHTML =
        '<i class="bi bi-eye-fill"></i>';

    }

});

// ===============================
// Email Validation
// ===============================

function validateEmail(emailValue){

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(emailValue);

}

// ===============================
// Login
// ===============================

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    let valid = true;

    if(emailValue === ""){

        emailError.textContent = "Email is required.";
        valid = false;

    }
    else if(!validateEmail(emailValue)){

        emailError.textContent = "Enter a valid email.";
        valid = false;

    }

    if(passwordValue === ""){

        passwordError.textContent = "Password is required.";
        valid = false;

    }

    if(!valid) return;

    // Loading Animation

    btnText.textContent = "Logging In...";
    spinner.classList.remove("d-none");

    setTimeout(() => {

        spinner.classList.add("d-none");
        btnText.textContent = "Login";

        alert("Login Successful!");

        window.location.href = "../User/html/homePage.html";

    },1500);

});
