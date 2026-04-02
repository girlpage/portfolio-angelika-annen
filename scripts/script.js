document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.querySelector('#kontakt');
  const content = document.querySelector('.contact-content');

  if (toggle && content) {
    const toggleContact = () => {
      content.classList.toggle('is-open');
    };

    toggle.addEventListener('click', toggleContact);

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleContact();
      }
    });
  }

  // Overlay-Logik
  const clickableImages = document.querySelectorAll('.clickable-image');
  const closeButtons = document.querySelectorAll('.close-button');

  clickableImages.forEach(img => {
    img.addEventListener('click', () => {
      const targetId = img.dataset.target;
      const overlay = document.getElementById(targetId);
      if (!overlay) return;

      // Alle anderen Overlays schließen
      document.querySelectorAll('.overlay').forEach(o => o.classList.add('hidden'));

      // Gewünschtes Overlay öffnen
      overlay.classList.remove('hidden');

      // Hintergrund-Scrollen verhindern
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.overlay');
      if (overlay) {
        overlay.classList.add('hidden');
        // Hintergrund-Scrollen wieder erlauben
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
      }
    });
  });

  // Overlay schließen beim Klick auf den Hintergrund
  document.querySelectorAll('.overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
      }
    });
  });

  // Audio-Logik (bereinigt)
  const audioPlayers = document.querySelectorAll('.audio-play-button');
  const progress = document.querySelector('.audio-progress'); // globale Fortschrittsleiste

  audioPlayers.forEach(button => {
    let audio = null;

    button.addEventListener('click', () => {
      // andere Audios stoppen
      document.querySelectorAll('audio').forEach(a => {
        if (a !== audio) a.pause();
      });

      if (!audio) {
        audio = new Audio(button.dataset.audio);

        audio.addEventListener('ended', () => {
          button.textContent = '▶';
          progress.style.width = '0%';
          audio = null;
        });

        audio.addEventListener('timeupdate', () => {
          if (audio.duration) {
            progress.style.width = (audio.currentTime / audio.duration * 100) + '%';
          }
        });

        audio.play();
        button.textContent = 'pause ⏸';
      } else {
        if (!audio.paused) {
          audio.pause();
          button.textContent = 'play audio ▶';
        } else {
          audio.play();
          button.textContent = 'pause ⏸';
        }
      }
    });
  });
});