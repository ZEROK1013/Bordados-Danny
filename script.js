const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");
const formEndpoint = contactForm.dataset.formEndpoint;

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const nombre = formData.get("nombre").trim();
  const apellido = formData.get("apellido").trim();

  if (!formEndpoint) {
    formMessage.textContent = `Gracias, ${nombre} ${apellido}. Para guardar y enviar este formulario falta conectar el endpoint del servicio elegido.`;
    return;
  }

  formMessage.textContent = "Enviando información...";

  try {
    const response = await fetch(formEndpoint, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo enviar el formulario.");
    }

    formMessage.textContent = `Gracias, ${nombre} ${apellido}. Recibimos tus datos y pronto podremos contactarte.`;
    contactForm.reset();
  } catch (error) {
    formMessage.textContent = "No se pudo enviar el formulario. Intenta por WhatsApp o correo electrónico.";
  }
});
