// DARK MODE
const themeBtn = document.getElementById("themeBtn");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function updateToggleIcon() {
  if (!themeBtn) return;
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// apply initial icon state
updateToggleIcon();

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  updateToggleIcon();
});

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
    document.body.classList.toggle("nav-open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
      document.body.classList.remove("nav-open");
    });
  });
}

/* --TYPING EFFECT-- */

const TITLES = [
  "Full Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  "Problem Solver",
];
let ti = 0,
  ci = 0,
  deleting = false;
const el = document.getElementById("typedTitle");
el.innerHTML = '<span class="cursor"></span>';

function type() {
  const word = TITLES[ti];
  if (!deleting) {
    el.innerHTML = word.slice(0, ++ci) + '<span class="cursor"></span>';
    if (ci === word.length) {
      deleting = true;
      return setTimeout(type, 1800);
    }
  } else {
    el.innerHTML = word.slice(0, --ci) + '<span class="cursor"></span>';
    if (ci === 0) {
      deleting = false;
      ti = (ti + 1) % TITLES.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}
setTimeout(type, 800);

/* --SCROLL REVEAL-- */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* --SUBMIT FORM-- */

document
  .querySelector(".submit-btn")
  .addEventListener("click", async function () {
    const name = document.querySelectorAll("input")[0].value.trim();
    const email = document.querySelectorAll("input")[1].value.trim();
    const message = document.querySelector("textarea").value.trim();

    // Basic validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    this.textContent = "Sending…";
    this.disabled = true;

    try {
      await emailjs.send(
        "service_m63yhr6", // e.g. 'service_abc123'
        "template_dee7trc", // e.g. 'template_xyz456'
        {
          name: name,
          email: email,
          message: message,
          to_name: "Oladunni Kehinde", // your name
        },
      );

      this.textContent = "✅ Message Sent!";
      this.style.background = "#16a34a";

      // Clear the form
      document.querySelectorAll("input").forEach((i) => (i.value = ""));
      document.querySelector("textarea").value = "";
    } catch (error) {
      this.textContent = "❌ Failed. Try again.";
      this.style.background = "#dc2626";
      console.error("EmailJS error:", error);
      alert("Error: " + JSON.stringify(error));
    }

    this.disabled = false;
    setTimeout(() => {
      this.textContent = "Send Message 🚀";
      this.style.background = "";
    }, 3000);
  });
