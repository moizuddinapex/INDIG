
// Function to toggle the cart visibility
function toggleCart(show = true) {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (show) {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    } else {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Update your existing Add to Cart function to include:
function addToCart(productName, price, image) {
    // ... your existing logic to add to localstorage ...
    
    // Trigger the slide-in effect immediately after adding
    updateCartUI();
    toggleCart(true); 
}


const PRICE = 145.00;

const qtyInput = document.getElementById('qty');

qtyInput.addEventListener('input', () => {
    // later you can calculate total here
    console.log('Quantity changed:', qtyInput.value);
});


<script>
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function openCart() {
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
  renderCart();
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}

document.getElementById("cartOverlay").addEventListener("click", closeCart);

function addToCart(name, price, image) {
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  openCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price;
    container.innerHTML += `
      <div style="display:flex; gap:10px; margin-bottom:15px;">
        <img src="${item.image}" width="60">
        <div>
          <div>${item.name}</div>
          <div>Rs ${item.price}</div>
        </div>
      </div>
    `;
  });

  document.getElementById("cartTotal").innerText = "Rs " + total;
}

function goToCheckout() {
  window.location.href = "checkout-shirt1.1.1.html";
}
</script>

