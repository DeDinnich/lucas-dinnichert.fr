<!-- Testimonials Section -->
<section id="testimonials" class="testimonials section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Avis clients</h2>
      <p>Découvrez ce que mes clients pensent de mon travail.</p>
    </div><!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="swiper init-swiper">
        <script type="application/json" class="swiper-config">
          {
            "loop": true,
            "speed": 600,
            "autoplay": {
              "delay": 5000
            },
            "slidesPerView": "auto",
            "pagination": {
              "el": ".swiper-pagination",
              "type": "bullets",
              "clickable": true
            }
          }
        </script>

        <div class="swiper-wrapper" id="testimonials-wrapper">
          <!-- Les avis seront injectés ici dynamiquement -->
        </div>

        <div class="swiper-pagination"></div>
      </div>

    </div>

  </section><!-- /Testimonials Section -->

  <!-- Script pour charger les avis -->
  <script>
    document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('/api/get-reviews');
    const data = await response.json();

    const reviews = data.reviews || [];
    const wrapper = document.getElementById('testimonials-wrapper');

    if (!reviews.length) {
      wrapper.innerHTML = "<p>Aucun avis pour le moment.</p>";
      return;
    }

    wrapper.innerHTML = reviews.map(review => `
      <div class="swiper-slide">
        <div class="testimonial-item">
          <div class="row gy-4 justify-content-center">
            <div class="col-lg-6">
              <div class="testimonial-content">
                <p>
                  <i class="bi bi-quote quote-icon-left"></i>
                  <span>${review.text}</span>
                  <i class="bi bi-quote quote-icon-right"></i>
                </p>
                <h3>${review.author_name}</h3>
                <h4>Client vérifié</h4>
                <div class="stars">
                  ${'<i class="bi bi-star-fill"></i>'.repeat(review.rating)}
                </div>
              </div>
            </div>
            <div class="col-lg-2 text-center">
              <img src="${review.profile_photo_url}" class="img-fluid testimonial-img" alt="Photo de ${review.author_name}">
            </div>
          </div>
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error('Erreur lors du chargement des avis Google:', error);
  }
});
    </script>
