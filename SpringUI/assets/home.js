renderHeader("home");

let activeCategoryId = "";
let searchTimer = null;
const hiddenProductNames = new Set(["portable bluetooth speaker"]);

const productImages = {
	"wireless headphones": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80",
	    "mechanical keyboard": "https://www.redragon.in/cdn/shop/files/9_f8b13895-b9ee-4116-bc74-805598c9ff57.jpg?v=1781332434&width=1500",
	    "smart watch": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlH0Xc3rEixkAwpOKuuPfFDIVvVDLEd_KmpDXG0vBE7w&s=10",
	    "usb c fast charger": "https://m.media-amazon.com/images/I/51cKfY2OngL._AC_UF1000,1000_QL80_.jpg",
	    "ceramic coffee mug": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXZc6V-s6SeQi_29obREdrMY8AY1U3VQpD-UFJnBFYGQ&s=10",
	    "bamboo cutting board": "https://images.meesho.com/images/products/513326748/64dq8_512.jpg",
	    "stainless steel bottle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyKjAWSr6MtPOsYvHFojeTvF9JgB3asPhwL1J8msczNg&s=10",
	    "cotton bedsheet set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeMWBlrmUCY6zBSbb5NGffLF_hHKXfUcf0ptdWl6EJ6A&s=10",
	    "desk organizer": "https://m.media-amazon.com/images/I/71bRiyB8hOL.jpg",
	    "canvas backpack": "https://m.media-amazon.com/images/I/81zBwiDEEdL._AC_UY1100_.jpg",
	    "classic wrist watch": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",
	    "cotton t shirt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQbEyblPLK1evsuPegR72w8kBGXS_MgwAWbeTaoPU5BA&s=10",
	    "leather wallet": "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80",
	    "running shoes": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCS_L8mMetIFyuvFFF3FeA4yIEJhQaCLuwjEZaSj4XmQ&s",
	    "face moisturizer": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=700&q=80",
	    "herbal shampoo": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80",
	    "sunscreen spf 50": "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80",
	    "aloe vera face wash": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd9nbntgdKvwnOPOZs3Kcm2m0d923SLYV1680OqUidkQ&s=10",
	    "lip balm set": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80",
	    "yoga mat": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80",
	    "insulated sports bottle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqc1m5-gfv9Vt-5HF0LWDkn-avTdz5ANShU1VHKnvtcA&s=10",
	    "resistance bands set": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKY4ACNw81OJkX6MbvXP48vlNinngrtsBYpU0Z2JMyRw&s",
	    "badminton racket": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9wdrCHZr_oVawKJvnCJFRlqKQIR2_jjplPnI5JeeC1A&s=100",
	    "the alchemist": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjmytJIlLLz6Zhh5ZJSwyTun8tvdLvyleVcUYDqoZnAg&s=10",
	    "atomic habits": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiP74ECROJBT1O9dcP4vTT3XzzBK52PRvo4e9-accsXw&s",
	    "clean code": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyxl9sagqZvUg3EGWCRAosCpBnDlA26C47ecX57NMJpA&s=10",
	    "the little prince": "data:image/jpeg;base64,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"          };

function normalizeProductName(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ");
}

function dedupeProducts(products) {
  const seen = new Set();
  return (products || []).filter((product) => {
    const key = normalizeProductName(product && product.name);
    if (!key || hiddenProductNames.has(key) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function productImage(product) {
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
        <img src="${image}" alt="${escapeHtml(product.name)}" loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
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
