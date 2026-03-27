const loginForm = document.getElementById("login-form");
const loginMessageId = "login-message";

async function startLoginPage() {
  if (!loginForm) {
    return;
  }

  if (!window.neewieAuth.authConfigured()) {
    window.neewieUi.showMessage(
      loginMessageId,
      "Add your Supabase project URL and anon key in js/supabase.js to use login.",
      "info"
    );
  }

  const { session } = await window.neewieAuth.getSession();

  if (session) {
    loginForm.classList.add("hidden");
    window.neewieUi.showMessage(loginMessageId, "You are already logged in. Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 700);

    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();

    if (!email || !password) {
      window.neewieUi.showMessage(loginMessageId, "Enter both email and password.", "error");
      return;
    }

    window.neewieUi.showMessage(loginMessageId, "Signing in...", "info");

    const { error } = await window.neewieAuth.loginUser(email, password);

    if (error) {
      window.neewieUi.showMessage(loginMessageId, error.message, "error");
      return;
    }

    window.neewieUi.showMessage(loginMessageId, "Login successful. Redirecting...", "success");
    loginForm.reset();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 700);
  });
}

startLoginPage();
