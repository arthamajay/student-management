console.log("Welcome to the Community Portal");
window.addEventListener("load", () => {
    if (document.getElementById("welcome-banner")) {
        alert("Welcome! The Community Event Portal has fully loaded.");
    }
    loadPreferences();
    renderEvents(allEvents);
});
const EVENT_NAME = "Summer Music Festival";
const EVENT_DATE = "2026-06-15";
let availableSeats = 120;
const eventInfo = `Event: ${EVENT_NAME} | Date: ${EVENT_DATE} | Seats: ${availableSeats}`;
console.log(eventInfo);

function decrementSeats() {
    availableSeats--;
}

function incrementSeats() {
    availableSeats++;
}
const allEvents = [{
    id: 1,
    title: "Summer Music Festival",
    category: "music",
    date: "2026-06-15",
    location: "Central Park Amphitheater",
    seats: 120,
    fee: 15,
    description: "An evening of live music featuring local bands and artists.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=200&fit=crop"
}, {
    id: 2,
    title: "Baking Workshop",
    category: "workshop",
    date: "2026-06-20",
    location: "Community Center Hall B",
    seats: 30,
    fee: 10,
    description: "Learn artisan bread and pastry techniques from local chefs.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop"
}, {
    id: 3,
    title: "City Marathon 5K",
    category: "sports",
    date: "2026-07-04",
    location: "Riverside Trail",
    seats: 200,
    fee: 5,
    description: "Annual community run open to all ages and fitness levels.",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=200&fit=crop"
}, {
    id: 4,
    title: "Cultural Heritage Fair",
    category: "culture",
    date: "2026-07-12",
    location: "Town Square",
    seats: 500,
    fee: 0,
    description: "Celebrate our city's diverse heritage with food, art, and performances.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=200&fit=crop"
}, {
    id: 5,
    title: "Yoga in the Park",
    category: "health",
    date: "2026-06-28",
    location: "Greenfield Park",
    seats: 50,
    fee: 8,
    description: "Morning yoga session for all skill levels. Bring your own mat.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop"
}, {
    id: 6,
    title: "Jazz Night",
    category: "music",
    date: "2026-08-01",
    location: "Riverside Pavilion",
    seats: 80,
    fee: 12,
    description: "An intimate jazz evening under the stars.",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=200&fit=crop"
}];

function getValidEvents(events) {
    const today = new Date().toISOString().split("T")[0];
    return events.filter(ev => {
        if (ev.date < today) return false;
        if (ev.seats <= 0) return false;
        return true;
    });
}
allEvents.forEach(ev => {
    console.log(`[Event] ${ev.title} — ${ev.date} — Seats: ${ev.seats}`);
});

function registerForEvent(eventId, userName) {
    try {
        const ev = allEvents.find(e => e.id === eventId);
        if (!ev) throw new Error("Event not found.");
        if (ev.seats <= 0) throw new Error("No seats available.");
        if (!userName || userName.trim() === "") throw new Error("Name is required.");
        ev.seats--;
        decrementSeats();
        console.log(`✅ ${userName} registered for "${ev.title}". Seats left: ${ev.seats}`);
        showToast(`Registered for "${ev.title}" successfully!`);
        renderEvents(getFilteredEvents());
        return true;
    } catch (err) {
        console.error("Registration error:", err.message);
        showToast(`Error: ${err.message}`, true);
        return false;
    }
}

function addEvent(eventObj) {
    allEvents.push(eventObj);
    renderEvents(getFilteredEvents());
}

function registerUser(eventId) {
    const nameInput = document.getElementById("reg-name");
    const name = nameInput ? nameInput.value.trim() : "Guest";
    registerForEvent(eventId, name || "Guest");
}

function filterEventsByCategory(events, predicate) {
    return events.filter(predicate);
}

function makeCategoryTracker() {
    const counts = {};
    return {
        register(category) {
            counts[category] = (counts[category] || 0) + 1;
            console.log("Category registrations:", counts);
        },
        getCounts() {
            return {
                ...counts
            };
        }
    };
}
const categoryTracker = makeCategoryTracker();

function EventModel(id, title, category, date, location, seats, fee, description, image) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.date = date;
    this.location = location;
    this.seats = seats;
    this.fee = fee;
    this.description = description;
    this.image = image;
}
EventModel.prototype.checkAvailability = function() {
    const today = new Date().toISOString().split("T")[0];
    if (this.date < today) return "Past event";
    if (this.seats <= 0) return "Fully booked";
    return `${this.seats} seats available`;
};
const sampleEvent = new EventModel(99, "Demo Event", "music", "2026-09-01", "City Hall", 50, 5, "Demo", "");
console.log("Event entries:", Object.entries(sampleEvent));
console.log("Availability:", sampleEvent.checkAvailability());

function getMusicEvents() {
    return allEvents.filter(ev => ev.category === "music");
}

function formatEventTitles(events) {
    return events.map(ev => {
        const cat = ev.category.charAt(0).toUpperCase() + ev.category.slice(1);
        return `${cat}: ${ev.title}`;
    });
}
console.log("Formatted titles:", formatEventTitles(allEvents));
let activeFilter = "all";
let searchQuery = "";

function getFilteredEvents() {
    let list = getValidEvents(allEvents);
    if (activeFilter !== "all") {
        list = filterEventsByCategory(list, ev => ev.category === activeFilter);
    }
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter(ev => ev.title.toLowerCase().includes(q) || ev.location.toLowerCase().includes(q));
    }
    return list;
}

function renderEvents(events) {
    const container = document.querySelector("#events-container");
    if (!container) return;
    container.innerHTML = "";
    if (events.length === 0) {
        container.innerHTML = `<p class="text-center text-muted" style="width:100%;padding:40px 0;">      No events found. Try a different filter or search term.</p>`;
        return;
    }
    events.forEach(ev => {
        const card = document.createElement("article");
        card.className = "event-card animate-fade-up";
        card.dataset.id = ev.id;
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View details for ${ev.title}`);
        const seatClass = ev.seats < 20 ? "seat-count low" : "seat-count";
        const feeText = ev.fee === 0 ? "Free" : `$${ev.fee}`;
        card.innerHTML = `      <img class="event-card-img" src="${ev.image}" alt="${ev.title}">      <div class="event-card-body">        <span class="badge badge-${ev.category}">${ev.category}</span>        <h3 class="event-card-title" style="margin-top:8px;">${ev.title}</h3>        <p class="event-card-meta">📅 ${formatDate(ev.date)}<br>📍 ${ev.location}</p>        <p style="font-size:0.88rem;color:#4a5568;">${ev.description}</p>        <div class="event-card-footer">          <span class="${seatClass}">🪑 ${ev.seats} seats</span>          <span style="font-weight:700;color:var(--primary);">${feeText}</span>          <button type="button" class="btn btn-primary btn-sm"                  onclick="event.stopPropagation(); openEventDetail(${ev.id})">            View &amp; Register          </button>        </div>      </div>`;
        card.addEventListener("click", () => openEventDetail(ev.id));
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openEventDetail(ev.id);
            }
        });
        container.appendChild(card);
    });
}

function formatDate(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

function setFilter(category) {
    activeFilter = category;
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.cat === category);
    });
    renderEvents(getFilteredEvents());
}

function onCategoryChange(selectEl) {
    setFilter(selectEl.value);
}

function onSearchKeydown(e) {
    searchQuery = e.target.value.trim();
    renderEvents(getFilteredEvents());
}

function fetchEventsPromise() {
    const spinner = document.getElementById("loading-spinner-wrap");
    const container = document.getElementById("async-events");
    if (spinner) spinner.classList.add("show");
    fetch("events.json").then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
    }).then(data => {
        if (spinner) spinner.classList.remove("show");
        if (container) container.innerHTML = `<p class="text-center" style="color:var(--success);font-weight:600;">          ✅ Loaded ${data.length} events from server.</p>`;
        console.log("Fetched events (Promise):", data);
    }).catch(err => {
        if (spinner) spinner.classList.remove("show");
        console.error("Fetch error:", err);
        if (container) container.innerHTML = `<p class="text-center text-red">Failed to load events.</p>`;
    });
}
async function fetchEventsAsync() {
    const spinner = document.getElementById("loading-spinner-wrap");
    const container = document.getElementById("async-events");
    try {
        if (spinner) spinner.classList.add("show");
        if (container) container.innerHTML = "";
        await new Promise(resolve => setTimeout(resolve, 1200));
        const res = await fetch("events.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (spinner) spinner.classList.remove("show");
        if (container) container.innerHTML = `<p class="text-center" style="color:var(--success);font-weight:600;">        ✅ Loaded ${data.length} events via async/await.</p>`;
        console.log("Fetched events (async/await):", data);
    } catch (err) {
        if (spinner) spinner.classList.remove("show");
        console.error("Async fetch error:", err);
        if (container) container.innerHTML = `<p class="text-center text-red">Error: ${err.message}</p>`;
    }
}

function createEventCard(title, category = "general", fee = 0) {
    return {
        title,
        category,
        fee
    };
}

function displayEventDetails(event) {
    const {
        title,
        date,
        location,
        seats,
        fee
    } = event;
    console.log(`📌 ${title} | 📅 ${date} | 📍 ${location} | 🪑 ${seats} | 💰 ${fee === 0 ? "Free" : "$" + fee}`);
}
allEvents.forEach(displayEventDetails);

function getSortedEventsCopy() {
    return [...allEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
}
console.log("Sorted copy:", getSortedEventsCopy().map(e => e.title));

function handleRegistrationForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.elements["reg-name"].value.trim();
    const email = form.elements["reg-email"].value.trim();
    const date = form.elements["reg-date"] ? form.elements["reg-date"].value : "";
    const type = form.elements["reg-type"] ? form.elements["reg-type"].value : "";
    const msg = form.elements["reg-message"].value.trim();
    let valid = true;
    if (!name) {
        showFieldError("name-error", "Name is required.");
        valid = false;
    } else {
        hideFieldError("name-error");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFieldError("email-error", "Enter a valid email address.");
        valid = false;
    } else {
        hideFieldError("email-error");
    }
    if (!valid) return;
    const output = document.getElementById("reg-output");
    if (output) {
        output.textContent = `✅ Thank you, ${name}! You're registered for "${type}".`;
        output.classList.add("show");
    }
    localStorage.setItem("preferredEventType", type);
    updatePrefStatus();
    postRegistration({
        name,
        email,
        date,
        type,
        message: msg
    });
    form.reset();
}

function showFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = msg;
        el.classList.add("show");
    }
}

function hideFieldError(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("show");
}

function postRegistration(data) {
    console.log("Posting registration:", data);
    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(result => {
            console.log("Server response:", result);
            showToast("Registration submitted!");
        }).catch(err => {
            console.error("POST error:", err);
            showToast("Saved locally.", true);
        });
    }, 800);
}

function validatePhone(input) {
    const val = input.value.trim();
    const el = document.getElementById("phone-validation");
    if (!el) return;
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (val === "") {
        el.textContent = "";
        input.classList.remove("error", "valid");
    } else if (regex.test(val)) {
        el.textContent = "✅ Valid phone number";
        el.style.color = "var(--success)";
        input.classList.remove("error");
        input.classList.add("valid");
    } else {
        el.textContent = "❌ Invalid phone number (e.g. 555-123-4567)";
        el.style.color = "var(--danger)";
        input.classList.remove("valid");
        input.classList.add("error");
    }
}

function showEventFee(selectEl) {
    const fees = {
        music: 15,
        workshop: 10,
        sports: 5,
        culture: 0,
        health: 8
    };
    const fee = fees[selectEl.value];
    const el = document.getElementById("fee-display");
    if (!el) return;
    if (selectEl.value) {
        el.textContent = `Registration fee for ${selectEl.value}: ${fee === 0 ? "Free" : "$" + fee}`;
        el.classList.add("show");
    } else {
        el.classList.remove("show");
    }
}

function submitFeedback(e) {
    e.preventDefault();
    const name = document.getElementById("fb-name")?.value.trim();
    if (!name) {
        showToast("Please enter your name.", true);
        return;
    }
    showToast(`Thank you, ${name}! Your feedback has been submitted.`);
    e.target.reset();
    const counter = document.getElementById("char-count");
    if (counter) counter.textContent = "0 / 300";
}

function countChars(textarea) {
    const max = 300;
    const len = textarea.value.length;
    const el = document.getElementById("char-count");
    if (!el) return;
    el.textContent = `${len} / ${max}`;
    el.className = "char-counter" + (len > max * 0.85 ? " warn" : "");
    if (len > max) textarea.value = textarea.value.substring(0, max);
}

function openLightbox(src, alt) {
    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    if (!lb || !img) return;
    img.src = src;
    img.alt = alt;
    lb.classList.add("show");
}

function closeLightbox() {
    document.getElementById("lightbox")?.classList.remove("show");
}

function onVideoCanPlay() {
    const el = document.getElementById("video-status");
    if (el) el.textContent = "✅ Video ready to play!";
}
let formDirty = false;
document.addEventListener("DOMContentLoaded", () => {
    const regForm = document.getElementById("registration-form");
    if (regForm) {
        regForm.addEventListener("input", () => {
            formDirty = true;
            console.log("[Debug] Form is dirty — unsaved changes present.");
        });
        regForm.addEventListener("submit", () => {
            formDirty = false;
            console.log("[Debug] Form submitted — dirty flag cleared.");
        });
    }
});
window.addEventListener("beforeunload", (e) => {
    if (formDirty) {
        e.preventDefault();
    }
});

function loadPreferences() {
    const saved = localStorage.getItem("preferredEventType");
    if (!saved) return;
    const regType = document.getElementById("reg-type");
    if (regType) regType.value = saved;
    const fbType = document.getElementById("fb-event-type");
    if (fbType) {
        fbType.value = saved;
        showEventFee(fbType);
    }
    updatePrefStatus();
    console.log("Loaded preference:", saved);
}

function updatePrefStatus() {
    const saved = localStorage.getItem("preferredEventType");
    const el = document.getElementById("pref-status");
    if (el) el.textContent = saved ? `✅ Saved preference: "${saved}"` : "No preferences saved.";
}

function clearPreferences() {
    localStorage.clear();
    sessionStorage.clear();
    updatePrefStatus();
    showToast("Preferences cleared!");
}

function findNearbyEvents() {
    const resultEl = document.getElementById("geo-result");
    const btn = document.getElementById("geo-btn");
    if (!navigator.geolocation) {
        if (resultEl) {
            resultEl.innerHTML = "❌ Geolocation is not supported by your browser.";
            resultEl.classList.add("show");
        }
        return;
    }
    if (btn) btn.disabled = true;
    if (resultEl) {
        resultEl.innerHTML = `<span class="spinner-dark"></span> Locating you...`;
        resultEl.classList.add("show");
        resultEl.style.background = "#fff3e0";
        resultEl.style.borderColor = "#ffcc80";
    }
    navigator.geolocation.getCurrentPosition((pos) => {
        const {
            latitude,
            longitude,
            accuracy
        } = pos.coords;
        console.log("Geolocation success:", pos.coords);
        if (resultEl) {
            resultEl.style.background = "#e3f2fd";
            resultEl.style.borderColor = "#90caf9";
            resultEl.innerHTML = `          <strong>📍 Your Location Found!</strong><br>          Latitude: <code>${latitude.toFixed(5)}</code><br>          Longitude: <code>${longitude.toFixed(5)}</code><br>          Accuracy: <code>±${Math.round(accuracy)} meters</code><br><br>          <strong>Nearest Events:</strong>          <ul style="margin-top:8px;padding-left:20px;">            <li>🎵 Summer Music Festival — Central Park (2.1 km)</li>            <li>🏃 City Marathon 5K — Riverside Trail (3.4 km)</li>            <li>🧘 Yoga in the Park — Greenfield Park (1.8 km)</li>          </ul>`;
        }
        if (btn) btn.disabled = false;
    }, (err) => {
        console.error("Geolocation error:", err);
        const messages = {
            [err.PERMISSION_DENIED]: "❌ Location access denied. Please allow location in browser settings.",
            [err.POSITION_UNAVAILABLE]: "❌ Location information unavailable.",
            [err.TIMEOUT]: "⏱️ Location request timed out. Please try again."
        };
        const msg = messages[err.code] || "❌ An unknown error occurred.";
        if (resultEl) {
            resultEl.style.background = "#ffebee";
            resultEl.style.borderColor = "#ef9a9a";
            resultEl.innerHTML = msg;
        }
        if (btn) btn.disabled = false;
    }, {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0
    });
}
let toastTimer = null;

function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.style.background = isError ? "var(--danger)" : "#323232";
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}
$(document).ready(function() {
    console.log("jQuery ready.");
    $("#registerBtn").click(function() {
        showToast("Register button clicked!");
    });
    $(".nav-links a").click(function(e) {
        const href = $(this).attr("href");
        if (href && href.startsWith("#")) {
            e.preventDefault();
            const target = $(href);
            if (target.length) {
                $("html, body").animate({
                    scrollTop: target.offset().top - 70
                }, 500);
            }
        }
    });
});