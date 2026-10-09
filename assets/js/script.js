// --- 1. MOBILE DRAWER TOGGLE ---
function openMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (drawer && backdrop) {
        drawer.classList.remove('translate-x-full');
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
    }
}

function closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (drawer && backdrop) {
        drawer.classList.add('translate-x-full');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
    }
}

// --- 2. DIET, CATEGORY & INSTANT 1-LETTER SEARCH ENGINE ---
let currentDiet = 'all';
let currentCategory = 'all';

function setDietFilter(diet) {
    currentDiet = diet;

    const btnAll = document.getElementById('toggle-all');
    const btnVeg = document.getElementById('toggle-veg');
    const btnNonveg = document.getElementById('toggle-nonveg');

    const mBtnAll = document.getElementById('m-toggle-all');
    const mBtnVeg = document.getElementById('m-toggle-veg');
    const mBtnNonveg = document.getElementById('m-toggle-nonveg');

    [btnAll, btnVeg, btnNonveg, mBtnAll, mBtnVeg, mBtnNonveg].forEach(btn => {
        if (btn) {
            btn.style.background = 'transparent';
            btn.style.color = '#32281E';
            btn.classList.remove('font-extrabold', 'shadow-sm');
        }
    });

    if (diet === 'all') {
        if (btnAll) { btnAll.style.background = 'linear-gradient(135deg, #C89B3C 0%, #E5A93C 50%, #96691E 100%)'; btnAll.style.color = '#FFFFFF'; btnAll.classList.add('font-extrabold', 'shadow-sm'); }
        if (mBtnAll) { mBtnAll.style.background = 'linear-gradient(135deg, #C89B3C 0%, #E5A93C 50%, #96691E 100%)'; mBtnAll.style.color = '#FFFFFF'; mBtnAll.classList.add('font-extrabold', 'shadow-sm'); }
    } else if (diet === 'veg') {
        if (btnVeg) { btnVeg.style.background = '#2D8A4E'; btnVeg.style.color = '#FFFFFF'; btnVeg.classList.add('font-extrabold', 'shadow-sm'); }
        if (mBtnVeg) { mBtnVeg.style.background = '#2D8A4E'; mBtnVeg.style.color = '#FFFFFF'; mBtnVeg.classList.add('font-extrabold', 'shadow-sm'); }
    } else if (diet === 'nonveg') {
        if (btnNonveg) { btnNonveg.style.background = '#B91C1C'; btnNonveg.style.color = '#FFFFFF'; btnNonveg.classList.add('font-extrabold', 'shadow-sm'); }
        if (mBtnNonveg) { mBtnNonveg.style.background = '#B91C1C'; mBtnNonveg.style.color = '#FFFFFF'; mBtnNonveg.classList.add('font-extrabold', 'shadow-sm'); }
    }

    updateBannerForDiet(diet);
    applyFilters();
}

function filterCategory(cat) {
    currentCategory = cat;

    const catButtons = document.querySelectorAll('.cat-btn');
    catButtons.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(cat)) {
            btn.className = "cat-btn px-4 py-2 rounded-full text-xs sm:text-sm font-bold gold-btn-gradient text-white shadow-sm whitespace-nowrap";
        } else {
            btn.className = "cat-btn px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-beige-light text-beige-accent hover:bg-beige-dark/30 whitespace-nowrap";
        }
    });

    applyFilters();
}

function applyFilters() {
    const searchInput = document.getElementById('menu-search');
    const rawQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const cards = document.querySelectorAll('.dish-card');

    cards.forEach(card => {
        const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
        const cardDiet = (card.getAttribute('data-diet') || '').toLowerCase();

        const titleEl = card.querySelector('.dish-title');
        const descEl = card.querySelector('.dish-desc');

        const titleText = titleEl ? titleEl.textContent.toLowerCase() : '';
        const descText = descEl ? descEl.textContent.toLowerCase() : '';

        const searchableText = `${titleText} ${descText} ${cardCat} ${cardDiet}`;

        const matchesDiet = (currentDiet === 'all') || (cardDiet === currentDiet);
        const matchesCat = (currentCategory === 'all') || (cardCat === currentCategory);
        const matchesSearch = (rawQuery === '') || searchableText.includes(rawQuery);

        if (matchesDiet && matchesCat && matchesSearch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-drawer-close');
    const backdrop = document.getElementById('mobile-drawer-backdrop');

    if (menuBtn) menuBtn.addEventListener('click', openMobileDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawer);
    if (backdrop) backdrop.addEventListener('click', closeMobileDrawer);

    const drawerLinks = document.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => link.addEventListener('click', closeMobileDrawer));

    const searchInput = document.getElementById('menu-search');
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
        searchInput.addEventListener('keyup', applyFilters);
        searchInput.addEventListener('paste', applyFilters);
    }
});

// --- 3. HERO BACKGROUND CAROUSEL ---
const bgSlides = [
    document.getElementById('hero-bg-1'),
    document.getElementById('hero-bg-2'),
    document.getElementById('hero-bg-3')
];
let currentBgIndex = 0;

setInterval(() => {
    if (bgSlides[currentBgIndex]) bgSlides[currentBgIndex].style.opacity = '0';
    currentBgIndex = (currentBgIndex + 1) % bgSlides.length;
    if (bgSlides[currentBgIndex]) bgSlides[currentBgIndex].style.opacity = '0.25';
}, 3000);

// --- 4. FEATURED DISH SLIDER & DOT CONTROLS ---
const bannerFeaturedItems = [
    {
        title: "Mahabhoj Veg Thali",
        category: "Grand Signature",
        price: "249",
        diet: "🌱 Pure Veg",
        dietTag: "veg",
        dietClass: "bg-veg",
        desc: "Plain Rice, Dal, 2 Sabji, Bhaja, Salad, Papad & Payesh.",
        img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Kolkata Special Chicken Biryani",
        category: "Heritage Special",
        price: "289",
        diet: "🍗 Non-Veg",
        dietTag: "nonveg",
        dietClass: "bg-nonveg",
        desc: "Fragrant basmati rice cooked with chicken, potato, and egg.",
        img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Sautéed Chicken Salad",
        category: "Fitness Corner",
        price: "179",
        diet: "🥗 Fitness Clean",
        dietTag: "nonveg",
        dietClass: "bg-gold-dark",
        desc: "Sautéed chicken breast, bell peppers, lettuce, and light dressing.",
        img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
    }
];

let bannerIndex = 0;

function updateDotsUI(activeIndex) {
    const dots = document.querySelectorAll('#banner-slider-dots .banner-dot');
    dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
            dot.className = "banner-dot w-3 h-3 rounded-full bg-gold transition-all duration-300 transform scale-110 focus:outline-none";
        } else {
            dot.className = "banner-dot w-2.5 h-2.5 rounded-full bg-gold/30 hover:bg-gold/60 transition-all duration-300 focus:outline-none";
        }
    });
}

function renderBannerCard(item, index) {
    const bannerImg = document.getElementById('banner-card-img');
    const bannerTitle = document.getElementById('banner-card-title');
    const bannerCategory = document.getElementById('banner-card-category');
    const bannerPrice = document.getElementById('banner-card-price');
    const bannerDesc = document.getElementById('banner-card-desc');
    const bannerDiet = document.getElementById('banner-card-diet');

    if (bannerImg) {
        bannerImg.style.opacity = '0.2';
        setTimeout(() => {
            bannerImg.src = item.img;
            if (bannerTitle) bannerTitle.textContent = item.title;
            if (bannerCategory) bannerCategory.textContent = item.category;
            if (bannerPrice) bannerPrice.textContent = item.price;
            if (bannerDesc) bannerDesc.textContent = item.desc;
            if (bannerDiet) {
                bannerDiet.textContent = item.diet;
                bannerDiet.className = `absolute top-3 left-3 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase shadow-md ${item.dietClass}`;
            }
            bannerImg.style.opacity = '1';
        }, 200);
    }
    updateDotsUI(index);
}

function setBannerSlide(index) {
    const filteredBannerItems = bannerFeaturedItems.filter(item => currentDiet === 'all' || item.dietTag === currentDiet);
    if (filteredBannerItems[index]) {
        bannerIndex = index;
        renderBannerCard(filteredBannerItems[bannerIndex], bannerIndex);
    }
}

function updateBannerForDiet(diet) {
    const filteredBannerItems = bannerFeaturedItems.filter(item => diet === 'all' || item.dietTag === diet);
    if (filteredBannerItems.length > 0) {
        bannerIndex = 0;
        renderBannerCard(filteredBannerItems[0], 0);
    }
}

setInterval(() => {
    const filteredBannerItems = bannerFeaturedItems.filter(item => currentDiet === 'all' || item.dietTag === currentDiet);
    if (filteredBannerItems.length > 0) {
        bannerIndex = (bannerIndex + 1) % filteredBannerItems.length;
        renderBannerCard(filteredBannerItems[bannerIndex], bannerIndex);
    }
}, 3000);

// --- 5. SURPRISE CRAVING MODAL ---
const surpriseModal = document.getElementById('surprise-modal');
const surpriseDishes = [
    { title: "Mahabhoj Veg Thali", price: "₹249", desc: "Authentic 9-item Bengali feast.", diet: "Pure Veg", dietClass: "bg-veg" },
    { title: "Kolkata Special Biryani", price: "₹289", desc: "Saffron basmati rice cooked with chicken, egg & potato.", diet: "Non-Veg", dietClass: "bg-nonveg" },
    { title: "Reshmi Chicken Kebab", price: "₹219", desc: "Melt-in-mouth cashew marinated grilled chicken.", diet: "Non-Veg", dietClass: "bg-nonveg" },
    { title: "Sautéed Chicken Salad", price: "₹179", desc: "Clean macro-friendly sautéed chicken breast salad.", diet: "Fitness Clean", dietClass: "bg-gold-dark" }
];

function triggerSurpriseCraving() {
    const randomDish = surpriseDishes[Math.floor(Math.random() * surpriseDishes.length)];
    const titleEl = document.getElementById('surprise-title');
    const priceEl = document.getElementById('surprise-price');
    const descEl = document.getElementById('surprise-desc');
    const dietBadge = document.getElementById('surprise-diet');

    if (titleEl) titleEl.textContent = randomDish.title;
    if (priceEl) priceEl.textContent = randomDish.price;
    if (descEl) descEl.textContent = randomDish.desc;
    if (dietBadge) {
        dietBadge.textContent = randomDish.diet;
        dietBadge.className = `text-[10px] sm:text-xs font-bold uppercase px-2 py-0.5 rounded-full text-white ${randomDish.dietClass}`;
    }

    if (surpriseModal) surpriseModal.classList.remove('opacity-0', 'pointer-events-none');
}

function closeSurpriseModal() {
    if (surpriseModal) surpriseModal.classList.add('opacity-0', 'pointer-events-none');
}

// --- 6. BOOK TABLE MODAL LOGIC ---
const bookingModal = document.getElementById('booking-modal');

function openBookingModal() {
    if (bookingModal) bookingModal.classList.remove('opacity-0', 'pointer-events-none');
}

function closeBookingModal() {
    if (bookingModal) bookingModal.classList.add('opacity-0', 'pointer-events-none');
}

function closeModalOnBackdrop(event, modalId) {
    if (event.target.id === modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('opacity-0', 'pointer-events-none');
    }
}

function handleBookingSubmit(e) {
    e.preventDefault();
    alert('Thank you! Your table reservation request has been submitted. We will confirm via call shortly.');
    closeBookingModal();
}