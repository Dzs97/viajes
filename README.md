# Three Weeks — Itinerario Irlanda · Escocia · Inglaterra

Página web personal con el itinerario completo de viaje. Mapas dinámicos, dark mode, mobile-friendly.

## Stack

- **Next.js 14** (App Router)
- **React Leaflet** para mapas interactivos
- **OpenStreetMap** como proveedor de tiles (gratis, sin API key)
- **CSS variables** para theming (light/dark)

## Cómo correrla localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Cómo desplegar en Vercel

### Opción A: Desde GitHub (recomendado)

1. Crea un repo nuevo en GitHub (puede llamarse `trip-itinerary` o como quieras).
2. Desde la carpeta del proyecto, inicializa git y haz push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
3. Entra a [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
4. Vercel detecta Next.js automáticamente. Click en **Deploy**.
5. En ~1 minuto tendrás tu URL pública (algo como `tu-proyecto.vercel.app`).

Cada vez que hagas `git push` a `main`, Vercel re-despliega automáticamente.

### Opción B: Vercel CLI directo

```bash
npm install -g vercel
vercel
```

Sigue los prompts. Te genera la URL al terminar.

## Cómo editar el contenido

Todo el itinerario está en **`app/data/trip.ts`** — un solo archivo con la estructura:

```typescript
{
  id: "irlanda",
  name: "Irlanda",
  flag: "☘",
  days: [
    {
      number: 1,
      title: "Llegada a Dublín",
      narrative: "...",
      locations: [
        { name: "...", lat: 53.42, lng: -6.24, time: "3:00 PM", notes: "..." }
      ]
    }
  ]
}
```

Para agregar días a Escocia o Inglaterra: edita ese array y haz push. Vercel re-despliega.

Para obtener coordenadas de un lugar nuevo: búscalo en Google Maps, click derecho sobre el pin, copia los números (primero lat, después lng).

## Estructura

```
app/
  components/
    DayCard.tsx       Card expandible por día
    DayMap.tsx        Mapa Leaflet con marcadores numerados
    ThemeToggle.tsx   Toggle light/dark
  data/
    trip.ts           ← TODO EL CONTENIDO ESTÁ AQUÍ
  globals.css         Estilos
  layout.tsx
  page.tsx            Página principal
```

## Features

- ✓ Mapas interactivos (zoom, drag, pan)
- ✓ Marcadores numerados por día
- ✓ Click en marcador → popup con info + botón "Abrir en Google Maps"
- ✓ Línea punteada conectando paradas en orden
- ✓ Dark mode con toggle persistente (localStorage)
- ✓ Mobile-friendly
- ✓ Tema dark se aplica también a los tiles del mapa
- ✓ Sticky header con navegación entre países
