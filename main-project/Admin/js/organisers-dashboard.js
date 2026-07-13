
  // =========================================================
  // CONSTANTS
  // =========================================================
  const STORAGE_KEY = "events";
  const STATUS = { PENDING: "Pending", GOING: "Going" };
  const DEFAULT_BANNER_IMAGE =
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200";

  // Verify these two match your actual filenames exactly.
  const MANAGE_EVENT_URL = "manage-events.html";
  const CREATE_EVENT_URL = "createEvent.html";

  // =========================================================
  // DOM ELEMENT CACHE
  // =========================================================
  const dom = {
    eventsContainer: document.getElementById("eventsContainer"),
    totalEvents: document.getElementById("totalEvents"),
    totalUsers: document.getElementById("totalUsers"),
    pendingUsers: document.getElementById("pendingUsers"),
    upcomingEvents: document.getElementById("upcomingEvents"),
    searchInput: document.getElementById("searchInput"),
    filterCategory: document.getElementById("filterCategory"),
    createEventBtn: document.getElementById("createEventBtn"),
  };

  let allEvents = [];
  let activeFilters = { searchTerm: "", visibility: "all" };

  // =========================================================
  // LOCALSTORAGE ACCESS
  // =========================================================

  function getEvents() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse events from LocalStorage:", error);
      return [];
    }
  }

  function saveEvents(eventList) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventList));
  }

  // =========================================================
  // UTILITY HELPERS
  // =========================================================

  function countAttendeesByStatus(event, status) {
    return (event?.attendees ?? []).filter((a) => a?.status === status).length;
  }

  function resolveImage(url) {
    return url && url.trim() !== "" ? url : DEFAULT_BANNER_IMAGE;
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
  }

  function isUpcoming(event) {
    if (!event?.startDate) return false;
    const eventDate = new Date(event.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isNaN(eventDate) && eventDate >= today;
  }

  // =========================================================
  // INIT
  // =========================================================

  function initDashboard() {
    allEvents = getEvents();
    renderDashboard(allEvents);
    attachStaticEventListeners();
  }

  // =========================================================
  // RENDER: Orchestrator
  // =========================================================

  function renderDashboard(eventList) {
    updateStatistics(eventList);
    renderEventCards(eventList);
  }

  // =========================================================
  // RENDER: Statistics
  // =========================================================

  function updateStatistics(eventList) {
    let totalGoing = 0;
    let totalPending = 0;
    let upcomingCount = 0;

    eventList.forEach((event) => {
      totalGoing += countAttendeesByStatus(event, STATUS.GOING);
      totalPending += countAttendeesByStatus(event, STATUS.PENDING);
      if (isUpcoming(event)) upcomingCount += 1;
    });

    dom.totalEvents.textContent = eventList.length;
    dom.totalUsers.textContent = totalGoing;
    dom.pendingUsers.textContent = totalPending;
    dom.upcomingEvents.textContent = upcomingCount;
  }

  // =========================================================
  // RENDER: Event Cards
  // Both "View Details" and "Manage Event" point to the same
  // Event Management page, since there is no separate details page.
  // =========================================================

  function renderEventCards(eventList) {
    if (eventList.length === 0) {
      dom.eventsContainer.innerHTML = `
        <div class="col-12">
          <div class="text-center py-5">
            <h3>No events created yet</h3>
            <p>Create your first event to see it here.</p>
          </div>
        </div>
      `;
      return;
    }
    dom.eventsContainer.innerHTML = eventList.map(createEventCard).join("");
  }

  function createEventCard(event) {
    const going = countAttendeesByStatus(event, STATUS.GOING);
    const pending = countAttendeesByStatus(event, STATUS.PENDING);
    const eventId = escapeHtml(event?.id ?? "");

    return `
      <div class="col-lg-4 col-md-6">
        <div class="event-card" data-event-id="${eventId}" role="button">
          <img src="${resolveImage(event.bannerImage)}"
               class="event-banner"
               onerror="this.src='${DEFAULT_BANNER_IMAGE}'">
          <div class="event-body">
            <span class="badge bg-primary">${escapeHtml(event.category || "Uncategorized")}</span>
            <h4>${escapeHtml(event.title || "Untitled Event")}</h4>
            <div class="event-info">
              <p><i class="bi bi-calendar3"></i> ${escapeHtml(event.startDate || "Date TBD")}</p>
              <p><i class="bi bi-clock"></i> ${escapeHtml(event.startTime || "Time TBD")}</p>
              <p><i class="bi bi-geo-alt"></i> ${escapeHtml(event.location || "Location TBD")}</p>
              <p><i class="bi bi-globe"></i> ${escapeHtml(event.visibility || "Public")}</p>
            </div>
            <div class="status">
              <span>👥 ${going} Going</span>
              <span>⏳ ${pending} Pending</span>
            </div>
            <div class="d-grid gap-2 mt-4">
              
              <a href="${MANAGE_EVENT_URL}?id=${eventId}" class="btn btn-primary">
                Manage Event
              </a>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-light w-50" data-action="edit" data-id="${eventId}">
                  <i class="bi bi-pencil-square"></i> Edit
                </button>
                <button class="btn btn-danger w-50" data-action="delete" data-id="${eventId}">
                  <i class="bi bi-trash3"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================
  // SEARCH & FILTER
  // =========================================================

  function searchEvents(eventList, searchTerm) {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return eventList;
    return eventList.filter((event) =>
      (event.title || "").toLowerCase().includes(keyword)
    );
  }

  function filterEvents(eventList, visibility) {
    if (!visibility || visibility === "all") return eventList;
    return eventList.filter((event) => event.visibility === visibility);
  }

  function applyFilters() {
    let result = allEvents;
    result = searchEvents(result, activeFilters.searchTerm);
    result = filterEvents(result, activeFilters.visibility);
    renderDashboard(result);
  }

  function handleSearchInput() {
    activeFilters.searchTerm = dom.searchInput.value;
    applyFilters();
  }

  function handleFilterChange() {
    activeFilters.visibility = dom.filterCategory.value;
    applyFilters();
  }

  // =========================================================
  // CARD ACTIONS: open, edit, delete
  // =========================================================

  function openEvent(eventId) {
    window.location.href = `${MANAGE_EVENT_URL}?id=${encodeURIComponent(eventId)}`;
  }

  function editEvent(eventId) {
    window.location.href = `${CREATE_EVENT_URL}?id=${encodeURIComponent(eventId)}`;
  }

  function deleteEvent(eventId) {
    const confirmed = confirm("Are you sure you want to delete this event? This cannot be undone.");
    if (!confirmed) return;

    const indexToRemove = allEvents.findIndex(
      (event) => String(event.id) === String(eventId)
    );
    if (indexToRemove === -1) return;

    allEvents.splice(indexToRemove, 1);
    saveEvents(allEvents);
    applyFilters();
  }

  // =========================================================
  // EVENT LISTENERS
  // =========================================================

  function attachStaticEventListeners() {
    dom.searchInput?.addEventListener("input", handleSearchInput);
    dom.filterCategory?.addEventListener("change", handleFilterChange);
    dom.createEventBtn?.addEventListener("click", () => {
      window.location.href = CREATE_EVENT_URL;
    });
    dom.eventsContainer.addEventListener("click", handleCardContainerClick);
  }

  function handleCardContainerClick(clickEvent) {
    const actionButton = clickEvent.target.closest("button[data-action]");
    if (actionButton) {
      const { action, id } = actionButton.dataset;
      if (action === "edit") editEvent(id);
      else if (action === "delete") deleteEvent(id);
      return;
    }
    if (clickEvent.target.closest("a")) return;

    const card = clickEvent.target.closest(".event-card");
    if (card) openEvent(card.dataset.eventId);
  }

  // =========================================================
  // ENTRY POINT
  // =========================================================
  initDashboard();