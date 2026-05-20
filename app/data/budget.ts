// Presupuesto para 2 personas, nivel cómodo, salida desde México, mitades de mayo 2027
// Hoteles nivel 3-3.5 estrellas. Temporada baja-media (mayo), antes del pico de verano.
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
        amount: 2600,
        detail: "2 personas, multi-city: CDMX→LHR, EDI→CDMX. British Airways directo, AeroMéxico, KLM o Air France con conexión. Reservar 2-3 meses antes. Verificar maletas documentadas incluidas (algunas aerolíneas las cobran aparte en internacional).",
      },
      {
        label: "Hospedaje Londres (6 noches, hoteles 3-3.5★ centro)",
        amount: 1200,
        detail: "Promedio $200/noche en mayo (temporada media). Zonas recomendadas con tube zona 1-2: Bayswater, Bloomsbury, King's Cross, South Kensington. Cadenas: Premier Inn Hub Kings Cross (~£140), Travelodge Plus Bayswater (~£150), Hilton Garden Inn London City (~£180), ibis Styles. Reservar 2-3 meses antes.",
      },
      {
        label: "7-Day Travelcard zonas 1-6 (2 personas)",
        amount: 165,
        detail: "£65/persona × 2 = £130 ≈ $165. Cubre tube + bus + Overground + DLR durante 7 días. Alternativa: contactless/Oyster con cap diario (~£15/día zonas 1-2). Travelcard sale igual o más barato si harán 6+ viajes diarios.",
      },
      {
        label: "Tren ida-vuelta Paddington → Windsor (día 7)",
        amount: 30,
        detail: "GWR off-peak return 2 personas ~£24-30. 38 min cada lado. Compra online en gwr.com con anticipación para tarifas Advance más baratas.",
      },
      {
        label: "Tour día Wiltshire (Stonehenge + Bath + Castle Combe)",
        amount: 220,
        detail: "Tour organizado de día completo desde Londres con bus + guía + entradas a Stonehenge. ~$110/persona × 2. Operadores: Golden Tours, Premium Tours, Evan Evans. Recoge en hotel central o Victoria Coach. 10-12h. Alternativa self-drive con renta de auto 1 día ~$130 total.",
      },
      {
        label: "Vuelo Londres (LHR/STN) → Dublín (DUB)",
        amount: 140,
        detail: "Ryanair, EasyJet o Aer Lingus, ~1h vuelo, ~$70/persona reservando con 2-3 meses anticipación. Alternativa: ferry Holyhead-Dublin (~$220-300 los 2, 8-10h door-to-door, más experiencia).",
      },
      {
        label: "Entradas atracciones pagadas",
        amount: 510,
        detail: "Westminster Abbey £29×2=$80, Tower of London £35×2=$90, St Paul's Cathedral £21×2=$50, Shakespeare's Globe tour £22×2=$55, Painted Hall Greenwich £15×2=$40, Royal Observatory Greenwich £18×2=$45, Windsor Castle £30×2=$80, Kew Gardens £22×2=$55. Reservar online para evitar colas. GRATIS: British Museum, National Gallery, Tate Modern, Sir John Soane's Museum, Sky Garden (reservar), Barbican Conservatory (sun), Queen's House Greenwich, St James's Park, Hill Garden Pergola, Holly Village, Cambio de Guardia Buckingham.",
      },
      {
        label: "Comida y bebidas (6 días)",
        amount: 1280,
        detail: "6 días × ~$213/día para 2. Mix: desayuno casual/hotel ($30), lunch pub o mercado ($35), cena mid-range ($90-100), 2-3 pints/día ($25). Highlights: cena Sherlock Holmes Pub día 3, curry Brick Lane día 2 dom, dinner Borough Market area día 5, pub Hampstead día 6. Una cena especial opcional: The Ivy Market Grill ($120 los 2).",
      },
      {
        label: "Teatro West End (opcional)",
        amount: 80,
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
        amount: 380,
        detail: "Book of Kells (€25×2), Cliffs of Moher (€10×2), Giant's Causeway (£15×2), Titanic Museum (£25×2), Vintage Tea Tour (€50×2), Powerscourt (€10×2), Newgrange (€18×2), Black Cab Tour (£40×2).",
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
        label: "Coche rentado (4 días)",
        amount: 320,
        detail: "Automático con seguro completo. Pickup en oficina centro Edimburgo día 18, return en aeropuerto EDI día 21. ~$80/día con Hertz/Europcar/Enterprise.",
      },
      {
        label: "Gasolina + parking",
        amount: 145,
        detail: "~1,500 km en total. Diesel ~£1.65/L. Parking 1 noche en Edimburgo céntrico (~£20) + parking gratis en hotel Fort William y Portree.",
      },
      {
        label: "Transporte público (tram + buses)",
        amount: 80,
        detail: "Tram aeropuerto Edimburgo → centro x2 personas ida = $15. Buses dentro de Edimburgo días 16-17 (~$25). Buffer taxis/Uber ocasionales.",
      },
      {
        label: "Comida y bebidas",
        amount: 1100,
        detail: "7 días × ~$157/día. Edimburgo es más caro que Irlanda. Incluye pub food (Sheep Heid Inn), restaurantes de gama media-alta (The Witchery), drinks en pubs históricos (Banshee, Frankenstein, Lounge 33) y mariscos en Skye.",
      },
      {
        label: "Actividades y entradas",
        amount: 250,
        detail: "Palace of Holyroodhouse (£20×2), Magic Museum (£10×2), Craigmillar Castle (£10×2), Eilean Donan Castle (£12×2), Urquhart Castle/Loch Ness (£15×2), Old Man of Storr parking (£4), Glenfinnan parking (£5), Plodda Falls (gratis). Portrait Gallery y Tron Kirk son gratis.",
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
