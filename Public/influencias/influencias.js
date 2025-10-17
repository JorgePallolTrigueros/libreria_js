const data = [
  {
    "id": 1,
    "category": "politica",
    "name": "Emanuel Rodríguez @ Peroncho"
  },
  {
    "id": 2,
    "category": "psicologia",
    "name": "Nicolasa"
  },
  {
    "id": 3,
    "category": "entrevistadores",
    "name": "El Sentido De La Birra con Ricardo Moya"
  },
  {
    "id": 4,
    "category": "entrevistadores",
    "name": "Carne Cruda The Wild Project"
  },
  {
    "id": 5,
    "category": "entrevistadores",
    "name": "WIL pOWER"
  },
  {
    "id": 6,
    "category": "entrevistadores",
    "name": "TAMAYO"
  },
  {
    "id": 7,
    "category": "ia",
    "name": "Equator AI"
  },
  {
    "id": 8,
    "category": "ia",
    "name": "Xavier Mitjana CIENCIA"
  },
  {
    "id": 9,
    "category": "ia",
    "name": "Date un Vlog"
  },
  {
    "id": 10,
    "category": "mitologia",
    "name": "Ensalada de Historias"
  },
  {
    "id": 11,
    "category": "mitologia",
    "name": "Pol Gise"
  },
  {
    "id": 12,
    "category": "psicopsiquis",
    "name": "Mitología@MitologiaHistoria•636"
  },
  {
    "id": 13,
    "category": "psicopsiquis",
    "name": "Relatos Ancestrales"
  },
  {
    "id": 14,
    "category": "psicopsiquis",
    "name": "Mitos & Leyendas Deconstruidos"
  },
  {
    "id": 15,
    "category": "psicopsiquis",
    "name": "HelanyaH (mitologia)"
  },
  {
    "id": 16,
    "category": "psicopsiquis",
    "name": "Bluecinante"
  },
  {
    "id": 17,
    "category": "japon",
    "name": "YASUNOKI1967"
  },
  {
    "id": 18,
    "category": "pensamiento-critico",
    "name": "La gata de Schrödinger"
  },
  {
    "id": 19,
    "category": "pensamiento-critico",
    "name": "Herejes: El Podcast"
  },
  {
    "id": 20,
    "category": "pensamiento-critico",
    "name": "Pero eso es oTra Historia"
  },
  {
    "id": 21,
    "category": "pensamiento-critico",
    "name": "Curiosamente"
  },
  {
    "id": 22,
    "category": "pensamiento-critico",
    "name": "Pablo Salum | LeyAntisectas"
  },
  {
    "id": 23,
    "category": "pensamiento-critico",
    "name": "Sprouts Español"
  },
  {
    "id": 24,
    "category": "music",
    "name": "Les Luthiers"
  },
  {
    "id": 25,
    "category": "music",
    "name": "Miree"
  },
  {
    "id": 26,
    "category": "music",
    "name": "PattyCake Productions"
  },
  {
    "id": 27,
    "category": "music",
    "name": "Pascu y Rodri"
  },
  {
    "id": 28,
    "category": "music",
    "name": "Stromae"
  },
  {
    "id": 29,
    "category": "music",
    "name": "Smart Songs"
  },
  {
    "id": 30,
    "category": "music",
    "name": "Black Gryph0n"
  },
  {
    "id": 31,
    "category": "literatura",
    "name": "Hernán Casciari"
  },
  {
    "id": 32,
    "category": "historia",
    "name": "Investigando la Historia con Carla Díaz"
  },
  {
    "id": 33,
    "category": "historia",
    "name": "PutoMikel"
  },
  {
    "id": 34,
    "category": "historia",
    "name": "Miriam Lyons"
  },
  {
    "id": 35,
    "category": "historia",
    "name": "Ter"
  },
  {
    "id": 36,
    "category": "radicalizacion",
    "name": "David Savedra"
  },
  {
    "id": 37,
    "category": "geopolitica",
    "name": "Combat Veteran News"
  },
  {
    "id": 38,
    "category": "trump",
    "name": "christophertitustv"
  },
  {
    "id": 39,
    "category": "sin-categoria",
    "name": "Adictos a la Filosofía"
  },
  {
    "id": 40,
    "category": "sin-categoria",
    "name": "Leyendas Legendarias"
  },
  {
    "id": 41,
    "category": "sin-categoria",
    "name": "Esquizofrenia_Natural"
  },
  {
    "id": 42,
    "category": "RUSIA - Geopolitica",
    "name": "Crónicas de la estepa rusa"
  },
  {
    "id": 43,
    "category": "sin-categoria",
    "name": "Classical JG"
  },
  {
    "id": 44,
    "category": "Religion",
    "name": "Casa de Deméter - Politeísmo Helênico"
  },
  {
    "id": 45,
    "category": "sin-categoria",
    "name": "Shirley Șerban"
  },
  {
    "id": 46,
    "category": "Religion",
    "name": "AteoDigital"
  },
  {
    "id": 47,
    "category": "Religion",
    "name": "Nuestra Experiencia Atea"
  },
  {
    "id": 48,
    "category": "sin-categoria",
    "name": "WINCASH"
  },
  {
    "id": 49,
    "category": "Religion",
    "name": "Apostata del Islam"
  },
  {
    "id": 50,
    "category": "sin-categoria",
    "name": "AI2Play"
  },
  {
    "id": 51,
    "category": "sin-categoria",
    "name": "Legado Imperial"
  },
  {
    "id": 52,
    "category": "sin-categoria",
    "name": "Arpa Talks"
  },
  {
    "id": 53,
    "category": "sin-categoria",
    "name": "Secretos Imperiales"
  },
  {
    "id": 54,
    "category": "sin-categoria",
    "name": "Katerin Curiosa"
  },
  {
    "id": 55,
    "category": "sin-categoria",
    "name": "El Historiador Nocturno"
  },
  {
    "id": 56,
    "category": "sin-categoria",
    "name": "Raquel de la Morena"
  },
  {
    "id": 57,
    "category": "sin-categoria",
    "name": "Sati Jamon"
  },
  {
    "id": 58,
    "category": "sin-categoria",
    "name": "La Mitoteca del Conde Fabregat"
  },
  {
    "id": 59,
    "category": "sin-categoria",
    "name": "Mansión misteriosa"
  },
  {
    "id": 60,
    "category": "sin-categoria",
    "name": "MitologiaHistoria"
  },
  {
    "id": 61,
    "category": "sin-categoria",
    "name": "El Edén de los Cínicos"
  },
  {
    "id": 62,
    "category": "Religion",
    "name": "Razón o fe"
  },
  {
    "id": 63,
    "category": "sin-categoria",
    "name": "RodoTailhade"
  },
  {
    "id": 64,
    "category": "EEUU - Geopolitica",
    "name": "Rafael Bello Network"
  },
  {
    "id": 1760685467479,
    "name": "Conspiradas",
    "category": "Conspiraciones"
  }
];

module.exports = { data };