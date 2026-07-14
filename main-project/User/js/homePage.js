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

const MOCK_EVENTS = [
  {
    id: "MOCK_001",
    title: "AI Summit 2026",
    shortDescription: "Explore the future of artificial intelligence with leading experts.",
    description: "The AI Summit 2026 brings together the top minds in tech to discuss neural networks, generative AI, LLMs, and agentic workflows. Experience workshops, keynote speeches, and live demos.",
    category: "Artificial Intelligence",
    bannerImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
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
    category: "Blockchain",
    bannerImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200",
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
    bannerImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200",
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
    category: "Arts & Culture",
    bannerImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
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
    bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
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
    category: "Fitness",
    bannerImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200",
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
  },
  {
    id: "MOCK_008",
    title: "Gourmet Street Food Festival",
    shortDescription: "Savor the best local and international street delicacies.",
    description: "Taste chef creations, traditional recipes, and experimental food styles from all over the country. Live DJ, food trucks, and eating competitions await!",
    category: "Food & Drinks",
    bannerImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
    visibility: "Public",
    startDate: "2026-07-22",
    startTime: "12:00",
    endDate: "2026-07-22",
    endTime: "22:00",
    location: "Jio World Drive, Mumbai",
    capacity: 300,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Paid",
    ticketPrice: 250,
    attendees: [],
    createdAt: "2026-07-08T00:00:00.000Z",
    updatedAt: "2026-07-08T00:00:00.000Z"
  },
  {
    id: "MOCK_009",
    title: "Zen Meditation & Yoga Retreat",
    shortDescription: "Rejuvenate your mind, body, and soul in Goa.",
    description: "Escape the hustle of city life. This wellness retreat includes meditation training, sound healing, sunset beach yoga sessions, and organic vegetarian dining.",
    category: "Wellness",
    bannerImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200",
    visibility: "Public",
    startDate: "2026-07-18",
    startTime: "07:00",
    endDate: "2026-07-18",
    endTime: "11:00",
    location: "Arambol Beach Shacks, Goa",
    capacity: 40,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Paid",
    ticketPrice: 1200,
    attendees: [],
    createdAt: "2026-07-09T00:00:00.000Z",
    updatedAt: "2026-07-09T00:00:00.000Z"
  },
  {
    id: "MOCK_010",
    title: "Crypto Investors Roundtable",
    shortDescription: "Deep dive into web3 market insights and tokenomics.",
    description: "An exclusive fireside chat discussing macro trends in blockchain, Ethereum upgrades, crypto regulations, and institutional investment strategies.",
    category: "Crypto",
    bannerImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200",
    visibility: "Public",
    startDate: "2026-07-24",
    startTime: "16:00",
    endDate: "2026-07-24",
    endTime: "19:00",
    location: "Viman Nagar Co-Working, Pune",
    capacity: 60,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Free",
    ticketPrice: 0,
    attendees: [],
    createdAt: "2026-07-10T00:00:00.000Z",
    updatedAt: "2026-07-10T00:00:00.000Z"
  },
  {
    id: "MOCK_011",
    title: "Founder Mixer & Pitch Night",
    shortDescription: "Network with VCs, angel investors, and startup founders.",
    description: "Pitch your startup idea in front of top venture capitalists and receive immediate feedback. Networking and drinks session follows the presentations.",
    category: "Startups",
    bannerImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    visibility: "Public",
    startDate: "2026-07-23",
    startTime: "18:30",
    endDate: "2026-07-23",
    endTime: "21:30",
    location: "Koramanagala Socials, Bengaluru",
    capacity: 80,
    eventMode: "InPerson",
    joinMethod: "Open",
    priceType: "Free",
    ticketPrice: 0,
    attendees: [],
    createdAt: "2026-07-11T00:00:00.000Z",
    updatedAt: "2026-07-11T00:00:00.000Z"
  }
];

// ==========================================
// DOM
// ==========================================

const eventsContainer = document.getElementById("eventsContainer");

const dateFilter = document.getElementById("dateFilter");
const categoryFilter = document.getElementById("categoryFilter");
const searchQueryInput = document.getElementById("searchInput");

// ==========================================
// LOCAL STORAGE
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

    catch(error){

        console.error(error);

        return MOCK_EVENTS;

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

                    : (event.capacity && event.attendees?.length >= Number(event.capacity))

                    ?

                `<button
                    class="event-btn"
                    disabled
                    onclick="event.stopPropagation()"
                    style="background:#dc3545;cursor:not-allowed;">
                        Sold Out
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

    filterEvents();

}

// ==========================================
// COMBINED FILTER & SEARCH
// ==========================================

function filterEvents() {

    const selectedCategory = categoryFilter.value;
    const selectedDate = dateFilter.value;
    const searchQuery = searchQueryInput ? searchQueryInput.value.trim().toLowerCase() : "";

    const events = getEvents();

    // Show newest events first
    events.sort((a, b) => {

        const dateA = new Date(a.startDate || 0);
        const dateB = new Date(b.startDate || 0);

        return dateA - dateB;

    });

    const filteredEvents = events.filter(event => {
        const matchesCategory = !selectedCategory || event.category === selectedCategory;
        const matchesDate = !selectedDate || event.startDate === selectedDate;
        const matchesSearch = !searchQuery || 
            (event.title && event.title.toLowerCase().includes(searchQuery)) ||
            (event.location && event.location.toLowerCase().includes(searchQuery)) ||
            (event.description && event.description.toLowerCase().includes(searchQuery)) ||
            (event.shortDescription && event.shortDescription.toLowerCase().includes(searchQuery));
        
        return matchesCategory && matchesDate && matchesSearch;
    });

    renderEvents(filteredEvents);

}

categoryFilter.addEventListener("change", filterEvents);
dateFilter.addEventListener("change", filterEvents);
if (searchQueryInput) {
    searchQueryInput.addEventListener("input", filterEvents);
}

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

    const categoryLinks = document.querySelectorAll(".category-link");
    categoryLinks.forEach(link => {
        link.addEventListener("click", () => {
            const cat = link.getAttribute("data-category");
            if (cat) {
                categoryFilter.value = cat;
                if (dateFilter) dateFilter.value = "";
                if (searchQueryInput) searchQueryInput.value = "";
                filterEvents();
                const discoverSection = document.querySelector(".discover-events");
                if (discoverSection) {
                    discoverSection.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

});