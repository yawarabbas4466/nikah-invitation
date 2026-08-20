/* =========================================================
   Nikah Ceremony Invitation — Yawar & Rubeena
   Vanilla JS: live countdown (PKT), scroll reveal, music toggle
   ========================================================= */

(function () {
  "use strict";

  /* -----------------------------------------------------
     1. COUNTDOWN — target is 31 Aug 2026, 3:00 PM Pakistan
        Standard Time (UTC+5). We build the target as a UTC
        timestamp so it counts down correctly for every guest,
        no matter which timezone their phone is set to.
        15:00 PKT (UTC+5) == 10:00 UTC
     ----------------------------------------------------- */
  var TARGET_UTC_MS = Date.UTC(2026, 7, 31, 10, 0, 0); // month is 0-indexed: 7 = August

  var elDays = document.getElementById("cd-days");
  var elHours = document.getElementById("cd-hours");
  var elMins = document.getElementById("cd-mins");
  var elSecs = document.getElementById("cd-secs");
  var elCountdown = document.getElementById("countdown");
  var elArrived = document.getElementById("countdownArrived");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tickCountdown() {
    var now = Date.now();
    var diff = TARGET_UTC_MS - now;

    if (diff <= 0) {
      if (elCountdown) elCountdown.hidden = true;
      if (elArrived) elArrived.hidden = false;
      clearInterval(countdownInterval);
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var mins = Math.floor((totalSeconds % 3600) / 60);
    var secs = totalSeconds % 60;

    if (elDays) elDays.textContent = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMins) elMins.textContent = pad(mins);
    if (elSecs) elSecs.textContent = pad(secs);
  }

  var countdownInterval;
  if (elCountdown) {
    tickCountdown();
    countdownInterval = setInterval(tickCountdown, 1000);
  }

  /* -----------------------------------------------------
     2. SCROLL REVEAL — fade + rise each section in as it
        enters the viewport. Falls back gracefully if
        IntersectionObserver isn't supported.
     ----------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    ".section, .detail-card, .verse-card, .rsvp-contact, .venue-card"
  );

  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* -----------------------------------------------------
     3. SCROLL CUE — click/tap to jump to the next section
     ----------------------------------------------------- */
  var scrollCue = document.getElementById("scrollCue");
  if (scrollCue) {
    scrollCue.addEventListener("click", function () {
      var nextSection = document.querySelector(".countdown-section");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  /* -----------------------------------------------------
     4. BACKGROUND MUSIC TOGGLE — never autoplays with sound.
        Guest must tap to start; tapping again pauses.
        If assets/music.mp3 is missing, the button is hidden
        automatically rather than showing a broken control.
     ----------------------------------------------------- */
  var musicToggle = document.getElementById("musicToggle");
  var bgMusic = document.getElementById("bgMusic");

  if (musicToggle && bgMusic) {
    var iconPlay = musicToggle.querySelector(".icon-play");
    var iconPause = musicToggle.querySelector(".icon-pause");

    // Hide the control if no playable source is available.
    bgMusic.addEventListener(
      "error",
      function () {
        musicToggle.style.display = "none";
      },
      true
    );

    musicToggle.addEventListener("click", function () {
      if (bgMusic.paused) {
        bgMusic.play().catch(function () {
          /* Autoplay/permission issues are silently ignored;
             the guest can simply tap again. */
        });
      } else {
        bgMusic.pause();
      }
    });

    bgMusic.addEventListener("play", function () {
      musicToggle.classList.add("is-playing");
      musicToggle.setAttribute("aria-pressed", "true");
      musicToggle.setAttribute("aria-label", "Pause background music");
      iconPlay.hidden = true;
      iconPause.hidden = false;
    });

    bgMusic.addEventListener("pause", function () {
      musicToggle.classList.remove("is-playing");
      musicToggle.setAttribute("aria-pressed", "false");
      musicToggle.setAttribute("aria-label", "Play background music");
      iconPlay.hidden = false;
      iconPause.hidden = true;
    });
  }

  /* -----------------------------------------------------
     5. OPEN GRAPH URL — fill og:url with the live page
        address so share previews link back correctly,
        without needing to hand-edit the HTML per deployment.
     ----------------------------------------------------- */
  var ogUrlTag = document.querySelector('meta[property="og:url"]');
  if (ogUrlTag) {
    ogUrlTag.setAttribute("content", window.location.href);
  }
})();
