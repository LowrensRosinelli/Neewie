const articleList = document.getElementById("article-list");
const articlesMessageId = "articles-message";
const articlesEmptyState = document.getElementById("articles-empty");

function shortDate(dateText) {
  if (!dateText) {
    return "";
  }

  return new Date(dateText).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function cutText(text) {
  if (!text) {
    return "";
  }

  if (text.length <= 150) {
    return text;
  }

  return `${text.slice(0, 150)}...`;
}

function articleCard(article) {
  return `
    <article class="lot-card">
      <div class="lot-meta-label">${article.category || "General"}</div>
      <h3 class="lot-card-title">${article.title}</h3>
      <p class="muted-copy">${cutText(article.body)}</p>
      <div class="lot-meta-row">
        <span>By ${article.submitted_by || "Neewie writer"}</span>
        <span>${shortDate(article.created_at)}</span>
      </div>
    </article>
  `;
}

async function loadArticles() {
  if (!articleList) {
    return;
  }

  if (!window.neewieSupabase.isReady) {
    articleList.innerHTML = "";
    articlesEmptyState.classList.add("hidden");
    window.neewieUi.showMessage(
      articlesMessageId,
      "Add your Supabase project URL and anon key in js/supabase.js to load articles.",
      "info"
    );
    return;
  }

  window.neewieUi.showMessage(articlesMessageId, "Loading articles...", "info");

  const { data, error } = await window.neewieSupabase.client
    .from("articles")
    .select("id, title, body, category, submitted_by, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    articleList.innerHTML = "";
    articlesEmptyState.classList.add("hidden");
    window.neewieUi.showMessage(articlesMessageId, error.message, "error");
    return;
  }

  if (!data || data.length === 0) {
    articleList.innerHTML = "";
    articlesEmptyState.classList.remove("hidden");
    window.neewieUi.clearMessage(articlesMessageId);
    return;
  }

  articlesEmptyState.classList.add("hidden");
  articleList.innerHTML = data.map(articleCard).join("");
  window.neewieUi.clearMessage(articlesMessageId);
}

loadArticles();
