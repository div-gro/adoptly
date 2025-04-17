document.addEventListener('DOMContentLoaded', function () {
    const petTypeSelect = document.getElementById('pet-type');
    const otherPetTypeDiv = document.getElementById('other-pet-type');
    const otherPetTypeInput = document.getElementById('other-pet-type-input');
    const messageBox = document.getElementById('submission-message');

    // Set uploader info if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('You must be logged in to list a pet for adoption.');
        window.location.href = './login.html';
        return;
    }

    // Handle 'Other' pet type
    petTypeSelect.addEventListener('change', function () {
        if (this.value === 'other') {
            otherPetTypeDiv.style.display = 'block';
            otherPetTypeInput.required = true;
        } else {
            otherPetTypeDiv.style.display = 'none';
            otherPetTypeInput.required = false;
        }
    });

    // Form submission handler
    const form = document.getElementById('pet-submission-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Prepare form data
        const formData = new FormData(form);

        // Append uploader info from localStorage
        formData.append('uploaderName', currentUser.name);
        formData.append('uploaderEmail', currentUser.email);


        try {
            const response = await fetch('http://localhost:3000/rehome', {
                method: 'POST',
                body: formData // Send the form data (including image)
            });

            const result = await response.json();

            if (response.ok) {
                messageBox.textContent = result.message;
                messageBox.style.color = 'green';
                form.reset();
            } else {
                messageBox.textContent = 'Error: ' + result.message;
                messageBox.style.color = 'red';
            }
        } catch (err) {
            console.error('Error:', err);
            messageBox.textContent = 'Failed to submit pet data.';
            messageBox.style.color = 'red';
        }
    });
});
