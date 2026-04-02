// content.js - ShortBlock
// Hides YouTube Shorts from feed, sidebar, search results, and redirects /shorts/ pages

const STORAGE_KEY = 'shortBlockEnabled';
const REDIRECT_DELAY_MS = 50;
const DOM_OBSERVE_DELAY_MS = 300;

let blockingEnabled = true;

// CSS selectors for all YouTube Shorts elements
// Uses :has() (supported in Safari 15.4+ / macOS 12.3+, well within our macOS 13.5+ requirement)
const SHORTS_SELECTORS = [
    // ── Sidebar navigation ──────────────────────────────────────────────────
    // Left guide panel "Shorts" entry
    'ytd-guide-entry-renderer:has(a[href="/shorts"])',
    // Mini guide (collapsed sidebar)
    'ytd-mini-guide-entry-renderer:has(a[href="/shorts"])',

    // ── Home feed shelves ───────────────────────────────────────────────────
    // Dedicated Shorts shelf on home page
    'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])',
    // Reels shelf
    'ytd-reel-shelf-renderer',
    // Generic Shorts renderer
    'ytd-shorts',

    // ── Individual items in feeds ───────────────────────────────────────────
    // Home feed item containing a /shorts/ link
    'ytd-rich-item-renderer:has(a[href*="/shorts/"])',
    // Reel item
    'ytd-reel-item-renderer',

    // ── Search results ──────────────────────────────────────────────────────
    // Video result card linking to /shorts/
    'ytd-video-renderer:has(a[href*="/shorts/"])',
    // Horizontal shelf of shorts in search
    'ytd-shelf-renderer:has(ytd-reel-item-renderer)',

    // ── Up-next / recommended sidebar ──────────────────────────────────────
    // Compact video card linking to /shorts/
    'ytd-compact-video-renderer:has(a[href*="/shorts/"])',

    // ── Browse / filter chips ───────────────────────────────────────────────
    // "Shorts" chip in the topic filter bar
    'yt-chip-cloud-chip-renderer:has(yt-formatted-string[title="Shorts"])',

    // ── Channel pages ───────────────────────────────────────────────────────
    // "Shorts" tab on a channel
    'tp-yt-paper-tab:has(yt-formatted-string[title="Shorts"])',
    // Grid item for a short on channel Shorts tab
    'ytd-grid-video-renderer:has(a[href*="/shorts/"])',
    // Rich grid item for a short
    'ytd-rich-item-renderer:has(ytd-shorts-lockup-view-model)',
    // Shorts lockup view model (newer YouTube layout)
    'ytd-shorts-lockup-view-model-v2',
    'ytd-shorts-lockup-view-model',
];

// ── Core blocking logic ────────────────────────────────────────────────────

function hideShorts() {
    if (!blockingEnabled) return;
    SHORTS_SELECTORS.forEach(selector => {
        try {
            document.querySelectorAll(selector).forEach(el => {
                if (el.style.display !== 'none') {
                    el.style.setProperty('display', 'none', 'important');
                }
            });
        } catch (_) {
            // Silently ignore unsupported selectors
        }
    });
}

function showShorts() {
    SHORTS_SELECTORS.forEach(selector => {
        try {
            document.querySelectorAll(selector).forEach(el => {
                el.style.removeProperty('display');
            });
        } catch (_) {}
    });
}

// ── Shorts page redirect ───────────────────────────────────────────────────

function handleShortsPage() {
    if (!blockingEnabled) return;
    if (window.location.pathname.startsWith('/shorts/') ||
        window.location.pathname === '/shorts') {
        // Navigate to YouTube homepage instead
        window.location.replace('https://www.youtube.com/');
    }
}

// ── SPA navigation detection ───────────────────────────────────────────────

let lastUrl = location.href;

function onNavigate() {
    const url = location.href;
    if (url === lastUrl) return;
    lastUrl = url;
    if (blockingEnabled) {
        handleShortsPage();
        // Re-run after content loads
        setTimeout(hideShorts, DOM_OBSERVE_DELAY_MS);
    }
}

// Intercept pushState/replaceState for SPA navigation
(function patchHistory() {
    const _push = history.pushState.bind(history);
    const _replace = history.replaceState.bind(history);
    history.pushState = function (...args) {
        _push(...args);
        onNavigate();
    };
    history.replaceState = function (...args) {
        _replace(...args);
        onNavigate();
    };
})();

window.addEventListener('popstate', onNavigate);

// ── DOM mutation observer ──────────────────────────────────────────────────
// YouTube renders content dynamically; we must react to DOM changes

const observer = new MutationObserver(() => {
    if (blockingEnabled) hideShorts();
});

function startObserving() {
    observer.observe(document.documentElement, {
        subtree: true,
        childList: true,
    });
}

// ── Message listener (from popup) ─────────────────────────────────────────

browser.runtime.onMessage.addListener((message) => {
    if (message.command === 'setEnabled') {
        blockingEnabled = message.enabled;
        if (blockingEnabled) {
            handleShortsPage();
            hideShorts();
        } else {
            showShorts();
        }
    }
});

// ── Initialisation ─────────────────────────────────────────────────────────

async function init() {
    try {
        const result = await browser.storage.local.get({ [STORAGE_KEY]: true });
        blockingEnabled = result[STORAGE_KEY] !== false;
    } catch (_) {
        blockingEnabled = true;
    }

    if (blockingEnabled) {
        handleShortsPage();
        hideShorts();
    }

    startObserving();
}

init();
