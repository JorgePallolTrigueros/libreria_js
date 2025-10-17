document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-tarjetas");
  const filtroNombre = document.getElementById("filtro-nombre");
  const filtroDepartamento = document.getElementById("filtro-departamento");
  const paginacion = document.getElementById("paginacion");
  const editDepartamento = document.getElementById("editDepartamento");
  const insertDepartamento = document.getElementById("insertDepartamento");

  let tonterias = [];
  let paginaActual = 1;
  const articulosPorPagina = 8;

  const departamentos = {
    0: "Mitos personales",
    1: "Creencias colectivas",
    2: "Errores históricos",
    3: "Otros"
  };

  // Cargar opciones en selects
  for (const [valor, nombre] of Object.entries(departamentos)) {
    filtroDepartamento.appendChild(new Option(nombre, valor));
    editDepartamento.appendChild(new Option(nombre, valor));
    insertDepartamento.appendChild(new Option(nombre, valor));
  }

  function verMas(id) {
    const item = tonterias.find(a => a.id === id);
    if (!item) return;
    document.getElementById("verMasTitulo").textContent = item.nombre;
    document.getElementById("verMasDescripcion").textContent = item.descripcion || "";
    document.getElementById("modalVerMas").classList.remove("hidden");
    document.getElementById("modalVerMas").classList.add("flex");
  }

  function abrirModalEditar(id) {
    const item = tonterias.find(a => a.id === parseInt(id));
    if (!item) return;
    document.getElementById("editId").value = item.id;
    document.getElementById("editNombre").value = item.nombre;
    document.getElementById("editDescripcion").value = item.descripcion;
    document.getElementById("editDepartamento").value = item.departamento;
    document.getElementById("modalEditar").classList.remove("hidden");
    document.getElementById("modalEditar").classList.add("flex");
  }

  function abrirModalInsertar() {
    document.getElementById("insertNombre").value = "";
    document.getElementById("insertDescripcion").value = "";
    document.getElementById("insertDepartamento").value = "";
    document.getElementById("insertImagen").value = "";
    document.getElementById("modalInsertar").classList.remove("hidden");
    document.getElementById("modalInsertar").classList.add("flex");
  }

  function cerrarModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }

  function mostrarArticulos() {
    const filtroNombreValor = filtroNombre.value.toLowerCase();
    const filtroDeptoValor = filtroDepartamento.value;

    const filtrados = tonterias.filter(a =>
      (a.nombre || "").toLowerCase().includes(filtroNombreValor) &&
      (filtroDeptoValor === "" || a.departamento == filtroDeptoValor)
    );

    const totalPaginas = Math.ceil(filtrados.length / articulosPorPagina);
    if (paginaActual > totalPaginas) paginaActual = 1;

    const inicio = (paginaActual - 1) * articulosPorPagina;
    const paginados = filtrados.slice(inicio, inicio + articulosPorPagina);

    contenedor.innerHTML = "";
    paginados.forEach(a => {
      let nombre = a.nombre || "Sin nombre";
      let descripcion = a.descripcion || "";
      let descripcionCorta = descripcion.length > 300 ? descripcion.slice(0, 300) + "..." : descripcion;
      let imagen = a.imagen || "/tonterias/ima/default.png";
      let departamentoNombre = departamentos[a.departamento] || "Desconocido";
      let id = a.id || a.id_articulo || 0;

      const card = document.createElement("div");
      card.className = "bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center";
      card.innerHTML = `
        <img src="${imagen}" alt="${nombre}" class="w-full h-40 object-cover rounded mb-2 shadow">
        <h3 class="text-yellow-400 font-bold text-lg text-center">${nombre}</h3>
        <p class="text-sm text-gray-300 text-center mb-2">${departamentoNombre}</p>
        <p class="text-white text-center text-xs line-clamp-5">${descripcionCorta}</p>
        <div class="mt-2 flex gap-2 justify-center">
          <button onclick="verMas(${id})" class="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded">Ver más</button>
          <button onclick="abrirModalEditar(${id})" class="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded">Editar</button>
        </div>
      `;
      contenedor.appendChild(card);
    });

    paginacion.innerHTML = "";
    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = `px-2 py-1 rounded ${i === paginaActual ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'} hover:bg-yellow-500 transition`;
      btn.onclick = () => {
        paginaActual = i;
        mostrarArticulos();
      };
      paginacion.appendChild(btn);
    }
  }

  filtroNombre.addEventListener("input", () => {
    paginaActual = 1;
    mostrarArticulos();
  });

  filtroDepartamento.addEventListener("change", () => {
    paginaActual = 1;
    mostrarArticulos();
  });

  fetch("/api/tonterias")
    .then(res => res.json())
    .then(data => {
      tonterias = data;
      mostrarArticulos();
    })
    .catch(err => {
      contenedor.innerHTML = `<p class="text-red-500">Error al cargar los artículos.</p>`;
      console.error("Error:", err);
    });

  document.getElementById("formInsertar").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", document.getElementById("insertNombre").value);
    formData.append("descripcion", document.getElementById("insertDescripcion").value);
    formData.append("departamento", document.getElementById("insertDepartamento").value);
    const file = document.getElementById("insertImagen").files[0];
    if (file) formData.append("imagen", file);

    fetch("/api/tonterias", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          cerrarModal("modalInsertar");
          location.reload();
        } else {
          alert("Error al crear artículo");
          console.error(res);
        }
      })
      .catch(err => {
        alert("Error en la conexión");
        console.error(err);
      });
  });

  document.getElementById("formEditar").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const formData = new FormData();
    formData.append("nombre", document.getElementById("editNombre").value);
    formData.append("descripcion", document.getElementById("editDescripcion").value);
    formData.append("departamento", document.getElementById("editDepartamento").value);
    const file = document.getElementById("editImagen").files[0];
    if (file) formData.append("imagen", file);

    fetch(`/api/tonterias/${id}`, {
      method: "PUT",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          cerrarModal("modalEditar");
          location.reload();
        } else {
          alert("Error al editar artículo");
          console.error(res);
        }
      })
      .catch(err => {
        alert("Error en la conexión");
        console.error(err);
      });
  });
});