document.addEventListener("DOMContentLoaded", () => {
  // --- Backend Message Fetch Example ---
  const e = document.getElementById("get-message");
  if (e) {
    e.onclick = async () => {
      try {
        const e = await fetch("/api/message"),
          t = await e.json();
        document.getElementById("message").textContent = t.message;
      } catch (e) {
        document.getElementById("message").textContent =
          "Error fetching message.";
      }
    };
  }

  // --- Security: Disable Inspect/Save Image ---
  document.addEventListener("keydown", function (e) {
    // Block F12, Ctrl+Shift+I/J, Ctrl+U
    if (
      "F12" === e.key ||
      (e.ctrlKey && e.shiftKey && ("I" === e.key || "J" === e.key)) ||
      (e.ctrlKey && "U" === e.key)
    ) {
      e.preventDefault();
      alert("Inspecting is disabled on this site.");
    }
  });
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    alert("Inspecting is disabled on this site.");
  });
  document.addEventListener("contextmenu", function (e) {
    if ("IMG" === e.target.tagName) {
      e.preventDefault();
      alert("Image saving is disabled on this site.");
    }
  });

  // --- Smooth Scroll to Home on Load ---
  const t = document.getElementById("home");
  if (t) {
    setTimeout(() => {
      t.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  // --- Navigation Error Handling ---
  document.body.addEventListener(
    "click",
    function (e) {
      // Intercept anchor navigation for error handling
      if (
        "A" === e.target.tagName &&
        e.target.href &&
        0 === e.button &&
        !e.target.hasAttribute("target")
      ) {
        var t = e.target.getAttribute("href");
        if (
          t &&
          !["#", "mailto:", "tel:", "#"].some((prefix) => t.startsWith(prefix))
        ) {
          fetch(t, { method: "HEAD" })
            .then(function (t) {
              if (!t.ok) {
                e.preventDefault();
                window.location.href = "/404.html";
              }
            })
            .catch(function () {
              e.preventDefault();
              window.location.href = "/404.html";
            });
        }
      }
    },
    true
  );
  window.addEventListener("error", function (e) {
    window.location.href = "/error.html";
  });

  // --- Custom Cursor Follower ---
  const n = document.createElement("div");
  n.id = "cursor-follower";
  document.body.appendChild(n);
  window.addEventListener("mousemove", (e) => {
    n.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  document.querySelectorAll("a, button").forEach((e) => {
    e.addEventListener("mouseenter", () => n.classList.add("grow"));
    e.addEventListener("mouseleave", () => n.classList.remove("grow"));
  });

  // --- Mobile Menu Toggle ---
  const o = document.getElementById("mobile-menu-button"),
    s = document.getElementById("mobile-menu"),
    c = document.getElementById("menu-icon-open"),
    a = document.getElementById("menu-icon-close");
  if (o) {
    o.addEventListener("click", () => {
      s.classList.toggle("hidden");
      c.classList.toggle("hidden");
      a.classList.toggle("hidden");
    });
  }
  s.querySelectorAll("a").forEach((e) => {
    e.addEventListener("click", () => {
      s.classList.add("hidden");
      c.classList.remove("hidden");
      a.classList.add("hidden");
    });
  });

  // --- Navigation Highlight on Scroll ---
  const r = document.querySelectorAll("section[id]"),
    i = document.querySelectorAll('header a[href^="#"]');
  const d = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const t = entry.target.getAttribute("id");
          i.forEach((link) => {
            link.classList.remove("nav-active");
            if (link.getAttribute("href") === "#" + t) {
              link.classList.add("nav-active");
            }
          });
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.5 }
  );
  r.forEach((section) => {
    d.observe(section);
  });
  lucide.createIcons(); // Lucide icon initialization

  // --- Dynamic Year in Footer ---
  const l = document.getElementById("current-year");
  if (l) l.textContent = new Date().getFullYear();

  // --- Fade-in Animation for Sections ---
  const m = document.querySelectorAll(".fade-in-section");
  if (m.length > 0) {
    const e = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 }
    );
    m.forEach((t) => {
      e.observe(t);
    });
  }

  // --- Scroll Animation for Project Cards ---
  function u() {
    const e = document.querySelectorAll("section, .project-card"),
      t = window.innerHeight;
    e.forEach((el) => {
      el.getBoundingClientRect().top < t - 60
        ? el.classList.add("is-visible")
        : el.classList.remove("is-visible");
    });
  }
  window.addEventListener("scroll", u);
  u();

  // --- Contact Form Submission ---
  const h = document.getElementById("contact-form");
  if (h) {
    const e = document.getElementById("form-status");
    h.addEventListener("submit", async (t) => {
      t.preventDefault();
      const n = new FormData(t.target);
      try {
        e.innerHTML = "Sending...";
        e.className = "mt-4 text-center text-gray-500";
        const o = await fetch(t.target.action, {
          method: h.method,
          body: n,
          headers: { Accept: "application/json" },
        });
        if (o.ok) {
          e.innerHTML = "Thank you! Your form submission was successful.";
          e.className = "mt-4 text-center text-green-600";
          h.reset();
        } else {
          o.json().then((t) => {
            e.innerHTML = t.errors
              ? t.errors.map((e) => e.message).join(", ")
              : "Oops! There was a problem submitting your form";
            e.className = "mt-4 text-center text-red-600";
          });
        }
      } catch (t) {
        e.innerHTML = "Oops! There was a problem submitting your form";
        e.className = "mt-4 text-center text-red-600";
      }
    });
  }

  // --- Theme Toggle (Light/Dark) ---
  const g = document.getElementById("theme-toggle"),
    f = document.getElementById("icon-moon"),
    v = document.getElementById("icon-sun"),
    y = document.documentElement;
  function E(e) {
    // Switch theme and update icons
    if ("dark" === e) {
      y.classList.add("dark");
      f && v && (f.classList.add("hidden"), v.classList.remove("hidden"));
      localStorage.setItem("theme", "dark");
    } else {
      y.classList.remove("dark");
      f && v && (f.classList.remove("hidden"), v.classList.add("hidden"));
      localStorage.setItem("theme", "light");
    }
  }
  const L = localStorage.getItem("theme");
  if (L) {
    E(L);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    E("dark");
  }
  g &&
    g.addEventListener("click", () => {
      y.classList.contains("dark") ? E("light") : E("dark");
    });

  // --- Blog Card Expand/Collapse Logic ---
  // Ensures only one blog card expands at a time
  function setupBlogCardToggle() {
    document.querySelectorAll('.blog-card-interactive').forEach(function(card) {
      var readMoreBtn = card.querySelector('.read-more-interactive');
      var readLessBtn = card.querySelector('.read-less-interactive');
      var summary = card.querySelector('.blog-summary');
      var full = card.querySelector('.blog-full-content');
      if (readMoreBtn && readLessBtn && summary && full) {
        // Initial state: show summary, hide full content
        summary.classList.remove('hidden');
        full.classList.add('hidden');
        readMoreBtn.classList.remove('hidden');
        readLessBtn.classList.add('hidden');
        // Read More button expands only this card
        readMoreBtn.addEventListener('click', function(e) {
          e.preventDefault();
          // Collapse all other cards
          document.querySelectorAll('.blog-card-interactive').forEach(function(otherCard) {
            if (otherCard !== card) {
              otherCard.querySelector('.blog-summary').classList.remove('hidden');
              otherCard.querySelector('.blog-full-content').classList.add('hidden');
              otherCard.querySelector('.read-more-interactive').classList.remove('hidden');
              otherCard.querySelector('.read-less-interactive').classList.add('hidden');
            }
          });
          // Expand this card
          summary.classList.add('hidden');
          full.classList.remove('hidden');
          readMoreBtn.classList.add('hidden');
          readLessBtn.classList.remove('hidden');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        // Read Less button collapses this card
        readLessBtn.addEventListener('click', function(e) {
          e.preventDefault();
          summary.classList.remove('hidden');
          full.classList.add('hidden');
          readMoreBtn.classList.remove('hidden');
          readLessBtn.classList.add('hidden');
        });
      }
    });
  }
  setupBlogCardToggle();
});
// End of Portfolio Main JavaScript
