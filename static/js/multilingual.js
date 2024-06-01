document.addEventListener('DOMContentLoaded', function() {
    let currentLanguage = 'En';

    function loadTranslations(lang) {
        fetch('/static/json/translation.json')
            .then(response => response.json())
            .then(translations => changeLanguage(lang, translations))
            .catch(error => console.error('Error downloading translations:', error));
    }

    function changeLanguage(lang, translations) {
        if (currentLanguage !== lang) {
            currentLanguage = lang;
            document.querySelectorAll('.translatable').forEach(function(el) {
                var key = el.dataset.lang;
                if (translations[lang] && translations[lang][key]) {
                    if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
                        el.placeholder = translations[lang][key];
                    } else {
                        el.textContent = translations[lang][key];
                    }
                }
            });


            document.getElementById('current-lang').textContent = currentLanguage;
            document.getElementById('switch-lang').textContent = currentLanguage === 'En' ? 'Ua' : 'En';
        }
    }

    document.getElementById('current-lang').addEventListener('click', function() {
        var newLang = currentLanguage === 'En' ? 'Ua' : 'En';
        loadTranslations(newLang);
    });

    document.getElementById('switch-lang').addEventListener('click', function() {
        var newLang = this.textContent;
        loadTranslations(newLang);
    });

    loadTranslations(currentLanguage);
});