const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const nombre = formData.get("nombre").trim();
  const apellido = formData.get("apellido").trim();

  formMessage.textContent = `Gracias, ${nombre} ${apellido}. Recibimos tus datos y pronto podremos contactarte.`;
  contactForm.reset();
});
