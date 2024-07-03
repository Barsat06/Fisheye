// Initialize the contact form with a personalized title and handle submission
export function getContactForm(name) {
  // Set the form title
  document.getElementById("formTitle").innerText = "Contactez-moi " + name;

  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Log form data as an object
    console.log(Object.fromEntries(new FormData(e.target)));
    closeModal();
  });
}
