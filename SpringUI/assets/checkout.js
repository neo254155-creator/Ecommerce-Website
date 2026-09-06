requireLogin();
renderHeader(null);

const user = getCurrentUser();

const storedTotal = sessionStorage.getItem("meadow_cart_total");
document.getElementById("checkout-total").textContent = storedTotal
  ? `₹${Number(storedTotal).toFixed(0)}`
  : "₹—";

document.getElementById("checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById("place-order-btn");

  // Note: your current OrderServiceImpl.placeOrder(userId, dto) accepts this
  // object but doesn't actually apply name/email/address/phno to anything -
  // it builds the order straight from the cart's linked User. Sending this
  // is harmless (and future-proof once that's wired up), but don't expect
  // it to change the recipient details yet.
  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    address: document.getElementById("address").value.trim(),
    phno: document.getElementById("phno").value.trim(),
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Placing order…";

  try {
    const order = await apiFetch(`/api/orders/${user.userId}`, {
      method: "POST",
      body: payload,
    });
    let storedOrders = [];
    try {
      const rawOrders = localStorage.getItem("meadow_orders");
      storedOrders = rawOrders ? JSON.parse(rawOrders) : [];
    } catch (storageError) {
      storedOrders = [];
    }
    storedOrders.unshift({
      ...order,
      date: new Date().toLocaleString(),
      items: Number(sessionStorage.getItem("meadow_cart_count") || 0),
    });
    localStorage.setItem("meadow_orders", JSON.stringify(storedOrders));
    sessionStorage.setItem("meadow_last_order", JSON.stringify(order));
    window.location.href = "confirmation.html";
  } catch (err) {
    toast(err.message, "error");
    submitBtn.disabled = false;
    submitBtn.textContent = "Place order";
  }
});
