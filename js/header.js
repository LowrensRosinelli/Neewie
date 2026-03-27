const body = document.body;
const currentPage = body.dataset.page;
const navLinks = document.querySelectorAll("[data-nav-link]");
const guestLinks = document.querySelectorAll("[data-guest-link]");
const authLinks = document.querySelectorAll("[data-auth-link]");
const logoutButton = document.querySelector("[data-logout-button]");

function getPageMessageId() {
  if (currentPage === "home") {
    return "articles-message";
  }

  if (currentPage === "create") {
    return "create-auth-message";
  }

  return `${currentPage}-message`;
}

function setNavState(loggedIn) {
  body.dataset.loggedIn = loggedIn ? "true" : "false";

  guestLinks.forEach((link) => {
    link.classList.toggle("hidden", loggedIn);
  });

  authLinks.forEach((link) => {
    link.classList.toggle("hidden", !loggedIn);
  });
}

async function startHeader() {
  navLinks.forEach((link) => {
    if (link.dataset.navLink === currentPage) {
      link.classList.add("active-link");
    }
  });

  if (!window.neewieAuth || !window.neewieAuth.authConfigured()) {
    setNavState(false);
    return;
  }

  const { session } = await window.neewieAuth.getSession();
  setNavState(Boolean(session));

  window.neewieAuth.onAuthChange((nextSession) => {
    setNavState(Boolean(nextSession));
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    if (!window.neewieAuth) {
      return;
    }

    const { error } = await window.neewieAuth.logoutUser();

    if (error) {
      if (window.neewieUi) {
        window.neewieUi.showMessage(getPageMessageId(), error.message, "error");
      }

      return;
    }

    window.location.href = "index.html";
  });
}

startHeader();
