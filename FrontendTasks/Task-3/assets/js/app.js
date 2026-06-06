const collegeEvents = [
    {
        id: 1,
        name: "Technical Quiz",
        date: "2026-06-15",
        venue: "Innovation Lab, Block A",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=650&fit=crop",
        category: "Technical",
        schedule: [
            { time: "10:00 AM", event: "Registration & Guidelines", venue: "Reception Hall" },
            { time: "10:30 AM", event: "Round 1 (Quiz)", venue: "Innovation Lab" },
            { time: "12:00 PM", event: "Semi Final", venue: "Innovation Lab" },
            { time: "01:00 PM", event: "Finals & Winners", venue: "Auditorium" }
        ]
    },
    {
        id: 2,
        name: "Hackathon",
        date: "2026-06-22",
        venue: "University Seminar Hall",
        image: "https://images.unsplash.com/photo-1521737604893-d14ccf5d5d8c?w=1200&h=650&fit=crop",
        category: "Coding",
        schedule: [
            { time: "09:00 AM", event: "Check-in", venue: "Seminar Hall" },
            { time: "09:30 AM", event: "Problem Statement", venue: "Seminar Hall" },
            { time: "11:00 AM", event: "Mentor Sessions", venue: "Project Zones" },
            { time: "03:00 PM", event: "Demo Day", venue: "Main Stage" }
        ]
    },
    {
        id: 3,
        name: "Poster Presentation",
        date: "2026-06-28",
        venue: "Research Wing",
        image: "https://images.unsplash.com/photo-1522252236884-0a61c4e9f8b6?w=1200&h=650&fit=crop",
        category: "Academic",
        schedule: [
            { time: "10:00 AM", event: "Poster Setup", venue: "Research Wing" },
            { time: "10:30 AM", event: "Judging", venue: "Research Wing" },
            { time: "12:00 PM", event: "Interactive Q&A", venue: "Research Wing" },
            { time: "01:00 PM", event: "Best Poster Announcement", venue: "Seminar Hall" }
        ]
    },
    {
        id: 4,
        name: "Coding Contest",
        date: "2026-07-05",
        venue: "Computer Center",
        image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&h=650&fit=crop",
        category: "Competitive",
        schedule: [
            { time: "09:30 AM", event: "Contest Instructions", venue: "Computer Center" },
            { time: "10:00 AM", event: "Problem Solving Starts", venue: "Computer Center" },
            { time: "12:30 PM", event: "Time Check & Submissions", venue: "Computer Center" },
            { time: "01:00 PM", event: "Results & Ranking", venue: "Seminar Hall" }
        ]
    },
    {
        id: 5,
        name: "Project Expo",
        date: "2026-07-12",
        venue: "Main Grounds",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=650&fit=crop",
        category: "Innovation",
        schedule: [
            { time: "09:00 AM", event: "Expo Setup", venue: "Main Grounds" },
            { time: "10:00 AM", event: "Expo Opening", venue: "Main Stage" },
            { time: "11:30 AM", event: "Judging Rounds", venue: "Expo Stalls" },
            { time: "02:00 PM", event: "Awards & Closing", venue: "Main Stage" }
        ]
    },
    {
        id: 6,
        name: "Cultural Fest",
        date: "2026-07-20",
        venue: "University Auditorium",
        image: "https://images.unsplash.com/photo-1520697222865-7b3d4f1f0c9b?w=1200&h=650&fit=crop",
        category: "Cultural",
        schedule: [
            { time: "04:00 PM", event: "Inauguration", venue: "Auditorium" },
            { time: "05:00 PM", event: "Performances", venue: "Auditorium" },
            { time: "06:30 PM", event: "Dance & Music Battles", venue: "Auditorium" },
            { time: "08:00 PM", event: "Closing Ceremony", venue: "Auditorium" }
        ]
    }
];

function getEventById(id) {
    return collegeEvents.find(e => String(e.id) === String(id));
}

function renderEventsCards() {
    const container = document.getElementById("events-container");
    if (!container) return;

    container.innerHTML = "";
    collegeEvents.forEach(ev => {
        const card = document.createElement("div");
        card.className = "card card-shadow h-100 event-card";
        card.innerHTML = `
      <img src="${ev.image}" class="card-img-top" alt="${ev.name}" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${ev.name}</h5>
        <p class="text-muted mb-1">📅 ${ev.date}</p>
        <p class="text-muted mb-3">📍 ${ev.venue}</p>
        <div class="mt-auto d-flex gap-2">
          <a class="btn btn-primary w-100" href="register.html?event=${ev.id}">Register</a>
        </div>
      </div>
    `;
        container.appendChild(card);
    });
}

function populateRegistrationForm() {
    const select = document.getElementById("event-selection");
    if (!select) return;

    select.innerHTML = "";
    collegeEvents.forEach(ev => {
        const opt = document.createElement("option");
        opt.value = ev.id;
        opt.textContent = `${ev.name} (${ev.date})`;
        select.appendChild(opt);
    });

    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("event");
    if (eventId) {
        select.value = eventId;
    }
}

function showAlert(message, isError = false) {
    const wrap = document.getElementById("reg-alert");
    if (!wrap) return;

    wrap.innerHTML = `
    <div class="alert ${isError ? "alert-danger" : "alert-success"} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

function attachRegistrationHandler() {
    const form = document.getElementById("registration-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const studentName = document.getElementById("student-name").value.trim();
        const rollNumber = document.getElementById("roll-number").value.trim();
        const branch = document.getElementById("branch").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const eventId = document.getElementById("event-selection").value;

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const mobileOk = /^[0-9]{10}$/.test(mobile);

        if (!studentName || !rollNumber || !branch || !email || !mobile || !eventId) {
            showAlert("Please fill all required fields.", true);
            return;
        }
        if (!emailOk) {
            showAlert("Please enter a valid email.", true);
            return;
        }
        if (!mobileOk) {
            showAlert("Mobile number must be exactly 10 digits.", true);
            return;
        }

        const ev = getEventById(eventId);

        // Store locally (client-side only)
        const payload = {
            studentName,
            rollNumber,
            branch,
            email,
            mobile,
            eventId,
            eventName: ev ? ev.name : "",
            registeredAt: new Date().toISOString()
        };

        try {
            const existing = JSON.parse(localStorage.getItem("registrations") || "[]");
            existing.push(payload);
            localStorage.setItem("registrations", JSON.stringify(existing));
        } catch (_) {
            // ignore localStorage failures
        }

        showAlert(`✅ Success! ${studentName} registered for ${ev ? ev.name : "selected event"}.`, false);
        form.reset();
        populateRegistrationForm();
    });
}

function renderScheduleTable() {
    const tbody = document.getElementById("schedule-tbody");
    if (!tbody) return;

    const rows = [];
    collegeEvents.forEach(ev => {
        ev.schedule.forEach(item => {
            rows.push({ time: item.time, event: `${ev.name} — ${item.event}`, venue: item.venue });
        });
    });

    // Simple sort by date/time order not required; keep insertion order
    tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.time}</td>
      <td>${r.event}</td>
      <td>${r.venue}</td>
    </tr>
  `).join("");
}

function initHome() {
    // reserved
}

document.addEventListener("DOMContentLoaded", () => {
    renderEventsCards();
    populateRegistrationForm();
    attachRegistrationHandler();
    renderScheduleTable();
    initHome();
});

