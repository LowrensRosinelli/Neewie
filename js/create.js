const createForm = document.getElementById("create-form");
const createMessageId = "create-auth-message";

async function startCreatePage() {
  if (!createForm) {
    return;
  }

  if (!window.neewieAuth.authConfigured()) {
    createForm.classList.add("hidden");
    window.neewieUi.showMessage(
      createMessageId,
      "Add your Supabase project URL and anon key in js/supabase.js before using article creation.",
      "info"
    );
    return;
  }

  const { user } = await window.neewieAuth.getCurrentUser();

  if (!user) {
    createForm.classList.add("hidden");
    window.neewieUi.showMessage(createMessageId, "You need to log in to create an article. Redirecting...", "error");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 900);

    return;
  }

  createForm.classList.remove("hidden");
  window.neewieUi.showMessage(createMessageId, `Logged in as ${window.neewieAuth.getDisplayName(user)}.`, "success");

  createForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(createForm);
    const title = formData.get("title")?.trim();
    const category = formData.get("category")?.trim();
    const body = formData.get("body")?.trim();

    if (!title || !category || !body) {
      window.neewieUi.showMessage(createMessageId, "Fill in title, category, and article text.", "error");
      return;
    }

    window.neewieUi.showMessage(createMessageId, "Publishing article...", "info");

    const article = {
      title,
      body,
      category,
      submitted_by: window.neewieAuth.getDisplayName(user),
      user_id: user.id,
    };

    const { error } = await window.neewieSupabase.client.from("articles").insert(article);

    if (error) {
      window.neewieUi.showMessage(createMessageId, error.message, "error");
      return;
    }

    window.neewieUi.showMessage(createMessageId, "Article published successfully.", "success");
    createForm.reset();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 900);
  });
}

startCreatePage();
