// ==========================================
// BUXMART - MAIN JAVASCRIPT
// Common functionality for all pages
// ==========================================


// ==========================================
// AUTH HELPERS
// ==========================================

function isLoggedIn() {
    const user = localStorage.getItem("buxmartUser");

    return !!user &&
        user !== "null" &&
        user !== "undefined";
}


// ==========================================
// SAFE PAGE CHECK
// ==========================================

function isSafePage(page) {
    return typeof page === "string" &&
        /^[A-Za-z0-9_-]+\.html(?:\?[^#\s]*)?(?:#\S*)?$/.test(page);
}


// ==========================================
// CURRENT PAGE
// ==========================================

function getCurrentPage() {
    return (
        window.location.pathname.split("/").pop() ||
        "index.html"
    ) + window.location.search;
}


// ==========================================
// REDIRECT AFTER LOGIN
// ==========================================

function redirectAfterLogin(defaultPage) {

    const target =
        localStorage.getItem("redirectAfterLogin");

    localStorage.removeItem("redirectAfterLogin");

    window.location.href =
        isSafePage(target)
            ? target
            : (defaultPage || "index.html");
}


// ==========================================
// HANDLE PENDING REDIRECT
// ==========================================

function handlePendingRedirect() {

    if (!isLoggedIn()) {
        return;
    }

    const target =
        localStorage.getItem("redirectAfterLogin");

    if (!target) {
        return;
    }

    localStorage.removeItem("redirectAfterLogin");

    if (!isSafePage(target)) {
        return;
    }

    if (target === getCurrentPage()) {
        return;
    }

    window.location.replace(target);
}


// ==========================================
// GET USER DATA
// ==========================================

function getCurrentUser() {

    const raw =
        localStorage.getItem("buxmartUser");

    if (!raw) {
        return null;
    }

    try {

        const data = JSON.parse(raw);

        if (data && typeof data === "object") {
            return data;
        }

        return {
            name: String(data)
        };

    } catch (error) {

        return {
            name: raw
        };
    }
}


// ==========================================
// USER DISPLAY NAME
// ==========================================

function getUserDisplayName() {

    const user = getCurrentUser();

    if (!user) {
        return "My Account";
    }

    return (
        user.name ||
        user.fullName ||
        user.username ||
        user.email ||
        "My Account"
    );
}


// ==========================================
// USER EMAIL
// ==========================================

function getUserEmail() {

    const user = getCurrentUser();

    if (!user) {
        return "";
    }

    return user.email || "";
}


// ==========================================
// PROFILE AVATAR
// ==========================================

function getUserAvatar() {

    const user = getCurrentUser();

    if (
        user &&
        user.avatar &&
        typeof user.avatar === "string"
    ) {
        return user.avatar;
    }

    return null;
}


// ==========================================
// SAVE USER
// ==========================================

function saveCurrentUser(user) {

    localStorage.setItem(
        "buxmartUser",
        JSON.stringify(user)
    );
}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("buxmartUser");
    localStorage.removeItem("redirectAfterLogin");

    window.location.replace("index.html");
}


// ==========================================
// ACCOUNT MENU STYLES
// ==========================================

function injectAccountMenuStyles() {

    if (
        document.getElementById(
            "buxmartAccountMenuStyles"
        )
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "buxmartAccountMenuStyles";

    style.textContent = `

        .navbar-actions {
            position: relative;
        }

        .profile-avatar {
            width: 39px;
            height: 39px;
            border-radius: 50%;
            object-fit: cover;
            display: block;
            border: 2px solid #2167e8;
            background: #2167e8;
            transition: .3s ease;
        }

        .profile-avatar:hover {
            border-color: #FF6B00;
            transform: translateY(-2px);
        }

        .account-menu {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            width: 270px;
            background: #ffffff;
            color: #212529;
            border: 1px solid rgba(0,0,0,.08);
            border-radius: 15px;
            box-shadow: 0 18px 45px rgba(0,0,0,.18);
            padding: 10px;
            z-index: 3000;
            display: none;
            animation: buxmartProfileDrop .2s ease;
        }

        .account-menu.show {
            display: block;
        }

        @keyframes buxmartProfileDrop {
            from {
                opacity: 0;
                transform: translateY(-8px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .account-profile-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            border-bottom: 1px solid #eeeeee;
            margin-bottom: 6px;
        }

        .account-profile-image {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            object-fit: cover;
            background: #2167e8;
            border: 2px solid #2167e8;
            flex-shrink: 0;
        }

        .account-profile-info {
            min-width: 0;
        }

        .account-profile-name {
            font-size: 14px;
            font-weight: 700;
            color: #172033;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .account-profile-email {
            font-size: 12px;
            color: #7b8495;
            margin-top: 3px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .account-menu-item {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 11px 12px;
            border: 0;
            background: transparent;
            border-radius: 9px;
            font-size: 14px;
            color: #212529;
            text-align: left;
            cursor: pointer;
            text-decoration: none;
            transition: .2s ease;
        }

        .account-menu-item:hover {
            background: #f1f3f5;
        }

        .account-menu-item i {
            font-size: 17px;
            width: 20px;
            text-align: center;
        }

        .account-menu-item.logout {
            color: #dc3545;
            font-weight: 600;
        }

        .account-menu-item.logout:hover {
            background: #fdecee;
        }

        #buxmartAvatarInput {
            display: none;
        }

        @media (max-width: 991px) {

            .account-menu {
                right: 50%;
                transform: translateX(50%);
                width: min(270px, calc(100vw - 30px));
            }
        }

    `;

    document.head.appendChild(style);
}


// ==========================================
// UPDATE NAVBAR AVATAR
// ==========================================

function updateNavbarAvatar() {

    if (!isLoggedIn()) {
        return;
    }

    const avatar =
        getUserAvatar();

    const accountLinks =
        document.querySelectorAll(
            '.navbar-actions a[href="login.html"]'
        );

    accountLinks.forEach(link => {

        if (avatar) {

            link.innerHTML = "";

            const image =
                document.createElement("img");

            image.src = avatar;
            image.alt = "Profile";
            image.className = "profile-avatar";

            link.appendChild(image);

        } else {

            link.innerHTML =
                `<i class="bi bi-person"></i>`;
        }

    });
}


// ==========================================
// PROFILE IMAGE UPLOAD
// ==========================================

function handleAvatarUpload(file) {

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {

        showNotification(
            "Please select a valid image."
        );

        return;
    }

    if (file.size > 2 * 1024 * 1024) {

        showNotification(
            "Profile image must be smaller than 2MB."
        );

        return;
    }

    const reader =
        new FileReader();

    reader.onload = function(event) {

        const avatar =
            event.target.result;

        const user =
            getCurrentUser() || {};

        user.avatar = avatar;

        saveCurrentUser(user);

        updateNavbarAvatar();
        updateAccountMenu();

        showNotification(
            "Profile picture updated!"
        );
    };

    reader.onerror = function() {

        showNotification(
            "Unable to read the selected image."
        );
    };

    reader.readAsDataURL(file);
}


// ==========================================
// UPDATE ACCOUNT MENU
// ==========================================

function updateAccountMenu() {

    const menu =
        document.querySelector(".account-menu");

    if (!menu) {
        return;
    }

    const avatar =
        getUserAvatar();

    const profileImage =
        menu.querySelector(
            ".account-profile-image"
        );

    if (profileImage) {

        if (avatar) {

            profileImage.src =
                avatar;

            profileImage.style.display =
                "block";

        } else {

            profileImage.style.display =
                "none";
        }
    }

    const nameElement =
        menu.querySelector(
            ".account-profile-name"
        );

    if (nameElement) {

        nameElement.textContent =
            getUserDisplayName();
    }

    const emailElement =
        menu.querySelector(
            ".account-profile-email"
        );

    if (emailElement) {

        emailElement.textContent =
            getUserEmail();
    }
}


// ==========================================
// ACCOUNT MENU
// ==========================================

function initializeAccountMenu() {

    if (!isLoggedIn()) {
        return;
    }

    const accountLinks =
        document.querySelectorAll(
            '.navbar-actions a[href="login.html"]'
        );

    if (accountLinks.length === 0) {
        return;
    }

    injectAccountMenuStyles();

    accountLinks.forEach(link => {

        if (
            link.dataset.accountInitialized === "true"
        ) {
            return;
        }

        link.dataset.accountInitialized = "true";

        const container =
            link.closest(".navbar-actions");

        if (!container) {
            return;
        }

        const menu =
            document.createElement("div");

        menu.className =
            "account-menu";


        // PROFILE HEADER

        const profileHeader =
            document.createElement("div");

        profileHeader.className =
            "account-profile-header";


        const profileImage =
            document.createElement("img");

        profileImage.className =
            "account-profile-image";

        profileImage.alt =
            "Profile Picture";

        const avatar =
            getUserAvatar();

        if (avatar) {

            profileImage.src =
                avatar;

        } else {

            profileImage.style.display =
                "none";
        }


        const profileInfo =
            document.createElement("div");

        profileInfo.className =
            "account-profile-info";


        const name =
            document.createElement("p");

        name.className =
            "account-profile-name";

        name.textContent =
            getUserDisplayName();


        const email =
            document.createElement("div");

        email.className =
            "account-profile-email";

        email.textContent =
            getUserEmail();


        profileInfo.appendChild(name);

        if (getUserEmail()) {
            profileInfo.appendChild(email);
        }

        profileHeader.appendChild(profileImage);
        profileHeader.appendChild(profileInfo);

        menu.appendChild(profileHeader);


        // FILE INPUT

        let fileInput =
            document.getElementById(
                "buxmartAvatarInput"
            );

        if (!fileInput) {

            fileInput =
                document.createElement("input");

            fileInput.type = "file";
            fileInput.id = "buxmartAvatarInput";
            fileInput.accept = "image/*";

            document.body.appendChild(fileInput);
        }


        // CHANGE PHOTO

        const changePhotoButton =
            document.createElement("button");

        changePhotoButton.type = "button";

        changePhotoButton.className =
            "account-menu-item";

        changePhotoButton.innerHTML = `
            <i class="bi bi-camera"></i>
            <span>Change Profile Picture</span>
        `;

        changePhotoButton.addEventListener(
            "click",
            function() {

                fileInput.click();
            }
        );

        fileInput.addEventListener(
            "change",
            function() {

                const file =
                    this.files[0];

                handleAvatarUpload(file);

                this.value = "";
            }
        );

        menu.appendChild(changePhotoButton);


        // REMOVE PHOTO

        const removePhotoButton =
            document.createElement("button");

        removePhotoButton.type = "button";

        removePhotoButton.className =
            "account-menu-item";

        removePhotoButton.innerHTML = `
            <i class="bi bi-person"></i>
            <span>Remove Profile Picture</span>
        `;

        if (!avatar) {
            removePhotoButton.style.display = "none";
        }

        removePhotoButton.addEventListener(
            "click",
            function() {

                const user =
                    getCurrentUser();

                if (!user) {
                    return;
                }

                delete user.avatar;

                saveCurrentUser(user);

                updateNavbarAvatar();
                updateAccountMenu();

                removePhotoButton.style.display =
                    "none";

                showNotification(
                    "Profile picture removed."
                );
            }
        );

        menu.appendChild(removePhotoButton);


        // LOGOUT

        const logoutButton =
            document.createElement("button");

        logoutButton.type = "button";

        logoutButton.className =
            "account-menu-item logout";

        logoutButton.innerHTML = `
            <i class="bi bi-box-arrow-right"></i>
            <span>Logout</span>
        `;

        logoutButton.addEventListener(
            "click",
            logout
        );

        menu.appendChild(logoutButton);


        container.appendChild(menu);


        // ACCOUNT CLICK

        link.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();

                menu.classList.toggle("show");
            }
        );


        // OUTSIDE CLICK

        document.addEventListener(
            "click",
            function(event) {

                if (
                    !menu.contains(event.target) &&
                    !link.contains(event.target)
                ) {

                    menu.classList.remove("show");
                }
            }
        );


        // ESCAPE

        document.addEventListener(
            "keydown",
            function(event) {

                if (event.key === "Escape") {

                    menu.classList.remove("show");
                }
            }
        );

    });

    updateNavbarAvatar();
}


// ==========================================
// SEARCH
// ==========================================

function initializeSearch() {

    const searchInput =
        document.getElementById("homeSearch");

    const searchButton =
        document.getElementById("searchBtn");

    if (!searchInput || !searchButton) {
        return;
    }

    function performSearch() {

        const query =
            searchInput.value.trim();

        if (query === "") {
            return;
        }

        const destination =
            `products.html?search=${encodeURIComponent(query)}`;

        openProtectedPage(destination);
    }

    searchButton.addEventListener(
        "click",
        performSearch
    );

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();
            }
        }
    );
}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cartCountElement =
        document.getElementById("cartCount");

    if (!cartCountElement) {
        return;
    }

    let cart =
        JSON.parse(
            localStorage.getItem("buxmartCart")
        ) || [];

    let totalItems = 0;

    cart.forEach(item => {

        totalItems +=
            Number(item.quantity) || 0;
    });

    cartCountElement.textContent =
        totalItems;
}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(product) {

    if (!product) {
        return;
    }

    let cart =
        JSON.parse(
            localStorage.getItem("buxmartCart")
        ) || [];


    const existingProduct =
        cart.find(
            item =>
                String(item.id) ===
                String(product.id)
        );


    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity || 0) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            image: product.image,

            category: product.category || "",

            quantity: 1
        });
    }


    localStorage.setItem(
        "buxmartCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    showNotification(
        `${product.name} added to cart!`
    );
}


// ==========================================
// REMOVE PRODUCT FROM CART
// ==========================================

function removeFromCart(productId) {

    let cart =
        JSON.parse(
            localStorage.getItem("buxmartCart")
        ) || [];


    cart =
        cart.filter(
            item =>
                Number(item.id) !==
                Number(productId)
        );


    localStorage.setItem(
        "buxmartCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


// ==========================================
// WISHLIST STORAGE
// ==========================================

function getWishlist() {

    try {

        const wishlist =
            JSON.parse(
                localStorage.getItem(
                    "buxmartWishlist"
                )
            );

        return Array.isArray(wishlist)
            ? wishlist
            : [];

    } catch (error) {

        return [];
    }
}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "buxmartWishlist",
        JSON.stringify(wishlist)
    );
}


// ==========================================
// WISHLIST COUNT
// ==========================================

function updateWishlistCount() {

    const countElements =
        document.querySelectorAll(
            ".wishlist-count"
        );

    const wishlist =
        getWishlist();

    countElements.forEach(element => {

        element.textContent =
            wishlist.length;

        element.style.display =
            wishlist.length > 0
                ? "flex"
                : "none";
    });
}


// ==========================================
// CHECK WISHLIST
// ==========================================

function isInWishlist(productId) {

    return getWishlist().some(
        product =>
            String(product.id) ===
            String(productId)
    );
}


// ==========================================
// ADD TO WISHLIST
// ==========================================

function addToWishlist(product) {

    if (!product) {
        return;
    }

    const wishlist =
        getWishlist();

    const exists =
        wishlist.some(
            item =>
                String(item.id) ===
                String(product.id)
        );

    if (!exists) {

        wishlist.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            oldPrice: product.oldPrice || null,

            image: product.image,

            category: product.category || "",

            rating: product.rating || 0,

            reviews: product.reviews || 0,

            badge: product.badge || ""
        });

        saveWishlist(wishlist);

        updateWishlistCount();

        showNotification(
            `${product.name} added to wishlist!`
        );

    } else {

        showNotification(
            `${product.name} is already in wishlist.`
        );
    }
}


// ==========================================
// REMOVE FROM WISHLIST
// ==========================================

function removeFromWishlist(productId) {

    let wishlist =
        getWishlist();

    wishlist =
        wishlist.filter(
            product =>
                String(product.id) !==
                String(productId)
        );

    saveWishlist(wishlist);

    updateWishlistCount();
}


// ==========================================
// TOGGLE WISHLIST
// ==========================================

function toggleWishlist(product) {

    if (!product) {
        return;
    }

    if (isInWishlist(product.id)) {

        removeFromWishlist(product.id);

        showNotification(
            `${product.name} removed from wishlist.`
        );

        return false;

    } else {

        addToWishlist(product);

        return true;
    }
}


// ==========================================
// WISHLIST BUTTON HANDLER
// ==========================================

function initializeWishlist() {

    const buttons =
        document.querySelectorAll(
            ".wishlist-btn"
        );

    buttons.forEach(button => {

        if (
            button.dataset.wishlistInitialized ===
            "true"
        ) {
            return;
        }

        button.dataset.wishlistInitialized =
            "true";


        const productId =
            button.dataset.productId ||
            button.dataset.id;


        if (
            productId &&
            isInWishlist(productId)
        ) {

            button.classList.add("active");

            const icon =
                button.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "bi-heart"
                );

                icon.classList.add(
                    "bi-heart-fill"
                );
            }
        }


        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();

                const id =
                    button.dataset.productId ||
                    button.dataset.id;

                if (!id) {
                    return;
                }

                const products =
                    window.demoProducts || [];

                const product =
                    products.find(
                        item =>
                            String(item.id) ===
                            String(id)
                    );

                if (!product) {
                    return;
                }

                const active =
                    toggleWishlist(product);

                const icon =
                    button.querySelector("i");

                if (!icon) {
                    return;
                }

                if (active) {

                    button.classList.add("active");

                    icon.classList.remove(
                        "bi-heart"
                    );

                    icon.classList.add(
                        "bi-heart-fill"
                    );

                } else {

                    button.classList.remove("active");

                    icon.classList.remove(
                        "bi-heart-fill"
                    );

                    icon.classList.add(
                        "bi-heart"
                    );
                }
            }
        );
    });

    updateWishlistCount();
}


// ==========================================
// NEWSLETTER
// ==========================================

function initializeNewsletter() {

    const newsletterForm =
        document.querySelector(
            ".newsletter-form"
        );

    if (!newsletterForm) {
        return;
    }

    newsletterForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const emailInput =
                newsletterForm.querySelector(
                    "input[type='email']"
                );

            if (!emailInput) {
                return;
            }

            const email =
                emailInput.value.trim();

            if (email === "") {
                return;
            }

            showNotification(
                "Thank you for subscribing to BuxMart!"
            );

            newsletterForm.reset();
        }
    );
}


// ==========================================
// NOTIFICATION
// ==========================================

function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.className =
        "buxmart-notification";

    notification.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(
        notification
    );

    setTimeout(
        () => {

            notification.classList.add(
                "show"
            );

        },
        10
    );

    setTimeout(
        () => {

            notification.classList.remove(
                "show"
            );

            setTimeout(
                () => {

                    notification.remove();

                },
                300
            );

        },
        2500
    );
}


// ==========================================
// CATEGORY LINKS
// ==========================================

document.addEventListener(
    "click",
    function(event) {

        const categoryLink =
            event.target.closest(
                "[data-category]"
            );

        if (!categoryLink) {
            return;
        }

        const category =
            categoryLink.dataset.category;

        if (category) {

            event.preventDefault();

            openProtectedPage(
                `products.html?category=${encodeURIComponent(category)}`
            );
        }
    }
);


// ==========================================
// GLOBAL ADD TO CART
// ONLY CART HANDLER IN BUXMART
// ==========================================

document.addEventListener(
    "click",
    function(event) {

        const addButton =
            event.target.closest(
                ".add-cart-btn"
            );

        if (!addButton) {
            return;
        }


        event.preventDefault();
        event.stopPropagation();


        const productId =
            addButton.dataset.id ||
            addButton.dataset.productId;


        if (!productId) {
            return;
        }


        const products =
            window.demoProducts || [];


        const product =
            products.find(
                item =>
                    String(item.id) ===
                    String(productId)
            );


        if (!product) {

            console.error(
                "Product not found:",
                productId
            );

            return;
        }


        addToCart(product);


        // BUTTON FEEDBACK

        const originalHTML =
            addButton.innerHTML;

        addButton.innerHTML =
            `<i class="bi bi-check-lg"></i> Added`;

        addButton.classList.add("added");


        setTimeout(
            () => {

                addButton.innerHTML =
                    originalHTML;

                addButton.classList.remove(
                    "added"
                );

            },
            1500
        );
    }
);


// ==========================================
// PROTECTED PAGE
// ==========================================

function openProtectedPage(page) {

    if (isLoggedIn()) {

        window.location.href =
            page;

        return;
    }


    if (isSafePage(page)) {

        localStorage.setItem(
            "redirectAfterLogin",
            page
        );
    }


    window.location.href =
        "login.html";
}


// ==========================================
// PROTECTED NAVIGATION
// ==========================================

function initializeProtectedNavigation() {

    const shopNavLink =
        document.getElementById(
            "shopLink"
        );


    if (shopNavLink) {

        shopNavLink.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                openProtectedPage(
                    "products.html"
                );
            }
        );
    }


    const viewAllButtons =
        document.querySelectorAll(
            ".view-all"
        );


    viewAllButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    const destination =
                        this.getAttribute(
                            "href"
                        ) ||
                        "products.html";

                    openProtectedPage(
                        destination
                    );
                }
            );
        }
    );


    const heroLinks =
        document.querySelectorAll(
            ".hero-buttons a"
        );


    heroLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                function(event) {

                    const href =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        !href.includes(
                            "products.html"
                        )
                    ) {
                        return;
                    }


                    event.preventDefault();

                    openProtectedPage(
                        href
                    );
                }
            );
        }
    );


    document.addEventListener(
        "click",
        function(event) {

            const link =
                event.target.closest(
                    'a[href*="products.html"]'
                );


            if (!link) {
                return;
            }


            if (
                link.id === "shopLink" ||
                link.classList.contains("view-all") ||
                link.closest(".hero-buttons") ||
                link.hasAttribute("data-category")
            ) {
                return;
            }


            const destination =
                link.getAttribute("href");


            if (!destination) {
                return;
            }


            event.preventDefault();

            openProtectedPage(
                destination
            );
        }
    );
}


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        handlePendingRedirect();

        initializeSearch();

        updateCartCount();

        updateWishlistCount();

        initializeNewsletter();

        initializeWishlist();

        initializeProtectedNavigation();

        initializeAccountMenu();
    }
);


// ==========================================
// BACK/FORWARD CACHE
// ==========================================

window.addEventListener(
    "pageshow",
    function(event) {

        if (!event.persisted) {
            return;
        }


        const page =
            window.location.pathname
                .split("/")
                .pop();


        if (
            page === "products.html" &&
            !isLoggedIn()
        ) {

            window.location.reload();
        }
    }
);


// ==========================================
// GLOBAL FUNCTIONS
// ==========================================

window.addToCart =
    addToCart;

window.removeFromCart =
    removeFromCart;

window.updateCartCount =
    updateCartCount;

window.showNotification =
    showNotification;

window.openProtectedPage =
    openProtectedPage;

window.isLoggedIn =
    isLoggedIn;

window.redirectAfterLogin =
    redirectAfterLogin;

window.logout =
    logout;

window.getCurrentUser =
    getCurrentUser;

window.getUserAvatar =
    getUserAvatar;

window.getWishlist =
    getWishlist;

window.saveWishlist =
    saveWishlist;

window.updateWishlistCount =
    updateWishlistCount;

window.isInWishlist =
    isInWishlist;

window.addToWishlist =
    addToWishlist;

window.removeFromWishlist =
    removeFromWishlist;

window.toggleWishlist =
    toggleWishlist;