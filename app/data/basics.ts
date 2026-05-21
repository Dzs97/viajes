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
    priceUSD: 160,
    status: "pendiente",
    forUser: "ambos",
    notes: "~$20/par × 8 pares (4 por persona) = $160. Importante para el hike de Storr (calceta gruesa) y días largos.",
  },

  // ============ ROPA ============
  {
    name: "Chamarra impermeable (rain jacket)",
    brand: "Patagonia Torrentshell 3L / Arc'teryx Beta SL / Decathlon",
    category: "ropa",
    description:
      "Crítico. Escocia e Irlanda llueven en mayo casi a diario. Membrana waterproof breathable mínimo 10K mm. Con capucha ajustable. Ligera para empacar.",
    priceUSD: 360,
    status: "pendiente",
    forUser: "ambos",
    notes:
      "$180/persona × 2. Alternativa budget: Decathlon Quechua MH500 (~$50). NO usar windbreaker simple — necesitas waterproof real. Probar antes en regadera o lluvia para verificar.",
  },
  {
    name: "Base layer térmico (merino o sintético)",
    brand: "Uniqlo Heattech / Icebreaker / Smartwool",
    category: "ropa",
    description:
      "Camisetas térmicas para mañanas frías en Highlands y Skye (~8-12°C en mayo). 2 por persona, manga larga, ajustadas debajo de fleece o chamarra.",
    priceUSD: 80,
    status: "pendiente",
    forUser: "ambos",
    notes: "Uniqlo Heattech es la opción budget ($20/pieza). Merino real (Icebreaker, Smartwool) es $80+/pieza pero no apesta y dura años.",
  },
  {
    name: "Fleece / mid-layer",
    brand: "Patagonia / The North Face / Decathlon",
    category: "ropa",
    description:
      "Capa intermedia entre térmico y chamarra. Para mañanas frías y noches en pubs sin calefacción fuerte. 1 por persona.",
    priceUSD: 100,
    status: "pendiente",
    forUser: "ambos",
    notes: "$50/persona × 2. Patagonia Better Sweater es clásico ($139). Alternativas más baratas en Decathlon Quechua o Uniqlo.",
  },
  {
    name: "Pantalones hiking convertibles o impermeables",
    brand: "Patagonia / Decathlon / Columbia",
    category: "ropa",
    description:
      "Pantalones de quick-dry o waterproof para días de Highlands, Skye y caminatas largas en Irlanda. 1 par por persona suficiente.",
    priceUSD: 100,
    status: "pendiente",
    forUser: "ambos",
    notes: "Para uso en hikes. Pantalón de mezclilla NO sirve si llueve — se moja, no seca, te enfría.",
  },
  {
    name: "Camisa decente para cena (The Witchery, Sherlock Holmes Pub)",
    brand: "—",
    category: "ropa",
    description:
      "Una camisa o blusa más arregladita para cenas especiales. The Witchery en Edimburgo no requiere formal pero tampoco hiking-wear. Smart casual.",
    status: "opcional",
    forUser: "ambos",
    notes: "Si ya tienes en clóset, no comprar. Mocasines o sneakers limpios sin logos llamativos para esos días.",
  },
  {
    name: "Gorro + bufanda + guantes ligeros",
    brand: "—",
    category: "ropa",
    description:
      "Mañanas en Skye y Highlands pueden bajar a 5-8°C. Atardecer en Old Man of Storr siempre es frío con viento.",
    priceUSD: 60,
    status: "pendiente",
    forUser: "ambos",
    notes: "$30/persona × 2. Guantes ligeros tipo Uniqlo Heattech sirven, no necesitan ser de ski. Beanie + bufanda merino ideal.",
  },

  // ============ ELECTRÓNICA ============
  {
    name: "Adaptador enchufe UK Type G (3 patas)",
    brand: "—",
    category: "electronica",
    description:
      "UK e Irlanda usan el mismo enchufe Type G (3 patas rectangulares). 2 adaptadores mínimo. Voltaje 230V (compatible con cargadores modernos USB-C / Apple).",
    priceUSD: 20,
    status: "pendiente",
    forUser: "ambos",
    notes:
      "Comprar 2-3 unidades ($8-10 c/u). Alternativa: adaptador universal multi-país (~$25) si harán más viajes. NUNCA usar adaptador barato genérico para hair dryer o plancha (riesgo).",
  },
  {
    name: "Power bank 10000-20000 mAh",
    brand: "Anker PowerCore / Belkin / Xiaomi",
    category: "electronica",
    description:
      "Días largos de caminata con Google Maps, fotos y Spotify drenan la batería. Power bank de mínimo 10K mAh con USB-C PD para cargar rápido el celular.",
    priceUSD: 35,
    status: "pendiente",
    forUser: "ambos",
    notes: "Anker PowerCore 10000 (~$30). Verificar que sea <100Wh (regla TSA / aerolíneas). 20K mAh dura 4-5 cargas de celular pero más pesado.",
  },
  {
    name: "Cables USB-C / Lightning extras",
    brand: "—",
    category: "electronica",
    description:
      "2-3 cables extra para no quedarse sin cargador. Incluir cable USB-C → USB-C, USB-C → Lightning, y un USB-A si tienen accesorios viejos.",
    priceUSD: 30,
    status: "pendiente",
    forUser: "ambos",
    notes: "Cable braided (con malla) dura más en viaje. Anker o ugreen son confiables.",
  },
  {
    name: "Cargador rápido USB-C PD",
    brand: "Anker / Apple",
    category: "electronica",
    description:
      "Cargador de pared con USB-C Power Delivery para cargar celular + power bank simultáneamente. 30-65W suficiente.",
    priceUSD: 40,
    status: "opcional",
    forUser: "ambos",
    notes: "Si ya tienen sus cargadores rápidos de casa, no comprar. Solo si tienen cargadores viejos lentos.",
  },
  {
    name: "Audífonos / earbuds",
    brand: "AirPods Pro / Sony WF-1000XM5 / Bose",
    category: "electronica",
    description:
      "Para los 13h de vuelo CDMX↔Londres. Con noise-cancelling marca diferencia en aviones.",
    status: "opcional",
    forUser: "ambos",
    notes: "Si ya tienen, no comprar. Si planean comprar de todos modos, este es buen momento.",
  },

  // ============ DOCUMENTOS ============
  {
    name: "Pasaporte mexicano vigente",
    brand: "—",
    category: "documentos",
    description:
      "VERIFICAR que esté vigente con mínimo 6 meses después del fin del viaje (6 jun 2027 + 6 meses = vencimiento ≥ dic 2027). Si vence antes, renovar YA.",
    status: "pendiente",
    forUser: "ambos",
    notes: "Mexicanos NO necesitan visa para UK, Irlanda ni Schengen (estancia <90 días). Solo pasaporte + boleto de regreso + capacidad financiera demostrable.",
  },
  {
    name: "ETA UK (Electronic Travel Authorisation)",
    brand: "—",
    category: "documentos",
    description:
      "UK está implementando ETA para no-residentes. Para mayo 2027 ya estará obligatorio. £10/persona, válido 2 años. Tramitar online 1-2 semanas antes del viaje.",
    priceUSD: 25,
    status: "pendiente",
    forUser: "ambos",
    notes: "£10×2 = $25. Tramitar en gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta. Verificar requisitos actualizados unos meses antes del viaje.",
    url: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta",
  },
  {
    name: "Seguro de viaje internacional",
    brand: "Allianz / World Nomads / AXA / IATI",
    category: "documentos",
    description:
      "Cobertura mínima: médico €100K+, cancelación vuelo, pérdida equipaje, COVID. Para 23 días, 2 personas, cobertura UK + Irlanda.",
    priceUSD: 150,
    status: "pendiente",
    forUser: "ambos",
    notes: "$60-150 para 2 personas 23 días. World Nomads explorer plan o IATI Mochilero buenas opciones. Algunas tarjetas de crédito (Amex Platinum, Bancomer Tarjeta Oro) ya tienen seguro incluido — verificar antes de comprar aparte.",
  },
  {
    name: "Licencia de manejo + Permiso Internacional (IDP)",
    brand: "—",
    category: "documentos",
    description:
      "Para rentar coche en Irlanda y Escocia. Licencia mexicana vigente + IDP (Permiso Internacional de Conducir) que se tramita en AAA / SCT. Algunas rentadoras aceptan solo licencia mexicana pero IDP es seguro tener.",
    priceUSD: 30,
    status: "pendiente",
    forUser: "Diego",
    notes: "Solo conductor principal necesita IDP. $25-40 MXN equivalente USD. Trámite en oficinas de SCT o AAA México. Vigencia 1 año.",
  },
  {
    name: "Copias digitales de todo en la nube",
    brand: "—",
    category: "documentos",
    description:
      "Subir a Google Drive / iCloud: pasaporte (foto), reservaciones de hotel, vuelos, tours, número de pólizas de seguro, contactos de emergencia, recetas médicas.",
    status: "pendiente",
    forUser: "ambos",
    notes: "Compartir carpeta entre tu pareja y tú. Backup también en email a uno mismo. Si pierden el celular o pasaporte, recuperación más fácil.",
  },

  // ============ SALUD ============
  {
    name: "Repelente para midges (Smidge)",
    brand: "Smidge / Avon Skin So Soft",
    category: "salud",
    description:
      "CRÍTICO para Escocia (Highlands, Skye) y partes de Irlanda (Connemara). Los midges son mosquitos pequeñísimos que enjambran a partir de mayo. DEET no funciona muy bien — Smidge usa Saltidin y es la marca local recomendada.",
    priceUSD: 15,
    status: "pendiente",
    forUser: "ambos",
    notes: "Comprar en farmacias UK al llegar (Boots, Superdrug) — más fácil que traer de México. ~£8/botella. Aplicar antes de hikes mañana/atardecer especialmente.",
  },
  {
    name: "Botiquín básico",
    brand: "—",
    category: "salud",
    description:
      "Curitas (varios tamaños), gasa, alcohol, vendoletas, micropore, pastillas para ampollas (Compeed), gel para músculos.",
    priceUSD: 30,
    status: "pendiente",
    forUser: "ambos",
    notes: "Compeed Blister es life-saver después del hike de Storr. Comprar 2 cajas.",
  },
  {
    name: "Medicamentos OTC: Advil, Tylenol, Pepto, Imodium, Benadryl",
    brand: "—",
    category: "salud",
    description:
      "Ibuprofeno (Advil) para músculos y dolor de cabeza, Paracetamol (Tylenol) para fiebre, Pepto Bismol o Imodium para diarrea (común con cambio de comida), antihistamínico (Benadryl) para alergias de primavera y picaduras.",
    priceUSD: 25,
    status: "pendiente",
    forUser: "ambos",
    notes: "Comprar marcas que conoces antes del viaje. En UK las marcas son diferentes (Nurofen = Advil, etc.) y puede ser confuso en farmacia.",
  },
  {
    name: "Protector solar SPF 30+",
    brand: "—",
    category: "salud",
    description:
      "Sí, en Reino Unido hay sol. Cliffs of Moher, Skye, Greenwich Park — quemaduras posibles incluso con clima fresco. Travel size 100ml para llevar en cabina.",
    priceUSD: 12,
    status: "pendiente",
    forUser: "ambos",
    notes: "Tamaño 100ml máximo para llevar en cabina (regla TSA + UK).",
  },
  {
    name: "Bálsamo labial + crema hidratante",
    brand: "—",
    category: "salud",
    description:
      "Viento de Skye y aire frío resecan labios y piel. Bálsamo SPF + crema facial básica.",
    priceUSD: 15,
    status: "pendiente",
    forUser: "ambos",
    notes: "Vaseline lip therapy o Carmex.",
  },

  // ============ MISC ============
  {
    name: "Daypack 20-30L",
    brand: "Osprey Daylite Plus / Decathlon Quechua / Patagonia",
    category: "misc",
    description:
      "Mochila ligera para llevar en hikes y excursiones day-trip (Wiltshire, Skye, Highlands). Suficiente para chamarra extra, agua, snacks, cámara.",
    priceUSD: 65,
    status: "pendiente",
    forUser: "ambos",
    notes: "1 por persona ($65 × 2 = $130) o 1 compartida si caminan juntos siempre. Osprey Daylite Plus es el clásico.",
  },
  {
    name: "Botella reusable",
    brand: "Stanley / Hydro Flask / Decathlon",
    category: "misc",
    description:
      "Agua de la llave en UK e Irlanda es potable y deliciosa. Botella térmica para refill durante el día. Ahorra ~$5/día comprando agua.",
    priceUSD: 50,
    status: "pendiente",
    forUser: "ambos",
    notes: "$25 × 2 botellas. Tamaño 500ml-750ml suficiente. Térmica si quieren agua fría/caliente en hikes.",
  },
  {
    name: "AirTag x2-3",
    brand: "Apple",
    category: "misc",
    description:
      "Uno por maleta documentada + uno en daypack. Recuperación de equipaje extraviado en aeropuertos con múltiples conexiones (CDMX→LHR vía AMS o CDG).",
    priceUSD: 90,
    status: "opcional",
    forUser: "ambos",
    notes: "Pack de 4 AirTags $99. Si solo iPhone — para Android no funcionan, ahí Tile o Samsung SmartTag equivalente.",
  },
  {
    name: "Packing cubes / bolsas de compresión",
    brand: "Eagle Creek / Decathlon / Amazon Basics",
    category: "misc",
    description:
      "Organizar maleta por tipo de ropa. Crítico para mover entre 6 hoteles diferentes durante 23 días sin desempacar/empacar caos.",
    priceUSD: 30,
    status: "opcional",
    forUser: "ambos",
    notes: "Set de 4-6 cubes ~$30. Cambia la experiencia de empacar/desempacar.",
  },
  {
    name: "Toalla de microfibra",
    brand: "Decathlon Quechua / PackTowl",
    category: "misc",
    description:
      "Para Skye si caminan cerca de cascadas o tienen lluvia inesperada. Seca rápido, ocupa poco espacio. 1 grande compartida o 2 medianas.",
    priceUSD: 20,
    status: "opcional",
    forUser: "ambos",
    notes: "Travel size L ($15-20). No reemplaza la toalla del hotel pero útil para imprevistos.",
  },
  {
    name: "Candado TSA para maletas",
    brand: "—",
    category: "misc",
    description:
      "Candado certificado TSA (combinación o llave). Si TSA / agentes de aeropuerto necesitan inspeccionar, lo abren con llave maestra sin cortarlo.",
    priceUSD: 15,
    status: "opcional",
    forUser: "ambos",
    notes: "$7-8 por candado, 2 unidades. Para maletas documentadas en vuelos internacionales.",
  },
  {
    name: "Adaptador SIM / eSIM internacional",
    brand: "Airalo / Holafly / Saily",
    category: "misc",
    description:
      "Para datos en UK + Irlanda. eSIM (compatible con iPhone XS+ y Samsung S20+) es lo más fácil — compras en app, activas al aterrizar. Alternativa: SIM física en Three / Vodafone al llegar.",
    priceUSD: 50,
    status: "pendiente",
    forUser: "ambos",
    notes: "$25/persona × 2 para 23 días con ~10GB datos. Airalo Eurolink cubre UK + Irlanda + Schengen con un solo eSIM. Activar el día de salida.",
  },
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
