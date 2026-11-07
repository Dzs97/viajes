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
    forUser: "Diego",
    notes:
      "~$160 (en oferta se ve en ~$100-140). Para Mariana van las dos opciones de abajo. Versión low — evitar las variantes 'Tech' o 'AX5 Mid' que son boot. Alternativa más barata: AX5 GTX low ($120) si quieren ahorrar y aceptan menos protección de toe cap. ROMPER antes del viaje con mínimo 15-20h de uso previo + 1 hike de 3-4h (Ajusco, Chipinque, Tepoztlán).",
    url: "https://www.adidas.com/us/terrex-skychaser-gore-tex-hiking-shoes",
  },
  {
    name: "Nike Zoom Vomero Roam · Secuoya/Negro/Oliva (HJ4646-301), talla US 10.5",
    brand: "Nike",
    category: "calzado",
    description:
      "Tenis acondicionados para el invierno: acabado repelente al agua y guardabarros de goma. Para ciudad con lluvia (Londres, Dublín, Edimburgo).",
    priceUSD: 190,
    status: "pendiente",
    forUser: "Diego",
    notes: "Talla US 10.5 de hombre. Precio en nike.com EE.UU. (nov 2026): $190 USD; no envía a México, comprarlo allá.",
    url: "https://www.nike.com/us/es/t/tenis-acondicionados-para-el-invierno-para-hombre-nike-zoom-vomero-roam-98VRD2uY/HJ4646-301",
  },
  {
    name: "Opción 1 · Terrex Skychaser GORE-TEX · Core Black/Carbon (IH1093)",
    brand: "Adidas",
    category: "calzado",
    description:
      "Hiking shoe low-top impermeable (GORE-TEX) con suela Continental. Elegir esta u Opción 2.",
    priceUSD: 160,
    status: "pendiente",
    forUser: "pareja",
    notes: "~$160 USD en adidas.com EE.UU. Algunas tiendas listan IH1093 como modelo de hombre: confirmar que la talla elegida sea de mujer (o convertirla) antes de comprar. Romperlos antes del viaje.",
    url: "https://www.adidas.com/us/terrex-skychaser-gore-tex-hiking-shoes/IH1093.html",
  },
  {
    name: "Opción 2 · Terrex Free Hiker SL GORE-TEX · Chalk White/Cloud White/Grey Three (KJ1918)",
    brand: "Adidas",
    category: "calzado",
    description:
      "Hiking shoe de mujer impermeable (GORE-TEX), suela Continental y espuma Dreamstrike más acolchada. Elegir esta u Opción 1.",
    priceUSD: 150,
    status: "pendiente",
    forUser: "pareja",
    notes: "~$150 USD en EE.UU. Es de color claro: se ensucia más con lodo en Skye y Glencoe. Romperlos antes del viaje.",
    url: "https://www.adidas.com/us/terrex-freehiker-sl-gore-tex-hiking-shoes/KJ1918.html?forceSelSize=5",
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

  // ============ ROPA ============
  {
    name: "Torrentshell 3L Rain Jacket",
    brand: "Patagonia",
    category: "ropa",
    description:
      "Chamarra impermeable de 3 capas (H2No), la más recomendada en reseñas 2026. Crítica para Escocia e Irlanda, que llueven casi a diario en mayo. Va sobre Heattech + capa térmica.",
    priceUSD: 380,
    status: "pendiente",
    forUser: "ambos",
    notes:
      "~$190/persona × 2 en EE.UU. (en Liverpool MX $3,999). Comprar en Black Friday (27 nov) o en REI/Backcountry. Garantía Ironclad de Patagonia. Es algo rígida y no tiene bolsillo de pecho. Probarla en la regadera antes del viaje.",
    url: "https://www.patagonia.com/search/?q=torrentshell%203l%20jacket",
  },
  {
    name: "Base layer térmico (Heattech, ya lo tenemos)",
    brand: "Uniqlo Heattech",
    category: "ropa",
    description:
      "Camisetas térmicas para mañanas frías en Highlands y Skye (~7-12°C en mayo). 2 por persona, manga larga, debajo de la capa térmica o la chamarra.",
    status: "comprado",
    forUser: "ambos",
    notes: "Ya los tenemos. Solo si quieren algo que no huela después de varios días: merino (Icebreaker, Smartwool) ~$80+/pieza.",
  },
  {
    name: "Ultra Light Down (capa térmica)",
    brand: "Uniqlo",
    category: "ropa",
    description:
      "Capa intermedia entre el Heattech y la Torrentshell. Se dobla en su propia bolsita, así que va siempre en el daypack. Para mañanas frías, Skye al atardecer y pubs sin mucha calefacción. 1 por persona.",
    priceUSD: 170,
    status: "pendiente",
    forUser: "ambos",
    notes: "~$80-90/persona × 2 (en Black Friday suele bajar). Si prefieren algo que abrigue mojado: Patagonia Nano Puff (~$229) o un fleece ligero.",
  },
  {
    name: "Torrentshell 3L Rain Pants",
    brand: "Patagonia",
    category: "ropa",
    description:
      "Pantalón impermeable de 3 capas que se pone ENCIMA del pantalón normal en días de lluvia fuerte: Old Man of Storr, Glencoe, Cliffs of Moher, Giant's Causeway. Se dobla chico y va en el daypack. 1 por persona.",
    priceUSD: 278,
    status: "pendiente",
    forUser: "ambos",
    notes:
      "~$139/persona × 2 (REI $139, Backcountry $129). Versión hombre (Regular) y mujer. CleverHiker: mejores rain pants (4.9/5). Cierres laterales largos para ponerlos sin quitarse los zapatos. Transpiran poco: quitárselos cuando pare la lluvia. Debajo van los pantalones que ya tienen.",
    url: "https://www.patagonia.com/search/?q=torrentshell%203l%20rain%20pants",
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
      "Para los ~10.5h de ida (AM 7 directo a Londres) y el regreso de ~15h con escala en París. Con noise-cancelling marca diferencia en aviones.",
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
      "VERIFICAR que esté vigente con mínimo 6 meses después del fin del viaje (23 may 2027 + 6 meses = vencimiento ≥ nov 2027). Si vence antes, renovar YA.",
    status: "pendiente",
    forUser: "ambos",
    notes: "Mexicanos NO necesitan visa para UK, Irlanda ni Schengen (estancia <90 días). Solo pasaporte + boleto de regreso + capacidad financiera demostrable. ETIAS (permiso Schengen) se pospuso a 2027: no aplica para la escala en París, pero confirmarlo si deciden salir del aeropuerto.",
  },
  {
    name: "ETA UK (Electronic Travel Authorisation)",
    brand: "—",
    category: "documentos",
    description:
      "Obligatoria para mexicanos (cubre Inglaterra, Escocia e Irlanda del Norte; Irlanda no la pide). £20/persona desde abr 2026 (antes £16), válida 2 años. Tramitar online 1-2 meses antes del viaje.",
    priceUSD: 52,
    status: "pendiente",
    forUser: "ambos",
    notes: "£20×2 = $52. Tramitar en gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta. Verificar requisitos actualizados unos meses antes del viaje.",
    url: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta",
  },
  {
    name: "Seguro de viaje internacional",
    brand: "Allianz / World Nomads / AXA / IATI",
    category: "documentos",
    description:
      "Cobertura mínima: médico €100K+, cancelación vuelo, pérdida equipaje, COVID. Para 23 días, 2 personas, cobertura UK + Irlanda + Francia (escala en París).",
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
      "Para rentar coche en Inglaterra (día 7), Irlanda y Escocia. Licencia mexicana vigente + IDP (Permiso Internacional de Conducir). Como la licencia está en español, varias rentadoras lo piden.",
    priceUSD: 30,
    status: "pendiente",
    forUser: "Diego",
    notes: "En México solo lo expiden la ANA (Asociación Nacional Automovilística) y la AMA (Asociación Mexicana Automovilística); se entrega el mismo día. Requiere licencia vigente con al menos 1 año de antigüedad. Confirmar tarifa con la asociación. Vigencia 1 año. Si Mariana también va a manejar, ella necesita el suyo.",
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

  {
    name: "Tarjeta sin comisión en el extranjero",
    brand: "—",
    category: "documentos",
    description:
      "UK e Irlanda son casi 100% contactless (tube, buses, pubs, mercados). Llevar al menos una tarjeta sin comisión por compras en moneda extranjera para cada uno, más una de respaldo guardada aparte.",
    status: "pendiente",
    forUser: "ambos",
    notes: "Al pagar, elegir siempre cobrar en la moneda local (GBP/EUR), nunca en pesos: la conversión del comercio sale más cara. Avisar al banco del viaje. Efectivo: casi no hace falta, unas £50 y €50 para emergencias.",
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
    notes: "Comprar en farmacias UK al llegar (Boots, Superdrug) — más fácil que traer de México. ~£8/botella. Los midges suelen salir de mediados a finales de mayo según el clima: el 20-22 may en Skye puede haber pocos. Comprarlo allá solo si los ven.",
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
    name: "Packing cubes / bolsas de compresión",
    brand: "Eagle Creek / Decathlon / Amazon Basics",
    category: "misc",
    description:
      "Organizar maleta por tipo de ropa. Crítico para moverse entre 11 hoteles diferentes durante 23 días sin desempacar/empacar caos.",
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
