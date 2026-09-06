/* ============================================
   UrbanMart - shared API + auth helpers
   Loaded on every page before the page's own script.
   ============================================ */

const API_BASE = "https://ecommerce-website-s7t4.onrender.com";

const AUTH_TOKEN_KEY = "meadow_token";
const AUTH_USER_KEY = "meadow_user";
const THEME_KEY = "meadow_theme";

function applyTheme() {
  const dark = localStorage.getItem(THEME_KEY) === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  return dark;
}

function toggleTheme() {
  const dark = document.documentElement.dataset.theme !== "dark";
  localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  applyTheme();
  const button = document.getElementById("theme-toggle");
  if (button) {
    button.textContent = dark ? "☀" : "☾";
    button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
}

applyTheme();

function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function getCurrentUser() {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    clearSession();
    return null;
  }
}

function isLoggedIn() {
  const user = getCurrentUser();
  return !!getToken() && !!user && Number.isFinite(Number(user.userId));
}

function isAdmin() {
  const u = getCurrentUser();
  return !!u && u.role === "ADMIN";
}

function saveSession(loginResponse) {
  const userId = loginResponse.userId ?? loginResponse.id ?? loginResponse.profileId;
  if (!loginResponse || !loginResponse.token || userId === undefined || userId === null) {
    throw new Error("Login response did not contain a valid token and user ID.");
  }

  const profile = {
    userId: Number(userId),
    username: loginResponse.username || "",
    role: loginResponse.role,
    name: loginResponse.name || loginResponse.username || "",
    email: loginResponse.email || "",
    address: loginResponse.address || "",
    phone: loginResponse.phone ?? loginResponse.phno ?? "",
    phno: loginResponse.phno ?? loginResponse.phone ?? "",
  };

  localStorage.setItem(AUTH_TOKEN_KEY, loginResponse.token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
}

function getProfileData() {
  const user = getCurrentUser() || {};
  return {
    userId: user.userId || "",
    username: user.username || "",
    role: user.role || "CUSTOMER",
    name: user.name || user.username || "",
    email: user.email || "",
    address: user.address || "",
    phone: user.phone ?? user.phno ?? "",
    phno: user.phno ?? user.phone ?? "",
  };
}

function clearSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

function requireLogin() {
  if (!isLoggedIn()) {
    clearSession();
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function requireAdmin() {
  if (!requireLogin()) return false;
  if (!isAdmin()) {
    window.location.href = "index.html";
    return false;
  }
  return true;
}

/**
 * redirectOn401: only the *main* action on a page should bounce the user
 * back to login on an auth failure. Background calls (like the cart count
 * badge) should fail quietly instead of yanking someone off the page they're
 * looking at - that silent bounce was exactly what made this feel like a loop.
 */
async function apiFetch(path, { method = "GET", body, auth = true, redirectOn401 = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth && getToken()) {
    headers["Authorization"] = "Bearer " + getToken();
  }

  let response;
  try {
    response = await fetch(API_BASE + path, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    throw new Error("Can't reach the server. Is the backend running on " + API_BASE + "?");
  }

  if (response.status === 401) {
    clearSession();
    if (redirectOn401) {
      window.location.href = "login.html";
    }
    throw new Error("Your login session expired. Please log in again.");
  }

  if (response.status === 204) return null;

  const text = await response.text();
  const data = text ? tryParseJson(text) : null;

  if (!response.ok) {
    const message = (data && (data.message || data.error)) || `Request failed (status ${response.status}).`;
    throw new Error(message);
  }

  return data;
}

function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

/* ---------- toast ---------- */

function toast(message, type = "info") {
  let stack = document.getElementById("toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.id = "toast-stack";
    document.body.appendChild(stack);
  }
  const el = document.createElement("div");
  el.className = "toast" + (type === "error" ? " error" : "");
  el.textContent = message;
  stack.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

/* ---------- shared header ---------- */

const LEAF_MARK = `
<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="13" cy="13" r="13" fill="#2F6F5E"/>
  <path d="M8 15.5C8 10.5 12 7.5 17.5 7.5C17.5 13 14.5 17 9 17C8.4 17 8 16.5 8 15.5Z" fill="#F4EEDF"/>
  <path d="M9 17L15 9" stroke="#2F6F5E" stroke-width="1" stroke-linecap="round"/>
</svg>`;

async function renderHeader(activePage) {
  const root = document.getElementById("site-header-root");
  if (!root) return;

  const user = getCurrentUser();

  root.innerHTML = `
    <header class="site-header">
      <div class="wrap">
        <a class="brand" href="index.html">${LEAF_MARK} UrbanMart</a>
        <nav class="main-nav">
          <a href="index.html" class="${activePage === "home" ? "active" : ""}">Shop</a>
          ${
            user
              ? `<a href="cart.html" class="cart-link ${activePage === "cart" ? "active" : ""}">
                   Cart <span class="cart-count" id="cart-count-badge">0</span>
                 </a>`
              : ""
          }
          ${
            user && user.role === "ADMIN"
              ? `<a href="admin.html" class="${activePage === "admin" ? "active" : ""}">Admin</a>`
              : ""
          }
        </nav>
        <div class="shopper-tag">
          <button class="theme-toggle" id="theme-toggle" type="button"></button>
          ${
            user
              ? `
                <div class="profile-menu-wrap">
                  <button class="profile-icon-btn" id="profile-menu-toggle" type="button" aria-label="Open profile menu">
                    <span class="profile-icon-avatar">${(user.username || "U").charAt(0).toUpperCase()}</span>
                  </button>
                  <div class="profile-menu" id="profile-menu">
                    <a href="profile.html">Profile</a>
                    <a href="orders.html">Orders</a>
                    <button type="button" id="logout-btn">Log out</button>
                  </div>
                </div>
              `
              : `<a class="btn btn-outline" href="login.html" style="padding:7px 14px;font-size:13px;">Log in</a>
                 <a class="btn btn-primary" href="signup.html" style="padding:7px 14px;font-size:13px;">Sign up</a>`
          }
        </div>
      </div>
    </header>`;

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const dark = document.documentElement.dataset.theme === "dark";
    themeToggle.textContent = dark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.addEventListener("click", toggleTheme);
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearSession();
      toast("You've been logged out.");
      setTimeout(() => (window.location.href = "index.html"), 400);
    });
  }

  const profileToggle = document.getElementById("profile-menu-toggle");
  const profileMenu = document.getElementById("profile-menu");
  if (profileToggle && profileMenu) {
    profileToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      profileMenu.classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".profile-menu-wrap")) {
        profileMenu.classList.remove("open");
      }
    });
  }

  if (user && user.userId) refreshCartBadge();
}

async function refreshCartBadge() {
  const badge = document.getElementById("cart-count-badge");
  const user = getCurrentUser();
  if (!badge || !user || !user.userId) return;
  try {
    const items = await apiFetch(`/api/cart/${user.userId}`, { redirectOn401: false });
    const count = (items || []).reduce((sum, i) => sum + i.quantity, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  } catch (e) {
    // a brand new cart, or a background hiccup - don't disturb the page for this
    badge.style.display = "none";
  }
}

/* ---------- product tile color (deterministic from name) ---------- */

const TILE_PALETTE = ["#2F6F5E", "#DD9A4D", "#5E7CE2", "#C1483A", "#7A6BB5", "#3E8F79"];

function tileColorFor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return TILE_PALETTE[Math.abs(hash) % TILE_PALETTE.length];
}

function initials(name) {
  return (name || "?").trim().charAt(0).toUpperCase();
}
