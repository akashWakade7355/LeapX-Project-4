
  // =========================================================
  // CONSTANTS
  // =========================================================
  const STORAGE_KEY = "events";

  // Real filename confirmed from your dashboard header nav link.
  const DASHBOARD_URL = "./orgaisers-dashboard.html";

  // Shown in the upload box before any file is chosen. NOT saved
  // as the event's real banner — see saveEvent logic below.
  const BANNER_UPLOAD_PROMPT = "https://placehold.co/600x800?text=Upload+Banner";

  // =========================================================
  // ELEMENT REFERENCES
  // =========================================================
  const form = document.getElementById("createEventForm");
  const pageTitle = document.getElementById("pageTitle");
  const submitBtn = document.getElementById("submitBtn");

  const bannerInput = document.getElementById("bannerInput");
  const bannerPreview = document.getElementById("bannerPreview");

  const eventNameInput = document.getElementById("eventNameInput");
  const shortDescriptionInput = document.getElementById("shortDescriptionInput");
  const descriptionInput = document.getElementById("descriptionInput");
  const categorySelect = document.getElementById("categorySelect");
  const visibilitySelect = document.getElementById("visibilitySelect");

  const startDateInput = document.getElementById("startDateInput");
  const startTimeInput = document.getElementById("startTimeInput");
  const endDateInput = document.getElementById("endDateInput");
  const endTimeInput = document.getElementById("endTimeInput");

  const eventTypeSelect = document.getElementById("eventType");
  const offlineLocationBox = document.getElementById("offlineLocation");
  const onlineLocationBox = document.getElementById("onlineLocation");
  const venueInput = document.getElementById("venueInput");
  const meetingLinkInput = document.getElementById("meetingLinkInput");

  const joinMethodSelect = document.getElementById("joinMethodSelect");
  const capacityInput = document.getElementById("capacityInput");
  const priceTypeSelect = document.getElementById("priceType");
  const ticketPriceBox = document.getElementById("ticketPrice");
  const ticketPriceInput = document.getElementById("ticketPriceInput");

  const errorSummary = document.getElementById("errorSummary");
  const errorList = document.getElementById("errorList");
  const successBanner = document.getElementById("successBanner");
  const successBannerText = document.getElementById("successBannerText");

  // Tracks whether we're editing an existing event or creating a new one.
  // Set once during init() and never changed afterward.
  let editingEventId = null;

  // =========================================================
  // LOCALSTORAGE ACCESS
  // Single place for reads/writes so parsing never duplicates.
  // =========================================================

  function getStoredEvents() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to read events from localStorage:", error);
      return [];
    }
  }

  function saveAllEvents(eventList) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(eventList));
      return true;
    } catch (error) {
      console.error("Failed to save events to localStorage:", error);
      return false;
    }
  }

  function findEventById(eventList, id) {
    return eventList.find((event) => String(event?.id) === String(id));
  }

  // =========================================================
  // BANNER IMAGE PREVIEW
  // =========================================================

  function initBannerPreview() {
    bannerInput.addEventListener("change", () => {
      const file = bannerInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        bannerPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // =========================================================
  // ONLINE / OFFLINE LOCATION TOGGLE
  // =========================================================

  function initLocationToggle() {
    eventTypeSelect.addEventListener("change", toggleLocationFields);
    toggleLocationFields();
  }

  function toggleLocationFields() {
    const isOnline = eventTypeSelect.value === "online";
    onlineLocationBox.style.display = isOnline ? "block" : "none";
    offlineLocationBox.style.display = isOnline ? "none" : "block";
  }

  // =========================================================
  // FREE / PAID TICKET TOGGLE
  // =========================================================

  function initPriceToggle() {
    priceTypeSelect.addEventListener("change", toggleTicketPriceField);
    toggleTicketPriceField();
  }

  function toggleTicketPriceField() {
    const isPaid = priceTypeSelect.value === "paid";
    ticketPriceBox.style.display = isPaid ? "flex" : "none";
    if (!isPaid) ticketPriceInput.value = "";
  }

  // =========================================================
  // DATE CONSTRAINTS
  // =========================================================

  function initDateConstraints() {
    startDateInput.addEventListener("change", () => {
      endDateInput.min = startDateInput.value;
    });
    startTimeInput.addEventListener("change", () => {
      if (startDateInput.value && startDateInput.value === endDateInput.value) {
        endTimeInput.min = startTimeInput.value;
      }
    });
  }

  // =========================================================
  // VALIDATION
  // =========================================================

  function setFieldValidity(field, isValid) {
    field.classList.toggle("is-invalid", !isValid);
  }

  function clearAllFieldValidity() {
    document.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
  }

  function showErrors(errors) {
    errorList.innerHTML = "";
    errors.forEach((message) => {
      const li = document.createElement("li");
      li.textContent = message;
      errorList.appendChild(li);
    });
    errorSummary.style.display = "block";
    errorSummary.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function hideErrors() {
    errorSummary.style.display = "none";
    errorList.innerHTML = "";
  }

  function validateForm() {
    clearAllFieldValidity();
    const errors = [];

    if (eventNameInput.value.trim() === "") {
      errors.push("Event name is required.");
      setFieldValidity(eventNameInput, false);
    }
    if (shortDescriptionInput.value.trim() === "") {
      errors.push("Short description is required.");
      setFieldValidity(shortDescriptionInput, false);
    }
    if (descriptionInput.value.trim() === "") {
      errors.push("Description is required.");
      setFieldValidity(descriptionInput, false);
    }
    if (categorySelect.value === "") {
      errors.push("Please choose a category.");
      setFieldValidity(categorySelect, false);
    }
    if (!startDateInput.value) {
      errors.push("Start date is required.");
      setFieldValidity(startDateInput, false);
    }
    if (!startTimeInput.value) {
      errors.push("Start time is required.");
      setFieldValidity(startTimeInput, false);
    }
    if (!endDateInput.value) {
      errors.push("End date is required.");
      setFieldValidity(endDateInput, false);
    }
    if (!endTimeInput.value) {
      errors.push("End time is required.");
      setFieldValidity(endTimeInput, false);
    }

    if (startDateInput.value && startTimeInput.value && endDateInput.value && endTimeInput.value) {
      const startDateTime = new Date(`${startDateInput.value}T${startTimeInput.value}`);
      const endDateTime = new Date(`${endDateInput.value}T${endTimeInput.value}`);
      if (endDateTime <= startDateTime) {
        errors.push("End date & time must be after the start date & time.");
        setFieldValidity(endDateInput, false);
        setFieldValidity(endTimeInput, false);
      }
    }

    // NOTE: banner is intentionally NOT validated here — it's optional.
    if (eventTypeSelect.value === "online") {
      if (meetingLinkInput.value.trim() === "") {
        errors.push("Meeting link is required for online events.");
        setFieldValidity(meetingLinkInput, false);
      }
    } else {
      if (venueInput.value.trim() === "") {
        errors.push("Venue is required for offline events.");
        setFieldValidity(venueInput, false);
      }
    }

    if (capacityInput.value !== "") {
      const capacity = Number(capacityInput.value);
      if (!Number.isFinite(capacity) || capacity <= 0) {
        errors.push("Capacity must be a positive number (leave blank for unlimited).");
        setFieldValidity(capacityInput, false);
      }
    }

    if (priceTypeSelect.value === "paid") {
      const price = Number(ticketPriceInput.value);
      if (ticketPriceInput.value === "" || !Number.isFinite(price) || price <= 0) {
        errors.push("Ticket price must be a positive number for paid events.");
        setFieldValidity(ticketPriceInput, false);
      }
    }

    return errors;
  }

  // =========================================================
  // UNIQUE ID GENERATION
  // =========================================================

  function generateEventId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return "EVT-" + window.crypto.randomUUID();
    }
    const randomSuffix = Math.random().toString(16).slice(2, 8);
    return `EVT-${Date.now()}-${randomSuffix}`;
  }

  // =========================================================
  // BUILD EVENT OBJECT
  // Field names match the PRD schema EXACTLY: this is the fix
  // for bug #2 (date/time/location not appearing elsewhere).
  // =========================================================

  function buildEventObject(existingEvent) {
    const isOnline = eventTypeSelect.value === "online";
    const isPaid = priceTypeSelect.value === "paid";

    // Only store a real banner if the user actually changed it away
    // from the "please upload" placeholder image.
    const bannerWasProvided = bannerPreview.src.indexOf(BANNER_UPLOAD_PROMPT) === -1;
    const bannerImage = bannerWasProvided ? bannerPreview.src : null;

    return {
      // Preserve id + attendees when editing; create fresh ones otherwise.
      id: existingEvent ? existingEvent.id : generateEventId(),
      attendees: existingEvent ? existingEvent.attendees ?? [] : [],

      title: eventNameInput.value.trim(),
      shortDescription: shortDescriptionInput.value.trim(),
      description: descriptionInput.value.trim(),
      category: categorySelect.value,
      bannerImage: bannerImage,
      visibility: visibilitySelect.value,

      startDate: startDateInput.value,
      startTime: startTimeInput.value,
      endDate: endDateInput.value,
      endTime: endTimeInput.value,

      location: isOnline ? meetingLinkInput.value.trim() : venueInput.value.trim(),
      capacity: capacityInput.value === "" ? null : Number(capacityInput.value),

      // Extra fields kept for the registration flow (not in the
      // core PRD list, but harmless additions alongside it).
      eventMode: eventTypeSelect.value,
      joinMethod: joinMethodSelect.value,
      priceType: priceTypeSelect.value,
      ticketPrice: isPaid ? Number(ticketPriceInput.value) : 0,

      createdAt: existingEvent ? existingEvent.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // =========================================================
  // SAVE (CREATE or UPDATE)
  // This is the fix for bug #4 — editing no longer duplicates.
  // =========================================================

  function saveEvent(existingEvent) {
    const events = getStoredEvents();
    const newEvent = buildEventObject(existingEvent);

    if (existingEvent) {
      // UPDATE: replace the matching event in place.
      const index = events.findIndex((e) => String(e.id) === String(existingEvent.id));
      if (index !== -1) {
        events[index] = newEvent;
      } else {
        events.push(newEvent); // fallback safety net, shouldn't normally happen
      }
    } else {
      // CREATE: append a brand new event.
      events.push(newEvent);
    }

    return saveAllEvents(events);
  }

  // =========================================================
  // EDIT MODE: detect ?id= and pre-fill the form
  // This is the fix for bug #4 — Edit no longer opens a blank form.
  // =========================================================

  function loadEventForEditing() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("id");
    if (!eventId) return null; // create mode

    const events = getStoredEvents();
    const event = findEventById(events, eventId);
    if (!event) {
      alert("The event you're trying to edit could not be found.");
      window.location.href = DASHBOARD_URL;
      return null;
    }
    return event;
  }

  function populateFormFromEvent(event) {
    editingEventId = event.id;

    pageTitle.textContent = "Edit Event";
    submitBtn.textContent = "Update Event";

    bannerPreview.src = event.bannerImage || BANNER_UPLOAD_PROMPT;

    eventNameInput.value = event.title || "";
    shortDescriptionInput.value = event.shortDescription || "";
    descriptionInput.value = event.description || "";
    categorySelect.value = event.category || "";
    visibilitySelect.value = event.visibility || "public";

    startDateInput.value = event.startDate || "";
    startTimeInput.value = event.startTime || "";
    endDateInput.value = event.endDate || "";
    endTimeInput.value = event.endTime || "";

    eventTypeSelect.value = event.eventMode || "offline";
    toggleLocationFields();
    if (eventTypeSelect.value === "online") {
      meetingLinkInput.value = event.location || "";
    } else {
      venueInput.value = event.location || "";
    }

    joinMethodSelect.value = event.joinMethod || "instant";
    capacityInput.value = event.capacity ?? "";
    priceTypeSelect.value = event.priceType || "free";
    toggleTicketPriceField();
    if (event.priceType === "paid") {
      ticketPriceInput.value = event.ticketPrice ?? "";
    }
  }

  // =========================================================
  // FORM RESET / SUCCESS UI
  // =========================================================

  function resetFormUI() {
    form.reset();
    bannerPreview.src = BANNER_UPLOAD_PROMPT;
    toggleTicketPriceField();
    toggleLocationFields();
    clearAllFieldValidity();
    hideErrors();
    successBanner.style.display = "none";
  }

  function showSuccessAndRedirect(isEdit) {
    successBannerText.textContent = isEdit
      ? "Event Updated Successfully! Redirecting to dashboard..."
      : "Event Created Successfully! Redirecting to dashboard...";
    successBanner.style.display = "block";
    successBanner.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      window.location.href = DASHBOARD_URL;
    }, 1200);
  }

  // =========================================================
  // FORM SUBMIT HANDLER
  // =========================================================

  function handleFormSubmit(e) {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      showErrors(errors);
      return;
    }
    hideErrors();
    successBanner.style.display = "none";

    const events = getStoredEvents();
    const existingEvent = editingEventId ? findEventById(events, editingEventId) : null;

    const saved = saveEvent(existingEvent);
    if (!saved) {
      showErrors(["Could not save the event. Your browser storage may be full or disabled."]);
      return;
    }

    showSuccessAndRedirect(Boolean(existingEvent));
  }

  // =========================================================
  // INIT
  // =========================================================

  function init() {
    const steps = [
      ["banner preview", initBannerPreview],
      ["location toggle", initLocationToggle],
      ["price toggle", initPriceToggle],
      ["date constraints", initDateConstraints],
    ];

    steps.forEach(([name, fn]) => {
      try {
        fn();
      } catch (error) {
        console.error(`Failed to initialize ${name}:`, error);
      }
    });

    // Detect edit mode BEFORE attaching submit, so the form is
    // pre-filled by the time the user can interact with it.
    const eventToEdit = loadEventForEditing();
    if (eventToEdit) {
      populateFormFromEvent(eventToEdit);
    }

    try {
      form.addEventListener("submit", handleFormSubmit);
    } catch (error) {
      console.error("Failed to attach form submit handler:", error);
      showErrors(["Something went wrong loading the form. Check the browser console."]);
    }
  }

  init();