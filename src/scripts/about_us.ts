export class AboutUsPageActions {
  static loadDots = (): void => {
    const dotsContainer = document.getElementById(
      "dots-container"
    ) as HTMLDivElement;

    for (var i = 0; i < 49; i++) {
      const element = document.createElement("p") as HTMLParagraphElement;
      element.className = "text-4xl";
      element.textContent = ".";
      dotsContainer.appendChild(element);
    }
  };
}
