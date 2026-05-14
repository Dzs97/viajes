# Three Weeks — Itinerario Irlanda · Escocia · Inglaterra

Página web personal con el itinerario completo de viaje. **Google Maps**, dark mode, mobile-friendly.

## Stack

- **Next.js 14** (App Router)
- **Google Maps JavaScript API** (`@googlemaps/js-api-loader`)
- **CSS variables** para theming (light/dark)

---

## ⚠️ Setup INDISPENSABLE: API Key

Sin la API key, los mapas no cargan. Sigue estos pasos:

### Localmente

1. Copia `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Abre `.env.local` y pega tu API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...tu_key_aqui
   ```
3. **NUNCA** subas `.env.local` a GitHub. El `.gitignore` ya la excluye.

### En Vercel (para producción)

1. Dashboard del proyecto → **Settings** → **Environment Variables**
2. Add new:
   - **Key:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - **Value:** tu API key real
   - **Environments:** marca los tres (Production, Preview, Development)
3. Save y re-deploy

### Restricciones de seguridad en Google Cloud (críticas)

Tu API key debe estar restringida a:

- **HTTP referrers:**
  - `http://localhost:3000/*`
  - `https://*.vercel.app/*`
  - `https://tu-dominio-custom.com/*` (si tienes uno)
- **API restrictions:** solo "Maps JavaScript API"

---

## Cómo correrla localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Cómo desplegar en Vercel

### Opción A: Desde GitHub (recomendada)

1. Crea un repo nuevo en GitHub.
2. Desde la carpeta del proyecto:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
3. Entra a [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
4. **ANTES de hacer deploy:** click en "Environment Variables" y agrega `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
5. Click en **Deploy**.
6. En ~1 minuto tendrás tu URL pública.

Cada `git push` futuro re-despliega automáticamente.

### Opción B: Vercel CLI

```bash
npm install -g vercel
vercel
```

Cuando pregunte por env vars, agrega `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

---

## Cómo editar el contenido

Todo el itinerario está en **`app/data/trip.ts`**.

Para agregar un día nuevo:

```typescript
{
  number: 11,
  title: "Edimburgo highlights",
  narrative: "Castillo, Royal Mile, Arthur's Seat",
  sleep: "Edimburgo",
  locations: [
    {
      name: "Edinburgh Castle",
      lat: 55.9486,
      lng: -3.1999,
      time: "9:00 AM",
      duration: "2h",
      notes: "Reservar entrada online"
    }
  ]
}
```

**Para obtener coordenadas:** en Google Maps, click derecho sobre el lugar → primer número que aparece es la latitud y longitud separados por coma.

---

## Estructura

```
app/
  components/
    DayCard.tsx       Card expandible por día
    DayMap.tsx        Mapa Google Maps con marcadores
    ThemeToggle.tsx   Toggle light/dark
    mapsLoader.ts     Singleton para cargar Google Maps API
  data/
    trip.ts           ← TODO EL CONTENIDO ESTÁ AQUÍ
  globals.css         Estilos
  layout.tsx
  page.tsx            Página principal
.env.example          Template para tu API key
```

---

## Features

- ✓ Google Maps interactivo (zoom, drag, pan, satellite)
- ✓ Marcadores numerados por día con popups
- ✓ Click en marcador → popup con info + botón "Abrir en Google Maps"
- ✓ Línea punteada conectando paradas en orden
- ✓ Dark mode con toggle persistente (localStorage)
- ✓ Estilo de mapa adaptado a dark/light mode
- ✓ Mobile-friendly con gestos táctiles
- ✓ Sticky header con navegación entre países
- ✓ Lazy load de mapas (solo cargan cuando se expande el día)

---

## Costo estimado de Google Maps

Para una página personal con ~10 visitas/día, mostrando ~25 mapas en total:

- ~250 map loads/día × 30 días = ~7,500 map loads/mes
- Costo: ~$52 USD/mes... **PERO** Google da $200 USD de crédito gratis mensual
- **Costo real: $0**

Si pones límite de quota en Google Cloud (recomendado: 1000 map loads/día), garantizas que jamás llegues al límite del crédito gratuito.
