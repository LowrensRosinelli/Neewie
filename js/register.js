const registerForm = document.getElementById("register-form");
const registerMessageId = "register-message";

function getRegisterSuccessText() {
  return "Registration complete. Check your email and confirm your account before logging in.";
}

async function startRegisterPage() {
  if (!registerForm) {
    return;
  }

  if (!window.neewieAuth.authConfigured()) {
    window.neewieUi.showMessage(
      registerMessageId,
      "Add your Supabase project URL and anon key in js/supabase.js to use registration.",
      "info"
    );
  }

  const { session } = await window.neewieAuth.getSession();

  if (session) {
    registerForm.classList.add("hidden");
    window.neewieUi.showMessage(registerMessageId, "You are already logged in. Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 700);

    return;
  }

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();

    if (!name || !email || !password) {
      window.neewieUi.showMessage(registerMessageId, "Fill in name, email, and password.", "error");
      return;
    }

    window.neewieUi.showMessage(registerMessageId, "Creating your account...", "info");

    const { error } = await window.neewieAuth.registerUser(name, email, password);

    if (error) {
      window.neewieUi.showMessage(registerMessageId, error.message, "error");
      return;
    }

    window.neewieUi.showMessage(registerMessageId, getRegisterSuccessText(), "success");
    registerForm.reset();
  });
}

startRegisterPage();
