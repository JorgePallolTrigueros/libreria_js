const fs = require('fs');
const path = require('path');

// Lista de nombres de carpetas (rutaImagenes)
const carpetas = [
  "novela", "comic", "mansion", "fotografo", "peito", "atenea", "ankior", "gato",
  "ucrania", "tiradagitana", "antibulling", "curso2115", "angel", "louis", "tienda",
  "paul", "3corazones", "odie", "chocolate", "noble", "familyangels", "formula",
  "lexmortis", "general", "lirios", "crios", "tomy", "zetsuai", "tapices",
  "Enfrentamiento", "Ildebrando", "ComicAeropuerto", "HoraSeñalada", "Ordenado",
  "Barbarian", "Dave", "Diario", "LasPlayas", "Moustruos", "Plano", "Asalto",
  "Malditoviaje2", "Ascenso", "Jhevis", "Judo", "Peluqueria", "Atico",
  "ServiciodeHabitacion", "ClubdeHalterofilia", "Terror", "FatKidPiscina",
  "Tallerabandonado", "JackyChanvsAlto", "Jackyenelhotel", "Sumo007", "Metro",
  "Instituto", "2007", "Acuario", "Restaurante", "Convecciondeculturismoaleman",
  "Granjeros2", "Divo", "Samoano", "Granjeros1", "Hotelito", "Sala42", "Olimpo1",
  "Olimpo", "MitolologiaNordica", "Mitologiajaponesa", "Sudamerica", "Herculesmito"
];

// Carpeta principal: "imagenes"
const baseDir = path.join(__dirname, 'imagenes');

// Crear carpeta principal si no existe
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

// Crear subcarpetas dentro de "imagenes"
carpetas.forEach(nombre => {
  const ruta = path.join(baseDir, nombre);
  if (!fs.existsSync(ruta)) {
    fs.mkdirSync(ruta);
    console.log(`✔ Carpeta creada: imagenes/${nombre}`);
  } else {
    console.log(`ℹ Ya existe: imagenes/${nombre}`);
  }
});
