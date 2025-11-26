/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let opcionesDiv = document.getElementById("opciones");

// Arreglo con métodos de pago [nombre, imagen] //
let pagos = [
  ["Yape", "fondos_banners_logos/yape.png"],
  ["Plin", "fondos_banners_logos/plin.jpg"],
  ["Visa", "fondos_banners_logos/visa.png"],
  ["MasterCard", "fondos_banners_logos/mastercard.png"],
  ["Pago Efectivo", "fondos_banners_logos/pagoefectivo.png"]
];

// tarjetas de pago //
pagos.forEach(p => {
  let card = document.createElement("div");
  let img = document.createElement("img");
  let texto = document.createElement("p");

  texto.textContent = p[0];
  img.setAttribute("src", p[1]);
  img.setAttribute("alt", p[0]);
  img.style.width = "100px";
  img.style.marginBottom = "10px";

  card.appendChild(img);
  card.appendChild(texto);
  opcionesDiv.appendChild(card);

  // Estilos de cada tarjeta
  card.style.backgroundColor = "#45455C";
  card.style.borderRadius = "10px";
  card.style.boxShadow = "0 3px 10px rgba(0,0,0,0.2)";
  card.style.padding = "20px";
  card.style.margin = "10px";
  card.style.width = "150px";
  card.style.textAlign = "center";
  card.style.transition = "transform 0.2s";
  card.onmouseover = () => card.style.transform = "scale(1.05)";
  card.onmouseout = () => card.style.transform = "scale(1)";
});

// BOTÓN VOLVER //

let volverBtn = document.getElementById("volver");
volverBtn.onclick = () => {
  window.close(); // Cierra la pestaña actual //
};

// ESTILOS //

document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.backgroundColor = "#11121A";
document.body.style.textAlign = "center";
document.body.style.color = "white";

let header = document.querySelector("header");
header.style.backgroundColor = "#1A1A2E";
header.style.color = "white";
header.style.padding = "15px";
header.style.marginBottom = "20px";

let main = document.querySelector("main");
main.style.display = "flex";
main.style.flexDirection = "column";
main.style.alignItems = "center";
main.style.gap = "15px";

let contenedor = document.getElementById("opciones");
contenedor.style.display = "flex";
contenedor.style.flexWrap = "wrap";
contenedor.style.justifyContent = "center";
contenedor.style.maxWidth = "600px";

let btnVolver = document.getElementById("volver");
btnVolver.style.backgroundColor = "#00b894";
btnVolver.style.color = "white";
btnVolver.style.border = "none";
btnVolver.style.padding = "10px 15px";
btnVolver.style.borderRadius = "8px";
btnVolver.style.cursor = "pointer";
btnVolver.style.marginTop = "20px";
btnVolver.onmouseover = () => btnVolver.style.backgroundColor = "#55efc4";
btnVolver.onmouseout = () => btnVolver.style.backgroundColor = "#00b894";
