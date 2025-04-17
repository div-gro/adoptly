document.addEventListener('DOMContentLoaded', function () {
  const petId = new URLSearchParams(window.location.search).get('id'); // Get the pet ID from the URL

  if (!petId) {
    alert('Pet ID is missing');
    return;
  }

  const petName = document.getElementById('petName');
  const petImage = document.getElementById('petImage');
  const petSummary = document.getElementById('petSummary');
  const petDescription = document.getElementById('petDescription');
  const petDetailsList = document.getElementById('petDetailsList');
  const enquireBtn = document.getElementById('enquireBtn');

  // Fetch the pet details from the backend using the pet ID
  async function fetchPetDetails() {
    try {
      const response = await fetch(`http://localhost:3000/pets/${petId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch pet details');
      }

      const pet = await response.json(); // Assuming the response is in JSON format

      // Check if the pet data exists
      if (!pet) {
        alert('Pet not found');
        return;
      }

      // Populate the pet details on the page
      petName.textContent = pet.name || 'Unknown';
      petImage.src = pet.imageUrl || './assets/icons/default-pet-image.png';
      petImage.alt = pet.name || 'Pet Image';
      petSummary.textContent = `${pet.breed}, ${pet.age} years old | ${pet.location}`;
      petDescription.textContent = pet.description || 'No description available';

      // Populate the list with additional pet details
      const details = [
        { label: 'Age', value: pet.age },
        { label: 'Breed', value: pet.breed },
        { label: 'Location', value: pet.location },
        { label: 'Gender', value: pet.gender },
        { label: 'Uploader', value: pet.uploaderName ? pet.uploaderName.join(', ') : 'No uploader available' },
        { label: 'Uploader Email', value: pet.uploaderEmail ? pet.uploaderEmail.join(', ') : 'No uploader email available' }
      ];

      details.forEach(detail => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${detail.label}:</strong> ${detail.value}`;
        petDetailsList.appendChild(listItem);
      });

      // Enquire button functionality (optional)
      enquireBtn.addEventListener('click', () => {
        alert(`Enquiring about ${pet.name}...`);
        // You can add additional functionality, like opening a form or sending an email
      });

    } catch (error) {
      console.error('Error fetching pet details:', error);
      alert('There was an error fetching pet details.');
    }
  }

  // Call the fetchPetDetails function to load the pet information
  fetchPetDetails();
});
