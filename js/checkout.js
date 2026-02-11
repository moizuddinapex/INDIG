
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


function toggleCart(show = true) {
    // We target the cart-sidebar ID but apply the 'active' class
    const drawer = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (show) {
        drawer.classList.add('active');
        overlay.classList.add('active');
        renderCart(); // Refresh the items list
    } else {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Update your renderCart to show the count in the navbar
function renderCart() {
    const container = document.getElementById("cartItems");
    const countElement = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <div style="display:flex; gap:15px; margin-bottom:20px; align-items:center; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <img src="${item.image}" width="70" height="90" style="object-fit: cover;">
                <div style="flex-grow: 1;">
                    <div style="font-weight: bold; font-size: 12px;">${item.name}</div>
                    <div style="font-size: 11px;">Rs ${item.price}</div>
                </div>
            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = "Rs " + total;
    if(countElement) countElement.innerText = `(${cart.length})`;
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

