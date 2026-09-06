# UrbanMart — frontend

Plain HTML/CSS/JS, no build step. Talks directly to your Spring Boot backend over `fetch`.

## Before you open this - apply the backend patch
This version assumes your **actual** current endpoint contracts (verified against your
real controller/service files), plus a small but important backend fix:
`meadow-backend-security.zip` (Patch 1, auth) + a second patch, `PATCH_2_NOTES.md`,
which links your login accounts (`UsersData`) to the `User` profile that Cart/Orders
actually use. Without Patch 2, every logged-in request will keep failing because the id
you get back from `/login` doesn't correspond to any real Cart - that was the redirect
loop you saw. Apply both patches, then sign up with a **brand new** account to test
(accounts created before the patch won't have a linked profile).

## Running locally
1. Start the backend on `http://localhost:8082`.
2. Change `API_BASE` in `assets/api.js` to `http://localhost:8082`.
3. Open `index.html` directly, or serve the folder with any static file server.
4. Sign up through the UI. To test admin, sign up, then run
   `UPDATE users_data SET role = 'ADMIN' WHERE username = '...'`, then log in again.

## Deploying the frontend on Render

Create a separate **Static Site** in Render using this same GitHub repository:

- **Root Directory:** `SpringUI`
- **Build Command:** leave empty
- **Publish Directory:** `.`
- **Rewrite rule:** `/*` → `/index.html`

The frontend is already configured to call the deployed backend at
`https://ecommerce-website-s7t4.onrender.com`.

## What each page calls (matched to your real code)

| Page | Calls |
|---|---|
| `index.html` | `GET /api/categories`, `GET /api/products`, `GET /api/products/category/{id}`, `GET /api/products/search?name=` (returns **one** product, wrapped into an array on the frontend), `POST /api/cart/{userId}/items` with `{ id: productId, quantity }` |
| `login.html` | `POST /api/auth/login` |
| `signup.html` | `POST /api/auth/signup` then `POST /api/auth/login` |
| `cart.html` | `GET /api/cart/{userId}`, `PATCH /api/cart/{userId}/items` with `{ id: productId, quantity }` (no item id in the path - your backend re-finds the row by product), `DELETE /api/cart/{userId}/items/{productId}` |
| `checkout.html` | `POST /api/orders/{userId}` with `{ name, email, address, phno }` (accepted but not yet applied server-side - see comment in `checkout.js`) |
| `confirmation.html` | reads the order response handed to it by checkout |
| `orders.html` | `GET /api/orders/{userId}` - **not implemented on your backend yet**, shows a friendly note instead of erroring |
| `admin.html` | `GET/POST/DELETE /api/products`, `GET/POST /api/categories` - order status update card shows the endpoint you'd need to add, since it doesn't exist yet |

## The one field name that matters most
Your `CartItemRequestDto` reads the product off a field called **`id`**, not `productId`
(confirmed from `CartServiceImpl` calling `cartItemRequestDto.getId()`). Every cart request
body in this frontend sends `{ "id": <productId>, "quantity": <n> }` to match that exactly.
If you ever rename that DTO field, update `home.js` and `cart.js` to match.

## Two backend features this frontend is ready for, once you add them
- `GET /api/orders/{userId}` returning `List<OrderResponseDto>` → unlocks `orders.html`
- `PUT /api/orders/{orderId}/status` accepting an `OrderStatusUpdateDto` → unlocks the
  status card in `admin.html`

Neither is required for the core flow (browse → cart → checkout) to work end to end.
