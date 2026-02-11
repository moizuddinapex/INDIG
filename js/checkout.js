
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 1. The Toggle Function
function toggleCart(show = true) {
    const drawer = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (show) {
        drawer.classList.add('active');
        overlay.classList.add('active');
        renderCart(); // Refresh list every time it opens
    } else {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// 2. Add to Cart Logic
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    toggleCart(true); // Automatically slide open
}

// 3. The Render Logic (Fixed IDs)
function renderCart() {
    // IMPORTANT: These IDs must match your HTML exactly
    const container = document.getElementById("cart-items-container");
    const countElement = document.getElementById("cart-count");
    const totalElement = document.getElementById("cart-total-price");
    
    if (!container) return; // Safety check

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <div style="display:flex; gap:15px; margin-bottom:20px; align-items:center; border-bottom: 1px solid #eee; padding-bottom: 10px; color: black;">
                <img src="${item.image}" width="70" height="90" style="object-fit: cover; border: 1px solid #ddd;">
                <div style="flex-grow: 1;">
                    <div style="font-weight: bold; font-size: 13px; text-transform: uppercase;">${item.name}</div>
                    <div style="font-size: 12px; margin-top: 4px;">Rs ${item.price.toLocaleString()}</div>
                    <button onclick="removeItem(${index})" style="font-size: 10px; color: red; text-decoration: underline; background: none; border: none; cursor: pointer; margin-top: 5px;">REMOVE</button>
                </div>
            </div>
        `;
    });

    if (totalElement) totalElement.innerText = "Rs " + total.toLocaleString();
    if (countElement) countElement.innerText = `(${cart.length})`;
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#999; margin-top:20px;">Your cart is empty</p>';
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
