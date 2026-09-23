# Plan Piloto Cáncer Gástrico y Colorrectal — Landing page de pacientes

Página informativa dirigida a los **pacientes** de Punitaqui, Monte Patria y Combarbalá sobre el
Plan Piloto de Prevención de Cáncer Gástrico y Colorrectal (Servicio de Salud Coquimbo /
Departamento de Salud e Higiene Ambiental de Ovalle). Explica qué es el plan, los 2 exámenes
(Panel Serológico Gástrico y Test de antígeno de H. pylori en deposiciones), cómo prepararse, el
proceso paso a paso, señales de alerta, preguntas frecuentes, y un formulario de contacto.

Es un sitio estático (HTML/CSS/JS, sin build ni dependencias de Node para producción) — pensado
para GitHub Pages.

> Este proyecto es la cara pública para pacientes; el sistema de formularios/planillas para el
> personal de salud (toma de muestra, REDCap, remesas) vive en el repo hermano
> `Formulario Plan Gástrico`.

## Contenido

- `index.html` — toda la página (una sola página, con anclas por sección).
- `css/styles.css` — estilos (paleta clara/oscura, responsive).
- `js/main.js` — navegación y eventos de seguimiento para GA4.
- `assets/` — los 2 trípticos oficiales en PDF, descargables desde la página.

## Configuración pendiente (obligatoria antes de publicar)

El sitio ya está completo y funcional, pero **el formulario y las estadísticas todavía no están
conectados a tus cuentas reales**. Faltan 2 cosas, ambas en `index.html`:

### 1. Google Analytics 4

Busca `G-XXXXXXXXXX` en `index.html` (aparecen 2 veces, en el `<head>`) y reemplázalo por tu
**Measurement ID** real:

1. Entra a [analytics.google.com](https://analytics.google.com) → Administrar → tu propiedad →
   Flujos de datos → tu flujo web.
2. Copia el "ID de medición" (formato `G-XXXXXXXXXX`).
3. Reemplaza las 2 apariciones en `index.html`.

Ya quedaron instrumentados como eventos personalizados: descarga de cada tríptico, clic en el
teléfono, clic en "Quiero más información", y envío del formulario.

### 2. Formulario de HubSpot

Busca `TU_PORTAL_ID` y `TU_FORM_ID` en `index.html` (sección `id="inscripcion"`) y reemplázalos:

1. En HubSpot: Marketing → Formularios → crea o abre el formulario que quieras usar (sugerido:
   Nombre, Comuna, Teléfono, Correo, Mensaje).
2. Botón "Compartir" → "Insertar en tu sitio web" → copia el `portalId`, `formId`, y la `region`
   (normalmente `na1`, pero verifica la tuya).
3. Reemplaza los 3 valores en `index.html`.
4. Borra (o deja, no molesta) el aviso `.form-fallback-note` que dice que el formulario no está
   conectado todavía — es solo para que no publiques el link sin darte cuenta con el formulario
   roto.

Sin este paso, el formulario simplemente no aparece (el contenedor queda vacío) y se ve el aviso
de que falta conectarlo.

## Cómo verlo localmente

```bash
npx http-server -p 8080 -c-1 .
```

Y abre `http://localhost:8080`.

## Publicar en GitHub Pages

Si el repo se creó con este mismo Claude Code (ver historial), ya debería estar publicado. Si no:

```bash
gh repo create <nombre-del-repo> --public --source=. --push
gh api -X POST repos/<tu-usuario>/<nombre-del-repo>/pages -f "source[branch]=main" -f "source[path]=/"
```

La URL queda en `https://<tu-usuario>.github.io/<nombre-del-repo>/` (GitHub tarda 1-2 minutos en
publicar la primera vez).

## Actualizar contenido

Todo el texto vive directo en `index.html` (sin sistema de plantillas) — búscalo y edítalo ahí.
Los trípticos en `assets/` son los mismos PDF oficiales entregados por el Departamento de Salud de
Ovalle; si cambia la versión impresa, reemplaza esos 2 archivos manteniendo el mismo nombre.
