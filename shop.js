/* ==========================================
   SHOP PAGE DYNAMIC FILTERING & SORTING
   ========================================== */

// Master product database array for shop page
const shopProducts = [
    { id: 1, name: 'Luna Fabric Sofa', category: 'Living Room', price: 24999, rating: 5, reviews: 35, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Nordic Wood Dining Table', category: 'Dining Room', price: 18999, rating: 4.5, reviews: 24, img: 'https://images.unsplash.com/photo-1617806118233-18e1c0c531d3?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Haven Lounge Chair', category: 'Living Room', price: 12499, rating: 5, reviews: 18, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'Oakline 6 Drawer Dresser', category: 'Storage', price: 21500, rating: 4, reviews: 12, img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80' },
    { id: 5, name: 'Aura Floor Lamp', category: 'Lighting', price: 6999, rating: 5, reviews: 42, img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80' },
    { id: 6, name: 'Eden Coffee Table', category: 'Living Room', price: 8999, rating: 4.5, reviews: 29, img: 'https://images.unsplash.com/photo-1533779283484-8ab4940aa78f?auto=format&fit=crop&w=600&q=80' },
    { id: 7, name: 'Modern Accent Chair', category: 'Living Room', price: 14200, rating: 4, reviews: 15, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80' },
    { id: 8, name: 'Minimal Bedside Table', category: 'Bedroom', price: 4999, rating: 5, reviews: 21, img: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=600&q=80' },
    { id: 9, name: 'Velvet King Bedframe', category: 'Bedroom', price: 28999, rating: 5, reviews: 10, img: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=600&q=80' },
    { id: 10, name: 'Ergonomic Executive Desk', category: 'Storage', price: 16499, rating: 4.5, reviews: 14, img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80' },
    { id: 11, name: 'Pendant Brass Light', category: 'Lighting', price: 4500, rating: 4.5, reviews: 31, img: 'https://images.unsplash.com/photo-1524484485487-45527845fef4?auto=format&fit=crop&w=600&q=80' },
    { id: 12, name: 'Solid Teak Dining Chair', category: 'Dining Room', price: 5499, rating: 4, reviews: 19, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80' }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('shopProductGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const priceVal = document.getElementById('priceVal');
    const sortDropdown = document.getElementById('sortDropdown');

    if (grid) {
        renderProducts(shopProducts);

        // Event listeners for filters and sorting
        categoryFilter.addEventListener('change', filterAndSortProducts);
        priceFilter.addEventListener('input', (e) => {
            priceVal.textContent = `₹${Number(e.target.value).toLocaleString('en-IN')}`;
            filterAndSortProducts();
        });
        sortDropdown.addEventListener('change', filterAndSortProducts);
    }

    function filterAndSortProducts() {
        const selectedCat = categoryFilter.value;
        const maxPrice = Number(priceFilter.value);
        const sortBy = sortDropdown.value;

        // 1. Filter by category and price
        let filtered = shopProducts.filter(item => {
            const matchesCat = selectedCat === 'all' || item.category === selectedCat;
            const matchesPrice = item.price <= maxPrice;
            return matchesCat && matchesPrice;
        });

        // 2. Sort products
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name-asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        renderProducts(filtered);
    }

    function renderProducts(products) {
        if (products.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 60px; color: var(--text-muted);">No furniture found matching your filters.</p>`;
            return;
        }

        grid.innerHTML = products.map(item => `
            <div class="product-card" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-img="${item.img}">
                <div class="product-img-box">
                    <img src="${item.img}" alt="${item.name}">
                    <button class="wishlist-btn" aria-label="Add to wishlist"><i class="fa-regular fa-heart"></i></button>
                    <a href="product.html" class="quick-view-overlay">Quick View</a>
                </div>
                <div class="product-details">
                    <span class="product-category">${item.category}</span>
                    <h3 class="product-title"><a href="product.html">${item.name}</a></h3>
                    <div class="product-rating">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                        <span>(${item.reviews})</span>
                    </div>
                    <div class="product-footer">
                        <span class="product-price">₹${item.price.toLocaleString('en-IN')}</span>
                        <button class="btn-add-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-bind click event handlers for the newly rendered cards
        initWishlistToggle();
        initAddToCart();
    }
});