/* 5ta sección: Carrusel de recursos digitales */

const recursosTrack = document.querySelector(".recursos-grid");
const recursosCards = Array.from(document.querySelectorAll(".recursos-card"));
const recursosPrev = document.querySelector(".recursos-prev");
const recursosNext = document.querySelector(".recursos-next");
const recursosDots = document.querySelector(".recursos-dots");

let recursoIndex = 0;

function recursosPerView() {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 3;
  return 4;
}

function recursoCardWidth() {
  const card = recursosCards[0];
  const gap = parseFloat(getComputedStyle(recursosTrack).gap);
  return card.offsetWidth + gap;
}

function maxRecursoIndex() {
  return Math.max(0, recursosCards.length - recursosPerView());
}

function updateRecursosCarousel() {
  const distance = recursoIndex * recursoCardWidth();
  recursosTrack.style.transform = `translateX(-${distance}px)`;
  updateRecursosDots();
}

function createRecursosDots() {
  recursosDots.innerHTML = "";

  const totalDots = maxRecursoIndex() + 1;

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("button");
    dot.classList.add("recursos-dot");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir al grupo de recursos ${i + 1}`);

    dot.addEventListener("click", () => {
      recursoIndex = i;
      updateRecursosCarousel();
    });

    recursosDots.appendChild(dot);
  }
}

function updateRecursosDots() {
  const dots = document.querySelectorAll(".recursos-dot");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === recursoIndex);
  });
}

recursosNext.addEventListener("click", () => {
  recursoIndex++;

  if (recursoIndex > maxRecursoIndex()) {
    recursoIndex = 0;
  }

  updateRecursosCarousel();
});

recursosPrev.addEventListener("click", () => {
  recursoIndex--;

  if (recursoIndex < 0) {
    recursoIndex = maxRecursoIndex();
  }

  updateRecursosCarousel();
});

window.addEventListener("resize", () => {
  if (recursoIndex > maxRecursoIndex()) {
    recursoIndex = maxRecursoIndex();
  }

  createRecursosDots();
  updateRecursosCarousel();
});

createRecursosDots();
updateRecursosCarousel();


 /* 7ta sección: FOOTER */

lucide.createIcons();

/* RESPONSIVE DESING */

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobileMenu');
const closeMenu = document.querySelector('.mobile-menu-close');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('is-open');
  menuToggle.setAttribute('aria-expanded', 'true');
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
