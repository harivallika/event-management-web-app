// Simple event creation (can be extended for more functionality)
document.getElementById('createEventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventLocation = document.getElementById('eventLocation').value;
    
    // Simulate form submission (e.g., AJAX to backend)
    console.log('Event Created:', eventTitle, eventDescription, eventDate, eventLocation);
    alert('Event Created Successfully!');
  });
  
  // Handle event registration
  document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    console.log('Registered:', name, email);
    alert('Registration Successful!');
    
  });
  