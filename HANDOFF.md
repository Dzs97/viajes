# Handoff — continuar el proyecto en otra cuenta

> Contexto para retomar este proyecto en una nueva sesión de Claude Code (cuenta personal).
> Lee primero `CLAUDE.md` (contexto técnico) y luego este archivo (estado + decisiones + backlog).

---

## TL;DR del proyecto

**My Travel** — PWA de itinerario de viaje 24 días por Inglaterra, Irlanda y Escocia (15 may – 7 jun 2027). 2 personas, salida desde CDMX. Presupuesto total ~$14,315 USD / $246,218 MXN.

- **Repo:** https://github.com/Dzs97/viajes
- **Producción:** https://viajes-eight.vercel.app
- **Stack:** Next.js 14 App Router + TypeScript + vanilla CSS + Google Maps + Vercel
- **Owner:** Diego Zurita (dzurita97@gmail.com en git, diego@need.ai email personal)

---

## Estado actual del sitio (última sesión, sep 2026)

### Rutas
- `/` → Itinerario completo (hero, mapa general, breakdown de gastos colapsable, secciones por país)
- `/basics` → Lista editable de items a comprar/empacar antes del viaje

### Componentes clave
- **SiteHeader**: nav con tabs Itinerario/Basics, logo SVG del ícono, theme toggle
- **OverviewMap**: mapa completo con las ~50 paradas coloreadas por país
- **ExpenseBreakdown**: acordeón colapsable por país (nuevo — mostrado antes del country-nav)
- **BudgetSection**: presupuesto detallado por país (dentro de cada sección)
- **BasicsSection**: lista con edición inline (localStorage), status pills clickeables (pendiente/comprado/empacado/opcional)
- **Countdown**: cuenta regresiva al viaje (se actualiza automático)
- **DayCard**: card expandible por día con mapa lazy-loaded

### PWA (installable Android/iOS)
- `app/manifest.ts`, `app/icon.tsx`, `app/apple-icon.tsx`, `app/icon-{192,512,maskable}/route.tsx`
- Service worker en `public/sw.js` (cache-first + offline fallback)
- Nombre: **My Travel** — Ícono SVG travel poster (avión + castillo + mar + sol)
- Arte compartido en `app/lib/iconArt.tsx`

---

## Historia de decisiones (por si necesitas contexto de por qué)

### Orden del viaje
1. Originalmente era Irlanda → Escocia → Inglaterra
2. Cambió a **Inglaterra → Irlanda → Escocia** para volar directo CDMX→LHR y regresar EDI→CDMX (multi-city)

### Duración
1. Empezó como 21 días → 22 → 23 → **24 días** (extendió por agregar Seven Sisters)
2. Fecha inicio se movió de lun 17 may 2027 → **sáb 15 may 2027** para tener Sunday cluster (Barbican Conservatory + Brick Lane)

### Coche
- **Inglaterra**: sin coche excepto medio día para Seven Sisters (día 7, ~$115)
- **Irlanda**: coche 8 días (día 10-17), $720 renta + $280 gasolina
- **Escocia**: coche 4 días (día 20-23) para Highlands+Skye, $320 renta + $145 gasolina
- Resto: transporte público (Travelcard Londres, tren para transiciones)

### Hoteles
- Nivel 3-3.5★ centro (no lujo, bien ubicados)
- Londres: 7 noches $1,400 (Bayswater/Bloomsbury/King's Cross)
- Irlanda: 9 noches $1,100 (variedad)
- Escocia: 7 noches $1,120 (Edimburgo Old Town + Fort William + Portree Skye + Edimburgo airport)

### Vuelo internacional
- Presupuestado $3,000 USD los 2 (multi-city CDMX→LHR / EDI→CDMX)
- **Estrategia acordada:** aprovechar Hot Sale AeroMéxico (25 may - 2 jun cada año) y usar puntos Premier Rewards si aplica

### Sync de Basics
- **Intento fallido:** Vercel KV + PIN (revertido en commit revert — user prefirió simplicidad)
- **Actual:** localStorage por dispositivo (no sync entre dispositivos)
- Si en el futuro Diego pide sync, revisar commit `1ed1b63` (revertido) o proponer Supabase

---

## Decisiones importantes que el usuario tomó

1. **Zapatos:** irán con **Adidas Terrex Skychaser GTX** (regular low, $160). Waterproof + Continental rubber outsole. Otros considerados (Salomon XT Whisper, Nike Vomero Roam, ACG Phassad) — descartados por no ser waterproof.
2. **Basics editables** en la web con localStorage — NO sync entre dispositivos, aceptado el trade-off
3. **Seven Sisters** vale la pena — agregar día + coche medio día
4. **NO** ir a Cotswolds ni Windsor como day trip (queda Windsor como parte del día 8 transición con Kew)
5. **Rebrand a "My Travel"** con ícono travel poster

---

## Pendientes reales del owner (acciones que él debe hacer)

**Urgencia alta (próximas semanas):**
- [ ] Cotizar vuelos multi-city en Hot Sale AeroMéxico (~mayo cada año)
- [ ] Renovar pasaportes si vencen antes de dic 2027
- [ ] Comprar Adidas Terrex Skychaser GTX + calceta merino (romperlos con 15-20h antes del viaje)

**Urgencia media (meses antes del viaje):**
- [ ] Reservar The Witchery Edimburgo (~2 meses antes, lista de espera)
- [ ] Reservar hotel Portree en Isle of Skye (2-3 meses antes, se llenan)
- [ ] Reservar Palace of Holyroodhouse (2-3 semanas antes)
- [ ] Reservar Windsor Castle + Kew Gardens entradas
- [ ] Comprar seguro de viaje internacional (~$150 los 2)

**Urgencia baja (1-2 semanas antes):**
- [ ] Tramitar ETA UK (£10/persona, obligatorio para mexicanos)
- [ ] Recoger IDP (permiso internacional conducir) en SCT
- [ ] Configurar eSIM Airalo antes de salir

---

## Backlog técnico (things que se pueden mejorar en el sitio)

Cosas que Diego mencionó querer pero no se hicieron:
- Imágenes por lugar (opcional)
- Tiempo estimado de manejo entre paradas usando Distance Matrix API (existe estimación con haversine ya en `app/lib/geo.ts`, pero no llamadas reales)
- Dirección exacta de **Lounge 33** en Edimburgo (actualmente coord aprox)

Ideas mías (Claude) que quedaron abiertas:
- Sync de Basics entre dispositivos (Vercel KV — se implementó y revirtió, o Supabase)
- Botón "Exportar a basics.ts" para persistir cambios de localStorage al repo
- Mode offline más completo (precacheo agresivo de todas las rutas + tiles de mapa)

---

## Convenciones de trabajo

- **Idioma:** el usuario habla español, responde en español. Directo, técnico cuando es útil.
- **Commits en inglés:** convención estándar. Descriptivos: `feat:`, `fix:`, `style:`.
- **Antes de push:** ejecutar `npm run build` para verificar TypeScript.
- **Vercel auto-deploys:** push a `main` → despliegue en ~45s.
- **Contenido en `data/`:** nunca hardcodear días, paradas o costos en componentes.
- **Vanilla CSS:** no agregar Tailwind ni librerías de UI.

---

## Cómo continuar en la nueva sesión

1. Abrir Claude Code en la nueva cuenta desde `/Users/diegozurita/Downloads/Projects/trip-final` (o donde clones)
2. Claude Code lee automáticamente `CLAUDE.md` (contexto técnico) + este `HANDOFF.md` (estado + historia)
3. `git remote -v` para confirmar que apunta a `https://github.com/Dzs97/viajes`
4. Si no está clonado, ejecutar:
   ```bash
   git clone https://github.com/Dzs97/viajes.git trip-final
   cd trip-final
   npm install
   ```
5. Verificar `.env.local` con `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (no está en git — pedir de Vercel dashboard si se perdió)
6. `npm run dev` para desarrollo local

---

## Contexto interpersonal útil

- Diego viaja con su **pareja** (usa "mi pareja" en conversación)
- Ya tiene tenis **On Cloud** (para ciudad, no hiking)
- Tiene **puntos AeroMéxico** — quiere aprovecharlos para al menos un segmento del vuelo internacional
- Es **cómodo con git/terminal/Vercel** pero no es dev profesional — prefiere pasos claros
- **NO** le gustan las respuestas largas sin acciones concretas
- Confía en recomendaciones técnicas cuando vienen con justificación

---

## Último estado conocido (última acción antes del handoff)

- Última commit: `967e50f Rebrand to 'My Travel' with travel-themed icon (airplane, castle, sea)`
- Sitio funcional en Vercel
- PWA instalable en Android
- Basics editable con localStorage
- Owner satisfecho con estado ("perfecto!")
- Se acordó pausar hasta próxima sesión — probablemente para trabajar en el checklist de acciones urgentes arriba
