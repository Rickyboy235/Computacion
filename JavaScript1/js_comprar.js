let productos = [
  {
    nombre: "Auriculares HyperX Cloud II",
    categoria: "Accesorios",
    precio: 450,
    imagen: "productos/Auriculares HyperX Cloud II.jpg",
    descripcion: [
      "Sonido envolvente virtual 7.1",
      "Almohadillas de memory foam",
      "Micrófono desmontable",
      "Garantía de 1 año"
    ]
  },
  {
    nombre: "All in One ASUS V241 23.8",
    categoria: "Computadora",
    precio: 2800,
    imagen: "productos/All in One ASUS V241 23.8.jpg",
    descripcion: [
      "Procesador Intel Core i5",
      "Pantalla Full HD 23.8 pulgadas",
      "8GB RAM, 1TB Almacenamiento",
      "Incluye teclado y mouse"
    ]
  },
  {
    nombre: "Mouse TE-1210G NEGRO",
    categoria: "Accesorios",
    precio: 85,
    imagen: "ofertas/mouse.png",
    descripcion: [
      "Sensor óptico de alta precisión",
      "Cable reforzado",
      "Diseño ergonómico",
      "Compatible con Windows y Linux"
    ]
  }
];

let carrito = []; 
let contador = 0;

/* ============ mostrar productos (visualizar) ============ */
function cargarProductos() {
  const cont = document.getElementById("contenedorProductos");
  cont.innerHTML = "";

  productos.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = p.imagen || "productos/default.png";
    img.alt = p.nombre;

    const h3 = document.createElement("h3");
    h3.textContent = p.nombre;

    const cat = document.createElement("p");
    cat.textContent = "Categoría: " + p.categoria;

    const precio = document.createElement("p");
    precio.textContent = "Precio: S/." + p.precio;

    const btnVer = document.createElement("button");
    btnVer.textContent = "Ver";
    btnVer.onclick = () => verProducto(i);

    const btnComprar = document.createElement("button");
    btnComprar.textContent = "Comprar";
    btnComprar.onclick = () => comprarProducto(i);

    const btnCargar = document.createElement("button");
    btnCargar.textContent = "Cargar";
    btnCargar.onclick = () => cargarParaEditar(i);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => {
      if (confirm(`¿Eliminar "${p.nombre}"?`)) {
        productos.splice(i,1);
        cargarProductos();
        mostrarNotificacion("Producto eliminado");
      }
    };

    card.append(img, h3, cat, precio, btnVer, btnComprar, btnCargar, btnEliminar);
    cont.appendChild(card);
  });

  actualizarContadorCarrito();
}

/* Inicializar vista */
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  ajustarModal(); 
});

/* ===================== BÚSQUEDA ===================== */
function buscarProducto() {
  const q = document.getElementById("inputBusqueda").value.trim().toLowerCase();
  const cards = document.querySelectorAll("#contenedorProductos .card");

  cards.forEach(card => {
    const nombre = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = nombre.includes(q) ? "block" : "none";
  });
}

/* ===================== CARRITO ===================== */
function actualizarContadorCarrito() {
  document.getElementById("contadorCarrito").innerText = carrito.length;
}

function comprarProducto(i) {
  carrito.push(productos[i]);
  contador = carrito.length;
  actualizarContadorCarrito();
  mostrarNotificacion("✔ " + productos[i].nombre + " agregado al carrito");
}

/* ===================== MODAL DETALLE (ver producto) ===================== */
function verProducto(i) {
  const p = productos[i];
  const modal = document.getElementById("modalDetalle");
  modal.style.display = "flex";

  document.getElementById("imagenDetalle").src = p.imagen || "productos/default.png";
  document.getElementById("nombreDetalle").textContent = p.nombre;
  document.getElementById("categoriaDetalle").textContent = "Categoría: " + p.categoria;
  document.getElementById("precioDetalle").textContent = "Precio: S/." + p.precio;

  const lista = document.getElementById("listaDetalle");
  lista.innerHTML = "";
  (p.descripcion || []).forEach(texto => {
    const li = document.createElement("li");
    li.textContent = texto;
    lista.appendChild(li);
  });
}

function cerrarModal() {
  document.getElementById("modalDetalle").style.display = "none";
}

/* ===================== DESCUENTOS y PAGOS ===================== */
function verDescuento() {
  const nombre = document.getElementById("nombreDetalle").textContent.toLowerCase();
  let msg = "Este producto no tiene descuento actualmente.";

  if (nombre.includes("mouse")) msg = "10% de descuento por tiempo limitado.";
  else if (nombre.includes("auriculares")) msg = "5% de descuento si compras 2 unidades.";

  mostrarNotificacion(msg);
}

function verPagos() {
  window.open("pagos.html", "_blank");
}

/* ===================== NOTIFICACIONES ===================== */
function mostrarNotificacion(mensaje) {
  const modal = document.getElementById("modalNotificacion");
  const texto = document.getElementById("mensajeNotificacion");
  texto.textContent = mensaje;
  modal.classList.add("show");
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);
  }, 2000);
}

/* ===================== MODAL CARRITO ===================== */
function abrirCarrito() {
  const modal = document.getElementById("modalCarrito");
  const lista = document.getElementById("listaCarrito");
  lista.innerHTML = "";

  let total = 0;
  if (carrito.length === 0) {
    lista.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    carrito.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "item-carrito";
      div.innerHTML = `<div>${item.nombre} (S/.${item.precio})</div>
                       <div><button onclick="quitarDelCarrito(${idx})">Quitar</button></div>`;
      lista.appendChild(div);
      total += Number(item.precio);
    });
  }
  document.getElementById("totalCarrito").textContent = "Total: S/." + total.toFixed(2);
  modal.style.display = "flex";
}

function cerrarCarrito() {
  document.getElementById("modalCarrito").style.display = "none";
}

function quitarDelCarrito(idx) {
  carrito.splice(idx,1);
  abrirCarrito();
  actualizarContadorCarrito();
  mostrarNotificacion("Producto eliminado del carrito");
}

function vaciarCarrito() {
  carrito = [];
  actualizarContadorCarrito();
  abrirCarrito();
  mostrarNotificacion("Carrito vaciado");
}

function checkout() {
  if (carrito.length === 0) { mostrarNotificacion("Tu carrito está vacío"); return; }
  mostrarNotificacion("Procesando pago... (simulado)");
  setTimeout(() => {
    carrito = [];
    actualizarContadorCarrito();
    cerrarCarrito();
    mostrarNotificacion("¡Compra exitosa! Gracias por su compra.");
  }, 1200);
}

/* ===================== Gestión (Insertar/Editar/Eliminar) ===================== */

function abrirGestion() {
  document.getElementById("modalGestion").style.display = "flex";
}
function cerrarGestion() {
  document.getElementById("modalGestion").style.display = "none";
  limpiarFormGestion();
}

function limpiarFormGestion() {
  document.getElementById("formNombre").value = "";
  document.getElementById("formCategoria").value = "";
  document.getElementById("formPrecio").value = "";
  document.getElementById("formImagen").value = "";
  document.getElementById("formDescripcion").value = "";
}

function insertarProductoModal() {
  const n = document.getElementById("formNombre").value.trim();
  const c = document.getElementById("formCategoria").value.trim();
  const p = parseFloat(document.getElementById("formPrecio").value);
  const img = document.getElementById("formImagen").value.trim();
  const descText = document.getElementById("formDescripcion").value.trim();

  if (!n || !c || !p) { mostrarNotificacion("Completa Nombre, Categoría y Precio"); return; }

  const descripcion = descText ? descText.split("\n").map(s => s.trim()).filter(s => s) : ["Descripción no disponible"];

  productos.push({
    nombre: n,
    categoria: c,
    precio: p,
    imagen: img || "productos/default.png",
    descripcion: descripcion
  });

  cargarProductos();
  limpiarFormGestion();
  mostrarNotificacion("Producto insertado");
}

function eliminarProductoModal() {
  const n = document.getElementById("formNombre").value.trim().toLowerCase();
  if (!n) { mostrarNotificacion("Escribe el nombre del producto a eliminar"); return; }

  const idx = productos.findIndex(x => x.nombre.toLowerCase() === n);
  if (idx === -1) { mostrarNotificacion("Producto no encontrado"); return; }

  productos.splice(idx,1);
  cargarProductos();
  limpiarFormGestion();
  mostrarNotificacion("Producto eliminado");
}

function cargarParaEditar(i) {
  const p = productos[i];
  document.getElementById("formNombre").value = p.nombre;
  document.getElementById("formCategoria").value = p.categoria;
  document.getElementById("formPrecio").value = p.precio;
  document.getElementById("formImagen").value = p.imagen;
  document.getElementById("formDescripcion").value = (p.descripcion || []).join("\n");

  abrirGestion();
}

function editarProductoModal() {
  const n = document.getElementById("formNombre").value.trim();
  if (!n) { mostrarNotificacion("Escribe el nombre del producto a editar"); return; }

  const idx = productos.findIndex(x => x.nombre.toLowerCase() === n.toLowerCase());
  if (idx === -1) { mostrarNotificacion("Producto no encontrado"); return; }

  const c = document.getElementById("formCategoria").value.trim();
  const p = document.getElementById("formPrecio").value.trim();
  const img = document.getElementById("formImagen").value.trim();
  const descText = document.getElementById("formDescripcion").value.trim();

  if (c) productos[idx].categoria = c;
  if (p) productos[idx].precio = parseFloat(p);
  if (img) productos[idx].imagen = img;
  if (descText) productos[idx].descripcion = descText.split("\n").map(s => s.trim()).filter(s => s);

  cargarProductos();
  limpiarFormGestion();
  mostrarNotificacion("Producto actualizado");
}

const modal = document.getElementById("modalDetalle");
const contenido = document.getElementById("contenidoDetalle");
const imgDetalle = document.getElementById("imagenDetalle");

Object.assign(modal.style, {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(6px)",
  padding: "15px",
  overflowY: "auto",
  boxSizing: "border-box",
  transition: "all 0.3s ease"
});

Object.assign(contenido.style, {
  backgroundColor: "#fff",
  borderRadius: "15px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "center",
  padding: "25px",
  width: "90%",
  maxWidth: "480px",
  maxHeight: "90vh",
  overflowY: "auto",
  margin: "auto",
  gap: "12px",
  transition: "all 0.3s ease"
});

Object.assign(imgDetalle.style, {
  width: "80%",
  height: "auto",
  borderRadius: "10px",
  marginBottom: "10px",
  boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease"
});

let botones = document.querySelectorAll("#botonesDetalle button");
botones.forEach(b => {
  Object.assign(b.style, {
    backgroundColor: "#0984e3",
    color: "white",
    border: "none",
    padding: "10px 14px",
    margin: "5px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s"
  });
  b.onmouseover = () => (b.style.backgroundColor = "#74b9ff");
  b.onmouseout = () => (b.style.backgroundColor = "#0984e3");
});

function ajustarModal() {
  const ancho = window.innerWidth;
  const alto = window.innerHeight;

  if (ancho <= 480) {
    contenido.style.width = "95%";
    contenido.style.maxWidth = "350px";
    contenido.style.maxHeight = "85vh";
    contenido.style.padding = "15px";
    contenido.style.borderRadius = "10px";
    contenido.style.margin = "auto";
    imgDetalle.style.width = "100%";
    modal.style.alignItems = "flex-start";
  } else if (ancho <= 768) {
    contenido.style.width = "85%";
    contenido.style.maxWidth = "400px";
    contenido.style.maxHeight = "80vh";
    contenido.style.padding = "20px";
    contenido.style.borderRadius = "12px";
    modal.style.alignItems = "center";
  } else {
    contenido.style.width = "70%";
    contenido.style.maxWidth = "480px";
    contenido.style.maxHeight = "80vh";
    contenido.style.padding = "25px";
    contenido.style.borderRadius = "15px";
    modal.style.alignItems = "center";
  }

  if (contenido.scrollHeight > alto * 0.9) {
    contenido.style.overflowY = "scroll";
  } else {
    contenido.style.overflowY = "auto";
  }
}

window.addEventListener("resize", ajustarModal);
window.addEventListener("orientationchange", ajustarModal);