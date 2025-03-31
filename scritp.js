// Tablica z danymi galerii
const galleryImages = [
  {
    src: "/domkistrona/photos/domektest.jpeg",
    alt: "Widok na domek",
  },
  {
    src: "/domkistrona/photos/domkiletniskowe.jpg",
    alt: "Wnętrze domku",
  },
  {
    src: "/domkistrona/photos/widoknadomki.jpg",
    alt: "Taras domku",
  },
  {
    src: "/domkistrona/photos/domektest.jpeg",
    alt: "Jezioro",
  },
  {
    src: "/domkistrona/photos/domkiletniskowe.jpg",
    alt: "Okolica",
  },
  {
    src: "/domkistrona/photos/widoknadomki.jpg",
    alt: "Zachód słońca",
  },
  {
    src: "/domkistrona/photos/domektest.jpeg",
    alt: "Łazienka",
  },
  {
    src: "/domkistrona/photos/domkiletniskowe.jpg",
    alt: "Kuchnia",
  },
];

let currentImageIndex = 0;

// Funkcje dla menu
function toggleMenu() {
  const nav = document.getElementById("mainNav");
  const body = document.body;

  nav.classList.toggle("active");

  // Zmiana ikony
  const icon = document.getElementById("menuIcon");
  if (nav.classList.contains("active")) {
    icon.className = "fas fa-times";
    // Zapobiegaj przewijaniu strony gdy menu jest otwarte na urządzeniach mobilnych
    if (window.innerWidth <= 768) {
      body.style.overflow = "hidden";
    }
  } else {
    icon.className = "fas fa-bars";
    body.style.overflow = "";
  }
}

function closeMenu() {
  const nav = document.getElementById("mainNav");
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
    document.getElementById("menuIcon").className = "fas fa-bars";
    document.body.style.overflow = "";
  }
}

// Funkcje dla galerii
function openModal(index) {
  const modal = document.getElementById("imageModal");
  currentImageIndex = index;
  updateModalImage();

  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Blokuje przewijanie strony

  // Dodaj obsługę klawiszy
  document.addEventListener("keydown", handleKeyPress);
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
  document.body.style.overflow = ""; // Przywraca przewijanie

  // Usuń obsługę klawiszy
  document.removeEventListener("keydown", handleKeyPress);
}

function updateModalImage() {
  const modalImg = document.getElementById("modalImage");
  const caption = document.getElementById("caption");
  const counter = document.getElementById("galleryCounter");

  modalImg.src = galleryImages[currentImageIndex].src;
  caption.innerHTML = galleryImages[currentImageIndex].alt;
  counter.innerHTML = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function changeImage(direction) {
  currentImageIndex =
    (currentImageIndex + direction + galleryImages.length) %
    galleryImages.length;
  updateModalImage();
}

function handleKeyPress(e) {
  if (e.key === "ArrowLeft") {
    changeImage(-1);
  } else if (e.key === "ArrowRight") {
    changeImage(1);
  } else if (e.key === "Escape") {
    closeModal();
  }
}

// Obsługa gestów dotykowych dla galerii
let touchStartX = 0;
let touchEndX = 0;

document.getElementById("imageModal").addEventListener(
  "touchstart",
  function (e) {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

document.getElementById("imageModal").addEventListener(
  "touchend",
  function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX - touchStartX > swipeThreshold) {
    // Przesunięcie w prawo - poprzednie zdjęcie
    changeImage(-1);
  } else if (touchStartX - touchEndX > swipeThreshold) {
    // Przesunięcie w lewo - następne zdjęcie
    changeImage(1);
  }
}

// Zamykanie modalu po kliknięciu poza obrazem
window.onclick = function (event) {
  const modal = document.getElementById("imageModal");
  if (event.target == modal) {
    closeModal();
  }
};

// Zamykanie menu po kliknięciu poza nim
document.addEventListener("click", function (event) {
  const nav = document.getElementById("mainNav");
  const menuToggle = document.querySelector(".menu-toggle");

  if (
    nav.classList.contains("active") &&
    !nav.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

// Obsługa formularza newslettera
document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = this.querySelector("input");
      if (input.value) {
        alert("Dziękujemy za zapisanie się do newslettera!");
        input.value = "";
      }
    });
  }
});

// Płynne przewijanie do sekcji po kliknięciu w link
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Zamknij menu mobilne jeśli jest otwarte
      closeMenu();
    }
  });
});

// Dodaj obsługę orientacji ekranu
window.addEventListener("orientationchange", function () {
  // Zamknij menu mobilne przy zmianie orientacji
  closeMenu();

  // Zamknij modal galerii przy zmianie orientacji
  closeModal();
});
