import { Modal } from "./modal.js";

export function ContactFormModal(name) {
  const contactForm = document.createElement("div");
  contactForm.className = "contact_modal";

  contactForm.innerHTML = `
  <div>
    <h1 id="formTitle">Contactez-moi ${name}</h1> 
  </div>
  <form id="contactForm" name="contactForm">
    <div role="group" aria-labelledby="coordonnees">
      <!-- Input fields for first name, last name, and email -->
      <div>
        <label for="firsName">Prénom</label>
        <input type="text" name="firsName" id="firsName" required />
      </div>
      <div>
        <label for="lastName">Nom</label>
        <input type="text" name="lastName" id="lastName" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required />
      </div>
    </div>

    <!-- Textarea for the message and submit button -->
    <div>
      <label for="message">Votre message</label>
      <textarea name="message" id="message" required></textarea>
    </div>
    <button id="submit" type="submit">Envoyer</button>
  </form>
  `;

  return Modal(contactForm, "contact");
}
