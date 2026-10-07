// ==========================================
// BUXMART - HOME PAGE JAVASCRIPT
// Demo Products - No Backend Required
// ==========================================


// ==========================================
// DEMO PRODUCTS
// ==========================================

const demoProducts = [

    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "electronics",
        price: 89.99,
        oldPrice: 119.99,
        rating: 4.8,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
        badge: "SALE",
        featured: true,
        newArrival: false
    },

    {
        id: 2,
        name: "Smart Watch Series 8",
        category: "electronics",
        price: 129.99,
        oldPrice: 159.99,
        rating: 4.7,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
        badge: "POPULAR",
        featured: true,
        newArrival: true
    },

    {
        id: 3,
        name: "Minimal Leather Backpack",
        category: "fashion",
        price: 64.99,
        oldPrice: 84.99,
        rating: 4.6,
        reviews: 76,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
        badge: "SALE",
        featured: true,
        newArrival: false
    },

    {
        id: 4,
        name: "Classic Running Sneakers",
        category: "sports",
        price: 74.99,
        oldPrice: 99.99,
        rating: 4.9,
        reviews: 213,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        badge: "BEST SELLER",
        featured: true,
        newArrival: true
    },

    {
        id: 5,
        name: "Modern Ceramic Coffee Set",
        category: "home",
        price: 39.99,
        oldPrice: 49.99,
        rating: 4.5,
        reviews: 64,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80",
        badge: "NEW",
        featured: false,
        newArrival: true
    },

    {
        id: 6,
        name: "Premium Cotton Hoodie",
        category: "fashion",
        price: 54.99,
        oldPrice: 69.99,
        rating: 4.7,
        reviews: 87,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",
        badge: "NEW",
        featured: false,
        newArrival: true
    },

    {
        id: 7,
        name: "Wireless Portable Speaker",
        category: "electronics",
        price: 59.99,
        oldPrice: 79.99,
        rating: 4.6,
        reviews: 142,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80",
        badge: "HOT",
        featured: true,
        newArrival: true
    },

    {
        id: 8,
        name: "Premium Skincare Essentials",
        category: "beauty",
        price: 44.99,
        oldPrice: 59.99,
        rating: 4.8,
        reviews: 91,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=80",
        badge: "NEW",
        featured: false,
        newArrival: true
    },

    {
        id: 9,
        name: "Gaming Keyboard",
        category: "electronics",
        price: 49.99,
        oldPrice: 69.99,
        rating: 4.5,
        reviews: 85,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
        badge: "SALE",
        featured: false,
        newArrival: false
    },

    {
        id: 10,
        name: "Men's Casual Jacket",
        category: "fashion",
        price: 79.99,
        oldPrice: 99.99,
        rating: 4.6,
        reviews: 65,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
        badge: "NEW",
        featured: false,
        newArrival: false
    },

    {
        id: 11,
        name: "Modern Table Lamp",
        category: "home",
        price: 34.99,
        oldPrice: 44.99,
        rating: 4.3,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
        badge: "",
        featured: false,
        newArrival: false
    },

    {
        id: 12,
        name: "Sports Water Bottle",
        category: "sports",
        price: 19.99,
        oldPrice: 24.99,
        rating: 4.4,
        reviews: 32,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
        badge: "",
        featured: false,
        newArrival: false
    },

    {
        id: 13,
        name: "Wireless Noise Cancelling Airpods",
        category: "Electronics",
        price: 79.99,
        oldPrice: 99.99,
        rating: 4.8,
        reviews: 186,
        image: "https://media.istockphoto.com/id/2237358070/photo/white-modern-wireless-headphones-isolated-on-white-background-copy-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=Regrq4oW7v4aS9Z6n1ueY-vHtqHQndzUbqr6nMkyQGc=",
        badge: "Popular",
        featured: false,
        newArrival: false
    },

    {
        id: 14,
        name: "Classic Leather Wallet",
        category: "Accessories",
        price: 24.99,
        oldPrice: 34.99,
        rating: 4.6,
        reviews: 142,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
        badge: "Sale",
        featured: false,
        newArrival: false
    },

    {
        id: 15,
        name: "Modern Running Sneakers",
        category: "Beauty",
        price: 64.99,
        oldPrice: 84.99,
        rating: 4.7,
        reviews: 203,
        image: "https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29zbWV0aWNzfGVufDB8fDB8fHww",
        badge: "Trending",
        featured: false,
        newArrival: false
    },

    {
        id: 16,
        name: "Minimal Ceramic Coffee Mug",
        category: "Home",
        price: 14.99,
        oldPrice: 19.99,
        rating: 4.5,
        reviews: 74,
        image: "https://images.unsplash.com/photo-1660721671073-e139688fa3cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNlcmFtaWN8ZW58MHx8MHx8fDA%3D",
        badge: "New",
        featured: false,
        newArrival: false
    },

    {
        id: 17,
        name: "Smart Fitness Watch",
        category: "Electronics",
        price: 89.99,
        oldPrice: 119.99,
        rating: 4.7,
        reviews: 251,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        badge: "Deal",
        featured: false,
        newArrival: false
    },

    {
        id: 18,
        name: "Premium Camera Backpack",
        category: "Home",
        price: 74.99,
        oldPrice: 94.99,
        rating: 4.6,
        reviews: 119,
        image: "https://images.unsplash.com/photo-1678819483347-3faeb1e426c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEhvbWUlMjB0aGluZ3N8ZW58MHx8MHx8fDA%3D",
        badge: "Sale",
        featured: false,
        newArrival: false
    }

];


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadFeaturedProducts();

        loadNewArrivals();

    }
);


// ==========================================
// LOAD FEATURED
// ==========================================

function loadFeaturedProducts() {

    const container =
        document.getElementById(
            "featuredProducts"
        );

    if (!container) {
        return;
    }

    const featuredProducts =
        demoProducts.filter(
            product =>
                product.featured
        );

    container.innerHTML =
        featuredProducts
            .slice(0, 4)
            .map(
                product =>
                    createProductCard(product)
            )
            .join("");

    initializeProductButtons();
}


// ==========================================
// LOAD NEW ARRIVALS
// ==========================================

function loadNewArrivals() {

    const container =
        document.getElementById(
            "newArrivals"
        );

    if (!container) {
        return;
    }

    const newProducts =
        demoProducts.filter(
            product =>
                product.newArrival
        );

    container.innerHTML =
        newProducts
            .slice(0, 4)
            .map(
                product =>
                    createProductCard(product)
            )
            .join("");

    initializeProductButtons();
}


// ==========================================
// CREATE PRODUCT CARD
// ==========================================

function createProductCard(product) {

    const discount =
        product.oldPrice
            ? Math.round(
                (
                    (product.oldPrice - product.price) /
                    product.oldPrice
                ) * 100
            )
            : 0;


    const wishlistActive =
        typeof isInWishlist === "function"
            ? isInWishlist(product.id)
            : false;


    return `

        <div class="col-12 col-sm-6 col-lg-3">

            <div
                class="product-card"
                data-product-id="${product.id}"
                role="button"
                tabindex="0"
            >

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                    ${
                        product.badge
                            ? `
                                <span class="product-badge">
                                    ${product.badge}
                                </span>
                              `
                            : ""
                    }

                    ${
                        discount > 0
                            ? `
                                <span class="discount-badge">
                                    -${discount}%
                                </span>
                              `
                            : ""
                    }


                    <button
                        class="wishlist-btn ${
                            wishlistActive
                                ? "active"
                                : ""
                        }"
                        type="button"
                        data-product-id="${product.id}"
                        aria-label="Add ${product.name} to wishlist"
                        title="Wishlist"
                    >

                        <i class="bi ${
                            wishlistActive
                                ? "bi-heart-fill"
                                : "bi-heart"
                        }"></i>

                    </button>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${formatCategory(product.category)}
                    </span>


                    <h5 class="product-title">
                        ${product.name}
                    </h5>


                    <div class="product-rating">

                        ${generateStars(product.rating)}

                        <span>
                            (${product.reviews})
                        </span>

                    </div>


                    <div class="product-price">

                        <strong>
                            $${product.price.toFixed(2)}
                        </strong>

                        ${
                            product.oldPrice
                                ? `
                                    <del>
                                        $${product.oldPrice.toFixed(2)}
                                    </del>
                                  `
                                : ""
                        }

                    </div>


                    <div class="product-actions">

                        <!--
                            IMPORTANT:
                            data-id is used by main.js
                            for the ONLY cart handler.
                        -->

                        <button
                            class="add-cart-btn"
                            type="button"
                            data-id="${product.id}"
                        >

                            <i class="bi bi-cart-plus"></i>

                            Add to Cart

                        </button>


                        <button
                            class="view-product-btn"
                            type="button"
                            data-product-id="${product.id}"
                            title="View Product"
                        >

                            <i class="bi bi-eye"></i>

                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;
}


// ==========================================
// GENERATE STARS
// ==========================================

function generateStars(rating) {

    let stars = "";

    const fullStars =
        Math.floor(rating);

    const hasHalfStar =
        rating % 1 >= 0.5;


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        if (i <= fullStars) {

            stars +=
                `<i class="bi bi-star-fill"></i>`;

        } else if (
            i === fullStars + 1 &&
            hasHalfStar
        ) {

            stars +=
                `<i class="bi bi-star-half"></i>`;

        } else {

            stars +=
                `<i class="bi bi-star"></i>`;
        }
    }

    return stars;
}


// ==========================================
// FORMAT CATEGORY
// ==========================================

function formatCategory(category) {

    if (!category) {
        return "";
    }

    return (
        category.charAt(0).toUpperCase() +
        category.slice(1)
    );
}


// ==========================================
// LOGIN CHECK
// ==========================================

function isUserLoggedIn() {

    return typeof isLoggedIn === "function"
        ? isLoggedIn()
        : !!localStorage.getItem(
            "buxmartUser"
        );
}


// ==========================================
// OPEN PRODUCT DETAILS
// ==========================================

function openProductDetails(productId) {

    const targetPage =
        `product-details.html?id=${encodeURIComponent(productId)}`;


    if (isUserLoggedIn()) {

        window.location.href =
            targetPage;

    } else {

        localStorage.setItem(
            "redirectAfterLogin",
            targetPage
        );

        window.location.href =
            "login.html";
    }
}


// ==========================================
// PRODUCT BUTTONS
// IMPORTANT:
// NO ADD-TO-CART HANDLER HERE
// main.js handles cart globally.
// ==========================================

function initializeProductButtons() {


    // ======================================
    // VIEW PRODUCT
    // ======================================

    const viewButtons =
        document.querySelectorAll(
            ".view-product-btn"
        );


    viewButtons.forEach(
        button => {

            if (
                button.dataset.viewInitialized ===
                "true"
            ) {
                return;
            }

            button.dataset.viewInitialized =
                "true";


            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    event.stopPropagation();

                    const productId =
                        button.dataset.productId;

                    if (!productId) {
                        return;
                    }

                    openProductDetails(
                        productId
                    );
                }
            );
        }
    );


    // ======================================
    // WISHLIST
    // ======================================

    const wishlistButtons =
        document.querySelectorAll(
            ".wishlist-btn"
        );


    wishlistButtons.forEach(
        button => {

            if (
                button.dataset.wishlistInitialized ===
                "true"
            ) {
                return;
            }

            button.dataset.wishlistInitialized =
                "true";


            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const productId =
                        button.dataset.productId;


                    if (!productId) {
                        return;
                    }


                    const product =
                        demoProducts.find(
                            item =>
                                String(item.id) ===
                                String(productId)
                        );


                    if (!product) {
                        return;
                    }


                    if (
                        typeof toggleWishlist !==
                        "function"
                    ) {

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

                        button.classList.add(
                            "active"
                        );

                        icon.classList.remove(
                            "bi-heart"
                        );

                        icon.classList.add(
                            "bi-heart-fill"
                        );

                    } else {

                        button.classList.remove(
                            "active"
                        );

                        icon.classList.remove(
                            "bi-heart-fill"
                        );

                        icon.classList.add(
                            "bi-heart"
                        );
                    }
                }
            );
        }
    );


    // ======================================
    // PRODUCT CARD CLICK
    // ======================================

    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    productCards.forEach(
        card => {

            if (
                card.dataset.cardInitialized ===
                "true"
            ) {
                return;
            }

            card.dataset.cardInitialized =
                "true";


            card.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target.closest(
                            "button"
                        )
                    ) {
                        return;
                    }


                    const productId =
                        card.dataset.productId;


                    if (!productId) {
                        return;
                    }


                    openProductDetails(
                        productId
                    );
                }
            );


            card.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key !== "Enter" &&
                        event.key !== " "
                    ) {
                        return;
                    }


                    event.preventDefault();


                    const productId =
                        card.dataset.productId;


                    if (productId) {

                        openProductDetails(
                            productId
                        );
                    }
                }
            );

        }
    );
}


// ==========================================
// EXPORT
// ==========================================

window.demoProducts =
    demoProducts;

window.openProductDetails =
    openProductDetails;

window.isUserLoggedIn =
    isUserLoggedIn;