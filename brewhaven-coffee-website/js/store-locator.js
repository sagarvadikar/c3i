/* =========================================================
   store-locator.js — Find a Store page only
   ---------------------------------------------------------
   Searches a small list of INVENTED stores stored below.
   - Never asks for the visitor's location
   - Uses no map API, so there are no API keys to protect
   - Pins sit on an illustrated map using % positions
   ========================================================= */

/* ---------- Demo stores (all fictional) ----------
   hours: [openHour, closeHour] in 24-hour time, Sunday first.
   mapX / mapY: pin position on the map image, in percent. */
const STORES = [
  {
    id: 1, name: "Harbor Point (Demo)", address: "12 Lighthouse Lane, Harbor Point, Sample City 10001",
    features: ["Wi-Fi", "Outdoor seating"], mapX: 30, mapY: 70,
    hours: [[7, 19], [6, 20], [6, 20], [6, 20], [6, 20], [6, 21], [7, 21]]
  },
  {
    id: 2, name: "Maple Square (Demo)", address: "48 Maple Street, Old Town, Sample City 10002",
    features: ["Wi-Fi", "Open late"], mapX: 38, mapY: 38,
    hours: [[8, 22], [6, 23], [6, 23], [6, 23], [6, 23], [6, 23], [8, 23]]
  },
  {
    id: 3, name: "Riverside Drive-Thru (Demo)", address: "300 River Road, Riverside, Sample City 10003",
    features: ["Drive-thru"], mapX: 62, mapY: 66,
    hours: [[6, 20], [5, 21], [5, 21], [5, 21], [5, 21], [5, 21], [6, 20]]
  },
  {
    id: 4, name: "Station Plaza (Demo)", address: "1 Station Plaza, Central, Sample City 10004",
    features: ["Wi-Fi", "Open late", "Outdoor seating"], mapX: 60, mapY: 37,
    hours: [[7, 22], [5, 23], [5, 23], [5, 23], [5, 23], [5, 23], [7, 23]]
  },
  {
    id: 5, name: "Hillcrest (Demo)", address: "77 Summit Avenue, Hillcrest, Sample City 10005",
    features: ["Drive-thru", "Wi-Fi"], mapX: 83, mapY: 20,
    hours: [[7, 18], [6, 19], [6, 19], [6, 19], [6, 19], [6, 19], [7, 18]]
  },
  {
    id: 6, name: "Garden Park (Demo)", address: "5 Park Row, Garden District, Sample City 10006",
    features: ["Outdoor seating"], mapX: 17, mapY: 22,
    hours: [[8, 17], [7, 18], [7, 18], [7, 18], [7, 18], [7, 18], [8, 17]]
  },
  {
    id: 7, name: "University Corner (Demo)", address: "210 College Avenue, Campus, Sample City 10007",
    features: ["Wi-Fi", "Open late"], mapX: 85, mapY: 45,
    hours: [[9, 22], [7, 23], [7, 23], [7, 23], [7, 23], [7, 22], [9, 22]]
  }
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const searchForm = document.getElementById("store-search-form");
const searchInput = document.getElementById("store-search-input");
const resultsList = document.getElementById("store-results");
const storeCount = document.getElementById("store-count");
const mapArea = document.getElementById("map-area");
const chips = document.querySelectorAll(".chip");

let activeFeatures = []; // filters that are switched on
let selectedStoreId = null;

/* Turn 7 → "7 AM", 19 → "7 PM" */
function formatHour(hour) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const twelveHour = hour % 12 === 0 ? 12 : hour % 12;
  return twelveHour + " " + suffix;
}

/* Is the store open right now? (uses the visitor's clock) */
function getOpenStatus(store) {
  const now = new Date();
  const [open, close] = store.hours[now.getDay()];
  const hour = now.getHours();
  if (hour >= open && hour < close) {
    return { isOpen: true, text: "Open until " + formatHour(close) };
  }
  return { isOpen: false, text: "Closed · opens " + formatHour(hour < open ? open : store.hours[(now.getDay() + 1) % 7][0]) };
}

/* Build the weekly hours table for one store */
function buildHoursTable(store) {
  const today = new Date().getDay();
  let rows = "";
  store.hours.forEach(function (times, day) {
    const isToday = day === today;
    rows +=
      "<tr" + (isToday ? ' style="font-weight:700"' : "") + ">" +
      "<td>" + DAY_NAMES[day] + (isToday ? " (today)" : "") + "</td>" +
      "<td>" + formatHour(times[0]) + " – " + formatHour(times[1]) + "</td></tr>";
  });
  return '<table class="hours-table"><caption class="visually-hidden">Sample opening hours</caption><tbody>' + rows + "</tbody></table>";
}

/* Stores that match the search text AND every active filter */
function getMatchingStores() {
  const query = searchInput.value.trim().toLowerCase();
  return STORES.filter(function (store) {
    const matchesText =
      query === "" ||
      store.name.toLowerCase().includes(query) ||
      store.address.toLowerCase().includes(query);
    const matchesFeatures = activeFeatures.every(function (feature) {
      return store.features.includes(feature);
    });
    return matchesText && matchesFeatures;
  });
}

/* Draw the result cards and the map pins */
function renderStores() {
  const stores = getMatchingStores();
  resultsList.innerHTML = "";

  // Remove old pins from the map
  mapArea.querySelectorAll(".map-pin").forEach(function (pin) {
    pin.remove();
  });

  storeCount.textContent = stores.length + (stores.length === 1 ? " demo store found" : " demo stores found");

  if (stores.length === 0) {
    resultsList.innerHTML =
      '<li class="no-results"><h3>No stores found</h3>' +
      "<p>Try another search, such as \"Harbor\", \"Maple\" or \"10004\", or turn off some filters.</p></li>";
    return;
  }

  stores.forEach(function (store) {
    const status = getOpenStatus(store);
    const isSelected = store.id === selectedStoreId;

    // ----- Result card -----
    const item = document.createElement("li");
    item.className = "store-card" + (isSelected ? " selected" : "");
    item.innerHTML =
      "<h3>" + store.name + "</h3>" +
      "<p>" + store.address + "</p>" +
      '<p class="' + (status.isOpen ? "store-open" : "store-closed") + '">' + status.text + "</p>" +
      '<ul class="store-features">' +
      store.features.map(function (feature) { return "<li>" + feature + "</li>"; }).join("") +
      "</ul>" +
      '<button class="btn btn-outline" type="button" aria-expanded="' + isSelected + '">' +
      (isSelected ? "Hide hours" : "View hours & show on map") + "</button>" +
      (isSelected ? buildHoursTable(store) : "");

    item.querySelector("button").addEventListener("click", function () {
      selectStore(store.id === selectedStoreId ? null : store.id);
    });
    resultsList.appendChild(item);

    // ----- Map pin -----
    const pin = document.createElement("button");
    pin.type = "button";
    pin.className = "map-pin" + (isSelected ? " selected" : "");
    pin.style.left = store.mapX + "%";
    pin.style.top = store.mapY + "%";
    pin.setAttribute("aria-label", "Map pin: " + store.name);
    pin.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="3" fill="#fff"/></svg>';
    pin.addEventListener("click", function () {
      selectStore(store.id);
    });
    mapArea.appendChild(pin);
  });
}

/* Highlight one store (or none) and redraw */
function selectStore(storeId) {
  selectedStoreId = storeId;
  renderStores();

  // Scroll the selected card into view inside the list
  const selectedCard = resultsList.querySelector(".store-card.selected");
  if (selectedCard) {
    selectedCard.scrollIntoView({ block: "nearest" });
    selectedCard.querySelector("button").focus();
  }
}

/* ---------- Event listeners ---------- */
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stay on the page
  selectedStoreId = null;
  renderStores();
});

// Also update while typing, for a quicker feel
searchInput.addEventListener("input", function () {
  selectedStoreId = null;
  renderStores();
});

chips.forEach(function (chip) {
  chip.addEventListener("click", function () {
    const feature = chip.dataset.feature;
    const isOn = chip.getAttribute("aria-pressed") === "true";
    chip.setAttribute("aria-pressed", String(!isOn));

    if (isOn) {
      activeFeatures = activeFeatures.filter(function (f) { return f !== feature; });
    } else {
      activeFeatures.push(feature);
    }
    renderStores();
  });
});

renderStores(); // show all demo stores when the page opens
