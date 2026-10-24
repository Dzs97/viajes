// Presupuesto para 2 personas, nivel cómodo, salida desde México, 1-24 mayo 2027
// Hoteles nivel 3-3.5 estrellas. Temporada baja-media (inicios de mayo): evita el bank holiday del 31 may y el half-term inglés (29 may-6 jun).
// Tipos de cambio base (mayo 2027 aproximados): 1 USD ≈ 17.20 MXN, 1 EUR ≈ 18.70 MXN, 1 GBP ≈ 21.80 MXN
// Todos los montos están en USD para fácil conversión.

export type BookingStatus = "pendiente" | "reservado" | "pagado";

export type BudgetItem = {
  label: string;
  amount: number; // USD
  detail?: string;
  status?: BookingStatus; // default: pendiente
};

export type CountryBudget = {
  countryId: string;
  items: BudgetItem[];
};

export const exchangeRates = {
  USD: 1,
  MXN: 17.2,
  EUR: 0.91, // 1 USD = 0.91 EUR
  GBP: 0.78, // 1 USD = 0.78 GBP
};

export type Currency = keyof typeof exchangeRates;

export const currencySymbols: Record<Currency, string> = {
  USD: "$",
  MXN: "$",
  EUR: "€",
  GBP: "£",
};

export const currencyLabels: Record<Currency, string> = {
  USD: "USD",
  MXN: "MXN",
  EUR: "EUR",
  GBP: "GBP",
};

// All numbers in USD, for 2 people total, nivel cómodo con hoteles 3-3.5★
export const budgets: CountryBudget[] = [
  {
    countryId: "inglaterra",
    items: [
      {
        label: "Vuelo redondo CDMX → Londres (regreso desde Edimburgo)",
        amount: 3000,
        detail: "2 personas, multi-city: CDMX→LHR, EDI→CDMX. British Airways directo, AeroMéxico, KLM o Air France con conexión. Best case $2,400-2,800 si reservan en sweet spot (sep-nov 2026) o aprovechan Hot Sale. Realista $2,800-3,200 reservando 3-4 meses antes. Buffer hasta $3,000 por fluctuación de precio + selección asientos + maletas. AeroMéxico directo MEX-LHR es más cómodo (~$1,400/pp), KLM/AF con escala más barato (~$1,200/pp).",
      },
      {
        label: "Hospedaje Londres (7 noches, hoteles 3-3.5★ centro)",
        amount: 1400,
        detail: "Promedio $200/noche en mayo (temporada media). Zonas recomendadas con tube zona 1-2: Bayswater, Bloomsbury, King's Cross, South Kensington. Cadenas: Premier Inn Hub Kings Cross (~£140), Travelodge Plus Bayswater (~£150), Hilton Garden Inn London City (~£180), ibis Styles. Reservar 2-3 meses antes.",
      },
      {
        label: "7-Day Travelcard zonas 1-6 (2 personas)",
        amount: 210,
        detail: "£81.60/persona × 2 = £163 ≈ $210 (precio TfL 2026, congelado vs 2025). Mismo monto que el cap semanal de contactless. Cubre tube + bus + Overground + DLR durante 7 días. Alternativa: contactless/Oyster con cap diario (~£15/día zonas 1-2). Travelcard sale igual o más barato si harán 6+ viajes diarios.",
      },
      {
        label: "Trenes día 8 (Paddington → Windsor → Richmond)",
        amount: 40,
        detail: "GWR Paddington → Windsor & Eton Central (sencillo) + SWR Windsor & Eton Riverside → Richmond (sencillo), 2 personas ~£30. El Travelcard de 7 días ya venció el día 8. Comprar en gwr.com / southwesternrailway.com o contactless.",
      },
      {
        label: "Tour día Wiltshire (Stonehenge + Bath + Castle Combe)",
        amount: 300,
        detail: "Tour organizado de día completo desde Londres con bus + guía + entradas a Stonehenge y Roman Baths. ~$130-180/persona según si incluye entradas (precios oct 2026). Operadores: Golden Tours, Premium Tours, Evan Evans. Recoge en hotel central o Victoria Coach. 10-12h. Alternativa self-drive con renta de auto 1 día ~$130 total.",
      },
      {
        label: "Coche rentado medio día (Seven Sisters)",
        amount: 115,
        detail: "Pick up en estación perimetral sur (East Croydon o similar — evitar central London por tarifas y tráfico). $60 renta + $20 gasolina + $7 parking Birling Gap + $20 seguro + $15 tube a/desde estación. Roundtrip ~80 millas. Manejar del lado izquierdo en UK — primera vez = estrés, ir despacio.",
      },
      {
        label: "Vuelo Londres (LHR/STN) → Dublín (DUB)",
        amount: 140,
        detail: "Ryanair, EasyJet o Aer Lingus, ~1h vuelo, ~$70/persona reservando con 2-3 meses anticipación. Alternativa: ferry Holyhead-Dublin (~$220-300 los 2, 8-10h door-to-door, más experiencia).",
      },
      {
        label: "Entradas atracciones pagadas",
        amount: 570,
        detail: "Precios oficiales oct 2026: Westminster Abbey £31×2=$80, Tower of London £37×2=$95, St Paul's Cathedral £27×2=$69, Shakespeare's Globe tour ~£27×2=$69, Painted Hall Greenwich £19×2=$49, Royal Observatory Greenwich £18-24×2=$62, Windsor Castle £32×2=$82, Kew Gardens £25×2=$64. Reservar online para evitar colas. GRATIS: British Museum, National Gallery, Tate Modern, Sir John Soane's Museum, Sky Garden (reservar), Columbia Road Flower Market (dom), Queen's House Greenwich, St James's Park, Hill Garden Pergola, Holly Village, Cambio de Guardia Buckingham.",
      },
      {
        label: "Comida y bebidas (7 días)",
        amount: 1500,
        detail: "7 días × ~$214/día para 2. Mix: desayuno casual/hotel ($30), lunch pub o mercado ($35), cena mid-range ($90-100), 2-3 pints/día ($25). Highlights: cena Sherlock Holmes Pub día 3, curry Brick Lane día 2 dom, dinner Borough Market area día 5, pub Hampstead día 6, lunch Alfriston día 7 Seven Sisters. Una cena especial opcional: The Ivy Market Grill ($120 los 2).",
      },
      {
        label: "Teatro West End (opcional)",
        amount: 100,
        detail: "Día 3 noche. Mamma Mia, Les Misérables, Phantom, Wicked. TKTS Leicester Square día del show £30-50/persona. Saltable si quieren ahorrar.",
      },
      {
        label: "Buffer (taxis nocturnos, propinas, imprevistos)",
        amount: 100,
        detail: "Uber/black cab cuando tube cierra ~midnight semana (1 AM weekends). Propinas restaurantes (12.5% típico, verificar si ya incluida en bill). Misc.",
      },
    ],
  },
  {
    countryId: "irlanda",
    items: [
      {
        label: "Hospedaje (9 noches, hoteles 3-3.5★)",
        amount: 1100,
        detail: "Dublín (4 noches) $130/noche, Galway (2) $110, Sligo (1) $95, Bushmills (1) $130, Belfast (1) $110. Promedio $122/noche en mayo (shoulder season).",
      },
      {
        label: "Renta de coche (8 días)",
        amount: 720,
        detail: "Automático, seguro completo, cross-border NI incluido. ~$90/día con compañías como Hertz o Europcar.",
      },
      {
        label: "Gasolina + tolls + parking",
        amount: 280,
        detail: "~1,500 km en total. Diesel ~€1.70/L. Tolls M50/M1 + parking en ciudades.",
      },
      {
        label: "Comida y bebidas",
        amount: 1400,
        detail: "10 días × $140/día para 2 (desayuno casual + comida + cena con pints). Pubs son la experiencia, no escatimar.",
      },
      {
        label: "Actividades y entradas",
        amount: 495,
        detail: "Precios oct 2026: Book of Kells (€25×2), Cliffs of Moher online (€12×2), Giant's Causeway (£14-18×2), Titanic Belfast (£24.95×2), Vintage Tea Tour (~€60×2), Powerscourt Waterfall (€8×2), Newgrange + Knowth (€18×2), Black Cab Tour (~£30×2), Kylemore Abbey (€18×2). Guinness Storehouse opcional (desde €26).",
      },
      {
        label: "Vuelo Dublín → Edimburgo",
        amount: 160,
        detail: "2 personas, Aer Lingus o Ryanair, ~$80 c/u si se reserva con anticipación.",
      },
    ],
  },
  {
    countryId: "escocia",
    items: [
      {
        label: "Hospedaje (7 noches, hoteles 3-3.5★)",
        amount: 1120,
        detail: "Edimburgo Old Town (4 noches) $170/noche = $680, Fort William (1) $130, Portree Skye (1) $180 (Skye se llena), Edimburgo cerca aeropuerto (1) $130. Promedio $160/noche en mayo.",
      },
      {
        label: "Coche rentado (3 días)",
        amount: 240,
        detail: "Automático con seguro completo. Pickup día 21 (centro o aeropuerto EDI), return en aeropuerto EDI día 23. ~$80/día con Hertz/Europcar/Enterprise. Día 20 sin coche: Duddingston y Craigmillar se hacen caminando/bus.",
      },
      {
        label: "Gasolina + parking",
        amount: 120,
        detail: "~1,500 km en total. Diesel ~£1.65/L. Sin parking nocturno en Edimburgo (coche se recoge el día 21). Parking gratis en hotel Fort William y Portree.",
      },
      {
        label: "Transporte público (tram + buses)",
        amount: 80,
        detail: "Tram aeropuerto Edimburgo → centro x2 personas ida = $15. Buses dentro de Edimburgo días 18-20 (~$25). Buffer taxis/Uber ocasionales.",
      },
      {
        label: "Comida y bebidas",
        amount: 1100,
        detail: "7 días × ~$157/día. Edimburgo es más caro que Irlanda. Incluye pub food (Sheep Heid Inn), restaurantes de gama media-alta (The Witchery), drinks en pubs históricos (Banshee, Frankenstein) y Lounge 33 en Leith y mariscos en Skye.",
      },
      {
        label: "Actividades y entradas",
        amount: 475,
        detail: "Precios oct 2026: Edinburgh Castle (£23.50×2), Islander workshop bolsa Harris Tweed (~£85×2), Palace of Holyroodhouse (£22×2), Magic Museum (~£10×2), Craigmillar Castle (£7.50×2), Eilean Donan Castle (~£13×2), Urquhart Castle/Loch Ness (£14×2), Old Man of Storr parking (£4), Glenfinnan parking (£5), Plodda Falls (gratis). Portrait Gallery y Tron Kirk son gratis.",
      },
    ],
  },
];

// Calculate total for a country in a specific currency
export function getCountryTotal(countryId: string): number {
  const budget = budgets.find((b) => b.countryId === countryId);
  if (!budget) return 0;
  return budget.items.reduce((sum, item) => sum + item.amount, 0);
}

// Total grand total in USD
export function getGrandTotal(): number {
  return budgets.reduce((sum, b) => sum + b.items.reduce((s, i) => s + i.amount, 0), 0);
}

// Format amount for display
export function formatAmount(amountUSD: number, currency: Currency): string {
  const converted = amountUSD * exchangeRates[currency];
  const symbol = currencySymbols[currency];
  const label = currencyLabels[currency];

  // For MXN (large numbers), no decimals; for others, no decimals as well for cleaner UI
  const formatted = converted.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${symbol}${formatted} ${label}`;
}
