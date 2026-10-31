# CLAUDE.md

> Contexto del proyecto para Claude Code. Lee este archivo primero antes de hacer cualquier cambio.

## Qué es esto

Página web personal de itinerario de viaje de ~3 semanas (23 días) por Inglaterra, Irlanda y Escocia (1-23 mayo 2027). Vuelos internacionales COMPRADOS: ida AM 7 CDMX vie 30 abr 10:30 PM → LHR sáb 1 may 4:00 PM; regreso AF 1887 EDI dom 23 may 5:40 AM → CDG 8:45 AM + AM 6 CDG 2:55 PM → CDMX 7:10 PM. El owner (Diego) es el único usuario real; el sitio es semi-público en Vercel para compartir con familia y compañeros de viaje.

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
    BookingsSection.tsx  Página /reservas: qué reservar, cuándo, precio real y link
  data/
    trip.ts              ← TODO el itinerario vive aquí
    budget.ts            ← TODOS los costos del presupuesto viven aquí
    bookings.ts          ← Reservas: precios investigados + links + fase (cuándo reservar)
  reservas/page.tsx      Ruta /reservas
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

**Orden del viaje:** Inglaterra (días 1-7) → Irlanda (días 8-17) → Escocia (días 18-23). Día 1 = sáb 1 may 2027, día 23 = dom 23 may 2027 (solo vuelo de regreso, 5:40 AM). Fechas elegidas para evitar el bank holiday del 31 may, el half-term inglés (29 may-6 jun), el Chelsea Flower Show (18-22 may) y el June bank holiday irlandés (7 jun).

### Inglaterra (completo - 7 días, días 1-7)
- Día 1 sáb 1 may: Llegada + Piccadilly + Covent Garden evening
- Día 2 dom 2 may: SUNDAY CLUSTER (Columbia Road Flower Market + Brick Lane Vintage Market + Soane's Museum + British Museum + Sky Garden sunset). El Barbican Conservatory cerró por restauración hasta 2030.
- Día 3 lun 3 may (bank holiday): Westminster + West End (Abbey, Buckingham, National Gallery, Sherlock Holmes Pub, opcional teatro)
- Día 4 mar 4 may: DAY TRIP Wiltshire (Stonehenge + Bath + Castle Combe, tour organizado)
- Día 5 mié 5 may: City + South Bank en línea este→oeste (Tower, Leadenhall, Reflection Garden, St Paul's, Tate Modern, Shakespeare's Globe, Borough Market)
- Día 6 jue 6 may: Greenwich (Painted Hall + Queen's House + Royal Observatory) + Hampstead (Hill Garden Pergola + Holly Village)
- Día 7 vie 7 may: DAY TRIP Seven Sisters (acantilados East Sussex con coche rentado medio día desde East Croydon)
- Transporte: 7-Day Travelcard zonas 1-6 todo Londres. Coche rentado solo el día 7 (medio día).

### Irlanda (completo - 10 días, días 8-17)
- Día 8 sáb 8 may: TRANSICIÓN — Mañana Windsor Castle + Tarde Kew Gardens (tren directo Windsor→Richmond) + recoger maletas + vuelo nocturno LHR→DUB
- Días 9-17: Dublín → Galway → Cliffs of Moher → Sligo → Belfast → vuelo a Edimburgo la tarde del día 17 (primera noche en Edimburgo)
- Coche rentado del día 10 al día 17 (8 días)
- Todos los datos en `app/data/trip.ts` con coordenadas reales y notas

### Escocia (completo - 6 días, días 18-23)
- Días 18-23: Edimburgo (18-19) → Glencoe → Fort William (20) → Skye (21) → Loch Ness → hotel aeropuerto EDI (22) → vuelo vía París (23)
- Coche rentado del día 20 al día 22 (3 días), se devuelve la tarde del 22. Duddingston se fusionó en el día 19; Craigmillar Castle se quitó por el día perdido.
- Lugares principales: Edinburgh Castle, Royal Mile, Holyroodhouse, Duddingston cluster, Craigmillar Castle, Glencoe, Glenfinnan Viaduct, Eilean Donan, Isle of Skye (Old Man of Storr, Fairy Glen), Plodda Falls, Loch Ness, Inverness
- Día 23 = solo vuelo de regreso desde EDI (AF 1887 5:40 AM). Escala de ~6h en CDG: escapada a París opcional.
- Lounge 33 es un listening lounge de vinilos en Leith (no en Old Town); coordenadas aproximadas, verificar dirección. Islander = 6 Sibbald Walk (taller de bolsa Harris Tweed).

## Presupuesto (estado actual)

Configurado para **2 personas, nivel cómodo, salida desde México**. Todos los montos están en USD en `budget.ts` y se convierten dinámicamente con `exchangeRates`. Soporta MXN, USD, EUR, GBP.

Tipos de cambio del 23 oct 2026 (BCE, frankfurter.dev). Actualizar antes de reservar si pasa mucho tiempo:
- 1 USD ≈ 18.78 MXN
- 1 USD ≈ 0.89 EUR
- 1 USD ≈ 0.75 GBP

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

### Para marcar una reserva

Edita `app/data/bookings.ts` y cambia `status` a `"reservado"` o `"pagado"` (y si aplica también en `budget.ts`). Los precios ahí fueron investigados en oct 2026; `priceSource` dice si es oficial o estimado.

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

## Comunicación

El owner habla **español** principalmente. Responde en español. Es directo, le gustan explicaciones concisas con justificación técnica cuando hace sentido, pero sin parrafadas innecesarias. Está cómodo con git, terminal, y Vercel pero no es desarrollador profesional. Cuando hagas commits, usa mensajes claros en inglés (convención git estándar).

## Cuando hagas cambios

1. Lee primero el archivo que vas a modificar para entender el contexto
2. Mantén el estilo de código existente (comillas dobles, semicolons, etc.)
3. Verifica con `npm run build` antes de commit
4. Mensaje de commit descriptivo en inglés: `feat: add Scotland itinerary`, `fix: mobile budget overflow`, `style: improve map markers contrast`
5. Si modificas presupuesto, recuerda actualizar la fecha del tipo de cambio en `budget.ts` si pasaron varios meses

## Dependencias externas y cuentas

| Qué | Cuenta | Notas |
|---|---|---|
| Repo GitHub `Dzs97/viajes` | personal (`Dzs97`, `dzurita97@gmail.com`) | **Público.** Las credenciales de git en el Keychain de macOS funcionan para los repos de Dzs97. |
| Vercel (`viajes-eight.vercel.app`) | personal (Dzs97) | Auto-deploy al hacer push a `main`. |
| Google Maps JS API | Google Cloud del owner (**sin verificar si es personal o de trabajo**) | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` en Vercel y en `.env.local` (no en git). Se protege con HTTP referrer restrictions. |

No usa base de datos ni Anthropic API. `.claude/settings.local.json` solo tiene permisos (sin MCP, hooks ni comandos propios).

## Notas de trabajo (antes solo en la memoria de Claude)

- **Haz tú los commits y el push.** No le pases comandos de git a Diego: verifica el cambio, haz commit y push, y confirma el deploy.
- `gh` CLI no está instalado.
- **Landing page personal:** repo aparte en `~/Downloads/Projects/Dzs97.github.io` (GitHub Pages, https://dzs97.github.io). Es HTML/CSS plano con toggle EN/ES vía el diccionario `ES` en `index.html`. Sube `styles.css?v=N` cada vez que cambie el CSS. El sourcing tracker aparece listado **sin link, a propósito**: no lo enlaces públicamente.
- Diego es Recruitment Lead (no desarrollador). El contenido de la landing viene de su CV y LinkedIn.
