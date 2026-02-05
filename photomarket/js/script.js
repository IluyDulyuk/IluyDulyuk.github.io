window.addEventListener("DOMContentLoaded", () => {
  // Скролл табов в шапке
  const headerTabsScrollContainer = document.querySelector(
    ".header-tabs-scroll-container",
  );
  const headerTabsPrev = document.querySelector(".header-tabs-prev");
  const headerTabsNext = document.querySelector(".header-tabs-next");
  const headerTabsScrollStep = 150;

  function updateHeaderTabsButtons() {
    const scrollLeft = headerTabsScrollContainer.scrollLeft;
    const maxScrollLeft =
      headerTabsScrollContainer.scrollWidth -
      headerTabsScrollContainer.clientWidth;

    headerTabsPrev.classList.toggle("visible", scrollLeft > 0);

    headerTabsNext.classList.toggle("visible", scrollLeft < maxScrollLeft - 1);
  }

  headerTabsScrollContainer.addEventListener("scroll", updateHeaderTabsButtons);

  headerTabsPrev.onclick = () =>
    headerTabsScrollContainer.scrollBy({
      left: -headerTabsScrollStep,
      behavior: "smooth",
    });
  headerTabsNext.onclick = () =>
    headerTabsScrollContainer.scrollBy({
      left: headerTabsScrollStep,
      behavior: "smooth",
    });

  updateHeaderTabsButtons();

  window.addEventListener("resize", () => {
    updateHeaderTabsButtons();
  });

  // Увеличение фото
  const gallaryModal = document.querySelector(".gallery-modal");
  const gallaryModalImg = gallaryModal.querySelector("img");
  const gallaryModalClose = document.querySelector(".gallery-modal-close");
  const gallaryWrapperItems = document.querySelectorAll(
    ".gallery-wrapper-item",
  );

  gallaryWrapperItems.forEach((item) => {
    const img = item.querySelector("img");

    item.addEventListener("click", () => {
      gallaryModalImg.src = item.getAttribute("data-src");
      gallaryModal.classList.add("active");
    });

    img.addEventListener("load", () => {
      img.classList.add("is-loaded");
    });
  });

  gallaryModalClose.addEventListener("click", () => {
    gallaryModalImg.src = "";
    gallaryModal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === gallaryModal) {
      gallaryModalImg.src = "";
      gallaryModal.classList.remove("active");
    }
  });

  // Мобильное меню

  const hero = document.querySelector(".hero");
  const heroHeight = hero.clientHeight;
  const mobileMenu = document.querySelector(".mobile-menu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > heroHeight) {
      mobileMenu.classList.add("active");
    } else {
      mobileMenu.classList.remove("active");
    }
  });
});
