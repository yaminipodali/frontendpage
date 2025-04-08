// This function runs after the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
  });
  
  function fetchData() {
    // Replace '/api/users' with your actual endpoint
    fetch('http://localhost:3000/api/hackathons')
      .then(response => response.json())
      .then(data => {
        // Check the data in the console
        console.log('Fetched data:', data);
  
        // Target the <ul> where we'll display data
        const listElement = document.getElementById('data-list');
        listElement.innerHTML = ''; // Clear any existing content
  
        // If data is an array, loop through and create <li> for each item
        data.forEach(item => {
          const li = document.createElement('li');
          // Adjust to match your data fields
          li.textContent = `${item.name} - ${item.date || 'No date available'}`;

          listElement.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  