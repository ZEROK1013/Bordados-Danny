/* === Formulario de contacto === */

/**
 * Envía el formulario de contacto de forma asíncrona vía Formspree.
 * Muestra mensajes de estado al usuario según el resultado.
 */
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  const formMessage = document.querySelector("#formMessage");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nombre = formData.get("nombre").trim();
    const apellido = formData.get("apellido").trim();
    const endpoint = contactForm.action;

    /* Verificar que el endpoint esté configurado */
    if (!endpoint) {
      formMessage.textContent = `Gracias, ${nombre} ${apellido}. Para guardar y enviar este formulario falta conectar el endpoint del servicio elegido.`;
      return;
    }

    formMessage.textContent = "Enviando información...";

    try {
      const response = await fetch(endpoint, {
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
}
