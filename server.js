const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const app = express();
const OpenAI = require('openai');

const usuarios = require("./users");

app.use(express.json({ limit: "80mb" }));
app.use(express.static("public"));
app.use('/reportaje/bulling/ma', express.static(path.join(__dirname, 'public', 'ma')));
// Crear carpeta personajes si no existe
//const personajesDir = path.join(__dirname, "public", "personajes");
//if (!fs.existsSync(personajesDir)) {
//  fs.mkdirSync(personajesDir, { recursive: true });
//}


function extraerArray(nombre, contenidoArchivo) {
  const regex = new RegExp(`var\\s+${nombre}\\s*=\\s*(\\[[\\s\\S]*?\\]);`);
  const match = contenidoArchivo.match(regex);
  if (!match || !match[1]) {
    throw new Error(`❌ No se pudo encontrar el array ${nombre}`);
  }
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    console.error(`❌ Error parseando ${nombre}:`, error.message);
    throw new Error(`❌ JSON inválido en ${nombre}`);
  }
}



// === SUBIDA DE IMÁGENES ===

// 1. Storage para guardar siempre primero en 'public/ima/tmp'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tmpDir = path.join(__dirname, "public", "ima", "tmp");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombre = Date.now() + ext;
    cb(null, nombre);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No se subió ninguna imagen" });
  }

  const categoria = req.body.categoria || "general"; 
  const destinoDir = path.join(__dirname, "public", "ima", categoria);

  // Crear carpeta destino si no existe
  if (!fs.existsSync(destinoDir)) {
    fs.mkdirSync(destinoDir, { recursive: true });
  }

  const nombreArchivo = req.file.filename;
  const origen = req.file.path;
  const destino = path.join(destinoDir, nombreArchivo);

  // Mover archivo de tmp a carpeta destino
  fs.renameSync(origen, destino);

  const relativePath = `/ima/${categoria}/${nombreArchivo}`;
  console.log("✅ Imagen guardada en:", relativePath);

  res.json({ success: true, path: relativePath });
});
















// === GASTOS ===

const FILE = path.join(__dirname, "gastos.js");

function getGastos() {
  delete require.cache[require.resolve(FILE)];
  return require(FILE);
}

function guardarGastos(gastos) {
  const contenido = `module.exports = ${JSON.stringify(gastos, null, 2)};\n`;
  fs.writeFileSync(FILE, contenido, "utf8");
}

app.get("/api/gastos", (req, res) => {
  res.json(getGastos());
});

app.post("/api/gastos", (req, res) => {
  const gastos = getGastos();
  const nuevo = {
    ...req.body,
    activo: true,
    fecha: new Date().toLocaleDateString('es-ES'),
    veces: 1
  };
  gastos.push(nuevo);
  guardarGastos(gastos);
  res.json({ success: true });
});

app.put("/api/gastos/:index", (req, res) => {
  const gastos = getGastos();
  gastos[req.params.index] = { ...gastos[req.params.index], ...req.body };
  guardarGastos(gastos);
  res.json({ success: true });
});

app.delete("/api/gastos/:index", (req, res) => {
  const gastos = getGastos();
  gastos.splice(req.params.index, 1);
  guardarGastos(gastos);
  res.json({ success: true });
});







// === BuscaCOMIC ===

const FILE_BuSCACOMIC = path.join(__dirname, "buscacomic.js");

function getGBuscacomic() {
  delete require.cache[require.resolve(FILE)];
  return require(FILE);
}

function guardarGastos(gastos) {
  const contenido = `module.exports = ${JSON.stringify(gastos, null, 2)};\n`;
  fs.writeFileSync(FILE, contenido, "utf8");
}

app.get("/api/gastos", (req, res) => {
  res.json(getGastos());
});

app.post("/api/gastos", (req, res) => {
  const gastos = getGastos();
  const nuevo = {
    ...req.body,
    activo: true,
    fecha: new Date().toLocaleDateString('es-ES'),
    veces: 1
  };
  gastos.push(nuevo);
  guardarGastos(gastos);
  res.json({ success: true });
});

app.put("/api/gastos/:index", (req, res) => {
  const gastos = getGastos();
  gastos[req.params.index] = { ...gastos[req.params.index], ...req.body };
  guardarGastos(gastos);
  res.json({ success: true });
});

app.delete("/api/gastos/:index", (req, res) => {
  const gastos = getGastos();
  gastos.splice(req.params.index, 1);
  guardarGastos(gastos);
  res.json({ success: true });
});









// === COLECCIONES ===
const filePath = path.join(__dirname, 'colecciones.json');

// GET: Devuelve las colecciones actuales
app.get('/api/colecciones', (req, res) => {
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'Archivo de colecciones no encontrado.' });
    return;
  }

  const data = fs.readFileSync(filePath, 'utf-8');
  res.json(JSON.parse(data));
});

// PUT: Descarta ejemplares
app.put('/api/colecciones/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cantidad = parseInt(req.body.cantidad);

  let colecciones = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const index = colecciones.findIndex(c => c.id === id);

  if (index !== -1) {
    if (cantidad > 0 && cantidad <= colecciones[index].actual) {
      colecciones[index].actual -= cantidad;
      fs.writeFileSync(filePath, JSON.stringify(colecciones, null, 2), 'utf-8');
      res.json({ message: 'Actuales actualizados.', coleccion: colecciones[index] });
    } else {
      res.status(400).json({ error: 'Cantidad no válida.' });
    }
  } else {
    res.status(404).json({ error: 'Colección no encontrada.' });
  }
});

// POST: Restaurar los valores originales (restablecer desde el JSON inicial)
app.post('/api/colecciones/reset', (req, res) => {
  // Restaurar los datos iniciales
  const datosIniciales = [
    { id: 111, nombre: "DDT", ejemplares: 242 },
    { id: 112, nombre: "Mortadelo", ejemplares: 603 },
    { id: 113, nombre: "Super Carpanta", ejemplares: 59 },
    { id: 114, nombre: "Super Cartaplasma", ejemplares: 21 },
    { id: 115, nombre: "Super Humor", ejemplares: 87 },
    { id: 116, nombre: "Super Sacarino", ejemplares: 47 },
    { id: 117, nombre: "Super Tío Vivo", ejemplares: 35 },
    { id: 118, nombre: "TBO", ejemplares: 1700 },
    { id: 119, nombre: "Tío Vivo", ejemplares: 47 },
    { id: 120, nombre: "Tope Guai", ejemplares: 31 },
    { id: 121, nombre: "Yo y Yo", ejemplares: 693 }
  ];

  fs.writeFileSync(filePath, JSON.stringify(datosIniciales, null, 2), 'utf-8');
  res.json({ message: 'Datos restablecidos correctamente.', colecciones: datosIniciales });
});







// === LOGIN ===

app.post("/api/login", (req, res) => {
  const { user, password } = req.body;
  const admin = usuarios.administrador.find(a => a.user === user && a.password === password);
  
  if (admin) {
    res.json({ success: true, nombre: admin.nombre });
  } else {
    res.status(401).json({ success: false, message: "Credenciales inválidas" });
  }
});








// === SCEN ===

function getRutaArchivo(tipo, valor) {
  return path.join(__dirname, "public", tipo, `${tipo}-${valor}.js`);
}

function getDatos(tipo, valor) {
  const archivo = getRutaArchivo(tipo, valor);
  if (!fs.existsSync(archivo)) return [];
  delete require.cache[require.resolve(archivo)];
  return require(archivo);
}

function guardarDatos(tipo, valor, data, variableGlobal = "SCENE") {
  const contenido = `var ${variableGlobal} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(getRutaArchivo(tipo, valor), contenido, "utf8");
}

function getPersonajesFilePath(valor) {
  return path.join(__dirname, "Public", "personajes", `personajes-${valor}.js`);
}

function getPersonajes(valor) {
  const file = getPersonajesFilePath(valor);
  if (!fs.existsSync(file)) return [];
  delete require.cache[require.resolve(file)];
  return require(file).Personajes_galeria;
}


function getPersonajeById(valor, id) {
  const file = getPersonajesFilePath(valor);
  if (!fs.existsSync(file)) return [];
  delete require.cache[require.resolve(file)];
  const personajesRaw = require(file).PERSONAJES;
  const personajeFiltered = personajesRaw.filter(p => p.id_Personaje == id);
  return personajeFiltered[0];
}

function getGaleriaByPersonajeId(valor, id) {
  const file = getPersonajesFilePath(valor);
  if (!fs.existsSync(file)) return [];
  delete require.cache[require.resolve(file)];
  const galeriaRaw = require(file).Personajes_galeria;
  const galeriaFiltered = galeriaRaw.filter(p => p.id_Personaje == id);
  return galeriaFiltered;
}

function guardarPersonaje(valor, data) {
  const filePath = getPersonajesFilePath(valor);

  // ✅ Si el archivo no existe, lo creamos vacío
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "var PERSONAJES = [];", "utf8");
  }

  // 1. Leer archivo actual
  let contenidoArchivo = fs.readFileSync(filePath, 'utf8');

  // 2. Extraer PERSONAJES
  const regex = /var\s+PERSONAJES\s*=\s*(\[[\s\S]*?\]);/;
  const match = contenidoArchivo.match(regex);
  if (!match) {
    console.error('❌ No se encontró la variable PERSONAJES');
    return;
  }

  let personajes;
  try {
    personajes = JSON.parse(match[1]);
  } catch (e) {
    try {
      personajes = new Function(`return ${match[1]}`)();
    } catch (err) {
      console.error('❌ Error al parsear PERSONAJES:', err.message);
      return;
    }
  }

  if (!Array.isArray(personajes)) personajes = [];
  if (!Array.isArray(data.relaciones)) data.relaciones = [];

  const index = personajes.findIndex(p => p.id_Personaje === data.id_Personaje);

  if (index !== -1) {
  personajes[index] = {
    ...personajes[index],
    ...data,
    notas: Array.isArray(data.notas) ? data.notas : []
  };
  console.log(`🔄 Personaje con id ${data.id_Personaje} actualizado.`);
  } else {
    personajes.push(data);
    console.log(`➕ Personaje con id ${data.id_Personaje} agregado.`);
  }

  const nuevoContenido = `var PERSONAJES = ${JSON.stringify(personajes, null, 2)};`;
  contenidoArchivo = contenidoArchivo.replace(regex, nuevoContenido);
  fs.writeFileSync(filePath, contenidoArchivo, "utf8");
  console.log(`✅ Archivo ${filePath} actualizado correctamente.`);
}

function borrarPersonaje(valor, id_Personaje) {
  const filePath = getPersonajesFilePath(valor);

  if (!fs.existsSync(filePath)) return;

  let contenidoArchivo = fs.readFileSync(filePath, 'utf8');
  const regex = /var\s+PERSONAJES\s*=\s*(\[[\s\S]*?\]);/;
  const match = contenidoArchivo.match(regex);
  if (!match) return;

  let personajes;
  try {
    personajes = JSON.parse(match[1]);
  } catch (e) {
    console.error('❌ Error parseando PERSONAJES');
    return;
  }

  const idx = personajes.findIndex(p => String(p.id_Personaje) === String(id_Personaje));
  if (idx === -1) return;

  personajes.splice(idx, 1);
  const nuevoContenido = `var PERSONAJES = ${JSON.stringify(personajes, null, 2)};`;
  contenidoArchivo = contenidoArchivo.replace(regex, nuevoContenido);
  fs.writeFileSync(filePath, contenidoArchivo, 'utf8');
  console.log(`✅ Personaje con id ${id_Personaje} eliminado.`);
}

// === ENDPOINTS API ===

app.get("/api/personaje/:valor/:id", (req, res) => {
  const valor = req.params.valor;
  const id = req.params.id;
  try {
    console.log('id', id);
    const personaje = getPersonajeById(valor, id);
    console.log('personaje', personaje);
    res.json(personaje);
  } catch (err) {
    console.error("❌ Error leyendo personaje:", err.message);
    res.status(500).json({ error: "No se pudo leer el archivo" });
  }
});

app.get("/api/galeria/:valor/:id", (req, res) => {
  const valor = req.params.valor;
  const id = req.params.id;
  try {
    console.log('id', id);
    const galeria = getGaleriaByPersonajeId(valor, id);
    console.log('galeria', galeria);
    res.json(galeria);
  } catch (err) {
    console.error("❌ Error leyendo galeria:", err.message);
    res.status(500).json({ error: "No se pudo leer el archivo" });
  }
});

app.get("/api/personajes/:valor", (req, res) => {
  const valor = req.params.valor;
  try {
    console.log('valor', valor);
    const personajes = getPersonajes(valor);
    console.log('personajes', personajes);
    res.json(personajes);
  } catch (err) {
    console.error("❌ Error leyendo personajes:", err.message);
    res.status(500).json({ error: "No se pudo leer el archivo" });
  }
});

app.put("/api/personajes/:valor", (req, res) => {
  const valor = req.params.valor;
  const nuevo = req.body;

  try {
    guardarPersonaje(valor, nuevo);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al guardar personaje:", err.message);
    res.status(500).json({ error: "No se pudo guardar el personaje" });
  }
});

app.delete("/api/personajes/:valor/:id", (req, res) => {
  const { valor, id } = req.params;

  try {
    borrarPersonaje(valor, id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al eliminar personaje:", err.message);
    res.status(500).json({ error: "No se pudo eliminar el personaje" });
  }
});
















// Archivos estáticos
// SERVIR ARCHIVOS ESTÁTICOS
app.use("/inteligencias/imagen", express.static(path.join(__dirname, "public", "inteligencias", "imagen")));
app.use("/inteligencias", express.static(path.join(__dirname, "public", "inteligencias")));
app.use("/assets", express.static(path.join(__dirname, "public", "assets")));
app.use("/ima", express.static(path.join(__dirname, "public", "inteligencias", "imagen", "ima")));

// Ruta al archivo .js que guarda el array Inteligencia
const rutaGaleriaIA_imagen = path.join(__dirname, "public", "inteligencias", "imagen", "galeria_IA_imagen.js");
let { Inteligencia: InteligenciaImagen } = require(rutaGaleriaIA_imagen);

// Multer configurado con nombres de campo correctos
const storageImagen = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/inteligencias/imagen/ima");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_"));
  }
});


const uploadImagen = multer({ storage: storageImagen }).fields([
  { name: "img", maxCount: 1 },            // ✅
  { name: "version 5", maxCount: 1 },      // ⚠️
  { name: "version 6", maxCount: 1 },      // ⚠️
  { name: "version 7", maxCount: 1 },      // ⚠️
]);

// Cargar datos actuales
app.get("/api/ia-imagenes", (req, res) => {
  delete require.cache[require.resolve(rutaGaleriaIA_imagen)];
  ({ Inteligencia: InteligenciaImagen } = require(rutaGaleriaIA_imagen));
  res.json(InteligenciaImagen);
});

// POST: Crear nueva entrada
app.post("/api/ia-imagenes", uploadImagen, (req, res) => {
  console.log("🧾 Campos recibidos:", Object.keys(req.files)); // ✅ AQUÍ SÍ EXISTE req

  const { titulo, texto, etiqueta, subcategoria, categoria } = req.body;
  const files = req.files || {};

  const nuevo = {
    id: Date.now(),
    img: limpiarRuta(files.img?.[0]?.path) || "",
    "version 5": limpiarRuta(files["version 5"]?.[0]?.path) || "",
    "version 6": limpiarRuta(files["version 6"]?.[0]?.path) || "",
    "version 7": limpiarRuta(files["version 7"]?.[0]?.path) || "",
    version: limpiarRuta(files.version?.[0]?.path) || "",
    titulo,
    texto,
    etiqueta,
    subcategoria: subcategoria || "",
    categoria: categoria || ""
  };

  InteligenciaImagen.push(nuevo);
  guardarDatosImagen(res);
});

// PUT: Actualizar por índice
app.put("/api/ia-imagenes/:id", uploadImagen, (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, texto, etiqueta, subcategoria, categoria } = req.body;
  const files = req.files || {};


  const index = InteligenciaImagen.findIndex(item => item.id === id);

  if (!InteligenciaImagen[index]) return res.status(404).json({ error: "No encontrado" });

  const item = InteligenciaImagen[index];
  item.titulo = titulo;
  item.texto = texto;
  item.etiqueta = etiqueta;
  item.subcategoria = subcategoria || "";
  item.categoria = categoria || "";

  if (files.img?.[0]) item.img = limpiarRuta(files.img[0].path);
  if (files["version 5"]?.[0]) item["version 5"] = limpiarRuta(files["version 5"][0].path);
  if (files["version 6"]?.[0]) item["version 6"] = limpiarRuta(files["version 6"][0].path);
  if (files["version 7"]?.[0]) item["version 7"] = limpiarRuta(files["version 7"][0].path);

  guardarDatosImagen(res);
});

// Función de limpieza de rutas
function limpiarRuta(ruta) {
  return ruta ? ruta.replace(/\\/g, "/").replace("public/", "") : "";
}

// Función para guardar los datos
function guardarDatosImagen(res) {
  try {
    fs.writeFileSync(
      rutaGaleriaIA_imagen,
      `module.exports = { Inteligencia: ${JSON.stringify(InteligenciaImagen, null, 2)} };`
    );
    res.json({ mensaje: "✅ Guardado correctamente" });
  } catch (err) {
    console.error("❌ Error al guardar el archivo JS:", err);
    res.status(500).json({ error: "Error al guardar el archivo JS" });
  }
}

app.delete('/api/ia-imagenes/:id', (req, res) => {
  const id = parseInt(req.params.id);
const index = InteligenciaImagen.findIndex(item => item.id === id);

if (index === -1) {
  return res.status(404).json({ error: 'Imagen no encontrada' });
}

InteligenciaImagen.splice(index, 1);

// Guardar cambios en el archivo original
fs.writeFileSync(
  rutaGaleriaIA_imagen,
  `module.exports = { Inteligencia: ${JSON.stringify(InteligenciaImagen, null, 2)} };`
);

res.json({ success: true });
});
















//  VideoÇ


const rutaGaleriaIA_video = path.join(__dirname, "public", "inteligencias", "video", "galeria_IA_video.js");
let { Inteligencia: InteligenciaVideo } = require(rutaGaleriaIA_video);

// Configuración de almacenamiento para MP4
const storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/inteligencias/video/ima");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const uploadVideo = multer({ storage: storageVideo });

// Obtener galería
app.get("/api/ia-videos", (req, res) => {
  delete require.cache[require.resolve(rutaGaleriaIA_video)];
  ({ Inteligencia: InteligenciaVideo } = require(rutaGaleriaIA_video));
  res.json(InteligenciaVideo);
});

// Insertar nueva entrada (solo MP4)
app.post("/api/ia-videos", uploadVideo.single("mp4"), (req, res) => {
  const { titulo, texto, etiqueta } = req.body;
  const mp4 = req.file ? req.file.filename : "";

  const nuevo = { titulo, texto, etiqueta };
  if (mp4) nuevo.mp4 = mp4;

  InteligenciaVideo.push(nuevo);
  guardarDatosVideo(res);
});

// Editar entrada
app.put("/api/ia-videos/:index", uploadVideo.single("mp4"), (req, res) => {
  const { index } = req.params;
  const { titulo, texto, etiqueta } = req.body;
  const mp4 = req.file ? req.file.filename : null;

  if (!InteligenciaVideo[index]) return res.status(404).json({ error: "Índice no válido" });

  InteligenciaVideo[index].titulo = titulo;
  InteligenciaVideo[index].texto = texto;
  InteligenciaVideo[index].etiqueta = etiqueta;
  if (mp4) InteligenciaVideo[index].mp4 = mp4;

  guardarDatosVideo(res);
});

// Guardar archivo actualizado
function guardarDatosVideo(res) {
  const contenido = `const Inteligencia = ${JSON.stringify(InteligenciaVideo, null, 2)};\n\nmodule.exports = { Inteligencia };`;
  fs.writeFile(rutaGaleriaIA_video, contenido, (err) => {
    if (err) return res.status(500).json({ error: "Error al guardar video" });
    res.json({ mensaje: "Guardado con éxito (video)" });
  });
}









// NFL


const FILE_NFL = path.join(__dirname, "public", "atento", "nfl_grupo1.js");

// === FUNCIONES UTILITARIAS ===
function getNFL() {
  delete require.cache[require.resolve(FILE_NFL)];
  return require(FILE_NFL).data;
}

function guardarNFL(data) {
  const contenido = `const data = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_NFL, contenido, "utf8");
}

// === RUTAS API ===

// GET todos los equipos
app.get("/api/nfl", (req, res) => {
  try {
    const data = getNFL();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer nfl_grupo1.js", detalle: err.message });
  }
});

// POST nuevo equipo
app.post("/api/nfl", (req, res) => {
  try {
    const data = getNFL();
    const nuevo = {
      id: Date.now(),
      d1: req.body.d1 || "",
      d2: req.body.d2 || "",
      d3: req.body.d3 || "",
      d4: req.body.d4 || "No revisado"
    };
    data.push(nuevo);
    guardarNFL(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al crear equipo", detalle: err.message });
  }
});

// PUT editar equipo
app.put("/api/nfl/:id", (req, res) => {
  try {
    const data = getNFL();
    const id = parseInt(req.params.id);
    const index = data.findIndex(e => e.id === id);
    if (index === -1) return res.status(404).json({ error: "Equipo no encontrado" });

    data[index] = {
      ...data[index],
      d1: req.body.d1 ?? data[index].d1,
      d2: req.body.d2 ?? data[index].d2,
      d3: req.body.d3 ?? data[index].d3,
      d4: req.body.d4 ?? data[index].d4
    };
    guardarNFL(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al editar equipo", detalle: err.message });
  }
});

// DELETE equipo
app.delete("/api/nfl/:id", (req, res) => {
  try {
    const data = getNFL();
    const id = parseInt(req.params.id);
    const nuevos = data.filter(e => e.id !== id);
    guardarNFL(nuevos);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar equipo", detalle: err.message });
  }
});







const FILE_SERIES = path.join(__dirname, "public", "atento", "series.js");
const FOLDER_IMAGENES_SERIES = path.join(__dirname, "public", "atento", "imagen_serie");

// Crear carpeta si no existe
fs.mkdirSync(FOLDER_IMAGENES_SERIES, { recursive: true });
app.use('/imagen_serie', express.static(FOLDER_IMAGENES_SERIES));

// Configuración de multer
const storageSeries = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FOLDER_IMAGENES_SERIES);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombreArchivo = `${Date.now()}${ext}`;
    cb(null, nombreArchivo);
  }
});
const uploadSeries = multer({ storage: storageSeries });

// Funciones de acceso al archivo
function getSeries() {
  delete require.cache[require.resolve(FILE_SERIES)];
  return require(FILE_SERIES).series;
}

function guardarSeries(data) {
  const contenido = `const series = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { series };`;
  fs.writeFileSync(FILE_SERIES, contenido, "utf8");
}

// Rutas API

app.get("/api/series", (req, res) => {
  try {
    res.json(getSeries());
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer series.js" });
  }
});

app.post("/api/series", uploadSeries.single("imagen"), (req, res) => {
  try {
    const series = getSeries();
    const nueva = {
      id: Date.now(),
      nombre: req.body.nombre,
      Futuros_trabajos: req.body.Futuros_trabajos,
      trabajos_anteriores: req.body.trabajos_anteriores,
      url_imagen: req.file ? `/imagen_serie/${req.file.filename}` : "/imagen_serie/default.png"
    };
    series.push(nueva);
    guardarSeries(series);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al crear serie", detalle: err.message });
  }
});

app.put("/api/series/:id", uploadSeries.single("imagen"), (req, res) => {
  try {
    const series = getSeries();
    const id = parseInt(req.params.id);
    const index = series.findIndex(s => s.id === id);
    if (index === -1) return res.status(404).json({ error: "Serie no encontrada" });

    // Si hay imagen nueva, borrar la antigua si existe
    if (req.file && series[index].url_imagen && series[index].url_imagen !== "/imagen_serie/default.png") {
      const rutaAntigua = path.join(__dirname, "public", series[index].url_imagen);
      if (fs.existsSync(rutaAntigua)) {
        fs.unlinkSync(rutaAntigua);
      }
    }

    series[index] = {
      ...series[index],
      nombre: req.body.nombre,
      Futuros_trabajos: req.body.Futuros_trabajos,
      trabajos_anteriores: req.body.trabajos_anteriores,
      ...(req.file && { url_imagen: `/imagen_serie/${req.file.filename}` })
    };

    guardarSeries(series);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al editar serie", detalle: err.message });
  }
});

app.delete("/api/series/:id", (req, res) => {
  try {
    const series = getSeries();
    const id = parseInt(req.params.id);
    const serie = series.find(s => s.id === id);
    if (!serie) return res.status(404).json({ error: "Serie no encontrada" });

    // Eliminar imagen si no es default
    if (serie.url_imagen && serie.url_imagen !== "/imagen_serie/default.png") {
      const rutaImg = path.join(__dirname, "public", serie.url_imagen);
      if (fs.existsSync(rutaImg)) {
        fs.unlinkSync(rutaImg);
      }
    }

    const nuevas = series.filter(s => s.id !== id);
    guardarSeries(nuevas);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar serie", detalle: err.message });
  }
});





// === ARTISTAS ===
const FILE_ARTISTAS = path.join(__dirname, "public", "atento", "artistas.js");
function getArtistas() {
  delete require.cache[require.resolve(FILE_ARTISTAS)];
  return require(FILE_ARTISTAS).artistas;
}
function guardarArtistas(data) {
  const contenido = `const artistas = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { artistas };`;
  fs.writeFileSync(FILE_ARTISTAS, contenido, "utf8");
}

// GET todos
app.get("/api/artistas", (req, res) => {
  try {
    res.json(getArtistas());
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer artistas.js" });
  }
});

// POST nuevo artista (con imagen)
app.post("/api/artistas", upload.single("imagen"), (req, res) => {
  try {
    const artistas = getArtistas();
    const nuevo = {
      id: Date.now(),
      nombre: req.body.nombre,
      Futuros_trabajos: req.body.Futuros_trabajos,
      trabajos_anteriores: req.body.trabajos_anteriores,
      url_imagen: req.file ? `/ima/${req.file.filename}` : "/ima/default.png"
    };
    artistas.push(nuevo);
    guardarArtistas(artistas);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al crear artista", detalle: err.message });
  }
});

// PUT editar artista (con imagen opcional)
app.put("/api/artistas/:id", upload.single("imagen"), (req, res) => {
  try {
    const artistas = getArtistas();
    const id = parseInt(req.params.id);
    const index = artistas.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ error: "Artista no encontrado" });

    artistas[index] = {
      ...artistas[index],
      nombre: req.body.nombre,
      Futuros_trabajos: req.body.Futuros_trabajos,
      trabajos_anteriores: req.body.trabajos_anteriores,
      ...(req.file && { url_imagen: `/ima/${req.file.filename}` })
    };
    guardarArtistas(artistas);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al editar artista", detalle: err.message });
  }
});

// DELETE artista
app.delete("/api/artistas/:id", (req, res) => {
  try {
    const artistas = getArtistas();
    const id = parseInt(req.params.id);
    const nuevos = artistas.filter(a => a.id !== id);
    guardarArtistas(nuevos);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar artista", detalle: err.message });
  }
});














// === REsuMEN ===

const ENRRUTAMIENTO_PATH = path.join(__dirname, "Public", "enrrutamiento.js");


app.post("/api/upload-resumen", upload.single("imagen"), (req, res) => {
  const valor = req.body.valor || "general";
  const destinoDir = path.join(__dirname, "public", "ima", valor);

  if (!fs.existsSync(destinoDir)) {
    fs.mkdirSync(destinoDir, { recursive: true });
  }

  const nombreArchivo = Date.now() + path.extname(req.file.originalname);
  const origen = req.file.path;
  const destino = path.join(destinoDir, nombreArchivo);
  fs.renameSync(origen, destino);

  const relativePath = `/ima/${valor}/${nombreArchivo}`;
  console.log(`📷 Imagen guardada en: ${relativePath}`);
  res.json({ success: true, path: relativePath });
});




function leerEnrrutamiento() {
  delete require.cache[require.resolve(ENRRUTAMIENTO_PATH)];
  return require(ENRRUTAMIENTO_PATH).contenido;
}

function guardarEnrrutamiento(nuevoContenido) {
  const contenidoTexto = `const contenido = ${JSON.stringify(nuevoContenido, null, 2)};\nmodule.exports = { contenido };`;
  fs.writeFileSync(ENRRUTAMIENTO_PATH, contenidoTexto, "utf8");
}

// GET
app.get("/api/enrrutamiento/:valor", (req, res) => {
  const data = leerEnrrutamiento();
  const valor = req.params.valor;
  if (data[valor]) {
    res.json(data[valor]);
  } else {
    res.status(404).json({ error: "Valor no encontrado" });
  }
});

// PUT
app.put("/api/enrrutamiento/:valor", (req, res) => {
  const valor = req.params.valor;
  const nuevo = req.body;

  const data = leerEnrrutamiento();

  if (!data[valor]) {
    return res.status(404).json({ error: "Valor no encontrado" });
  }

  data[valor] = {
    ...data[valor],
    texto1: nuevo.texto1,
    texto2: nuevo.texto2,
    texto3: nuevo.texto3,
    imagen1: nuevo.imagen1,
    imagen2: nuevo.imagen2,
    imagen3: nuevo.imagen3,
    array_de_notas: nuevo.array_de_notas
  };

  guardarEnrrutamiento(data);
  res.json({ success: true });
});




// === LOCURAS DE TRUMP ===

const FILE_TRUMP = path.join(__dirname, "locuras_de_trump.js");

function getLocuras() {
  delete require.cache[require.resolve(FILE_TRUMP)];
  return require(FILE_TRUMP);
}

function guardarLocuras(data) {
  const contenido = `module.exports = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(FILE_TRUMP, contenido, "utf8");
}

app.get("/api/locuras", (req, res) => {
  try {
    res.json(getLocuras());
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer el archivo de locuras" });
  }
});

app.post("/api/locuras", (req, res) => {
  try {
    const locuras = getLocuras();
    const nueva = { ...req.body, id_tonteria: Date.now() };
    locuras.push(nueva);
    guardarLocuras(locuras);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "No se pudo guardar la locura" });
  }
});

app.put("/api/locuras/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const locuras = getLocuras();
    const index = locuras.findIndex(l => l.id_tonteria === id);
    if (index === -1) return res.status(404).json({ error: "No encontrada" });

    locuras[index] = { ...locuras[index], ...req.body };
    guardarLocuras(locuras);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "No se pudo actualizar la locura" });
  }
});

app.delete("/api/locuras/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const locuras = getLocuras();
    const nuevaLista = locuras.filter(l => l.id_tonteria !== id);
    guardarLocuras(nuevaLista);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar la locura" });
  }
});










// === REVISTAS CULTURISMO ===

const FILE_REVISTAS = path.join(__dirname, "public", "personajes-culturismo", "revistas.js");
const FOLDER_IMAGENES_REVISTAS = path.join(__dirname, "public", "personajes-culturismo", "ima");
const FILE_PERSONAJES = path.join(__dirname, "public", "personajes-culturismo", "personajes.js");



function getPersonajesCulturismo() {
  delete require.cache[require.resolve(FILE_PERSONAJES)];
  return require(FILE_PERSONAJES).personajes;
}

app.get("/api/personajes-culturismo", (req, res) => {
  try {
    res.json(getPersonajesCulturismo());
  } catch (err) {
    console.error("Error al leer personajes:", err);
    res.status(500).json({ error: "No se pudo leer personajes.js" });
  }
});


// Asegurarse de que exista la carpeta
fs.mkdirSync(FOLDER_IMAGENES_REVISTAS, { recursive: true });

// Servir imágenes
app.use('/personajes-culturismo/ima', express.static(FOLDER_IMAGENES_REVISTAS));

// Multer para imágenes de revistas
const storageRevistas = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_IMAGENES_REVISTAS),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `revista_${Date.now()}${ext}`;
    cb(null, name);
  }
});
const uploadRevistas = multer({ storage: storageRevistas });

// Funciones de manejo
function getRevistas() {
  delete require.cache[require.resolve(FILE_REVISTAS)];
  return require(FILE_REVISTAS);
}

function guardarRevistas(data) {
  const contenido = `module.exports = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(FILE_REVISTAS, contenido, "utf8");
}

// GET todas las revistas
app.get("/api/revistas", (req, res) => {
  try {
    res.json(getRevistas());
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer el archivo de revistas" });
  }
});

// POST nueva revista
app.post("/api/revistas", uploadRevistas.single("imagen"), (req, res) => {
  try {
    const revistas = getRevistas();
    const { id_personaje, nombre, tipo, url_de_su_compra } = req.body;
    const id_producto = Date.now();
    const imagen_url = req.file
      ? `/personajes-culturismo/ima/${req.file.filename}`
      : "/personajes-culturismo/ima/default.png";

    revistas.push({ id_producto, id_personaje: parseInt(id_personaje), nombre, tipo, url_imagen: imagen_url, url_de_su_compra });
    guardarRevistas(revistas);

    res.json({ mensaje: "Revista añadida con éxito" });
  } catch (err) {
    console.error("Error al añadir revista:", err);
    res.status(500).json({ error: "Error al añadir revista" });
  }
});

// PUT editar revista
app.put("/api/revistas/:id", uploadRevistas.single("imagen"), (req, res) => {
  try {
    const revistas = getRevistas();
    const { id } = req.params;
    const index = revistas.findIndex(r => r.id_producto == id);
    if (index === -1) return res.status(404).json({ error: "Revista no encontrada" });

    const { nombre, tipo, url_de_su_compra } = req.body;

    revistas[index] = {
      ...revistas[index],
      nombre,
      tipo,
      url_de_su_compra
    };

    if (req.file) {
      const rutaAnterior = path.join(__dirname, "public", revistas[index].url_imagen || "");
      if (fs.existsSync(rutaAnterior) && revistas[index].url_imagen !== "/personajes-culturismo/ima/default.png") {
        fs.unlinkSync(rutaAnterior);
      }
      revistas[index].url_imagen = `/personajes-culturismo/ima/${req.file.filename}`;
    }

    guardarRevistas(revistas);
    res.json({ mensaje: "Revista actualizada con éxito" });
  } catch (err) {
    console.error("Error al editar revista:", err);
    res.status(500).json({ error: "Error al editar revista" });
  }
});

// DELETE revista
app.delete("/api/revistas/:id", (req, res) => {
  try {
    const revistas = getRevistas();
    const { id } = req.params;
    const nuevos = revistas.filter(r => r.id_producto != id);
    if (nuevos.length === revistas.length) return res.status(404).json({ error: "Revista no encontrada" });

    guardarRevistas(nuevos);
    res.json({ mensaje: "Revista eliminada con éxito" });
  } catch (err) {
    console.error("Error al eliminar revista:", err);
    res.status(500).json({ error: "Error al eliminar revista" });
  }
});
























// === ARTÍCULOS ===

const FILE_ARTICULOS = path.join(__dirname, "articulos.js");
const FOLDER_IMAGENES_ARTICULOS = path.join(__dirname, "public", "ima", "articulos");





// Configurar Multer para artículos
const storageArticulos = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_IMAGENES_ARTICULOS),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  }
});
const uploadArticulos = multer({ storage: storageArticulos });

// Funciones para obtener y guardar
function getArticulos() {
  delete require.cache[require.resolve(FILE_ARTICULOS)];
  return require(FILE_ARTICULOS);
}

function guardarArticulos(data) {
  const contenido = `module.exports = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(FILE_ARTICULOS, contenido, "utf8");
}

// GET artículos
app.get("/api/articulos", (req, res) => {
  try {
    res.json(getArticulos());
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer el archivo de artículos" });
  }
});

// POST nuevo artículo
app.post("/api/articulos", uploadArticulos.single("imagen"), (req, res) => {
  try {
    const { titulo, etiquetas, tipo, texto, texto2 } = req.body;
    const id_articulo = Date.now();
    const imagen_url = req.file ? `/ima/${req.file.filename}` : "/ima/default.png";
    
    articulos.push({ id_articulo, titulo, etiquetas, tipo, texto, texto2, imagen_url });
    guardarArticulos(articulos);

    res.json({ mensaje: "Artículo añadido con éxito" });
  } catch (err) {
    console.error("Error al añadir artículo:", err);
    res.status(500).json({ error: "Error al añadir artículo" });
  }
});

// PUT editar artículo
app.put("/api/articulos/:id", uploadArticulos.single("imagen"), (req, res) => {
  try {
    const articulos = getArticulos();
    const { id } = req.params;
    const index = articulos.findIndex(a => a.id_articulo == id);
    if (index === -1) return res.status(404).json({ error: "Artículo no encontrado" });

    const { titulo, etiquetas, tipo, texto, texto2 } = req.body;

    articulos[index] = {
      ...articulos[index],
      titulo,
      etiquetas,
      tipo,
      texto,
      texto2
    };

    if (req.file) {
      const rutaAnterior = path.join(__dirname, "public", articulos[index].imagen_url || "");
      if (fs.existsSync(rutaAnterior) && articulos[index].imagen_url !== "/ima/articulos/default.png") {
        fs.unlinkSync(rutaAnterior);
      }
      articulos[index].imagen_url = `/ima/articulos/${req.file.filename}`;
    }

    guardarArticulos(articulos);
    res.json({ mensaje: "Artículo actualizado con éxito" });
  } catch (err) {
    console.error("Error al editar artículo:", err);
    res.status(500).json({ error: "Error al editar artículo" });
  }
});


// DELETE artículo
app.delete("/api/articulos/:id", (req, res) => {
  try {
    const articulos = getArticulos();
    const { id } = req.params;
    const nuevos = articulos.filter(a => a.id !== id);
    if (nuevos.length === articulos.length) return res.status(404).json({ error: "Artículo no encontrado" });

    guardarArticulos(nuevos);
    res.json({ mensaje: "Artículo eliminado con éxito" });
  } catch (err) {
    console.error("Error al eliminar artículo:", err);
    res.status(500).json({ error: "Error al eliminar artículo" });
  }
});


// En server.js, después de multer
app.post("/api/upload", upload.single("imagen"), (req, res) => {
  const categoria = req.body.categoria || "general";
  const destinoDir = path.join(__dirname, "public", "ima", categoria);
  if (!fs.existsSync(destinoDir)) fs.mkdirSync(destinoDir, { recursive: true });

  const nombreArchivo = req.file.filename;
  const origen = req.file.path;
  const destino = path.join(destinoDir, nombreArchivo);
  fs.renameSync(origen, destino);

  const relativePath = `/ima/${categoria}/${nombreArchivo}`;
  res.json({ success: true, path: relativePath });
});

app.put("/api/articulos", (req, res) => {
  try {
    guardarArticulos(req.body); // asegúrate de tener esta función
    res.json({ success: true });
  } catch (err) {
    console.error("Error al guardar artículos:", err);
    res.status(500).json({ error: "No se pudo guardar el archivo de artículos" });
  }
});


const FILE_GALERIA = path.join(__dirname, "galeria.js");
const FOLDER_IMAGENES_GALERIA = path.join(__dirname, "public", "ima", "articulos");

function getGaleria() {
  delete require.cache[require.resolve(FILE_GALERIA)];
  return require(FILE_GALERIA);
}

function guardarGaleria(data) {
  const contenido = `module.exports = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(FILE_GALERIA, contenido, "utf8");
}

// Configuración de multer para galería
const storageGaleria = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_IMAGENES_GALERIA),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const uploadGaleria = multer({ storage: storageGaleria });



// POST: subir imágenes a la galería
app.post("/api/galeria", uploadGaleria.array("imagenes", 10), (req, res) => {
  try {
    const { id_articulo } = req.body;
    const galeria = getGaleria();
    const nuevasImagenes = req.files.map(file => ({
      id_galeria: Date.now() + Math.floor(Math.random() * 1000),
      id_articulo: parseInt(id_articulo),
      imagen_url: `/ima/articulos/${file.filename}`
    }));
    const actualizada = galeria.concat(nuevasImagenes);
    guardarGaleria(actualizada);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al subir imágenes:", err.stack || err);
    res.status(500).json({ error: "Error al subir imágenes" });
  }
});

// GET: obtener toda la galería
app.get("/api/galeria", (req, res) => {
  try {
    const galeria = getGaleria();
    res.json(galeria);
  } catch (err) {
    console.error("Error al leer galería:", err);
    res.status(500).json({ error: "No se pudo leer la galería" });
  }
});




















// === SCENES ===

// Devuelve scenes del archivo
function getScenes(valor) {
  const filePath = getScenesFilePath(valor);
  if (!fs.existsSync(filePath)) return [];

  // Leemos todo el fichero como texto
  const contenido = fs.readFileSync(filePath, 'utf8');

  // Buscamos el literal "var scenes = [ ... ];" con regex
  const match = contenido.match(/var\s+scenes\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) {
    console.error('❌ No se encontró el array scenes en', filePath);
    return [];
  }

  try {
    // match[1] contiene los corchetes y su contenido
    return JSON.parse(match[1]);
  } catch (err) {
    console.error('❌ Error parseando scenes:', err);
    return [];
  }
}

function getScenesFilePath(valor) {
  return path.join(__dirname, 'public', 'personajes', `personajes-${valor}.js`);
}

// Guarda el array completo scenes
function guardarScenes(valor, scenes) {
  const filePath = getScenesFilePath(valor);
  let contenidoArchivo = fs.readFileSync(filePath, 'utf8');

  const regex = /var\s+scenes\s*=\s*(\[[\s\S]*?\]);/;
  const match = contenidoArchivo.match(regex);

  if (!match) {
    console.error('❌ No se encontró el array scenes.');
    return;
  }

  const nuevoTexto = `var scenes = ${JSON.stringify(scenes, null, 2)};`;
  const nuevoContenido = contenidoArchivo.replace(regex, nuevoTexto);

  fs.writeFileSync(filePath, nuevoContenido, 'utf8');
}

// Devuelve ruta correcta
function getScenesFilePath(valor) {
  return path.join(__dirname, "public", "personajes", `personajes-${valor}.js`);
}

// Valores válidos
const valoresValidos = ["novela", "comic", "mansion", "Pruebas"];

// API: Obtener todas las scenes
app.get("/api/scenes/:valor", (req, res) => {
  const valor = req.params.valor;

  /* if (!valoresValidos.includes(valor)) {
    return res.status(400).json({ error: "Valor de escena no válido" });
  } */

  try {
    const scenes = getScenes(valor);
    res.json(scenes);
  } catch (err) {
    console.error("❌ Error al cargar scenes:", err.message);
    res.status(500).json({ error: "No se pudo cargar scenes" });
  }
});

// API: Guardar (insertar o actualizar) scene
app.put("/api/scenes/:valor", (req, res) => {
  const valor = req.params.valor;
  const nuevaScene = req.body;

  /*if (!valoresValidos.includes(valor)) {
    return res.status(400).json({ error: "Valor de escena no válido" });
  }*/

  try {
    const scenes = getScenes(valor);
    const index = scenes.findIndex(s => s.id_scene === nuevaScene.id_scene);

    if (index !== -1) {
      scenes[index] = nuevaScene;
    } else {
      scenes.push(nuevaScene);
    }

    guardarScenes(valor, scenes);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al guardar scene:", err.message);
    res.status(500).json({ error: "No se pudo guardar scene" });
  }
});

// API: Eliminar una scene
app.delete("/api/scenes/:valor/:id", (req, res) => {
  const valor = req.params.valor;
  const id_scene = parseInt(req.params.id, 10);

  /*if (!valoresValidos.includes(valor)) {
    return res.status(400).json({ error: "Valor de escena no válido" });
  }*/

  try {
    const scenes = getScenes(valor);
    const nuevasScenes = scenes.filter(s => s.id_scene !== id_scene);

    if (scenes.length === nuevasScenes.length) {
      return res.status(404).json({ error: "Scene no encontrada" });
    }

    guardarScenes(valor, nuevasScenes);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al borrar scene:", err.message);
    res.status(500).json({ error: "No se pudo borrar scene" });
  }
});










// === DIAS ===

// Leer archivo de días
function getDias(valor) {
  const filePath = getPersonajesFilePath(valor);
  if (!fs.existsSync(filePath)) return [];
  delete require.cache[require.resolve(filePath)];
  const personajes = require(filePath);
  return personajes.dia || [];
}

// Guardar días (solamente el array dia)
function guardarDias(valor, nuevosDias) {
  const filePath = getPersonajesFilePath(valor);
  let contenidoArchivo = fs.readFileSync(filePath, "utf8");

  const regex = /var\s+dia\s*=\s*(\[[\s\S]*?\]);/;
  const match = contenidoArchivo.match(regex);

  if (!match) {
    console.error("❌ No se encontró el array dia.");
    throw new Error("No se encontró el array de días.");
  }

  const nuevoTexto = `var dia = ${JSON.stringify(nuevosDias, null, 2)};`;
  const nuevoContenido = contenidoArchivo.replace(regex, nuevoTexto);

  fs.writeFileSync(filePath, nuevoContenido, "utf8");
}

// API: Obtener días
app.get("/api/dias/:valor", (req, res) => {
  const valor = req.params.valor;

  try {
    const filePath = path.join(__dirname, "public", "personajes", `personajes-${valor}.js`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    delete require.cache[require.resolve(filePath)];
    const personajes = require(filePath);
    res.json(personajes.dia || []);
  } catch (err) {
    console.error("❌ Error al cargar días:", err.message);
    res.status(500).json({ error: "No se pudo cargar los días" });
  }
});







// --- API: Actualizar Día existente ---
app.put("/api/dias/:id", (req, res) => {
  const idDia = parseInt(req.params.id, 10);
  const valor = req.query.valor; // muy importante que lo mandes en el fetch
  const nuevoDia = req.body;

  if (!valor) {
    return res.status(400).json({ error: "Falta el parámetro 'valor' en la query (?valor=novela)" });
  }

  const filePath = path.join(__dirname, "public", "personajes", `personajes-${valor}.js`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Archivo de personajes no encontrado" });
  }

  try {
    let contenidoArchivo = fs.readFileSync(filePath, "utf8");

    const dia = extraerArray("dia", contenidoArchivo);
    const scenes = extraerArray("scenes", contenidoArchivo);
    const dia_escena = extraerArray("dia_escena", contenidoArchivo);
    const mes = extraerArray("mes", contenidoArchivo);
    const PERSONAJES = extraerArray("PERSONAJES", contenidoArchivo);
    const scenes_Personajes = extraerArray("scenes_Personajes", contenidoArchivo);

    const index = dia.findIndex(d => d.id_dia === idDia);

    if (index === -1) {
      return res.status(404).json({ error: "Día no encontrado en dia" });
    }

    dia[index] = nuevoDia; // actualizar

    const nuevoContenido =
      `var PERSONAJES = ${JSON.stringify(PERSONAJES, null, 2)};\n\n` +
      `var scenes = ${JSON.stringify(scenes, null, 2)};\n\n` +
      `var dia_escena = ${JSON.stringify(dia_escena, null, 2)};\n\n` +
      `var dia = ${JSON.stringify(dia, null, 2)};\n\n` +
      `var mes = ${JSON.stringify(mes, null, 2)};\n\n` +
      `var scenes_Personajes = ${JSON.stringify(scenes_Personajes, null, 2)};\n`;

    fs.writeFileSync(filePath, nuevoContenido, "utf8");

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error actualizando día:", err.message);
    res.status(500).json({ error: "No se pudo actualizar el día" });
  }
});







app.post("/api/dias/:valor", (req, res) => {
  const valor = req.params.valor;
  const nuevoDia = req.body;

  try {
    const filePath = path.join(__dirname, "public", "personajes", `personajes-${valor}.js`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Archivo de personajes no encontrado" });
    }

    let contenidoArchivo = fs.readFileSync(filePath, "utf8");

    const dia = extraerArray("dia", contenidoArchivo);
    const dia_escena = extraerArray("dia_escena", contenidoArchivo);
    const mes = extraerArray("mes", contenidoArchivo);
    const scenes = extraerArray("scenes", contenidoArchivo);
    const scenes_Personajes = extraerArray("scenes_Personajes", contenidoArchivo);

    if (!nuevoDia.id_dia) {
      nuevoDia.id_dia = Date.now();
    }

    dia.push(nuevoDia);
    dia_escena.push({
      id_dia_scene: Date.now() + 1,
      id_dia: nuevoDia.id_dia,
      id_scene: nuevoDia.id_scene
    });

    const nuevoContenido =
      `var PERSONAJES = ${JSON.stringify(extraerArray("PERSONAJES", contenidoArchivo), null, 2)};\n\n` +
      `var scenes = ${JSON.stringify(scenes, null, 2)};\n\n` +
      `var dia_escena = ${JSON.stringify(dia_escena, null, 2)};\n\n` +
      `var dia = ${JSON.stringify(dia, null, 2)};\n\n` +
      `var mes = ${JSON.stringify(mes, null, 2)};\n\n` +
      `var scenes_Personajes = ${JSON.stringify(scenes_Personajes, null, 2)};\n`;

    fs.writeFileSync(filePath, nuevoContenido, "utf8");

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al crear día:", err.message);
    res.status(500).json({ error: "No se pudo crear el día" });
  }
});








app.put("/api/scenes-personajes/:valor", (req, res) => {
  const valor = req.params.valor;
  const nuevosScenesPersonajes = req.body;

  try {
    const filePath = path.join(__dirname, "public", "personajes", `personajes-${valor}.js`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Archivo de personajes no encontrado" });
    }

    let contenidoArchivo = fs.readFileSync(filePath, "utf8");



    const dia = extraerArray("dia", contenidoArchivo);
    const dia_escena = extraerArray("dia_escena", contenidoArchivo);
    const mes = extraerArray("mes", contenidoArchivo);
    const scenes = extraerArray("scenes", contenidoArchivo);
    const PERSONAJES = extraerArray("PERSONAJES", contenidoArchivo);
    const scenes_Personajes = extraerArray("scenes_Personajes", contenidoArchivo);
    // 👉 No olvides que scenes_Personajes ahora lo actualizamos

    // ✨ Reconstruimos el archivo respetando el orden
    const nuevoContenido =
      `var PERSONAJES = ${JSON.stringify(PERSONAJES, null, 2)};\n\n` +
      `var scenes = ${JSON.stringify(scenes, null, 2)};\n\n` +
      `var dia_escena = ${JSON.stringify(dia_escena, null, 2)};\n\n` +
      `var dia = ${JSON.stringify(dia, null, 2)};\n\n` +
      `var mes = ${JSON.stringify(mes, null, 2)};\n\n` +
      `var scenes_Personajes = ${JSON.stringify(nuevosScenesPersonajes, null, 2)};\n`;

    fs.writeFileSync(filePath, nuevoContenido, "utf8");

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al guardar scenes_Personajes:", err.message);
    res.status(500).json({ error: "No se pudo guardar scenes_Personajes" });
  }
});















// === MUSIC ARTICULILLOS ===

const FILE_ARTICULILLOS = path.join(__dirname, "Public", "articulillos", "articulillos.js");
const FOLDER_IMAGENES_ARTICULILLOS = path.join(__dirname, "public", "articulillos", "ima");

fs.mkdirSync(FOLDER_IMAGENES_ARTICULILLOS, { recursive: true });
app.use('/articulillos/ima', express.static(FOLDER_IMAGENES_ARTICULILLOS));

function getArticulillos() {
  delete require.cache[require.resolve(FILE_ARTICULILLOS)];
  return require(FILE_ARTICULILLOS).data;
}

function guardarArticulillos(data) {
  const nodeContent = `const data = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_ARTICULILLOS, nodeContent, "utf8");
}

const storageArticulillos = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_IMAGENES_ARTICULILLOS),
  filename: (req, file, cb) => cb(null, `arti_${Date.now()}${path.extname(file.originalname)}`)
});
const uploadArticulillos = multer({ storage: storageArticulillos });

// GET
app.get("/api/articulillos", (req, res) => {
  try {
    res.json(getArticulillos());
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer articulillos.js" });
  }
});

// POST
app.post("/api/articulillos", uploadArticulillos.single("imagen"), (req, res) => {
  try {
    const data = getArticulillos();
    const { nombre, descripcion, departamento } = req.body;

    const nuevo = {
      id: Date.now(),
      nombre,
      descripcion,
      departamento: parseInt(departamento),
      imagen: req.file ? `/articulillos/ima/${req.file.filename}` : "/articulillos/ima/default.png"
    };

    data.push(nuevo);
    guardarArticulillos(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al crear articulillo" });
  }
});


app.put("/api/articulillos/:id", uploadArticulillos.single("imagen"), (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("🟡 Editando articulillo con ID:", id);

    const data = getArticulillos();
    console.log("🟡 Total articulillos cargados:", data.length);

    const index = data.findIndex(a => a.id === id);
    if (index === -1) {
      console.error("❌ No se encontró el articulillo con ID:", id);
      return res.status(404).json({ error: "No encontrado" });
    }

    const { nombre, descripcion, departamento } = req.body;
    console.log("🟡 Nuevos datos recibidos:", { nombre, descripcion, departamento });

    if (req.file) {
      console.log("🟢 Imagen subida:", req.file.filename);
    }

    data[index] = {
      ...data[index],
      nombre: nombre || data[index].nombre,
      descripcion: descripcion || data[index].descripcion,
      departamento: parseInt(departamento),
      ...(req.file && { imagen: `/articulillos/ima/${req.file.filename}` })
    };

    console.log("🟢 Articulillo actualizado:", data[index]);

    guardarArticulillos(data);
    console.log("✅ Articulillos guardados en disco");

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error inesperado en PUT /api/articulillos/:id", err);
    res.status(500).json({ error: "Error al editar articulillo" });
  }
});

// DELETE
app.delete("/api/articulillos/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getArticulillos();
    const nueva = data.filter(a => a.id !== id);
    guardarArticulillos(nueva);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar articulillo" });
  }
});
















////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// 🟡 CONFIGURACIÓN
// Rutas y carpetas
const FILE_SABEMOS = path.join(__dirname, "public", "sabemos", "sabemos.js"); // public en minúscula
const FOLDER_IMAGENES_SABEMOS = path.join(__dirname, "public", "sabemos", "ima");

fs.mkdirSync(FOLDER_IMAGENES_SABEMOS, { recursive: true });
app.use("/sabemos/ima", express.static(FOLDER_IMAGENES_SABEMOS));

/* ===========================
   Helpers de carga/guardado
   =========================== */
function getSabemos() {
  try {
    if (!fs.existsSync(FILE_SABEMOS)) return [];
    delete require.cache[require.resolve(FILE_SABEMOS)];
    // Puede exportar { data } o ser un JS con "const data = [...]"
    const mod = require(FILE_SABEMOS);
    if (Array.isArray(mod?.data)) return mod.data;

    // Lee como texto y “pela” const data = [...]
    let raw = fs.readFileSync(FILE_SABEMOS, "utf8");
    const m = raw.match(/const\s+data\s*=\s*(\[[\s\S]*?\]);?/);
    if (m && m[1]) return JSON.parse(m[1]);

    return [];
  } catch (e) {
    console.error("❌ getSabemos fallo:", e.message);
    return [];
  }
}

function guardarSabemos(data) {
  const nodeContent = `const data = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_SABEMOS, nodeContent, "utf8");
}

/* ===========================
   Multer (carga segura)
   =========================== */
// Evita "Identifier 'multer' has already been declared"
const multerLib = (() => {
  try { return multer; } catch { return require("multer"); }
})();

const STORAGE_DIR = FOLDER_IMAGENES_SABEMOS; // "public/sabemos/ima"

const storageSabemos = multerLib.diskStorage({
  destination: (req, file, cb) => cb(null, STORAGE_DIR),
  filename: (req, file, cb) => {
    const ext = file.originalname.includes(".")
      ? "." + file.originalname.split(".").pop()
      : "";
    const base = (file.originalname || "img").replace(/\.[^/.]+$/, "");
    const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const rand = Math.random().toString(36).slice(2, 7);
    cb(null, `${base}_${stamp}_${rand}${ext}`);
  }
});

function fileFilterSabemos(req, file, cb) {
  if (/^image\//.test(file.mimetype)) return cb(null, true);
  cb(new Error("Solo se permiten imágenes"));
}

const uploadSabemos = multerLib({
  storage: storageSabemos,
  fileFilter: fileFilterSabemos,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

/* ===========================
   Endpoints
   =========================== */
// GET - Leer todos
app.get("/api/sabemos", (req, res) => {
  try {
    const lista = getSabemos();
    return res.json(lista); // siempre un array
  } catch (err) {
    console.error("❌ /api/sabemos GET:", err);
    res.status(500).json({ error: "No se pudo leer sabemos.js" });
  }
});

// POST - Crear nuevo
app.post("/api/sabemos", uploadSabemos.single("imagen"), (req, res) => {
  try {
    const data = getSabemos();
    const { nombre, descripcion, departamento } = req.body;

    const nuevo = {
      id: Date.now(),
      nombre: nombre ?? "",
      descripcion: descripcion ?? "",
      departamento: parseInt(departamento ?? "0"),
      imagen: req.file ? `/sabemos/ima/${req.file.filename}` : "/sabemos/ima/default.png"
    };

    data.push(nuevo);
    guardarSabemos(data);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ /api/sabemos POST:", err);
    res.status(500).json({ error: "Error al crear artículo en 'sabemos'" });
  }
});

// PUT - Editar existente
app.put("/api/sabemos/:id", uploadSabemos.single("imagen"), (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getSabemos();
    const index = data.findIndex(a => parseInt(a.id) === id);
    if (index === -1) return res.status(404).json({ error: "No encontrado" });

    const { nombre, descripcion, departamento } = req.body;
    data[index] = {
      ...data[index],
      ...(nombre !== undefined && { nombre }),
      ...(descripcion !== undefined && { descripcion }),
      ...(departamento !== undefined && { departamento: parseInt(departamento) }),
      ...(req.file && { imagen: `/sabemos/ima/${req.file.filename}` })
    };

    guardarSabemos(data);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ /api/sabemos PUT:", err);
    res.status(500).json({ error: "Error al editar SABEMOS" });
  }
});

// DELETE - Eliminar
app.delete("/api/sabemos/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const lista = getSabemos();
    const item = lista.find(a => parseInt(a.id) === id);
    if (!item) return res.status(404).json({ error: "Artículo no encontrado" });

    // Borra imagen si pertenece a la carpeta (quita "/" inicial para path.join)
    if (item.imagen && item.imagen.startsWith("/sabemos/ima/")) {
      const rutaImg = path.join(__dirname, "public", item.imagen.replace(/^\//, ""));
      if (fs.existsSync(rutaImg)) fs.unlinkSync(rutaImg);
    }

    const nueva = lista.filter(a => parseInt(a.id) !== id);
    guardarSabemos(nueva);
    res.json({ success: true });
  } catch (e) {
    console.error("❌ /api/sabemos DELETE:", e);
    res.status(500).json({ error: "Error al eliminar artículo" });
  }
});





















/////////////////////////////////////////////////////////////
////// CONFIGURACIÓN PARA NOTITAS /////////////////////////////
/////////////////////////////////////////////////////////////

const FILE_NOTITAS = path.join(__dirname, "public", "cursos", "notitas", "notitas.js");
const FOLDER_IMAGENES_NOTITAS = path.join(__dirname, "public", "cursos", "notitas", "ima");

fs.mkdirSync(FOLDER_IMAGENES_NOTITAS, { recursive: true });
app.use('/notitas/ima', express.static(FOLDER_IMAGENES_NOTITAS));

app.put("/api/notitas/:id", upload.single("imagen"), (req, res) => {
  const id = parseInt(req.params.id);
  let notitas = getNotitas();

  const index = notitas.findIndex(n => n.id_notas === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Nota no encontrada" });
  }

  const { titulo, descripcion, etiqueta } = req.body;
  let imagen_url = notitas[index].imagen_url;

  if (req.file) {
    // Si hay nueva imagen, guardar y reemplazar la antigua
    const ext = path.extname(req.file.originalname);
    const nombreArchivo = `${Date.now()}${ext}`;
    const destino = path.join(FOLDER_IMAGENES_NOTITAS, nombreArchivo);
    fs.renameSync(req.file.path, destino);

    // Borra la imagen anterior
    const rutaVieja = path.join(__dirname, "public", notitas[index].imagen_url || "");
    if (fs.existsSync(rutaVieja)) {
      fs.unlinkSync(rutaVieja);
    }

    imagen_url = `/notitas/ima/${nombreArchivo}`;
  }

  // Actualizar datos
  notitas[index] = {
    ...notitas[index],
    titulo,
    descripcion,
    etiqueta,
    imagen_url
  };

  guardarNotitas(notitas);
  res.json({ success: true, nota: notitas[index] });
});

// Funciones auxiliares
function getNotitas() {
  if (!fs.existsSync(FILE_NOTITAS)) {
    guardarNotitas([]); // crear si no existe
  }
  delete require.cache[require.resolve(FILE_NOTITAS)];
  return require(FILE_NOTITAS).data;
}

app.post("/api/notitas", upload.single("imagen"), (req, res) => {
  const notitas = getNotitas();
  const nuevaId = notitas.length ? Math.max(...notitas.map(n => n.id_notas)) + 1 : 1;

  const { titulo, descripcion, etiqueta } = req.body;

  let imagen_url = "";
  if (req.file) {
    const ext = path.extname(req.file.originalname);
    const nombreArchivo = `${Date.now()}${ext}`;
    const destino = path.join(FOLDER_IMAGENES_NOTITAS, nombreArchivo);
    fs.renameSync(req.file.path, destino);
    imagen_url = `/notitas/ima/${nombreArchivo}`;
  }

  const nuevaNota = {
    id_notas: nuevaId,
    titulo,
    descripcion,
    etiqueta,
    imagen_url
  };

  notitas.push(nuevaNota);
  guardarNotitas(notitas);
  res.json({ success: true, nota: nuevaNota });
});

function guardarNotitas(data) {
  const nodeContent = `const data = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_NOTITAS, nodeContent, "utf8");
}




// Ruta GET
app.get("/api/notitas", (req, res) => {
  try {
    res.json(getNotitas());
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer notitas.js" });
  }
});

app.delete("/api/notitas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let notitas = getNotitas();
  const nota = notitas.find(n => n.id_notas === id);

  if (!nota) {
    return res.status(404).json({ success: false, message: "Nota no encontrada" });
  }

  // Eliminar imagen física si existe
  if (nota.imagen_url) {
    const imagenPath = path.join(__dirname, "public", nota.imagen_url);
    if (fs.existsSync(imagenPath)) {
      fs.unlinkSync(imagenPath);
    }
  }

  notitas = notitas.filter(n => n.id_notas !== id);
  guardarNotitas(notitas);
  res.json({ success: true });
});
















// ///////////////////////////////////////////////////////////
// 🔵 CONFIGURACIÓN: POR_QUE_CREHEMOS_EN_TONTERIAS
const FILE_TONTERIAS = path.join(__dirname, "Public", "tonterias", "tonterias.js");
const FOLDER_IMAGENES_TONTERIAS = path.join(__dirname, "public", "tonterias", "ima");

fs.mkdirSync(FOLDER_IMAGENES_TONTERIAS, { recursive: true });
app.use('/tonterias/ima', express.static(FOLDER_IMAGENES_TONTERIAS));

// 🔵 FUNCIONES AUXILIARES
function getTonterias() {
  delete require.cache[require.resolve(FILE_TONTERIAS)];
  return require(FILE_TONTERIAS).data;
}

function guardarTonterias(data) {
  const nodeContent = `const data = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_TONTERIAS, nodeContent, "utf8");
}

// 🔵 MULTER
const storageTonterias = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_IMAGENES_TONTERIAS),
  filename: (req, file, cb) => cb(null, `tont_${Date.now()}${path.extname(file.originalname)}`)
});
const uploadTonterias = multer({ storage: storageTonterias });

// 🔵 GET
app.get("/api/tonterias", (req, res) => {
  try {
    res.json(getTonterias());
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer tonterias.js" });
  }
});

// 🔵 POST
app.post("/api/tonterias", uploadTonterias.single("imagen"), (req, res) => {
  try {
    const data = getTonterias();
    const { nombre, descripcion, departamento } = req.body;

    const nuevo = {
      id: Date.now(),
      nombre,
      descripcion,
      departamento: parseInt(departamento),
      imagen: req.file ? `/tonterias/ima/${req.file.filename}` : "/tonterias/ima/default.png"
    };

    data.push(nuevo);
    guardarTonterias(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al crear artículo en 'tonterias'" });
  }
});

// 🔵 PUT
app.put("/api/tonterias/:id", uploadTonterias.single("imagen"), (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getTonterias();
    const index = data.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ error: "No encontrado" });

    const { nombre, descripcion, departamento } = req.body;

    data[index] = {
      ...data[index],
      nombre,
      descripcion,
      departamento: parseInt(departamento),
      ...(req.file && { imagen: `/tonterias/ima/${req.file.filename}` })
    };

    guardarTonterias(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al editar artículo en 'tonterias'" });
  }
});

// 🔵 DELETE
app.delete("/api/tonterias/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getTonterias();
    const nueva = data.filter(a => a.id !== id);
    guardarTonterias(nueva);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar artículo en 'tonterias'" });
  }
});



// DELETE
app.delete("/api/tonterias/:id", (req, res) => {
  try {
    const tonterias = getTonterias();
    const id = parseInt(req.params.id);
    const nuevas = tonterias.filter(t => t.id !== id);
    if (nuevas.length === tonterias.length) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }
    guardarTonterias(nuevas);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al eliminar tontería:", err.message);
    res.status(500).json({ error: "No se pudo eliminar el artículo" });
  }
});



























////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////
// 🔵 CONFIGURACIÓN: ENLACES
const FILE_ENLACES = path.join(__dirname, "Public", "reportaje" ,"enlaces", "enlace.js");

const FOLDER_IMAGENES_ENLACES = path.join(__dirname, "public", "reportaje" , "enlaces", "ima");

fs.mkdirSync(FOLDER_IMAGENES_ENLACES, { recursive: true });
app.use('/enlaces/ima', express.static(FOLDER_IMAGENES_ENLACES));

// 🔵 FUNCIONES AUXILIARES
function getEnlaces() {
  delete require.cache[require.resolve(FILE_ENLACES)];
  return require(FILE_ENLACES).enlaces || require(FILE_ENLACES).data;
}

function guardarEnlaces(data) {
  const contenido = `const enlaces = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { enlaces };`;
  fs.writeFileSync(FILE_ENLACES, contenido, "utf8");
}

// 🔵 MULTER
const storageEnlaces = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_IMAGENES_ENLACES),
  filename: (req, file, cb) => cb(null, `enlace_${Date.now()}${path.extname(file.originalname)}`)
});
const uploadEnlaces = multer({ storage: storageEnlaces });

// 🔵 GET
app.get("/api/enlaces", (req, res) => {
  try {
    const data = getEnlaces();
    console.log(data);
    res.json(getEnlaces());
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer enlace.js", detalles: err.message });
  }
});

// 🔵 POST
app.post("/api/enlaces", uploadEnlaces.single("imagen"), (req, res) => {
  try {
    const data = getEnlaces();
    const { nombre, url, tipo } = req.body;
    const nuevo = {
      id: Date.now(),
      nombre,
      url,
      tipo: parseInt(tipo),
      imagenref: req.file ? `/enlaces/ima/${req.file.filename}` : "/enlaces/ima/default.png"
    };
    data.push(nuevo);
    guardarEnlaces(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al crear enlace", detalles: err.message });
  }
});

// 🔵 PUT
app.put("/api/enlaces/:id", uploadEnlaces.single("imagen"), (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getEnlaces();
    const index = data.findIndex(e => e.id === id);
    if (index === -1) return res.status(404).json({ error: "Enlace no encontrado" });

    const { nombre, url, tipo } = req.body;
    data[index] = {
      ...data[index],
      nombre,
      url,
      tipo: parseInt(tipo),
      ...(req.file && { imagenref: `/enlaces/ima/${req.file.filename}` })
    };

    guardarEnlaces(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al editar enlace", detalles: err.message });
  }
});

// 🔵 DELETE
app.delete("/api/enlaces/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getEnlaces();
    const nueva = data.filter(e => e.id !== id);
    guardarEnlaces(nueva);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar enlace", detalles: err.message });
  }
});





////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

const FILE_STRONGMAN = path.join(__dirname, "public", "REPORTAJE", "strongman", "strongman.js");
const FOLDER_IMAGENES_STRONGMAN = path.join(__dirname, "public", "REPORTAJE", "strongman", "ima");



function getStrongman() {
  delete require.cache[require.resolve(FILE_STRONGMAN)];
  return require(FILE_STRONGMAN).data;
}

function guardarStrongman(data) {
  const contenido = `const data = ${JSON.stringify(data, null, 2)};

module.exports = { data };\n`;
  fs.writeFileSync(FILE_STRONGMAN, contenido, "utf8");
}

// Multer configuración para subida
const storageStrongman = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_IMAGENES_STRONGMAN),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `ima (${Date.now()})${ext}`);
  }
});

const uploadStrongman = multer({ storage: storageStrongman });

// Obtener todos
app.get("/api/strongman", (req, res) => {
  try {
    const datos = getStrongman(); // asegúrate que `data` es un array
    res.json(datos); // no devuelvas { data } sino directamente data
  } catch (err) {
    console.error("Error al leer strongman.js:", err);
    res.status(500).json({ error: "No se pudo leer strongman.js" });
  }
});

// Guardar todo (PUT masivo sin imagen)
app.put("/api/strongman", (req, res) => {
  try {
    guardarStrongman(req.body);
    res.json({ success: true });
  } catch (err) {
    console.error("Error al guardar:", err);
    res.status(500).json({ error: "No se pudo guardar strongman.js" });
  }
});

// Crear artículo con imagen (POST)
app.post("/api/strongman", uploadStrongman.single("imagen"), (req, res) => {
  try {
    const Titulo = req.body.Titulo || "";
    const Etiqueta = req.body.Etiqueta || "";
    const Contenido = req.body.Contenido || "";
    const data = getStrongman();
    const nuevo = {
      id_strong: Date.now(),
      Titulo,
      Etiqueta,
      Contenido,
      imagen_url: req.file ? `/reportaje/strongman/ima/${req.file.filename}` : "/reportaje/strongman/ima/default.png"
    };
    data.push(nuevo);
    guardarStrongman(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "No se pudo añadir artículo", detalles: err.message });
  }
});

// Editar artículo con imagen (PUT por ID)
app.put("/api/strongman/:id", uploadStrongman.single("imagen"), (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { Titulo, Etiqueta, Contenido } = req.body;
    const data = getStrongman();
    const index = data.findIndex(item => item.id_strong === id);
    if (index === -1) return res.status(404).json({ error: "Artículo no encontrado" });

    data[index] = {
      ...data[index],
      Titulo,
      Etiqueta,
      Contenido,
      ...(req.file && { imagen_url: `/reportaje/strongman/ima/${req.file.filename}` })
    };

    guardarStrongman(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al editar artículo", detalles: err.message });
  }
});


// Eliminar artículo por ID
app.delete("/api/strongman/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = getStrongman();
    const nuevaData = data.filter(item => item.id_strong !== id);
    guardarStrongman(nuevaData);
    res.json({ success: true });
  } catch (err) {
    console.error("Error al eliminar artículo:", err);
    res.status(500).json({ error: "No se pudo eliminar el artículo" });
  }
});










// /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const FILE_MANGAS = path.join(__dirname, "Public", "mangasdepago", "mangasdepago.js");
const FOLDER_IMAGENES_MANGAS = path.join(__dirname, "public", "mangasdepago", "ima");

fs.mkdirSync(FOLDER_IMAGENES_MANGAS, { recursive: true });
app.use('/mangasdepago/ima', express.static(FOLDER_IMAGENES_MANGAS));

// 🧠 FUNCIONES
function getMangas() {
  delete require.cache[require.resolve(FILE_MANGAS)];
  return require(FILE_MANGAS).data;
}

function guardarMangas(data) {
  const nodeContent = `const data = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_MANGAS, nodeContent, "utf8");
}

// 📥 MULTER
const storageMangas = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_IMAGENES_MANGAS),
  filename: (req, file, cb) => cb(null, `manga_${Date.now()}${path.extname(file.originalname)}`)
});
const uploadMangas = multer({ storage: storageMangas });

// 📤 GET
app.get("/api/mangas", (req, res) => {
  try {
    res.json(getMangas());
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer mangasdepago.js" });
  }
});

// 📥 POST
app.post("/api/mangas", uploadMangas.single("imagen"), (req, res) => {
  try {
    const data = getMangas();
    const { nombre, cual_es_mi_ultimo, Cuantos_hay, precio, estreno_proximo } = req.body;

    const nuevo = {
      id: Date.now(),
      nombre,
      cual_es_mi_ultimo: parseInt(cual_es_mi_ultimo),
      Cuantos_hay: parseInt(Cuantos_hay),
      precio: parseFloat(precio),
      estreno_proximo: estreno_proximo || null,
      imagen: req.file ? `/mangasdepago/ima/${req.file.filename}` : "/mangasdepago/ima/default.png"
    };

    data.push(nuevo);
    guardarMangas(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al crear manga" });
  }
});

// 🔁 PUT
app.put("/api/mangas/:id", uploadMangas.single("imagen"), (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getMangas();
    const index = data.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ error: "No encontrado" });

    const { nombre, cual_es_mi_ultimo, Cuantos_hay, precio, estreno_proximo } = req.body;

    data[index] = {
      ...data[index],
      nombre,
      cual_es_mi_ultimo: parseInt(cual_es_mi_ultimo),
      Cuantos_hay: parseInt(Cuantos_hay),
      precio: parseFloat(precio),
      estreno_proximo: estreno_proximo || null,
      ...(req.file && { imagen: `/mangasdepago/ima/${req.file.filename}` })
    };

    guardarMangas(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al editar manga" });
  }
});

// ❌ DELETE
app.delete("/api/mangas/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getMangas();
    const nueva = data.filter(a => a.id !== id);
    guardarMangas(nueva);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar manga" });
  }
});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////



// Archivos y carpetas
const FILE_OBRAS = path.join(__dirname, "public", "REPORTAJE", "obras", "obras.js");
const FOLDER_IMAGENES_OBRAS = path.join(__dirname, "public", "REPORTAJE", "obras", "ima");
// ✅ Configurar Multer para guardar imágenes en /public/ima
const storageobras = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_IMAGENES_OBRAS),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  }
});
const uploadobras = multer({ storage: storageobras });

// ✅ Función para obtener obras
function getObras() {
  delete require.cache[require.resolve(FILE_OBRAS)];
  return require(FILE_OBRAS).obras;
}

// ✅ Función para guardar obras
function saveObras(obras) {
  const contenido = `const obras = ${JSON.stringify(obras, null, 2)};\n\nmodule.exports = { obras };`;
  fs.writeFileSync(FILE_OBRAS, contenido, "utf-8");
}

// ✅ GET todas las obras
app.get("/api/obras", (req, res) => {
  try {
    const obras = getObras();
    res.json(obras);
  } catch (err) {
    console.error("Error al obtener obras:", err);
    res.status(500).json({ error: "No se pudo leer obras.js" });
  }
});

// ✅ POST nueva obra
app.post("/api/obras", uploadobras.single("imagen"), (req, res) => {
  try {
    const obras = getObras();
    const { nombre, autor, descripcion } = req.body;
    const id = Date.now().toString().trim();
const img = req.file ? `REPORTAJE/obras/ima/${req.file.filename}` : "REPORTAJE/obras/ima/default.png";

    obras.push({ id, nombre, autor, descripcion, img });
    saveObras(obras);

    res.json({ mensaje: "Obra añadida con éxito" });
  } catch (err) {
    console.error("Error al añadir obra:", err);
    res.status(500).json({ error: "Error al añadir obra" });
  }
});

// ✅ PUT editar obra
app.put("/api/obras/:id", uploadobras.single("imagen"), (req, res) => {
  console.log("🔎 Campos recibidos:", req.body);
  console.log("🔎 Archivo recibido:", req.file);

  try {
    const obras = getObras();
    const { id } = req.params;
    const { nombre, autor, descripcion } = req.body;

    // 🔥 Comparar ID como string
    const index = obras.findIndex(o => String(o.id) === String(id));
    if (index === -1) return res.status(404).json({ error: "Obra no encontrada" });

    obras[index].nombre = nombre;
    obras[index].autor = autor;
    obras[index].descripcion = descripcion;

    if (req.file) {
      const rutaAnterior = path.join(__dirname, "public", obras[index].img);
      if (fs.existsSync(rutaAnterior) && obras[index].img !== "ima/default.png") {
        fs.unlinkSync(rutaAnterior); // 🔥 Elimina la imagen anterior si no es la default
      }
      obras[index].img = `ima/${req.file.filename}`;
    }

    saveObras(obras);
    res.json({ mensaje: "Obra actualizada con éxito" });
  } catch (err) {
    console.error("Error al editar obra:", err);
    res.status(500).json({ error: "Error al editar obra" });
  }
});

// ✅ DELETE obra por ID
app.delete("/api/obras/:id", (req, res) => {
  try {
    const obras = getObras();
    const { id } = req.params;
    const nuevas = obras.filter(o => String(o.id) !== String(id));
    if (nuevas.length === obras.length) return res.status(404).json({ error: "Obra no encontrada" });

    saveObras(nuevas);
    res.json({ mensaje: "Obra eliminada con éxito" });
  } catch (err) {
    console.error("Error al eliminar obra:", err);
    res.status(500).json({ error: "Error al eliminar obra" });
  }
});


// === SERVER ===



const FILE_PELICULAS = path.join(__dirname, "public", "REPORTAJE", "Peliculas", "peliculas.js");
const FOLDER_IMAGENES_PELICULAS = path.join(__dirname, "public", "REPORTAJE", "peliculas", "ima");

// Servir imágenes
app.use("/REPORTAJE/peliculas/ima", express.static(FOLDER_IMAGENES_PELICULAS));

// Multer
const storagePeliculas = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_IMAGENES_PELICULAS),
  filename: (req, file, cb) => cb(null, `pelicula_${Date.now()}.png`)
});
const uploadPeliculas = multer({ storage: storagePeliculas });

// Leer archivo
function getPeliculas() {
  delete require.cache[require.resolve(FILE_PELICULAS)];
  return require(FILE_PELICULAS).data;
}

// Guardar archivo
function guardarPeliculas(data) {
  const contenido = `const data = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_PELICULAS, contenido, "utf8");
}

// === Rutas API ===

// GET
app.get("/api/peliculas", (req, res) => {
  try {
    const data = getPeliculas();
    res.json(data);
  } catch (err) {
    console.error("❌ Error leyendo películas:", err);
    res.status(500).json({ error: "No se pudo leer peliculas.js", detalle: err.message });
  }
});

// POST
app.post("/api/peliculas", uploadPeliculas.single("imagen"), (req, res) => {
  try {
    const { Titulo, Etiqueta, Contenido } = req.body;
    const data = getPeliculas();

    const nuevo = {
      id_peliculas: Date.now(),
      Titulo,
      Etiqueta,
      descripcion: Contenido,
      img: req.file ? `REPORTAJE/peliculas/ima/${req.file.filename}` : "REPORTAJE/peliculas/ima/default.png"
    };

    data.push(nuevo);
    guardarPeliculas(data);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error creando película:", err);
    res.status(500).json({ error: "Error al crear película", detalle: err.message });
  }
});

// PUT
app.put("/api/peliculas/:id", uploadPeliculas.single("imagen"), (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { Titulo, Etiqueta, Contenido } = req.body;
    const data = getPeliculas();
    const index = data.findIndex(p => p.id_peliculas === id);

    if (index === -1) return res.status(404).json({ error: "Película no encontrada" });

    data[index] = {
      ...data[index],
      Titulo,
      Etiqueta,
      descripcion: Contenido,
      ...(req.file && { img: `peliculas/ima/${req.file.filename}` })
    };

    guardarPeliculas(data);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error editando película:", err);
    res.status(500).json({ error: "Error al editar película", detalle: err.message });
  }
});



// DELETE /api/peliculas/:id
app.delete("/api/peliculas/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = getPeliculas();

    // 1) Busca el objeto que vas a borrar
    const item = data.find(p => p.id_peliculas === id);
    if (item) {
      // 2) Construye la ruta absoluta al fichero de imagen
      const imagenPath = path.join(
        FOLDER_IMAGENES_PELICULAS,
        path.basename(item.img)
      );

      // 3) Si existe, elimínala
      if (fs.existsSync(imagenPath)) {
        fs.unlinkSync(imagenPath);
      }
    }

    // 4) Filtra el array y guarda los cambios
    const nuevaData = data.filter(p => p.id_peliculas !== id);
    guardarPeliculas(nuevaData);

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error en DELETE /api/peliculas/:id:", err);
    res.status(500).json({ error: "No se pudo eliminar la película" });
  }
});












/////////////////////////////////////////////////////////////
// CONFIGURACIÓN PARA MISTERIOS
/////////////////////////////////////////////////////////////

const FILE_MISTERIOS = path.join(__dirname, "public", "Misterios", "misterios", "misterios.js");
const FOLDER_IMAGENES_MISTERIOS = path.join(__dirname, "public", "Misterios", "misterios", "ima");
fs.mkdirSync(FOLDER_IMAGENES_MISTERIOS, { recursive: true });
app.use('/misterios/ima', express.static(FOLDER_IMAGENES_MISTERIOS));

function getMisterios() {
  if (!fs.existsSync(FILE_MISTERIOS)) guardarMisterios([]);
  delete require.cache[require.resolve(FILE_MISTERIOS)];
  return require(FILE_MISTERIOS).data;
}

function guardarMisterios(data) {
  const contenido = `const data = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_MISTERIOS, contenido, "utf8");
}

app.get("/api/misterios", (req, res) => {
  try {
    res.json(getMisterios());
  } catch {
    res.status(500).json({ error: "No se pudo leer misterios.js" });
  }
});

app.post("/api/misterios", upload.single("imagen"), (req, res) => {
  const misterios = getMisterios();
  const nuevaId = misterios.length ? Math.max(...misterios.map(n => n.id_notas)) + 1 : 1;
  const { titulo, descripcion, etiqueta } = req.body;

  let imagen_url = "";
  if (req.file) {
    const ext = path.extname(req.file.originalname);
    const nombreArchivo = `${Date.now()}${ext}`;
    const destino = path.join(FOLDER_IMAGENES_MISTERIOS, nombreArchivo);
    fs.renameSync(req.file.path, destino);
    imagen_url = `/misterios/ima/${nombreArchivo}`;
  }

  const nuevaNota = {
    id_notas: nuevaId,
    titulo,
    descripcion,
    etiqueta,
    imagen_url
  };

  misterios.push(nuevaNota);
  guardarMisterios(misterios);
  res.json({ success: true, nota: nuevaNota });
});

app.put("/api/misterios/:id", upload.single("imagen"), (req, res) => {
  const id = parseInt(req.params.id);
  let misterios = getMisterios();

  const index = misterios.findIndex(n => n.id_notas === id);
  if (index === -1) return res.status(404).json({ success: false, message: "Nota no encontrada" });

  const { titulo, descripcion, etiqueta } = req.body;
  let imagen_url = misterios[index].imagen_url;

  if (req.file) {
    const ext = path.extname(req.file.originalname);
    const nombreArchivo = `${Date.now()}${ext}`;
    const destino = path.join(FOLDER_IMAGENES_MISTERIOS, nombreArchivo);
    fs.renameSync(req.file.path, destino);

    const rutaVieja = path.join(__dirname, "public", misterios[index].imagen_url || "");
    if (fs.existsSync(rutaVieja)) fs.unlinkSync(rutaVieja);

    imagen_url = `/misterios/ima/${nombreArchivo}`;
  }

  misterios[index] = {
    ...misterios[index],
    titulo,
    descripcion,
    etiqueta,
    imagen_url
  };

  guardarMisterios(misterios);
  res.json({ success: true, nota: misterios[index] });
});

app.delete("/api/misterios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let misterios = getMisterios();
  const nota = misterios.find(n => n.id_notas === id);

  if (!nota) return res.status(404).json({ success: false, message: "Nota no encontrada" });

  if (nota.imagen_url) {
    const imagenPath = path.join(__dirname, "public", nota.imagen_url);
    if (fs.existsSync(imagenPath)) fs.unlinkSync(imagenPath);
  }

  misterios = misterios.filter(n => n.id_notas !== id);
  guardarMisterios(misterios);
  res.json({ success: true });
});



/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

const FILE_INFLUENCIAS = path.join(__dirname, "public", "influencias", "influencias.js");

function getInfluencias() {
  delete require.cache[require.resolve(FILE_INFLUENCIAS)];
  return require(FILE_INFLUENCIAS).data;
}

function guardarInfluencias(data) {
  const contenido = `const data = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_INFLUENCIAS, contenido, "utf8");
}

app.get("/api/influencias", (req, res) => {
  try {
    res.json(getInfluencias());
  } catch {
    res.status(500).json({ error: "No se pudo leer influencias.js" });
  }
});

app.post("/api/influencias", (req, res) => {
  try {
    const data = getInfluencias();
    const { name, category } = req.body;
    const nuevo = { id: Date.now(), name, category };
    data.push(nuevo);
    guardarInfluencias(data);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Error al crear influencia" });
  }
});

app.put("/api/influencias/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getInfluencias();
    const index = data.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ error: "No encontrado" });

    const { name, category } = req.body;
    data[index] = { ...data[index], name, category };
    guardarInfluencias(data);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Error al editar influencia" });
  }
});

app.delete("/api/influencias/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getInfluencias();
    const nueva = data.filter(i => i.id !== id);
    guardarInfluencias(nueva);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Error al eliminar influencia" });
  }
});



// === XAVIER ===
const FILE_XAVIER = path.join(__dirname, "public", "xavier", "xavier.js");

function getXavier() {
  delete require.cache[require.resolve(FILE_XAVIER)];
  return require(FILE_XAVIER).data;
}

function guardarXavier(data) {
  const contenido = `const data = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_XAVIER, contenido, "utf8");
}

app.get("/api/xavier", (req, res) => {
  try {
    res.json(getXavier());
  } catch {
    res.status(500).json({ error: "No se pudo leer xavier.js" });
  }
});

app.post("/api/xavier", (req, res) => {
  try {
    const data = getXavier();
    const { nombre, tipo, descripcion, link, comentarios } = req.body;
    const maxId = data.length ? Math.max(...data.map(i => i.id)) : 0;
    const nuevo = {
      id: maxId + 1,
      nombre,
      tipo,
      descripcion,
      link,
      comentarios
    };
    data.push(nuevo);
    guardarXavier(data);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Error al crear entrada de xavier" });
  }
});

app.put("/api/xavier/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getXavier();
    const index = data.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ error: "No encontrado" });

    const { nombre, tipo, descripcion, link, comentarios } = req.body;
    data[index] = { ...data[index], nombre, tipo, descripcion, link, comentarios };
    guardarXavier(data);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Error al editar entrada de xavier" });
  }
});

app.delete("/api/xavier/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = getXavier();
    const nueva = data.filter(i => i.id !== id);
    guardarXavier(nueva);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Error al eliminar entrada de xavier" });
  }
});










const FOLDER_MUSIC = path.join(__dirname, "public", "inteligencias", "musica", "ima");
const FILE_MUSIC = path.join(__dirname, "public", "inteligencias", "musica", "galeria_IA_musica.js");

fs.mkdirSync(FOLDER_MUSIC, { recursive: true });



function getMusica() {
  delete require.cache[require.resolve(FILE_MUSIC)];
  return require(FILE_MUSIC).Inteligencia;
}

function guardarMusica(data) {
  const contenido = `const Inteligencia = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = { Inteligencia };`;
  fs.writeFileSync(FILE_MUSIC, contenido, "utf8");
}

app.use(express.static("public"));
app.use(express.json());

// === RUTAS ===
app.get("/api/galeria-musica", (req, res) => {
  try {
    res.json(getMusica());
  } catch {
    res.status(500).json({ error: "No se pudo leer galeria_IA_musica.js" });
  }
});

app.post("/api/galeria-musica", upload.fields([{ name: "img" }, { name: "mp4" }]), (req, res) => {
  try {
    const data = getMusica();
    const { titulo, etiqueta, texto } = req.body;

    const destinoBase = path.join(__dirname, "public", "inteligencias", "musica", "ima");
    fs.mkdirSync(destinoBase, { recursive: true });

    const moverArchivo = (archivo) => {
      const nombreArchivo = path.basename(archivo.path);
      const destino = path.join(destinoBase, nombreArchivo);
      fs.renameSync(archivo.path, destino);

      // Ruta relativa web-friendly: sin "public/", con slashes normales
      return destino
        .replace(path.join(__dirname, "public"), "") // quita la parte absoluta
        .replace(/\\/g, "/")                         // normaliza slashes para Windows
        .replace(/^\/+/, "");                        // quita el slash inicial si existe
    };

    const img = req.files["img"]?.[0] ? moverArchivo(req.files["img"][0]) : "";
    const mp4 = req.files["mp4"]?.[0] ? moverArchivo(req.files["mp4"][0]) : "";


    const nuevo = {
      id: Date.now(),
      titulo,
      etiqueta,
      texto,
      img,
      mp4
    };
    data.push(nuevo);
    guardarMusica(data);
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al insertar" });
  }
});

app.put("/api/galeria-musica/:id", upload.fields([{ name: "img" }, { name: "mp4" }]), (req, res) => {
  try {
    const data = getMusica();
    const id = parseInt(req.params.id);
    const index = data.findIndex(e => e.id === id);
    if (index === -1) return res.status(404).json({ error: "No encontrado" });

    const { titulo, etiqueta, texto } = req.body;
    const img = req.files["img"]?.[0]?.path.replace("public/", "") || data[index].img;
    const mp4 = req.files["mp4"]?.[0]?.path.replace("public/", "") || data[index].mp4;

    data[index] = { ...data[index], titulo, etiqueta, texto, img, mp4 };
    guardarMusica(data);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Error al editar" });
  }
});

app.delete("/api/galeria-musica/:id", (req, res) => {
  try {
    const data = getMusica();
    const id = parseInt(req.params.id);
    const nuevo = data.filter(e => e.id !== id);
    guardarMusica(nuevo);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Error al eliminar" });
  }
});




//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

function getRuta(valor) {
  return path.join(__dirname, 'Public', 'personajes', `personajes-${valor}.js`);
}

function getCarpetaImagenes(valor) {
  return path.join(__dirname, 'public', 'ima', valor);
}

// Cargar el archivo JS sin cache
function cargarPersonajesGaleria(valor) {
  const archivo = getRuta(valor);

  console.log('archivo', archivo);

  if (!fs.existsSync(archivo)) {
    console.log('No Existe archivo');
    return [];
  }

  try {
    delete require.cache[require.resolve(archivo)];
    const modulo = require(archivo);
    return Array.isArray(modulo.Personajes_galeria) ? modulo.Personajes_galeria : [];
  } catch (err) {
    console.warn("⚠️ Error cargando galería:", err.message);
    return [];
  }
}

// Guardar los datos como JS
function guardarPersonajesGaleria(valor, data) {
  const archivo = getRuta(valor);
  const nuevoValor = `var Personajes_galeria = ${JSON.stringify(data, null, 2)};`;

  let contenido = fs.readFileSync(archivo, 'utf8');

  if (contenido.includes('var Personajes_galeria =')) {
    // Reemplaza solo la parte de la variable
    contenido = contenido.replace(
      /var Personajes_galeria = [\s\S]*?;\n/,
      nuevoValor + '\n'
    );
  } else {
    // Si no existe la variable, la agrega arriba
    contenido = nuevoValor + '\n\n' + contenido;
  }

  fs.writeFileSync(archivo, contenido, 'utf8');
}


app.post('/api/galeria/:valor', upload.array('imagenes'), (req, res) => {
  const { valor } = req.params;
  const id_Personaje = parseInt(req.body.id_Personaje);
  const estilos = JSON.parse(req.body.estilos); // Viene como array
  const imagenes = req.files;

  if (!id_Personaje || !imagenes || imagenes.length === 0) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const destinoDir = path.join(__dirname, 'public', 'ima', valor);
  if (!fs.existsSync(destinoDir)) {
    fs.mkdirSync(destinoDir, { recursive: true });
  }

  const galeria = cargarPersonajesGaleria(valor);

  const nuevos = imagenes.map((img, i) => {
    const destino = path.join(destinoDir, img.filename);
    fs.renameSync(img.path, destino); // mueve de /tmp a /ima/valor

    return {
      id: Date.now() + i,
      id_Personaje,
      url_imagen: `/ima/${valor}/${img.filename}`,
      estilo: estilos[i] || 'sin estilo'
    };
  });

  galeria.push(...nuevos);
  guardarPersonajesGaleria(valor, galeria);

  res.json({ mensaje: 'Imágenes guardadas', nuevos });
});





















// === ACTORES & GRABACIONES (Actor_y_pelis.js) ===
// === ACTORES & GRABACIONES (actores_y_pelis.js) ===
// Ajusta el nombre del archivo a tu estructura real:
// === ACTORES & GRABACIONES (actores_y_pelis.js) ===
// Usa la ruta real del archivo con los arrays
const FILE_ACTORES_GRAB = path.join(__dirname, "public", "actores_y_pelis.js");

// ---------- Helpers para leer/escribir los arrays ----------
function extraerArrayFlexible(nombre, contenidoArchivo) {
  const regex = new RegExp(`(var|let|const)\\s+${nombre}\\s*=\\s*(\\[[\\s\\S]*?\\]);`);
  const match = contenidoArchivo.match(regex);
  if (!match) throw new Error(`No se encontró el array ${nombre}`);
  try {
    return JSON.parse(match[2]);
  } catch {
    // Fallback por si hay comentarios o trailing commas
    return new Function(`return ${match[2]}`)();
  }
}

function reemplazarArrayFlexible(nombre, contenidoArchivo, nuevoArray) {
  const regex = new RegExp(`(var|let|const)\\s+${nombre}\\s*=\\s*(\\[[\\s\\S]*?\\]);`);
  const match = contenidoArchivo.match(regex);
  if (!match) throw new Error(`No se encontró el array ${nombre} para reemplazar`);
  const declarador = match[1]; // var | let | const
  const nuevoTexto = `${declarador} ${nombre} = ${JSON.stringify(nuevoArray, null, 2)};`;
  return contenidoArchivo.replace(regex, nuevoTexto);
}

function leerActoresGrab() {
  if (!fs.existsSync(FILE_ACTORES_GRAB)) {
    const base = `const ACTORES = [];\n\nconst GRABACIONES = [];\n`;
    fs.writeFileSync(FILE_ACTORES_GRAB, base, "utf8");
  }
  const contenido = fs.readFileSync(FILE_ACTORES_GRAB, "utf8");
  const ACTORES = extraerArrayFlexible("ACTORES", contenido);
  const GRABACIONES = extraerArrayFlexible("GRABACIONES", contenido);
  return { contenido, ACTORES, GRABACIONES };
}

function guardarActoresGrab(nuevosActores, nuevasGrabaciones) {
  let { contenido } = leerActoresGrab();
  if (Array.isArray(nuevosActores)) {
    contenido = reemplazarArrayFlexible("ACTORES", contenido, nuevosActores);
  }
  if (Array.isArray(nuevasGrabaciones)) {
    contenido = reemplazarArrayFlexible("GRABACIONES", contenido, nuevasGrabaciones);
  }
  fs.writeFileSync(FILE_ACTORES_GRAB, contenido, "utf8");
}

// ---------- Subida de imágenes para actores (usa el multer ya cargado arriba) ----------
const dirImagenesActores = path.join(__dirname, "public", "actores", "ima");
if (!fs.existsSync(dirImagenesActores)) fs.mkdirSync(dirImagenesActores, { recursive: true });

const sanitizeNombre = (s) =>
  String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_");

const storageActores = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, dirImagenesActores),
  filename: (_req, file, cb) => {
    const ext = (file.originalname.match(/\.[a-z0-9]+$/i) || [""])[0] || ".png";
    const base = file.originalname.replace(ext, "");
    cb(null, `${Date.now()}_${sanitizeNombre(base)}${ext}`);
  },
});
const uploadActores = multer({ storage: storageActores });

// Sube archivo y devuelve URL pública: /actores/ima/<fichero>
app.post("/api/upload/actor", uploadActores.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file" });
    const url = `/actores/ima/${req.file.filename}`;
    res.json({ success: true, url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ---------- ENDPOINTS ACTORES ----------
app.get("/api/actores", (req, res) => {
  try {
    const { ACTORES } = leerActoresGrab();
    res.json(ACTORES);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/actores", (req, res) => {
  try {
    const { ACTORES, GRABACIONES } = leerActoresGrab();
    const { nombre, imagen = "" } = req.body;
    if (!nombre) return res.status(400).json({ error: "Falta 'nombre'" });
    const id = (ACTORES.length ? Math.max(...ACTORES.map(a => a.id)) : 0) + 1;
    ACTORES.push({ id, nombre, imagen });
    guardarActoresGrab(ACTORES, GRABACIONES);
    res.json({ success: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/actores/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, imagen } = req.body;
    const { ACTORES, GRABACIONES } = leerActoresGrab();
    const idx = ACTORES.findIndex(a => a.id === id);
    if (idx === -1) return res.status(404).json({ error: "Actor no encontrado" });

    ACTORES[idx] = {
      ...ACTORES[idx],
      ...(nombre != null ? { nombre } : {}),
      ...(imagen != null ? { imagen } : {}),
    };
    guardarActoresGrab(ACTORES, GRABACIONES);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/actores/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    let { ACTORES, GRABACIONES } = leerActoresGrab();
    const existe = ACTORES.some(a => a.id === id);
    if (!existe) return res.status(404).json({ error: "Actor no encontrado" });
    ACTORES = ACTORES.filter(a => a.id !== id);
    // borra también sus grabaciones
    GRABACIONES = GRABACIONES.filter(g => Number(g.id_actor) !== id);
    guardarActoresGrab(ACTORES, GRABACIONES);
    res.json({ success: true, borradasGrab: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ---------- ENDPOINTS GRABACIONES ----------
app.get("/api/grabaciones", (req, res) => {
  try {
    const { GRABACIONES } = leerActoresGrab();
    res.json(GRABACIONES);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Filtrar por actor: /api/grabaciones/by-actor/1  o  ?actor=1
app.get("/api/grabaciones/by-actor/:idActor?", (req, res) => {
  try {
    const idActor = Number(req.params.idActor ?? req.query.actor);
    const { GRABACIONES } = leerActoresGrab();
    if (isNaN(idActor)) return res.status(400).json({ error: "Falta 'idActor' o '?actor='" });
    res.json(GRABACIONES.filter(g => Number(g.id_actor) === idActor));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/grabaciones", (req, res) => {
  try {
    const { ACTORES, GRABACIONES } = leerActoresGrab();
    const { nombre, Revisado = "0", id_actor } = req.body;
    if (!nombre) return res.status(400).json({ error: "Falta 'nombre'" });
    if (id_actor == null) return res.status(400).json({ error: "Falta 'id_actor'" });
    const actorExiste = ACTORES.some(a => a.id === Number(id_actor));
    if (!actorExiste) return res.status(400).json({ error: "id_actor no válido" });

    const id = (GRABACIONES.length ? Math.max(...GRABACIONES.map(g => g.id)) : 0) + 1;
    GRABACIONES.push({ id, nombre, Revisado: String(Revisado) === "1" ? "1" : "0", id_actor: Number(id_actor) });
    guardarActoresGrab(ACTORES, GRABACIONES);
    res.json({ success: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/grabaciones/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { ACTORES, GRABACIONES } = leerActoresGrab();
    const idx = GRABACIONES.findIndex(g => g.id === id);
    if (idx === -1) return res.status(404).json({ error: "Grabación no encontrada" });

    const { nombre, Revisado, id_actor } = req.body;
    if (id_actor != null && !ACTORES.some(a => a.id === Number(id_actor))) {
      return res.status(400).json({ error: "id_actor no válido" });
    }

    GRABACIONES[idx] = {
      ...GRABACIONES[idx],
      ...(nombre != null ? { nombre } : {}),
      ...(Revisado != null ? { Revisado: String(Revisado) === "1" ? "1" : "0" } : {}),
      ...(id_actor != null ? { id_actor: Number(id_actor) } : {})
    };

    guardarActoresGrab(ACTORES, GRABACIONES);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/grabaciones/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { ACTORES, GRABACIONES } = leerActoresGrab();
    const existe = GRABACIONES.some(g => g.id === id);
    if (!existe) return res.status(404).json({ error: "Grabación no encontrada" });
    const nuevas = GRABACIONES.filter(g => g.id !== id);
    guardarActoresGrab(ACTORES, nuevas);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/grabaciones/:id/toggle", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { ACTORES, GRABACIONES } = leerActoresGrab();
    const idx = GRABACIONES.findIndex(g => g.id === id);
    if (idx === -1) return res.status(404).json({ error: "Grabación no encontrada" });
    GRABACIONES[idx].Revisado = GRABACIONES[idx].Revisado === "1" ? "0" : "1";
    guardarActoresGrab(ACTORES, GRABACIONES);
    res.json({ success: true, Revisado: GRABACIONES[idx].Revisado });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});











// Sirve /public y, en concreto, /Geopolitica/*

// ----------------- estáticos -----------------
const PUBLIC_DIR = path.join(__dirname, "public");
app.use(express.static(PUBLIC_DIR)); // sirve /  -> public/*
app.use("/Geopolitica", express.static(path.join(PUBLIC_DIR, "Geopolitica"))); // alias
app.use("/geopolitica", express.static(path.join(PUBLIC_DIR, "Geopolitica"))); // alias minúsculas
// (con lo anterior /Geopolitica/ima/* y /Geopolitica/videos/* quedan servidos)

// ----------------- persistencia -----------------
const DATA_DIR = path.join(__dirname, "data");
fs.mkdirSync(DATA_DIR, { recursive: true });

const PAISES_FILE   = path.join(DATA_DIR, "paises.json");
const NOTICIAS_FILE = path.join(DATA_DIR, "noticias.json");

// crea archivos vacíos si no existen (sin semillas)
function ensureFile(file) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
}
ensureFile(PAISES_FILE);
ensureFile(NOTICIAS_FILE);

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch { return []; }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ----------------- helpers -----------------
function nextId(list) {
  return list.length ? Math.max(...list.map(x => Number(x.id) || 0)) + 1 : 1;
}
function getPaisIdFromNoticia(n) {
  // soporta registros antiguos con id_actor
  return n.id_Pais != null ? Number(n.id_Pais)
       : n.id_actor != null ? Number(n.id_actor)
       : null;
}
const normalizeImagePath = (p) =>
  p ? ("/" + String(p).replace(/^\/+/, "").replaceAll("\\", "/")) : undefined;

// ----------------- subida de imágenes (país) -----------------
// Usamos nombres únicos para no chocar con otros multer del proyecto
const multerGeo = require("multer");
const GEO_IMA_DIR = path.join(PUBLIC_DIR, "Geopolitica", "ima");
fs.mkdirSync(GEO_IMA_DIR, { recursive: true });

const sanitize = (s) =>
  String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_");

const storageGeo = multerGeo.diskStorage({
  destination: (_req, _file, cb) => cb(null, GEO_IMA_DIR),
  filename: (_req, file, cb) => {
    const ext  = (file.originalname.match(/\.[a-z0-9]+$/i) || [""])[0] || ".png";
    const base = file.originalname.replace(ext, "");
    cb(null, `${Date.now()}_${sanitize(base)}${ext}`);
  }
});
const uploadGeo = multerGeo({ storage: storageGeo });

// ENDPOINT DE SUBIDA (FormData con campo 'file')
app.post("/api/upload/pais", uploadGeo.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file" });
    // URL pública servida por express.static
    const url = `/Geopolitica/ima/${req.file.filename}`;
    res.json({ success: true, url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ----------------- API: PAISES -----------------

// Listar países
app.get("/api/paises", (req, res) => {
  res.json(readJSON(PAISES_FILE));
});

// Crear país (acepta opcionalmente 'imagen')
app.post("/api/paises", (req, res) => {
  const { nombre, imagen } = req.body || {};
  if (!nombre) return res.status(400).json({ error: "Falta 'nombre'" });

  const paises = readJSON(PAISES_FILE);
  const id = nextId(paises);
  const nuevo = { id, nombre: String(nombre).trim() };

  if (imagen != null && imagen !== "") nuevo.imagen = normalizeImagePath(imagen);

  paises.push(nuevo);
  writeJSON(PAISES_FILE, paises);
  res.json({ success: true, id });
});

// Actualizar país
app.put("/api/paises/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nombre, imagen } = req.body || {};

  const paises = readJSON(PAISES_FILE);
  const i = paises.findIndex(p => Number(p.id) === id);
  if (i === -1) return res.status(404).json({ error: "País no encontrado" });

  if (nombre != null) paises[i].nombre = String(nombre).trim();
  if (imagen != null) paises[i].imagen = normalizeImagePath(imagen);

  writeJSON(PAISES_FILE, paises);
  res.json({ success: true });
});

// Borrar país (y sus noticias)
app.delete("/api/paises/:id", (req, res) => {
  const id = Number(req.params.id);

  const paises = readJSON(PAISES_FILE);
  const i = paises.findIndex(p => Number(p.id) === id);
  if (i === -1) return res.status(404).json({ error: "País no encontrado" });

  paises.splice(i, 1);
  writeJSON(PAISES_FILE, paises);

  // cascade delete noticias
  const noticias = readJSON(NOTICIAS_FILE).filter(n => getPaisIdFromNoticia(n) !== id);
  writeJSON(NOTICIAS_FILE, noticias);

  res.json({ success: true, cascadeNoticias: true });
});

// ----------------- API: NOTICIAS -----------------

// Listar todas
app.get("/api/noticias", (req, res) => {
  res.json(readJSON(NOTICIAS_FILE));
});

// Listar por país
app.get("/api/noticias/by-pais/:id_pais", (req, res) => {
  const id_pais = Number(req.params.id_pais);
  const noticias = readJSON(NOTICIAS_FILE).filter(n => getPaisIdFromNoticia(n) === id_pais);
  res.json(noticias);
});

// Crear noticia
app.post("/api/noticias", (req, res) => {
  const { nombre, Contenido, id_Pais } = req.body || {};
  if (!nombre || (Contenido !== "1" && Contenido !== "0") || id_Pais == null) {
    return res.status(400).json({ error: "Faltan campos: {nombre, Contenido '1'|'0', id_Pais}" });
  }

  const paises = readJSON(PAISES_FILE);
  if (!paises.some(p => Number(p.id) === Number(id_Pais))) {
    return res.status(400).json({ error: "id_Pais no válido" });
  }

  const noticias = readJSON(NOTICIAS_FILE);
  const id = nextId(noticias);
  noticias.push({ id, nombre: String(nombre), Contenido: String(Contenido), id_Pais: Number(id_Pais) });
  writeJSON(NOTICIAS_FILE, noticias);
  res.json({ success: true, id });
});

// Actualizar noticia
app.put("/api/noticias/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nombre, Contenido, id_Pais } = req.body || {};

  const noticias = readJSON(NOTICIAS_FILE);
  const i = noticias.findIndex(n => Number(n.id) === id);
  if (i === -1) return res.status(404).json({ error: "Noticia no encontrada" });

  if (id_Pais != null) {
    const paises = readJSON(PAISES_FILE);
    if (!paises.some(p => Number(p.id) === Number(id_Pais))) {
      return res.status(400).json({ error: "id_Pais no válido" });
    }
    noticias[i].id_Pais = Number(id_Pais);
  }
  if (nombre != null) noticias[i].nombre = String(nombre);
  if (Contenido != null) noticias[i].Contenido = String(Contenido) === "1" ? "1" : "0";

  writeJSON(NOTICIAS_FILE, noticias);
  res.json({ success: true });
});

// Toggle Contenido 0/1
app.post("/api/noticias/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const noticias = readJSON(NOTICIAS_FILE);
  const i = noticias.findIndex(n => Number(n.id) === id);
  if (i === -1) return res.status(404).json({ error: "Noticia no encontrada" });

  noticias[i].Contenido = noticias[i].Contenido === "1" ? "0" : "1";
  writeJSON(NOTICIAS_FILE, noticias);
  res.json({ success: true, Contenido: noticias[i].Contenido });
});

// Borrar noticia
app.delete("/api/noticias/:id", (req, res) => {
  const id = Number(req.params.id);
  const noticias = readJSON(NOTICIAS_FILE);
  const nuevo = noticias.filter(n => Number(n.id) !== id);
  if (nuevo.length === noticias.length) return res.status(404).json({ error: "Noticia no encontrada" });
  writeJSON(NOTICIAS_FILE, nuevo);
  res.json({ success: true });
});




























// === COMPRAS ===
const FILE_COMPRAS = path.join(__dirname, "compras.js");

// Lee el array `data` desde compras.js
function getCompras() {
  delete require.cache[require.resolve(FILE_COMPRAS)];
  const { data } = require(FILE_COMPRAS);
  return Array.isArray(data) ? data : [];
}

// Guarda el array `data` reescribiendo compras.js con el mismo formato
function guardarCompras(arr) {
  const contenido = `const data = ${JSON.stringify(arr, null, 2)};\n\nmodule.exports = { data };`;
  fs.writeFileSync(FILE_COMPRAS, contenido, "utf8");
}

// GET: listar todas
app.get("/api/compras", (req, res) => {
  try {
    res.json(getCompras());
  } catch (err) {
    console.error("❌ Error leyendo compras:", err);
    res.status(500).json({ error: "No se pudo leer compras.js" });
  }
});

// POST: crear nueva (id autoincremental)
app.post("/api/compras", (req, res) => {
  try {
    const lista = getCompras();
    const maxId = lista.length ? Math.max(...lista.map(i => Number(i.id) || 0)) : 0;

    const nuevo = {
      id: maxId + 1,
      nombre: req.body.nombre ?? "",
      Coste: Number(req.body.Coste) || 0,
      imagen: req.body.imagen ?? "",         // p.ej. "/ima/compras/123.png" devuelto por /api/upload
      clase: req.body.clase ?? "",
      pros: req.body.pros ?? null,
      contras: req.body.contras ?? null,
      resultado: req.body.resultado ?? null
    };

    lista.push(nuevo);
    guardarCompras(lista);
    res.json({ success: true, item: nuevo });
  } catch (err) {
    console.error("❌ Error creando compra:", err);
    res.status(500).json({ error: "Error al crear compra" });
  }
});

// PUT: editar por id
app.put("/api/compras/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const lista = getCompras();
    const idx = lista.findIndex(i => Number(i.id) === id);
    if (idx === -1) return res.status(404).json({ error: "Compra no encontrada" });

    const actual = lista[idx];
    const editado = {
      ...actual,
      ...(req.body.nombre !== undefined ? { nombre: req.body.nombre } : {}),
      ...(req.body.Coste !== undefined ? { Coste: Number(req.body.Coste) || 0 } : {}),
      ...(req.body.imagen !== undefined ? { imagen: req.body.imagen } : {}),
      ...(req.body.clase !== undefined ? { clase: req.body.clase } : {}),
      ...(req.body.pros !== undefined ? { pros: req.body.pros } : {}),
      ...(req.body.contras !== undefined ? { contras: req.body.contras } : {}),
      ...(req.body.resultado !== undefined ? { resultado: req.body.resultado } : {}),
    };

    lista[idx] = editado;
    guardarCompras(lista);
    res.json({ success: true, item: editado });
  } catch (err) {
    console.error("❌ Error editando compra:", err);
    res.status(500).json({ error: "Error al editar compra" });
  }
});

// DELETE: borrar por id
app.delete("/api/compras/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const lista = getCompras();
    const existe = lista.some(i => Number(i.id) === id);
    if (!existe) return res.status(404).json({ error: "Compra no encontrada" });

    const nueva = lista.filter(i => Number(i.id) !== id);
    guardarCompras(nueva);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error borrando compra:", err);
    res.status(500).json({ error: "Error al borrar compra" });
  }
});

//////////////////////////////////////////////////////////////////
///LOS ENDPOINT DE LAS IA
//////////////////////////////////////////////////////////////////
// IA EndPoints
const generateTextFromChatGpt = async (prompt) => {
  const OPEN_AI_KEY="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";
  const client = new OpenAI({
    apiKey: OPEN_AI_KEY
  });
  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: prompt,
  });
  return response.output_text;
}

app.post("/api/resumen-ia", async (req, res) => {
  const { prompt } = req.body;
  const output = await generateTextFromChatGpt(prompt)
  if (output) {
    res.json({ text: output });
  } else {
    res.status(401).json({ error: "Error al generar el texto con IA" });
  }
});


////////////////////////////
/////////////////////////////
////////////////////////////

// === SERVER ===

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
