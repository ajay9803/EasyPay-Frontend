import { HOST_NAME } from "../constants/auth";
import { handleError } from "../utils/error_handler";

/**
 * Service class for handling quiz related operations.
 */
class QuizService {
  /**
   * Fetches quizzes for the day.
   *
   * @return {Promise<any>} A promise that resolves when the quizzes are fetched.
   */
  static fetchQuizzesForTheDay = async (): Promise<any> => {
    const url = `https://opentdb.com/api.php?amount=3&type=multiple`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (e: any) {
      const error = handleError(e);
      throw error;
    }
  };

  /**
   * Fetches existing quiz data.
   *
   * @param {string} token - The access token.
   * @return {Promise<any>} A promise that resolves with the existing quiz data.
   */
  static fetchExistingQuiz = async (token: string): Promise<any> => {
    const url = `${HOST_NAME}/quiz-data`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e: any) {
      const error = handleError(e);
      throw error;
    }
  };

  /**
   * Creates quiz data.
   *
   * @param {string} token - The access token.
   * @param {number} points - The points to be stored in the quiz data.
   * @return {Promise<void>} A promise that resolves with the created quiz data.
   */
  static createQuizData = async (token: string, points: number) => {
    const url = `${HOST_NAME}/quiz-data`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          points: points,
        }),
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e: any) {
      const error = handleError(e);
      throw error;
    }
  };
}

export default QuizService;
