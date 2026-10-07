/* =========================================
   BUXMART CART SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeCartPage();

});


/* =========================================
   GET CART
========================================= */

function getCart() {

    try {

        const cart = JSON.parse(
            localStorage.getItem("buxmartCart")
        );

        return Array.isArray(cart) ? cart : [];

    } catch (error) {

        console.error("Unable to load cart:", error);

        return [];

    }

}


/* =========================================
   SAVE CART
========================================= */

function saveCart(cart) {

    localStorage.setItem(
        "buxmartCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   INITIALIZE
========================================= */

function initializeCartPage() {

    renderCart();
    initializeCartEvents();
    updateNavbarCartCount();

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const cart = getCart();

    const emptyCart = document.getElementById("emptyCart");
    const cartContent = document.getElementById("cartContent");
    const cartItems = document.getElementById("cartItems");

    if (!cartItems) return;


    /* EMPTY CART */

    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        if (cartContent) {
            cartContent.style.display = "none";
        }

        updateSummary([]);

        return;
    }


    /* CART HAS ITEMS */

    if (emptyCart) {
        emptyCart.style.display = "none";
    }

    if (cartContent) {
        cartContent.style.display = "grid";
    }


    cartItems.innerHTML = cart.map(function (item, index) {

        const productName =
            item.name || "Product";

        const productImage =
            item.image || "images/placeholder.jpg";

        const productPrice =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const category =
            item.category || "Product";


        return `
            <div class="cart-item" data-index="${index}">

                <div class="cart-item-image">
                    <img
                        src="${productImage}"
                        alt="${productName}"
                        onerror="this.src='images/placeholder.jpg'"
                    >
                </div>


                <div class="cart-item-info">

                    <div class="cart-item-category">
                        ${category}
                    </div>

                    <h4 class="cart-item-name">
                        ${productName}
                    </h4>

                    <div class="cart-item-price">
                        $${productPrice.toFixed(2)} each
                    </div>

                </div>


                <div class="cart-item-actions">

                    <div class="quantity-control">

                        <button
                            type="button"
                            class="quantity-btn decrease-btn"
                            data-index="${index}"
                            aria-label="Decrease quantity"
                        >
                            <i class="bi bi-dash"></i>
                        </button>

                        <span class="quantity-value">
                            ${quantity}
                        </span>

                        <button
                            type="button"
                            class="quantity-btn increase-btn"
                            data-index="${index}"
                            aria-label="Increase quantity"
                        >
                            <i class="bi bi-plus"></i>
                        </button>

                    </div>


                    <div class="cart-item-total">

                        <strong>
                            $${(productPrice * quantity).toFixed(2)}
                        </strong>

                        <button
                            type="button"
                            class="remove-item"
                            data-index="${index}"
                            aria-label="Remove item"
                            title="Remove item"
                        >
                            <i class="bi bi-trash3"></i>
                        </button>

                    </div>

                </div>

            </div>
        `;

    }).join("");


    updateSummary(cart);
    updateItemsCount(cart);

}


/* =========================================
   ITEMS COUNT
========================================= */

function updateItemsCount(cart) {

    const itemsCount =
        document.getElementById("itemsCount");

    if (!itemsCount) return;

    const totalItems = cart.reduce(function (total, item) {

        return total + (Number(item.quantity) || 1);

    }, 0);


    itemsCount.textContent =
        totalItems === 1
            ? "1 item"
            : `${totalItems} items`;

}


/* =========================================
   UPDATE SUMMARY
========================================= */

function updateSummary(cart) {

    let subtotal = 0;

    cart.forEach(function (item) {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        subtotal += price * quantity;

    });


    /*
        Free shipping for orders $100+
        Otherwise $10
    */

    const shipping =
        subtotal === 0
            ? 0
            : subtotal >= 100
                ? 0
                : 10;


    const discount = 0;

    const total =
        subtotal + shipping - discount;


    const subtotalElement =
        document.getElementById("subtotal");

    const shippingElement =
        document.getElementById("shipping");

    const discountElement =
        document.getElementById("discount");

    const totalElement =
        document.getElementById("cartTotal");


    if (subtotalElement) {
        subtotalElement.textContent =
            `$${subtotal.toFixed(2)}`;
    }

    if (shippingElement) {

        shippingElement.textContent =
            shipping === 0
                ? "FREE"
                : `$${shipping.toFixed(2)}`;

    }

    if (discountElement) {

        discountElement.textContent =
            `-$${discount.toFixed(2)}`;

    }

    if (totalElement) {

        totalElement.textContent =
            `$${total.toFixed(2)}`;

    }

}


/* =========================================
   CART EVENTS
========================================= */

function initializeCartEvents() {

    const cartItems =
        document.getElementById("cartItems");

    const clearCartBtn =
        document.getElementById("clearCartBtn");

    const checkoutBtn =
        document.getElementById("checkoutBtn");


    /* ITEM ACTIONS */

    if (cartItems) {

        cartItems.addEventListener("click", function (event) {

            const decreaseButton =
                event.target.closest(".decrease-btn");

            const increaseButton =
                event.target.closest(".increase-btn");

            const removeButton =
                event.target.closest(".remove-item");


            if (decreaseButton) {

                const index =
                    Number(decreaseButton.dataset.index);

                changeQuantity(index, -1);

            }


            if (increaseButton) {

                const index =
                    Number(increaseButton.dataset.index);

                changeQuantity(index, 1);

            }


            if (removeButton) {

                const index =
                    Number(removeButton.dataset.index);

                removeCartItem(index);

            }

        });

    }


    /* CLEAR CART */

    if (clearCartBtn) {

        clearCartBtn.addEventListener("click", function () {

            const cart = getCart();

            if (cart.length === 0) return;


            const confirmClear =
                confirm("Are you sure you want to clear your cart?");


            if (!confirmClear) return;


            localStorage.removeItem("buxmartCart");

            renderCart();
            updateNavbarCartCount();

            showCartMessage(
                "Your cart has been cleared."
            );

        });

    }


    /* CHECKOUT */

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", function () {

            const cart = getCart();

            if (cart.length === 0) {

                showCartMessage(
                    "Your cart is empty."
                );

                return;
            }


            /*
                Checkout page will be connected later.
            */

            showCartMessage(
                "Checkout will be available soon."
            );

        });

    }

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(index, change) {

    const cart = getCart();

    if (!cart[index]) return;


    let quantity =
        Number(cart[index].quantity) || 1;


    quantity += change;


    if (quantity <= 0) {

        removeCartItem(index);

        return;

    }


    cart[index].quantity = quantity;

    saveCart(cart);

    renderCart();
    updateNavbarCartCount();

}


/* =========================================
   REMOVE ITEM
========================================= */

function removeCartItem(index) {

    const cart = getCart();

    if (!cart[index]) return;


    const removedProduct =
        cart[index].name || "Product";


    cart.splice(index, 1);

    saveCart(cart);

    renderCart();
    updateNavbarCartCount();

    showCartMessage(
        `${removedProduct} removed from cart.`
    );

}


/* =========================================
   NAVBAR CART COUNT
========================================= */

function updateNavbarCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;


    const cart = getCart();


    const totalItems = cart.reduce(function (total, item) {

        return total + (Number(item.quantity) || 1);

    }, 0);


    cartCount.textContent =
        totalItems > 99
            ? "99+"
            : totalItems;

}


/* =========================================
   CART NOTIFICATION
========================================= */

function showCartMessage(message) {

    let notification =
        document.getElementById("cartNotification");


    if (!notification) {

        notification =
            document.createElement("div");

        notification.id =
            "cartNotification";


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
            "#ffffff";

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
        window.cartNotificationTimer
    );


    window.cartNotificationTimer =
        setTimeout(function () {

            notification.style.opacity =
                "0";

        }, 2500);

}


/* =========================================
   GLOBAL EXPORTS
========================================= */

window.getBuxMartCart = getCart;
window.renderBuxMartCart = renderCart;
window.updateBuxMartCartCount = updateNavbarCartCount;