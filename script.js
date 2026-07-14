/* =========================================================
   THƯ MỜI THAM DỰ LỄ TỐT NGHIỆP - SCRIPT.JS
   Chức năng: Countdown, Scroll animation, Lightbox, Smooth scroll
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------
     1. NÚT "XEM THƯ MỜI" -> CUỘN MƯỢT XUỐNG PHẦN GIỚI THIỆU
  --------------------------------------------------- */
  const btnXemThu = document.getElementById('btnXemThu');
  if (btnXemThu) {
    btnXemThu.addEventListener('click', function () {
      const target = document.getElementById('gioithieu');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ---------------------------------------------------
     2. ĐỒNG HỒ ĐẾM NGƯỢC
     -> Chỉnh sửa targetDate theo ngày giờ Lễ tốt nghiệp thực tế
  --------------------------------------------------- */
  // Định dạng: new Date("YYYY-MM-DDTHH:MM:SS")
  const targetDate = new Date("2026-08-15T08:00:00").getTime();

  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');
  const elSeconds = document.getElementById('cd-seconds');
  const countdownWrapper = document.getElementById('countdownWrapper');
  const countdownStarted = document.getElementById('countdownStarted');

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      // Đã đến hoặc qua thời điểm bảo vệ
      if (countdownWrapper) countdownWrapper.style.display = 'none';
      if (countdownStarted) countdownStarted.style.display = 'block';
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMinutes) elMinutes.textContent = pad(minutes);
    if (elSeconds) elSeconds.textContent = pad(seconds);
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  /* ---------------------------------------------------
     3. HIỆU ỨNG SLIDE-UP KHI CUỘN TỚI (Intersection Observer)
  --------------------------------------------------- */
  const slideUpElements = document.querySelectorAll('.slide-up');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // chỉ chạy 1 lần
      }
    });
  }, {
    threshold: 0.15
  });

  slideUpElements.forEach(function (el) {
    observer.observe(el);
  });

  /* ---------------------------------------------------
     4. GALLERY LIGHTBOX - PHÓNG TO ẢNH KHI CLICK
  --------------------------------------------------- */
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryImages.forEach(function (img) {
    img.addEventListener('click', function () {
      // Không mở lightbox nếu ảnh lỗi (chưa upload)
      if (img.naturalWidth === 0) return;
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------------------------------------------------
     5. NÚT BACK TO TOP
  --------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------
     6. SMOOTH SCROLL CHO MỌI LINK NỘI BỘ (a href="#...")
  --------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});