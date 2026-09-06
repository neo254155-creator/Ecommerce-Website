if (!requireLogin()) {
  throw new Error("A valid login session is required to open the cart.");
}
renderHeader("cart");

const user = getCurrentUser();
const userId = Number(user.userId);

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function cartRowHTML(item) {
  const color = tileColorFor(item.productName || "?");
  return `
    <div class="cart-row" data-cart-item-id="${item.cartItemId}" data-product-id="${item.productId}" data-unit-price="${Number(item.productPrice ?? item.price ?? 0)}" data-subtotal="${Number(item.subtotal ?? 0)}">
      <div class="tile-sm" style="background:${color};">${initials(item.productName)}</div>
      <div class="cart-row-info">
        <div class="name">${escapeHtml(item.productName)}</div>
        <div class="unit-price">₹${Number(item.productPrice ?? item.price ?? 0).toFixed(0)} each</div>
      </div>
      <div class="qty-stepper">
        <button type="button" class="qty-minus">−</button>
        <input type="text" class="qty-value" value="${item.quantity}" inputmode="numeric" />
        <button type="button" class="qty-plus">+</button>
      </div>
      <div class="cart-row-subtotal">₹${Number(item.subtotal ?? 0).toFixed(0)}</div>
      <button class="btn btn-danger-ghost remove-btn" title="Remove">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
      </button>
    </div>`;
}

function renderSummary(items) {
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.subtotal, 0);
  document.getElementById("summary-count").textContent = count;
  document.getElementById("summary-total").textContent = `₹${total.toFixed(0)}`;
  sessionStorage.setItem("meadow_cart_count", String(count));
  sessionStorage.setItem("meadow_cart_total", total.toFixed(2));
}

async function loadCart() {
  const list = document.getElementById("cart-list");
  list.innerHTML = `<div class="skeleton" style="height:80px;"></div><div class="skeleton" style="height:80px;"></div>`;

  try {
    const items = await apiFetch(`/api/cart/${userId}`, { redirectOn401: false });

    if (!items || items.length === 0) {
      document.getElementById("cart-layout").innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <div class="icon-circle">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          </div>
          <h3>Your cart is empty</h3>
          <p>Add a few things from the shop and they'll show up here.</p>
          <a href="index.html" class="btn btn-primary">Browse products</a>
        </div>`;
      return;
    }

    list.innerHTML = items.map(cartRowHTML).join("");
    renderSummary(items);
    attachRowHandlers();
    refreshCartBadge();
  } catch (err) {
    list.innerHTML = `
      <div class="empty-state">
        <h3>Couldn't load your cart</h3>
        <p>${escapeHtml(err.message)}</p>
        <a href="login.html" class="btn btn-primary">Log in again</a>
      </div>`;
  }
}

function updateSummaryFromRows() {
  const rows = [...document.querySelectorAll(".cart-row")];
  const count = rows.reduce((sum, row) => {
    return sum + (parseInt(row.querySelector(".qty-value").value, 10) || 0);
  }, 0);
  const total = rows.reduce((sum, row) => {
    return sum + (Number(row.dataset.subtotal) || 0);
  }, 0);
  document.getElementById("summary-count").textContent = count;
  document.getElementById("summary-total").textContent = `₹${total.toFixed(0)}`;
  sessionStorage.setItem("meadow_cart_count", String(count));
  sessionStorage.setItem("meadow_cart_total", total.toFixed(2));
}

function attachRowHandlers() {
  document.querySelectorAll(".cart-row").forEach((row) => {
    const productId = row.dataset.productId;
    const qtyInput = row.querySelector(".qty-value");

    row.querySelector(".qty-minus").addEventListener("click", () => {
      const next = Math.max(1, parseInt(qtyInput.value, 10) - 1);
      updateQuantity(productId, next);
    });
    row.querySelector(".qty-plus").addEventListener("click", () => {
      const next = parseInt(qtyInput.value, 10) + 1;
      updateQuantity(productId, next);
    });
    row.querySelector(".remove-btn").addEventListener("click", () => removeItem(productId));
  });
}

async function updateQuantity(productId, quantity) {
  const row = [...document.querySelectorAll(".cart-row")].find(
    (candidate) => candidate.dataset.productId === String(productId)
  );
  if (!row) return;

  const qtyInput = row.querySelector(".qty-value");
  const controls = row.querySelectorAll("button, input");
  controls.forEach((control) => (control.disabled = true));

  try {
    const updatedItem = await apiFetch(`/api/cart/${userId}/items`, {
      method: "PATCH",
      body: { id: Number(productId), quantity },
    });
    const subtotal = Number(updatedItem?.subtotal ?? Number(row.dataset.unitPrice) * quantity);
    qtyInput.value = updatedItem?.quantity ?? quantity;
    row.dataset.subtotal = subtotal;
    row.querySelector(".cart-row-subtotal").textContent = `₹${subtotal.toFixed(0)}`;
    updateSummaryFromRows();
    refreshCartBadge();
    controls.forEach((control) => (control.disabled = false));
  } catch (err) {
    controls.forEach((control) => (control.disabled = false));
    toast(err.message, "error");
  }
}

async function removeItem(productId) {
  try {
    await apiFetch(`/api/cart/${userId}/items/${productId}`, { method: "DELETE" });
    toast("Removed from cart.");
    loadCart();
  } catch (err) {
    toast(err.message, "error");
  }
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

loadCart();
