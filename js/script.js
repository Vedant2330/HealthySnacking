/* Healthy Snacking - Shared storefront behavior */

const STORAGE_KEY = "manju_foods_cart_v1";
const PAGE_TRANSITION_MS = 360;
const REVEAL_TARGET_SELECTORS = [
  ".page-banner .container",
  ".section > .container",
  ".category-card",
  ".product-card",
  ".feature-card",
  ".benefit-card",
  ".combo-card",
  ".offer-card",
  ".philosophy-card",
  ".cart-item",
  ".banner-card",
  ".hero-copy > *",
  ".hero-image-box",
  ".story-content > *",
  ".story-image-wrap",
  ".about-copy",
  ".product-detail-content > *",
  ".product-detail-image",
  ".summary-card",
  ".form-card",
  ".order-card",
  ".footer-grid > div",
  ".section-title",
  ".section-heading",
  ".testimonial-card",
  ".benefit-trust-card",
  ".instagram-item",
];

/* Animation variant classes that the IntersectionObserver also observes */
const REVEAL_VARIANT_CLASSES = ["reveal", "reveal-fade", "reveal-left", "reveal-right", "reveal-scale"];

let revealObserver = null;

const PRODUCTS = [
  {
    id: "healthy-crunch-seeds-mix",
    name: "Healthy Seed Mix",
    price: 229,
    image: "images/products/seed-mix.jpg",
    category: "healthy-snacks",
    rating: 4.8,
    description: "A demo snack product blending seeds, grains, and everyday crunch.",
    tags: ["High Protein", "High Fibre", "No Palm Oil"],
  },
  {
    id: "power-crunch-masala-dry-fruits",
    name: "Roasted Dry Fruit Mix",
    price: 309,
    image: "images/products/dry-fruits.jpg",
    category: "healthy-snacks",
    rating: 4.7,
    description: "A premium-style dry fruit mix concept for snack and food brand catalogs.",
    tags: ["Roasted", "Millet Based", "Energy Boost"],
  },
  {
    id: "anjeer-nuts-pop-bites",
    name: "Fruit & Nut Snack Bites",
    price: 329,
    image: "images/products/dry-fruits.jpg",
    category: "cookies",
    rating: 4.9,
    description: "A modern bite-size snack concept with fruit, nuts, and on-the-go appeal.",
    tags: ["No Refined Sugar", "High Fibre", "No Palm Oil"],
  },
  {
    id: "nutri-crunch-bites",
    name: "Crunchy Protein Bites",
    price: 329,
    image: "images/products/seed-mix.jpg",
    category: "healthy-snacks",
    rating: 4.7,
    description: "A demo protein snack product made to showcase premium packaging-friendly content.",
    tags: ["High Protein", "Roasted", "Travel Friendly"],
  },
  {
    id: "protein-date-nut-bites",
    name: "Date & Nut Energy Bites",
    price: 299,
    image: "images/products/dry-fruits.jpg",
    category: "healthy-snacks",
    rating: 4.8,
    description: "A clean-label energy bite concept for wellness-led snack brands.",
    tags: ["Natural Sweetness", "High Protein", "No Palm Oil"],
  },
  {
    id: "bajra-noodles",
    name: "Millet Noodles",
    price: 189,
    image: "images/products/millet-noodles.jpg",
    category: "millet-noodles",
    rating: 4.6,
    description: "A pantry-friendly noodle product designed for modern healthy food brands.",
    tags: ["Millet Based", "No Maida", "Family Pack"],
  },
  {
    id: "millet-penne-pasta",
    name: "Millet Pasta",
    price: 209,
    image: "images/products/millet-noodles.jpg",
    category: "millet-pasta",
    rating: 4.6,
    description: "A pasta product concept that fits health-focused pantry collections.",
    tags: ["High Fibre", "No Maida", "Italian Style"],
  },
  {
    id: "jowar-khakhra",
    name: "Roasted Millet Crisps",
    price: 169,
    image: "images/products/khakhra.jpg",
    category: "khakhra",
    rating: 4.5,
    description: "A crisp savory snack concept for brands selling light roasted munchies.",
    tags: ["Roasted", "Light Snack", "Tea Time"],
  },
  {
    id: "millet-cookies",
    name: "Millet Cookies",
    price: 199,
    image: "images/products/cookies.jpg",
    category: "cookies",
    rating: 4.7,
    description: "A demo cookie product balancing indulgence, grains, and everyday snacking.",
    tags: ["Kids Favorite", "No Palm Oil", "Millet Based"],
  },
  {
    id: "peri-peri-makhana",
    name: "Roasted Makhana",
    price: 179,
    image: "images/products/makhana.jpg",
    category: "roasted-makhana",
    rating: 4.7,
    description: "A roasted foxnut concept for clean, modern healthy snack assortments.",
    tags: ["Roasted Not Fried", "Low Calorie", "High Fibre"],
  },
  {
    id: "millet-pancake-mix",
    name: "Millet Pancake Mix",
    price: 219,
    image: "images/products/pancake-mix.jpg",
    category: "pancake-mix",
    rating: 4.6,
    description: "A breakfast-ready mix concept that works well in premium pantry collections.",
    tags: ["Breakfast", "Millet Based", "Quick Prep"],
  },
  {
    id: "instant-upma-premix",
    name: "Savory Millet Premix",
    price: 159,
    image: "images/products/premix.jpg",
    category: "instant-premix",
    rating: 4.5,
    description: "A quick-prep savory premix concept for convenient meal and breakfast ranges.",
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
      "Healthy Seed Mix",
      "Fruit & Nut Snack Bites",
      "Roasted Dry Fruit Mix",
    ],
  },
  {
    id: "millet-breakfast-combo",
    name: "Millet Breakfast Combo",
    price: 658,
    image: "images/products/millet-noodles.jpg",
    contains: [
      "Millet Pancake Mix",
      "Millet Pasta",
      "Millet Noodles",
      "Roasted Millet Crisps",
    ],
  },
  {
    id: "protein-snack-box",
    name: "Protein Snack Box",
    price: 799,
    image: "images/products/dry-fruits.jpg",
    contains: [
      "Date & Nut Energy Bites",
      "Crunchy Protein Bites",
      "Roasted Makhana",
      "Millet Cookies",
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
  const couponCodes = { DEMO10: 0.1, HEALTHY15: 0.15, TEMPLATE20: 0.2 };
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

function triggerCartBounce() {
  document.querySelectorAll(".cart-link svg").forEach((icon) => {
    icon.classList.remove("cart-bounce");
    // Force reflow to restart animation when clicks happen rapidly.
    void icon.offsetWidth;
    icon.classList.add("cart-bounce");
    icon.addEventListener("animationend", () => {
      icon.classList.remove("cart-bounce");
    }, { once: true });
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
      triggerCartBounce();
      button.classList.add("is-adding");
      window.setTimeout(() => button.classList.remove("is-adding"), 380);
    });
  });
}

function refreshScrollReveal(scope = document) {
  const root = scope && typeof scope.querySelectorAll === "function" ? scope : document;
  const targets = new Set(root.querySelectorAll(REVEAL_TARGET_SELECTORS.join(",")));

  /* Collect elements with any reveal variant class */
  REVEAL_VARIANT_CLASSES.forEach((cls) => {
    root.querySelectorAll(`.${cls}`).forEach((element) => {
      targets.add(element);
    });
  });

  targets.forEach((element) => {
    const siblingIndex = element.parentElement
      ? Array.prototype.indexOf.call(element.parentElement.children, element)
      : 0;
    const revealDelay = Math.min(Math.max(siblingIndex, 0) * 55, 220);
    element.style.setProperty("--reveal-delay", `${revealDelay}ms`);

    /* Only add base .reveal class if no variant class is present */
    const hasVariant = REVEAL_VARIANT_CLASSES.some((cls) => element.classList.contains(cls));
    if (!hasVariant) element.classList.add("reveal");

    if (element.classList.contains("show")) return;

    if (revealObserver) {
      revealObserver.observe(element);
      return;
    }

    element.classList.add("show");
    element.classList.add("active");
  });
}

function initScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    refreshScrollReveal();
    REVEAL_VARIANT_CLASSES.forEach((cls) => {
      document.querySelectorAll(`.${cls}`).forEach((element) => {
        element.classList.add("show");
        element.classList.add("active");
      });
    });
    return;
  }

  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // Add staggered animation delay
      const delay = entry.target.style.getPropertyValue("--reveal-delay") || "0ms";
      entry.target.style.transitionDelay = delay;
      entry.target.classList.add("show");
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -10% 0px",
  });

  refreshScrollReveal();
}

function initFloatingNavbar() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const mobileBreakpoint = window.matchMedia("(max-width: 768px)");
  const scrollThreshold = 30;
  const hideThreshold = 110;
  const scrollDelta = 8;
  let lastScrollY = window.scrollY;
  let ticking = false;

  const syncHeaderState = () => {
    const currentScrollY = window.scrollY;
    header.classList.toggle("is-scrolled", currentScrollY > scrollThreshold);

    if (mobileBreakpoint.matches) {
      const isScrollingDown = currentScrollY > lastScrollY + scrollDelta;
      const isScrollingUp = currentScrollY < lastScrollY - scrollDelta;

      if (isScrollingDown && currentScrollY > hideThreshold) {
        header.classList.add("is-hidden");
      } else if (isScrollingUp || currentScrollY <= scrollThreshold) {
        header.classList.remove("is-hidden");
      }
    } else {
      header.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(syncHeaderState);
  };

  syncHeaderState();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (typeof mobileBreakpoint.addEventListener === "function") {
    mobileBreakpoint.addEventListener("change", syncHeaderState);
  } else if (typeof mobileBreakpoint.addListener === "function") {
    mobileBreakpoint.addListener(syncHeaderState);
  }
}

function initMobileMenu() {
  const toggleBtn = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileBreakpoint = window.matchMedia("(max-width: 768px)");
  const body = document.body;

  if (!toggleBtn || !mobileMenu) return;

  const closeMenu = () => {
    toggleBtn.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  };

  const openMenu = () => {
    toggleBtn.classList.add("is-open");
    mobileMenu.classList.add("is-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    body.classList.add("menu-open");
  };

  const syncMenuState = () => {
    if (!mobileBreakpoint.matches) {
      closeMenu();
      return;
    }

    const isOpen = mobileMenu.classList.contains("is-open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    body.classList.toggle("menu-open", isOpen);
  };

  toggleBtn.setAttribute("aria-expanded", "false");

  toggleBtn.addEventListener("click", () => {
    if (!mobileBreakpoint.matches) return;
    if (mobileMenu.classList.contains("is-open")) {
      closeMenu();
      return;
    }
    openMenu();
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!mobileBreakpoint.matches || !mobileMenu.classList.contains("is-open")) return;
    const clickedToggle = event.target.closest("[data-menu-toggle]");
    const clickedMenu = event.target.closest("[data-mobile-menu]");
    if (clickedToggle || clickedMenu) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !mobileMenu.classList.contains("is-open")) return;
    closeMenu();
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
    refreshScrollReveal(grid);
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
    refreshScrollReveal(cartItemsContainer);
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
  refreshScrollReveal(cartItemsContainer);
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
      const validCodes = ["DEMO10", "HEALTHY15", "TEMPLATE20"];
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

  refreshScrollReveal(orderItems);

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
      const validCodes = ["DEMO10", "HEALTHY15", "TEMPLATE20"];
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
  refreshScrollReveal(offersGrid);
}

function initHomeBestSellers() {
  const bestSellerGrid = document.querySelector("#bestSellerGrid");
  if (!bestSellerGrid) return;

  const bestSellers = PRODUCTS.slice(0, 5);
  bestSellerGrid.innerHTML = bestSellers.map((product) => `
    <article class="product-card glass-card reveal">
      <a href="product.html?id=${product.id}" class="product-image-wrap" aria-label="${product.name}">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" />
      </a>
      <div class="product-content">
        <p class="product-category">${product.category.replace(/-/g, " ")}</p>
        <h3 class="product-title"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <div style="display: flex; gap: 0.2rem;">
            ${Array(5).fill(0).map(() => `<svg width="14" height="14" viewBox="0 0 16 16" fill="#c6a96a" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5L9.5 6H14L10.5 9L12 13.5L8 10.5L4 13.5L5.5 9L2 6H6.5L8 1.5Z"/></svg>`).join('')}
          </div>
          <span style="font-size: 0.85rem; color: #6B6B6B;">${product.rating}</span>
        </div>
        <p class="product-price">${formatINR(product.price)}</p>
        <button class="btn btn-primary" data-add-to-cart="${product.id}">Add to Cart</button>
      </div>
    </article>
  `).join("");

  bindGlobalAddToCart();
  refreshScrollReveal(bestSellerGrid);
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
  initScrollReveal();
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

window.addEventListener("load", () => {
  if (!window.matchMedia("(min-width: 1024px)").matches) return;
  document.querySelectorAll(".hero-image-box .hero-overlay,.hero-image-box .hero-mask,.hero-image-box .hero-loader,.hero-image-box .reveal-bar").forEach((element) => {
    element.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", init);
