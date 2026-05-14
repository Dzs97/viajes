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
    subtitle: "Última etapa · 6 días · Vuelo de regreso desde Edimburgo",
    description:
      "Llegada vía Edimburgo desde Dublín. Itinerario por definir. Tren entre ciudades principales, tours organizados para Highlands remotas. Vuelo de regreso a CDMX desde Edimburgo.",
    days: [],
  },
];
