const modal = document.getElementById("contact_modal");
const closeModalBtn = document.getElementById("closeModalBtn");

// CSS selector string for all elements that can receive focus inside the modal
const focusableElementsString =
  "input:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]";

let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

// Function to display the modal
function displayModal() {
  modal.style.display = "block";

  // Get all focusable elements within the modal
  focusableElements = modal.querySelectorAll(focusableElementsString);

  // Set the first and last focusable elements
  firstFocusableElement = focusableElements[0];
  lastFocusableElement = focusableElements[focusableElements.length - 1];
  firstFocusableElement.focus();

  // Create a background overlay for the modal
  const background = document.createElement("div");
  background.className = "backgroundModal";
  const body = document.getElementById("body");
  body.appendChild(background);
}

// Add an event listener to the close button to close the modal
closeModalBtn.addEventListener("click", () => {
  closeModal();
});

// Add an event listener to the modal for handling keydown events
modal.addEventListener("keydown", (e) => {
  let isTabPressed = e.key === "Tab";
  let isEscPressed = e.key === "Escape";

  // Close the modal if the Escape key is pressed
  if (isEscPressed) {
    closeModal();
  }

  if (!isTabPressed) {
    return;
  }
  // Handle reverse tabbing
  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
    }
  } else {
    // Handle forward tabbing
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
    }
  }
});

// Function to close the modal
function closeModal() {
  const openModalBtn = document.getElementById("openModalBtn");
  modal.style.display = "none";

  // Remove the background overlay for the modal
  const background = document.querySelectorAll(".backgroundModal");
  const body = document.getElementById("body");
  background.forEach((div) => {
    body.removeChild(div);
  });

  // Restore focus to the button that opened the modal
  openModalBtn.focus();
}
