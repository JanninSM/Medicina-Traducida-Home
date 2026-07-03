const searchInput = document.getElementById("articleSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const articlesGrid = document.getElementById("articlesGrid");
const noResults = document.getElementById("noResults");

const allArticles = Array.from(document.querySelectorAll(".article-card"));

let currentCategory = "todos";

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderArticles() {
  const searchTerm = normalizeText(searchInput.value.trim());

  let filteredArticles = allArticles.filter(article => {
    const category = article.dataset.category;
    const title = article.querySelector("h3").textContent;
    const description = article.querySelector("p")?.textContent || "";
    const tag = article.querySelector(".article-tag").textContent;

    const articleText = normalizeText(`${title} ${description} ${tag}`);

    const matchesCategory =
      currentCategory === "todos" || category === currentCategory;

    const matchesSearch =
      searchTerm === "" || articleText.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  filteredArticles.sort((a, b) => {
    return new Date(b.dataset.date) - new Date(a.dataset.date);
  });

  articlesGrid.innerHTML = "";

  const visibleArticles = filteredArticles.slice(0, 7);

  visibleArticles.forEach((article, index) => {
    const clone = article.cloneNode(true);

    clone.classList.remove("featured");

    if (index === 0) {
      clone.classList.add("featured");
    }

    articlesGrid.appendChild(clone);
  });

  noResults.style.display = visibleArticles.length === 0 ? "block" : "none";
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.dataset.category;
    renderArticles();
  });
});

searchInput.addEventListener("input", renderArticles);

renderArticles();

/* =========================== SECCION 4: VIDEOS ======================== */

const track = document.querySelector(".videos-track");
const cards = document.querySelectorAll(".video-card");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;

function getVisibleCards() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function getMaxIndex() {
  return cards.length - getVisibleCards();
}

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(track).gap);
  const moveX = currentIndex * (cardWidth + gap);

  track.style.transform = `translateX(-${moveX}px)`;

  updateDots();
}

function createDots() {
  dotsContainer.innerHTML = "";

  const totalDots = getMaxIndex() + 1;

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    dot.setAttribute("aria-label", `Ir al grupo de videos ${i + 1}`);

    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  }

  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll(".carousel-dot");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < getMaxIndex()) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = getMaxIndex();
  }

  updateCarousel();
});

window.addEventListener("resize", () => {
  if (currentIndex > getMaxIndex()) {
    currentIndex = getMaxIndex();
  }

  createDots();
  updateCarousel();
});

createDots();
updateCarousel();

document.querySelectorAll(".video-card").forEach(card => {

  card.addEventListener("click", () => {

    const url = card.dataset.url;

    window.open(url, "_blank");

  });

});