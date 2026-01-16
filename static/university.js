document.addEventListener("DOMContentLoaded", () => {
    const mapDiv = document.getElementById("map");

    if (!mapDiv) return;

    const lat = mapDiv.dataset.lat;
    const lon = mapDiv.dataset.lon;

    if (!lat || !lon) return;

    const map = L.map("map").setView([lat, lon], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([lat, lon]).addTo(map);

    const btn = document.getElementById("btnViewMap");
    if (btn) {
        btn.addEventListener("click", () => {
            window.open(
                `https://www.google.com/maps?q=${lat},${lon}`,
                "_blank"
            );
        });
    }
});
