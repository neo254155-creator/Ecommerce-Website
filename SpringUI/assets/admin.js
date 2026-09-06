requireAdmin();
renderHeader("admin");

let categoriesCache = [];

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- categories ---------- */

async function loadCategories() {
  const body = document.getElementById("categories-table-body");
  const select = document.getElementById("p-category");
  try {
    categoriesCache = (await apiFetch("/api/categories")) || [];
    body.innerHTML = categoriesCache
      .map((c) => `<tr><td>${escapeHtml(c.name)}</td><td style="text-align:right;color:var(--ink-faint);">#${c.id}</td></tr>`)
      .join("") || `<tr><td colspan="2" style="color:var(--ink-faint);">No categories yet.</td></tr>`;

    select.innerHTML = categoriesCache.map((c) => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join("");
  } catch (err) {
    toast(err.message, "error");
  }
}

document.getElementById("add-category-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("c-name");
  try {
    await apiFetch("/api/categories", { method: "POST", body: { name: nameInput.value.trim() } });
    nameInput.value = "";
    toast("Category added.");
    loadCategories();
  } catch (err) {
    toast(err.message, "error");
  }
});

/* ---------- products ---------- */

async function loadProducts() {
  const body = document.getElementById("products-table-body");
  try {
    const products = (await apiFetch("/api/products")) || [];
    body.innerHTML =
      products
        .map(
          (p) => `
      <tr>
        <td>${escapeHtml(p.name)}</td>
        <td>₹${Number(p.price).toFixed(0)}</td>
        <td>${p.stock}</td>
        <td>${escapeHtml(p.categoryName || "—")}</td>
        <td style="text-align:right;">
          <button class="icon-btn" data-delete-id="${p.id}" title="Delete">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          </button>
        </td>
      </tr>`
        )
        .join("") || `<tr><td colspan="5" style="color:var(--ink-faint);">No products yet.</td></tr>`;

    body.querySelectorAll("[data-delete-id]").forEach((btn) => {
      btn.addEventListener("click", () => deleteProduct(btn.dataset.deleteId));
    });
  } catch (err) {
    toast(err.message, "error");
  }
}

async function deleteProduct(id) {
  if (!confirm("Remove this product from the catalog?")) return;
  try {
    await apiFetch(`/api/products/${id}`, { method: "DELETE" });
    toast("Product removed.");
    loadProducts();
  } catch (err) {
    toast(err.message, "error");
  }
}

document.getElementById("add-product-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById("p-name").value.trim(),
    description: document.getElementById("p-description").value.trim(),
    price: Number(document.getElementById("p-price").value),
    stock: Number(document.getElementById("p-stock").value),
    categoryId: Number(document.getElementById("p-category").value),
  };
  try {
    await apiFetch("/api/products", { method: "POST", body: payload });
    toast("Product added.");
    e.target.reset();
    loadProducts();
  } catch (err) {
    toast(err.message, "error");
  }
});

loadCategories();
loadProducts();
