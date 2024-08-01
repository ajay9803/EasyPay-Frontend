import { QuizPageActions } from "../scripts/quiz";

/**
 * Class representing a QuizPage.
 * @class
 */
export class QuizPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/quiz.html");
    return response.text();
  };
  

  /**
   * Initializes the event listeners for the QuizPage.
   * 
   * @return {void} This function does not return anything.
   */
  static initEventListeners: () => void = (): void => {
    QuizPageActions.fetchQuizzesForTheDay();
  };
}
