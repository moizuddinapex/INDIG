// --------------------
// Global cart state
// --------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --------------------
// 1. Toggle Cart Sidebar
// --------------------
function toggleCart(show = true) {
  const drawer  = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");

  if (!drawer || !overlay) return;

  if (show) {
    drawer.classList.add("active");
    overlay.classList.add("active");
    renderCart();
  } else {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
  }
}

// --------------------
// 2. Add Item To Cart
// --------------------
function addToCart(name, price, image) {
  // Add new item
  cart.push({ name, price, image });

  // Save
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update UI
  renderCart();
  toggleCart(true);
}

// --------------------
// 3. Render Cart Items
// --------------------
function renderCart() {
  const container    = document.getElementById("cart-items-container");
  const totalElement = document.getElementById("cart-total-price");
  const countElement = document.getElementById("cart-count");

  if (!container || !totalElement) return;

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-cart">Your bag is empty</p>`;
  } else {
    cart.forEach((item, index) => {
      total += item.price;

      container.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-img" />
          <div class="cart-info">
            <h4 class="cart-name">${item.name}</h4>
            <p class="cart-price">Rs ${item.price.toLocaleString()}</p>
            <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
          </div>
        </div>
      `;
    });
  }

  // Update totals
  totalElement.innerText = "Rs " + total.toLocaleString();
  if (countElement) countElement.innerText = `(${cart.length})`;
}

// --------------------
// 4. Remove Item
// --------------------
function removeItem(index) {
  if (index < 0 || index >= cart.length) return;

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// --------------------
// 5. Go to Checkout Page
// --------------------
function goToCheckout() {
  window.location.href = "checkout-shirt1.1.1.html";
}

// --------------------
// Initialize
// --------------------
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const bag      = document.querySelector(".bag-icon");
  const overlay  = document.getElementById("cartOverlay");
  const closeBtn = document.getElementById("closeCart");

  if (bag)      bag.addEventListener("click", () => toggleCart(true));
  if (overlay)  overlay.addEventListener("click", () => toggleCart(false));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleCart(false));
});
