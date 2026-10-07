/* ==========================================
   BUXMART REGISTER
========================================== */


/* ==========================================
   GET ELEMENTS
========================================== */

const registerForm = document.getElementById("registerForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const termsError = document.getElementById("termsError");

const registerAlert = document.getElementById("registerAlert");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

const strengthProgress = document.getElementById("strengthProgress");
const strengthText = document.getElementById("strengthText");

const registerBtn = document.getElementById("registerBtn");
const buttonText = document.getElementById("buttonText");
const buttonSpinner = document.getElementById("buttonSpinner");
const buttonIcon = document.getElementById("buttonIcon");


/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        this.innerHTML = '<i class="bi bi-eye-slash"></i>';

    } else {

        password.type = "password";

        this.innerHTML = '<i class="bi bi-eye"></i>';
    }
});


toggleConfirmPassword.addEventListener("click", function () {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";

        this.innerHTML = '<i class="bi bi-eye-slash"></i>';

    } else {

        confirmPassword.type = "password";

        this.innerHTML = '<i class="bi bi-eye"></i>';
    }
});


/* ==========================================
   PASSWORD STRENGTH
========================================== */

password.addEventListener("input", function () {

    const value = password.value;

    let strength = 0;

    if (value.length >= 6) {
        strength++;
    }

    if (/[A-Z]/.test(value)) {
        strength++;
    }

    if (/[0-9]/.test(value)) {
        strength++;
    }

    if (/[^A-Za-z0-9]/.test(value)) {
        strength++;
    }


    if (value.length === 0) {

        strengthProgress.style.width = "0%";
        strengthText.textContent = "Password strength";

    }

    else if (strength === 1) {

        strengthProgress.style.width = "25%";
        strengthText.textContent = "Weak password";

    }

    else if (strength === 2) {

        strengthProgress.style.width = "50%";
        strengthText.textContent = "Medium password";

    }

    else if (strength === 3) {

        strengthProgress.style.width = "75%";
        strengthText.textContent = "Good password";

    }

    else {

        strengthProgress.style.width = "100%";
        strengthText.textContent = "Strong password";
    }
});


/* ==========================================
   VALIDATE EMAIL
========================================== */

function isValidEmail(emailValue) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(emailValue);
}


/* ==========================================
   SHOW ERROR
========================================== */

function showError(element, message) {

    element.textContent = message;
}


/* ==========================================
   CLEAR ERRORS
========================================== */

function clearErrors() {

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    termsError.textContent = "";

    registerAlert.className = "alert d-none";
    registerAlert.textContent = "";
}


/* ==========================================
   SHOW ALERT
========================================== */

function showAlert(message, type) {

    registerAlert.className = `alert alert-${type}`;
    registerAlert.textContent = message;
}


/* ==========================================
   REGISTER FORM
========================================== */

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim().toLowerCase();
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    let isValid = true;


    /* --------------------------------------
       NAME VALIDATION
    -------------------------------------- */

    if (nameValue === "") {

        showError(
            nameError,
            "Please enter your full name."
        );

        isValid = false;

    } else if (nameValue.length < 3) {

        showError(
            nameError,
            "Name must contain at least 3 characters."
        );

        isValid = false;
    }


    /* --------------------------------------
       EMAIL VALIDATION
    -------------------------------------- */

    if (emailValue === "") {

        showError(
            emailError,
            "Please enter your email address."
        );

        isValid = false;

    } else if (!isValidEmail(emailValue)) {

        showError(
            emailError,
            "Please enter a valid email address."
        );

        isValid = false;
    }


    /* --------------------------------------
       PASSWORD VALIDATION
    -------------------------------------- */

    if (passwordValue === "") {

        showError(
            passwordError,
            "Please create a password."
        );

        isValid = false;

    } else if (passwordValue.length < 6) {

        showError(
            passwordError,
            "Password must be at least 6 characters."
        );

        isValid = false;
    }


    /* --------------------------------------
       CONFIRM PASSWORD
    -------------------------------------- */

    if (confirmPasswordValue === "") {

        showError(
            confirmPasswordError,
            "Please confirm your password."
        );

        isValid = false;

    } else if (passwordValue !== confirmPasswordValue) {

        showError(
            confirmPasswordError,
            "Passwords do not match."
        );

        isValid = false;
    }


    /* --------------------------------------
       TERMS
    -------------------------------------- */

    if (!terms.checked) {

        showError(
            termsError,
            "Please accept the Terms & Conditions."
        );

        isValid = false;
    }


    /* --------------------------------------
       STOP IF INVALID
    -------------------------------------- */

    if (!isValid) {
        return;
    }


    /* ======================================
       CHECK EXISTING USERS
    ====================================== */

    let users = JSON.parse(
        localStorage.getItem("buxmartUsers")
    ) || [];


    const existingUser = users.find(
        user => user.email === emailValue
    );


    if (existingUser) {

        showAlert(
            "An account with this email already exists. Please sign in.",
            "warning"
        );

        return;
    }


    /* ======================================
       CREATE USER
    ====================================== */

    const newUser = {

        id: Date.now(),

        name: nameValue,

        email: emailValue,

        password: passwordValue,

        createdAt: new Date().toISOString()
    };


    users.push(newUser);


    /* ======================================
       SAVE USER
    ====================================== */

    localStorage.setItem(
        "buxmartUsers",
        JSON.stringify(users)
    );


    /* ======================================
       BUTTON LOADING
    ====================================== */

    registerBtn.disabled = true;

    buttonText.textContent = "Creating Account...";

    buttonSpinner.classList.remove("d-none");

    buttonIcon.classList.add("d-none");


    /* ======================================
       SUCCESS
    ====================================== */

    setTimeout(function () {

        /*
         * Save temporary user information.
         * Login page can use this information.
         */

        localStorage.setItem(
            "registeredEmail",
            emailValue
        );


        showAlert(
            "Account created successfully! Redirecting to login...",
            "success"
        );


        setTimeout(function () {

            window.location.href = "login.html";

        }, 1000);

    }, 800);

});