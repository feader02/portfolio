document.addEventListener('DOMContentLoaded', function() {
    let currentLanguage = 'En';
    let translations = {};

    function loadTranslations(lang) {
        fetch('/static/json/translation.json')
            .then(response => response.json())
            .then(translationsData => {
                translations = translationsData;
                changeLanguage(lang, true);
            })
            .catch(error => console.error('Error to download translations:', error));
    }

    function changeLanguage(lang, isInitialLoad = false) {
        if (currentLanguage !== lang || isInitialLoad) {
            currentLanguage = lang;
            currentPhrase = 0;
            currentLetter = 0;
            currentDirection = 'forward';
            writerElement.textContent = '';
            type();
        }
    }

    const phrases = {
        En: ['Reliability', 'Velocity', 'Quality', 'Support'],
        Ua: ['Надійність', 'Швидкість', 'Якість', 'Підтримка']
    };
    let currentPhrase = 0;
    let currentLetter = 0;
    let currentDirection = 'forward';
    const typingSpeed = 200;
    const deletingSpeed = 100;
    const pauseTime = 1500;
    const cursorElement = document.createElement('span');
    cursorElement.classList.add('cursor');
    const writerElement = document.querySelector('.main-page__content-writer');
    writerElement.appendChild(cursorElement);

    function type() {
        if (currentDirection === 'forward') {
            if (currentLetter < phrases[currentLanguage][currentPhrase].length) {
                writerElement.textContent += phrases[currentLanguage][currentPhrase][currentLetter];
                currentLetter++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(() => {
                    currentDirection = 'backward';
                    type();
                }, pauseTime);
            }
        } else {
            if (currentLetter > 0) {
                writerElement.textContent = writerElement.textContent.substring(0, writerElement.textContent.length - 1);
                currentLetter--;
                setTimeout(type, deletingSpeed);
            } else {
                currentPhrase = (currentPhrase + 1) % phrases[currentLanguage].length;
                currentDirection = 'forward';
                setTimeout(type, typingSpeed);
            }
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

    loadTranslations(currentLanguage);
});