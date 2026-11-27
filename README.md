# Plan Piloto Cáncer Gástrico y Colorrectal — Landing page de pacientes

Página informativa dirigida a los **pacientes** de Ovalle, Punitaqui, Monte Patria y Combarbalá
sobre el Plan Piloto de Prevención de Cáncer Gástrico y Colorrectal (Servicio de Salud Coquimbo /
Departamento de Salud e Higiene Ambiental de Ovalle). Explica qué es el plan, los 3 exámenes
(Panel Serológico Gástrico, Test de antígeno de H. pylori, y Test FIT en deposiciones), cómo
prepararse para cada uno, el proceso paso a paso, señales de alerta, preguntas frecuentes, y un
formulario de contacto.

Es un sitio estático (HTML/CSS/JS, sin build ni dependencias de Node para producción) — pensado
para GitHub Pages.

> Este proyecto es la cara pública para pacientes; el sistema de formularios/planillas para el
> personal de salud (toma de muestra, REDCap, remesas) vive en el repo hermano
> `Formulario Plan Gástrico`.

## Decisiones de difusión (revisar si cambian)

- **`<meta name="robots" content="noindex, nofollow">`** en el `<head>`, más el archivo `_headers`
  (que Cloudflare Pages convierte en la cabecera `X-Robots-Tag: noindex, nofollow` para TODOS los
  archivos, incluidos los PDF de los trípticos — la meta etiqueta solo cubre el HTML): el sitio NO
  debe aparecer en buscadores por ahora. Si en algún momento se quiere indexar en Google, hay que
  borrar la meta etiqueta Y el `_headers`, y dar de alta el sitio en Search Console.
- **Sin botones de "compartir"** (WhatsApp/Facebook) todavía — se evaluó y se dejó pendiente a
  propósito.
- El contacto es por **WhatsApp** (`wa.me/56947490313`), no por llamada — se prefiere que la gente
  escriba antes que llame.

## Contenido

- `index.html` — toda la página (una sola página, con anclas por sección).
- `css/styles.css` — estilos (paleta clara/oscura, responsive).
- `js/main.js` — navegación y eventos de seguimiento para GA4.
- `assets/` — los 3 trípticos oficiales en PDF (descargables desde la página) + `og-image.png` (la
  imagen que se muestra al compartir el link) y `og-image-source.html` (el HTML fuente de esa
  imagen, por si hay que regenerarla — ver más abajo).

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

Ya quedaron instrumentados como eventos personalizados: descarga de cada tríptico, clic en
WhatsApp, clic en "Quiero más información", y envío del formulario.

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

## Hosting actual: Cloudflare Pages

El sitio se publica en **https://plan-gastrico-landing.pages.dev** desde la rama `master` de este
repo, conectado a Cloudflare Pages (proyecto `plan-gastrico-landing`, sin framework, sin comando de
build, directorio de salida vacío). Cada `git push` a `master` se despliega solo. Las URLs de
`og:url`, `og:image` y `twitter:image` en `index.html` apuntan a esa dirección: si se cambia de
dominio, hay que actualizar esas 3 líneas.

### Redirección desde GitHub Pages

El link antiguo (`xergio1625.github.io/plan-gastrico-landing/`) ya fue difundido, así que GitHub
Pages sigue encendido, pero `index.html` trae al inicio un script que redirige cualquier visita en
`*.github.io` a la dirección de Cloudflare (agregando `?utm_campaign=enlace_github`). Así todas las
visitas se miden en Cloudflare Web Analytics y no hay que reenviar el link. El script no hace nada
en `pages.dev` (no hay bucle). Los links directos a PDF en `github.io` no redirigen (se siguen
descargando). Si se cambia de dominio, actualizar la URL de destino en ese script.

## Publicar en GitHub Pages (alternativa)

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
Ovalle; si cambia la versión impresa, reemplaza esos archivos manteniendo el mismo nombre.

## Regenerar la imagen de "vista previa al compartir" (og-image.png)

Si cambia el texto de `assets/og-image-source.html` (por ejemplo, si cambian las comunas o el
número de exámenes), hay que volver a generar el PNG — WhatsApp/Facebook no leen HTML, necesitan
una imagen ya renderizada:

```bash
npx http-server -p 8080 -c-1 .
# con el server corriendo, en otra terminal:
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --window-size=1200,630 --screenshot="<ruta-absoluta-del-repo>\assets\og-image.png" "http://localhost:8080/assets/og-image-source.html"
```

Después de publicar, verifica cómo se ve el link con el
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — a veces hay que
"Scrape Again" para que refresque la imagen en caché.
