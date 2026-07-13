// ==========================================================
// USER HOMEPAGE
// Displays all events created by organizers
// ==========================================================

// ==========================================
// CONSTANTS
// ==========================================

const STORAGE_KEY = "events";

const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200";

const STATUS = {
  GOING: "Going",
  PENDING: "Pending"
};

// ==========================================
// DOM
// ==========================================

const eventsContainer = document.getElementById("eventsContainer");

const dateFilter = document.getElementById("dateFilter");
const categoryFilter = document.getElementById("categoryFilter");

// ==========================================
// CATEGORY FILTER
// ==========================================

categoryFilter.addEventListener("change", () => {

    const selectedCategory = categoryFilter.value;

    const events = getEvents();

    if (!selectedCategory) {

        loadEvents();
        return;

    }

    const filteredEvents = events.filter(event =>

        event.category === selectedCategory

    );

    renderEvents(filteredEvents);

});

// ==========================================
// LOCAL STORAGE
// ==========================================

function getEvents() {

    try {

        const events = JSON.parse(localStorage.getItem(STORAGE_KEY));

        return Array.isArray(events)
            ? events
            : [];

    }

    catch(error){

        console.error(error);

        return [];

    }

}

// ==========================================
// HELPERS
// ==========================================

function escapeHTML(text){

    const div = document.createElement("div");

    div.textContent = text ?? "";

    return div.innerHTML;

}

function imageURL(url){

    if(url && url.trim() !== ""){

        return url;

    }

    return DEFAULT_BANNER;

}

function attendeeCount(event){

    if(!Array.isArray(event.attendees)){

        return 0;

    }

    return event.attendees.length;

}

function formatDate(date){

    if(!date){

        return "Date Not Available";

    }

    return new Date(date).toLocaleDateString("en-IN",{

        day:"numeric",
        month:"short",
        year:"numeric"

    });

}

function formatTime(time){

    if(!time){

        return "Time Not Available";

    }

    return time;

}

// ==========================================
// EMPTY STATE
// ==========================================

function showEmptyState(){

    eventsContainer.innerHTML = `

        <div class="col-12">

            <div class="no-events">

                <h3>No Events Available</h3>

                <p>

                    Organizers haven't created any events yet.

                </p>

            </div>

        </div>

    `;

}

// ==========================================
// EVENT CARD
// ==========================================

function createEventCard(event){

    return `

        <div class="col-lg-4 col-md-6">

            <div
                class="event-card"
                onclick="window.location.href='eventDetails.html?id=${event.id}'"
                style="cursor:pointer;"
            >

                <img
                    src="${imageURL(event.bannerImage)}"
                    class="event-image"
                    onerror="this.src='${DEFAULT_BANNER}'"
                >

                <div class="event-content">

                    <span class="event-category">

                        ${escapeHTML(event.category || "General")}

                    </span>

                    <h3 class="event-title">

                        ${escapeHTML(event.title || "Untitled Event")}

                    </h3>

                    <p class="event-info">

                        <i class="bi bi-calendar-event"></i>

                        ${formatDate(event.startDate)}

                    </p>

                    <p class="event-info">

                        <i class="bi bi-clock"></i>

                        ${formatTime(event.startTime)}

                    </p>

                    <p class="event-info">

                        <i class="bi bi-geo-alt"></i>

                        ${escapeHTML(event.location || "Location Not Available")}

                    </p>

                    <p class="event-info">

                        <i class="bi bi-people-fill"></i>

                        ${attendeeCount(event)} Registered

                    </p>

                    <div class="event-footer">

                        <span class="attendee-count">

                            Capacity :
                            ${event.capacity || "Unlimited"}

                        </span>

                        ${
                        event.attendees?.some(user => user.id === "USER_001")

                        ?
                        
                `<button
                    class="event-btn"
                    disabled
                    onclick="event.stopPropagation()"
                    style="background:#198754;cursor:not-allowed;">
                        ✓ Registered
                    </button>`

                    :

                `<button
                     class="event-btn register-btn"
                     data-id="${event.id}"
                     onclick="event.stopPropagation()">
                     Register
                </button>`
}

                    </div>

                </div>

            </div>

        </div>

    `;

}

// ==========================================
// RENDER EVENTS
// ==========================================

function renderEvents(events){

    if(events.length === 0){

        showEmptyState();

        return;

    }

    eventsContainer.innerHTML = events
        .map(createEventCard)
        .join("");

}

// ==========================================
// LOAD EVENTS
// ==========================================

function loadEvents() {

    const events = getEvents();

    // Show newest events first
    events.sort((a, b) => {

        const dateA = new Date(a.startDate || 0);
        const dateB = new Date(b.startDate || 0);

        return dateA - dateB;

    });

    renderEvents(events);

}

// ==========================================
// DATE FILTER
// ==========================================

dateFilter.addEventListener("change", () => {

    const selectedDate = dateFilter.value;

    const events = getEvents();

    if (!selectedDate) {

        loadEvents();
        return;

    }

    const filteredEvents = events.filter(event =>
        event.startDate === selectedDate
    );

    renderEvents(filteredEvents);

});

// ==========================================
// REGISTER EVENT
// ==========================================

document.addEventListener("click", function (e) {

    if (!e.target.classList.contains("register-btn")) return;

    const eventId = e.target.dataset.id;

    let events = getEvents();

    const event = events.find(
    ev => String(ev.id) === String(eventId)
);

    if (!event) {
        alert("Event not found.");
        return;
    }

    // Create attendees array if missing
    if (!Array.isArray(event.attendees)) {
        event.attendees = [];
    }

    // Demo user
    const currentUser = {
        id: "USER_001",
        name: "Demo User",
        status: "Going"
    };

    // Prevent duplicate registration
    const alreadyRegistered = event.attendees.some(
        attendee => attendee.id === currentUser.id
    );

    if (alreadyRegistered) {
        alert("You have already registered for this event.");
        return;
    }

    // Capacity check
    if (
        event.capacity &&
        event.attendees.length >= Number(event.capacity)
    ) {
        alert("Event is Full.");
        return;
    }

    // Register user
    event.attendees.push(currentUser);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

    alert("Registration Successful!");

    loadEvents();

});

// ==========================================
// PAGE INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadEvents();

});