function showMessage(targetId, text, type) {
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.textContent = text;
  target.className = "alert";

  if (type === "success") {
    target.classList.add("alert-success");
    return;
  }

  if (type === "error") {
    target.classList.add("alert-error");
    return;
  }

  target.classList.add("alert-info");
}

function clearMessage(targetId) {
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.textContent = "";
  target.className = "alert hidden";
}

window.neewieUi = {
  showMessage,
  clearMessage,
};
