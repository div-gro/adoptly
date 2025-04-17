document.addEventListener('DOMContentLoaded', function () {
    const petGrid = document.getElementById('pet-grid');

    // Fetch pets from the backend (make sure your backend has this route)
    async function fetchPets() {
        try {
            // Request the pet data from the backend
            const response = await fetch('http://localhost:3000/pets'); 
            if (!response.ok) {
                throw new Error('Failed to fetch pets');
            }

            const pets = await response.json(); // Assuming response is JSON

            // Check if pets are available
            if (pets.length === 0) {
                petGrid.innerHTML = '<p>No pets available for adoption at the moment.</p>';
                return;
            }

            // Create pet cards dynamically
            pets.forEach(pet => {
                const petCard = document.createElement('div');
                petCard.classList.add('pet-card');

                // Create the content of the pet card
                petCard.innerHTML = `
                    <img src="${pet.imageUrl}" alt="${pet.name}">
                    <h4>${pet.name}</h4>
                    <p>${pet.breed}, ${pet.age} years old</p>
                   <p>${pet.location}${pet.distance ? ` (${pet.distance} km away)` : ''}</p>
                    <a href="./pet-info.html?id=${pet._id}" class="btn">View Details</a>
                `;

                // Append the pet card to the grid
                petGrid.appendChild(petCard);
            });
        } catch (error) {
            console.error('Error fetching pets:', error);
            petGrid.innerHTML = '<p>Sorry, there was an error fetching the pets.</p>';
        }
    }

    // Call the fetchPets function to load the pets when the page loads
    fetchPets();
});
