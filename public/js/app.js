// assets/js/main.js
(function() {
    "use strict";

    // ────────────────────────────────────────────────────────
    // Integration Checker
    console.log("🔍 Intégration Checker chargé...");
    document.addEventListener("DOMContentLoaded", () => {
      // 1️⃣ Vérif CSS
      [
        { name: "Bootstrap CSS",       pattern: "bootstrap.min.css" },
        { name: "Bootstrap Icons CSS", pattern: "bootstrap-icons.css" },
        { name: "AOS CSS",             pattern: "aos.css" },
        { name: "GLightbox CSS",       pattern: "glightbox.min.css" },
        { name: "Swiper CSS",          pattern: "swiper-bundle.min.css" },
        { name: "Main CSS",            pattern: "app.css" }
      ].forEach(lib => {
        const loaded = Array.from(document.styleSheets).some(ss =>
          ss.href && ss.href.includes(lib.pattern)
        );
        console.log(`${lib.name}: ${loaded ? "✅ chargé" : "❌ MANQUANT"}`);
      });

      // 2️⃣ Vérif JS
      [
        { name: "Bootstrap JS",    test: () => typeof bootstrap !== "undefined" },
        { name: "PHP Email Form",  test: () => typeof validate === "function" },
        { name: "AOS",             test: () => typeof AOS !== "undefined" },
        { name: "Typed.js",        test: () => typeof Typed !== "undefined" },
        { name: "PureCounter",     test: () => typeof PureCounter === "function" },
        { name: "Waypoint",        test: () => typeof Waypoint !== "undefined" },
        { name: "GLightbox",       test: () => typeof GLightbox !== "undefined" },
        { name: "imagesLoaded",    test: () => typeof imagesLoaded !== "undefined" },
        { name: "Isotope",         test: () => typeof Isotope !== "undefined" },
        { name: "Swiper",          test: () => typeof Swiper !== "undefined" },
        { name: "Pusher.js",       test: () => typeof Pusher !== "undefined" },
        { name: "Laravel Echo",    test: () => typeof Echo !== "undefined" }
      ].forEach(lib => {
        console.log(`${lib.name}: ${lib.test() ? "✅ chargé" : "❌ MANQUANT"}`);
      });
    });

    // ────────────────────────────────────────────────────────
    // WebSocket Status Logger
    console.log("🔍 Reverb WebSocket Status Logger chargé...");
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        if (window.Echo && window.Echo.connector) {
          console.warn("⚠️ Laravel Echo déjà initialisé, skip.");
          return;
        }
        if (typeof Pusher === "undefined") {
          console.error("❌ Pusher.js non chargé !");
          return;
        }
        window.Pusher = Pusher;
        try {
          window.Echo = new Echo({
            broadcaster:  "pusher",
            key:          window.Laravel.reverbAppKey,
            wsHost:       window.Laravel.reverbHost,
            wsPort:       window.Laravel.reverbPort,
            wssPort:      window.Laravel.reverbPort,
            forceTLS:     window.Laravel.reverbScheme === "https",
            disableStats: true,
            enabledTransports: ["ws","wss"]
          });
          const conn = window.Echo.connector.pusher.connection;
          conn.bind("connecting",    () => console.log("⏳ WebSocket en connexion..."));
          conn.bind("connected",     () => console.log("✅ WebSocket CONNECTÉ"));
          conn.bind("disconnected",  () => console.log("❌ WebSocket DÉCONNECTÉ"));
          conn.bind("error",         err => console.error("⚠️ Erreur WebSocket :", err));
        } catch (err) {
          console.error("❌ Erreur init Echo :", err);
        }
      }, 500);
    });

    // ────────────────────────────────────────────────────────
    // Header toggle
    const headerToggleBtn = document.querySelector('.header-toggle');
    const header = document.getElementById('header');
    function headerToggle() {
      header.classList.toggle('header-show');
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    }
    if (headerToggleBtn) headerToggleBtn.addEventListener('click', headerToggle);

    // Hide mobile nav on same-page/hash links
    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (header.classList.contains('header-show')) headerToggle();
      });
    });

    // Toggle mobile nav dropdowns
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        btn.parentNode.classList.toggle('active');
        btn.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) window.addEventListener('load', () => preloader.remove());

    // Scroll top button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
      const toggleScrollTop = () => {
        scrollTopBtn.classList.toggle('active', window.scrollY > 100);
      };
      scrollTopBtn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      window.addEventListener('load', toggleScrollTop);
      document.addEventListener('scroll', toggleScrollTop);
    }

    // AOS init + Skills animation avec debug
    window.addEventListener('load', () => {
        if (typeof AOS === 'undefined') {
        console.error("⚠️ AOS non chargé : impossible d'animer les progress bars");
        return;
        }

        console.log("🚀 Initialisation AOS");
        AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
        });

        const skills = document.querySelector('.skills-animation');
        if (!skills) {
        console.warn("⚠️ .skills-animation introuvable");
        return;
        }
        console.log("👁️ .skills-animation trouvé, on ajoute le listener AOS");

        // DEBUG : on log l'émission de tous les événements AOS
        document.addEventListener('aos:in', ({ detail }) => {
        console.log("📢 AOS event ‘in’ sur", detail);
        if (detail === skills || detail.classList.contains('skills-animation')) {
            console.log("🎯 C'est notre skills-section -> animation des barres");
            detail.querySelectorAll('.progress-bar').forEach(bar => {
            const val = bar.getAttribute('aria-valuenow');
            console.log(`   • Remplissage de ${bar} à ${val}%`);
            bar.style.width = val + '%';
            });
        }
        });

        // Fallback IntersectionObserver si AOS ne fire pas
        console.log("🔧 Mise en place du fallback IntersectionObserver");
        const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            console.log("➤ IO callback pour", entry.target, "isIntersecting =", entry.isIntersecting);
            if (entry.isIntersecting && entry.target === skills) {
            console.log("✅ IO détecte skills en vue, on remplit");
            skills.querySelectorAll('.progress-bar').forEach(bar => {
                const val = bar.getAttribute('aria-valuenow');
                bar.style.width = val + '%';
            });
            obs.unobserve(skills);
            }
        });
        }, { threshold: 0.2 });
        observer.observe(skills);

    });

    // Typed.js
    const typedEl = document.querySelector('.typed');
    if (typedEl && typeof Typed !== 'undefined') {
      const strings = typedEl.getAttribute('data-typed-items').split(',');
      new Typed('.typed', { strings, loop: true, typeSpeed: 100, backSpeed: 50, backDelay: 2000 });
    }

    // PureCounter
    window.addEventListener('load', () => {
      if (typeof PureCounter === 'function') {
        new PureCounter();
        console.log('✅ PureCounter initialisé');
      }
    });

    // Debug de scroll (désactivé)
  //   window.addEventListener('scroll', () => {
  //     console.log("scrollY =", window.scrollY);
  //   });

    // GLightbox
    if (typeof GLightbox !== 'undefined') {
      GLightbox({ selector: '.glightbox' });
    }

    // Isotope + filters
    document.querySelectorAll('.isotope-layout').forEach(container => {
      let iso;
      imagesLoaded(container.querySelector('.isotope-container'), () => {
        iso = new Isotope(container.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode:   container.dataset.layout || 'masonry',
          filter:       container.dataset.defaultFilter || '*',
          sortBy:       container.dataset.sort || 'original-order'
        });
      });
      container.querySelectorAll('.isotope-filters li').forEach(btn => {
        btn.addEventListener('click', () => {
          container.querySelector('.filter-active').classList.remove('filter-active');
          btn.classList.add('filter-active');
          iso.arrange({ filter: btn.dataset.filter });
          if (typeof AOS !== 'undefined') AOS.refresh();
        });
      });
    });

    // Swiper sliders
    function initSwiper() {
      document.querySelectorAll('.init-swiper').forEach(sw => {
        const cfg = JSON.parse(sw.querySelector('.swiper-config').textContent.trim());
        if (sw.classList.contains('swiper-tab')) {
          initSwiperWithCustomPagination(sw, cfg);
        } else {
          new Swiper(sw, cfg);
        }
      });
    }
    window.addEventListener('load', initSwiper);

    // Hash scroll correction
    window.addEventListener('load', () => {
      if (location.hash && document.querySelector(location.hash)) {
        setTimeout(() => {
          const sec    = document.querySelector(location.hash);
          const margin = parseInt(getComputedStyle(sec).scrollMarginTop);
          window.scrollTo({ top: sec.offsetTop - margin, behavior: 'smooth' });
        }, 100);
      }
    });

    // Navmenu Scrollspy
    const navLinks = document.querySelectorAll('.navmenu a');
    function scrollSpy() {
      const pos = window.scrollY + 200;
      navLinks.forEach(link => {
        if (!link.hash) return;
        const sec = document.querySelector(link.hash);
        link.classList.toggle('active',
          sec && pos >= sec.offsetTop && pos <= sec.offsetTop + sec.offsetHeight
        );
      });
    }
    window.addEventListener('load', scrollSpy);
    document.addEventListener('scroll', scrollSpy);

  })();
