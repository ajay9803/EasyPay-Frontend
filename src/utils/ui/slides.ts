/**
 * Class representing a slideshow component.
 * @class
 */
export class Slides {
  private parentEl: HTMLDivElement;
  private carouselEl: HTMLDivElement;
  private images: string[];
  private counter: number;
  private direction: number;
  private intervalId: number | null;

  constructor(parentEl: HTMLDivElement, images: string[]) {
    this.parentEl = parentEl;
    this.carouselEl = document.createElement("div") as HTMLDivElement;
    this.carouselEl.classList.add("carousel-inner");
    this.images = images;
    this.counter = 0;
    this.direction = 1;
    this.intervalId = null;
    this.createSlider();
  }

  /**
   * Creates a slider component.
   *
   * @return {void} No return value
   */
  createSlider = (): void => {
    this.images.forEach((image: string, index: number) => {
      const imageElement = document.createElement("img") as HTMLImageElement;
      imageElement.src = image;
      imageElement.classList.add("carousel-inner-img");
      imageElement.style.left = `${index * 100}%`;
      this.carouselEl.appendChild(imageElement);
    });
    this.parentEl.appendChild(this.carouselEl);

    this.startAutoSlide();
  };

  /**
   * Starts the auto slide of the slideshow.
   *
   * @return {void} No return value
   */
  startAutoSlide = (): void => {
    this.intervalId = setInterval(() => {
      this.counter += this.direction;

      const slides = this.carouselEl.querySelectorAll(
        ".carousel-inner-img"
      ) as NodeListOf<HTMLImageElement>;

      if (this.counter === slides.length - 1) {
        this.direction = -1;
      } else if (this.counter === 0) {
        this.direction = 1;
      }

      this.slideImage(slides);
    }, 2000);
  };

  slideImage = (slides: NodeListOf<HTMLImageElement>): void => {
    /**
     * Iterates over each slide and applies the slide transition.
     *
     * @param {NodeListOf<HTMLImageElement>} slides - The slides to be iterated over.
     * @return {void} No return value.
     */
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${this.counter * 100}%)`;
    });
  };
}
