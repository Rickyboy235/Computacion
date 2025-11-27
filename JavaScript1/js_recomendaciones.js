/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const recomendLink = document.querySelector('.recomend-link');
  const recomendPanel = document.getElementById('recomend-panel');
  const closePanelBtn = document.getElementById('close-panel');

  // ====== BOTÓN HAMBURGUESA ======
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const opened = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', opened);
    if (!opened) return;
    const parent = recomendLink.closest('.has-submenu');
    parent.classList.remove('open');
  });

  // ====== PANEL RECOMENDACIONES ======
  recomendLink.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (window.innerWidth <= 900) {
      const parent = recomendLink.closest('.has-submenu');
      parent.classList.toggle('open');
      recomendLink.setAttribute('aria-expanded', parent.classList.contains('open'));
    } else {
      const parent = recomendLink.closest('.has-submenu');
      parent.classList.toggle('force-open');
      const open = parent.classList.contains('force-open');
      recomendPanel.style.opacity = open ? '1' : '';
      recomendPanel.style.pointerEvents = open ? 'auto' : '';
      recomendPanel.style.transform = open ? 'translateX(0) translateY(0) scale(1)' : '';
    }
  });

  if (closePanelBtn) {
    closePanelBtn.addEventListener('click', () => {
      const parent = recomendLink.closest('.has-submenu');
      parent.classList.remove('open');
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  }

  // ====== ACORDEONES ======
  const catHeaders = document.querySelectorAll('.cat-header');
  catHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const cat = header.closest('.cat');
      const isOpen = cat.classList.toggle('open');
      header.setAttribute('aria-expanded', String(isOpen));
      const list = cat.querySelector('.cat-list');
      list.style.maxHeight = isOpen ? list.scrollHeight + 'px' : '0px';
    });
  });

  // ====== PRODUCTOS ======
  const itemButtons = document.querySelectorAll('.item-btn');
  const detalleImg = document.getElementById('detalle-img');
  const detalleTitle = document.getElementById('detalle-title');
  const detalleDesc = document.getElementById('detalle-desc');
  const detallePrice = document.getElementById('detalle-price');

  itemButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      detalleImg.src = btn.dataset.img;
      detalleTitle.textContent = btn.dataset.title;
      detalleDesc.textContent = btn.dataset.desc;
      detallePrice.textContent = btn.dataset.price;
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.getElementById('detalle-producto').classList.add('active');
      if (window.innerWidth <= 900) {
        mainNav.classList.remove('open');
        const parent = recomendLink.closest('.has-submenu');
        parent.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ====== ASESORES ======
  const asesoresLink = document.querySelector('.asesores-link');
  const asesoresPanel = document.getElementById('asesores-panel');
  const closeAsesoresBtn = document.getElementById('close-asesores');

  if (asesoresLink && asesoresPanel) {
    asesoresLink.addEventListener('click', (ev) => {
      ev.preventDefault();
      const parent = asesoresLink.closest('.has-submenu');
      if (window.innerWidth <= 900) {
        parent.classList.toggle('open');
        asesoresLink.setAttribute('aria-expanded', parent.classList.contains('open'));
      } else {
        parent.classList.toggle('force-open');
        const open = parent.classList.contains('force-open');
        asesoresPanel.style.opacity = open ? '1' : '';
        asesoresPanel.style.pointerEvents = open ? 'auto' : '';
        asesoresPanel.style.transform = open ? 'translateX(0) translateY(0) scale(1)' : '';
      }
    });
  }

  if (closeAsesoresBtn) {
    closeAsesoresBtn.addEventListener('click', () => {
      const parent = asesoresLink.closest('.has-submenu');
      parent.classList.remove('open', 'force-open');
      asesoresPanel.style.opacity = '';
      asesoresPanel.style.pointerEvents = '';
      asesoresPanel.style.transform = '';
    });
  }

  // ====== BOTONES ASESORES ======
  const asesorBtns = document.querySelectorAll('.asesor-btn');
  asesorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      detalleImg.src = btn.dataset.img;
      detalleTitle.textContent = btn.dataset.title;
      detalleDesc.innerHTML = `${btn.dataset.desc}<br><br><strong>Contacto:</strong> ${btn.dataset.contacto}`;
      detallePrice.textContent = '';
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.getElementById('detalle-producto').classList.add('active');
      if (window.innerWidth <= 900) {
        mainNav.classList.remove('open');
        const parent = asesoresLink.closest('.has-submenu');
        parent.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ====== CIERRE GLOBAL ======
  document.addEventListener('click', (e) => {
    const insidePanel = e.target.closest('.submenu');
    const isSubClick = e.target.closest('.has-submenu');
    if (!insidePanel && !isSubClick) {
      document.querySelectorAll('.has-submenu').forEach(h => h.classList.remove('force-open'));
      [recomendPanel, asesoresPanel].forEach(panel => {
        if (panel) {
          panel.style.opacity = '';
          panel.style.pointerEvents = '';
          panel.style.transform = '';
        }
      });
      if (window.innerWidth <= 900) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
