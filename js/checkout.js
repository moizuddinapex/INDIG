// ---------- CART STATE ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------- SELECT ELEMENTS ----------
const sidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("cartOverlay");
const bagIcon = document.getElementById("bagIcon");
const closeBtn = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalPrice = document.getElementById("cart-total-price");

// ---------- OPEN / CLOSE ----------
function openCart() {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  renderCart();
}

function closeCart() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

// ---------- RENDER CART ----------
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p>Your cart is empty</p>`;
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>Rs ${item.price.toLocaleString()} x ${item.qty}</p>
          <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(div);
    });
  }

  cartTotalPrice.innerText = "Rs " + total.toLocaleString();
}

// ---------- ADD ITEM ----------
function addToCart(name, price, image) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  openCart();
}

// ---------- REMOVE ITEM ----------
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ---------- CHECKOUT ----------
function goToCheckout() {
  window.location.href = "checkout-shirt1.1.1.html";
}

// ---------- EVENT LISTENERS ----------
bagIcon.addEventListener("click", openCart);
closeBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

// ---------- INITIALIZE ----------
document.addEventListener("DOMContentLoaded", renderCart);
