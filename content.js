// == Formatting Box Toggle Extension ==

function setFormattingBoxVisibility(visible) {
    const box = document.getElementById('editor_pad_v2');
    if (box) {
        box.style.display = visible ? 'block' : 'none';
    }
}

let formattingBoxEnabled = false;

const observer = new MutationObserver(() => {
    if (!formattingBoxEnabled) setFormattingBoxVisibility(false);
});
observer.observe(document.body, { childList: true, subtree: true });

function addToggleIconButton() {
    if (document.getElementById('formattingBoxToggleIconBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'formattingBoxToggleIconBtn';
    btn.title = formattingBoxEnabled ? 'Disable Formatting Box' : 'Enable Formatting Box';
    btn.style.position = 'fixed';
    btn.style.bottom = '24px';
    btn.style.right = '24px';
    btn.style.zIndex = 9999;
    btn.style.width = '40px';
    btn.style.height = '40px';
    btn.style.padding = '0';
    btn.style.background = '#fff';
    btn.style.border = '1px solid #1976d2';
    btn.style.borderRadius = '50%';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.10)';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.transition = 'background 0.2s';
    btn.onmouseenter = () => btn.style.background = '#e3f0fc';
    btn.onmouseleave = () => btn.style.background = '#fff';

    // Use the extension icon as the button image
    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('icon48.png');
    icon.alt = 'Toggle Formatting Box';
    icon.style.width = '24px';
    icon.style.height = '24px';
    btn.appendChild(icon);

    btn.onclick = () => {
        formattingBoxEnabled = !formattingBoxEnabled;
        setFormattingBoxVisibility(formattingBoxEnabled);
        btn.title = formattingBoxEnabled ? 'Disable Formatting Box' : 'Enable Formatting Box';
        btn.style.borderColor = formattingBoxEnabled ? '#388e3c' : '#1976d2';
    };
    document.body.appendChild(btn);
}

function handleKeyboardShortcut(e) {
    // Ctrl+Shift+M (not used by browser or common sites)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'm') {
        formattingBoxEnabled = !formattingBoxEnabled;
        setFormattingBoxVisibility(formattingBoxEnabled);
        const btn = document.getElementById('formattingBoxToggleIconBtn');
        if (btn) {
            btn.title = formattingBoxEnabled ? 'Disable Formatting Box' : 'Enable Formatting Box';
            btn.style.borderColor = formattingBoxEnabled ? '#388e3c' : '#1976d2';
        }
    }
}

function init() {
    addToggleIconButton();
    setFormattingBoxVisibility(false);
    window.addEventListener('keydown', handleKeyboardShortcut, true);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
} 