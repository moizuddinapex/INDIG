
// ==== CART HANDLER ====
const cartToggle = document.querySelector(".cart-toggle");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const cartTotalPrice = document.querySelector(".cart-total-price");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==== CART RENDER ====
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;
  
  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      <div>${item.name}</div>
      <div>Size: ${item.size}</div>
      <div>
        Qty:
        <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
      </div>
      <div>Rs ${item.price * item.quantity}</div>
    `;
    cartItemsContainer.appendChild(li);
  });

  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
  cartTotalPrice.textContent = totalPrice;
  
  localStorage.setItem("cart", JSON.stringify(cart));

  // Quantity buttons
  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      const action = btn.dataset.action;
      if (action === "increase") cart[idx].quantity++;
      if (action === "decrease") cart[idx].quantity--;
      if (cart[idx].quantity <= 0) cart.splice(idx, 1);
      renderCart();
    });
  });
}

// ==== ADD TO CART (with dynamic size) ====
document.querySelectorAll(".product-card").forEach(card => {
  const sizeButtons = card.querySelectorAll(".size-option");
  const selectedSizeSpan = card.querySelector(".selected-size");

  // Size click
  sizeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach(o => o.classList.remove("active"));
      btn.classList.add("active");
      selectedSizeSpan.textContent = btn.textContent;
    });
  });

  // Add to cart
  card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
    const name = card.querySelector("h3, .product-name").textContent;
    const price = parseFloat(card.querySelector("div:contains('$'), .product-price").textContent.replace(/[^0-9.]/g, ""));
    const size = selectedSizeSpan.textContent;
    
    const existing = cart.find(i => i.name === name && i.size === size);
    if (existing) existing.quantity++;
    else cart.push({ name, price, size, quantity: 1 });

    renderCart();
    cartSidebar.classList.add("open");
  });
});

// ==== TOGGLE CART ====
cartToggle.addEventListener("click", () => cartSidebar.classList.toggle("open"));

// Initial render
renderCart();
