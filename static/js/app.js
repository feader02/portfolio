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
});