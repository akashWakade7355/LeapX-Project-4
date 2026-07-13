const upcommingBtn=document.querySelector("#upcommingBtn");
const pastBtn=document.querySelector("#pastBtn");

upcommingBtn.addEventListener("click",()=>{
    window.location.href="registeredEvents-upcomming.html"
});

pastBtn.addEventListener("click",()=>{
    window.location.href="registeredEvents-past.html"
})

// ==========================================
// REGISTERED EVENTS
// ==========================================

const STORAGE_KEY = "events";

const CURRENT_USER_ID = "USER_001";

const eventsContainer = document.getElementById("registeredEventsContainer");

// ==========================================
// GET EVENTS
// ==========================================

function getEvents() {

    try {

        const events = JSON.parse(localStorage.getItem(STORAGE_KEY));

        return Array.isArray(events)
            ? events
            : [];

    }

    catch (error) {

        console.error(error);

        return [];

    }

}

// ==========================================
// GET REGISTERED EVENTS
// ==========================================

function getRegisteredEvents() {

    const events = getEvents();

    return events.filter(event => {

        if (!Array.isArray(event.attendees)) {

            return false;

        }

        return event.attendees.some(attendee =>
            attendee.id === CURRENT_USER_ID
        );

    });

}

// ==========================================
// GET PAST EVENTS
// ==========================================

function getPastEvents() {

    const now = new Date();

    return getRegisteredEvents().filter(event => {

        const eventDateTime = new Date(
            `${event.startDate}T${event.startTime || "00:00"}`
        );

        return eventDateTime < now;

    });

}

// ==========================================
// GET UPCOMING EVENTS
// ==========================================

function getUpcomingEvents() {

    const now = new Date();

    return getRegisteredEvents().filter(event => {

        const eventDateTime = new Date(
            `${event.startDate}T${event.startTime || "00:00"}`
        );

        return eventDateTime >= now;

    });

}

// ==========================================
// RENDER REGISTERED EVENTS
// ==========================================

function renderRegisteredEvents() {

    if (!eventsContainer) return;

    const isPastPage =
    window.location.pathname.includes("registeredEvents-past");

    const events = isPastPage
    ? getPastEvents()
    : getUpcomingEvents();

    if (events.length === 0) {

        eventsContainer.innerHTML = `
            <div class="text-center text-light">
                <h4>No Registered Events</h4>
                <p>You haven't registered for any events yet.</p>
            </div>
        `;

        return;

    }

    eventsContainer.innerHTML = events.map(event => `

        <div class="timeline-item">

            <div class="timeline-date">

                <h4>${new Date(event.startDate).toLocaleDateString("en-IN")}</h4>

                <span>${event.startTime || ""}</span>

            </div>

            <div class="timeline-line">

                <div class="timeline-dot"></div>

            </div>

            <div class="event-card">

                <div class="row align-items-center">

                    <div class="col-md-8">

                        <span class="event-time">
                            ${event.category || "General"}
                        </span>

                        <h3>${event.title}</h3>

                        <p>
                            <i class="bi bi-geo-alt"></i>
                            ${event.location || "Location"}
                        </p>

                        <p>
                            ${event.description || ""}
                        </p>

                        <div class="event-buttons">

                            <span class="status bg-success">
                                Registered
                            </span>

                        </div>

                    </div>

                    <div class="col-md-4 text-end">

                        <img
                            src="${event.bannerImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200'}"
                            class="event-banner"
                        >

                    </div>

                </div>

            </div>

        </div>

    `).join("");

}

// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    renderRegisteredEvents();

});