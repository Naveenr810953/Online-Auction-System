// Sample auction data with image URLs
const auctions = [
    {
        id: 1,
        title: "Vintage Rolex Watch",
        description: "A classic timepiece from the 1960s in excellent condition.",
        currentBid: 1250,
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        endTime: "2023-12-15T23:59:59",
        bids: 12,
        category: "jewelry"     
    },
    {
        id: 2,
        title: "Signed Baseball",
        description: "Baseball signed by Babe Ruth, comes with certificate of authenticity.",
        currentBid: 3200,
        image: "https://images.unsplash.com/photo-1566158572857-5a2571eb3d6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFzZWJhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        endTime: "2023-12-10T14:30:00",
        bids: 8,
        category: "collectibles"
    },
    {
        id: 3,
        title: "Antique Persian Rug",
        description: "Handwoven silk rug from the early 1900s, 8x10 feet.",
        currentBid: 4500,
        image: "https://images.unsplash.com/photo-1602488257136-2263674725d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cnVnfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        endTime: "2023-12-20T12:00:00",
        bids: 5,
        category: "furniture"
    },
    {
        id: 4,
        title: "Rare Vinyl Record Collection",
        description: "Collection of 50 rare jazz vinyl records from the 1950s.",
        currentBid: 1800,
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmlueWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        endTime: "2023-12-12T18:45:00",
        bids: 15,
        category: "collectibles"
    },
    {
        id: 5,
        title: "Designer Handbag",
        description: "Limited edition designer handbag, never used.",
        currentBid: 950,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        endTime: "2023-12-08T10:15:00",
        bids: 20,
        category: "fashion"
    },
    {
        id: 6,
        title: "Vintage Wine Collection",
        description: "Assortment of 12 bottles from renowned vineyards, 1970-1985.",
        currentBid: 5200,
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2luZSUyMGNvbGxlY3Rpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        endTime: "2023-12-25T20:00:00",
        bids: 6,
        category: "food"
    },
    {
        id: 7,
        title: "Smartphone - Latest Model",
        description: "Brand new smartphone with all the latest features.",
        currentBid: 800,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        endTime: "2023-12-18T15:30:00",
        bids: 25,
        category: "electronics"
    },
    {
        id: 8,
        title: "Vintage Camera Collection",
        description: "Set of 5 vintage cameras from the 1950s to 1970s.",
        currentBid: 1200,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        endTime: "2023-12-22T17:45:00",
        bids: 9,
        category: "collectibles"
    }
];

// DOM Elements
const auctionGrid = document.getElementById('auctionGrid');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const bidModal = document.getElementById('bidModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const bidForm = document.getElementById('bidForm');
const successAlert = document.getElementById('successAlert');
const errorAlert = document.getElementById('errorAlert');
const themeToggle = document.getElementById('themeToggle');
const categoryFilter = document.getElementById('category');
const sortFilter = document.getElementById('sort');
const searchFilter = document.getElementById('search');

// Initialize the application
function init() {
    renderAuctionItems();
    setupEventListeners();
    startAuctionTimers();
}

// Render auction items to the grid
function renderAuctionItems() {
    auctionGrid.innerHTML = '';
    
    // Filter and sort auctions
    let filteredAuctions = [...auctions];
    
    // Category filter
    if (categoryFilter.value) {
        filteredAuctions = filteredAuctions.filter(auction => auction.category === categoryFilter.value);
    }
    
    // Search filter
    if (searchFilter.value) {
        const searchTerm = searchFilter.value.toLowerCase();
        filteredAuctions = filteredAuctions.filter(auction => 
            auction.title.toLowerCase().includes(searchTerm) || 
            auction.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort auctions
    switch(sortFilter.value) {
        case 'ending':
            filteredAuctions.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
            break;
        case 'newest':
            filteredAuctions.sort((a, b) => new Date(b.endTime) - new Date(a.endTime));
            break;
        case 'price-low':
            filteredAuctions.sort((a, b) => a.currentBid - b.currentBid);
            break;
        case 'price-high':
            filteredAuctions.sort((a, b) => b.currentBid - a.currentBid);
            break;
    }
    
    // Display message if no auctions found
    if (filteredAuctions.length === 0) {
        auctionGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No auctions found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    // Render auction cards
    filteredAuctions.forEach(auction => {
        const timeLeft = calculateTimeLeft(auction.endTime);
        
        const auctionCard = document.createElement('div');
        auctionCard.className = 'auction-card';
        auctionCard.innerHTML = `
            <div class="card-image">
                <img src="${auction.image}" alt="${auction.title}">
                <button class="watchlist-btn" data-id="${auction.id}">
                    <i class="far fa-heart"></i>
                </button>
                <div class="auction-tag">${auction.category}</div>
            </div>
            <div class="card-content">
                <h3>${auction.title}</h3>
                <p>${auction.description}</p>
                <div class="current-bid">$${auction.currentBid.toLocaleString()}</div>
                <div class="time-left">
                    <i class="fas fa-clock"></i>
                    <span class="time-remaining" data-end="${auction.endTime}">${timeLeft}</span>
                </div>
                <div class="card-actions">
                    <button class="btn btn-outline"><i class="fas fa-info-circle"></i> Details</button>
                    <button class="btn btn-primary bid-btn" data-id="${auction.id}"><i class="fas fa-gavel"></i> Bid Now</button>
                </div>
            </div>
        `;
        
        auctionGrid.appendChild(auctionCard);
    });
    
    // Add event listeners to bid buttons
    document.querySelectorAll('.bid-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const auctionId = parseInt(e.target.closest('.bid-btn').getAttribute('data-id'));
            openBidModal(auctionId);
        });
    });
    
    // Add event listeners to watchlist buttons
    document.querySelectorAll('.watchlist-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const icon = btn.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                btn.classList.add('active');
                showSuccess('Added to watchlist');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                btn.classList.remove('active');
                showSuccess('Removed from watchlist');
            }
        });
    });
}

// Calculate time left until auction ends
function calculateTimeLeft(endTime) {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end - now;
    
    if (diff <= 0) return 'Auction ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m left`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s left`;
    return `${minutes}m ${seconds}s left`;
}

// Start updating auction timers
function startAuctionTimers() {
    setInterval(() => {
        document.querySelectorAll('.time-remaining').forEach(element => {
            const endTime = element.getAttribute('data-end');
            element.textContent = calculateTimeLeft(endTime);
            
            // Change color if less than 1 hour remaining
            const end = new Date(endTime);
            const now = new Date();
            const diff = end - now;
            
            if (diff > 0 && diff < 3600000) { // Less than 1 hour
                element.style.color = 'var(--danger)';
                element.parentElement.classList.add('pulse');
            } else {
                element.parentElement.classList.remove('pulse');
            }
        });
    }, 1000);
}

// Set up event listeners
function setupEventListeners() {
    // Modal open buttons
    document.getElementById('loginBtn').addEventListener('click', () => openModal(loginModal));
    document.getElementById('registerBtn').addEventListener('click', () => openModal(registerModal));
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeAllModals();
        });
    });
    
    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    bidForm.addEventListener('submit', handleBid);
    
    // Input validation
    setupFormValidation();
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Filter changes
    categoryFilter.addEventListener('change', renderAuctionItems);
    sortFilter.addEventListener('change', renderAuctionItems);
    searchFilter.addEventListener('input', debounce(renderAuctionItems, 300));
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Toggle between light and dark mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Open a modal
function openModal(modal) {
    closeAllModals();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close all modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
    clearFormErrors();
}

// Open bid modal with item details
function openBidModal(auctionId) {
    const auction = auctions.find(a => a.id === auctionId);
    if (!auction) {
        showError('Auction item not found');
        return;
    }
    
    document.getElementById('bidItemId').value = auction.id;
    document.getElementById('bidItemTitle').textContent = `Bid on: ${auction.title}`;
    
    const timeLeft = calculateTimeLeft(auction.endTime);
    document.getElementById('bidItemDetails').innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <img src="${auction.image}" alt="${auction.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
            <p>${auction.description}</p>
            <p><strong>Current Bid:</strong> $${auction.currentBid.toLocaleString()}</p>
            <p><strong>Time Left:</strong> ${timeLeft}</p>
            <p><strong>Number of Bids:</strong> ${auction.bids}</p>
        </div>
    `;
    
    document.getElementById('bidAmount').value = auction.currentBid + 10;
    document.getElementById('bidAmount').min = auction.currentBid + 1;
    
    openModal(bidModal);
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    if (validateForm(loginForm)) {
        // Simulate login process
        showSuccess('Login successful!');
        closeAllModals();
    }
}

// Handle registration form submission
function handleRegister(e) {
    e.preventDefault();
    
    if (validateForm(registerForm)) {
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            showFieldError('registerConfirmPassword', 'Passwords do not match');
            return;
        }
        
        // Simulate registration process
        showSuccess('Registration successful! You can now login.');
        closeAllModals();
    }
}

// Handle bid form submission
function handleBid(e) {
    e.preventDefault();
    
    if (validateForm(bidForm)) {
        const auctionId = parseInt(document.getElementById('bidItemId').value);
        const bidAmount = parseFloat(document.getElementById('bidAmount').value);
        
        const auction = auctions.find(a => a.id === auctionId);
        if (!auction) {
            showError('Auction item not found');
            return;
        }
        
        if (bidAmount <= auction.currentBid) {
            showFieldError('bidAmount', 'Bid must be higher than current price');
            return;
        }
        
        // Simulate bid placement
        auction.currentBid = bidAmount;
        auction.bids += 1;
        
        showSuccess(`Your bid of $${bidAmount.toLocaleString()} has been placed!`);
        closeAllModals();
        renderAuctionItems();
    }
}

// Set up form validation
function setupFormValidation() {
    // Login form validation
    document.getElementById('loginEmail').addEventListener('blur', () => {
        validateEmail('loginEmail');
    });
    
    document.getElementById('loginPassword').addEventListener('blur', () => {
        validateRequired('loginPassword');
    });
    
    // Register form validation
    document.getElementById('registerName').addEventListener('blur', () => {
        validateRequired('registerName');
    });
    
    document.getElementById('registerEmail').addEventListener('blur', () => {
        validateEmail('registerEmail');
    });
    
    document.getElementById('registerPassword').addEventListener('blur', () => {
        validatePassword('registerPassword');
    });
    
    document.getElementById('registerConfirmPassword').addEventListener('blur', () => {
        validateRequired('registerConfirmPassword');
    });
    
    // Bid form validation
    document.getElementById('bidAmount').addEventListener('blur', () => {
        validateRequired('bidAmount');
    });
}

// Validate a form
function validateForm(form) {
    let isValid = true;
    
    if (form.id === 'loginForm') {
        if (!validateEmail('loginEmail')) isValid = false;
        if (!validateRequired('loginPassword')) isValid = false;
    } else if (form.id === 'registerForm') {
        if (!validateRequired('registerName')) isValid = false;
        if (!validateEmail('registerEmail')) isValid = false;
        if (!validatePassword('registerPassword')) isValid = false;
        if (!validateRequired('registerConfirmPassword')) isValid = false;
    } else if (form.id === 'bidForm') {
        if (!validateRequired('bidAmount')) isValid = false;
    }
    
    return isValid;
}

// Validate email field
function validateEmail(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    const email = field.value.trim();
    
    if (!email) {
        showFieldError(fieldId, 'Email is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError(fieldId, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(fieldId);
    return true;
}

// Validate required field
function validateRequired(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(fieldId, 'This field is required');
        return false;
    }
    
    clearFieldError(fieldId);
    return true;
}

// Validate password field
function validatePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const password = field.value;
    
    if (!password) {
        showFieldError(fieldId, 'Password is required');
        return false;
    }
    
    if (password.length < 8) {
        showFieldError(fieldId, 'Password must be at least 8 characters');
        return false;
    }
    
    clearFieldError(fieldId);
    return true;
}

// Show field error
function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById(fieldId).classList.add('error');
}

// Clear field error
function clearFieldError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    errorElement.style.display = 'none';
    document.getElementById(fieldId).classList.remove('error');
}

// Clear all form errors
function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });
}

// Show success message
function showSuccess(message) {
    successAlert.textContent = message;
    successAlert.style.display = 'block';
    errorAlert.style.display = 'none';
    
    setTimeout(() => {
        successAlert.style.display = 'none';
    }, 5000);
}

// Show error message
function showError(message) {
    errorAlert.textContent = message;
    errorAlert.style.display = 'block';
    successAlert.style.display = 'none';
    
    setTimeout(() => {
        errorAlert.style.display = 'none';
    }, 5000);
}

// Check for saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    checkTheme();
});
