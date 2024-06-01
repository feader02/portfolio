document.addEventListener('DOMContentLoaded', function () {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const submitButton = document.getElementById('submitButton');

    function validateForm() {
        if (fullName.value.trim() !== '' && email.value.trim() !== '') {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    fullName.addEventListener('input', validateForm);
    email.addEventListener('input', validateForm);

    submitButton.addEventListener('click', function () {
        if (!submitButton.disabled) {
            console.log("Form submitted successfully!");
        }
    });

    function showSuccessMessage() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('success') && !sessionStorage.getItem('formSubmitted')) {
            const messageDiv = document.getElementById('success-message');
            messageDiv.style.display = 'flex';
            messageDiv.style.alignItems = 'center';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
            sessionStorage.setItem('formSubmitted', 'true');
        }
    }

    function resetFormSubmissionFlag() {
        sessionStorage.removeItem('formSubmitted');
    }

    window.onload = showSuccessMessage;
});
