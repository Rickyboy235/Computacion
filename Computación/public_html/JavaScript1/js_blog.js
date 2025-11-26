/* ======================= LOGIN LOCALSTORAGE ======================= */
const contBotones = document.getElementById("botones-login");
const userInfo = document.getElementById("user-info");
const loginBtn = document.getElementById("mandar");
const registrarBtn = document.getElementById("registrar");
const logoEmpresa = document.getElementById("logo-empresa");
const nombreEmpresa = document.getElementById("nombre-empresa");
const buscador = document.getElementById("buscador");

let usuario = localStorage.getItem("usuario");

/* ====== Estado del usuario ====== */
if (usuario) {
  contBotones.style.display = "none";
  logoEmpresa.style.display = "none";
  nombreEmpresa.style.display = "none";

  userInfo.innerHTML = `<button id="cerrarSesion" class="btn">Cerrar sesión</button>`;
  userInfo.style.display = "flex";
  userInfo.style.justifyContent = "flex-end";
  userInfo.style.marginRight = "40px";

  document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada correctamente.");
    location.reload();
  });
}

/* ====== Login ====== */
loginBtn.addEventListener("click", () => {
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();

  if (correo === "" || password === "") {
    alert("Completa todos los campos.");
    return;
  }

  localStorage.setItem("usuario", correo);
  alert("Inicio de sesión exitoso.");

  document.querySelector("#login-modal").style.display = "none";
  window.location.hash = "";
  location.reload();
});

/* ====== Registro ====== */
registrarBtn.addEventListener("click", () => {
  const correo = document.getElementById("correo-reg").value.trim();
  const pass1 = document.getElementById("password-reg").value;
  const pass2 = document.getElementById("confirmar").value;

  if (correo === "" || pass1 === "" || pass2 === "") {
    alert("Completa todos los campos.");
    return;
  }

  if (pass1 !== pass2) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  localStorage.setItem("usuario", correo);
  alert("Registro exitoso. Has iniciado sesión automáticamente.");

  document.querySelector("#register-modal").style.display = "none";
  window.location.hash = "";
  location.reload();
});

/* ====== Cerrar modal al hacer click fuera o en la X ====== */
document.querySelectorAll(".cerrar").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
    window.location.hash = "";
  });
});

window.addEventListener("click", e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
    window.location.hash = "";
  }
});

/* ======================= RESEÑAS ======================= */
let reseñas = [
  { autor: "Carlos", texto: "Excelente servicio y productos originales.", estrellas: 5 },
  { autor: "Marta", texto: "Podrían mejorar el stock disponible.", estrellas: 4 },
  { autor: "Rafael", texto: "Me gustó la atención al cliente.", estrellas: 5 },
];

const lista = document.getElementById("lista-reseñas");

function mostrarResenas() {
  lista.innerHTML = "";
  reseñas.forEach(r => {
    lista.innerHTML += `
      <div class="resena">
        <div class="autor">${r.autor}</div>
        <div class="estrellas">${"★".repeat(r.estrellas)}</div>
        <p>${r.texto}</p>
      </div>`;
  });
}
mostrarResenas();

/* ====== Agregar nueva reseña ====== */
document.getElementById("btn-publicar").onclick = () => {
  if (!usuario) {
    alert("Debes iniciar sesión para publicar una reseña.");
    return;
  }

  const texto = document.getElementById("texto-resena").value.trim();
  const estrellas = parseInt(document.getElementById("estrellas").value);

  if (texto === "") {
    alert("Escribe una reseña.");
    return;
  }

  const nombre = usuario.split("@")[0];
  reseñas.unshift({ autor: nombre, texto, estrellas });
  mostrarResenas();
  document.getElementById("texto-resena").value = "";
};
