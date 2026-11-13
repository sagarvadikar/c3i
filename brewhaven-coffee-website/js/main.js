/* =========================================================
   main.js — shared code that runs on EVERY page
   ---------------------------------------------------------
   1. Mobile menu (hamburger) open/close
   2. FAQ accordions
   3. Tabs (used on Rewards and Coffee pages)
   4. Toast popup helper (used by other files too)
   5. Footer extras (year + cookie button)
   ========================================================= */

/* ---------- 1. Mobile menu ---------- */
function setupMobileMenu() {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");

  // Stop if this page has no menu button (keeps the code safe)
  if (!toggleButton || !nav) return;

  const openIcon = toggleButton.querySelector(".icon-open");
  const closeIcon = toggleButton.querySelector(".icon-close");

  // Opens or closes the menu. "shouldOpen" is true or false.
  function setMenu(shouldOpen) {
    nav.classList.toggle("is-open", shouldOpen);
    toggleButton.setAttribute("aria-expanded", String(shouldOpen));
    toggleButton.setAttribute("aria-label", shouldOpen ? "Close menu" : "Open menu");
    openIcon.hidden = shouldOpen;
    closeIcon.hidden = !shouldOpen;
    // Stop the page behind from scrolling while the menu is open
    document.body.style.overflow = shouldOpen ? "hidden" : "";
  }

  toggleButton.addEventListener("click", function () {
    const isOpen = toggleButton.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  // Close the menu with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggleButton.focus();
    }
  });

  // If the window is resized to desktop size, make sure the menu resets
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && nav.classList.contains("is-open")) {
      setMenu(false);
    }
  });
}

/* ---------- 2. FAQ accordions ----------
   Each question is a <button> with aria-expanded.
   Clicking it shows/hides the answer next to it. */
function setupAccordions() {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach(function (button) {
    button.addEventListener("click", function () {
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isOpen));
      answer.hidden = isOpen;
    });
  });
}

/* ---------- 3. Tabs ----------
   Any element with the "data-tabs" attribute is a tab list.
   Each tab button points to its panel with aria-controls.
   Arrow keys move between tabs (standard accessible pattern). */
function setupTabs() {
  const tabLists = document.querySelectorAll("[data-tabs]");

  tabLists.forEach(function (tabList) {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

    function selectTab(selectedTab) {
      tabs.forEach(function (tab) {
        const isSelected = tab === selectedTab;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
        document.getElementById(tab.getAttribute("aria-controls")).hidden = !isSelected;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        selectTab(tab);
      });

      tab.addEventListener("keydown", function (event) {
        let newIndex = null;
        if (event.key === "ArrowRight") newIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") newIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") newIndex = 0;
        if (event.key === "End") newIndex = tabs.length - 1;

        if (newIndex !== null) {
          event.preventDefault();
          selectTab(tabs[newIndex]);
          tabs[newIndex].focus();
        }
      });
    });
  });
}

/* ---------- 4. Toast popup ----------
   showToast("Hello!") shows a small message at the bottom
   of the screen for a few seconds. Other JS files use it too. */
let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  // Reset the timer if a new message arrives quickly
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 3500);
}

/* ---------- Form helpers (used by auth.js and gift-cards.js) ----------
   Each input has a matching <span id="INPUTID-error"> under it. */

// Show an error message under a field and mark it invalid
function showFieldError(input, message) {
  const errorSpan = document.getElementById(input.id + "-error");
  input.setAttribute("aria-invalid", "true");
  if (errorSpan) errorSpan.textContent = message;
}

// Remove the error message from a field
function clearFieldError(input) {
  const errorSpan = document.getElementById(input.id + "-error");
  input.removeAttribute("aria-invalid");
  if (errorSpan) errorSpan.textContent = "";
}

// Simple email check: something@something.something
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------- 5. Footer extras ---------- */
function setupFooter() {
  // Always show the current year in the copyright line
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // The demo has no cookies, so this button just explains that
  const cookieButton = document.getElementById("cookie-preferences");
  if (cookieButton) {
    cookieButton.addEventListener("click", function () {
      showToast("This demo site doesn't use cookies, so there's nothing to change.");
    });
  }
}

/* ---------- Run everything once the page has loaded ---------- */
document.addEventListener("DOMContentLoaded", function () {
  setupMobileMenu();
  setupAccordions();
  setupTabs();
  setupFooter();
});
