const obras = [
  {
    "id": "1",
    "autor": "Homero",
    "nombre": "La Ilíada",
    "img": "ima/1749736727562.png",
    "descripcion": "Poema épico que narra la guerra de Troya y la cólera de Aquiles."
  },
  {
    "id": "2",
    "autor": "Homero",
    "nombre": "La Odisea",
    "img": "ima/1749736739226.png",
    "descripcion": "Relato de las aventuras de Odiseo en su regreso a Ítaca tras la guerra de Troya."
  },
  {
    "id": "3",
    "autor": "Homero",
    "nombre": "Himnos homéricos",
    "img": "ima/1749736749594.png",
    "descripcion": "Colección de poemas dedicados a los dioses olímpicos."
  },
  {
    "id": "4",
    "autor": "Homero",
    "nombre": "Batracomiomaquia",
    "img": "ima/1749736019985.png",
    "descripcion": "Poema épico burlesco sobre la guerra entre ranas y ratones."
  },
  {
    "id": "5",
    "autor": "Homero",
    "nombre": "Margites",
    "img": "ima/5.png",
    "descripcion": "Poema satírico sobre un hombre necio."
  },
  {
    "id": "6",
    "autor": "Hesíodo",
    "nombre": "Teogonía",
    "img": "ima/1749735990457.png",
    "descripcion": "Genealogía y origen de los dioses griegos."
  },
  {
    "id": "7",
    "autor": "Hesíodo",
    "nombre": "Los trabajos y los días",
    "img": "ima/1749735971090.png",
    "descripcion": "Poema sobre la vida rural y la justicia divina."
  },
  {
    "id": "8",
    "autor": "Hesíodo",
    "nombre": "El escudo de Heracles",
    "img": "ima/1749735956998.png",
    "descripcion": "Poema épico sobre el escudo de Heracles en combate."
  },
  {
    "id": "9",
    "autor": "Hesíodo",
    "nombre": "Catálogo de mujeres",
    "img": "ima/1749736007713.png",
    "descripcion": "Lista de heroínas míticas y su descendencia."
  },
  {
    "id": "10",
    "autor": "Hesíodo",
    "nombre": "Las grandes Eras",
    "img": "ima/1749736773962.png",
    "descripcion": "Relato de la evolución de la humanidad en cinco edades."
  },
  {
    "id": "11",
    "autor": "Esopo",
    "nombre": "La liebre y la tortuga",
    "img": "ima/1749736827794.png",
    "descripcion": "Fábula sobre la perseverancia frente a la arrogancia."
  },
  {
    "id": "12",
    "autor": "Esopo",
    "nombre": "El lobo y el cordero",
    "img": "ima/1749736395138.png",
    "descripcion": "Fábula sobre la injusticia de los poderosos sobre los débiles."
  },
  {
    "id": "13",
    "autor": "Esopo",
    "nombre": "La cigarra y la hormiga",
    "img": "ima/1749736808090.png",
    "descripcion": "Fábula sobre la importancia del esfuerzo y la previsión."
  },
  {
    "id": "14",
    "autor": "Esopo",
    "nombre": "El león y el ratón",
    "img": "ima/1749736794802.png",
    "descripcion": "Fábula sobre la gratitud y la ayuda mutua."
  },
  {
    "id": "15",
    "autor": "Esopo",
    "nombre": "El pastor mentiroso",
    "img": "ima/1749736841930.png",
    "descripcion": "Fábula sobre la desconfianza provocada por la mentira."
  },
  {
    "id": "16",
    "autor": "Safo",
    "nombre": "Oda a Afrodita",
    "img": "ima/1749736510174.png",
    "descripcion": "Poema en honor a la diosa del amor, Afrodita."
  },
  {
    "id": "17",
    "autor": "Safo",
    "nombre": "Fragmento 31",
    "img": "ima/1749736878185.png",
    "descripcion": "Poema sobre el amor y los celos."
  },
  {
    "id": "18",
    "autor": "Safo",
    "nombre": "Fragmento 94",
    "img": "ima/1749736863985.png",
    "descripcion": "Poema de despedida entre amantes."
  },
  {
    "id": "19",
    "autor": "Safo",
    "nombre": "Poema del amor y la naturaleza",
    "img": "ima/1749736895458.png",
    "descripcion": "Fragmentos sobre la belleza de la naturaleza y el amor."
  },
  {
    "id": "20",
    "autor": "Safo",
    "nombre": "Poemas de las hijas de Lesbos",
    "img": "ima/1749736998050.png",
    "descripcion": "Selección de poemas atribuidos a su círculo poético."
  },
  {
    "id": "21",
    "autor": "Píndaro",
    "nombre": "Odas Olímpicas",
    "img": "ima/1749737090393.png",
    "descripcion": "Poemas en honor a los vencedores de los Juegos Olímpicos."
  },
  {
    "id": "22",
    "autor": "Píndaro",
    "nombre": "Odas Píticas",
    "img": "ima/1749737075274.png",
    "descripcion": "Poemas dedicados a los juegos Píticos en Delfos."
  },
  {
    "id": "23",
    "autor": "Píndaro",
    "nombre": "Odas Nemeas",
    "img": "ima/1749737061033.png",
    "descripcion": "Poemas dedicados a los Juegos Nemeos."
  },
  {
    "id": "24",
    "autor": "Píndaro",
    "nombre": "Odas Ístmicas",
    "img": "ima/1749745740693.png",
    "descripcion": "Poemas en honor a los vencedores de los Juegos Ístmicos."
  },
  {
    "id": "25",
    "autor": "Píndaro",
    "nombre": "Himnos y fragmentos",
    "img": "ima/1749745981233.png",
    "descripcion": "Himnos religiosos y fragmentos de su obra."
  },
  {
    "id": "26",
    "autor": "Esquilo",
    "nombre": "Los persas",
    "img": "ima/1749737124353.png",
    "descripcion": "Drama histórico sobre la derrota persa en Salamina."
  },
  {
    "id": "27",
    "autor": "Esquilo",
    "nombre": "Los siete contra Tebas",
    "img": "ima/1749746243545.png",
    "descripcion": "Tragedia sobre la guerra entre los hijos de Edipo."
  },
  {
    "id": "28",
    "autor": "Esquilo",
    "nombre": "Las suplicantes",
    "img": "ima/1749746035017.png",
    "descripcion": "Tragedia sobre las Danaides que huyen de Egipto."
  },
  {
    "id": "29",
    "autor": "Esquilo",
    "nombre": "Orestíada",
    "img": "ima/1749746829241.png",
    "descripcion": "Trilogía que narra la venganza de Orestes contra su madre Clitemnestra."
  },
  {
    "id": "30",
    "autor": "Esquilo",
    "nombre": "Prometeo encadenado",
    "img": "ima/1749747000433.png",
    "descripcion": "Tragedia sobre el castigo de Prometeo por desafiar a Zeus."
  },
  {
    "id": "31",
    "autor": "Catulo",
    "nombre": "Carmina",
    "img": "ima/1749747177480.png",
    "descripcion": "Colección de poemas líricos, amorosos y satíricos dedicados a Lesbia y otros temas."
  },
  {
    "id": "32",
    "autor": "Catulo",
    "nombre": "Poema 5",
    "img": "ima/1749747185280.png",
    "descripcion": "Famoso poema que expresa el amor apasionado y el paso del tiempo."
  },
  {
    "id": "33",
    "autor": "Catulo",
    "nombre": "Poema 85",
    "img": "ima/1749747307552.png",
    "descripcion": "Odio y amo. Poema breve sobre la contradicción del amor."
  },
  {
    "id": "34",
    "autor": "Catulo",
    "nombre": "Poema 51",
    "img": "ima/1749747501656.png",
    "descripcion": "Inspirado en Safo, describe el efecto del amor en el cuerpo y la mente."
  },
  {
    "id": "35",
    "autor": "Catulo",
    "nombre": "Poema 101",
    "img": "ima/1749747653183.png",
    "descripcion": "Elegía a su hermano fallecido, con la frase célebre *Ave atque vale*."
  },
  {
    "id": "36",
    "autor": "Virgilio",
    "nombre": "La Eneida",
    "img": "ima/1749748146855.png",
    "descripcion": "Poema épico sobre la fundación de Roma por Eneas, héroe troyano."
  },
  {
    "id": "37",
    "autor": "Virgilio",
    "nombre": "Las Bucólicas",
    "img": "ima/1749747979519.png",
    "descripcion": "Poemas pastoriles que exaltan la vida en el campo."
  },
  {
    "id": "38",
    "autor": "Virgilio",
    "nombre": "Las Geórgicas",
    "img": "ima/1749748582783.png",
    "descripcion": "Poema didáctico sobre la agricultura y la vida rural."
  },
  {
    "id": "39",
    "autor": "Virgilio",
    "nombre": "La Moretum",
    "img": "ima/1749748758303.png",
    "descripcion": "Poema menor sobre la preparación de un plato campesino."
  },
  {
    "id": "40",
    "autor": "Virgilio",
    "nombre": "Catalepton",
    "img": "ima/1749749001198.png",
    "descripcion": "Colección de poemas cortos atribuidos a Virgilio."
  },
  {
    "id": "41",
    "autor": "Horacio",
    "nombre": "Odas",
    "img": "ima/1749641391169.webp",
    "descripcion": "Colección de poemas líricos sobre la vida, la naturaleza y la política."
  },
  {
    "id": "42",
    "autor": "Horacio",
    "nombre": "Epístolas",
    "img": "ima/1749641398494.webp",
    "descripcion": "Cartas en verso sobre filosofía y literatura, incluyendo el *Arte poética*."
  },
  {
    "id": "43",
    "autor": "Horacio",
    "nombre": "Sátiras",
    "img": "ima/1749749157182.png",
    "descripcion": "Poemas en tono humorístico y crítico sobre la sociedad romana."
  },
  {
    "id": "44",
    "autor": "Horacio",
    "nombre": "Epodos",
    "img": "ima/1749641533294.webp",
    "descripcion": "Poemas en métrica yámbica con tono mordaz y político."
  },
  {
    "id": "45",
    "autor": "Horacio",
    "nombre": "Carmen Saeculare",
    "img": "ima/1749641433470.webp",
    "descripcion": "Himno compuesto para las celebraciones seculares de Augusto."
  },
  {
    "id": "46",
    "autor": "Ovidio",
    "nombre": "Las Metamorfosis",
    "img": "ima/1749641447158.webp",
    "descripcion": "Poema épico que narra mitos de transformaciones en la mitología clásica."
  },
  {
    "id": "47",
    "autor": "Ovidio",
    "nombre": "Amores",
    "img": "ima/1749641455710.webp",
    "descripcion": "Colección de poemas amorosos de tono elegante y sensual."
  },
  {
    "id": "48",
    "autor": "Ovidio",
    "nombre": "Ars amatoria",
    "img": "ima/1749641490093.webp",
    "descripcion": "Manual en verso sobre el arte de seducir y mantener el amor."
  },
  {
    "id": "49",
    "autor": "Ovidio",
    "nombre": "Heroidas",
    "img": "ima/1749641350310.webp",
    "descripcion": "Cartas en verso escritas por heroínas mitológicas a sus amantes."
  },
  {
    "id": "50",
    "autor": "Ovidio",
    "nombre": "Tristia",
    "img": "ima/1749641505910.webp",
    "descripcion": "Poemas de lamento tras su destierro a Tomis."
  },
  {
    "id": "51",
    "autor": "Séneca el Joven",
    "nombre": "Cartas a Lucilio",
    "img": "ima/1749641158527.webp",
    "descripcion": "Cartas filosóficas sobre la vida, la moral y el estoicismo."
  },
  {
    "id": "52",
    "autor": "Séneca el Joven",
    "nombre": "De la brevedad de la vida",
    "img": "ima/1749641184639.webp",
    "descripcion": "Ensayo filosófico sobre cómo aprovechar el tiempo sabiamente."
  },
  {
    "id": "53",
    "autor": "Séneca el Joven",
    "nombre": "Sobre la ira",
    "img": "ima/1749641191877.webp",
    "descripcion": "Tratado estoico sobre el autocontrol y la ira."
  },
  {
    "id": "54",
    "autor": "Séneca el Joven",
    "nombre": "Medea",
    "img": "ima/1749641203013.webp",
    "descripcion": "Tragedia sobre la historia de la hechicera Medea."
  },
  {
    "id": "55",
    "autor": "Séneca el Joven",
    "nombre": "Thyestes",
    "img": "ima/1749641223989.webp",
    "descripcion": "Tragedia basada en la venganza de Atreo contra su hermano Thyestes."
  },
  {
    "id": "56",
    "autor": "Lucano",
    "nombre": "Farsalia",
    "img": "ima/1749641244350.webp",
    "descripcion": "Poema épico sobre la guerra civil entre César y Pompeyo."
  },
  {
    "id": "57",
    "autor": "Juvenal",
    "nombre": "Sátiras",
    "img": "ima/1749641259698.png",
    "descripcion": "Serie de sátiras que critican la corrupción y los vicios de Roma."
  },
  {
    "id": "58",
    "autor": "Plinio el Joven",
    "nombre": "Cartas",
    "img": "ima/1749641272550.webp",
    "descripcion": "Epístolas sobre política, literatura y la vida cotidiana."
  },
  {
    "id": "59",
    "autor": "Plinio el Joven",
    "nombre": "Cartas a Trajano",
    "img": "ima/1749641285654.webp",
    "descripcion": "Correspondencia con el emperador Trajano sobre administración y justicia."
  },
  {
    "id": "60",
    "autor": "Plinio el Joven",
    "nombre": "Panegírico de Trajano",
    "img": "ima/1749641302438.webp",
    "descripcion": "Elogio al emperador Trajano."
  },
  {
    "id": "61",
    "autor": "Plinio el Joven",
    "nombre": "Descripción de la erupción del Vesubio",
    "img": "ima/1749749744414.png",
    "descripcion": "Carta a Tácito sobre la erupción que destruyó Pompeya."
  },
  {
    "id": "62",
    "autor": "Séneca el Joven",
    "nombre": "Cartas a Lucilio",
    "img": "ima/gata (1).webp",
    "descripcion": "Cartas filosóficas sobre la vida, la moral y el estoicismo."
  },
  {
    "id": "63",
    "autor": "Séneca el Joven",
    "nombre": "De la brevedad de la vida",
    "img": "ima/1749750046150.png",
    "descripcion": "Ensayo filosófico sobre cómo aprovechar el tiempo sabiamente."
  },
  {
    "id": "64",
    "autor": "Séneca el Joven",
    "nombre": "Sobre la ira",
    "img": "ima/gata (3).jpg",
    "descripcion": "Tratado estoico sobre el autocontrol y la ira."
  },
  {
    "id": "65",
    "autor": "Séneca el Joven",
    "nombre": "Medea",
    "img": "ima/agata (1).jfif",
    "descripcion": "Tragedia sobre la historia de la hechicera Medea."
  },
  {
    "id": "66",
    "autor": "Séneca el Joven",
    "nombre": "Thyestes",
    "img": "ima/agata (1).webp",
    "descripcion": "Tragedia basada en la venganza de Atreo contra su hermano Thyestes."
  },
  {
    "id": "67",
    "autor": "Lucano",
    "nombre": "Farsalia",
    "img": "ima/agata (2).webp",
    "descripcion": "Poema épico sobre la guerra civil entre César y Pompeyo."
  },
  {
    "id": "68",
    "autor": "Juvenal",
    "nombre": "Sátiras",
    "img": "ima/agata (3).webp",
    "descripcion": "Serie de sátiras que critican la corrupción y los vicios de Roma."
  },
  {
    "id": "72",
    "autor": "Sófocles",
    "nombre": "Áyax",
    "img": "ima/1749749615086.png",
    "descripcion": "Tragedia sobre el destino del héroe Áyax después de la guerra de Troya."
  },
  {
    "id": "73",
    "autor": "Sófocles",
    "nombre": "Antígona",
    "img": "ima/1749750230894.png",
    "descripcion": "Tragedia que explora el conflicto entre ley divina y humana."
  },
  {
    "id": "74",
    "autor": "Sófocles",
    "nombre": "Edipo en Colono",
    "img": "ima/1749640988870.webp",
    "descripcion": "Última obra de la trilogía tebana, narra los últimos días de Edipo."
  },
  {
    "id": "75",
    "autor": "Sófocles",
    "nombre": "Edipo Rey",
    "img": "ima/1749640997119.webp",
    "descripcion": "Tragedia sobre la búsqueda de identidad y el destino trágico de Edipo."
  },
  {
    "id": "76",
    "autor": "Sófocles",
    "nombre": "Electra",
    "img": "ima/1749556835078.png",
    "descripcion": "Relato del deseo de venganza de Electra y Orestes."
  },
  {
    "id": "77",
    "autor": "Sófocles",
    "nombre": "Filoctetes",
    "img": "ima/1749641082550.webp",
    "descripcion": "Tragedia sobre el abandono y el regreso del arquero Filoctetes."
  },
  {
    "id": "78",
    "autor": "Sófocles",
    "nombre": "Las Traquinias",
    "img": "ima/1749641097646.png",
    "descripcion": "Tragedia sobre la muerte de Heracles provocada por su esposa Deyanira."
  },
  {
    "id": "79",
    "autor": "Eurípides",
    "nombre": "Alcestis",
    "img": "ima/1749641070918.webp",
    "descripcion": "Tragedia con elementos de comedia sobre el sacrificio y la redención."
  },
  {
    "id": "80",
    "autor": "Eurípides",
    "nombre": "Andrómaca",
    "img": "ima/1749641058526.webp",
    "descripcion": "Tragedia centrada en la esclavitud de la esposa de Héctor."
  },
  {
    "id": "81",
    "autor": "Eurípides",
    "nombre": "Cíclope",
    "img": "ima/1749641126822.webp",
    "descripcion": "Único drama satírico completo conservado."
  },
  {
    "id": "82",
    "autor": "Eurípides",
    "nombre": "Electra",
    "img": "ima/1749641029646.webp",
    "descripcion": "Otra versión del mito de Electra y Orestes."
  },
  {
    "id": "83",
    "autor": "Eurípides",
    "nombre": "Orestes",
    "img": "ima/1749641010494.webp",
    "descripcion": "Tragedia sobre las consecuencias del matricidio de Orestes."
  },
  {
    "id": "84",
    "autor": "Eurípides",
    "nombre": "Hécuba",
    "img": "ima/1749640756071.webp",
    "descripcion": "Tragedia sobre el sufrimiento de la reina Hécuba tras la guerra."
  },
  {
    "id": "85",
    "autor": "Eurípides",
    "nombre": "Helena",
    "img": "ima/1749640764479.webp",
    "descripcion": "Versión alternativa del mito de Helena de Troya."
  },
  {
    "id": "86",
    "autor": "Eurípides",
    "nombre": "Heracleidae",
    "img": "ima/1749640785727.webp",
    "descripcion": "Defensa de los hijos de Heracles."
  },
  {
    "id": "87",
    "autor": "Eurípides",
    "nombre": "Heracles",
    "img": "ima/1749640774375.webp",
    "descripcion": "Tragedia sobre el colapso mental de Heracles."
  },
  {
    "id": "88",
    "autor": "Eurípides",
    "nombre": "Hipólito",
    "img": "ima/1749640921807.webp",
    "descripcion": "Tragedia sobre el deseo y la castidad."
  },
  {
    "id": "89",
    "autor": "Eurípides",
    "nombre": "Ifigenia en Áulide",
    "img": "ima/1749640796311.webp",
    "descripcion": "Sacrificio de Ifigenia antes de partir a Troya."
  },
  {
    "id": "90",
    "autor": "Eurípides",
    "nombre": "Ifigenia en Tauris",
    "img": "ima/1749640814327.webp",
    "descripcion": "Relato posterior sobre la sacerdotisa en tierra extranjera."
  },
  {
    "id": "91",
    "autor": "Eurípides",
    "nombre": "Ion",
    "img": "ima/1749640912118.webp",
    "descripcion": "Mito de nacimiento secreto y destino."
  },
  {
    "id": "92",
    "autor": "Eurípides",
    "nombre": "Las bacantes",
    "img": "ima/1749640825958.webp",
    "descripcion": "Tragedia sobre el poder de Dionisio."
  },
  {
    "id": "93",
    "autor": "Eurípides",
    "nombre": "Las Mujeres Fenicias",
    "img": "ima/1749640839046.webp",
    "descripcion": "Historia de los hijos de Edipo en guerra."
  },
  {
    "id": "94",
    "autor": "Eurípides",
    "nombre": "Las suplicantes",
    "img": "ima/1749640565239.webp",
    "descripcion": "Relato de madres que reclaman los cuerpos de sus hijos."
  },
  {
    "id": "95",
    "autor": "Eurípides",
    "nombre": "Las Troyanas",
    "img": "ima/1749640579399.webp",
    "descripcion": "Tragedia sobre el destino de las mujeres de Troya tras la guerra."
  },
  {
    "id": "96",
    "autor": "Aristófanes",
    "nombre": "Ecclesiazusae",
    "img": "ima/1749640710550.webp",
    "descripcion": "Sátira sobre el gobierno de mujeres."
  },
  {
    "id": "97",
    "autor": "Aristófanes",
    "nombre": "La paz",
    "img": "ima/1749640728718.webp",
    "descripcion": "Comedia que celebra la paz."
  },
  {
    "id": "98",
    "autor": "Aristófanes",
    "nombre": "Las avispas",
    "img": "ima/1749640594559.webp",
    "descripcion": "Crítica del sistema judicial ateniense."
  },
  {
    "id": "99",
    "autor": "Aristófanes",
    "nombre": "Las nubes",
    "img": "ima/1749640609679.webp",
    "descripcion": "Crítica a Sócrates y la educación."
  },
  {
    "id": "100",
    "autor": "Aristófanes",
    "nombre": "Las ranas",
    "img": "ima/1749640617958.webp",
    "descripcion": "Comedia sobre el viaje al Hades para rescatar a un poeta."
  },
  {
    "id": "101",
    "autor": "Aristófanes",
    "nombre": "Los Acarnios",
    "img": "ima/1749640685863.webp",
    "descripcion": "Comedia sobre la paz individual en medio de la guerra."
  },
  {
    "id": "102",
    "autor": "Aristófanes",
    "nombre": "Lisístrata",
    "img": "ima/1749640631943.webp",
    "descripcion": "Comedia donde mujeres se niegan a mantener relaciones para lograr la paz."
  },
  {
    "id": "103",
    "autor": "Aristófanes",
    "nombre": "Los Caballeros",
    "img": "ima/1749640652082.png",
    "descripcion": "Sátira política contra Cleón."
  },
  {
    "id": "104",
    "autor": "Aristófanes",
    "nombre": "Los pájaros",
    "img": "ima/1749750619053.png",
    "descripcion": "Creación de una ciudad utópica en el cielo."
  },
  {
    "id": "105",
    "autor": "Aristófanes",
    "nombre": "Plutus (Riqueza)",
    "img": "ima/1749641689269.webp",
    "descripcion": "Comedia sobre el dios de la riqueza."
  },
  {
    "id": "106",
    "autor": "Aristófanes",
    "nombre": "Thesmophoriazusae",
    "img": "ima/1749750404838.png",
    "descripcion": "Parodia de los misterios femeninos."
  },
  {
    "id": "107",
    "autor": "Menandro",
    "nombre": "Dyskolos",
    "img": "ima/1749641642758.png",
    "descripcion": "Comedia sobre un viejo gruñón y el amor joven."
  },
  {
    "id": "108",
    "autor": "Apolonio de Rodas",
    "nombre": "La Argonáutica",
    "img": "ima/1749641605806.webp",
    "descripcion": "Poema épico sobre Jasón y los Argonautas."
  }
];

module.exports = { obras };