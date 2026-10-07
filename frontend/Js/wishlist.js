/* =========================================
   BUXMART WISHLIST SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeWishlist();

});


/* =========================================
   GET WISHLIST
========================================= */

function getWishlist() {

    try {

        const wishlist = JSON.parse(
            localStorage.getItem("buxmartWishlist")
        );

        return Array.isArray(wishlist)
            ? wishlist
            : [];

    } catch (error) {

        console.error(
            "Unable to load wishlist:",
            error
        );

        return [];

    }

}


/* =========================================
   SAVE WISHLIST
========================================= */

function saveWishlist(wishlist) {

    localStorage.setItem(
        "buxmartWishlist",
        JSON.stringify(wishlist)
    );

}


/* =========================================
   INITIALIZE
========================================= */

function initializeWishlist() {

    renderWishlist();

    updateWishlistCount();

    initializeWishlistEvents();

}


/* =========================================
   RENDER WISHLIST
========================================= */

function renderWishlist() {

    const wishlist =
        getWishlist();

    const emptyWishlist =
        document.getElementById("emptyWishlist");

    const wishlistContent =
        document.getElementById("wishlistContent");

    const wishlistProducts =
        document.getElementById("wishlistProducts");


    if (!wishlistProducts) return;


    /* EMPTY */

    if (wishlist.length === 0) {

        if (emptyWishlist) {
            emptyWishlist.style.display = "block";
        }

        if (wishlistContent) {
            wishlistContent.style.display = "none";
        }

        return;

    }


    /* HAS PRODUCTS */

    if (emptyWishlist) {
        emptyWishlist.style.display = "none";
    }

    if (wishlistContent) {
        wishlistContent.style.display = "block";
    }


    wishlistProducts.innerHTML =
        wishlist.map(function (product, index) {

            const name =
                product.name || "Product";

            const image =
                product.image ||
                "images/placeholder.jpg";

            const price =
                Number(product.price) || 0;

            const category =
                product.category ||
                "Product";


            return `

                <div class="col-xl-3 col-lg-4 col-md-6">

                    <div
                        class="wishlist-card"
                        data-index="${index}"
                    >

                        <div class="wishlist-image">

                            <img
                                src="${image}"
                                alt="${name}"
                                onerror="this.src='images/placeholder.jpg'"
                            >


                            <button
                                type="button"
                                class="remove-wishlist"
                                data-index="${index}"
                                title="Remove from wishlist"
                            >
                                <i class="bi bi-heart-fill"></i>
                            </button>

                        </div>


                        <div class="wishlist-card-body">

                            <div class="wishlist-category">
                                ${category}
                            </div>

                            <h4 class="wishlist-name">
                                ${name}
                            </h4>

                            <div class="wishlist-price">
                                $${price.toFixed(2)}
                            </div>


                            <div class="wishlist-actions">

                                <button
                                    type="button"
                                    class="view-product-btn"
                                    data-id="${product.id}"
                                >
                                    View
                                </button>

                                <button
                                    type="button"
                                    class="add-cart-btn"
                                    data-id="${product.id}"
                                >
                                    <i class="bi bi-cart-plus"></i>
                                    Add Cart
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            `;

        }).join("");


    updateWishlistItemsCount();

}


/* =========================================
   ITEM COUNT
========================================= */

function updateWishlistItemsCount() {

    const count =
        getWishlist().length;

    const element =
        document.getElementById(
            "wishlistItemsCount"
        );

    if (!element) return;


    element.textContent =
        count === 1
            ? "1 item"
            : `${count} items`;

}


/* =========================================
   WISHLIST COUNT
========================================= */

function updateWishlistCount() {

    const countElement =
        document.getElementById(
            "wishlistCount"
        );

    if (!countElement) return;


    const count =
        getWishlist().length;


    countElement.textContent =
        count > 99
            ? "99+"
            : count;

}


/* =========================================
   EVENTS
========================================= */

function initializeWishlistEvents() {

    const wishlistProducts =
        document.getElementById(
            "wishlistProducts"
        );


    /* PRODUCT ACTIONS */

    if (wishlistProducts) {

        wishlistProducts.addEventListener(
            "click",
            function (event) {

                const removeButton =
                    event.target.closest(
                        ".remove-wishlist"
                    );

                const viewButton =
                    event.target.closest(
                        ".view-product-btn"
                    );

                const addCartButton =
                    event.target.closest(
                        ".add-cart-btn"
                    );


                /* REMOVE */

                if (removeButton) {

                    const index =
                        Number(
                            removeButton.dataset.index
                        );

                    removeFromWishlist(index);

                    return;
                }


                /* VIEW */

                if (viewButton) {

                    const productId =
                        Number(
                            viewButton.dataset.id
                        );

                    openWishlistProduct(
                        productId
                    );

                    return;
                }


                /* ADD TO CART */

                if (addCartButton) {

                    const productId =
                        Number(
                            addCartButton.dataset.id
                        );

                    addWishlistProductToCart(
                        productId
                    );

                }

            }
        );

    }


    /* CLEAR */

    const clearButton =
        document.getElementById(
            "clearWishlistBtn"
        );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            function () {

                const wishlist =
                    getWishlist();

                if (wishlist.length === 0) {
                    return;
                }


                const confirmed =
                    confirm(
                        "Are you sure you want to clear your wishlist?"
                    );


                if (!confirmed) {
                    return;
                }


                localStorage.removeItem(
                    "buxmartWishlist"
                );


                renderWishlist();
                updateWishlistCount();

                showWishlistMessage(
                    "Wishlist cleared."
                );

            }
        );

    }

}


/* =========================================
   REMOVE
========================================= */

function removeFromWishlist(index) {

    const wishlist =
        getWishlist();


    if (!wishlist[index]) {
        return;
    }


    const productName =
        wishlist[index].name ||
        "Product";


    wishlist.splice(index, 1);

    saveWishlist(wishlist);

    renderWishlist();

    updateWishlistCount();


    showWishlistMessage(
        `${productName} removed from wishlist.`
    );

}


/* =========================================
   OPEN PRODUCT
========================================= */

function openWishlistProduct(productId) {

    if (!productId) {
        return;
    }


    const loggedIn =
        localStorage.getItem(
            "buxmartUser"
        );


    if (!loggedIn) {

        localStorage.setItem(
            "redirectAfterLogin",
            `product-details.html?id=${productId}`
        );


        window.location.href =
            "login.html";

        return;

    }


    window.location.href =
        `product-details.html?id=${productId}`;

}


/* =========================================
   ADD TO CART
========================================= */

function addWishlistProductToCart(productId) {

    const wishlist =
        getWishlist();


    const product =
        wishlist.find(function (item) {

            return Number(item.id) ===
                Number(productId);

        });


    if (!product) {
        return;
    }


    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "buxmartCart"
                )
            ) || [];

    } catch (error) {

        cart = [];

    }


    const existing =
        cart.find(function (item) {

            return Number(item.id) ===
                Number(product.id);

        });


    if (existing) {

        existing.quantity =
            (Number(existing.quantity) || 1) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            category: product.category,

            quantity: 1

        });

    }


    localStorage.setItem(
        "buxmartCart",
        JSON.stringify(cart)
    );


    updateNavbarCartCount();


    showWishlistMessage(
        `${product.name} added to cart.`
    );

}


/* =========================================
   NAVBAR CART COUNT
========================================= */

function updateNavbarCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartCount) {
        return;
    }


    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "buxmartCart"
                )
            ) || [];

    } catch (error) {

        cart = [];

    }


    const total =
        cart.reduce(function (sum, item) {

            return sum +
                (Number(item.quantity) || 1);

        }, 0);


    cartCount.textContent =
        total > 99
            ? "99+"
            : total;

}


/* =========================================
   NOTIFICATION
========================================= */

function showWishlistMessage(message) {

    let notification =
        document.getElementById(
            "wishlistNotification"
        );


    if (!notification) {

        notification =
            document.createElement("div");

        notification.id =
            "wishlistNotification";


        notification.style.position =
            "fixed";

        notification.style.top =
            "100px";

        notification.style.right =
            "25px";

        notification.style.zIndex =
            "9999";

        notification.style.background =
            "#101a2f";

        notification.style.color =
            "white";

        notification.style.padding =
            "13px 18px";

        notification.style.borderRadius =
            "10px";

        notification.style.fontSize =
            "13px";

        notification.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.15)";

        notification.style.transition =
            ".3s ease";


        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;

    notification.style.opacity =
        "1";


    clearTimeout(
        window.wishlistNotificationTimer
    );


    window.wishlistNotificationTimer =
        setTimeout(function () {

            notification.style.opacity =
                "0";

        }, 2500);

}


/* =========================================
   GLOBAL EXPORTS
========================================= */

window.getBuxMartWishlist =
    getWishlist;

window.renderBuxMartWishlist =
    renderWishlist;

window.updateBuxMartWishlistCount =
    updateWishlistCount;