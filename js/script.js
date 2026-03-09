/* MANJU FOODS - Shared storefront behavior */

const STORAGE_KEY = "manju_foods_cart_v1";
const PAGE_TRANSITION_MS = 360;

const PRODUCTS = [
  {
    id: "healthy-crunch-seeds-mix",
    name: "Healthy Crunch Seeds Mix",
    price: 229,
    image: "images/products/seed-mix.jpg",
    category: "healthy-snacks",
    rating: 4.8,
    description: "Roasted seeds and millet blend with natural spices.",
    tags: ["High Protein", "High Fibre", "No Palm Oil"],
  },
  {
    id: "power-crunch-masala-dry-fruits",
    name: "Power Crunch Masala Dry Fruits",
    price: 309,
    image: "images/products/dry-fruits.jpg",
    category: "healthy-snacks",
    rating: 4.7,
    description: "Bold masala dry fruits packed with protein-rich crunch.",
    tags: ["Roasted", "Millet Based", "Energy Boost"],
  },
  {
    id: "anjeer-nuts-pop-bites",
    name: "Anjeer Nuts Pop Bites",
    price: 329,
    image: "images/products/dry-fruits.jpg",
    category: "cookies",
    rating: 4.9,
    description: "Naturally sweet fig and nut bites for smart snacking.",
    tags: ["No Refined Sugar", "High Fibre", "No Palm Oil"],
  },
  {
    id: "nutri-crunch-bites",
    name: "Nutri Crunch Bites",
    price: 329,
    image: "images/products/seed-mix.jpg",
    category: "healthy-snacks",
    rating: 4.7,
    description: "Toasted millet clusters and nuts for daily cravings.",
    tags: ["High Protein", "Roasted", "Travel Friendly"],
  },
  {
    id: "protein-date-nut-bites",
    name: "Protein Date Nut Bites",
    price: 299,
    image: "images/products/dry-fruits.jpg",
    category: "healthy-snacks",
    rating: 4.8,
    description: "Date and nut laddus with wholesome millet flour.",
    tags: ["Natural Sweetness", "High Protein", "No Palm Oil"],
  },
  {
    id: "bajra-noodles",
    name: "Millet Noodles Masala",
    price: 189,
    image: "images/products/millet-noodles.jpg",
    category: "millet-noodles",
    rating: 4.6,
    description: "Quick-cook bajra noodles with aromatic spice blend.",
    tags: ["Millet Based", "No Maida", "Family Pack"],
  },
  {
    id: "millet-penne-pasta",
    name: "Millet Penne Pasta",
    price: 209,
    image: "images/products/millet-noodles.jpg",
    category: "millet-pasta",
    rating: 4.6,
    description: "Firm, wholesome millet pasta for healthy meals.",
    tags: ["High Fibre", "No Maida", "Italian Style"],
  },
  {
    id: "jowar-khakhra",
    name: "Jowar Khakhra Masala",
    price: 169,
    image: "images/products/khakhra.jpg",
    category: "khakhra",
    rating: 4.5,
    description: "Crisp roasted khakhra with signature masala seasoning.",
    tags: ["Roasted", "Light Snack", "Tea Time"],
  },
  {
    id: "millet-cookies",
    name: "Ragi Choco Millet Cookies",
    price: 199,
    image: "images/products/cookies.jpg",
    category: "cookies",
    rating: 4.7,
    description: "Crunchy choco cookies made with nutrient-rich ragi.",
    tags: ["Kids Favorite", "No Palm Oil", "Millet Based"],
  },
  {
    id: "peri-peri-makhana",
    name: "Roasted Makhana Peri Peri",
    price: 179,
    image: "images/products/makhana.jpg",
    category: "roasted-makhana",
    rating: 4.7,
    description: "Foxnuts roasted to perfection with peri peri spice.",
    tags: ["Roasted Not Fried", "Low Calorie", "High Fibre"],
  },
  {
    id: "millet-pancake-mix",
    name: "Millet Pancake Mix",
    price: 219,
    image: "images/products/pancake-mix.jpg",
    category: "pancake-mix",
    rating: 4.6,
    description: "Instant batter mix for soft, fluffy millet pancakes.",
    tags: ["Breakfast", "Millet Based", "Quick Prep"],
  },
  {
    id: "instant-upma-premix",
    name: "Instant Millet Upma Premix",
    price: 159,
    image: "images/products/premix.jpg",
    category: "instant-premix",
    rating: 4.5,
    description: "Ready-in-minutes upma premix with roasted grains.",
    tags: ["Instant", "No Preservatives", "Balanced Meal"],
  },
];

const OFFERS = [
  {
    id: "healthy-snack-combo",
    name: "Healthy Snack Combo",
    price: 711,
    image: "images/products/seed-mix.jpg",
    contains: [
      "Healthy Crunch Seeds Mix",
      "Anjeer Nuts Pop Bites",
      "Power Crunch Masala Dry Fruits",
    ],
  },
  {
    id: "millet-breakfast-combo",
    name: "Millet Breakfast Combo",
    price: 658,
    image: "images/products/millet-noodles.jpg",
    contains: [
      "Millet Pancake Mix",
      "Millet Penne Pasta",
      "Millet Noodles Masala",
      "Jowar Khakhra Masala",
    ],
  },
  {
    id: "protein-snack-box",
    name: "Protein Snack Box",
    price: 799,
    image: "images/products/dry-fruits.jpg",
    contains: [
      "Protein Date Nut Bites",
      "Nutri Crunch Bites",
      "Roasted Makhana Peri Peri",
      "Ragi Choco Millet Cookies",
    ],
  },
];

const CATALOG_MAP = [...PRODUCTS, ...OFFERS].reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

function formatINR(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function getCartCount(cart = readCart()) {
  return cart.reduce((count, item) => count + item.qty, 0);
}

function getCartSubtotal(cart = readCart()) {
  return cart.reduce((total, item) => total + item.price * item.qty, 0);
}

function getCartSummary(cart = readCart(), coupon = "") {
  const subtotal = getCartSubtotal(cart);
  const shipping = subtotal > 599 || subtotal === 0 ? 0 : 49;
  const couponCodes = { MANJU10: 0.1, HEALTHY15: 0.15, TASTY20: 0.2 };
  const couponDiscount = couponCodes[coupon] ? Math.round(subtotal * couponCodes[coupon]) : 0;
  const autoDiscount = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  const total = Math.max(subtotal + shipping - couponDiscount - autoDiscount, 0);
  return { subtotal, shipping, couponDiscount, autoDiscount, total };
}

function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => toast.classList.add("toast-hide"), 2200);
  window.setTimeout(() => toast.remove(), 2600);
}

function syncCartBadges() {
  const count = getCartCount();
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "grid" : "none";
  });
}

function addItemToCart(item, qty = 1) {
  const cart = readCart();
  const found = cart.find((entry) => entry.id === item.id);
  if (found) {
    found.qty += qty;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      qty,
    });
  }
  writeCart(cart);
  syncCartBadges();
}

function addToCartById(itemId, qty = 1) {
  const item = CATALOG_MAP[itemId];
  if (!item) return;
  addItemToCart(item, qty);
  showToast(`${item.name} added to cart`);
}

function removeFromCart(itemId) {
  const cart = readCart().filter((item) => item.id !== itemId);
  writeCart(cart);
  syncCartBadges();
}

function updateCartQty(itemId, delta) {
  const cart = readCart();
  const item = cart.find((entry) => entry.id === itemId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  writeCart(cart);
  syncCartBadges();
}

function clearCart() {
  writeCart([]);
  syncCartBadges();
}

function bindGlobalAddToCart() {
  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    if (button.dataset.boundCart === "1") return;
    button.dataset.boundCart = "1";
    button.addEventListener("click", () => {
      const itemId = button.dataset.addToCart;
      const qtyTarget = button.dataset.qtyTarget;
      let qty = 1;

      if (qtyTarget) {
        const input = document.querySelector(qtyTarget);
        qty = Math.max(1, Number.parseInt(input?.value || "1", 10));
      }

      addToCartById(itemId, qty);
      button.classList.add("is-adding");
      window.setTimeout(() => button.classList.remove("is-adding"), 380);
    });
  });
}

function initFloatingNavbar() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  const toggleBtn = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

  if (!toggleBtn || !mobileMenu) return;

  const syncMenuState = () => {
    if (!mobileBreakpoint.matches) {
      toggleBtn.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
      return;
    }

    const isOpen = mobileMenu.classList.contains("is-open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  toggleBtn.setAttribute("aria-expanded", "false");

  toggleBtn.addEventListener("click", () => {
    if (!mobileBreakpoint.matches) return;

    mobileMenu.classList.toggle("is-open");
    toggleBtn.classList.toggle("is-open");
    toggleBtn.setAttribute(
      "aria-expanded",
      mobileMenu.classList.contains("is-open") ? "true" : "false"
    );
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleBtn.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });

  if (typeof mobileBreakpoint.addEventListener === "function") {
    mobileBreakpoint.addEventListener("change", syncMenuState);
  } else if (typeof mobileBreakpoint.addListener === "function") {
    mobileBreakpoint.addListener(syncMenuState);
  }

  syncMenuState();
}

function initPageTransitions() {
  const body = document.body;
  body.classList.add("page-visible");

  const canTransition = (link) => {
    if (!link) return false;
    if (link.target === "_blank" || link.hasAttribute("download")) return false;
    if (link.dataset.noTransition !== undefined) return false;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return false;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (error) {
      return false;
    }

    if (!["http:", "https:"].includes(url.protocol)) return false;
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.hash) return false;

    return true;
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!canTransition(link)) return;
    if (document.body.classList.contains("page-leaving")) return;

    event.preventDefault();
    document.body.classList.add("page-leaving");
    window.setTimeout(() => {
      window.location.href = link.href;
    }, PAGE_TRANSITION_MS);
  });
}

function bindQuantityButtons() {
  document.querySelectorAll("[data-qty-minus]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.qtyMinus);
      if (!target) return;
      const nextValue = Math.max(1, Number.parseInt(target.value || "1", 10) - 1);
      target.value = String(nextValue);
    });
  });

  document.querySelectorAll("[data-qty-plus]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.qtyPlus);
      if (!target) return;
      const nextValue = Math.max(1, Number.parseInt(target.value || "1", 10) + 1);
      target.value = String(nextValue);
    });
  });
}

function initShopPage() {
  const grid = document.querySelector("#shopProducts");
  if (!grid) return;

  const renderProducts = (category = "all") => {
    const items = category === "all"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === category);

    grid.innerHTML = items.map((product) => `
      <article class="product-card glass-card">
        <a href="product.html?id=${product.id}" class="product-image-wrap" aria-label="${product.name}">
          <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" />
        </a>
        <div class="product-content">
          <p class="product-category">${product.category.replace(/-/g, " ")}</p>
          <h3 class="product-title"><a href="product.html?id=${product.id}">${product.name}</a></h3>
          <p class="product-price">${formatINR(product.price)}</p>
          <button class="btn btn-primary" data-add-to-cart="${product.id}">Add to Cart</button>
        </div>
      </article>
    `).join("");

    bindGlobalAddToCart();
    const resultCount = document.querySelector("#shopResultCount");
    if (resultCount) resultCount.textContent = `${items.length} products`;
  };

  renderProducts("all");

  document.querySelectorAll("[data-category-filter]").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("[data-category-filter]").forEach((button) => {
        button.classList.remove("pill-active");
      });
      pill.classList.add("pill-active");
      renderProducts(pill.dataset.categoryFilter || "all");
    });
  });
}

function initProductPage() {
  const target = document.querySelector("#productDetail");
  if (!target) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || PRODUCTS[0].id;
  const product = CATALOG_MAP[productId] || PRODUCTS[0];

  target.querySelector("#productImage").src = product.image;
  target.querySelector("#productImage").alt = product.name;
  target.querySelector("#productName").textContent = product.name;
  target.querySelector("#productPrice").textContent = formatINR(product.price);
  target.querySelector("#productDescription").textContent = product.description;
  target.querySelector("#productBreadcrumb").textContent = product.name;
  target.querySelector("#addProductToCart").dataset.addToCart = product.id;

  const tags = target.querySelector("#productTags");
  tags.innerHTML = product.tags.map((tag) => `<span class="tag-chip">${tag}</span>`).join("");

  bindGlobalAddToCart();
}

function renderCartPage() {
  const cartItemsContainer = document.querySelector("#cartItems");
  if (!cartItemsContainer) return;

  const cart = readCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart glass-card">
        <h3>Your cart is empty</h3>
        <p>Pick your healthy favorites from our shop.</p>
        <a class="btn btn-primary" href="shop.html">Go To Shop</a>
      </div>
    `;
    renderCartTotals();
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item) => `
    <article class="cart-item glass-card">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
      <div class="cart-item-main">
        <h3>${item.name}</h3>
        <p>${formatINR(item.price)} each</p>
      </div>
      <div class="cart-item-controls">
        <div class="qty-box">
          <button type="button" data-cart-minus="${item.id}" aria-label="Decrease quantity">-</button>
          <span>${item.qty}</span>
          <button type="button" data-cart-plus="${item.id}" aria-label="Increase quantity">+</button>
        </div>
        <p class="cart-line-total">${formatINR(item.price * item.qty)}</p>
        <button type="button" class="link-btn" data-cart-remove="${item.id}">Remove</button>
      </div>
    </article>
  `).join("");

  cartItemsContainer.querySelectorAll("[data-cart-minus]").forEach((button) => {
    button.addEventListener("click", () => {
      updateCartQty(button.dataset.cartMinus, -1);
      renderCartPage();
    });
  });

  cartItemsContainer.querySelectorAll("[data-cart-plus]").forEach((button) => {
    button.addEventListener("click", () => {
      updateCartQty(button.dataset.cartPlus, 1);
      renderCartPage();
    });
  });

  cartItemsContainer.querySelectorAll("[data-cart-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.cartRemove);
      showToast("Item removed", "info");
      renderCartPage();
    });
  });

  renderCartTotals();
}

function renderCartTotals(coupon = "") {
  const summary = getCartSummary(readCart(), coupon);

  const subtotal = document.querySelector("#cartSubtotal");
  const shipping = document.querySelector("#cartShipping");
  const discount = document.querySelector("#cartDiscount");
  const total = document.querySelector("#cartTotal");

  if (subtotal) subtotal.textContent = formatINR(summary.subtotal);
  if (shipping) shipping.textContent = summary.shipping === 0 ? "FREE" : formatINR(summary.shipping);
  if (discount) discount.textContent = `-${formatINR(summary.autoDiscount + summary.couponDiscount)}`;
  if (total) total.textContent = formatINR(summary.total);
}

function initCartPage() {
  if (!document.querySelector("#cartItems")) return;

  renderCartPage();

  const clearBtn = document.querySelector("#clearCartBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearCart();
      showToast("Cart cleared", "info");
      renderCartPage();
    });
  }

  const couponInput = document.querySelector("#cartCouponInput");
  const couponApply = document.querySelector("#cartCouponApply");

  if (couponInput && couponApply) {
    couponApply.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();
      const validCodes = ["MANJU10", "HEALTHY15", "TASTY20"];
      if (!validCodes.includes(code)) {
        showToast("Invalid coupon code", "error");
        renderCartTotals();
        return;
      }
      showToast(`${code} applied`, "success");
      renderCartTotals(code);
    });
  }
}

function initCheckoutPage() {
  const orderItems = document.querySelector("#checkoutItems");
  if (!orderItems) return;

  const cart = readCart();
  if (cart.length === 0) {
    orderItems.innerHTML = `<p class="checkout-empty">Your cart is empty. <a href="shop.html">Add products</a></p>`;
  } else {
    orderItems.innerHTML = cart.map((item) => `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <p>${item.name}</p>
          <small>${item.qty} x ${formatINR(item.price)}</small>
        </div>
        <strong>${formatINR(item.qty * item.price)}</strong>
      </div>
    `).join("");
  }

  const couponInput = document.querySelector("#checkoutCouponInput");
  const couponApply = document.querySelector("#checkoutCouponApply");
  let activeCoupon = "";

  const updateCheckoutTotals = () => {
    const summary = getCartSummary(readCart(), activeCoupon);
    document.querySelector("#checkoutSubtotal").textContent = formatINR(summary.subtotal);
    document.querySelector("#checkoutShipping").textContent = summary.shipping === 0 ? "FREE" : formatINR(summary.shipping);
    document.querySelector("#checkoutDiscount").textContent = `-${formatINR(summary.autoDiscount + summary.couponDiscount)}`;
    document.querySelector("#checkoutTotal").textContent = formatINR(summary.total);
  };

  updateCheckoutTotals();

  if (couponInput && couponApply) {
    couponApply.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();
      const validCodes = ["MANJU10", "HEALTHY15", "TASTY20"];
      if (!validCodes.includes(code)) {
        activeCoupon = "";
        showToast("Invalid coupon code", "error");
        updateCheckoutTotals();
        return;
      }
      activeCoupon = code;
      showToast(`${code} applied`, "success");
      updateCheckoutTotals();
    });
  }

  const checkoutForm = document.querySelector("#checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const fullName = document.querySelector("#fullName")?.value.trim();
      const address = document.querySelector("#addressLine")?.value.trim();
      const payment = document.querySelector("input[name='paymentMethod']:checked");

      if (!fullName || !address || !payment) {
        showToast("Please complete delivery and payment details", "error");
        return;
      }

      clearCart();
      showToast("Order placed successfully");
      window.setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    });
  }
}

function initOffersPage() {
  const offersGrid = document.querySelector("#offersGrid");
  if (!offersGrid) return;

  offersGrid.innerHTML = OFFERS.map((offer) => `
    <article class="offer-card glass-card">
      <img src="${offer.image}" alt="${offer.name}" class="offer-image" />
      <div class="offer-content">
        <h3>${offer.name}</h3>
        <p>${offer.contains.join(" • ")}</p>
        <div class="offer-action-row">
          <strong>${formatINR(offer.price)}</strong>
          <button class="btn btn-primary" data-add-to-cart="${offer.id}">Add Combo</button>
        </div>
      </div>
    </article>
  `).join("");

  bindGlobalAddToCart();
}

function initHomeBestSellers() {
  const bestSellerGrid = document.querySelector("#bestSellerGrid");
  if (!bestSellerGrid) return;

  const bestSellers = PRODUCTS.slice(0, 5);
  bestSellerGrid.innerHTML = bestSellers.map((product) => `
    <article class="product-card glass-card">
      <a href="product.html?id=${product.id}" class="product-image-wrap" aria-label="${product.name}">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" />
      </a>
      <div class="product-content">
        <h3 class="product-title"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p class="product-price">${formatINR(product.price)}</p>
        <button class="btn btn-primary" data-add-to-cart="${product.id}">Add to Cart</button>
      </div>
    </article>
  `).join("");

  bindGlobalAddToCart();
}

function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

function init() {
  initPageTransitions();
  initFloatingNavbar();
  syncCartBadges();
  initMobileMenu();
  bindQuantityButtons();
  bindGlobalAddToCart();
  initHomeBestSellers();
  initShopPage();
  initProductPage();
  initCartPage();
  initCheckoutPage();
  initOffersPage();
  initYear();
}

document.addEventListener("DOMContentLoaded", init);
