document.addEventListener('DOMContentLoaded', () => {
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const musicIcon = document.getElementById('musicIcon');
  const progressBar = document.getElementById('progressBar');
  const progressContainer = document.getElementById('progressContainer');
  
  const volumeBtn = document.getElementById('volumeBtn');
  const volumePopup = document.getElementById('volumePopup');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeIcon = document.getElementById('volumeIcon');

  if (!musicToggle || !bgMusic) return;

  let isPlaying = false;

  // Control de Play / Pause
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.classList.remove('fa-pause');
      musicIcon.classList.add('fa-play');
    } else {
      bgMusic.play().then(() => {
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
      }).catch(error => {
        console.log("Autoplay restringido por el navegador:", error);
      });
    }
    isPlaying = !isPlaying;
  });

  // Muestra / Oculta el control flotante de volumen al hacer clic en el botón de la bocina
  if (volumeBtn && volumePopup) {
    volumeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      volumePopup.classList.toggle('active');
    });

    // Ocultar la barra si el usuario hace clic afuera del reproductor
    document.addEventListener('click', (e) => {
      if (!volumePopup.contains(e.target) && !volumeBtn.contains(e.target)) {
        volumePopup.classList.remove('active');
      }
    });
  }

  // Regulador de volumen
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const volumeVal = parseFloat(e.target.value);
      bgMusic.volume = volumeVal;
      bgMusic.muted = false;

      if (volumeVal === 0) {
        volumeIcon.className = 'fas fa-volume-xmark';
      } else if (volumeVal < 0.5) {
        volumeIcon.className = 'fas fa-volume-low';
      } else {
        volumeIcon.className = 'fas fa-volume-high';
      }
    });
  }

  // Actualización de la barra de progreso
  bgMusic.addEventListener('timeupdate', () => {
    if (bgMusic.duration && progressBar) {
      const progressPercent = (bgMusic.currentTime / bgMusic.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }
  });

  // Adelantar/atrasar canción
  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      const duration = bgMusic.duration;
      if (duration) {
        bgMusic.currentTime = (clickX / width) * duration;
      }
    });
  }
});

// ==========================================
// 1. LÓGICA DEL CONTADOR (30 DE ENERO DE 2027)
// ==========================================
const eventDate = new Date(2027, 0, 30, 0, 0, 0).getTime(); // Enero es el mes 0 en JavaScript

const updateTimer = () => {
  const now = new Date().getTime();
  const difference = eventDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }
};

// Inicia la cuenta regresiva al cargar el archivo
setInterval(updateTimer, 1000);
updateTimer();


// ==========================================
// DETECTORES DE SCROLL BIDIRECCIONALES (TODAS LAS SECCIONES)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      } else {
        entry.target.classList.remove('animate-in');
      }
    });
  }, observerOptions);

  // 1. Observador para el marco de la fecha
  const dateTarget = document.querySelector('.date-section');
  if (dateTarget) {
    observer.observe(dateTarget);
  }

  // 2. Observador para la Frase Verde
const phraseTarget = document.querySelector('.phrase-section');
if (phraseTarget) {
  observer.observe(phraseTarget);
}

  // 3. Observador para el contador
  const countdownTarget = document.getElementById('countdownSection');
  if (countdownTarget) {
    observer.observe(countdownTarget);
  }

  // 4. Observador para la invitación y boleto
  const ticketsTarget = document.getElementById('invitationTickets');
  if (ticketsTarget) {
    observer.observe(ticketsTarget);
  }
});

// ==========================================
// OBSERVADOR PARA CUÁNDO/DÓNDE Y CEREMONIA
// ==========================================
const locationCeremonyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    } else {
      entry.target.classList.remove('animate-in'); // Mantiene el comportamiento bidireccional
    }
  });
}, { threshold: 0.1 });

// Vinculación de las secciones sin tocar sus estilos base
const locationSection = document.getElementById('locationSection');
if (locationSection) {
  locationCeremonyObserver.observe(locationSection);
}

const ceremonySection = document.getElementById('ceremonySection');
if (ceremonySection) {
  locationCeremonyObserver.observe(ceremonySection);
}

// Vinculación de la sección de la foto
const photoSection = document.getElementById('photoSection'); // Cambia 'photoSection' por el ID exacto de tu <section>
if (photoSection) {
  locationCeremonyObserver.observe(photoSection);
}

// Registra la nueva sección de Recepción
const receptionSection = document.getElementById('receptionSection');
if (receptionSection) {
  locationCeremonyObserver.observe(receptionSection);
}

// Registra la sección de Dress Code
const dressCodeSection = document.getElementById('dressCodeSection');
if (dressCodeSection) {
  locationCeremonyObserver.observe(dressCodeSection);
}

// Registra la segunda sección de foto para la animación
const photoSection2 = document.getElementById('photoSection2');
if (photoSection2) {
  locationCeremonyObserver.observe(photoSection2);
}

const giftsSection = document.getElementById('giftsSection');
if (giftsSection) {
  locationCeremonyObserver.observe(giftsSection);
}

// Registra la sección de Te Espero para la animación por scroll
const waitSection = document.getElementById('waitSection');
if (waitSection) {
  locationCeremonyObserver.observe(waitSection);
}

// Observador para la sección final
const footerSection = document.getElementById('footerSection');
if (footerSection) {
  locationCeremonyObserver.observe(footerSection);
}