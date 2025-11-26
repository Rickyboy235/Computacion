
document.addEventListener('DOMContentLoaded', function () {
  const nombreTienda = "MaxiTech";

  // Crear modal de bienvenida
  function mostrarBienvenida() {
    const modal = document.createElement('div');
    modal.id = 'welcome-modal';
    Object.assign(modal.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    });

    const contenido = document.createElement('div');
    Object.assign(contenido.style, {
      backgroundColor: '#1f2330',
      color: 'white',
      padding: '2rem',
      borderRadius: '10px',
      textAlign: 'center',
      maxWidth: '400px',
      width: '80%'
    });

    contenido.innerHTML = `
      <h2>Bienvenido a ${nombreTienda}</h2>
      <p>Explora nuestros productos tecnológicos.</p>
    `;

    const botonCerrar = document.createElement('button');
    botonCerrar.textContent = '¡Entendido!';
    Object.assign(botonCerrar.style, {
      marginTop: '1rem',
      padding: '0.6rem 1.2rem',
      backgroundColor: '#007BFF',
      border: 'none',
      borderRadius: '6px',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1rem'
    });

    botonCerrar.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Cerrar si se hace click fuera del contenido
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    contenido.appendChild(botonCerrar);
    modal.appendChild(contenido);
    document.body.appendChild(modal);
  }

  // Mostrar modal al cargar la página
  mostrarBienvenida();
});

