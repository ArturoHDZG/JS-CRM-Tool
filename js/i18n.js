/**
 * Load translations from a JSON file based on the provided language.
 *
 * @param {string} lang - The language code (e.g., 'en', 'es').
 * @returns {Promise<Object>} - A promise that resolves to the translations object.
 */
async function loadTranslations(lang) {
  const response = await fetch(`/locales/${lang}.json`);
  return response.json();
}

/**
 * Apply translations to elements with the 'data-i18n' attribute.
 *
 * @param {Object} translations - The translations object.
 */
function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translations[key] || key;
  });
}

/**
 * Event listener for the DOMContentLoaded event.
 * It sets the user's language, loads translations, and applies them to the page.
 */
document.addEventListener('DOMContentLoaded', async () => {
  const userLang = navigator.language || navigator.userLanguage;
  const lang = userLang.startsWith('es') ? 'es' : 'en';
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
});
