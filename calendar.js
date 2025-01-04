document.addEventListener('DOMContentLoaded', function() {
    const calendarView = document.querySelector('.calendar-view');
    const addEventButton = document.querySelector('#add-event-button');
    const editEventButton = document.querySelector('#edit-event-button');
    const deleteEventButton = document.querySelector('#delete-event-button');
    const eventForm = document.querySelector('#event-form');
    const eventTitleInput = document.querySelector('#event-title');
    const eventDateInput = document.querySelector('#event-date');
    const eventTimeInput = document.querySelector('#event-time');
    const eventDescriptionInput = document.querySelector('#event-description');

    let events = [];

    addEventButton.addEventListener('click', function() {
        eventForm.style.display = 'block';
    });

    eventForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addEvent(eventTitleInput.value, eventDateInput.value, eventTimeInput.value, eventDescriptionInput.value);
        eventForm.style.display = 'none';
        eventTitleInput.value = '';
        eventDateInput.value = '';
        eventTimeInput.value = '';
        eventDescriptionInput.value = '';
    });

    function addEvent(title, date, time, description) {
        const event = {
            id: Date.now(),
            title,
            date,
            time,
            description
        };
        events.push(event);
        renderEvents();
    }

    function editEvent(id, newTitle, newDate, newTime, newDescription) {
        const event = events.find(event => event.id === id);
        if (event) {
            event.title = newTitle;
            event.date = newDate;
            event.time = newTime;
            event.description = newDescription;
            renderEvents();
        }
    }

    function deleteEvent(id) {
        events = events.filter(event => event.id !== id);
        renderEvents();
    }

    function renderEvents() {
        calendarView.innerHTML = '';
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item');
            eventItem.innerHTML = `
                <h3 class="event-title">${event.title}</h3>
                <p class="event-date">${event.date}</p>
                <p class="event-time">${event.time}</p>
                <p class="event-description">${event.description}</p>
                <button class="edit-event-button" data-id="${event.id}">Edit</button>
                <button class="delete-event-button" data-id="${event.id}">Delete</button>
            `;
            calendarView.appendChild(eventItem);
        });
    }

    // Function to sync calendar events with external calendar services
    function syncCalendarEvents() {
        // Placeholder for syncing functionality
        console.log('Syncing calendar events with external services...');
    }

    // Initial render
    renderEvents();
});
