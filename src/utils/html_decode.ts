import { IQuiz } from "../interfaces/quiz";

/**
 * Decodes HTML entities in a given string.
 *
 * @param {string} html - The string containing HTML entities to be decoded.
 * @return {string} The decoded string.
 */
export const decodeHTML = (html: string): string => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = html;
  return textArea.value;
};

/**
 * Decodes HTML entities in the question, correct answer, and incorrect answers of a quiz data object.
 *
 * @param {IQuiz} quizData - The quiz data object containing the question, correct answer, and incorrect answers.
 * @return {IQuiz} The quiz data object with decoded HTML entities.
 */
export const processQuizData = (quizData: IQuiz) => {
  quizData.question = decodeHTML(quizData.question);
  quizData.correct_answer = decodeHTML(quizData.correct_answer);
  quizData.incorrect_answers = quizData.incorrect_answers.map(decodeHTML);

  return quizData;
};
