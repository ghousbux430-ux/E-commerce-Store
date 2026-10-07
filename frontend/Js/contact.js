// ==========================================
// BUXMART - CONTACT PAGE JAVASCRIPT
// ==========================================


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeContactForm();

        initializeCharacterCounter();

        initializeContactAnimations();

        initializeContactNavigation();

    }
);


// ==========================================
// CONTACT FORM
// ==========================================

function initializeContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            clearFormErrors();


            const name =
                document.getElementById(
                    "contactName"
                ).value.trim();


            const email =
                document.getElementById(
                    "contactEmail"
                ).value.trim();


            const subject =
                document.getElementById(
                    "contactSubject"
                ).value;


            const message =
                document.getElementById(
                    "contactMessage"
                ).value.trim();


            let isValid = true;


            // NAME

            if (name.length < 2) {

                showFormError(
                    "nameError",
                    "Please enter your name."
                );

                isValid = false;
            }


            // EMAIL

            if (!isValidEmail(email)) {

                showFormError(
                    "emailError",
                    "Please enter a valid email address."
                );

                isValid = false;
            }


            // SUBJECT

            if (!subject) {

                showFormError(
                    "subjectError",
                    "Please select a subject."
                );

                isValid = false;
            }


            // MESSAGE

            if (message.length < 10) {

                showFormError(
                    "messageError",
                    "Message must contain at least 10 characters."
                );

                isValid = false;
            }


            if (!isValid) {
                return;
            }


            submitContactForm(
                form
            );

        }
    );
}


// ==========================================
// EMAIL VALIDATION
// ==========================================

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}


// ==========================================
// SHOW FORM ERROR
// ==========================================

function showFormError(
    elementId,
    message
) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) {
        return;
    }

    element.textContent =
        message;
}


// ==========================================
// CLEAR FORM ERRORS
// ==========================================

function clearFormErrors() {

    document
        .querySelectorAll(
            ".form-error"
        )
        .forEach(
            element => {

                element.textContent = "";

            }
        );
}


// ==========================================
// SUBMIT CONTACT FORM
// ==========================================

function submitContactForm(form) {

    const submitButton =
        document.getElementById(
            "contactSubmit"
        );


    const originalHTML =
        submitButton.innerHTML;


    submitButton.classList.add(
        "loading"
    );


    submitButton.innerHTML = `
        <i class="bi bi-hourglass-split"></i>
        Sending...
    `;


    /*
        Demo submission.

        Later, when FastAPI backend is ready,
        this function can send the data using
        fetch() to the API.
    */

    setTimeout(
        function () {

            submitButton.classList.remove(
                "loading"
            );

            submitButton.classList.add(
                "success"
            );

            submitButton.innerHTML = `
                <i class="bi bi-check-circle"></i>
                Message Sent Successfully
            `;


            if (
                typeof showNotification ===
                "function"
            ) {

                showNotification(
                    "Thank you! Your message has been received."
                );
            }


            form.reset();

            updateCharacterCount();


            setTimeout(
                function () {

                    submitButton.classList.remove(
                        "success"
                    );

                    submitButton.innerHTML =
                        originalHTML;

                },
                3000
            );

        },
        1200
    );
}


// ==========================================
// CHARACTER COUNTER
// ==========================================

function initializeCharacterCounter() {

    const textarea =
        document.getElementById(
            "contactMessage"
        );

    const counter =
        document.getElementById(
            "characterCount"
        );


    if (!textarea || !counter) {
        return;
    }


    textarea.addEventListener(
        "input",
        updateCharacterCount
    );


    updateCharacterCount();
}


function updateCharacterCount() {

    const textarea =
        document.getElementById(
            "contactMessage"
        );

    const counter =
        document.getElementById(
            "characterCount"
        );


    if (!textarea || !counter) {
        return;
    }


    const length =
        textarea.value.length;


    counter.textContent =
        `${length} / 500`;


    if (length >= 450) {

        counter.style.color =
            "#dc3545";

    } else {

        counter.style.color =
            "#9aa2b1";
    }
}


// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initializeContactAnimations() {

    const elements =
        document.querySelectorAll(
            ".contact-info-card, .support-item, .faq-accordion .accordion-item"
        );


    if (!elements.length) {
        return;
    }


    elements.forEach(
        element => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(20px)";

            element.style.transition =
                "opacity .6s ease, transform .6s ease";
        }
    );


    const observer =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        element =>
            observer.observe(element)
    );
}


// ==========================================
// CONTACT NAVIGATION
// ==========================================

function initializeContactNavigation() {

    const shopButton =
        document.querySelector(
            ".cta-button"
        );


    if (!shopButton) {
        return;
    }


    shopButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            if (
                typeof openProtectedPage ===
                "function"
            ) {

                openProtectedPage(
                    "products.html"
                );

            } else {

                window.location.href =
                    "products.html";
            }

        }
    );
}