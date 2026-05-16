// Fecha de inicio del viaje (día 1 global). Cambia esto si la fecha del viaje cambia.
export const tripStartDate = new Date("2027-05-17T00:00:00");

// Total de días planeados del viaje completo (~3 semanas).
export const totalTripDays = 22;

export type Location = {
  name: string;
  lat: number;
  lng: number;
  time?: string;
  duration?: string;
  notes?: string;
};

export type Day = {
  number: number;
  title: string;
  narrative: string;
  locations: Location[];
  sleep?: string;
};

export type Country = {
  id: string;
  name: string;
  flag: string;
  subtitle: string;
  description: string;
  days: Day[];
};

export const trip: Country[] = [
  {
    id: "inglaterra",
    name: "Inglaterra",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    subtitle: "Primera etapa · 5 días en Londres",
    description:
      "Punto de entrada al viaje. Base en Londres con day trips a Stonehenge, Windsor, Castle Combe y Oxford. Itinerario detallado por definir.",
    days: [],
  },
  {
    id: "irlanda",
    name: "Irlanda",
    flag: "☘",
    subtitle: "Segunda etapa · 10 días con coche",
    description:
      "Llegada desde Londres (vuelo Ryanair o ferry vía Holyhead). Loop circular desde Dublín por el oeste salvaje, el norte celta y la costa este. Coche rentado del día 8 al día 15.",
    days: [
      {
        number: 6,
        title: "Llegada a Dublín",
        narrative:
          "Llegada desde Londres y aclimatación. Caminata por Temple Bar y el río Liffey. Noche tranquila para arrancar fuerte mañana.",
        sleep: "Dublín centro",
        locations: [
          {
            name: "Dublin Airport",
            lat: 53.4264,
            lng: -6.2499,
            time: "3:00 PM",
            notes: "Vuelo de Londres llega a DUB. Aircoach o taxi al centro (~30 min).",
          },
          {
            name: "Temple Bar District",
            lat: 53.3454742,
            lng: -6.2641937,
            time: "7:00 PM",
            duration: "3h",
            notes: "Cena en pubs como The Brazen Head o The Old Storehouse.",
          },
        ],
      },
      {
        number: 7,
        title: "Dublín a fondo",
        narrative:
          "Día completo en la capital a pie. Cultura, historia y la mejor experiencia de fish & chips.",
        sleep: "Dublín centro",
        locations: [
          {
            name: "Trinity College Dublin",
            lat: 53.3437935,
            lng: -6.2545716,
            time: "9:00 AM",
            duration: "2h",
            notes: "Book of Kells + Long Room. Reservar online con anticipación.",
          },
          {
            name: "Leo Burdock's",
            lat: 53.3432,
            lng: -6.268,
            time: "1:00 PM",
            duration: "45 min",
            notes: "Fish & chips icónico desde 1913. Walk-up, sin mesas.",
          },
          {
            name: "Vintage Tea Tour",
            lat: 53.3457,
            lng: -6.2603,
            time: "2:30 PM",
            duration: "1.5h",
            notes: "Tour en autobús vintage con té y pasteles. Reservar antes.",
          },
          {
            name: "Guinness Storehouse",
            lat: 53.3419,
            lng: -6.2867,
            time: "5:00 PM",
            duration: "2h",
            notes: "Opcional. Tour + Gravity Bar al atardecer.",
          },
        ],
      },
      {
        number: 8,
        title: "Wicklow: cascada, lago y monasterio",
        narrative:
          "Day trip al sur de Dublín con el coche recién rentado. Powerscourt, Avoca, Lough Tay y Glendalough.",
        sleep: "Dublín centro (última noche)",
        locations: [
          {
            name: "Recoger coche en Dublín centro",
            lat: 53.3498,
            lng: -6.2603,
            time: "8:30 AM",
            notes: "Renta en oficina del centro, no en aeropuerto.",
          },
          {
            name: "Powerscourt Waterfall",
            lat: 53.1460771,
            lng: -6.2112376,
            time: "10:00 AM",
            duration: "2h",
            notes: "Cascada más alta de Irlanda. ~1h desde Dublín.",
          },
          {
            name: "Avoca Handweavers (Weavers of Ireland)",
            lat: 52.9866,
            lng: -6.2056,
            time: "12:30 PM",
            duration: "1.5h",
            notes: "Tienda artesanal histórica + café para almuerzo.",
          },
          {
            name: "Lough Tay (Guinness Lake)",
            lat: 53.1547,
            lng: -6.3275,
            time: "2:30 PM",
            duration: "45 min",
            notes: "Mirador desde la R759. Famoso por Vikings.",
          },
          {
            name: "Glendalough",
            lat: 53.0114,
            lng: -6.3271,
            time: "4:00 PM",
            duration: "2h",
            notes: "Ruinas monásticas medievales. Opcional pero recomendado.",
          },
        ],
      },
      {
        number: 9,
        title: "Dublín → Galway vía Connemara",
        narrative:
          "Cruzas Irlanda de este a oeste. Connemara es el highlight visual del día.",
        sleep: "Galway (2 noches)",
        locations: [
          {
            name: "Salida de Dublín",
            lat: 53.3498,
            lng: -6.2603,
            time: "7:30 AM",
            notes: "Sal temprano. ~3h hasta Connemara.",
          },
          {
            name: "Connemara National Park",
            lat: 53.5402214,
            lng: -9.8829805,
            time: "12:30 PM",
            duration: "4h",
            notes: "Diamond Hill Loop (3h) o loop corto (1h).",
          },
          {
            name: "Kylemore Abbey",
            lat: 53.5594,
            lng: -9.8919,
            time: "5:00 PM",
            duration: "30 min",
            notes: "Parada de fotos en el camino de regreso.",
          },
          {
            name: "Galway",
            lat: 53.274001,
            lng: -9.0512662,
            time: "7:30 PM",
            notes: "Cena en Quay Street + pubs con música tradicional.",
          },
        ],
      },
      {
        number: 10,
        title: "Cliffs of Moher + The Burren + Ennis",
        narrative:
          "Loop sur desde Galway. Cliffs of Moher temprano para evitar tour buses.",
        sleep: "Galway",
        locations: [
          {
            name: "Cliffs of Moher",
            lat: 52.9715368,
            lng: -9.4308825,
            time: "10:00 AM",
            duration: "3h",
            notes: "Llega 9-10 AM. Camina hacia O'Brien's Tower.",
          },
          {
            name: "Doolin",
            lat: 53.0153,
            lng: -9.3819,
            time: "1:00 PM",
            duration: "1.5h",
            notes: "Pueblo costero. Almuerzo en Gus O'Connor's Pub.",
          },
          {
            name: "The Burren + Poulnabrone Dolmen",
            lat: 53.0489,
            lng: -9.1325,
            time: "3:00 PM",
            duration: "1.5h",
            notes: "Paisaje cárstico único + dolmen prehistórico.",
          },
          {
            name: "Ennis",
            lat: 52.8438,
            lng: -8.9864,
            time: "5:00 PM",
            duration: "1.5h",
            notes: "Pueblo medieval. Ennis Friary + caminata por el centro.",
          },
          {
            name: "Regreso a Galway",
            lat: 53.274001,
            lng: -9.0512662,
            time: "7:30 PM",
            notes: "Cena y pubs en Galway.",
          },
        ],
      },
      {
        number: 11,
        title: "Galway → Sligo (Gleniff Horseshoe)",
        narrative:
          "Subida hacia el noroeste. Gleniff Horseshoe es una joya poco turística.",
        sleep: "Sligo o Donegal Town",
        locations: [
          {
            name: "Sligo town",
            lat: 54.2766,
            lng: -8.4761,
            time: "12:00 PM",
            duration: "1h",
            notes: "Almuerzo. Pueblo asociado a W.B. Yeats.",
          },
          {
            name: "Gleniff Horseshoe",
            lat: 54.3708664,
            lng: -8.4151193,
            time: "1:30 PM",
            duration: "2.5h",
            notes: "Loop en coche por el valle con paradas para fotos.",
          },
          {
            name: "Drumcliffe (tumba de Yeats)",
            lat: 54.3267,
            lng: -8.4936,
            time: "4:30 PM",
            duration: "30 min",
            notes: "Opcional. 15 min de Sligo. Iglesia + tumba del poeta.",
          },
        ],
      },
      {
        number: 12,
        title: "Sligo → Costa de Antrim (UK)",
        narrative:
          "Cruzas a Irlanda del Norte (UK). Cambias de euros a libras. Día largo pero la Causeway Coast es el highlight del norte.",
        sleep: "Bushmills o Portrush",
        locations: [
          {
            name: "Bushmills",
            lat: 55.2057,
            lng: -6.5217,
            time: "1:00 PM",
            duration: "1h",
            notes: "Almuerzo. Pueblo base para la Causeway Coast.",
          },
          {
            name: "Dunluce Castle",
            lat: 55.2106924,
            lng: -6.5796063,
            time: "2:00 PM",
            duration: "1h",
            notes: "Ruinas dramáticas sobre acantilado.",
          },
          {
            name: "Giant's Causeway",
            lat: 55.2408073,
            lng: -6.5115554,
            time: "3:30 PM",
            duration: "3h",
            notes: "Reservar entrada online. Columnas basálticas legendarias.",
          },
        ],
      },
      {
        number: 13,
        title: "Dark Hedges + Belfast",
        narrative:
          "Mañana fotogénica, tarde de historia en Belfast con Titanic y Black Cab Tour.",
        sleep: "Belfast",
        locations: [
          {
            name: "The Dark Hedges",
            lat: 55.1346929,
            lng: -6.380822,
            time: "8:00 AM",
            duration: "45 min",
            notes: "Ve temprano sin gente. Camino del Game of Thrones.",
          },
          {
            name: "Titanic Museum Belfast",
            lat: 54.6079,
            lng: -5.9106,
            time: "11:00 AM",
            duration: "3h",
            notes: "Museo excelente. Reservar entrada online.",
          },
          {
            name: "Cathedral Quarter",
            lat: 54.6,
            lng: -5.9269,
            time: "3:00 PM",
            duration: "1h",
            notes: "Almuerzo + caminata por el barrio artístico.",
          },
          {
            name: "Black Cab Tour (murales políticos)",
            lat: 54.5973,
            lng: -5.9587,
            time: "4:00 PM",
            duration: "2h",
            notes: "Tour por Falls Road y Shankill. Historia del conflicto.",
          },
        ],
      },
      {
        number: 14,
        title: "Belfast → Dublín (costa este)",
        narrative:
          "Regreso a Dublín por la costa este con parada cultural en Newgrange.",
        sleep: "Dublín",
        locations: [
          {
            name: "Drogheda",
            lat: 53.7156,
            lng: -6.3528,
            time: "12:30 PM",
            duration: "1h",
            notes: "Almuerzo en pueblo medieval. Cruzas de UK a Irlanda.",
          },
          {
            name: "Newgrange / Brú na Bóinne",
            lat: 53.6947,
            lng: -6.4756,
            time: "2:00 PM",
            duration: "3h",
            notes: "Túmulo prehistórico más antiguo que las pirámides. Reservar online.",
          },
          {
            name: "Dublín",
            lat: 53.3498,
            lng: -6.2603,
            time: "6:00 PM",
            notes: "Última noche. Cena de despedida en Temple Bar.",
          },
        ],
      },
      {
        number: 15,
        title: "Dublín → Edimburgo (vuelo)",
        narrative:
          "Día final. Devuelves el coche en el aeropuerto y vuelas a Escocia (~1h con Aer Lingus o Ryanair).",
        locations: [
          {
            name: "Mañana libre en Dublín",
            lat: 53.3498,
            lng: -6.2603,
            time: "10:00 AM",
            duration: "3h",
            notes: "Shopping, museos o relax según horario del vuelo.",
          },
          {
            name: "Dublin Airport",
            lat: 53.4264,
            lng: -6.2499,
            time: "3:00 PM",
            notes: "Devolver coche. Vuelo Aer Lingus/Ryanair a Edimburgo.",
          },
        ],
      },
    ],
  },
  {
    id: "escocia",
    name: "Escocia",
    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    subtitle: "Última etapa · 7 días · Coche rentado para Highlands y Skye",
    description:
      "Base en Edimburgo (4 noches Old Town + 1 cerca aeropuerto), loop por West Highlands (Glencoe, Fort William), Isle of Skye (Portree) y regreso por Loch Ness. Vuelo de regreso a CDMX desde Edimburgo el día 22.",
    days: [
      {
        number: 16,
        title: "Llegada a Edimburgo + Royal Mile",
        narrative:
          "Llegada desde Dublín por la mañana. Caminata por el Royal Mile con vistas al castillo, cena legendaria en The Witchery y nightcap en cocktail bar.",
        sleep: "Edimburgo Old Town",
        locations: [
          {
            name: "Edinburgh Airport",
            lat: 55.9505,
            lng: -3.368,
            time: "11:00 AM",
            notes: "Vuelo de Dublín. Tram Airlink al centro (~30 min, £7.50/persona).",
          },
          {
            name: "Scott Monument",
            lat: 55.9521,
            lng: -3.1929,
            time: "2:30 PM",
            duration: "30 min",
            notes: "Monumento gótico victoriano en Princes Street. Opcional subir 287 escalones para vista panorámica.",
          },
          {
            name: "Waterstones Cafe (West End)",
            lat: 55.9527,
            lng: -3.1936,
            time: "3:15 PM",
            duration: "20 min",
            notes: "Café en la sucursal de Princes Street con la mejor vista al Edinburgh Castle desde el último piso.",
          },
          {
            name: "New College (The Mound)",
            lat: 55.9498,
            lng: -3.1928,
            time: "3:45 PM",
            duration: "15 min",
            notes: "Foto del arco icónico del Mound desde el patio interior con vista al castillo.",
          },
          {
            name: "Tron Kirk",
            lat: 55.9499,
            lng: -3.1882,
            time: "4:00 PM",
            duration: "30 min",
            notes: "Antigua iglesia del Royal Mile (1647), ahora centro cultural y mercado de productores locales.",
          },
          {
            name: "The Witchery by the Castle",
            lat: 55.9494,
            lng: -3.1968,
            time: "7:30 PM",
            duration: "2h",
            notes: "Cena en el restaurante más legendario de Edimburgo, al lado del castillo. RESERVAR 2 meses antes.",
          },
          {
            name: "Lounge 33",
            lat: 55.9485,
            lng: -3.1893,
            time: "10:00 PM",
            duration: "1h",
            notes: "Cocktail bar en Old Town para nightcap. Confirma dirección exacta al reservar.",
          },
        ],
      },
      {
        number: 17,
        title: "Edimburgo a fondo + pub crawl",
        narrative:
          "Día completo de museos, palacios y pubs históricos. Por la noche, crawl temático por los dos pubs más icónicos de la ciudad.",
        sleep: "Edimburgo Old Town",
        locations: [
          {
            name: "Scottish National Portrait Gallery",
            lat: 55.9572,
            lng: -3.1924,
            time: "9:00 AM",
            duration: "2h",
            notes: "Galería gratuita en New Town. Retratos icónicos de la historia escocesa, arquitectura victoriana espectacular.",
          },
          {
            name: "Islander Workshop",
            lat: 55.948,
            lng: -3.191,
            time: "11:30 AM",
            duration: "45 min",
            notes: "Taller artesanal en Edimburgo. Verificar dirección exacta y horario antes de ir.",
          },
          {
            name: "Palace of Holyroodhouse",
            lat: 55.9527,
            lng: -3.1719,
            time: "2:00 PM",
            duration: "1.5h",
            notes: "Residencia oficial del monarca en Escocia, al pie del Royal Mile. Reservar online (£20/persona).",
          },
          {
            name: "Museum of Magic, Fortune-telling & Witchcraft Ltd",
            lat: 55.9436,
            lng: -3.1872,
            time: "3:45 PM",
            duration: "1h",
            notes: "Museo pequeño y curioso. Colección privada de artefactos ocultistas, predicciones y brujería.",
          },
          {
            name: "The Banshee Labyrinth",
            lat: 55.9486,
            lng: -3.1881,
            time: "9:30 PM",
            duration: "1.5h",
            notes: "Pub construido en las South Bridge Vaults del siglo XVIII, considerado el más embrujado de Escocia.",
          },
          {
            name: "Frankenstein Pub",
            lat: 55.9476,
            lng: -3.1908,
            time: "11:00 PM",
            duration: "30 min",
            notes: "Pub temático en George IV Bridge. Show del monstruo a medianoche.",
          },
        ],
      },
      {
        number: 18,
        title: "Duddingston + Craigmillar Castle",
        narrative:
          "Día relajado en las afueras. Recoger coche rentado, visitar el cluster de Duddingston (jardín secreto + pub más antiguo de Escocia) y Craigmillar Castle.",
        sleep: "Edimburgo Old Town",
        locations: [
          {
            name: "Recoger coche rentado",
            lat: 55.95,
            lng: -3.192,
            time: "9:00 AM",
            notes: "Oficina céntrica de Edimburgo. Pedir automático para Highlands. Tener tarjeta de crédito + licencia válida.",
          },
          {
            name: "Dr Neil's Garden",
            lat: 55.9385,
            lng: -3.1497,
            time: "10:15 AM",
            duration: "1h",
            notes: "Jardín secreto al lado de Duddingston Loch. Donación voluntaria. Cherry blossoms en primavera.",
          },
          {
            name: "Craigmillar Castle",
            lat: 55.9275,
            lng: -3.1462,
            time: "11:30 AM",
            duration: "1.5h",
            notes: "Castillo medieval del siglo XIV. Refugio de Mary Queen of Scots. Cierra a las 5:30 PM (£10/persona).",
          },
          {
            name: "The Sheep Heid Inn",
            lat: 55.9417,
            lng: -3.1499,
            time: "1:30 PM",
            duration: "1.5h",
            notes: "Pub más antiguo de Escocia (1360). Almuerzo en el pub o terraza. Skittle alley histórica al fondo.",
          },
          {
            name: "Tarde libre en Edimburgo",
            lat: 55.9499,
            lng: -3.1882,
            time: "4:00 PM",
            notes: "Royal Mile, shopping, café o descanso antes del día épico de Highlands mañana.",
          },
        ],
      },
      {
        number: 19,
        title: "Edimburgo → Glencoe → Fort William",
        narrative:
          "Primera ruta al oeste por las Highlands. Glencoe valley es el primer wow de paisaje escocés, con sus Three Sisters dramáticas.",
        sleep: "Fort William",
        locations: [
          {
            name: "Salida de Edimburgo",
            lat: 55.9533,
            lng: -3.1883,
            time: "8:00 AM",
            notes: "Salir temprano para evitar tráfico de hora pico en M9. ~2.5h hasta Glencoe.",
          },
          {
            name: "Glencoe Valley (Three Sisters)",
            lat: 56.6713,
            lng: -5.005,
            time: "10:30 AM",
            duration: "1.5h",
            notes: "Mirador icónico de los Three Sisters. Paradas múltiples en el valle. Foto obligada.",
          },
          {
            name: "Glencoe Village (lunch)",
            lat: 56.6864,
            lng: -5.1014,
            time: "1:00 PM",
            duration: "1h",
            notes: "Almuerzo en uno de los pubs del pueblo. Pruebas Cullen Skink (sopa local) o haggis.",
          },
          {
            name: "Fort William",
            lat: 56.8198,
            lng: -5.1052,
            time: "2:30 PM",
            notes: "Base para el oeste. Pueblo pequeño con vista al Ben Nevis. West Highland Museum opcional (gratis).",
          },
        ],
      },
      {
        number: 20,
        title: "Glenfinnan + Eilean Donan + Skye",
        narrative:
          "Día épico: viaducto del Hogwarts Express, castillo más fotografiado de Escocia, llegada a Skye con atardecer en Old Man of Storr.",
        sleep: "Portree (Isle of Skye)",
        locations: [
          {
            name: "Glenfinnan Viaduct",
            lat: 56.8714,
            lng: -5.4291,
            time: "8:30 AM",
            duration: "2h",
            notes: "Viaducto del Hogwarts Express. Jacobite Steam Train pasa ~10:45 AM. Verificar horario en jacobitesteamtrain.co.uk.",
          },
          {
            name: "Eilean Donan Castle",
            lat: 57.2741,
            lng: -5.516,
            time: "12:45 PM",
            duration: "1.5h",
            notes: "Castillo más fotografiado de Escocia, en una isla rocosa. Lunch en café al cruzar el puente. £12/persona.",
          },
          {
            name: "Portree (check-in hotel)",
            lat: 57.4127,
            lng: -6.1959,
            time: "3:15 PM",
            duration: "30 min",
            notes: "Pueblo principal de Skye. Casas de colores en el puerto. Reservar hotel 2-3 meses antes.",
          },
          {
            name: "Fairy Glen (Uig)",
            lat: 57.5828,
            lng: -6.3567,
            time: "4:30 PM",
            duration: "45 min",
            notes: "Paisaje de hadas: conos volcánicos y formaciones geológicas. Gratis. Estacionamiento gratuito al lado.",
          },
          {
            name: "Old Man of Storr",
            lat: 57.5067,
            lng: -6.181,
            time: "6:00 PM",
            duration: "2h",
            notes: "Hike legendario al atardecer. Subida 1.5h (3.5km round trip). Vista Trotternish Ridge. Parking £4.",
          },
          {
            name: "Cena en Portree",
            lat: 57.4127,
            lng: -6.1959,
            time: "8:30 PM",
            notes: "Cena tardía en el puerto. Probar mariscos locales (langostinos, vieiras) o haggis.",
          },
        ],
      },
      {
        number: 21,
        title: "Skye → Plodda Falls → Loch Ness → Edimburgo",
        narrative:
          "Día largo de regreso al sur. Plodda Falls escondida en Glen Affric, caza de Nessie en Loch Ness, pasada por Inverness y vuelta a la capital.",
        sleep: "Edimburgo (cerca aeropuerto)",
        locations: [
          {
            name: "Salir de Skye",
            lat: 57.4127,
            lng: -6.1959,
            time: "7:00 AM",
            notes: "Salir temprano. Desayuno para llevar. ~3h hasta Plodda Falls por carreteras angostas A87/A887.",
          },
          {
            name: "Plodda Falls",
            lat: 57.3252,
            lng: -4.8761,
            time: "10:00 AM",
            duration: "45 min",
            notes: "Cascada de 46m en Glen Affric con viewing platform desde arriba. Gratis. Walk de 10 min desde estacionamiento.",
          },
          {
            name: "Loch Ness (Urquhart Castle)",
            lat: 57.3243,
            lng: -4.4422,
            time: "11:30 AM",
            duration: "45 min",
            notes: "Vista del lago y ruinas medievales. Caza de Nessie opcional. £15/persona si entras al castillo, gratis desde lookout.",
          },
          {
            name: "Inverness",
            lat: 57.4778,
            lng: -4.2247,
            time: "1:15 PM",
            duration: "1.5h",
            notes: "Capital de las Highlands. Caminata Old Town + Inverness Castle exterior + lunch en el River Ness.",
          },
          {
            name: "Llegada a Edimburgo",
            lat: 55.9505,
            lng: -3.368,
            time: "6:30 PM",
            notes: "~3.5h manejo por A9. Hotel cerca aeropuerto para fácil acceso al vuelo del día siguiente. Devolver coche aquí.",
          },
        ],
      },
      {
        number: 22,
        title: "Vuelo de regreso a CDMX",
        narrative:
          "Día de transición. Vuelo desde Edimburgo (EDI) a Ciudad de México, con probable layover en Amsterdam (KLM), Londres (BA) o Paris (Air France).",
        locations: [
          {
            name: "Edinburgh Airport",
            lat: 55.9505,
            lng: -3.368,
            time: "8:00 AM",
            notes: "Llegar 3h antes del vuelo. Coche ya devuelto el día anterior. Tax refund VAT en mostrador si aplica.",
          },
        ],
      },
    ],
  },
];
