document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
       PRODUCT DATA
    ========================================== */

  const products = Array.isArray(window.demoProducts)
    ? window.demoProducts
    : [];

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  let currentProduct = null;

  /* ==========================================
       DOM ELEMENTS
    ========================================== */

  const productLoading = document.getElementById("productLoading");
  const productDetails = document.getElementById("productDetails");
  const productError = document.getElementById("productError");

  const productImage = document.getElementById("productImage");
  const productName = document.getElementById("productName");
  const productCategory = document.getElementById("productCategory");
  const productDescription = document.getElementById("productDescription");

  const productPrice = document.getElementById("productPrice");
  const productOldPrice = document.getElementById("productOldPrice");

  const productRating = document.getElementById("productRating");
  const productStars = document.getElementById("productStars");

  const productBadge = document.getElementById("productBadge");
  const stockStatus = document.getElementById("stockStatus");

  const quantityInput = document.getElementById("quantity");
  const decreaseQuantity = document.getElementById("decreaseQuantity");
  const increaseQuantity = document.getElementById("increaseQuantity");

  const addToCartBtn = document.getElementById("addToCartBtn");
  const buyNowBtn = document.getElementById("buyNowBtn");
  const wishlistBtn = document.getElementById("wishlistBtn");

  const cartCount = document.getElementById("cartCount");

  const breadcrumbProduct = document.getElementById("breadcrumbProduct");
  const relatedProducts = document.getElementById("relatedProducts");

  /* ==========================================
       SHOW LOADING
    ========================================== */

  function showLoading() {
    if (productLoading) {
      productLoading.style.display = "flex";
    }

    if (productDetails) {
      productDetails.style.display = "none";
    }

    if (productError) {
      productError.style.display = "none";
    }
  }

  /* ==========================================
       SHOW ERROR
    ========================================== */

  function showError() {
    if (productLoading) {
      productLoading.style.display = "none";
    }

    if (productDetails) {
      productDetails.style.display = "none";
    }

    if (productError) {
      productError.style.display = "block";
    }

    if (breadcrumbProduct) {
      breadcrumbProduct.textContent = "Product Not Found";
    }
  }

  /* ==========================================
       FIND PRODUCT
    ========================================== */

  function findProduct() {
    if (!productId) {
      return null;
    }

    return products.find((product) => String(product.id) === String(productId));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("buxmartUser");

    if (!user || user === "null" || user === "undefined") {
      const currentPage =
        window.location.pathname.split("/").pop() + window.location.search;

      localStorage.setItem("redirectAfterLogin", currentPage);

      window.location.replace("login.html");
      return;
    }

    // Yahan tumhara existing product-details.js code rahega.
  });

  /* ==========================================
       LOAD PRODUCT
    ========================================== */

  function loadProduct() {
    showLoading();

    currentProduct = findProduct();

    if (!currentProduct) {
      showError();
      return;
    }

    renderProduct(currentProduct);
    renderRelatedProducts(currentProduct);
  }

  /* ==========================================
       RENDER PRODUCT
    ========================================== */

  function renderProduct(product) {
    if (productName) {
      productName.textContent = product.name;
    }

    if (breadcrumbProduct) {
      breadcrumbProduct.textContent = product.name;
    }

    if (productCategory) {
      productCategory.textContent = capitalize(product.category);
    }

    if (productDescription) {
      productDescription.textContent =
        product.description || "No description available for this product.";
    }

    /* ======================================
           IMAGE
        ====================================== */

    if (productImage) {
      productImage.src = product.image || "images/placeholder-product.png";

      productImage.alt = product.name;

      productImage.onerror = function () {
        this.onerror = null;

        this.src = "images/placeholder-product.png";
      };
    }

    /* ======================================
           PRICE
        ====================================== */

    if (productPrice) {
      productPrice.textContent = `$${Number(product.price).toFixed(2)}`;
    }

    if (productOldPrice) {
      if (product.oldPrice) {
        productOldPrice.textContent = `$${Number(product.oldPrice).toFixed(2)}`;

        productOldPrice.style.display = "inline";
      } else {
        productOldPrice.textContent = "";

        productOldPrice.style.display = "none";
      }
    }

    /* ======================================
           RATING
        ====================================== */

    const rating = Number(product.rating || 0);

    if (productRating) {
      productRating.textContent = `${rating.toFixed(1)} (${product.reviews || 0} reviews)`;
    }

    if (productStars) {
      productStars.textContent = getStars(rating);
    }

    /* ======================================
           BADGE
        ====================================== */

    if (productBadge) {
      if (product.badge) {
        productBadge.textContent = product.badge;

        productBadge.style.display = "inline-block";
      } else {
        productBadge.style.display = "none";
      }
    }

    /* ======================================
           STOCK
        ====================================== */

    updateStock(product);

    /* ======================================
           RESET QUANTITY
        ====================================== */

    if (quantityInput) {
      quantityInput.value = 1;
      quantityInput.min = 1;

      if (product.stock !== undefined) {
        quantityInput.max = Math.max(1, Number(product.stock));
      } else {
        quantityInput.removeAttribute("max");
      }
    }

    /* ======================================
           SHOW PRODUCT
        ====================================== */

    if (productLoading) {
      productLoading.style.display = "none";
    }

    if (productError) {
      productError.style.display = "none";
    }

    if (productDetails) {
      productDetails.style.display = "grid";
    }

    document.title = `${product.name} | BuxMart`;
  }

  /* ==========================================
       STOCK
    ========================================== */

  function updateStock(product) {
    if (!stockStatus) {
      return;
    }

    /*
           Your current demoProducts don't contain
           stock values.

           Therefore undefined stock means:
           product is available.
        */

    if (product.stock === undefined || product.stock === null) {
      stockStatus.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                In Stock
            `;

      enablePurchaseButtons();

      return;
    }

    const stock = Number(product.stock);

    if (stock > 0) {
      stockStatus.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                In Stock (${stock} available)
            `;

      enablePurchaseButtons();
    } else {
      stockStatus.innerHTML = `
                <i class="bi bi-x-circle-fill"></i>
                Out of Stock
            `;

      disablePurchaseButtons();
    }
  }

  /* ==========================================
       ENABLE PURCHASE
    ========================================== */

  function enablePurchaseButtons() {
    if (addToCartBtn) {
      addToCartBtn.disabled = false;
    }

    if (buyNowBtn) {
      buyNowBtn.disabled = false;
    }

    if (quantityInput) {
      quantityInput.disabled = false;
    }

    if (decreaseQuantity) {
      decreaseQuantity.disabled = false;
    }

    if (increaseQuantity) {
      increaseQuantity.disabled = false;
    }
  }

  /* ==========================================
       DISABLE PURCHASE
    ========================================== */

  function disablePurchaseButtons() {
    if (addToCartBtn) {
      addToCartBtn.disabled = true;
    }

    if (buyNowBtn) {
      buyNowBtn.disabled = true;
    }

    if (quantityInput) {
      quantityInput.disabled = true;
    }

    if (decreaseQuantity) {
      decreaseQuantity.disabled = true;
    }

    if (increaseQuantity) {
      increaseQuantity.disabled = true;
    }
  }

  /* ==========================================
       QUANTITY - DECREASE
    ========================================== */

  if (decreaseQuantity) {
    decreaseQuantity.addEventListener("click", () => {
      let quantity = Number(quantityInput.value) || 1;

      if (quantity > 1) {
        quantity--;
      }

      quantityInput.value = quantity;
    });
  }

  /* ==========================================
       QUANTITY - INCREASE
    ========================================== */

  if (increaseQuantity) {
    increaseQuantity.addEventListener("click", () => {
      let quantity = Number(quantityInput.value) || 1;

      const max = Number(quantityInput.max);

      if (max && quantity >= max) {
        return;
      }

      quantity++;

      quantityInput.value = quantity;
    });
  }

  /* ==========================================
       QUANTITY INPUT
    ========================================== */

  if (quantityInput) {
    quantityInput.addEventListener("change", () => {
      let quantity = Number(quantityInput.value) || 1;

      if (quantity < 1) {
        quantity = 1;
      }

      const max = Number(quantityInput.max);

      if (max && quantity > max) {
        quantity = max;
      }

      quantityInput.value = quantity;
    });
  }

  /* ==========================================
       ADD TO CART
    ========================================== */

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      if (!currentProduct) {
        return;
      }

      const quantity = Number(quantityInput.value) || 1;

      let cart = JSON.parse(localStorage.getItem("buxmartCart") || "[]");

      const existingProduct = cart.find(
        (item) => String(item.id) === String(currentProduct.id),
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.push({
          id: currentProduct.id,

          name: currentProduct.name,

          price: currentProduct.price,

          oldPrice: currentProduct.oldPrice || null,

          image: currentProduct.image,

          category: currentProduct.category,

          quantity: quantity,
        });
      }

      localStorage.setItem("buxmartCart", JSON.stringify(cart));

      updateCartCount();

      if (typeof window.showNotification === "function") {
        window.showNotification(`${currentProduct.name} added to cart`);
      } else {
        alert(`${currentProduct.name} added to cart`);
      }
    });
  }

  /* ==========================================
       BUY NOW
    ========================================== */

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      if (!currentProduct) {
        return;
      }

      const quantity = Number(quantityInput.value) || 1;

      let cart = JSON.parse(localStorage.getItem("buxmartCart") || "[]");

      const existingProduct = cart.find(
        (item) => String(item.id) === String(currentProduct.id),
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.push({
          id: currentProduct.id,

          name: currentProduct.name,

          price: currentProduct.price,

          oldPrice: currentProduct.oldPrice || null,

          image: currentProduct.image,

          category: currentProduct.category,

          quantity: quantity,
        });
      }

      localStorage.setItem("buxmartCart", JSON.stringify(cart));

      window.location.href = "cart.html";
    });
  }

  /* ==========================================
       WISHLIST
    ========================================== */

  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      if (!currentProduct) {
        return;
      }

      let wishlist = JSON.parse(
        localStorage.getItem("buxmartWishlist") || "[]",
      );

      const index = wishlist.findIndex(
        (item) => String(item.id) === String(currentProduct.id),
      );

      if (index === -1) {
        wishlist.push(currentProduct);

        wishlistBtn.classList.add("active");

        wishlistBtn.innerHTML = `<i class="bi bi-heart-fill"></i>`;

        if (typeof window.showNotification === "function") {
          window.showNotification("Added to wishlist");
        }
      } else {
        wishlist.splice(index, 1);

        wishlistBtn.classList.remove("active");

        wishlistBtn.innerHTML = `<i class="bi bi-heart"></i>`;

        if (typeof window.showNotification === "function") {
          window.showNotification("Removed from wishlist");
        }
      }

      localStorage.setItem("buxmartWishlist", JSON.stringify(wishlist));
    });
  }

  /* ==========================================
       UPDATE CART COUNT
    ========================================== */

  function updateCartCount() {
    if (!cartCount) {
      return;
    }

    const cart = JSON.parse(localStorage.getItem("buxmartCart") || "[]");

    const total = cart.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0,
    );

    cartCount.textContent = total;
  }

  /* ==========================================
       RELATED PRODUCTS
    ========================================== */

  function renderRelatedProducts(product) {
    if (!relatedProducts) {
      return;
    }

    let related = products.filter(
      (item) =>
        String(item.id) !== String(product.id) &&
        String(item.category).toLowerCase() ===
          String(product.category).toLowerCase(),
    );

    if (related.length < 4) {
      const additional = products.filter(
        (item) =>
          String(item.id) !== String(product.id) &&
          !related.some(
            (relatedItem) => String(relatedItem.id) === String(item.id),
          ),
      );

      related = related.concat(additional);
    }

    related = related.slice(0, 4);

    relatedProducts.innerHTML = related.map(createRelatedProduct).join("");

    relatedProducts.querySelectorAll("[data-product-id]").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.productId;

        window.location.href = `product-details.html?id=${id}`;
      });
    });
  }

  /* ==========================================
       RELATED PRODUCT CARD
    ========================================== */

  function createRelatedProduct(product) {
    const oldPrice = product.oldPrice
      ? `<span class="old-price">$${Number(product.oldPrice).toFixed(2)}</span>`
      : "";

    return `
            <div class="col-lg-3 col-md-6">

                <div
                    class="related-product-card"
                    data-product-id="${product.id}"
                >

                    <div class="related-product-image">

                        <img
                            src="${product.image}"
                            alt="${escapeHtml(product.name)}"
                            onerror="this.onerror=null;this.src='images/placeholder-product.png';"
                        >

                        ${
                          product.badge
                            ? `<span class="related-badge">${escapeHtml(product.badge)}</span>`
                            : ""
                        }

                    </div>

                    <div class="related-product-info">

                        <span class="related-category">
                            ${escapeHtml(capitalize(product.category))}
                        </span>

                        <h4>
                            ${escapeHtml(product.name)}
                        </h4>

                        <div class="related-rating">
                            ${getStars(Number(product.rating || 0))}
                            <span>
                                (${product.reviews || 0})
                            </span>
                        </div>

                        <div class="related-price">

                            <strong>
                                $${Number(product.price).toFixed(2)}
                            </strong>

                            ${oldPrice}

                        </div>

                    </div>

                </div>

            </div>
        `;
  }

  /* ==========================================
       STAR RATING
    ========================================== */

  function getStars(rating) {
    const rounded = Math.round(Number(rating));

    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  }

  /* ==========================================
       CAPITALIZE
    ========================================== */

  function capitalize(text) {
    if (!text) {
      return "";
    }

    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
  }

  /* ==========================================
       ESCAPE HTML
    ========================================== */

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ==========================================
       INITIALIZE
    ========================================== */

  updateCartCount();

  loadProduct();
});
