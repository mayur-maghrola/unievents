// Toggle sidebar collapse/expand functionality
const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Load events from localStorage or use default events
// Each event has: id, name, nature (Tech/Non-Tech/Workshop), date, status, postedByMe flag
let allEvents = JSON.parse(localStorage.getItem('allEvents')) || [
  {id: 1, name: "Hackathon Mania", nature: "Tech", date: "30 March 2026", status: "Registered", postedByMe: false},
  {id: 2, name: "C-Quest", nature: "Tech", date: "20 Feb 2026", status: "Not Registered", postedByMe: false},
  {id: 3, name: "Coding Vibe", nature: "Tech", date: "10 April 2026", status: "Not Registered", postedByMe: false},
  {id: 4, name: "AI Bharat", nature: "Tech", date: "15 April 2026", status: "Registered", postedByMe: false}
];

// Track current view (home, myRegistered, myPosts) and selected category
let currentView = 'home';
let currentCategory = 'All';

// Dynamically render events in the table based on view type
// viewType determines which buttons to show (Register/Unregister OR Edit/Delete)
function renderEvents(events, viewType = 'home') {
  const tbody = document.getElementById('eventTableBody');
  tbody.innerHTML = ''; // Clear existing rows
  
  events.forEach((event, index) => {
    const row = document.createElement('tr');
    row.dataset.nature = event.nature; // Store nature for filtering
    
    // Show Edit/Delete buttons for "My Post Events", Register/Unregister for others
    let actionButton = '';
    if (viewType === 'myPosts') {
      // For events posted by user: show Edit and Delete buttons
      actionButton = `<button class="action-btn edit-btn" data-id="${event.id}">Edit</button> <button class="action-btn delete-btn" data-id="${event.id}">Delete</button>`;
    } else {
      // For all other views: show Register button only if not registered, show "Registered" text if registered
      actionButton = event.status === 'Registered' 
        ? `<span class="registered-text">Registered</span>`
        : `<button class="action-btn register" data-id="${event.id}">Register</button>`;
    }
    
    // Build table row HTML
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${event.name}</td>
      <td>${event.nature}</td>
      <td>${event.date}</td>
      <td><span class="status ${event.status === 'Registered' ? 'registered' : 'not-registered'}">${event.status}</span></td>
      <td>${actionButton}</td>
    `;
    tbody.appendChild(row);
  });
  
  // Attach click listeners to all action buttons
  attachActionListeners();
}

// Handle clicks on Register/Unregister/Edit/Delete buttons
function attachActionListeners() {
  document.querySelectorAll(".action-btn").forEach(button => {
    button.addEventListener("click", () => {
      const eventId = parseInt(button.dataset.id);
      
      if (button.classList.contains("delete-btn")) {
        // DELETE: Remove event from array and update localStorage
        allEvents = allEvents.filter(e => e.id !== eventId);
        localStorage.setItem('allEvents', JSON.stringify(allEvents));
        updateView();
      } else if (button.classList.contains("edit-btn")) {
        // EDIT: Open modal with pre-filled event data
        editEvent(eventId);
      } else {
        // REGISTER: Change status to registered (no unregister option)
        const event = allEvents.find(e => e.id === eventId);
        if (button.classList.contains("register")) {
          event.status = "Registered";
          localStorage.setItem('allEvents', JSON.stringify(allEvents));
          updateView();
        }
      }
    });
  });
}

// Refresh the display based on current view and category selection
function updateView() {
  const categorySection = document.getElementById('categorySection');
  const pageTitle = document.getElementById('pageTitle');
  
  if (currentView === 'home') {
    // HOME VIEW: Show category buttons and filter by selected category
    categorySection.style.display = 'flex';
    pageTitle.textContent = 'Dashboard';
    const filtered = currentCategory === 'All' ? allEvents : allEvents.filter(e => e.nature === currentCategory);
    renderEvents(filtered, 'home');
  } else if (currentView === 'myRegistered') {
    // MY REGISTERED EVENTS: Show only registered events
    categorySection.style.display = 'none';
    pageTitle.textContent = 'My Registered Events';
    const registered = allEvents.filter(e => e.status === 'Registered');
    renderEvents(registered, 'myRegistered');
  } else if (currentView === 'myPosts') {
    // MY POST EVENTS: Show only events posted by user with Edit/Delete buttons
    categorySection.style.display = 'none';
    pageTitle.textContent = 'My Posted Events';
    const myPosts = allEvents.filter(e => e.postedByMe);
    renderEvents(myPosts, 'myPosts');
  }
}

// Handle category button clicks (Tech/Non-Tech/Workshop)
const categoryButtons = document.querySelectorAll(".category button");

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Update active button styling
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    // Update current category and refresh view
    currentCategory = btn.dataset.category;
    updateView();
  });
});

// Handle sidebar menu clicks to switch between views
const sidebarItems = document.querySelectorAll('.sidebar li');

// HOME button: Show dashboard with category filter
document.getElementById('homeBtn').addEventListener('click', () => {
  currentView = 'home';
  sidebarItems.forEach(item => item.classList.remove('active'));
  document.getElementById('homeBtn').classList.add('active');
  updateView();
});

// MY REGISTERED EVENTS button: Show only registered events
document.getElementById('myRegisteredBtn').addEventListener('click', () => {
  currentView = 'myRegistered';
  sidebarItems.forEach(item => item.classList.remove('active'));
  document.getElementById('myRegisteredBtn').classList.add('active');
  updateView();
});

// MY POST EVENTS button: Show only events posted by user
document.getElementById('myPostEventsBtn').addEventListener('click', () => {
  currentView = 'myPosts';
  sidebarItems.forEach(item => item.classList.remove('active'));
  document.getElementById('myPostEventsBtn').classList.add('active');
  updateView();
});

// Toggle profile card visibility on profile button click
const profileBtn = document.getElementById("profileBtn");
const profileCard = document.getElementById("profileCard");

profileBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent event bubbling
  profileCard.style.display =
    profileCard.style.display === "block" ? "none" : "block";
});

// Close profile card when clicking anywhere else on the page
document.addEventListener("click", () => {
  profileCard.style.display = "none";
});

// Handle opening/closing of event creation/edit modal
const newEventBtn = document.getElementById("newEventBtn");
const eventModal = document.getElementById("eventModal");
const closeModal = document.getElementById("closeModal");
const eventForm = document.getElementById("eventForm");
let editingEventId = null; // Track if we're editing (not null) or creating (null)

// NEW EVENT button: Open modal for creating new event
newEventBtn.addEventListener("click", () => {
  editingEventId = null; // Reset editing mode
  eventForm.reset(); // Clear form fields
  document.querySelector('#eventModal h2').textContent = 'New Event Entry';
  document.querySelector('.submit-btn').textContent = 'Save Event';
  eventModal.classList.add("active");
});

// Close modal when clicking X button
closeModal.addEventListener("click", () => {
  eventModal.classList.remove("active");
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (e) => {
  if (e.target === eventModal) {
    eventModal.classList.remove("active");
  }
});

// Pre-fill form with existing event data for editing
function editEvent(eventId) {
  const event = allEvents.find(e => e.id === eventId);
  if (!event) return;
  
  editingEventId = eventId; // Set editing mode
  
  // Convert stored date format (e.g., "30 March 2026") back to YYYY-MM-DD for date input
  const dateParts = event.date.split(' ');
  const months = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  const date = new Date(dateParts[2], months[dateParts[1]], dateParts[0]);
  const dateStr = date.toISOString().split('T')[0];
  
  // Pre-fill form fields with event data
  document.getElementById('eventName').value = event.name;
  document.getElementById('eventNature').value = event.nature;
  document.getElementById('eventDate').value = dateStr;
  
  // Update modal title and button text for editing
  document.querySelector('#eventModal h2').textContent = 'Edit Event';
  document.querySelector('.submit-btn').textContent = 'Update Event';
  eventModal.classList.add('active');
}

// Handle form submission for both creating new events and updating existing ones
eventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get time inputs
  const startTime = document.getElementById('eventStartTime').value;
  const endTime = document.getElementById('eventEndTime').value;
  
  // Convert 24-hour time format to 12-hour AM/PM format
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  // Create time period string (e.g., "10:00 AM - 1:00 PM")
  const timePeriod = `${formatTime(startTime)} - ${formatTime(endTime)}`;
  
  if (editingEventId) {
    // UPDATE MODE: Modify existing event
    const event = allEvents.find(e => e.id === editingEventId);
    event.name = document.getElementById('eventName').value;
    event.nature = document.getElementById('eventNature').value;
    event.date = new Date(document.getElementById('eventDate').value).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
    editingEventId = null; // Reset editing mode
  } else {
    // CREATE MODE: Add new event to array
    const newEvent = {
      id: allEvents.length > 0 ? Math.max(...allEvents.map(e => e.id)) + 1 : 1, // Generate unique ID
      name: document.getElementById('eventName').value,
      nature: document.getElementById('eventNature').value,
      date: new Date(document.getElementById('eventDate').value).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}),
      status: 'Not Registered', // New events start as not registered
      postedByMe: true // Mark as posted by current user
    };
    allEvents.push(newEvent);
  }
  
  // Save updated events array to localStorage
  localStorage.setItem('allEvents', JSON.stringify(allEvents));
  
  // Reset form and close modal
  eventForm.reset();
  eventModal.classList.remove('active');
  
  // Refresh the display
  updateView();
});

// Render the initial view when page loads
updateView();


// Handle logout button click
const logoutButton = document.getElementById('logoutBtn');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}