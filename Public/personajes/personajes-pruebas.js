
var PERSONAJES = [
  {
    "id_Personaje": 1,
    "Nombre": "Julia Salazar",
    "url_imagen": "/ima/Pruebas/1749639741772.png",
    "texto": "Julia de 89 años, es la matriarca de la familia. Se encuentra en las primeras fases de demencia, pero aún tiene días de lucidez en los que disfruta de la compañía de sus seres queridos. Su memoria a corto plazo comienza a fallar, pero sus recuerdos de infancia y juventud siguen vivos.",
    "etiqueta": [],
    "momentos_estelares": "Recuerda cómo conoció a su difunto esposo en un baile en el pueblo y siempre le gusta compartir esa historia.",
    "relaciones": [
      {
        "id_personaje": 1,
        "id_personaje_relacionado": 2,
        "Tipo_de_relacion": "Padre"
      },
      {
        "id_personaje": 1,
        "id_personaje_relacionado": 3,
        "Tipo_de_relacion": "Madre"
      },
      {
        "id_personaje": 1,
        "id_personaje_relacionado": 6,
        "Tipo_de_relacion": "Tío"
      },
      {
        "id_personaje": 1,
        "id_personaje_relacionado": 7,
        "Tipo_de_relacion": "Tío"
      },
      {
        "id_personaje": 1,
        "id_personaje_relacionado": 10,
        "Tipo_de_relacion": "Hijo"
      }
    ],
    "notas": [
      {
        "id_nota": 1,
        "texto_nota": "swdvea"
      },
      {
        "id_nota": 2,
        "texto_nota": "advgfadfg"
      }
    ]
  },
  {
    "id_Personaje": 2,
    "Nombre": "Ricardo Salazar",
    "url_imagen": "/ima/Pruebas/1749639776221.png",
    "texto": "Padre de Matilde, fallecido hace muchos años. Sus fotos y los cuentos que contaba a sus nietos siguen presentes en la familia.",
    "etiqueta": [
      "Familia"
    ],
    "momentos_estelares": "Luchó en la posguerra y enseñó a sus hijos el valor del trabajo duro.",
    "relaciones": [
      {
        "id_personaje": 2,
        "id_personaje_relacionado": 1,
        "Tipo_de_relacion": "Padre"
      }
    ],
    "notas": []
  },
  {
    "id_Personaje": 3,
    "Nombre": "Aurora Martínez",
    "url_imagen": "/ima/Pruebas/1749639851628.png",
    "texto": "Madre de Matilde, conocida por su ternura y su amor por la costura. Matilde aún recuerda cómo le enseñó a tejer de niña.",
    "etiqueta": [
      "Familia"
    ],
    "momentos_estelares": "Cada invierno tejía mantas para toda la familia.",
    "relaciones": [
      {
        "id_personaje": 3,
        "id_personaje_relacionado": 1,
        "Tipo_de_relacion": "Madre"
      }
    ],
    "notas": []
  },
  {
    "id_Personaje": 4,
    "Nombre": "Tomás Salazar",
    "url_imagen": "/ima/Pruebas/1749639886700.png",
    "texto": "Abuelo paterno de Matilde. Siempre decía que la familia era como un árbol: con raíces profundas y ramas que dan sombra y frutos.",
    "etiqueta": [
      "Familia"
    ],
    "momentos_estelares": "Plantó el roble del jardín familiar, símbolo de unión.",
    "relaciones": []
  },
  {
    "id_Personaje": 5,
    "Nombre": "Josefina Díaz",
    "url_imagen": "/ima/Pruebas/1749639923580.png",
    "texto": "Abuela paterna de Matilde, mujer de carácter fuerte y gran corazón. Sus consejos aún son recordados.",
    "etiqueta": [],
    "momentos_estelares": "Era la encargada de organizar las comidas familiares cada domingo.",
    "relaciones": []
  },
  {
    "id_Personaje": 6,
    "Nombre": "Ramón Martínez",
    "url_imagen": "/ima/Pruebas/1749639952589.png",
    "texto": "Abuelo materno de Matilde. Fue un apasionado de la jardinería y le enseñó a Matilde los nombres de las flores.",
    "etiqueta": [],
    "momentos_estelares": "Cultivó un jardín de rosas que aún florece cada primavera.",
    "relaciones": [
      {
        "id_personaje": 6,
        "id_personaje_relacionado": 1,
        "Tipo_de_relacion": "Tío"
      }
    ],
    "notas": []
  },
  {
    "id_Personaje": 7,
    "Nombre": "Elena García",
    "url_imagen": "/ima/Pruebas/1749639982949.png",
    "texto": "Abuela materna de Matilde, cocinera excelente y muy querida por sus nietos. Sus recetas siguen presentes en la familia.",
    "etiqueta": [],
    "momentos_estelares": "Creó un libro de recetas que Matilde guarda como un tesoro.",
    "relaciones": [
      {
        "id_personaje": 7,
        "id_personaje_relacionado": 1,
        "Tipo_de_relacion": "Tío"
      }
    ],
    "notas": []
  },
  {
    "id_Personaje": 8,
    "Nombre": "Luis Salazar",
    "url_imagen": "/ima/Pruebas/1749640006573.png",
    "texto": "Hermano menor de Matilde, de 83 años. Aunque su hermana ya no recuerda algunos detalles, la visita cada semana y comparte fotografías antiguas.",
    "etiqueta": [],
    "momentos_estelares": "Le canta viejas canciones que cantaban de pequeños, ayudándola a reconectar con su pasado.",
    "relaciones": []
  },
  {
    "id_Personaje": 9,
    "Nombre": "Carmen Ortega",
    "url_imagen": "/ima/Pruebas/1749640041040.png",
    "texto": "Cuñada de Matilde, mujer alegre que siempre encuentra la forma de animarla.",
    "etiqueta": [],
    "momentos_estelares": "Organiza las reuniones familiares para que Matilde se sienta acompañada y querida.",
    "relaciones": []
  },
  {
    "id_Personaje": 10,
    "Nombre": "Fernando Ortega",
    "url_imagen": "/ima/Pruebas/1749640071844.png",
    "texto": "Sobrino de Matilde, de 42 años. Músico de corazón, siempre dispuesto a tocar la guitarra en las reuniones familiares para animarla.",
    "etiqueta": [],
    "momentos_estelares": "Compuso una canción para Matilde inspirada en su historia de amor.",
    "relaciones": [
      {
        "id_personaje": 10,
        "id_personaje_relacionado": 1,
        "Tipo_de_relacion": "Hijo"
      }
    ],
    "notas": []
  },
  {
    "id_Personaje": 11,
    "Nombre": "Isabel Ramírez",
    "url_imagen": "/ima/Pruebas/1749640101172.png",
    "texto": "Hija de Matilde, de 60 años, maestra jubilada. Se ha convertido en la cuidadora principal de su madre.",
    "etiqueta": [],
    "momentos_estelares": "Recrea viejas recetas y le muestra fotos para ayudarla a recordar.",
    "relaciones": []
  },
  {
    "id_Personaje": 12,
    "Nombre": "Mario López",
    "url_imagen": "/ima/Pruebas/1749640141124.png",
    "texto": "Yerno de Matilde, atento y servicial. Siempre busca la forma de mantener la memoria de Matilde activa.",
    "etiqueta": [],
    "momentos_estelares": "Le lee en voz alta sus poemas favoritos cada tarde.",
    "relaciones": []
  },
  {
    "id_Personaje": 13,
    "Nombre": "Lucía López",
    "url_imagen": "/ima/Pruebas/1749640188820.png",
    "texto": "Nieta de Matilde, de 18 años, estudiante de arte. Le gusta pasar tiempo pintando con su abuela y conversando sobre su infancia.",
    "etiqueta": [],
    "momentos_estelares": "Ayuda a Matilde a recordar los colores y los nombres de las flores que tanto amaba.",
    "relaciones": []
  },
  {
    "id_Personaje": 14,
    "Nombre": "Ana Salazar",
    "url_imagen": "/ima/Pruebas/1749640226588.png",
    "texto": "Prima de Matilde, vive en otro pueblo pero la visita cada mes.",
    "etiqueta": [],
    "momentos_estelares": "Trae viejas postales de viajes para activar recuerdos de juventud.",
    "relaciones": []
  },
  {
    "id_Personaje": 15,
    "Nombre": "Héctor Salazar",
    "url_imagen": "/ima/Personajes/Hector.png",
    "texto": "Esposo de Ana, muy bromista y atento.",
    "etiqueta": [
      "Esposo de prima"
    ],
    "momentos_estelares": "Cuenta anécdotas de la familia para que Matilde sonría."
  },
  {
    "id_Personaje": 16,
    "Nombre": "Gabriela Salazar",
    "url_imagen": "/ima/Personajes/Gabriela.png",
    "texto": "Hija de Luis y Carmen, prima de Fernando y sobrina de Matilde.",
    "etiqueta": [
      "Sobrina",
      "Prima"
    ],
    "momentos_estelares": "Comparte álbumes de fotos con Matilde para recordar juntas."
  },
  {
    "id_Personaje": 17,
    "Nombre": "Roberto Ramírez",
    "url_imagen": "/ima/Pruebas/1749640255172.png",
    "texto": "Hijo de Ana y Héctor, joven universitario interesado en la historia de la familia.",
    "etiqueta": [],
    "momentos_estelares": "Hace entrevistas para conservar las memorias orales de Matilde.",
    "relaciones": []
  },
  {
    "id_Personaje": 18,
    "Nombre": "Emilia Ramírez",
    "url_imagen": "/ima/Pruebas/1749640301852.png",
    "texto": "Hija menor de Ana y Héctor, entusiasta y siempre dispuesta a ayudar.",
    "etiqueta": [],
    "momentos_estelares": "Ayuda a digitalizar fotos antiguas para que Matilde pueda verlas en la app.",
    "relaciones": []
  }
];

var scenes = [
  {
    "id_scene": 1,
    "nombre": "Cumpleaños de Juan",
    "imagen": "/ima/Pruebas/1749979449012.png",
    "Texto_descriptivo": "Aquí relato el inicio en forma de prólogo.",
    "imagen_url_pais": ""
  },
  {
    "id_scene": 1749979472968,
    "nombre": "dfasg",
    "imagen": "/ima/Pruebas/1749979472959.png",
    "Texto_descriptivo": "sagsadfhb",
    "imagen_url_pais": ""
  }
];




var dia_escena = [
  {
    "id_dia_scene": 1,
    "id_dia": 1,
    "id_scene": 1
  },
  {
    "id_dia_scene": 1745771948686,
    "id_dia": 2,
    "id_scene": 1
  },
  {
    "id_dia_scene": 1745772193357,
    "id_dia": 3,
    "id_scene": 1
  },
  {
    "id_dia_scene": 1745772594093,
    "id_dia": 4,
    "id_scene": 1
  },
  {
    "id_dia_scene": 1745915419592,
    "id_dia": 5,
    "id_scene": 1
  },
  {
    "id_dia_scene": 1746863567433,
    "id_dia": 6,
    "id_scene": 1
  },
  {
    "id_dia_scene": 1746946750531,
    "id_dia": 7,
    "id_scene": 1
  },
  {
    "id_dia_scene": 1746947230737,
    "id_dia": 8,
    "id_scene": 1746466060135
  },
  {
    "id_dia_scene": 1747465505180,
    "id_dia": 9,
    "id_scene": 1746466060135
  },
  {
    "id_dia_scene": 1747465619108,
    "id_dia": 10,
    "id_scene": 1746466060135
  },
  {
    "id_dia_scene": 1747465678483,
    "id_dia": 11,
    "id_scene": 1746466060135
  },
  {
    "id_dia_scene": 1747465923242,
    "id_dia": 12,
    "id_scene": 1746466060135
  },
  {
    "id_dia_scene": 1747638331075,
    "id_dia": 13,
    "id_scene": 1746466060135
  },
  {
    "id_dia_scene": 1747638464902,
    "id_dia": 14,
    "id_scene": 1746466060135
  },
  {
    "id_dia_scene": 1747640829414,
    "id_dia": 15,
    "id_scene": 1746466380312
  },
  {
    "id_dia_scene": 1747640878224,
    "id_dia": 16,
    "id_scene": 1746466380312
  },
  {
    "id_dia_scene": 1748677954894,
    "id_dia": 2,
    "id_scene": 1748677936521
  },
  {
    "id_dia_scene": 1748678018262,
    "id_dia": 4,
    "id_scene": 1748677997154
  },
  {
    "id_dia_scene": 1748678039310,
    "id_dia": 3,
    "id_scene": 1748677997154
  }
];

var dia = [
  {
    "titulo": "Nuestro dormitorio",
    "texto_Lo_que_pasa": "2",
    "Lo_que_quiuero_hablar": "2",
    "desarrollo": "2",
    "Dia": 1,
    "id_mes": 12,
    "id_dia": 1,
    "id_scene": 1
  },
  {
    "texto_Lo_que_pasa": "4rrr",
    "Lo_que_quiuero_hablar": "4rr",
    "desarrollo": "4rr",
    "Dia": 2,
    "id_mes": 1,
    "id_dia": 2,
    "id_scene": 1,
    "titulo": "Mis... Queridos hermanos"
  },
  {
    "texto_Lo_que_pasa": "6",
    "Lo_que_quiuero_hablar": "6",
    "desarrollo": "6",
    "Dia": 3,
    "id_mes": 1,
    "id_dia": 3,
    "id_scene": 1,
    "titulo": "El Pride Olimpico"
  },
  {
    "texto_Lo_que_pasa": "22",
    "Lo_que_quiuero_hablar": "22",
    "desarrollo": "33",
    "Dia": 4,
    "id_mes": 1,
    "id_dia": 4,
    "id_scene": 1,
    "titulo": "Cuanto hemos cambiado"
  },
  {
    "titulo": "Interrogatorio Herculiano",
    "texto_Lo_que_pasa": "34",
    "Lo_que_quiuero_hablar": "34",
    "desarrollo": "34",
    "Dia": 8,
    "id_mes": 5,
    "id_dia": 3,
    "id_scene": 1746466060135
  },
  {
    "texto_Lo_que_pasa": "2233",
    "Lo_que_quiuero_hablar": "2233",
    "desarrollo": "2233",
    "Dia": 1,
    "id_mes": 2,
    "id_dia": 8,
    "id_scene": 1746466060135,
    "titulo": "El heroico cuerpo de policia"
  },
  {
    "titulo": "Un par de crios anabolicos",
    "texto_Lo_que_pasa": "2",
    "Lo_que_quiuero_hablar": "2",
    "desarrollo": "2",
    "Dia": 2,
    "id_mes": 2,
    "id_dia": 9,
    "id_scene": 1746466060135
  },
  {
    "titulo": "Un par de crios anabolicos",
    "texto_Lo_que_pasa": "2",
    "Lo_que_quiuero_hablar": "2",
    "desarrollo": "2",
    "Dia": 3,
    "id_mes": 2,
    "id_dia": 10,
    "id_scene": 1746466060135
  },
  {
    "titulo": "Donde estaran Filotes & la hija de Hades",
    "texto_Lo_que_pasa": "2",
    "Lo_que_quiuero_hablar": "2",
    "desarrollo": "2",
    "Dia": 4,
    "id_mes": 2,
    "id_dia": 11,
    "id_scene": 1746466060135
  },
  {
    "titulo": "El video de seguridad",
    "texto_Lo_que_pasa": "2",
    "Lo_que_quiuero_hablar": "2",
    "desarrollo": "2",
    "Dia": 5,
    "id_mes": 2,
    "id_dia": 12,
    "id_scene": 1746466060135
  },
  {
    "titulo": "Mi miquiavelica esposa",
    "texto_Lo_que_pasa": "2",
    "Lo_que_quiuero_hablar": "2",
    "desarrollo": "2",
    "Dia": 6,
    "id_mes": 2,
    "id_dia": 13,
    "id_scene": 1746466060135
  },
  {
    "titulo": "La cocina hacer puñetas",
    "texto_Lo_que_pasa": "2",
    "Lo_que_quiuero_hablar": "2",
    "desarrollo": "2",
    "Dia": 7,
    "id_mes": 2,
    "id_dia": 14,
    "id_scene": 1746466060135
  },
  {
    "titulo": "La visita de Apolo y Hermes",
    "texto_Lo_que_pasa": "3",
    "Lo_que_quiuero_hablar": "3",
    "desarrollo": "3",
    "Dia": 15,
    "id_mes": 3,
    "id_dia": 15,
    "id_scene": 1746466380312
  },
  {
    "titulo": "El Señorito quiere vernos",
    "texto_Lo_que_pasa": "s",
    "Lo_que_quiuero_hablar": "s",
    "desarrollo": "s",
    "Dia": 16,
    "id_mes": 3,
    "id_dia": 16,
    "id_scene": 1746466380312
  },
  {
    "titulo": "2",
    "texto_Lo_que_pasa": "222",
    "Lo_que_quiuero_hablar": "222",
    "desarrollo": "22222",
    "Dia": 2,
    "id_mes": 2,
    "id_dia": 2,
    "id_scene": 1748677936521
  },
  {
    "titulo": "rthre",
    "texto_Lo_que_pasa": "444",
    "Lo_que_quiuero_hablar": "44",
    "desarrollo": "44",
    "Dia": 2,
    "id_mes": 4,
    "id_dia": 4,
    "id_scene": 1748677997154
  },
  {
    "titulo": "33",
    "texto_Lo_que_pasa": "33",
    "Lo_que_quiuero_hablar": "3",
    "desarrollo": "3",
    "Dia": 3,
    "id_mes": 3,
    "id_dia": 3,
    "id_scene": 1748677997154
  }
];

var mes = [
  {
    "id_mes": 1,
    "nombre": "Enero"
  },
  {
    "id_mes": 2,
    "nombre": "Febrero"
  },
  {
    "id_mes": 3,
    "nombre": "Marzo"
  },
  {
    "id_mes": 4,
    "nombre": "Abril"
  },
  {
    "id_mes": 5,
    "nombre": "Mayo"
  },
  {
    "id_mes": 6,
    "nombre": "Junio"
  },
  {
    "id_mes": 7,
    "nombre": "Julio"
  },
  {
    "id_mes": 8,
    "nombre": "Agosto"
  },
  {
    "id_mes": 9,
    "nombre": "Septiembre"
  },
  {
    "id_mes": 10,
    "nombre": "Octubre"
  },
  {
    "id_mes": 11,
    "nombre": "Noviembre"
  },
  {
    "id_mes": 12,
    "nombre": "Diciembre"
  }
];

var scenes_Personajes = [
  {
    "id_asociacion": 1,
    "id_scene": 1,
    "id_personaje": 10 // Fernando Ortega - Cumpleaños de Juan (podría ser un amigo cercano o primo organizador)
  },
  {
    "id_asociacion": 2,
    "id_scene": 2,
    "id_personaje": 1 // Matilde - Aniversario de boda propio
  },
  {
    "id_asociacion": 3,
    "id_scene": 3,
    "id_personaje": 13 // Lucía López - Graduación
  },
  {
    "id_asociacion": 4,
    "id_scene": 4,
    "id_personaje": 8 // Luis Salazar - Reunión de primos
  },
  {
    "id_asociacion": 5,
    "id_scene": 5,
    "id_personaje": 17 // Roberto Ramírez - Bautizo
  },
  {
    "id_asociacion": 6,
    "id_scene": 6,
    "id_personaje": 16 // Gabriela Salazar - Despedida de soltera
  },
  {
    "id_asociacion": 7,
    "id_scene": 7,
    "id_personaje": 1 // Matilde - Cumpleaños propio
  },
  {
    "id_asociacion": 8,
    "id_scene": 8,
    "id_personaje": 1 // Matilde - Cena de Navidad familiar
  },
  {
    "id_asociacion": 9,
    "id_scene": 9,
    "id_personaje": 3 // Aurora Martínez - Día de la madre
  },
  {
    "id_asociacion": 10,
    "id_scene": 10,
    "id_personaje": 10 // Fernando Ortega - Fiesta de bienvenida (regresa de viaje)
  },
  {
    "id_asociacion": 11,
    "id_scene": 11,
    "id_personaje": 11 // Isabel Ramírez - Fiesta de jubilación
  },
  {
    "id_asociacion": 12,
    "id_scene": 12,
    "id_personaje": 12 // Mario López - Excursión de primavera
  },
  {
    "id_asociacion": 13,
    "id_scene": 13,
    "id_personaje": 10 // Fernando Ortega - Festival de música
  },
  {
    "id_asociacion": 14,
    "id_scene": 14,
    "id_personaje": 1 // Matilde - Fiesta de Año Nuevo
  },
  {
    "id_asociacion": 15,
    "id_scene": 15,
    "id_personaje": 18 // Emilia Ramírez - Carnaval
  }
];

var relacion = [
  // Padres de Matilde
  { id_relacion: 1, id_personaje: 1, Tipo_de_relacion: "Hija", id_personaje_relacionado: 2 },
  { id_relacion: 2, id_personaje: 1, Tipo_de_relacion: "Hija", id_personaje_relacionado: 3 },
  { id_relacion: 3, id_personaje: 2, Tipo_de_relacion: "Padre", id_personaje_relacionado: 1 },
  { id_relacion: 4, id_personaje: 3, Tipo_de_relacion: "Madre", id_personaje_relacionado: 1 },

  // Abuelos paternos
  { id_relacion: 5, id_personaje: 2, Tipo_de_relacion: "Hijo", id_personaje_relacionado: 4 },
  { id_relacion: 6, id_personaje: 2, Tipo_de_relacion: "Hijo", id_personaje_relacionado: 5 },
  { id_relacion: 7, id_personaje: 4, Tipo_de_relacion: "Padre", id_personaje_relacionado: 2 },
  { id_relacion: 8, id_personaje: 5, Tipo_de_relacion: "Madre", id_personaje_relacionado: 2 },

  // Abuelos maternos
  { id_relacion: 9, id_personaje: 3, Tipo_de_relacion: "Hija", id_personaje_relacionado: 6 },
  { id_relacion: 10, id_personaje: 3, Tipo_de_relacion: "Hija", id_personaje_relacionado: 7 },
  { id_relacion: 11, id_personaje: 6, Tipo_de_relacion: "Padre", id_personaje_relacionado: 3 },
  { id_relacion: 12, id_personaje: 7, Tipo_de_relacion: "Madre", id_personaje_relacionado: 3 },

  // Hermano y cuñada
  { id_relacion: 13, id_personaje: 1, Tipo_de_relacion: "Hermana", id_personaje_relacionado: 8 },
  { id_relacion: 14, id_personaje: 8, Tipo_de_relacion: "Hermano", id_personaje_relacionado: 1 },
  { id_relacion: 15, id_personaje: 8, Tipo_de_relacion: "Esposo", id_personaje_relacionado: 9 },
  { id_relacion: 16, id_personaje: 9, Tipo_de_relacion: "Cuñada", id_personaje_relacionado: 1 },
  { id_relacion: 17, id_personaje: 9, Tipo_de_relacion: "Esposa", id_personaje_relacionado: 8 },

  // Sobrinos por parte de hermano
  { id_relacion: 18, id_personaje: 16, Tipo_de_relacion: "Sobrina", id_personaje_relacionado: 1 },
  { id_relacion: 19, id_personaje: 1, Tipo_de_relacion: "Tía", id_personaje_relacionado: 16 },
  { id_relacion: 20, id_personaje: 8, Tipo_de_relacion: "Padre", id_personaje_relacionado: 16 },
  { id_relacion: 21, id_personaje: 9, Tipo_de_relacion: "Madre", id_personaje_relacionado: 16 },

  // Hija, yerno y nieta
  { id_relacion: 22, id_personaje: 1, Tipo_de_relacion: "Madre", id_personaje_relacionado: 11 },
  { id_relacion: 23, id_personaje: 11, Tipo_de_relacion: "Hija", id_personaje_relacionado: 1 },
  { id_relacion: 24, id_personaje: 11, Tipo_de_relacion: "Esposa", id_personaje_relacionado: 12 },
  { id_relacion: 25, id_personaje: 12, Tipo_de_relacion: "Yerno", id_personaje_relacionado: 1 },
  { id_relacion: 26, id_personaje: 12, Tipo_de_relacion: "Esposo", id_personaje_relacionado: 11 },
  { id_relacion: 27, id_personaje: 13, Tipo_de_relacion: "Nieta", id_personaje_relacionado: 1 },
  { id_relacion: 28, id_personaje: 1, Tipo_de_relacion: "Abuela", id_personaje_relacionado: 13 },
  { id_relacion: 29, id_personaje: 11, Tipo_de_relacion: "Madre", id_personaje_relacionado: 13 },
  { id_relacion: 30, id_personaje: 12, Tipo_de_relacion: "Padre", id_personaje_relacionado: 13 },

  // Primos cercanos
  { id_relacion: 31, id_personaje: 14, Tipo_de_relacion: "Prima", id_personaje_relacionado: 1 },
  { id_relacion: 32, id_personaje: 1, Tipo_de_relacion: "Prima", id_personaje_relacionado: 14 },
  { id_relacion: 33, id_personaje: 14, Tipo_de_relacion: "Esposa", id_personaje_relacionado: 15 },
  { id_relacion: 34, id_personaje: 15, Tipo_de_relacion: "Esposo", id_personaje_relacionado: 14 },
  { id_relacion: 35, id_personaje: 15, Tipo_de_relacion: "Primo político", id_personaje_relacionado: 1 },
  { id_relacion: 36, id_personaje: 1, Tipo_de_relacion: "Prima política", id_personaje_relacionado: 15 },

  // Hijos de primos
  { id_relacion: 37, id_personaje: 17, Tipo_de_relacion: "Sobrino segundo", id_personaje_relacionado: 1 },
  { id_relacion: 38, id_personaje: 18, Tipo_de_relacion: "Sobrina segunda", id_personaje_relacionado: 1 },
  { id_relacion: 39, id_personaje: 1, Tipo_de_relacion: "Tía abuela", id_personaje_relacionado: 17 },
  { id_relacion: 40, id_personaje: 1, Tipo_de_relacion: "Tía abuela", id_personaje_relacionado: 18 }
];
