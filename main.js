/* ==========================================
   FURNIQA MAIN JAVASCRIPT (Global functions)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileMenu();
    initSearchOverlay();
    initWishlistToggle();
    initAddToCart();
    initNewsletterValidation();
    updateCartCountBadge();
});

/* 1. Sticky Header Effect */
function initStickyHeader() {
    const header = document.getElementById('stickyHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* 2. Mobile Hamburger Menu */
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/* 3. Search Overlay Toggle */
function initSearchOverlay() {
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchInput.focus();
        });

        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
    }
}

/* 4. Wishlist Toggle */
function initWishlistToggle() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                showToast('Added to your wishlist!');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                showToast('Removed from your wishlist!');
            }
        });
    });
}

/* 5. Add to Cart & localStorage integration */
function initAddToCart() {
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const id = card.getAttribute('data-id');
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));
            const img = card.getAttribute('data-img');

            addToCart({ id, name, price, img, quantity: 1 });
        });
    });
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('furniqa_cart')) || [];
    
    // Check if item already exists in cart
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('furniqa_cart', JSON.stringify(cart));
    updateCartCountBadge();
    showToast(`"${product.name}" added to cart!`);
}

function updateCartCountBadge() {
    const cart = JSON.parse(localStorage.getItem('furniqa_cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.cart-count');
    if (badge) {
        badge.textContent = totalCount;
    }
}

/* 6. Toast Notification Generator */
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* 7. Newsletter Email Validation */
function initNewsletterValidation() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const msg = document.getElementById('newsletterMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                msg.textContent = 'Please enter a valid email address.';
                msg.className = 'form-message error';
            } else {
                msg.textContent = 'Thank you for subscribing! Check your inbox soon.';
                msg.className = 'form-message success';
                emailInput.value = '';
            }
        });
    }
}