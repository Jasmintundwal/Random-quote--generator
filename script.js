// ============================================================================
// State Management
// ============================================================================
let currentQuote = null;
let currentCategory = "all";
let recentIndices = []; // Prevents recently shown quotes from repeating
let favorites = [];
let speechSynthUtterance = null;
let isSpeaking = false;

// DOM Elements
const quoteTextEl = document.getElementById("quoteText");
const quoteAuthorEl = document.getElementById("quoteAuthor");
const quoteCategoryEl = document.getElementById("quoteCategory");
const quoteCounterEl = document.getElementById("quoteCounter");
const quoteContentEl = document.getElementById("quoteContent");
const categoryFilterEl = document.getElementById("categoryFilter");

const newQuoteBtn = document.getElementById("newQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const listenBtn = document.getElementById("listenBtn");
const shareBtn = document.getElementById("shareBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");

const toastEl = document.getElementById("toast");
const favoritesToggleBtn = document.getElementById("favoritesToggleBtn");
const favoritesModal = document.getElementById("favoritesModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const favoritesListEl = document.getElementById("favoritesList");
const clearFavoritesBtn = document.getElementById("clearFavoritesBtn");
const favoritesBadge = document.getElementById("favoritesBadge");

// ============================================================================
// Initialization
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadFavorites();
  populateCategories();
  displayNewQuote(false); // 1. Displays a random quote immediately on app open

  setupEventListeners();
});

// ============================================================================
// Quote Selection Logic (Guaranteed Different Quote Each Time)
// ============================================================================
function getFilteredQuotes() {
  if (currentCategory === "all") {
    return quotesData;
  }
  return quotesData.filter(q => q.category.toLowerCase() === currentCategory.toLowerCase());
}

/**
 * Returns a new quote guaranteed to be different from the current quote.
 * Also avoids recently shown quotes where possible.
 */
function getNextRandomQuote() {
  const availableQuotes = getFilteredQuotes();

  if (availableQuotes.length === 0) {
    return quotesData[0];
  }

  if (availableQuotes.length === 1) {
    return availableQuotes[0];
  }

  // Filter out the current quote to guarantee a different quote
  let candidates = availableQuotes.filter(q => !currentQuote || q.text !== currentQuote.text);

  // Further try to filter out recent quotes (last 10% of library or up to 10 quotes)
  const maxRecent = Math.min(10, Math.floor(availableQuotes.length / 2));
  const candidatePool = candidates.filter(q => !recentIndices.includes(q.text));

  const finalPool = candidatePool.length > 0 ? candidatePool : candidates;
  const randomIndex = Math.floor(Math.random() * finalPool.length);
  const selectedQuote = finalPool[randomIndex];

  // Update recent list
  recentIndices.push(selectedQuote.text);
  if (recentIndices.length > maxRecent) {
    recentIndices.shift();
  }

  return selectedQuote;
}

/**
 * Updates DOM elements with the given quote data.
 */
function renderQuote(quote) {
  currentQuote = quote;

  // 3. Display text and author name clearly
  quoteTextEl.textContent = `"${currentQuote.text}"`;
  quoteAuthorEl.textContent = currentQuote.author;
  quoteCategoryEl.textContent = currentQuote.category;

  // Calculate quote index in full collection
  const quoteIndex = quotesData.findIndex(q => q.text === currentQuote.text) + 1;
  quoteCounterEl.textContent = `Quote #${quoteIndex}`;

  // Update favorite button status for this quote
  updateFavoriteButtonStatus();
}

/**
 * Displays a new quote with a smooth transition.
 */
function displayNewQuote(animated = true) {
  // Stop text-to-speech if it is playing
  stopSpeech();

  if (!animated) {
    const nextQuote = getNextRandomQuote();
    renderQuote(nextQuote);
    quoteContentEl.classList.add("fade-in");
    return;
  }

  // Button spin animation
  newQuoteBtn.classList.add("spinning");
  setTimeout(() => newQuoteBtn.classList.remove("spinning"), 500);

  // Content fade-out transition
  quoteContentEl.classList.remove("fade-in");
  quoteContentEl.classList.add("fade-out");

  setTimeout(() => {
    // 2. Fetch guaranteed different quote
    const nextQuote = getNextRandomQuote();
    renderQuote(nextQuote);

    // Content fade-in transition
    quoteContentEl.classList.remove("fade-out");
    quoteContentEl.classList.add("fade-in");
  }, 200);
}

// ============================================================================
// Categories Setup
// ============================================================================
function populateCategories() {
  const categories = Array.from(new Set(quotesData.map(q => q.category))).sort();

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilterEl.appendChild(option);
  });

  categoryFilterEl.addEventListener("change", (e) => {
    currentCategory = e.target.value;
    recentIndices = []; // Reset recent tracking for new category
    displayNewQuote();
  });
}

// ============================================================================
// Copy to Clipboard Feature
// ============================================================================
async function copyQuoteToClipboard() {
  if (!currentQuote) return;

  const quoteString = `"${currentQuote.text}" — ${currentQuote.author}`;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(quoteString);
    } else {
      // Fallback for non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = quoteString;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    // Visual feedback on button
    copyBtn.classList.add("copied");
    showToast("Quote copied to clipboard!");
    setTimeout(() => {
      copyBtn.classList.remove("copied");
    }, 2000);
  } catch (err) {
    showToast("Failed to copy quote.");
  }
}

// ============================================================================
// Text-to-Speech (Listen) Feature
// ============================================================================
function toggleSpeech() {
  if (!('speechSynthesis' in window)) {
    showToast("Speech synthesis is not supported in this browser.");
    return;
  }

  if (isSpeaking) {
    stopSpeech();
    return;
  }

  if (!currentQuote) return;

  window.speechSynthesis.cancel(); // Stop any pending speech

  const speakText = `${currentQuote.text}. By ${currentQuote.author}.`;
  speechSynthUtterance = new SpeechSynthesisUtterance(speakText);
  speechSynthUtterance.rate = 0.95;
  speechSynthUtterance.pitch = 1.0;

  speechSynthUtterance.onstart = () => {
    isSpeaking = true;
    listenBtn.classList.add("speaking");
    listenBtn.setAttribute("title", "Stop listening");
  };

  speechSynthUtterance.onend = () => {
    stopSpeech();
  };

  speechSynthUtterance.onerror = () => {
    stopSpeech();
  };

  window.speechSynthesis.speak(speechSynthUtterance);
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isSpeaking = false;
  listenBtn.classList.remove("speaking");
  listenBtn.setAttribute("title", "Listen to quote (L)");
}

// ============================================================================
// Share Quote (X / Twitter)
// ============================================================================
function shareQuote() {
  if (!currentQuote) return;
  const tweetText = encodeURIComponent(`"${currentQuote.text}" — ${currentQuote.author}\n\n#QuoteOfTheDay #${currentQuote.category}`);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(twitterUrl, "_blank", "noopener,noreferrer");
}

// ============================================================================
// Favorites / Bookmark Management
// ============================================================================
function loadFavorites() {
  try {
    const saved = localStorage.getItem("quote_favorites");
    favorites = saved ? JSON.parse(saved) : [];
  } catch (e) {
    favorites = [];
  }
  updateFavoritesCountBadge();
}

function saveFavorites() {
  try {
    localStorage.setItem("quote_favorites", JSON.stringify(favorites));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
  updateFavoritesCountBadge();
  renderFavoritesList();
}

function updateFavoritesCountBadge() {
  favoritesBadge.textContent = favorites.length;
}

function isCurrentQuoteFavorited() {
  if (!currentQuote) return false;
  return favorites.some(f => f.text === currentQuote.text && f.author === currentQuote.author);
}

function updateFavoriteButtonStatus() {
  if (isCurrentQuoteFavorited()) {
    favoriteBtn.classList.add("favorited");
    favoriteBtn.setAttribute("title", "Remove from favorites (F)");
  } else {
    favoriteBtn.classList.remove("favorited");
    favoriteBtn.setAttribute("title", "Save to favorites (F)");
  }
}

function toggleFavorite() {
  if (!currentQuote) return;

  const index = favorites.findIndex(f => f.text === currentQuote.text && f.author === currentQuote.author);

  if (index > -1) {
    favorites.splice(index, 1);
    favoriteBtn.classList.remove("favorited");
    showToast("Removed from favorites");
  } else {
    favorites.unshift({ ...currentQuote, savedAt: new Date().toISOString() });
    favoriteBtn.classList.add("favorited");
    showToast("Saved to favorites!");
  }

  saveFavorites();
}

function renderFavoritesList() {
  favoritesListEl.innerHTML = "";

  if (favorites.length === 0) {
    favoritesListEl.innerHTML = `
      <div class="empty-favorites">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <p>No saved quotes yet.<br>Click the heart icon on any quote to save it!</p>
      </div>
    `;
    clearFavoritesBtn.style.display = "none";
    return;
  }

  clearFavoritesBtn.style.display = "block";

  favorites.forEach((fav, index) => {
    const item = document.createElement("div");
    item.className = "favorite-item";
    item.innerHTML = `
      <p class="favorite-item-text">"${fav.text}"</p>
      <div class="favorite-item-footer">
        <span class="favorite-item-author">— ${fav.author}</span>
        <div class="favorite-item-actions">
          <button class="mini-btn copy-fav-btn" title="Copy quote" aria-label="Copy quote">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button class="mini-btn delete-btn delete-fav-btn" title="Remove quote" aria-label="Remove quote">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Copy favorite listener
    item.querySelector(".copy-fav-btn").addEventListener("click", async () => {
      await navigator.clipboard.writeText(`"${fav.text}" — ${fav.author}`);
      showToast("Quote copied to clipboard!");
    });

    // Delete favorite listener
    item.querySelector(".delete-fav-btn").addEventListener("click", () => {
      favorites.splice(index, 1);
      saveFavorites();
      updateFavoriteButtonStatus();
      showToast("Quote removed.");
    });

    favoritesListEl.appendChild(item);
  });
}

function openFavoritesModal() {
  renderFavoritesList();
  favoritesModal.classList.add("open");
  favoritesModal.setAttribute("aria-hidden", "false");
}

function closeFavoritesModal() {
  favoritesModal.classList.remove("open");
  favoritesModal.setAttribute("aria-hidden", "true");
}

function clearAllFavorites() {
  if (favorites.length === 0) return;
  if (confirm("Are you sure you want to clear all saved quotes?")) {
    favorites = [];
    saveFavorites();
    updateFavoriteButtonStatus();
    showToast("All favorites cleared.");
  }
}

// ============================================================================
// Theme Management (Light / Dark)
// ============================================================================
function initTheme() {
  const savedTheme = localStorage.getItem("quote_theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("quote_theme", nextTheme);
}

// ============================================================================
// Toast Notification
// ============================================================================
let toastTimeout = null;

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2200);
}

// ============================================================================
// Event Listeners & Keyboard Shortcuts
// ============================================================================
function setupEventListeners() {
  // New Quote button click
  newQuoteBtn.addEventListener("click", displayNewQuote);

  // Copy button click
  copyBtn.addEventListener("click", copyQuoteToClipboard);

  // Listen button click
  listenBtn.addEventListener("click", toggleSpeech);

  // Share button click
  shareBtn.addEventListener("click", shareQuote);

  // Favorite button click
  favoriteBtn.addEventListener("click", toggleFavorite);

  // Theme toggle button click
  themeToggleBtn.addEventListener("click", toggleTheme);

  // Favorites modal controls
  favoritesToggleBtn.addEventListener("click", openFavoritesModal);
  closeModalBtn.addEventListener("click", closeFavoritesModal);
  clearFavoritesBtn.addEventListener("click", clearAllFavorites);

  // Close modal when clicking outside modal panel
  favoritesModal.addEventListener("click", (e) => {
    if (e.target === favoritesModal) {
      closeFavoritesModal();
    }
  });

  // Global Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    // If inside a select or modal is open (except Escape), ignore single key triggers
    const isModalOpen = favoritesModal.classList.contains("open");

    if (e.key === "Escape") {
      if (isModalOpen) closeFavoritesModal();
      return;
    }

    if (isModalOpen || document.activeElement.tagName === "SELECT") {
      return;
    }

    // Spacebar or 'N' for New Quote
    if (e.code === "Space" || e.key.toLowerCase() === "n") {
      e.preventDefault();
      displayNewQuote();
    }
    // 'C' for Copy
    else if (e.key.toLowerCase() === "c") {
      e.preventDefault();
      copyQuoteToClipboard();
    }
    // 'L' for Listen
    else if (e.key.toLowerCase() === "l") {
      e.preventDefault();
      toggleSpeech();
    }
    // 'F' for Favorite
    else if (e.key.toLowerCase() === "f") {
      e.preventDefault();
      toggleFavorite();
    }
    // 'T' for Theme toggle
    else if (e.key.toLowerCase() === "t") {
      e.preventDefault();
      toggleTheme();
    }
  });
}
