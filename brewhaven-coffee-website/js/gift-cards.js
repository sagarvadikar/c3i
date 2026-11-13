/* =========================================================
   gift-cards.js — Gift Cards page only
   ---------------------------------------------------------
   - Choose a card design → updates the live preview
   - Amount, names and message update the preview as you type
   - Validates the sample form (NO payment, nothing is sent)
   ========================================================= */

const designButtons = document.querySelectorAll(".gift-option");
const previewImage = document.getElementById("preview-image");
const previewAmount = document.getElementById("preview-amount");
const previewToFrom = document.getElementById("preview-to-from");
const previewMessage = document.getElementById("preview-message");

const giftForm = document.getElementById("gift-form");
const recipientName = document.getElementById("recipient-name");
const recipientEmail = document.getElementById("recipient-email");
const senderName = document.getElementById("sender-name");
const messageBox = document.getElementById("gift-message");
const messageCount = document.getElementById("message-count");
const successBox = document.getElementById("gift-success");

let selectedDesignLabel = "Thank You";

/* ---------- 1. Choosing a design ---------- */
designButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Un-select every card, then select the clicked one
    designButtons.forEach(function (other) {
      other.setAttribute("aria-pressed", "false");
    });
    button.setAttribute("aria-pressed", "true");

    selectedDesignLabel = button.dataset.label;
    previewImage.src = "assets/images/gift-" + button.dataset.design + ".svg";
    previewImage.alt = "Selected design: " + selectedDesignLabel;

    // On small screens the preview is below, so give a hint
    showToast(selectedDesignLabel + " design selected");
  });
});

/* ---------- 2. Live preview while typing ---------- */
function updatePreview() {
  const checkedAmount = giftForm.querySelector('input[name="amount"]:checked');
  previewAmount.textContent = "$" + checkedAmount.value;

  const to = recipientName.value.trim() || "Recipient";
  const from = senderName.value.trim() || "You";
  previewToFrom.textContent = "To: " + to + " · From: " + from;

  // textContent (not innerHTML) so typed text can never become HTML
  previewMessage.textContent = messageBox.value.trim() || "Your message will appear here.";

  messageCount.textContent = messageBox.value.length + " / 150 characters";
}

giftForm.addEventListener("input", updatePreview);
giftForm.addEventListener("change", updatePreview);

/* ---------- 3. Validation ---------- */
function validateGiftForm() {
  let isValid = true;

  // Check each required field and show a helpful message
  if (recipientName.value.trim() === "") {
    showFieldError(recipientName, "Please enter the recipient's name.");
    isValid = false;
  } else {
    clearFieldError(recipientName);
  }

  if (recipientEmail.value.trim() === "") {
    showFieldError(recipientEmail, "Please enter the recipient's email.");
    isValid = false;
  } else if (!isValidEmail(recipientEmail.value.trim())) {
    showFieldError(recipientEmail, "Please enter a valid email, like name@example.com.");
    isValid = false;
  } else {
    clearFieldError(recipientEmail);
  }

  if (senderName.value.trim() === "") {
    showFieldError(senderName, "Please enter your name.");
    isValid = false;
  } else {
    clearFieldError(senderName);
  }

  return isValid;
}

// Remove a field's error as soon as the user fixes it
[recipientName, recipientEmail, senderName].forEach(function (input) {
  input.addEventListener("input", function () {
    if (input.getAttribute("aria-invalid") === "true" && input.value.trim() !== "") {
      clearFieldError(input);
    }
  });
});

giftForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  if (!validateGiftForm()) {
    successBox.hidden = true;
    // Move focus to the first problem so keyboard users find it
    giftForm.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  const amount = giftForm.querySelector('input[name="amount"]:checked').value;
  successBox.textContent =
    "Looks great! Your $" + amount + " \"" + selectedDesignLabel + "\" card for " +
    recipientName.value.trim() +
    " is ready to preview. This is a demo: no payment was taken and no gift card was created or sent.";
  successBox.hidden = false;
  successBox.scrollIntoView({ block: "center" });
});

updatePreview();
