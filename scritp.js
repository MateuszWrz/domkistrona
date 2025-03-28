// Funkcje dla menu
function toggleMenu() {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("active");

  // Zmiana ikony
  const icon = document.getElementById("menuIcon");
  if (nav.classList.contains("active")) {
    icon.className = "fas fa-times";
  } else {
    icon.className = "fas fa-bars";
  }
}

function closeMenu() {
  const nav = document.getElementById("mainNav");
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
    document.getElementById("menuIcon").className = "fas fa-bars";
  }
}

// Funkcje dla galerii
function openModal(imgSrc, imgAlt) {
  document.getElementById("imageModal").style.display = "block";
  document.getElementById("modalImage").src = imgSrc;
  document.getElementById("caption").innerHTML = imgAlt;
  document.body.style.overflow = "hidden"; // Blokuje przewijanie strony
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
  document.body.style.overflow = ""; // Przywraca przewijanie
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
