// ==========================================
// CONSTANTS
// ==========================================

const STORAGE_KEY = "events";
const CURRENT_USER_ID = "USER_001";

const DEFAULT_BANNER =
"https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200";

// ==========================================
// GET EVENT ID FROM URL
// ==========================================

const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

// ==========================================
// LOAD EVENTS
// ==========================================

const events = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const event = events.find(
    ev => String(ev.id) === String(eventId)
);

if (!event) {

    alert("Event not found.");

    window.location.href = "homepage.html";

}

// ==========================================
// DISPLAY EVENT
// ==========================================

document.getElementById("banner").src =
event.bannerImage || DEFAULT_BANNER;

document.getElementById("title").textContent =
event.title;

document.getElementById("category").textContent =
event.category;

document.getElementById("description").textContent =
event.description;

document.getElementById("date").textContent =
event.startDate;

document.getElementById("time").textContent =
event.startTime;

document.getElementById("location").textContent =
event.location;

document.getElementById("count").textContent =
`${event.attendees ? event.attendees.length : 0} Registered`;

// ==========================================
// REGISTER BUTTON
// ==========================================

const registerBtn = document.getElementById("registerBtn");

if (!Array.isArray(event.attendees)) {

    event.attendees = [];

}

const alreadyRegistered = event.attendees.some(
    user => user.id === CURRENT_USER_ID
);

if (alreadyRegistered) {

    registerBtn.innerText = "✓ Registered";
    registerBtn.disabled = true;

}

registerBtn.addEventListener("click", () => {

    if (alreadyRegistered) return;

    event.attendees.push({

        id: CURRENT_USER_ID,
        name: "Demo User",
        status: "Going"

    });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(events)
    );

    alert("Registration Successful!");

    location.reload();

});