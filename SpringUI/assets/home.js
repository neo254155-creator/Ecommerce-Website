renderHeader("home");

let activeCategoryId = "";
let searchTimer = null;

const productImages = {
	"wireless headphones": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80",
	    "mechanical keyboard": "https://www.redragon.in/cdn/shop/files/9_f8b13895-b9ee-4116-bc74-805598c9ff57.jpg?v=1781332434&width=1500",
	    "smart watch": "https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/4/2/u/-enriched-transparent-original-imah2gmfkdccr5h3.png?q=20",
	    "portable bluetooth speaker": "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=700&q=80",
	    "usb c fast charger": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80",
	    "ceramic coffee mug": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80",
	    "bamboo cutting board": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
	    "stainless steel bottle": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80",
	    "cotton bedsheet set": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80",
	    "desk organizer": "https://images.unsplash.com/photo-1494438639940-9ebd6d95f6bf?auto=format&fit=crop&w=700&q=80",
	    "canvas backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
	    "classic wrist watch": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",
	    "cotton t shirt": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80",
	    "leather wallet": "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80",
	    "running shoes": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
	    "face moisturizer": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=700&q=80",
	    "herbal shampoo": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80",
	    "sunscreen spf 50": "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80",
	    "aloe vera face wash": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
	    "lip balm set": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80",
	    "yoga mat": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80",
	    "insulated sports bottle": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=80",
	    "resistance bands set": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=700&q=80",
	    "badminton racket": "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=700&q=80",
	    "the alchemist": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80",
	    "atomic habits": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80",
	    "clean code": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=80",
	    "the little prince": "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=700&q=80"          };

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

function mergeCuratedProducts(products) {
  const merged = [...dedupeProducts(products)];
  const existingNames = new Set(merged.map((product) => normalizeProductName(product.name)));

  curatedProducts.forEach((product) => {
    if (!existingNames.has(normalizeProductName(product.name))) {
      merged.push({ ...product, id: `${product.id}` });
      existingNames.add(normalizeProductName(product.name));
    }
  });

  return dedupeProducts(merged);
}

function productImage(product) {
  const productName = (product && product.name ? product.name : "").toLowerCase();
  const exactMatches = [
    { names: ["ergonomic mechanical keyboard"], url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMjFIb_yQJWFzV4IqU4bd87PUs7TmyrKzRzxn4kjBabA&s" },
    { names: ["rgb mechanical keyboard", "mechanical keyboard", "gaming keyboard"], url: "https://www.redragon.in/cdn/shop/files/9_f8b13895-b9ee-4116-bc74-805598c9ff57.jpg?v=1781332434&width=1500" },
    { names: ["smartwatch pro"], url: "https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/4/2/u/-enriched-transparent-original-imah2gmfkdccr5h3.png?q=20" },
    { names: ["classic breathable cotton t-shirt", "cotton t-shirt", "t-shirt"], url: "https://nobero.com/cdn/shop/files/Hopev2.jpg?v=1771572686" },
    { names: ["urban pro travel backpack", "urban travel bag"], url: "https://urbanjungle.shop/cdn/shop/files/RAVEN-1.jpg?v=1752151153&width=1000" },
    { names: ["speedflex lightweight running shoes", "running shoes", "lightweight running shoes", "sport shoes"], url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80" },
    { names: ["minimalist nordic desk lamp", "minimalist lamp", "desk lamp", "nordic desk lamp"], url: "https://www.homesake.in/cdn/shop/files/IH0F253-BK-PWT_Theme2.jpg?v=1757399379&width=1920" },
    { names: ["ceramic artisan coffee mug set"], url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKjytOr843q4nMj3-9oVQhQPnY8RPIumLdWSJh01Mxjg&s=10" },
    { names: ["coffee mug set", "ceramic coffee mug set", "mug set", "coffee mug"], url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ97ffds5R0A1JcVAMJPApGinRo7R73JOTILnoqUuBYJVed6X29zWMjDsM&s=10" },
    { names: ["wireless mouse", "computer mouse", "mouse"], url: "https://m.media-amazon.com/images/I/61iw9q2FAVL.jpg" },
    { names: ["yoga mat"], url: "https://www.cockatooindia.com/cdn/shop/files/61z-Ks-b0GL._SL1500.jpg?v=1737374339" },
    { names: ["face serum", "serum"], url: "https://m.media-amazon.com/images/I/51O3TUGD5FL._AC_UF1000,1000_QL80_.jpg" },
    { names: ["floral dress"], url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF_sV-LDw3X2uVXhtync0mwEPG-vW4orPASv_rDkUgNc_ELU_jr1Tfr6A&s=10" }
  ];

  const exactMatch = exactMatches.find((entry) => entry.names.some((name) => productName.includes(name)));
  if (exactMatch) return exactMatch.url;

  const keywordMatches = [
    { keywords: ["watch", "smartwatch", "timepiece", "wrist"], url: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["headphone", "earbud", "headset", "earphone", "audio"], url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["laptop", "notebook", "computer", "macbook", "keyboard"], url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["phone", "mobile", "smartphone", "iphone", "android"], url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["shoe", "sneaker", "boots", "sandals", "slipper"], url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["shirt", "dress", "hoodie", "jacket", "kurta", "top", "jeans", "trouser", "cloth", "saree", "sandal"], url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["bag", "purse", "handbag", "backpack", "wallet"], url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["lamp", "light", "bulb", "ceiling", "decor"], url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["chair", "sofa", "table", "desk", "furniture", "cabinet"], url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["mug", "cup", "kettle", "pan", "cookware", "bowl", "utensil"], url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["perfume", "fragrance", "deodorant", "spray"], url: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["lipstick", "makeup", "cosmetic", "foundation", "nail", "skincare", "cream", "serum"], url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["yoga", "fitness", "dumbbell", "treadmill", "sports", "gym", "football", "soccer", "bat", "racket", "helmet"], url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["book", "novel", "journal", "notebook", "story", "textbook", "dictionary"], url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["speaker", "soundbar", "speaker system", "music"], url: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["camera", "dslr", "lens", "tripod"], url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80" },
    { keywords: ["toy", "game", "puzzle", "remote"], url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=80" }
  ];

  for (const match of keywordMatches) {
    if (match.keywords.some((keyword) => productName.includes(keyword))) {
      return match.url;
    }
  }

  const imageSets = {
    Electronics: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80",
    ],
    "Home & Kitchen": [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80",
    ],
    Fashion: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80",
    ],
    Beauty: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80",
    ],
    Sports: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1579952363873-27f3b06144945?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=700&q=80",
    ],
    Books: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=700&q=80",
    ],
  };

  const images = imageSets[product.categoryName] || imageSets.Electronics;
  let hash = 0;
  for (const character of productName || "") {
    hash = character.charCodeAt(0) + ((hash << 5) - hash);
  }
  return images[Math.abs(hash) % images.length];
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
  const cleanProducts = mergeCuratedProducts(products);

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
    const catalog = mergeCuratedProducts(products);
    renderProducts(catalog);
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
