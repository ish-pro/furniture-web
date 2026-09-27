/* ==========================================
   PRODUCT PAGE INTERACTIONS (Gallery & Qty)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThumbnailSwitcher();
    initQuantitySelector();
    initDetailAddToCart();
});

/* 1. Thumbnail Image Switcher */
function initThumbnailSwitcher() {
    const mainImg = document.getElementById('mainProductImg');
    const thumbs = document.querySelectorAll('.thumbnail-row img');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImg.src = thumb.src;
        });
    });

    // Color Swatch active state
    const swatches = document.querySelectorAll('.swatch');
    const colorNameSpan = document.getElementById('selectedColorName');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            colorNameSpan.textContent = swatch.getAttribute('data-color');
        });
    });
}

/* 2. Quantity Increase / Decrease */
function initQuantitySelector() {
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const qtyInput = document.getElementById('qtyInput');

    if (increaseBtn && decreaseBtn) {
        increaseBtn.addEventListener('click', () => {
            let current = parseInt(qtyInput.value);
            qtyInput.value = current + 1;
        });

        decreaseBtn.addEventListener('click', () => {
            let current = parseInt(qtyInput.value);
            if (current > 1) {
                qtyInput.value = current - 1;
            }
        });
    }
}

/* 3. Add to Cart from Product Detail Page */
function initDetailAddToCart() {
    const addBtn = document.getElementById('detailAddToCart');
    const buyNowBtn = document.getElementById('detailBuyNow');

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const qty = parseInt(document.getElementById('qtyInput').value);
            const product = {
                id: '1',
                name: 'Luna Fabric Sofa',
                price: 24999,
                img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
                quantity: qty
            };

            let cart = JSON.parse(localStorage.getItem('furniqa_cart')) || [];
            const existingIndex = cart.findIndex(item => item.id === product.id);
            if (existingIndex > -1) {
                cart[existingIndex].quantity += qty;
            } else {
                cart.push(product);
            }

            localStorage.setItem('furniqa_cart', JSON.stringify(cart));
            updateCartCountBadge();
            showToast(`Added ${qty} item(s) to cart!`);
        });
    }

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            addBtn.click();
            window.location.href = 'cart.html';
        });
    }
}