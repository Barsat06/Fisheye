export function Modal(content, modalType) {
  const main = document.querySelector("main");
  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
  ${content.outerHTML}
  <label for="closeModalBtn" hidden>Close</label>
  <button id="closeModalBtn" class="closeModalBtn" type="button">
    <img src="../../assets/icons/close.svg" alt="Close modal">
  </button>

  `;

  main.appendChild(modal);

  const closeModalBtn = document.querySelector(".closeModalBtn");

  // Function to close the modal
  function closeModal() {
    main.removeChild(modal);

    // Remove the background overlay for the contact modal
    const background = document.querySelectorAll(".backgroundModal");
    const body = document.getElementById("body");
    background.forEach((div) => {
      body.removeChild(div);
    });

    // Restore focus to the contact form button
    const contactFormBtn = document.getElementById("contactFormBtn");
    contactFormBtn.focus();
  }
  
  // CSS selector string for all elements that can receive focus inside the modal
  const focusableElementsString =
    "input:not([disabled]), textarea:not([disabled]), button:not([disabled])";

  let focusableElements = [];
  let firstFocusableElement = null;
  let lastFocusableElement = null;


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
        e.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      // Handle forward tabbing
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  });

  //Specific modal logic
  if (modalType === "contact") {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Log form data as an object
      console.log(Object.fromEntries(new FormData(e.target)));
      closeModal();
    });
  }
  if (modalType === "lightBox") {
    const closeBtn = document.getElementById('closeModalBtn')
    closeBtn.className = "closeLightBox"
    const closeImg = document.querySelector('#closeModalBtn img')
    closeImg.src = "../../assets/icons/closeRed.svg"
    const whiteBg = document.querySelector('.backgroundModal')
    whiteBg.className = 'backgroundModal whiteBg'
  }

  return main;
}
