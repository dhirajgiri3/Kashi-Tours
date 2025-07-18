import imagesLoaded from "imagesloaded";

export const preloadImages = (selector: string = "img"): Promise<void> => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      () => resolve()
    );
  });
};
