// Cart state
        let cart = [];
        
        // Size selection tracking for each product
        let selectedSizes = {
            1: 'SM',
            2: 'MED',
            3: 'LG',
            4: 'XL',
            5: '2XL'
        };
        
        function selectSize(button, size, productId) {
            // Update selected size for this product
            selectedSizes[productId] = size;
            
            // Update display
            const display = document.getElementById(`size-display-${productId}`);
            if (display) {
                display.textContent = `Size: ${size}`;
            }
            
            // Update button styles in this tooltip
            const container = button.closest('.size-tooltip');
            const buttons = container.querySelectorAll('.size-btn');
            buttons.forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
        }
        
        function addToCartWithSize(name, price, image, productId) {
            const size = selectedSizes[productId] || 'MED';
            
            cart.push({
                name: name,
                price: price,
                size: size,
                image: image,
                id: Date.now() + Math.random()
            });
            
            updateCartUI();
            updateCartCount();
            
            // Optional: Show a quick notification
            alert(`${name} (Size: ${size}) added to cart!`);
        }
        
        function updateCartUI() {
            const container = document.getElementById('cart-items-container');
            const totalSpan = document.getElementById('cart-total-price');
            
            if (!container) return;
            
            let total = 0;
            
            if (cart.length === 0) {
                container.innerHTML = '<p class="text-gray-400 text-center">Your cart is empty</p>';
                if (totalSpan) totalSpan.textContent = '$0';
                return;
            }
            
            container.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-info">
                        <h4>${item.name}</h4>
                        <p>Size: ${item.size}</p>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `).join('');
            
            total = cart.reduce((sum, item) => sum + item.price, 0);
            if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;
        }
        
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartUI();
            updateCartCount();
        }
        
        function updateCartCount() {
            const countElements = document.querySelectorAll('#cart-count, .cart-count');
            countElements.forEach(el => {
                if (el) el.textContent = `(${cart.length})`;
            });
        }
        
        function openCart() {
            document.getElementById('cartOverlay').classList.add('active');
            document.getElementById('cartSidebar').classList.add('active');
        }
        
        function closeCart() {
            document.getElementById('cartOverlay').classList.remove('active');
            document.getElementById('cartSidebar').classList.remove('active');
        }
        
        function goToCheckout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'checkout.html';
        }
        
        // Event listeners
        document.addEventListener('DOMContentLoaded', () => {
            const closeBtn = document.getElementById('closeCart');
            const overlay = document.getElementById('cartOverlay');
            
            if (closeBtn) closeBtn.addEventListener('click', closeCart);
            if (overlay) overlay.addEventListener('click', closeCart);
            
            updateCartUI();
            updateCartCount();
        });
