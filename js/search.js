// Search functionality for INDIG-GROK

// Product database for search
const products = [
    { name: 'Monarch Piqué Polo', category: 'shirts', price: 145, url: 'product1.html', image: 'images/shirt1.1.1.png' },
    { name: 'Imperial Textured Knit', category: 'shirts', price: 160, url: 'product1.html', image: 'images/shirt1.2.1.png' },
    { name: 'Sovereign Silk Polo', category: 'shirts', price: 185, url: 'product1.html', image: 'images/shirt1.3.1.png' },
    { name: 'Monarch Derby', category: 'shoes', price: 145, url: 'product2.html', image: 'images/shoes1.1.1.png' },
    { name: 'Imperial Loafer', category: 'shoes', price: 160, url: 'product2.html', image: 'images/shoes1.2.1.png' },
    { name: 'Sovereign Oxford', category: 'shoes', price: 185, url: 'product2.html', image: 'images/shoes1.3.1.png' },
    { name: 'Monarch Chino', category: 'pants', price: 145, url: 'product3.html', image: 'images/pant1.1.1.png' },
    { name: 'Imperial Wool Trouser', category: 'pants', price: 160, url: 'product3.html', image: 'images/pant1.2.1.png' },
    { name: 'Sovereign Linen Pant', category: 'pants', price: 185, url: 'product3.html', image: 'images/pant1.3.1.png' },
    { name: 'Monarch Chronograph', category: 'watches', price: 145, url: 'product4.html', image: 'images/watch1.1.1.png' },
    { name: 'Imperial Dress Watch', category: 'watches', price: 160, url: 'product4.html', image: 'images/watch1.2.1.png' },
    { name: 'Sovereign Diver', category: 'watches', price: 185, url: 'product4.html', image: 'images/watch1.3.1.png' },
];

// Open search modal
function openSearch() {
    document.getElementById('searchModal').classList.remove('opacity-0', 'invisible');
    document.getElementById('searchOverlay').classList.remove('opacity-0', 'invisible');
    setTimeout(() => {
        document.getElementById('searchInput')?.focus();
    }, 100);
}

// Close search modal
function closeSearch() {
    document.getElementById('searchModal').classList.add('opacity-0', 'invisible');
    document.getElementById('searchOverlay').classList.add('opacity-0', 'invisible');
}

// Handle search input
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const resultsDiv = document.getElementById('searchResults');
        
        if (query.length < 2) {
            resultsDiv.classList.add('hidden');
            return;
        }
        
        const matches = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.category.toLowerCase().includes(query)
        ).slice(0, 5);
        
        if (matches.length > 0) {
            resultsDiv.innerHTML = matches.map(product => `
                <a href="${product.url}" onclick="closeSearch()" class="flex items-center gap-4 p-3 hover:bg-white/5 transition border-b border-white/10 last:border-0">
                    <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover">
                    <div>
                        <h4 class="text-sm">${product.name}</h4>
                        <p class="text-[10px] text-gray-500">${product.category} • $${product.price}</p>
                    </div>
                </a>
            `).join('');
            resultsDiv.classList.remove('hidden');
        } else {
            resultsDiv.innerHTML = '<p class="p-4 text-gray-500 text-center">No products found</p>';
            resultsDiv.classList.remove('hidden');
        }
    });
}

// Handle search form submission
function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    if (query.length > 0) {
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupSearchListener();
    
    // Close search on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });
});
