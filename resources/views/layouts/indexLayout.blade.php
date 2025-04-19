<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'Portfolio | Jade Langendorf')</title>

  <!-- Fonts + Favicons -->
  <link href="img/favicon.png" rel="icon">
  <link href="img/apple-touch-icon.png" rel="apple-touch-icon">
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Vendor CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/aos@3.0.0-beta.6/dist/aos.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/glightbox@3.2.0/dist/css/glightbox.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/swiper@9.4.1/swiper-bundle.min.css" rel="stylesheet">

  <!-- Main CSS -->
  <link href="css/app.css" rel="stylesheet">
</head>

<body class="index-page">
  @include('partials.navbar')

  <main class="main">
    @yield('content')
  </main>

  @include('partials.footer')

  <!-- Scroll Top / Preloader -->
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center">
    <i class="bi bi-arrow-up-short"></i>
  </a>
  <div id="preloader"></div>

  <script>
    window.Laravel = {
        reverbAppKey: "{{ env('REVERB_APP_KEY') }}",
        reverbHost: "{{ env('REVERB_HOST') }}",
        reverbPort: {{ env('REVERB_PORT') }},
        reverbScheme: "{{ env('REVERB_SCHEME') }}"
    };
  </script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/pusher/7.0.3/pusher.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/laravel-echo@1.11.2/dist/echo.iife.min.js"></script>

  <!-- Vendor JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/php-email-form@3.0.0/validate.js"></script>
<script src="https://cdn.jsdelivr.net/npm/aos@3.0.0-beta.6/dist/aos.js"></script>
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12/lib/typed.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@srexi/purecounterjs@1.1.0/dist/purecounter_vanilla.js"></script>
<script src="https://cdn.jsdelivr.net/npm/waypoints/lib/noframework.waypoints.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/glightbox@3.2.0/dist/js/glightbox.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/imagesloaded@5.0.0/imagesloaded.pkgd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/isotope-layout@3.0.6/dist/isotope.pkgd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@9.4.1/swiper-bundle.min.js"></script>

  <!-- Main JS -->
  <script src="js/app.js"></script>

    <!-- Reverb -->
    <script src="{{ asset('js/reverbStatus.js') }}"></script>
</body>
</html>
