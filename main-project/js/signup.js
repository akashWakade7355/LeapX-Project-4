
// =====================================
// Elements
// =====================================

const signupForm = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const termsInput = document.getElementById("terms");

const togglePassword = document.getElementById("togglePassword");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const btnText = document.getElementById("btnText");
const spinner = document.getElementById("spinner");

// Error Elements

const nameError = document.getElementById("nameError");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const termsError = document.getElementById("termsError");

// =====================================
// Show / Hide Password
// =====================================

togglePassword.addEventListener("click", () => {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        togglePassword.innerHTML =
        '<i class="bi bi-eye-slash-fill"></i>';

    }else{

        passwordInput.type = "password";

        togglePassword.innerHTML =
        '<i class="bi bi-eye-fill"></i>';

    }

});

// =====================================
// Password Strength
// =====================================

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;

    let strength = 0;

    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[a-z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;

    switch(strength){

        case 0:
        case 1:
            strengthBar.style.width = "20%";
            strengthBar.style.background = "#dc3545";
            strengthText.innerHTML = "Weak Password";
            break;

        case 2:
            strengthBar.style.width = "40%";
            strengthBar.style.background = "#fd7e14";
            strengthText.innerHTML = "Fair Password";
            break;

        case 3:
            strengthBar.style.width = "60%";
            strengthBar.style.background = "#ffc107";
            strengthText.innerHTML = "Good Password";
            break;

        case 4:
            strengthBar.style.width = "80%";
            strengthBar.style.background = "#0dcaf0";
            strengthText.innerHTML = "Strong Password";
            break;

        case 5:
            strengthBar.style.width = "100%";
            strengthBar.style.background = "#198754";
            strengthText.innerHTML = "Very Strong Password";
            break;
    }

});

// =====================================
// Validation Functions
// =====================================

function validateEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

function validatePhone(phone){

    return /^[6-9]\d{9}$/.test(phone);

}

function validatePassword(password){

    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

}

// =====================================
// Signup
// =====================================

signupForm.addEventListener("submit", function(e){

    e.preventDefault();

    // Clear Errors

    nameError.innerHTML = "";
    usernameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneError.innerHTML = "";
    passwordError.innerHTML = "";
    confirmError.innerHTML = "";
    termsError.innerHTML = "";

    let valid = true;

    const name = nameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Name

    if(name.length < 3){

        nameError.innerHTML = "Please enter your full name.";
        valid = false;

    }

    // Username

    if(username.length < 4){

        usernameError.innerHTML = "Username must contain at least 4 characters.";
        valid = false;

    }

    // Email

    if(!validateEmail(email)){

        emailError.innerHTML = "Please enter a valid email.";
        valid = false;

    }

    // Phone

    if(!validatePhone(phone)){

        phoneError.innerHTML = "Please enter a valid phone number.";
        valid = false;

    }

    // Password

    if(!validatePassword(password)){

        passwordError.innerHTML =
        "Password must contain uppercase, lowercase, number and special character.";

        valid = false;

    }

    // Confirm Password

    if(password !== confirmPassword){

        confirmError.innerHTML =
        "Passwords do not match.";

        valid = false;

    }

    // Terms

    if(!termsInput.checked){

        termsError.innerHTML =
        "Please accept Terms & Conditions.";

        valid = false;

    }

    if(!valid){

        return;

    }

    // Loading Animation

    spinner.classList.remove("d-none");

    btnText.innerHTML = "Creating Account...";

    // Simulate Request

    setTimeout(() => {

        spinner.classList.add("d-none");

        btnText.innerHTML = "Create Account";

        alert("🎉 Account Created Successfully!");

        signupForm.reset();

        strengthBar.style.width = "0%";

        strengthText.innerHTML = "";

        // Redirect

        window.location.href = "../User/html/homePage.html";

    },1500);

});