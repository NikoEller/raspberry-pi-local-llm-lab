const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-nav]");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation?.classList.toggle("open", !open);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.closest(".code-block")?.querySelector("code")?.textContent;
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      const previous = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => { button.textContent = previous; }, 1400);
    } catch {
      button.textContent = "Select text";
    }
  });
});

const dialog = document.querySelector("[data-lightbox-dialog]");
const dialogImage = document.querySelector("[data-lightbox-image]");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!(dialog instanceof HTMLDialogElement) || !(dialogImage instanceof HTMLImageElement)) return;
    dialogImage.src = button.dataset.lightbox;
    dialog.showModal();
  });
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
