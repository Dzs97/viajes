// Items básicos para llevar / comprar antes del viaje.
// Agrupados por categoría. Editar libremente.

export type BasicStatus = "pendiente" | "comprado" | "empacado" | "opcional";

export type BasicItem = {
  name: string;
  brand?: string;
  category: string; // debe matchear con basicsCategories[].id
  description: string;
  priceUSD?: number;
  status?: BasicStatus; // default: pendiente
  url?: string;
  notes?: string;
  forUser?: "Diego" | "pareja" | "ambos";
};

export const basicsCategories = [
  { id: "calzado", label: "Calzado", icon: "🥾" },
  { id: "ropa", label: "Ropa", icon: "🧥" },
  { id: "electronica", label: "Electrónica", icon: "🔌" },
  { id: "documentos", label: "Documentos", icon: "📄" },
  { id: "salud", label: "Salud y farmacia", icon: "💊" },
  { id: "misc", label: "Misc", icon: "🎒" },
] as const;

export const basics: BasicItem[] = [
  // ============ CALZADO ============
  {
    name: "Terrex Skychaser GTX",
    brand: "Adidas",
    category: "calzado",
    description:
      "Hiking shoes low-top con membrana GoreTex (waterproof) + outsole Continental rubber. Para Old Man of Storr en Skye, Connemara, Glencoe, Cliffs of Moher y Giant's Causeway. También sirven para días lluviosos en ciudad.",
    priceUSD: 160,
    status: "pendiente",
    forUser: "ambos",
    notes:
      "Comprar 2 pares (uno para cada uno). Versión low ($160) — evitar las variantes 'Tech' o 'AX5 Mid' que son boot. Alternativa más barata: AX5 GTX low ($120) si quieren ahorrar y aceptan menos protección de toe cap. ROMPER antes del viaje con mínimo 15-20h de uso previo + 1 hike de 3-4h (Ajusco, Chipinque, Tepoztlán).",
    url: "https://www.adidas.com/us/terrex-skychaser-gore-tex-hiking-shoes",
  },
  {
    name: "On Cloud (ya los tenemos)",
    brand: "On",
    category: "calzado",
    description:
      "Tenis de ciudad para los 22 días no-hike. Caminar Londres, Edimburgo, Dublín, restaurantes casuales, día a día.",
    status: "empacado",
    forUser: "ambos",
    notes:
      "Aplicar spray waterproofing (Crep Protect ~$15) antes del viaje. Repele agua 2-3 semanas — útil para lluvia ligera de Londres.",
  },
  {
    name: "Calceta merino wool",
    brand: "Darn Tough / Smartwool / Icebreaker",
    category: "calzado",
    description:
      "4-6 pares por persona. Para hiking shoes y días de mucho caminar. Merino no se moja rápido, seca en 4-6h, no apesta.",
    priceUSD: 20,
    status: "pendiente",
    forUser: "ambos",
    notes: "~$20/par. 8 pares en total los dos = $160. Importante para el hike de Storr (calceta gruesa) y días largos.",
  },

  // ============ ROPA ============
  // Agregar items aquí: chamarra impermeable, capas térmicas, etc.

  // ============ ELECTRÓNICA ============
  // Adaptador UK Type G, power bank, cable USB-C, etc.

  // ============ DOCUMENTOS ============
  // Pasaporte vigente, ETA UK (cuando aplique), seguro de viaje, etc.

  // ============ SALUD ============
  // Botiquín básico, Advil, antihistamínicos, etc.

  // ============ MISC ============
  // Daypack, botella reusable, candado TSA, etc.
];

export function groupByCategory(items: BasicItem[]) {
  const groups: Record<string, BasicItem[]> = {};
  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  }
  return groups;
}

export function totalCostUSD(items: BasicItem[]): number {
  return items.reduce((sum, item) => sum + (item.priceUSD ?? 0), 0);
}
