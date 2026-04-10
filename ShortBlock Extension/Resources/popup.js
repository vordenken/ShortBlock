// popup.js - ShortBlock

const STORAGE_KEY = 'shortBlockEnabled';

const enabledToggle = document.getElementById('enabledToggle');
const statusText = document.getElementById('statusText');
const versionEl = document.getElementById('version');

// ── Helpers ────────────────────────────────────────────────────────────────

function updateStatus(enabled) {
    statusText.textContent = enabled
        ? 'Blocking YouTube Shorts'
        : 'Shorts are not blocked';
    statusText.classList.toggle('status-off', !enabled);
}

// ── Load state ─────────────────────────────────────────────────────────────

async function loadState() {
    try {
        const result = await browser.storage.local.get({ [STORAGE_KEY]: true });
        const enabled = result[STORAGE_KEY] !== false;
        enabledToggle.checked = enabled;
        updateStatus(enabled);
    } catch (e) {
        console.error('[ShortBlock] Failed to load state:', e);
    }
}

// ── Save state & notify tabs ───────────────────────────────────────────────

async function saveState(enabled) {
    try {
        await browser.storage.local.set({ [STORAGE_KEY]: enabled });
    } catch (e) {
        console.error('[ShortBlock] Failed to save state:', e);
    }

    // Notify all YouTube tabs
    try {
        const tabs = await browser.tabs.query({});
        for (const tab of tabs) {
            if (tab.id && tab.url && isYouTubeUrl(tab.url)) {
                browser.tabs.sendMessage(tab.id, {
                    command: 'setEnabled',
                    enabled,
                }).catch(() => {
                    // Tab may not have the content script (e.g. special pages)
                });
            }
        }
    } catch (e) {
        console.error('[ShortBlock] Failed to notify tabs:', e);
    }
}

function isYouTubeUrl(url) {
    try {
        const hostname = new URL(url).hostname;
        return hostname === 'www.youtube.com' ||
               hostname === 'youtube.com' ||
               hostname === 'm.youtube.com' ||
               hostname === 'music.youtube.com';
    } catch (_) {
        return false;
    }
}

// ── Event listeners ────────────────────────────────────────────────────────

enabledToggle.addEventListener('change', () => {
    const enabled = enabledToggle.checked;
    updateStatus(enabled);
    saveState(enabled);
});

// ── Version ────────────────────────────────────────────────────────────────

try {
    const manifest = browser.runtime.getManifest();
    versionEl.textContent = `v${manifest.version}`;
} catch (_) {}

// ── Init ───────────────────────────────────────────────────────────────────

loadState();
