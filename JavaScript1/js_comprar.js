/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// Arreglo bidimensional con los productos: [nombre, categoría, precio] //
let productos = [
  ["Auriculares HyperX Cloud II", "Accesorios", 450],
  ["All in One ASUS V241 23.8", "Computadora", 2800],
  ["Mouse TE-1210G NEGRO", "Accesorios", 85]
];

let carrito = [];
let contador = 0;

// FUNCIÓN DE COMPRA //

function comprarProducto(i) {
  carrito.push(productos[i]);
  contador = carrito.length;

  mostrarNotificacion("✔ " + productos[i][0] + " agregado al carrito");
  document.querySelector(".carrito span").innerText = contador;

  let total = 0;
  for (let j = 0; j < carrito.length; j++) {
    total += carrito[j][2];
  }
  console.log("Total acumulado: S/." + total);
}

// FUNCIÓN PARA VER DETALLES //

function verProducto(i) {
  let p = productos[i];

  // Mostrar modal //
  document.getElementById("modalDetalle").style.display = "flex";

  // Asignar datos
  document.getElementById("nombreDetalle").textContent = p[0];
  document.getElementById("categoriaDetalle").textContent = "Categoría: " + p[1];
  document.getElementById("precioDetalle").textContent = "Precio: S/." + p[2];

  // Asignar imagen //
  let imagen = document.getElementById("imagenDetalle");
  if (i === 0) imagen.setAttribute("src", "productos/Auriculares HyperX Cloud II.jpg");
  if (i === 1) imagen.setAttribute("src", "productos/All in One ASUS V241 23.8.jpg");
  if (i === 2) imagen.setAttribute("src", "ofertas/mouse.png");

  // lista de descripción //
  let lista = document.getElementById("listaDetalle");
  lista.innerHTML = "";
  let descripciones = [
    "Producto de excelente calidad y durabilidad.",
    "Garantía de 1 año incluida.",
    "Ideal para uso profesional o personal."
  ];

  descripciones.forEach(texto => {
    let li = document.createElement("li");
    li.textContent = texto;
    lista.appendChild(li);
  });
}

// FUNCIONES PARA LOS BOTONES //

function verDescuento() {
  let nombre = document.getElementById("nombreDetalle").textContent;
  let mensaje = "";

  if (nombre.includes("Mouse")) {
    mensaje = "Este producto tiene un 10% de descuento por tiempo limitado.";
  } else if (nombre.includes("Auriculares")) {
    mensaje = "Descuento del 5% si compras 2 unidades.";
  } else {
    mensaje = "Este producto no tiene descuento actualmente.";
  }

  mostrarNotificacion(mensaje);
}

// Abrir la página para ver los tipo de pago que hay //
function verPagos() {
  window.open("pagos.html", "_blank");
}

// CERRAR MODAL //

function cerrarModal() {
  document.getElementById("modalDetalle").style.display = "none";
}

// Estilos //

const modalNotificacion = document.getElementById("modalNotificacion");
Object.assign(modalNotificacion.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#0984e3",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "8px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
  fontSize: "14px",
  display: "none",
  zIndex: 9999,
  transition: "all 0.3s ease"
});

function mostrarNotificacion(mensaje) {
  const texto = document.getElementById("mensajeNotificacion");
  texto.textContent = mensaje;
  modalNotificacion.style.display = "block";

  // Aparece y luego desaparece después de 2.5 segundos
  setTimeout(() => {
    modalNotificacion.style.display = "none";
  }, 2500);
}

const modal = document.getElementById("modalDetalle");
const contenido = document.getElementById("contenidoDetalle");
const img = document.getElementById("imagenDetalle");

// ----- Fondo del modal ----- //
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
  overflowY: "auto", // permite desplazarse si el modal es alto //
  boxSizing: "border-box",
  transition: "all 0.3s ease"
});

// ----- Contenedor del contenido ----- //
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

// ----- Imagen -----
Object.assign(img.style, {
  width: "80%",
  height: "auto",
  borderRadius: "10px",
  marginBottom: "10px",
  boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease"
});

// ----- Botones -----
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

// FUNCIÓN RESPONSIVA //

function ajustarModal() {
  const ancho = window.innerWidth;
  const alto = window.innerHeight;

  if (ancho <= 480) {
    // Celulares pequeños //
    contenido.style.width = "95%";
    contenido.style.maxWidth = "350px";
    contenido.style.maxHeight = "85vh";
    contenido.style.padding = "15px";
    contenido.style.borderRadius = "10px";
    contenido.style.margin = "auto";
    img.style.width = "100%";
    modal.style.alignItems = "flex-start"; // el modal se ancla arriba con espacio //
  } else if (ancho <= 768) {
    // Tablets //
    contenido.style.width = "85%";
    contenido.style.maxWidth = "400px";
    contenido.style.maxHeight = "80vh";
    contenido.style.padding = "20px";
    contenido.style.borderRadius = "12px";
    modal.style.alignItems = "center";
  } else { // Pantallas grandes (PC) //
    contenido.style.width = "70%";
    contenido.style.maxWidth = "480px";
    contenido.style.maxHeight = "80vh";
    contenido.style.padding = "25px";
    contenido.style.borderRadius = "15px";
    modal.style.alignItems = "center";
  }

  // Si el contenido excede el alto visible, el modal permite scroll (deslizador)//
  if (contenido.scrollHeight > alto * 0.9) {
    contenido.style.overflowY = "scroll";
  } else {
    contenido.style.overflowY = "auto";
  }
}

// Ejecutar al cargar y al cambiar tamaño //
ajustarModal();
window.addEventListener("resize", ajustarModal);
window.addEventListener("orientationchange", ajustarModal);