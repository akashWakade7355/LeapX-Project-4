
  // =========================================================
  // CONSTANTS
  // =========================================================
  const STORAGE_KEY = "events";
  const STATUS = { PENDING: "Pending", GOING: "Going" };
  const DEFAULT_BANNER_IMAGE =
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600";
  const DEFAULT_AVATAR_IMAGE =
    "https://ui-avatars.com/api/?background=334155&color=fff&name=User";
  const DASHBOARD_URL = "./orgaisers-dashboard.html";
  const EDIT_EVENT_URL = "createEvent.html"; // must match your real Create Event filename

  // =========================================================
  // DOM ELEMENT CACHE
  // =========================================================
  const dom = {
    banner: document.getElementById("eventBanner"),
    title: document.getElementById("eventTitle"),
    category: document.getElementById("eventCategory"),
    description: document.getElementById("eventDescription"),
    date: document.getElementById("eventDate"),
    time: document.getElementById("eventTime"),
    location: document.getElementById("eventLocation"),
    visibility: document.getElementById("eventVisibility"),
    goingCount: document.getElementById("goingCount"),
    pendingCount: document.getElementById("pendingCount"),
    pendingContainer: document.getElementById("pendingContainer"),
    goingContainer: document.getElementById("goingContainer"),
    editBtn: document.getElementById("editEvent"),
    // deleteBtn intentionally removed — Delete now lives only on the Dashboard.
  };

  let events = [];
  let currentEvent = null;

  // =========================================================
  // UTILITY HELPERS
  // =========================================================

  function loadEventsFromStorage() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse events from LocalStorage:", error);
      return [];
    }
  }

  function saveEventsToStorage(eventList) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventList));
  }

  function findEventById(eventList, id) {
    return eventList.find((event) => String(event?.id) === String(id));
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
  }

  function formatDateRange(startDate, endDate) {
    if (!startDate) return "Date not specified";
    const start = new Date(startDate).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
    if (!endDate || endDate === startDate) return start;
    const end = new Date(endDate).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
    return `${start} - ${end}`;
  }

  function formatTimeRange(startTime, endTime) {
    if (!startTime) return "Time not specified";
    return endTime ? `${startTime} - ${endTime}` : startTime;
  }

  function resolveImage(url, fallback) {
    return url && url.trim() !== "" ? url : fallback;
  }

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  function initEventManagementPage() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("id");

    events = loadEventsFromStorage();
    currentEvent = findEventById(events, eventId);

    if (!eventId || !currentEvent) {
      alert("This event could not be found. Returning to the dashboard.");
      window.location.href = DASHBOARD_URL;
      return;
    }

    if (!Array.isArray(currentEvent.attendees)) {
      currentEvent.attendees = [];
    }

    renderEventDetails();
    renderAttendees();
    attachStaticEventListeners();
  }

  // =========================================================
  // RENDER: EVENT DETAILS
  // =========================================================

  function renderEventDetails() {
    dom.banner.src = resolveImage(currentEvent.bannerImage, DEFAULT_BANNER_IMAGE);
    dom.banner.onerror = () => (dom.banner.src = DEFAULT_BANNER_IMAGE);

    dom.title.textContent = currentEvent.title || "Untitled Event";
    dom.category.textContent = currentEvent.category || "Uncategorized";
    dom.description.textContent =
      currentEvent.description || currentEvent.shortDescription || "No description provided.";

    dom.date.textContent = formatDateRange(currentEvent.startDate, currentEvent.endDate);
    dom.time.textContent = formatTimeRange(currentEvent.startTime, currentEvent.endTime);
    dom.location.textContent = currentEvent.location || "Location not specified";
    dom.visibility.textContent = currentEvent.visibility || "Public";
  }

  // =========================================================
  // RENDER: ATTENDEES
  // =========================================================

  function renderAttendees() {
    const attendees = currentEvent.attendees ?? [];
    const pendingUsers = attendees.filter((user) => user?.status === STATUS.PENDING);
    const goingUsers = attendees.filter((user) => user?.status === STATUS.GOING);

    dom.pendingCount.textContent = pendingUsers.length;
    dom.goingCount.textContent = goingUsers.length;

    renderAttendeeList(dom.pendingContainer, pendingUsers, true, "No pending registration requests.");
    renderAttendeeList(dom.goingContainer, goingUsers, false, "No attendees have been approved yet.");
  }

  function renderAttendeeList(container, users, isPending, emptyMessage) {
    if (users.length === 0) {
      container.innerHTML = `<p class="text-secondary">${emptyMessage}</p>`;
      return;
    }
    container.innerHTML = users.map((user) => createAttendeeCard(user, isPending)).join("");
  }

  function createAttendeeCard(user, isPending) {
    const safeName = escapeHtml(user?.name || "Unknown Attendee");
    const safeEmail = escapeHtml(user?.email || "No email provided");
    const avatarSrc = resolveImage(user?.image, DEFAULT_AVATAR_IMAGE);
    const userId = escapeHtml(user?.id ?? "");

    const actionButtons = isPending
      ? `
        <button class="btn btn-success me-2" data-action="approve" data-id="${userId}">Approve</button>
        <button class="btn btn-danger" data-action="reject" data-id="${userId}">Reject</button>
      `
      : `
        <span class="status-badge going">Going</span>
        <button class="btn btn-outline-danger ms-3" data-action="remove" data-id="${userId}">Remove</button>
      `;

    return `
      <div class="attendee-card">
        <div class="row align-items-center">
          <div class="col-lg-6 d-flex align-items-center">
            <img src="${avatarSrc}" class="user-avatar me-3" onerror="this.src='${DEFAULT_AVATAR_IMAGE}'">
            <div>
              <div class="user-name">${safeName}</div>
              <div class="user-email">${safeEmail}</div>
            </div>
          </div>
          <div class="col-lg-6 text-lg-end mt-3 mt-lg-0">
            ${actionButtons}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================
  // ATTENDEE ACTIONS
  // =========================================================

  function approveAttendee(userId) {
    const user = currentEvent.attendees.find((u) => String(u?.id) === String(userId));
    if (!user) return;
    user.status = STATUS.GOING;
    persistAndRerender();
  }

  function rejectAttendee(userId) {
    currentEvent.attendees = currentEvent.attendees.filter((u) => String(u?.id) !== String(userId));
    persistAndRerender();
  }

  function removeAttendee(userId) {
    currentEvent.attendees = currentEvent.attendees.filter((u) => String(u?.id) !== String(userId));
    persistAndRerender();
  }

  function persistAndRerender() {
    events = events.map((event) =>
      String(event.id) === String(currentEvent.id) ? currentEvent : event
    );
    saveEventsToStorage(events);
    renderAttendees();
  }

  // =========================================================
  // EVENT LISTENERS
  // =========================================================

  function attachStaticEventListeners() {
    dom.pendingContainer.addEventListener("click", handleAttendeeAction);
    dom.goingContainer.addEventListener("click", handleAttendeeAction);
    dom.editBtn.addEventListener("click", handleEditEvent);
    // No delete listener — button removed from this page per requirement #5.
  }

  function handleAttendeeAction(clickEvent) {
    const button = clickEvent.target.closest("button[data-action]");
    if (!button) return;
    const { action, id } = button.dataset;
    if (action === "approve") approveAttendee(id);
    else if (action === "reject") rejectAttendee(id);
    else if (action === "remove") removeAttendee(id);
  }

  function handleEditEvent() {
    window.location.href = `${EDIT_EVENT_URL}?id=${encodeURIComponent(currentEvent.id)}`;
  }

  // =========================================================
  // ENTRY POINT
  // =========================================================
  initEventManagementPage();
