
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Unified Toggle Function
function toggleCart(show = true) {
    const drawer = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (show) {
        drawer.classList.add('active');
        overlay.classList.add('active');
        renderCart();
    } else {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Function to add item and slide open cart
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Update UI and slide open
    renderCart();
    toggleCart(true); 
}

// Function to draw the items inside the cart
function renderCart() {
    const container = document.getElementById("cart-items-container");
    const totalElement = document.getElementById("cart-total-price");
    
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center mt-10">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            container.innerHTML += `
                <div class="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                    <img src="${item.image}" class="w-20 h-24 object-cover">
                    <div class="flex-1">
                        <h4 class="font-bold text-sm uppercase">${item.name}</h4>
                        <p class="text-gray-600">Rs ${item.price.toLocaleString()}</p>
                        <button onclick="removeItem(${index})" class="text-[10px] underline text-red-500 uppercase mt-2">Remove</button>
                    </div>
                </div>
            `;
        });
    }

    totalElement.innerText = "Rs " + total.toLocaleString();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
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

