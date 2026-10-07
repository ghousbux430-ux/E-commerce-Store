// ==========================================
// BUXMART - ABOUT PAGE JAVASCRIPT
// ==========================================


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeCounters();

        initializeAboutAnimations();

        initializeAboutNavigation();

    }
);


// ==========================================
// COUNTERS
// ==========================================

function initializeCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );

    if (!counters.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const counter =
                            entry.target;


                        const target =
                            parseFloat(
                                counter.dataset.target
                            );


                        const isDecimal =
                            counter.dataset.decimal ===
                            "true";


                        const duration =
                            1400;


                        const startTime =
                            performance.now();


                        function updateCounter(
                            currentTime
                        ) {

                            const elapsed =
                                currentTime -
                                startTime;


                            const progress =
                                Math.min(
                                    elapsed / duration,
                                    1
                                );


                            // Smooth animation
                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            const current =
                                target * eased;


                            if (isDecimal) {

                                counter.textContent =
                                    current.toFixed(1);

                            } else {

                                counter.textContent =
                                    Math.floor(current);
                            }


                            if (progress < 1) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                counter.textContent =
                                    isDecimal
                                        ? target.toFixed(1)
                                        : target;
                            }
                        }


                        requestAnimationFrame(
                            updateCounter
                        );


                        observer.unobserve(
                            counter
                        );

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(
        counter =>
            observer.observe(counter)
    );
}


// ==========================================
// SCROLL REVEAL
// ==========================================

function initializeAboutAnimations() {

    const elements =
        document.querySelectorAll(
            ".why-card, .mission-card, .stat-card, .story-image-wrapper"
        );


    elements.forEach(
        element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity .6s ease, transform .6s ease";
        }
    );


    const observer =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting) {
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
                threshold: 0.15
            }
        );


    elements.forEach(
        element =>
            observer.observe(element)
    );
}


// ==========================================
// ABOUT NAVIGATION
// ==========================================

function initializeAboutNavigation() {

    const shopButton =
        document.querySelector(
            ".about-primary-btn"
        );


    if (shopButton) {

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


    const ctaButton =
        document.querySelector(
            ".cta-button"
        );


    if (ctaButton) {

        ctaButton.addEventListener(
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


    // Smooth scrolling

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            this.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );
            }
        );
}