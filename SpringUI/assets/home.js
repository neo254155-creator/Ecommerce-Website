renderHeader("home");

let activeCategoryId = "";
let searchTimer = null;

function normalizeProductName(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ");
}

function dedupeProducts(products) {
  const seen = new Set();
  return (products || []).filter((product) => {
    const key = normalizeProductName(product && product.name);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function productImage(product) {
  const productImages = {
    "wireless headphones": "https://loremflickr.com/700/700/wireless,headphones",
    "mechanical keyboard": "https://loremflickr.com/700/700/mechanical,keyboard",
    "smart watch": "https://loremflickr.com/700/700/smartwatch",
    "portable bluetooth speaker": "https://loremflickr.com/700/700/bluetooth,speaker",
    "usb c fast charger": "https://loremflickr.com/700/700/usb,charger",
    "ceramic coffee mug": "https://loremflickr.com/700/700/coffee,mug",
    "bamboo cutting board": "https://loremflickr.com/700/700/bamboo,cutting,board",
    "stainless steel bottle": "https://loremflickr.com/700/700/stainless,steel,bottle",
    "cotton bedsheet set": "https://loremflickr.com/700/700/bedsheet",
    "desk organizer": "https://loremflickr.com/700/700/desk,organizer",
    "canvas backpack": "https://loremflickr.com/700/700/canvas,backpack",
    "classic wrist watch": "https://loremflickr.com/700/700/wristwatch",
    "cotton t shirt": "https://loremflickr.com/700/700/cotton,tshirt",
    "leather wallet": "https://loremflickr.com/700/700/leather,wallet",
    "running shoes": "https://loremflickr.com/700/700/running,shoes",
    "face moisturizer": "https://loremflickr.com/700/700/moisturizer",
    "herbal shampoo": "https://loremflickr.com/700/700/shampoo",
    "sunscreen spf 50": "https://loremflickr.com/700/700/sunscreen",
    "aloe vera face wash": "https://loremflickr.com/700/700/aloe,face,wash",
    "lip balm set": "https://loremflickr.com/700/700/lip,balm",
    "yoga mat": "https://loremflickr.com/700/700/yoga,mat",
    "insulated sports bottle": "https://loremflickr.com/700/700/sports,bottle",
    "resistance bands set": "https://loremflickr.com/700/700/resistance,bands",
    "badminton racket": "https://loremflickr.com/700/700/badminton,racket",
    "the alchemist": "https://loremflickr.com/700/700/the,alchemist,book",
    "atomic habits": "https://loremflickr.com/700/700/atomic,habits,book",
    "clean code": "https://loremflickr.com/700/700/clean,code,book",
    "the little prince": "https://loremflickr.com/700/700/the,little,prince,book"
  };

  return productImages[normalizeProductName(product && product.name)] || "";
}

function productCardHTML(product) {
  const color = tileColorFor(product.name || "?");
  const image = productImage(product);
  const description = product.description || `${product.categoryName || "Quality"} product for everyday use.`;
  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= 5;

  let stockLabel = `<span class="stock-pill in">In stock</span>`;
  if (lowStock) stockLabel = `<span class="stock-pill low">Only ${product.stock} left</span>`;
  if (!inStock) stockLabel = `<span class="stock-pill out">Out of stock</span>`;

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-tile" style="background:${color};">
        ${image ? `<img src="${image}" alt="${escapeHtml(product.name)}" loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` : ""}
        <span class="product-image-fallback">${initials(product.name)}</span>
      </div>
      <div class="product-body">
        <div class="product-name">${escapeHtml(product.name)}</div>
        <div class="product-desc">${escapeHtml(description)}</div>
        <div class="product-meta">
          <span class="product-price">₹${Number(product.price).toFixed(0)}</span>
          ${stockLabel}
        </div>
        <div class="add-row">
          <button class="btn btn-primary btn-block add-to-cart-btn" ${inStock ? "" : "disabled"}>
            Add to cart
          </button>
        </div>
      </div>
    </div>`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderProducts(products) {
  const grid = document.getElementById("product-grid");
  const cleanProducts = dedupeProducts(products);

  if (!cleanProducts || cleanProducts.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <div class="icon-circle">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        </div>
        <h3>Nothing turned up</h3>
        <p>Try a different search term or category.</p>
      </div>`;
    return;
  }

  grid.innerHTML = cleanProducts.map(productCardHTML).join("");

  grid.querySelectorAll(".product-card").forEach((card) => {
    const addBtn = card.querySelector(".add-to-cart-btn");

    addBtn.addEventListener("click", async () => {
      if (!isLoggedIn()) {
        toast("Log in to add items to your cart.");
        setTimeout(() => (window.location.href = "login.html"), 500);
        return;
      }
      const productId = Number(card.dataset.productId);
      const quantity = 1;
      const user = getCurrentUser();
      const userId = user ? Number(user.userId) : NaN;

      if (!Number.isFinite(userId)) {
        toast("Your login session is not valid. Please log in again.", "error");
        return;
      }

      addBtn.disabled = true;
      const original = addBtn.textContent;
      addBtn.textContent = "Adding…";
      try {
        // Your CartItemRequestDto reads the product id off a field called
        // "id" (see CartServiceImpl: cartItemRequestDto.getId()) - not
        // "productId". Sending the wrong key here silently maps to null
        // on the backend, so this has to match exactly.
        await apiFetch(`/api/cart/${userId}/items`, {
          method: "POST",
          body: { id: productId, quantity },
        });
        toast("Added to cart.");
        refreshCartBadge();
      } catch (err) {
        toast(err.message, "error");
      } finally {
        addBtn.disabled = false;
        addBtn.textContent = original;
      }
    });
  });
}

async function loadCategories() {
  try {
    const categories = await apiFetch("/api/categories", { auth: false });
    const row = document.getElementById("category-chips");
    (categories || []).forEach((cat) => {
      const chip = document.createElement("button");
      chip.className = "chip";
      chip.textContent = cat.name;
      chip.dataset.category = cat.id;
      chip.addEventListener("click", () => selectCategory(cat.id, chip));
      row.appendChild(chip);
    });
    document.querySelector('.chip[data-category=""]').addEventListener("click", (e) => selectCategory("", e.target));
  } catch (err) {
    // categories are a nice-to-have filter - don't block the page if they fail to load
    console.warn("Could not load categories:", err.message);
  }
}

function selectCategory(categoryId, chipEl) {
  activeCategoryId = categoryId;
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  chipEl.classList.add("active");
  document.getElementById("search-input").value = "";
  loadProducts();
}

async function loadProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = Array.from({ length: 6 })
    .map(() => `<div class="skeleton" style="height:270px;"></div>`)
    .join("");

  try {
    let products;
    const searchTerm = document.getElementById("search-input").value.trim();

    if (searchTerm) {
      const allProducts = await apiFetch("/api/products", { auth: false });
      const searchText = normalizeProductName(searchTerm);
      const queryParts = searchText.split(" ").filter(Boolean);

      products = (allProducts || []).filter((product) => {
        const name = normalizeProductName(product && product.name);

        if (!name) return false;

        if (name === searchText) return true;
        if (name.includes(searchText)) return true;

        return queryParts.length > 0 && queryParts.every((part) => name.includes(part));
      });
    } else if (activeCategoryId) {
      products = await apiFetch(`/api/products/category/${activeCategoryId}`, { auth: false });
    } else {
      products = await apiFetch("/api/products", { auth: false });
    }
    renderProducts(products);
  } catch (err) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <h3>Couldn't load products</h3>
        <p>${escapeHtml(err.message)}</p>
      </div>`;
  }
}

document.getElementById("search-input").addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(loadProducts, 350);
});

loadCategories();
loadProducts();
