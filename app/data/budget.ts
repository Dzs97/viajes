// Presupuesto para 2 personas, nivel cómodo, salida desde México, mayo-septiembre 2026
// Tipos de cambio base (mayo 2026): 1 USD ≈ 17.20 MXN, 1 EUR ≈ 18.70 MXN, 1 GBP ≈ 21.80 MXN
// Todos los montos están en USD para fácil conversión.

export type BudgetItem = {
  label: string;
  amount: number; // USD
  detail?: string;
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

// All numbers in USD, for 2 people total, cómodo (4-star hotels, good restaurants)
export const budgets: CountryBudget[] = [
  {
    countryId: "irlanda",
    items: [
      {
        label: "Vuelo redondo CDMX → Dublín (regreso desde Londres)",
        amount: 2600,
        detail: "2 personas, multi-city: CDMX→DUB, LHR→CDMX. Aer Lingus o KLM/Air France. Reservar 2-3 meses antes.",
      },
      {
        label: "Hospedaje (10 noches, hoteles 4★)",
        amount: 2400,
        detail: "Dublín (4 noches) $260/noche, Galway (2) $200/noche, Sligo (1) $180, Bushmills (1) $220, Belfast (1) $230. Promedio $240/noche.",
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
        label: "Hospedaje (6 noches, hoteles 4★)",
        amount: 1500,
        detail: "Edimburgo (3 noches) $280/noche, Inverness o Highlands (2) $220, Glasgow (1) $200. Promedio $250/noche.",
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
      {
        label: "Tren Edimburgo → Londres",
        amount: 220,
        detail: "LNER Azuma, ~4h30, 2 personas en clase estándar. Más barato si se reserva 3 meses antes (~$70 c/u).",
      },
    ],
  },
  {
    countryId: "inglaterra",
    items: [
      {
        label: "Hospedaje (5 noches en Londres, hotel 4★)",
        amount: 1750,
        detail: "Londres es caro. Hoteles 4★ en zonas centrales (Westminster, Covent Garden, South Kensington) $300-380/noche. Promedio $350/noche.",
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
