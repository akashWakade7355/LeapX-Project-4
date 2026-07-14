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

const MOCK_EVENTS = [
  {
    id: "MOCK_001",
    title: "AI Summit 2026",
    shortDescription: "Explore the future of artificial intelligence with leading experts.",
    description: "The AI Summit 2026 brings together the top minds in tech to discuss neural networks, generative AI, LLMs, and agentic workflows. Experience workshops, keynote speeches, and live demos.",
    category: "Technology",
    bannerImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
    visibility: "Public",
    startDate: "2026-07-15",
    startTime: "09:00",
    endDate: "2026-07-16",
    endTime: "17:00",
    location: "Kalyani TechPark, Bengaluru",
    capacity: 150,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Free",
    ticketPrice: 0,
    attendees: [],
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z"
  },
  {
    id: "MOCK_002",
    title: "Summer Music Fest",
    shortDescription: "Experience a night of live music from your favorite artists.",
    description: "Enjoy performances from top music acts across pop, rock, and electronic genres. Food trucks, retail stalls, and interactive zones are available for all attendees.",
    category: "Music",
    bannerImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200",
    visibility: "Public",
    startDate: "2026-07-20",
    startTime: "18:00",
    endDate: "2026-07-20",
    endTime: "23:00",
    location: "Jio World Garden, Mumbai",
    capacity: 500,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Paid",
    ticketPrice: 999,
    attendees: [
      { id: "USER_999", name: "Alice Smith", status: "Going" }
    ],
    createdAt: "2026-07-02T00:00:00.000Z",
    updatedAt: "2026-07-02T00:00:00.000Z"
  },
  {
    id: "MOCK_003",
    title: "EVM Capital Hackathon",
    shortDescription: "Build decentralized applications on EVM networks.",
    description: "EVM Capital Hackathon invites developers, designers, and web3 enthusiasts to build the next generation of decentralized finance, identity, and tooling on Ethereum Virtual Machine platforms.",
    category: "Technology",
    bannerImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300",
    visibility: "Public",
    startDate: "2026-07-25",
    startTime: "10:00",
    endDate: "2026-07-27",
    endTime: "18:00",
    location: "Vigyan Bhawan, Delhi",
    capacity: 100,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Free",
    ticketPrice: 0,
    attendees: [
      { id: "USER_001", name: "Demo User", status: "Going" },
      { id: "USER_101", name: "Bob Jones", status: "Going" }
    ],
    createdAt: "2026-07-03T00:00:00.000Z",
    updatedAt: "2026-07-03T00:00:00.000Z"
  },
  {
    id: "MOCK_004",
    title: "Sip & Paint Workshop",
    shortDescription: "Paint a masterpiece while sipping on fine wine.",
    description: "Unleash your inner artist! Our expert instructor will guide you step-by-step to paint a beautiful landscape. No experience required. Ticket covers all art supplies, two drinks, and appetizers.",
    category: "Workshop",
    bannerImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300",
    visibility: "Public",
    startDate: "2026-07-26",
    startTime: "14:00",
    endDate: "2026-07-26",
    endTime: "17:00",
    location: "Koregaon Park Bistro, Pune",
    capacity: 2,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Paid",
    ticketPrice: 1500,
    attendees: [
      { id: "USER_002", name: "John Doe", status: "Going" },
      { id: "USER_003", name: "Jane Doe", status: "Going" }
    ],
    createdAt: "2026-07-04T00:00:00.000Z",
    updatedAt: "2026-07-04T00:00:00.000Z"
  },
  {
    id: "MOCK_005",
    title: "Sufi Social Qawwali Night",
    shortDescription: "A divine evening of Sufi Qawwali music.",
    description: "Celebrate the mystical traditions of Sufi music with world-renowned Qawwali singers. An open-air evening with local food stalls and beautiful lights.",
    category: "Music",
    bannerImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300",
    visibility: "Public",
    startDate: "2026-07-12",
    startTime: "20:00",
    endDate: "2026-07-12",
    endTime: "23:59",
    location: "Chowmahalla Palace, Hyderabad",
    capacity: 200,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Paid",
    ticketPrice: 500,
    attendees: [
      { id: "USER_001", name: "Demo User", status: "Going" }
    ],
    createdAt: "2026-07-05T00:00:00.000Z",
    updatedAt: "2026-07-05T00:00:00.000Z"
  },
  {
    id: "MOCK_006",
    title: "Web3 Bengaluru Meetup",
    shortDescription: "Connect with web3 developers and founders in Bengaluru.",
    description: "An informal evening mixer for people working in web3. Grab a coffee, pitch your startup, network with builders, and learn about the local ecosystem.",
    category: "Technology",
    bannerImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300",
    visibility: "Public",
    startDate: "2026-07-13",
    startTime: "17:00",
    endDate: "2026-07-13",
    endTime: "19:00",
    location: "HSR Layout Cafe, Bengaluru",
    capacity: 50,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Free",
    ticketPrice: 0,
    attendees: [
      { id: "USER_001", name: "Demo User", status: "Going" }
    ],
    createdAt: "2026-07-06T00:00:00.000Z",
    updatedAt: "2026-07-06T00:00:00.000Z"
  },
  {
    id: "MOCK_007",
    title: "Fitness & Wellness Marathon",
    shortDescription: "Join us for the annual city fitness marathon.",
    description: "Start your morning with a 5k or 10k walk/run to promote healthy living. Free race kits, energy drinks, and participation medals are provided for all registered attendees.",
    category: "Sports",
    bannerImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300",
    visibility: "Public",
    startDate: "2026-07-28",
    startTime: "06:00",
    endDate: "2026-07-28",
    endTime: "10:00",
    location: "Maidan, Kolkata",
    capacity: 1000,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Free",
    ticketPrice: 0,
    attendees: [
      { id: "USER_004", name: "Mark Greene", status: "Going" }
    ],
    createdAt: "2026-07-07T00:00:00.000Z",
    updatedAt: "2026-07-07T00:00:00.000Z"
  }
];

// ==========================================
// GET EVENTS
// ==========================================

function getEvents() {

    try {

        let events = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!Array.isArray(events) || events.length === 0) {
            events = MOCK_EVENTS;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        }

        return events;

    }

    catch (error) {

        console.error(error);

        return MOCK_EVENTS;

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

                            <button
                                class="btn btn-danger btn-sm cancel-btn"
                                    data-id="${event.id}">
                                    Cancel Registration
                            </button>

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
// CANCEL REGISTRATION
// ==========================================

document.addEventListener("click", function (e) {

    if (!e.target.classList.contains("cancel-btn")) {

        return;

    }

    const eventId = e.target.dataset.id;

    const events = getEvents();

    const event = events.find(
        ev => String(ev.id) === String(eventId)
    );

    if (!event) {

        alert("Event not found.");
        return;

    }

    // Remove current user
    event.attendees = event.attendees.filter(attendee =>
        attendee.id !== CURRENT_USER_ID
    );

    // Save changes
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

    alert("Registration Cancelled!");

    // Reload page
    location.reload();

});

// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    renderRegisteredEvents();

});