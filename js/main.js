// Plan Piloto Cáncer Gástrico y Colorrectal — landing page
// Sin dependencias: navegación suave ya la maneja el CSS (scroll-behavior),
// esto solo agrega seguimiento de eventos clave a GA4 (si gtag ya cargó) y
// un pequeño resaltado del link activo en el menú al hacer scroll.

(function () {
  function track(nombreEvento, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', nombreEvento, params || {});
    }
  }

  // Descarga de trípticos
  document.querySelectorAll('.download-card').forEach(function (a) {
    a.addEventListener('click', function () {
      track('descarga_triptico', { archivo: a.getAttribute('href') });
    });
  });

  // Clic en "Quiero más información" / llamadas telefónicas
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener('click', function () { track('clic_telefono'); });
  });
  document.querySelectorAll('a[href="#inscripcion"]').forEach(function (a) {
    a.addEventListener('click', function () { track('clic_cta_formulario'); });
  });

  // HubSpot dispara este evento estándar cuando alguien envía el formulario.
  window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
      track('formulario_enviado', { formulario: 'contacto_plan_gastrico' });
    }
  });
})();
