# CLAUDE.md

> Contexto del proyecto para Claude Code. Lee este archivo primero antes de hacer cualquier cambio.

## Qué es esto

Página web personal de itinerario de viaje de 3 semanas por Irlanda, Escocia e Inglaterra (mayo–septiembre 2026). El owner (Diego) es el único usuario real; el sitio es semi-público en Vercel para compartir con familia y compañeros de viaje.

URL en producción: `https://viajes-eight.vercel.app/`

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Google Maps JavaScript API** (`@googlemaps/js-api-loader`) — requiere API key
- **CSS variables puras** para theming (sin Tailwind, sin styled-components)
- **Deploy:** Vercel, conectado a repo de GitHub
- **Sin base de datos:** todo el contenido vive en archivos `.ts` estáticos

## Estructura del proyecto

```
app/
  components/
    DayCard.tsx          Card expandible por día (click para abrir/cerrar)
    DayMap.tsx           Mapa Google Maps + botón "abrir ruta en Google Maps"
    mapsLoader.ts        Singleton para cargar Google Maps API una sola vez
    ThemeToggle.tsx      Toggle light/dark (persiste en localStorage)
    ScrollToTop.tsx      Botón flotante "volver arriba"
    ExportMenu.tsx       Botón flotante → PDF (vía print) o Markdown
    BudgetSection.tsx    Sección de presupuesto por país + GrandTotalBanner
  data/
    trip.ts              ← TODO el itinerario vive aquí
    budget.ts            ← TODOS los costos del presupuesto viven aquí
  globals.css            Estilos completos (vanilla CSS + custom properties)
  layout.tsx             Layout raíz
  page.tsx               Página principal (ensambla todo)
.env.example             Template para NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
.env.local               (no en git) API key real
```

## Convenciones importantes

### Reglas de oro
1. **El contenido vive en `data/`.** Para agregar días, paradas, costos: edita `trip.ts` o `budget.ts`. NUNCA pongas contenido hardcodeado en componentes.
2. **No uses Tailwind ni librerías de UI.** El proyecto usa vanilla CSS con variables custom. Mantén ese patrón.
3. **`use client` solo donde se necesita.** La página y secciones que pueden ser estáticas lo son; solo componentes interactivos (mapas, toggles, dropdowns) son client components.
4. **No subir `.env.local`.** Está en `.gitignore`. Para producción se configura en Vercel Environment Variables.

### Tipografía y diseño
- **Display:** Fraunces (serif editorial)
- **Body:** Outfit (sans-serif)
- **Mono:** JetBrains Mono (acentos, etiquetas, números)
- Paleta: parchment cálido + terracota + verde musgo. Dark mode tiene paleta oscura forest/teal.
- Estética inspirada en posters de viaje vintage europeos. Mantener este lenguaje visual al añadir elementos nuevos.

### CSS variables (las más importantes)
```
--bg, --bg-elevated, --bg-card       Backgrounds (claro a oscuro)
--ink, --ink-muted, --ink-faded      Texto (alto a bajo contraste)
--border, --border-subtle            Bordes
--accent (terracota)                 Color principal de marca
--accent-2 (verde musgo)             Secundario
--accent-3 (mostaza)                 Terciario
```
Estas variables tienen overrides en `[data-theme="dark"]`. Si añades colores nuevos, hazlo siguiendo este patrón.

## Datos del viaje (estado actual)

### Irlanda (completo - 10 días)
- Días 1-10: Dublín → Galway → Cliffs of Moher → Sligo → Belfast → vuelo a Edimburgo
- Coche rentado del día 3 al día 10
- Todos los datos en `app/data/trip.ts` con coordenadas reales y notas

### Escocia (pendiente)
- Sección creada pero `days: []`
- Owner llegará vía vuelo desde Dublín, planea usar transporte público
- 6-7 días estimados, base en Edimburgo
- Lugares de interés mencionados: Edimburgo, Highlands, Isla de Skye, Loch Ness

### Inglaterra (pendiente)
- Sección creada pero `days: []`
- 5-6 días estimados, base en Londres
- Lista de lugares del owner: London Eye, Westminster Abbey, Buckingham Palace, Big Ben, Tower of London, British Museum, Royal Botanic Gardens, Covent Garden, Warner Bros. Studio, Oxford Street, Piccadilly, Stonehenge, Castle Combe, Wiltshire, Windsor Castle

## Presupuesto (estado actual)

Configurado para **2 personas, nivel cómodo, salida desde México**. Todos los montos están en USD en `budget.ts` y se convierten dinámicamente con `exchangeRates`. Soporta MXN, USD, EUR, GBP.

Tipos de cambio al 13 de mayo 2026 (aproximados, actualizar si pasa mucho tiempo):
- 1 USD ≈ 17.20 MXN
- 1 USD ≈ 0.91 EUR
- 1 USD ≈ 0.78 GBP

## Cómo trabajar con este proyecto

### Para agregar un día nuevo

Edita `app/data/trip.ts`. Busca la sección del país correspondiente, añade un objeto al array `days`:

```typescript
{
  number: 11,
  title: "Edimburgo highlights",
  narrative: "Descripción del día en 1-2 frases",
  sleep: "Edimburgo",
  locations: [
    {
      name: "Edinburgh Castle",
      lat: 55.9486,
      lng: -3.1999,
      time: "9:00 AM",
      duration: "2h",
      notes: "Notas útiles para la visita"
    }
  ]
}
```

**Para obtener coordenadas:** Google Maps → click derecho → primer número (lat, lng).

### Para agregar/cambiar costos

Edita `app/data/budget.ts`. Cada país tiene `items: BudgetItem[]`. Todos los montos en USD; la conversión es automática.

### Para cambios de UI/UX

Estilos en `globals.css`. Está organizado por secciones con comentarios `/* ============ NOMBRE ============ */`. No fragmentes CSS en archivos separados — mantén todo en globals.css.

## Comandos

```bash
npm run dev        # Servidor local en localhost:3000
npm run build      # Build de producción (verificar que pasa)
npm run start      # Servidor de producción local
```

Antes de hacer push, ejecuta `npm run build` para verificar que no hay errores de TypeScript.

## Deploy

1. Push a `main` en GitHub → Vercel re-despliega automáticamente
2. La env var `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` ya está configurada en Vercel
3. Tiempo aproximado de build + deploy: ~45 segundos

## Decisiones técnicas tomadas (no revertir sin razón)

1. **Google Maps en vez de Leaflet:** mejor UX, integración con Google Maps app en móvil, dark mode nativo. La API key tiene tier gratuito generoso ($200/mes).
2. **Vanilla CSS en vez de Tailwind:** el dueño prefiere control directo y la estética es muy específica.
3. **Sin CMS, sin base de datos:** el contenido se edita en TypeScript. Para este caso de uso (un solo viaje, edits poco frecuentes) es lo más simple.
4. **`NEXT_PUBLIC_` prefix en la API key:** necesario porque Google Maps es client-side. La seguridad real viene de las HTTP referrer restrictions en Google Cloud Console.
5. **`gestureHandling: "greedy"`** en los mapas: permite scroll del mapa con un dedo en móvil sin que se quede atorado el scroll de la página (`cooperative` requería 2 dedos y era confuso).
6. **Mapas lazy-loaded** cuando se expande el día: ahorra cuota de Google Maps API.

## Cosas que el owner ha mencionado querer (backlog)

- Imágenes de cada lugar (opcional)
- Tiempo estimado de manejo entre paradas (Distance Matrix API)
- Sección de Escocia detallada
- Sección de Inglaterra detallada

## Comunicación

El owner habla **español** principalmente. Responde en español. Es directo, le gustan explicaciones concisas con justificación técnica cuando hace sentido, pero sin parrafadas innecesarias. Está cómodo con git, terminal, y Vercel pero no es desarrollador profesional. Cuando hagas commits, usa mensajes claros en inglés (convención git estándar).

## Cuando hagas cambios

1. Lee primero el archivo que vas a modificar para entender el contexto
2. Mantén el estilo de código existente (comillas dobles, semicolons, etc.)
3. Verifica con `npm run build` antes de commit
4. Mensaje de commit descriptivo en inglés: `feat: add Scotland itinerary`, `fix: mobile budget overflow`, `style: improve map markers contrast`
5. Si modificas presupuesto, recuerda actualizar la fecha del tipo de cambio en `budget.ts` si pasaron varios meses
