// Presupuesto para 2 personas, nivel cómodo, salida desde México, mitades de mayo 2026
// Hoteles nivel 3-3.5 estrellas. Temporada baja-media (mayo), antes del pico de verano.
// Tipos de cambio base (mayo 2026): 1 USD ≈ 17.20 MXN, 1 EUR ≈ 18.70 MXN, 1 GBP ≈ 21.80 MXN
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
        detail: "2 personas, multi-city: CDMX→LHR, EDI→CDMX. British Airways, KLM/Air France o Aeroméxico. Reservar 2-3 meses antes.",
      },
      {
        label: "Hospedaje (5 noches en Londres, hotel 3.5★)",
        amount: 950,
        detail: "Hoteles 3.5★ en zonas centrales o bien conectadas (Bayswater, Paddington, South Kensington, Kings Cross) ~$190/noche en mayo. Ejemplos: Premier Inn, Hub by Premier Inn, Travelodge Plus.",
      },
      {
        label: "Transporte público (Oyster + day trips)",
        amount: 280,
        detail: "Oyster card Londres ~$50/persona/5 días + trenes ida/vuelta para Windsor, Stonehenge, Castle Combe (~$50 c/u por trip).",
      },
      {
        label: "Day trips guiados",
        amount: 320,
        detail: "Stonehenge + Bath tour ~$120/persona, opcional Oxford/Cotswolds ~$90/persona. Más barato self-drive pero requiere coche.",
      },
      {
        label: "Comida y bebidas",
        amount: 1100,
        detail: "5 días × ~$220/día para 2. Londres es la ciudad más cara del viaje. Mix de pubs, gastropubs y un restaurante especial.",
      },
      {
        label: "Actividades y entradas",
        amount: 520,
        detail: "London Eye (£35×2), Westminster Abbey (£30×2), Tower of London (£35×2), Warner Bros Studio (£55×2), Windsor Castle (£30×2), Stonehenge (£25×2), British Museum (gratis), Royal Botanic Gardens (£15×2).",
      },
      {
        label: "Transporte Londres → Dublín",
        amount: 140,
        detail: "Vuelo Ryanair/EasyJet/Aer Lingus LHR/STN → DUB, ~1h, ~$70/persona reservando con anticipación. Alternativa: tren a Holyhead + ferry Stena Line a Dublin Port (~8-10h door-to-door, ~$220-300 los 2).",
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
        label: "Hospedaje (6 noches, hoteles 3-3.5★)",
        amount: 900,
        detail: "Edimburgo (3 noches) $170/noche, Inverness o Highlands (2) $125, Glasgow (1) $115. Promedio $150/noche en mayo, sin el sobreprecio del Festival de agosto.",
      },
      {
        label: "Transporte público (trenes + buses)",
        amount: 320,
        detail: "ScotRail Highlands pass + boletos individuales Edimburgo-Inverness, Inverness-Glasgow, etc. ~$160 por persona.",
      },
      {
        label: "Tours organizados (Highlands, Loch Ness, Skye)",
        amount: 380,
        detail: "Tour día completo Loch Ness/Glencoe ~$90/persona, tour Isle of Skye 2 días ~$200/persona si aplica.",
      },
      {
        label: "Comida y bebidas",
        amount: 950,
        detail: "6 días × ~$158/día. Edimburgo es más caro que Irlanda. Incluye pub food, restaurantes de gama media-alta y whisky tastings.",
      },
      {
        label: "Actividades y entradas",
        amount: 280,
        detail: "Edinburgh Castle (£20×2), Royal Yacht Britannia (£20×2), Holyrood (£20×2), destilería whisky tour (£20×2), Arthur's Seat (gratis), Royal Mile.",
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
