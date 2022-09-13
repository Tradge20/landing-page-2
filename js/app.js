/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
let sectTops = [];
/**
 * Start Helper Functions
 *
 */
function getSectTops() {
  const footTop =
    document.getElementById("foot").getBoundingClientRect().top +
    window.pageYOffset;
  for (let i = 0; i < sections.length; i++) {
    let tp = sections[i].getBoundingClientRect().top + window.pageYOffset;
    sectTops[i] = tp;
    if (i + 1 == sections.length) {
      sectTops[i + 1] = footTop;
    }
  }
  console.log(window.pageYOffset);
}

// removes active classes from sections and anchors
function activeSect() {
  const ancs = document.querySelectorAll("a");
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("your-active-class");
    ancs[i].classList.remove("active");
  }
}

function chkScroll() {
  const pos = window.pageYOffset;
  const ancs = document.querySelectorAll("a");
  for (let i = 0; i < sections.length; i++) {
    const pos1 = sectTops[i];
    const pos2 = sectTops[i + 1];
    if (pos1 <= pos && pos2 > pos) {
      activeSect();
      sections[i].classList.add("your-active-class");
      ancs[i].classList.add("active");
    }
  }
}

// build the nav
function bldNav() {
  for (let i = 0; i < sections.length; i++) {
    const navMenu = document.getElementById("navbar__list");
    const navItem = document.createElement("li");
    const navItemAnchor = document.createElement("a");

    const aText = sections[i].getAttribute("data-nav");
    navItemAnchor.classList.add("navItemAnc");
    navItemAnchor.innerHTML = aText;
    navItem.classList.add("navItem");

    navItemAnchor.setAttribute("href", "#" + sections[i].id);
    navItemAnchor.setAttribute("data-id", sections[i].id);

    navItem.append(navItemAnchor);
    navMenu.append(navItem);

    // sets anchors in nav to active and strolls to selected section
    navItemAnchor.addEventListener("click", function (event) {
      event.preventDefault();
      const sectId = this.getAttribute("data-id");
      const sectToScroll = document.getElementById(sectId);

      activeSect();
      this.classList.add("active");
      sectToScroll.classList.add("your-active-class");
      sectToScroll.scrollIntoView({
        behavior: "smooth",
      });
    });
  }
}

bldNav();
getSectTops();
window.addEventListener("scroll", chkScroll);
// Build menu

// Scroll to section on link click

// Set sections as active
