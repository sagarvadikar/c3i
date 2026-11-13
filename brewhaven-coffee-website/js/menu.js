/* =========================================================
   menu.js — Menu page only
   ---------------------------------------------------------
   - Holds the sample product list (DEMO DATA)
   - Builds product cards on the page
   - Category filter buttons + search box
   - Product detail popup (modal)
   ========================================================= */

/* ---------- Category names shown as headings ---------- */
const CATEGORY_NAMES = {
  "hot-coffee": "Hot Coffee",
  "cold-coffee": "Cold Coffee",
  "refreshers": "Refreshers & More",
  "tea": "Tea",
  "food": "Food",
  "bakery": "Bakery"
};

/* ---------- Sample products (DEMO DATA) ----------
   Prices and calories are made up for practice.
   To add a product, copy one object and change the values.
   "image" is the file name inside assets/images/menu/ */
const PRODUCTS = [
  // Hot coffee
  { id: "caffe-latte", name: "Caffè Latte", category: "hot-coffee", price: 4.25, calories: 190, featured: true, description: "Rich espresso balanced with steamed milk and a light layer of foam." },
  { id: "cappuccino", name: "Cappuccino", category: "hot-coffee", price: 4.25, calories: 140, description: "Espresso under a deep, airy layer of milk foam." },
  { id: "caffe-mocha", name: "Caffè Mocha", category: "hot-coffee", price: 4.75, calories: 370, description: "Espresso, bittersweet chocolate sauce and steamed milk." },
  { id: "americano", name: "Caffè Americano", category: "hot-coffee", price: 3.45, calories: 15, description: "Espresso shots topped with hot water for a light, bold cup." },
  { id: "flat-white", name: "Flat White", category: "hot-coffee", price: 4.95, calories: 170, description: "Smooth ristretto shots with velvety whole milk." },
  { id: "caramel-macchiato", name: "Caramel Macchiato", category: "hot-coffee", price: 4.95, calories: 250, featured: true, description: "Vanilla, steamed milk and espresso, finished with caramel drizzle." },
  { id: "espresso", name: "Espresso", category: "hot-coffee", price: 2.45, calories: 10, description: "A small, intense shot with a golden crema." },

  // Cold coffee
  { id: "iced-latte", name: "Iced Latte", category: "cold-coffee", price: 4.45, calories: 130, description: "Espresso and cold milk poured over ice." },
  { id: "cold-brew", name: "Cold Brew", category: "cold-coffee", price: 4.25, calories: 5, description: "Slow-steeped for hours for a smooth, naturally sweet flavor." },
  { id: "vanilla-cream-cold-brew", name: "Vanilla Cream Cold Brew", category: "cold-coffee", price: 4.95, calories: 110, description: "Cold brew topped with a float of house vanilla cream." },
  { id: "iced-caramel-macchiato", name: "Iced Caramel Macchiato", category: "cold-coffee", price: 5.05, calories: 250, description: "Milk and vanilla over ice, marked with espresso and caramel." },
  { id: "mocha-frappe", name: "Mocha Frappé", category: "cold-coffee", price: 5.45, calories: 410, description: "Coffee, chocolate and milk blended with ice, topped with whipped cream." },
  { id: "pumpkin-spice-cream-cold-brew", name: "Pumpkin Spice Cream Cold Brew", category: "cold-coffee", price: 5.25, calories: 250, featured: true, description: "Seasonal sample: cold brew with a spiced pumpkin cream." },

  // Refreshers & more
  { id: "strawberry-refresher", name: "Strawberry Refresher", category: "refreshers", price: 4.45, calories: 90, featured: true, description: "Sweet strawberry and passion fruit shaken with ice." },
  { id: "mango-dragonfruit-refresher", name: "Mango Dragonfruit Refresher", category: "refreshers", price: 4.45, calories: 90, description: "Tropical mango and dragonfruit with a vibrant pink color." },
  { id: "pink-coconut-drink", name: "Pink Coconut Drink", category: "refreshers", price: 4.95, calories: 140, description: "Strawberry refresher mixed with creamy coconut milk." },
  { id: "lemonade", name: "Classic Lemonade", category: "refreshers", price: 3.25, calories: 120, description: "Bright, tangy lemonade served over ice." },
  { id: "hot-chocolate", name: "Hot Chocolate", category: "refreshers", price: 3.95, calories: 370, description: "Steamed milk with chocolate sauce and whipped cream." },

  // Tea
  { id: "chai-latte", name: "Chai Tea Latte", category: "tea", price: 4.45, calories: 240, description: "Black tea with cinnamon, clove and warm spices, plus steamed milk." },
  { id: "matcha-latte", name: "Matcha Latte", category: "tea", price: 4.75, calories: 240, featured: true, description: "Smooth green tea matcha whisked into steamed milk." },
  { id: "iced-matcha-latte", name: "Iced Matcha Latte", category: "tea", price: 4.75, calories: 200, description: "Matcha green tea and cold milk over ice." },
  { id: "earl-grey-tea", name: "Earl Grey Tea", category: "tea", price: 2.95, calories: 0, description: "Black tea scented with bergamot citrus." },
  { id: "iced-peach-green-tea", name: "Iced Peach Green Tea", category: "tea", price: 3.95, calories: 60, description: "Green tea shaken with peach juice and ice." },

  // Food
  { id: "turkey-pesto-sandwich", name: "Turkey Pesto Sandwich", category: "food", price: 7.45, calories: 520, description: "Sliced turkey, basil pesto and greens on toasted bread." },
  { id: "egg-bites", name: "Cheese & Pepper Egg Bites", category: "food", price: 5.25, calories: 230, featured: true, description: "Fluffy egg bites with cheese and roasted peppers." },
  { id: "oatmeal", name: "Berry Oatmeal", category: "food", price: 4.45, calories: 220, description: "Warm rolled oats topped with fresh berries." },
  { id: "cheese-scone", name: "Cheddar Scone", category: "food", price: 3.45, calories: 380, description: "A savory scone baked with sharp cheddar." },

  // Bakery
  { id: "butter-croissant", name: "Butter Croissant", category: "bakery", price: 3.25, calories: 260, featured: true, description: "Flaky, golden and buttery." },
  { id: "blueberry-muffin", name: "Blueberry Muffin", category: "bakery", price: 3.25, calories: 360, description: "A soft muffin packed with juicy blueberries." },
  { id: "chocolate-chip-cookie", name: "Chocolate Chip Cookie", category: "bakery", price: 2.75, calories: 380, description: "Chewy cookie with plenty of chocolate chips." },
  { id: "banana-bread", name: "Banana Walnut Bread", category: "bakery", price: 3.45, calories: 410, description: "Moist banana bread with toasted walnuts." },
  { id: "cinnamon-roll", name: "Cinnamon Roll", category: "bakery", price: 3.75, calories: 420, description: "A soft swirl of cinnamon sugar with vanilla icing." },
  { id: "lemon-loaf", name: "Iced Lemon Loaf", category: "bakery", price: 3.45, calories: 470, description: "Zesty lemon cake topped with sweet icing." }
];

/* ---------- Page state ---------- */
let currentCategory = "all";
let searchText = "";
let lastFocusedElement = null; // so focus can return after the modal closes

/* ---------- Page elements ---------- */
const resultsArea = document.getElementById("menu-results");
const resultCount = document.getElementById("result-count");
const searchInput = document.getElementById("menu-search-input");
const categoryButtons = document.querySelectorAll(".category-btn");
const modal = document.getElementById("product-modal");

/* Format a number as a price, e.g. 4.5 -> "$4.50" */
function formatPrice(amount) {
  return "$" + amount.toFixed(2);
}

/* Create the HTML for one product card (a <button> so it's keyboard friendly) */
function createProductCard(product) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "product-card";
  card.dataset.id = product.id;
  card.setAttribute("aria-label", product.name + ", " + formatPrice(product.price) + ". View details");

  card.innerHTML =
    '<span class="product-card-image">' +
    '<img src="assets/images/menu/' + product.id + '.svg" alt="" loading="lazy" width="160" height="160">' +
    "</span>" +
    '<span class="product-card-name">' + product.name + "</span>" +
    '<span class="product-card-price">' + formatPrice(product.price) + " &middot; sample</span>";

  card.addEventListener("click", function () {
    openModal(product);
  });

  return card;
}

/* Returns only the products that match the chosen category AND search text */
function getFilteredProducts() {
  return PRODUCTS.filter(function (product) {
    const matchesCategory =
      currentCategory === "all" ||
      (currentCategory === "featured" && product.featured) ||
      product.category === currentCategory;

    const matchesSearch = product.name.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });
}

/* Draw the product list on the page */
function renderProducts() {
  const products = getFilteredProducts();
  resultsArea.innerHTML = ""; // clear old cards

  // Update the "X items" message (announced to screen readers)
  resultCount.textContent = products.length + (products.length === 1 ? " item" : " items");

  // Nothing found: show a friendly message
  if (products.length === 0) {
    resultsArea.innerHTML =
      '<div class="no-results">' +
      "<h3>No drinks or food found</h3>" +
      "<p>Try a different word, or choose another category.</p>" +
      '<button class="btn btn-outline" type="button" id="clear-search">Clear search</button>' +
      "</div>";
    document.getElementById("clear-search").addEventListener("click", function () {
      searchInput.value = "";
      searchText = "";
      setCategory("all");
    });
    return;
  }

  // Decide which groups to show: every category, or just one
  let groups;
  if (currentCategory === "all") {
    groups = Object.keys(CATEGORY_NAMES);
  } else if (currentCategory === "featured") {
    groups = ["featured"];
  } else {
    groups = [currentCategory];
  }

  groups.forEach(function (group) {
    const groupProducts = products.filter(function (product) {
      return group === "featured" ? true : product.category === group;
    });
    if (groupProducts.length === 0) return;

    const heading = document.createElement("h3");
    heading.className = "menu-category-title";
    heading.id = group;
    heading.textContent = group === "featured" ? "Featured" : CATEGORY_NAMES[group];

    const grid = document.createElement("div");
    grid.className = "product-grid";
    groupProducts.forEach(function (product) {
      grid.appendChild(createProductCard(product));
    });

    resultsArea.appendChild(heading);
    resultsArea.appendChild(grid);
  });
}

/* Change the selected category and redraw */
function setCategory(category) {
  // Ignore unknown names (e.g. a mistyped link)
  if (category !== "all" && category !== "featured" && !CATEGORY_NAMES[category]) {
    category = "all";
  }
  currentCategory = category;

  categoryButtons.forEach(function (button) {
    const isActive = button.dataset.category === category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderProducts();
}

/* ---------- Modal (product details popup) ---------- */
function openModal(product) {
  lastFocusedElement = document.activeElement;

  document.getElementById("modal-image").src = "assets/images/menu/" + product.id + ".svg";
  document.getElementById("modal-image").alt = product.name;
  document.getElementById("modal-category").textContent = CATEGORY_NAMES[product.category];
  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-description").textContent = product.description;
  document.getElementById("modal-price").textContent = formatPrice(product.price);
  document.getElementById("modal-calories").textContent = product.calories + " cal";

  modal.hidden = false;
  document.body.classList.add("modal-open");
  document.getElementById("modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

function setupModal() {
  document.getElementById("modal-close").addEventListener("click", closeModal);

  // Clicking the dark background (outside the white box) closes it
  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  // Escape closes it; Tab stays inside the modal (focus trap)
  document.addEventListener("keydown", function (event) {
    if (modal.hidden) return;

    if (event.key === "Escape") {
      closeModal();
    }

    if (event.key === "Tab") {
      const focusable = modal.querySelectorAll("button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.getElementById("modal-add").addEventListener("click", function () {
    const name = document.getElementById("modal-title").textContent;
    closeModal();
    showToast(name + " added — this is a demo, so no real order was placed.");
  });
}

/* ---------- Start the page ---------- */
categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    setCategory(button.dataset.category);
    // Keep the URL in sync so links like menu.html#tea work
    history.replaceState(null, "", button.dataset.category === "all" ? "menu.html" : "#" + button.dataset.category);
  });
});

// Search runs on every keystroke
searchInput.addEventListener("input", function () {
  searchText = searchInput.value.trim().toLowerCase();
  renderProducts();
});

setupModal();

// If the page was opened with a category in the URL (e.g. menu.html#cold-coffee), select it
setCategory(window.location.hash.replace("#", "") || "all");
