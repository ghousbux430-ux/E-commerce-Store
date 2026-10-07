/* =========================================================
   BUXMART - PRODUCTS PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // =====================================================
  // GET PRODUCTS
  // =====================================================

  const products = Array.isArray(window.demoProducts)
    ? window.demoProducts
    : [];

  // =====================================================
  // DOM ELEMENTS
  // =====================================================

  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const noProducts = document.getElementById("noProducts");

  const productSearch = document.getElementById("productSearch");
  const searchButton = document.getElementById("searchButton");

  const sortProducts = document.getElementById("sortProducts");

  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const applyPrice = document.getElementById("applyPrice");

  const activeFilters = document.getElementById("activeFilters");

  const resetNoProducts = document.getElementById("resetNoProducts");
  const clearFilters = document.getElementById("clearFilters");

  const loadMoreWrapper = document.getElementById("loadMoreWrapper");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  const mobileFilterBtn = document.getElementById("mobileFilterBtn");
  const shopSidebar = document.getElementById("shopSidebar");

  const inStockCheckbox = document.getElementById("inStock");

  const cartCount = document.getElementById("cartCount");

  // =====================================================
  // STATE
  // =====================================================

  let filteredProducts = [...products];

  let currentPage = 1;

  const productsPerPage = 8;

  let filters = {
    search: "",
    category: "all",
    minPrice: "",
    maxPrice: "",
    rating: "all",
    inStock: false,
  };

  // =====================================================
  // URL PARAMETERS
  // =====================================================

  const urlParams = new URLSearchParams(window.location.search);

  filters.search = urlParams.get("search") || "";

  filters.category = urlParams.get("category") || "all";

  const urlSort = urlParams.get("sort") || "";

  // =====================================================
  // INITIAL SEARCH
  // =====================================================

  if (productSearch) {
    productSearch.value = filters.search;
  }

  // =====================================================
  // INITIAL CATEGORY
  // =====================================================

  const categoryInputs = document.querySelectorAll('input[name="category"]');

  categoryInputs.forEach((input) => {
    if (input.value.toLowerCase() === filters.category.toLowerCase()) {
      input.checked = true;
    }
  });

  // =====================================================
  // INITIAL SORT
  // =====================================================

  if (sortProducts && urlSort === "newest") {
    sortProducts.value = "newest";
  }

  // =====================================================
  // SEARCH
  // =====================================================

  function performSearch() {
    filters.search = productSearch
      ? productSearch.value.trim().toLowerCase()
      : "";

    currentPage = 1;

    applyFilters();

    updateURL();
  }

  if (searchButton) {
    searchButton.addEventListener("click", performSearch);
  }

  if (productSearch) {
    productSearch.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        performSearch();
      }
    });
  }

  // =====================================================
  // CATEGORY FILTER
  // =====================================================

  categoryInputs.forEach((input) => {
    input.addEventListener("change", () => {
      filters.category = input.value;

      currentPage = 1;

      applyFilters();

      updateURL();
    });
  });

  // =====================================================
  // RATING FILTER
  // =====================================================

  const ratingInputs = document.querySelectorAll('input[name="rating"]');

  ratingInputs.forEach((input) => {
    input.addEventListener("change", () => {
      filters.rating = input.value;

      currentPage = 1;

      applyFilters();
    });
  });

  // =====================================================
  // PRICE FILTER
  // =====================================================

  if (applyPrice) {
    applyPrice.addEventListener("click", () => {
      filters.minPrice = minPrice ? minPrice.value.trim() : "";

      filters.maxPrice = maxPrice ? maxPrice.value.trim() : "";

      currentPage = 1;

      applyFilters();
    });
  }

  // =====================================================
  // PRICE ENTER
  // =====================================================

  [minPrice, maxPrice].forEach((input) => {
    if (!input) return;

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (applyPrice) {
          applyPrice.click();
        }
      }
    });
  });

  // =====================================================
  // STOCK FILTER
  // =====================================================

  if (inStockCheckbox) {
    inStockCheckbox.addEventListener("change", () => {
      filters.inStock = inStockCheckbox.checked;

      currentPage = 1;

      applyFilters();
    });
  }

  // =====================================================
  // SORTING
  // =====================================================

  if (sortProducts) {
    sortProducts.addEventListener("change", () => {
      currentPage = 1;

      applyFilters();

      updateURL();
    });
  }

  // =====================================================
  // MOBILE FILTER
  // =====================================================

  if (mobileFilterBtn && shopSidebar) {
    mobileFilterBtn.addEventListener("click", () => {
      shopSidebar.classList.toggle("show");

      const isOpen = shopSidebar.classList.contains("show");

      mobileFilterBtn.innerHTML = isOpen
        ? `
          <i class="bi bi-x-lg"></i>
          Close Filters
        `
        : `
          <i class="bi bi-sliders"></i>
          Filters
        `;
    });
  }

  // =====================================================
  // APPLY FILTERS
  // =====================================================

  function applyFilters() {
    let result = [...products];

    // SEARCH

    if (filters.search) {
      result = result.filter((product) => {
        const name = product.name ? String(product.name).toLowerCase() : "";

        const category = product.category
          ? String(product.category).toLowerCase()
          : "";

        const description = product.description
          ? String(product.description).toLowerCase()
          : "";

        return (
          name.includes(filters.search) ||
          category.includes(filters.search) ||
          description.includes(filters.search)
        );
      });
    }

    // CATEGORY

    if (filters.category && filters.category !== "all") {
      result = result.filter((product) => {
        return (
          product.category &&
          String(product.category).toLowerCase() ===
            String(filters.category).toLowerCase()
        );
      });
    }

    // MIN PRICE

    if (filters.minPrice !== "") {
      const min = Number(filters.minPrice);

      if (!Number.isNaN(min)) {
        result = result.filter((product) => Number(product.price) >= min);
      }
    }

    // MAX PRICE

    if (filters.maxPrice !== "") {
      const max = Number(filters.maxPrice);

      if (!Number.isNaN(max)) {
        result = result.filter((product) => Number(product.price) <= max);
      }
    }

    // RATING

    if (filters.rating && filters.rating !== "all") {
      const rating = Number(filters.rating);

      result = result.filter(
        (product) => Number(product.rating || 0) >= rating,
      );
    }

    // STOCK

    if (filters.inStock) {
      result = result.filter((product) => {
        return product.stock === undefined || Number(product.stock) > 0;
      });
    }

    // DEALS

    if (urlSort === "deals") {
      result = result.filter((product) => {
        return (
          product.oldPrice && Number(product.oldPrice) > Number(product.price)
        );
      });
    }

    // SORT

    result = sortProductsList(result);

    filteredProducts = result;

    renderProducts();

    renderActiveFilters();
  }

  // =====================================================
  // SORT PRODUCTS
  // =====================================================

  function sortProductsList(list) {
    const sortValue = sortProducts ? sortProducts.value : "default";

    const sorted = [...list];

    switch (sortValue) {
      case "price-low":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));

        break;

      case "price-high":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));

        break;

      case "rating":
        sorted.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));

        break;

      case "name":
        sorted.sort((a, b) =>
          String(a.name || "").localeCompare(String(b.name || "")),
        );

        break;

      case "newest":
        sorted.sort((a, b) => Number(b.id) - Number(a.id));

        break;

      default:
        break;
    }

    return sorted;
  }

  // =====================================================
  // GET WISHLIST
  // =====================================================

  function getWishlist() {
    try {
      const wishlist = JSON.parse(localStorage.getItem("buxmartWishlist"));

      return Array.isArray(wishlist) ? wishlist : [];
    } catch (error) {
      console.error("Wishlist read error:", error);

      return [];
    }
  }

  // =====================================================
  // SAVE WISHLIST
  // =====================================================

  function saveWishlist(wishlist) {
    localStorage.setItem("buxmartWishlist", JSON.stringify(wishlist));
  }

  // =====================================================
  // CHECK WISHLIST
  // =====================================================

  function isProductInWishlist(productId) {
    const wishlist = getWishlist();

    return wishlist.some((item) => String(item.id) === String(productId));
  }

  // =====================================================
  // UPDATE WISHLIST NAVBAR COUNT
  // =====================================================

  // =====================================================
  // UPDATE WISHLIST NAVBAR COUNT
  // =====================================================

  function updateWishlistCount() {
    const wishlist = getWishlist();

    const countElements = document.querySelectorAll(".wishlist-count");

    countElements.forEach((element) => {
      element.textContent = wishlist.length;

      // Hide badge when wishlist is empty
      if (wishlist.length === 0) {
        element.style.display = "none";
      } else {
        element.style.display = "flex";
      }
    });
  }

  // Make available globally
  window.updateWishlistCount = updateWishlistCount;

  // Make available globally
  window.updateWishlistCount = updateWishlistCount;

  // =====================================================
  // RENDER PRODUCTS
  // =====================================================

  function renderProducts() {
    if (!productsGrid) {
      return;
    }

    productsGrid.innerHTML = "";

    const visibleProducts = filteredProducts.slice(
      0,
      currentPage * productsPerPage,
    );

    // COUNT

    if (productCount) {
      const total = filteredProducts.length;

      productCount.textContent = `${total} ${
        total === 1 ? "Product" : "Products"
      }`;
    }

    // NO PRODUCTS

    if (filteredProducts.length === 0) {
      if (noProducts) {
        noProducts.style.display = "block";
      }

      if (loadMoreWrapper) {
        loadMoreWrapper.style.display = "none";
      }

      return;
    }

    if (noProducts) {
      noProducts.style.display = "none";
    }

    // PRODUCT CARDS

    visibleProducts.forEach((product) => {
      productsGrid.insertAdjacentHTML("beforeend", createProductCard(product));
    });

    // LOAD MORE

    if (loadMoreWrapper && loadMoreBtn) {
      if (visibleProducts.length < filteredProducts.length) {
        loadMoreWrapper.style.display = "flex";

        loadMoreBtn.disabled = false;

        loadMoreBtn.innerHTML = `
          <span>
            Load More Products
          </span>
          <i class="bi bi-arrow-down"></i>
        `;
      } else {
        loadMoreWrapper.style.display = "none";
      }
    }

    attachProductEvents();

    updateWishlistCount();
  }

  // =====================================================
  // CREATE PRODUCT CARD
  // =====================================================

  function createProductCard(product) {
    const discount = calculateDiscount(
      Number(product.price),
      Number(product.oldPrice),
    );

    const stars = generateStars(Number(product.rating || 0));

    const productId = String(product.id);

    const safeName = escapeHTML(product.name || "Product");

    const safeCategory = escapeHTML(capitalize(product.category || "General"));

    const safeImage = escapeAttribute(product.image || "");

    // ⭐ IMPORTANT
    // Check wishlist status

    const inWishlist = isProductInWishlist(productId);

    return `

      <div class="col-lg-3 col-md-4 col-sm-6">

        <div
          class="product-card"
          data-product-id="${productId}"
        >

          <!-- PRODUCT IMAGE -->

          <div
            class="product-image"
            data-product-id="${productId}"
            title="View ${safeName}"
          >

            ${
              product.badge
                ? `
                  <span class="product-badge">
                    ${escapeHTML(product.badge)}
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


            <!-- WISHLIST -->

            <button
              type="button"
              class="wishlist-btn ${inWishlist ? "active" : ""}"
              data-id="${productId}"
              title="${inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}"
              aria-label="${
                inWishlist
                  ? `Remove ${safeName} from wishlist`
                  : `Add ${safeName} to wishlist`
              }"
            >

              <i class="${inWishlist ? "bi bi-heart-fill" : "bi bi-heart"}"></i>

            </button>


            <img
              src="${safeImage}"
              alt="${safeName}"
              loading="lazy"
            />

          </div>


          <!-- PRODUCT INFO -->

          <div class="product-info">

            <small class="product-category">
              ${safeCategory}
            </small>


            <h5
              class="product-title"
              data-product-id="${productId}"
              title="View Product"
            >
              ${safeName}
            </h5>


            <!-- RATING -->

            <div class="product-rating">

              <span class="stars">
                ${stars}
              </span>

              <span class="rating-number">
                ${Number(product.rating || 0).toFixed(1)}
              </span>

              <span class="review-count">
                (${Number(product.reviews || 0)})
              </span>

            </div>


            <!-- PRICE -->

            <div class="product-price">

              <span class="current-price">
                $${Number(product.price || 0).toFixed(2)}
              </span>


              ${
                product.oldPrice &&
                Number(product.oldPrice) > Number(product.price)
                  ? `
                    <span class="old-price">
                      $${Number(product.oldPrice).toFixed(2)}
                    </span>
                  `
                  : ""
              }

            </div>


            <!-- ACTIONS -->

            <div class="product-actions">

              <button
                type="button"
                class="add-cart-btn"
                data-id="${productId}"
              >
                <i class="bi bi-cart-plus"></i>
                Add to Cart
              </button>


              <button
                type="button"
                class="view-product-btn"
                data-id="${productId}"
                title="View Product"
                aria-label="View ${safeName}"
              >
                <i class="bi bi-eye"></i>
              </button>

            </div>

          </div>

        </div>

      </div>

    `;
  }

  // =====================================================
  // PRODUCT EVENTS
  // =====================================================

  function attachProductEvents() {
    // =================================================
    // WISHLIST ❤️
    // =================================================

    document.querySelectorAll(".wishlist-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        event.stopPropagation();

        const id = String(button.dataset.id);

        if (!id) {
          return;
        }

        const product = products.find((item) => String(item.id) === id);

        if (!product) {
          console.error("Product not found:", id);

          return;
        }

        let wishlist = getWishlist();

        const existingIndex = wishlist.findIndex(
          (item) => String(item.id) === id,
        );

        // =========================================
        // REMOVE
        // =========================================

        if (existingIndex !== -1) {
          wishlist.splice(existingIndex, 1);

          saveWishlist(wishlist);

          button.classList.remove("active");

          const icon = button.querySelector("i");

          if (icon) {
            icon.className = "bi bi-heart";
          }

          button.setAttribute("title", "Add to Wishlist");

          button.setAttribute("aria-label", `Add ${product.name} to wishlist`);

          if (typeof window.showNotification === "function") {
            window.showNotification(`${product.name} removed from wishlist`);
          }
        }

        // =========================================
        // ADD
        // =========================================
        else {
          wishlist.push({
            id: product.id,

            name: product.name,

            price: product.price,

            oldPrice: product.oldPrice || null,

            image: product.image,

            category: product.category || "",

            rating: product.rating || 0,

            reviews: product.reviews || 0,

            badge: product.badge || "",

            description: product.description || "",
          });

          saveWishlist(wishlist);

          button.classList.add("active");

          const icon = button.querySelector("i");

          if (icon) {
            icon.className = "bi bi-heart-fill";
          }

          button.setAttribute("title", "Remove from Wishlist");

          button.setAttribute(
            "aria-label",
            `Remove ${product.name} from wishlist`,
          );

          if (typeof window.showNotification === "function") {
            window.showNotification(`${product.name} added to wishlist!`);
          }
        }

        updateWishlistCount();
      });
    });

    // =================================================
    // VIEW PRODUCT
    // =================================================

    document.querySelectorAll(".view-product-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        event.stopPropagation();

        const id = button.dataset.id;

        if (!id) {
          return;
        }

        window.location.href = `product-details.html?id=${encodeURIComponent(
          id,
        )}`;
      });
    });

    // =================================================
    // CLICK PRODUCT IMAGE
    // =================================================

    document.querySelectorAll(".product-image").forEach((image) => {
      image.addEventListener("click", (event) => {
        if (event.target.closest(".wishlist-btn")) {
          return;
        }

        const id = image.dataset.productId;

        if (!id) {
          return;
        }

        window.location.href = `product-details.html?id=${encodeURIComponent(
          id,
        )}`;
      });
    });

    // =================================================
    // CLICK PRODUCT TITLE
    // =================================================

    document.querySelectorAll(".product-title").forEach((title) => {
      title.addEventListener("click", () => {
        const id = title.dataset.productId;

        if (!id) {
          return;
        }

        window.location.href = `product-details.html?id=${encodeURIComponent(
          id,
        )}`;
      });
    });
  }

  // =====================================================
  // FALLBACK CART
  // =====================================================

  function addToCartFallback(product) {
    let cart = JSON.parse(localStorage.getItem("buxmartCart")) || [];

    const existing = cart.find(
      (item) => String(item.id) === String(product.id),
    );

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({
        ...product,

        quantity: 1,
      });
    }

    localStorage.setItem("buxmartCart", JSON.stringify(cart));

    updateCartCountFallback();

    if (typeof window.showNotification === "function") {
      window.showNotification(`${product.name} added to cart!`);
    } else {
      alert(`${product.name} added to cart!`);
    }
  }

  // =====================================================
  // UPDATE CART COUNT
  // =====================================================

  function updateCartCountFallback() {
    const cart = JSON.parse(localStorage.getItem("buxmartCart")) || [];

    const count = cart.reduce(
      (total, item) => total + Number(item.quantity || 1),
      0,
    );

    if (cartCount) {
      cartCount.textContent = count;
    }
  }

  // =====================================================
  // ACTIVE FILTERS
  // =====================================================

  function renderActiveFilters() {
    if (!activeFilters) {
      return;
    }

    activeFilters.innerHTML = "";

    if (filters.search) {
      addFilterTag(`Search: ${filters.search}`, () => {
        filters.search = "";

        if (productSearch) {
          productSearch.value = "";
        }

        currentPage = 1;

        applyFilters();

        updateURL();
      });
    }

    if (filters.category && filters.category !== "all") {
      addFilterTag(`Category: ${capitalize(filters.category)}`, () => {
        filters.category = "all";

        const allCategory = document.querySelector(
          'input[name="category"][value="all"]',
        );

        if (allCategory) {
          allCategory.checked = true;
        }

        currentPage = 1;

        applyFilters();

        updateURL();
      });
    }

    if (filters.minPrice !== "") {
      addFilterTag(`Min: $${filters.minPrice}`, () => {
        filters.minPrice = "";

        if (minPrice) {
          minPrice.value = "";
        }

        currentPage = 1;

        applyFilters();
      });
    }

    if (filters.maxPrice !== "") {
      addFilterTag(`Max: $${filters.maxPrice}`, () => {
        filters.maxPrice = "";

        if (maxPrice) {
          maxPrice.value = "";
        }

        currentPage = 1;

        applyFilters();
      });
    }

    if (filters.rating && filters.rating !== "all") {
      addFilterTag(`${filters.rating}+ Stars`, () => {
        filters.rating = "all";

        const allRating = document.querySelector(
          'input[name="rating"][value="all"]',
        );

        if (allRating) {
          allRating.checked = true;
        }

        currentPage = 1;

        applyFilters();
      });
    }

    if (filters.inStock) {
      addFilterTag("In Stock", () => {
        filters.inStock = false;

        if (inStockCheckbox) {
          inStockCheckbox.checked = false;
        }

        currentPage = 1;

        applyFilters();
      });
    }
  }

  // =====================================================
  // ADD FILTER TAG
  // =====================================================

  function addFilterTag(text, removeFunction) {
    const tag = document.createElement("span");

    tag.className = "active-filter";

    tag.innerHTML = `
      ${escapeHTML(text)}

      <button
        type="button"
        aria-label="Remove filter"
      >
        <i class="bi bi-x"></i>
      </button>
    `;

    const removeButton = tag.querySelector("button");

    if (removeButton) {
      removeButton.addEventListener("click", removeFunction);
    }

    activeFilters.appendChild(tag);
  }

  // =====================================================
  // LOAD MORE
  // =====================================================

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      currentPage++;

      renderProducts();

      setTimeout(() => {
        const cards = productsGrid
          ? productsGrid.querySelectorAll(".product-card")
          : [];

        if (cards.length > 8) {
          const target = cards[Math.max(0, cards.length - 4)];

          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      }, 50);
    });
  }

  // =====================================================
  // RESET FILTERS
  // =====================================================

  function resetFilters() {
    filters = {
      search: "",

      category: "all",

      minPrice: "",

      maxPrice: "",

      rating: "all",

      inStock: false,
    };

    currentPage = 1;

    if (productSearch) {
      productSearch.value = "";
    }

    if (minPrice) {
      minPrice.value = "";
    }

    if (maxPrice) {
      maxPrice.value = "";
    }

    if (inStockCheckbox) {
      inStockCheckbox.checked = false;
    }

    const allCategory = document.querySelector(
      'input[name="category"][value="all"]',
    );

    if (allCategory) {
      allCategory.checked = true;
    }

    const allRating = document.querySelector(
      'input[name="rating"][value="all"]',
    );

    if (allRating) {
      allRating.checked = true;
    }

    if (sortProducts) {
      sortProducts.value = "default";
    }

    if (shopSidebar) {
      shopSidebar.classList.remove("show");
    }

    if (mobileFilterBtn) {
      mobileFilterBtn.innerHTML = `
        <i class="bi bi-sliders"></i>
        Filters
      `;
    }

    applyFilters();

    updateURL();
  }

  if (resetNoProducts) {
    resetNoProducts.addEventListener("click", resetFilters);
  }

  if (clearFilters) {
    clearFilters.addEventListener("click", resetFilters);
  }

  // =====================================================
  // UPDATE URL
  // =====================================================

  function updateURL() {
    const params = new URLSearchParams();

    if (filters.search) {
      params.set("search", filters.search);
    }

    if (filters.category && filters.category !== "all") {
      params.set("category", filters.category);
    }

    if (sortProducts && sortProducts.value !== "default") {
      params.set("sort", sortProducts.value);
    }

    const query = params.toString();

    const newURL = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    window.history.replaceState({}, "", newURL);
  }

  // =====================================================
  // CALCULATE DISCOUNT
  // =====================================================

  function calculateDiscount(price, oldPrice) {
    if (!oldPrice || oldPrice <= price) {
      return 0;
    }

    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  // =====================================================
  // GENERATE STARS
  // =====================================================

  function generateStars(rating) {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars += '<i class="bi bi-star-fill"></i>';
      } else if (rating >= i - 0.5) {
        stars += '<i class="bi bi-star-half"></i>';
      } else {
        stars += '<i class="bi bi-star"></i>';
      }
    }

    return stars;
  }

  // =====================================================
  // CAPITALIZE
  // =====================================================

  function capitalize(text) {
    if (!text) {
      return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // =====================================================
  // ESCAPE HTML
  // =====================================================

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")

      .replace(/</g, "&lt;")

      .replace(/>/g, "&gt;")

      .replace(/"/g, "&quot;")

      .replace(/'/g, "&#039;");
  }

  // =====================================================
  // ESCAPE ATTRIBUTE
  // =====================================================

  function escapeAttribute(value) {
    return escapeHTML(value);
  }

  // =====================================================
  // INITIAL CART COUNT
  // =====================================================

  updateCartCountFallback();

  // =====================================================
  // INITIAL WISHLIST COUNT
  // =====================================================

  updateWishlistCount();

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  applyFilters();
});
