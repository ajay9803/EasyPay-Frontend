import { IQuiz } from "../interfaces/quiz";
import QuizService from "../services/quiz";
import UserService from "../services/user";
import { processQuizData } from "../utils/html_decode";
import { Toast } from "../utils/toast";
import UserUtils from "../utils/user";

/**
 * Class representing the actions for the quiz page.
 */
export class QuizPageActions {
  /**
   * Fetches quizzes for the day asynchronously.
   *
   * @return {Promise<void>} A promise that resolves when the quizzes are fetched.
   */
  static fetchQuizzesForTheDay = async (): Promise<void> => {
    const userAnswers: string[] = [];

    /**
     * Define elements of quiz page
     */
    const quizDiv = document.getElementById("quiz-div") as HTMLDivElement;
    const quizQuestions = document.getElementById(
      "quiz-questions"
    ) as HTMLDivElement;

    const prevButton = document.getElementById(
      "prev-button"
    ) as HTMLButtonElement;
    const nextButton = document.getElementById(
      "next-button"
    ) as HTMLButtonElement;
    const pageSpan = document.getElementById("page-span") as HTMLSpanElement;

    const submitQuizAnswersButton = document.getElementById(
      "quiz-submit"
    ) as HTMLButtonElement;

    let answers: string[];

    /**
     * Handles the click event for the submit quiz answers button.
     * It calculates the points based on the user's answers and sends the data to the server.
     *
     * @param {MouseEvent} e - The click event.
     * @return {Promise<void>} A promise that resolves when the quiz data is created and the user is redirected back.
     */
    submitQuizAnswersButton.onclick = async (e: MouseEvent): Promise<void> => {
      e.preventDefault();
      let points: number = 0;
      if (userAnswers.length < 3) {
        Toast.showToast("Please answer all the questions.");
        return;
      }

      answers.forEach((answer: string, index: number) => {
        if (answer === userAnswers[index]) {
          points++;
        }
      });

      const accessToken = UserUtils.getAccessToken();

      /**
       * Initiate create quiz data to store today's points
       */
      await QuizService.createQuizData(accessToken, points)
        .then(async (data) => {
          await UserService.updateEasyPayPoints(accessToken, points);
          Toast.showToast(data.message);
          history.back();
        })
        .catch((e) => {
          Toast.showToast(e.message);
        });
    };

    try {
      const data = await QuizService.fetchQuizzesForTheDay();

      let results: IQuiz[] = data.results;

      answers = results.map((result: any) => {
        return result.correct_answer;
      });

      let pageNumber: number = 1;

      pageSpan.textContent = `${pageNumber} / ${results.length}`;

      results.forEach((quiz: any, index: number) => {
        let counter = 0;

        quiz = processQuizData(quiz);
        const quizItem = document.createElement("div");
        quizItem.classList.add("quiz-item");
        quizItem.style.left = `${index * 100}%`;

        const question = document.createElement("p") as HTMLParagraphElement;
        question.classList.add("quiz-question");
        question.textContent = quiz.question;

        const optionsDiv = document.createElement("div") as HTMLDivElement;
        optionsDiv.classList.add("options-div");

        // Combine correct and incorrect answers, then shuffle
        const options = [quiz.correct_answer, ...quiz.incorrect_answers].sort(
          () => Math.random() - 0.5
        );

        options.forEach((option) => {
          const optionButton = document.createElement("button");
          optionButton.classList.add("option-button");

          optionButton.textContent = option;

          // Add event listener to check answer
          optionButton.addEventListener("click", () => {
            userAnswers[index] = option;
            if (counter === 2) {
              submitQuizAnswersButton.style.display = "block";
            }

            const optionButtons = document.querySelectorAll(
              ".option-button"
            ) as NodeListOf<HTMLDivElement>;

            /**
             * Highlight selected option
             */
            optionButtons.forEach((theOptionsButton) => {
              if (userAnswers[index] === theOptionsButton.textContent) {
                theOptionsButton.style.backgroundColor = "blue";
                theOptionsButton.style.color = "white";
              } else {
                theOptionsButton.style.backgroundColor = "transparent";
                theOptionsButton.style.color = "black";
              }
            });
          });

          optionsDiv.appendChild(optionButton);
        });
        quizItem.appendChild(question);
        quizItem.appendChild(optionsDiv);
        quizQuestions.appendChild(quizItem);

        const slides = document.querySelectorAll(
          ".quiz-item"
        ) as NodeListOf<HTMLDivElement>;

        prevButton.onclick = () => {
          if (counter === 0) {
            return;
          } else {
            counter--;
            slideImage();

            pageSpan.textContent = `${counter + 1} / ${results.length}`;
          }
        };

        /**
         * Handles the click event for the next button in the quiz.
         * If the current counter is the last slide, it returns and does nothing.
         * Otherwise, it increments the counter, updates the page span with the current slide number,
         * and calls the slideImage function to update the slide.
         * If the counter reaches the last slide, it hides the next button.
         *
         * @return {void}
         */
        nextButton.onclick = (): void => {
          if (counter === slides.length - 1) {
            return;
          } else {
            if (counter !== userAnswers.length - 1) {
              Toast.showToast("Please answer the question to continue.");
              return;
            }
            counter++;
            if (counter === slides.length - 1) {
              nextButton.style.display = "none";
            }
            slideImage();

            pageSpan.textContent = `${counter + 1} / ${results.length}`;
          }
        };

        /**
         * Slides the images in the carousel.
         *
         * @return {void} No return value.
         */
        const slideImage = (): void => {
          slides.forEach((slide) => {
            slide.style.transform = `translateX(-${counter * 100}%)`;
          });
        };
      });
    } catch (e: any) {
      quizDiv.innerHTML = e.message;
      quizDiv.style.color = "white";
      quizDiv.style.textAlign = "center";
      Toast.showToast(e.message);
    }
  };
}
