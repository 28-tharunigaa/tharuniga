"use strict";

// preloaded animation
const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// add event on multiple elements
const addEventOnElements = function (elements, eventType, callBack) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callBack);
  }
};

// mobile navbar togger
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});

// Element tilt effect
const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;

  const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;

  this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${
    tiltPosY - tiltPosY * 2
  }deg)`;
};
addEventOnElements(tiltElements, "mousemove", initTilt);

const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContent = document.querySelectorAll("[data-tab-content]");

let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContent[0];

const filterContent = function () {
  if (!(lastActiveTabBtn === this)) {
    lastActiveTabBtn.classList.remove("active");
    lastActiveTabContent.classList.remove("active");

    this.classList.add("active");
    lastActiveTabBtn = this;

    const currentTabContent = document.querySelector(
      `[data-tab-content="${this.dataset.tabBtn}"]`
    );

    currentTabContent.classList.add("active");
    lastActiveTabContent = currentTabContent;
  }
};

addEventOnElements(tabBtns, "click", filterContent);

// custom cursor
const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [
  ...document.querySelectorAll("button"),
  ...document.querySelectorAll("a"),
];
window.addEventListener("mousemove", function (event) {
  const posX = event.clientX;
  const posY = event.clientY;

  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;

  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);
});

addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});

// Particle.js configuration and parallax effect
particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 1000 } },
    color: { value: ["#00ddeb", "#ff007a", "#ffffff"] },
    shape: { type: "circle" },
    opacity: { value: 0.6, random: true },
    size: { value: 4, random: true },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.3,
      width: 1.5,
    },
    move: {
      enable: true,
      speed: 4,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 150, line_linked: { opacity: 0.7 } },
      push: { particles_nb: 5 },
    },
  },
  retina_detect: true,
});

const particlesContainer = document.getElementById("particles-js");
const bgGradient = document.querySelector(".bg-gradient");

document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const { innerWidth: width, innerHeight: height } = window;

  const mouseXPercent = clientX / width - 0.5;
  const mouseYPercent = clientY / height - 0.5;

  const particlesMoveX = mouseXPercent * 20;
  const particlesMoveY = mouseYPercent * 20;
  particlesContainer.style.transform = `translate(${particlesMoveX}px, ${particlesMoveY}px)`;

  const gradientMoveX = mouseXPercent * 50;
  const gradientMoveY = mouseYPercent * 50;
  bgGradient.style.transform = `translate(${gradientMoveX}px, ${gradientMoveY}px)`;
});

const element = document.getElementById("typing-text");
const text = "I'm a Passionate Software Developer";
let index = 0;
let isDeleting = false;

function typeEffect() {
  if (isDeleting) {
    element.textContent = text.substring(0, index--);
    if (index < 0) {
      isDeleting = false;
    }
  } else {
    element.textContent = text.substring(0, index++);
    if (index > text.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000); // pause after full text
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 80 : 150);
}

typeEffect();

(function () {
  const phrases = ["Big Dreams Need Bold Execution. Let's Start."];
  const element = document.getElementById("loop-text");
  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
    const currentText = isDeleting
      ? currentPhrase.substring(0, letterIndex--)
      : currentPhrase.substring(0, letterIndex++);

    element.textContent = currentText;

    if (!isDeleting && letterIndex === currentPhrase.length + 1) {
      isDeleting = true;
      setTimeout(typeLoop, 1000); // pause after typing
      return;
    }

    if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(typeLoop, isDeleting ? 60 : 120);
  }

  typeLoop();
})();
// Show success message for 4 seconds
function showMessage() {
  const message = document.getElementById("form-message");
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 4000);
}

// Initialize EmailJS
(function () {
  emailjs.init("GiKKeuioNd0XGI7-c"); // ✅ Replace with your PUBLIC KEY
})();

// Get form elements
const form = document.getElementById("myForm");
const successMsg = document.getElementById("form-message");
const submitBtn = document.getElementById("submitBtn");

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Disable button during sending
  submitBtn.disabled = true;
  submitBtn.querySelector(".span").textContent = "Sending...";

  // Send the email
  emailjs
    .sendForm("service_wp0m4t2", "template_i7sb8sg", form)
    .then(function () {
      showMessage(); // Show success message
      form.reset(); // Clear form
    })
    .catch(function (error) {
      alert("❌ Failed to send message: " + JSON.stringify(error));
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector(".span").textContent = "Send Email";
    });
});
