// ==========================================
// CONSTANTS
// ==========================================

const STORAGE_KEY = "events";
const CURRENT_USER_ID = "USER_001";

const DEFAULT_BANNER =
"https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200";

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
// GET EVENT ID FROM URL
// ==========================================

const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

// ==========================================
// LOAD EVENTS
// ==========================================

function getEvents() {
    try {
        let events = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!Array.isArray(events) || events.length === 0) {
            events = MOCK_EVENTS;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        }
        return events;
    } catch(e) {
        console.error(e);
        return MOCK_EVENTS;
    }
}

const events = getEvents();

const event = events.find(
    ev => String(ev.id) === String(eventId)
);

if (!event) {

    alert("Event not found.");

    window.location.href = "homePage.html";

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

const isFull = event.capacity && event.attendees.length >= Number(event.capacity);

if (alreadyRegistered) {

    registerBtn.innerText = "✓ Registered";
    registerBtn.disabled = true;
    registerBtn.classList.remove("btn-primary");
    registerBtn.classList.add("btn-success");

} else if (isFull) {

    registerBtn.innerText = "Sold Out";
    registerBtn.disabled = true;
    registerBtn.classList.remove("btn-primary");
    registerBtn.classList.add("btn-danger");

}

registerBtn.addEventListener("click", () => {

    if (alreadyRegistered) return;

    if (event.capacity && event.attendees.length >= Number(event.capacity)) {
        alert("Event is Full.");
        return;
    }

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