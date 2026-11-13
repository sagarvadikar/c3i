/* Brewhaven local PHP/MySQL authentication form validation. */
document.querySelectorAll(".password-toggle").forEach(function (button) {
  button.addEventListener("click", function () {
    const input = document.getElementById(button.dataset.target);
    const visible = input.type === "password";
    input.type = visible ? "text" : "password";
    button.textContent = visible ? "Hide" : "Show";
    button.setAttribute("aria-pressed", String(visible));
    button.setAttribute("aria-label", (visible ? "Hide" : "Show") + " password");
  });
});
function message(type, text) {
  const box = document.getElementById("form-message");
  if (!box) return;
  box.className = "notice notice-" + type;
  box.textContent = text;
  box.hidden = false;
}
function error(input, text) {
  input.setAttribute("aria-invalid", "true");
  const target = document.getElementById(input.id + "-error");
  if (target) target.textContent = text;
}
function clearError(input) {
  input.removeAttribute("aria-invalid");
  const target = document.getElementById(input.id + "-error");
  if (target) target.textContent = "";
}
function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
function clearOnInput(form) {
  form.querySelectorAll("input").forEach(function(input) {
    input.addEventListener(input.type === "checkbox" ? "change" : "input", function() { clearError(input); });
  });
}
const params = new URLSearchParams(location.search);
const status = params.get("status");
const authMessages = {
  registered: ["success", "Account created successfully. You can now sign in."],
  email_exists: ["error", "That email is already registered. Please sign in or use another email."],
  invalid: ["error", "Please check the form details and try again."],
  login_failed: ["error", "Email or password is incorrect."],
  logged_out: ["success", "You have been signed out."]
};
if (status && authMessages[status]) message(authMessages[status][0], authMessages[status][1]);

const signInForm = document.getElementById("sign-in-form");
if (signInForm) {
  const email = document.getElementById("signin-email");
  const password = document.getElementById("signin-password");
  clearOnInput(signInForm);
  signInForm.addEventListener("submit", function(e) {
    let ok = true;
    if (!email.value.trim() || !validEmail(email.value.trim())) { e.preventDefault(); error(email, "Enter a valid email address."); ok = false; }
    else clearError(email);
    if (!password.value) { e.preventDefault(); error(password, "Enter your password."); ok = false; }
    else clearError(password);
    if (!ok) {
      message("error", "Please fix the highlighted fields.");
      const first = signInForm.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
    }
  });
}
const joinForm = document.getElementById("join-form");
if (joinForm) {
  const first = document.getElementById("first-name"), last = document.getElementById("last-name");
  const email = document.getElementById("join-email"), password = document.getElementById("join-password");
  const confirm = document.getElementById("confirm-password"), terms = document.getElementById("accept-terms");
  clearOnInput(joinForm);
  joinForm.addEventListener("submit", function(e) {
    let ok = true;
    [[first, "Enter your first name."], [last, "Enter your last name."]].forEach(function(pair) {
      if (!pair[0].value.trim()) { e.preventDefault(); error(pair[0], pair[1]); ok = false; } else clearError(pair[0]);
    });
    if (!validEmail(email.value.trim())) { e.preventDefault(); error(email, "Enter a valid email address."); ok = false; } else clearError(email);
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password.value)) { e.preventDefault(); error(password, "Use at least 8 characters, including a letter and a number."); ok = false; } else clearError(password);
    if (confirm.value !== password.value || !confirm.value) { e.preventDefault(); error(confirm, "Passwords do not match."); ok = false; } else clearError(confirm);
    if (!terms.checked) { e.preventDefault(); error(terms, "Please accept the Terms and Privacy Notice."); ok = false; } else clearError(terms);
    if (!ok) {
      message("error", "Please fix the highlighted fields.");
      const firstInvalid = joinForm.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
    }
  });
}
