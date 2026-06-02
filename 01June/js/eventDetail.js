// Event Detail Popup functionality
function openEventDetail(eventId) {
    const ev = allEvents.find(e => e.id === eventId);
    if (!ev) return;
    const feeText = ev.fee === 0 ? 'Free' : '$' + ev.fee;
    const seatClass = ev.seats < 20 ? 'seat-count low' : 'seat-count';
    document.getElementById('detail-img').src = ev.image;
    document.getElementById('detail-img').alt = ev.title;
    document.getElementById('detail-title').textContent = ev.title;
    document.getElementById('detail-date').textContent = formatDate(ev.date);
    document.getElementById('detail-venue').textContent = ev.location;
    document.getElementById('detail-category').textContent = ev.category.charAt(0).toUpperCase() + ev.category.slice(1);
    document.getElementById('detail-fee').textContent = feeText;
    document.getElementById('detail-desc').textContent = ev.description;
    document.getElementById('detail-seats').textContent = '🪑 ' + ev.seats + ' seats';
    document.getElementById('detail-seats').className = seatClass;
    const badge = document.getElementById('detail-badge');
    badge.textContent = ev.category;
    badge.className = 'badge badge-' + ev.category;
    // Pass event id to register page via URL param
    const registerBtn = document.getElementById('detail-register-btn');
    registerBtn.href = 'register.html?event=' + ev.id;
    document.getElementById('event-detail-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}
function closeEventDetail() {
    document.getElementById('event-detail-overlay').classList.remove('show');
    document.body.style.overflow = '';
}
// Close on backdrop click
document.getElementById('event-detail-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeEventDetail();
});
// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeEventDetail();
});
