document.addEventListener('DOMContentLoaded', function() {
    let currentLanguage = 'En';

    function loadTranslations(lang) {
        fetch('/static/json/translation.json')
            .then(response => response.json())
            .then(translations => changeLanguage(lang, translations))
            .catch(error => console.error('Error to download translations:', error));
    }

    function changeLanguage(lang, translations) {
        if (currentLanguage !== lang) {
            currentLanguage = lang;
            document.querySelectorAll('.translatable').forEach(function(el) {
                var key = el.dataset.lang;
                if (translations[lang] && translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });

            // Update button text
            document.getElementById('current-lang').textContent = currentLanguage;
            document.getElementById('switch-lang').textContent = currentLanguage === 'En' ? 'Ua' : 'En';
        }
    }

    // Click handlers for language change buttons
    document.getElementById('current-lang').addEventListener('click', function() {
        var newLang = currentLanguage === 'En' ? 'Ua' : 'En';
        if (this.textContent !== currentLanguage) {
            loadTranslations(newLang);
        }
    });

    document.getElementById('switch-lang').addEventListener('click', function() {
        var newLang = this.textContent;
        if (newLang !== currentLanguage) {
            loadTranslations(newLang);
        }
    });

    // Load translations and set the initial language
    loadTranslations(currentLanguage);
});