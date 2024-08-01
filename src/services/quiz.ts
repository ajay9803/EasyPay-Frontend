import { HOST_NAME } from "../constants/auth";

class QuizService {
  static fetchQuizzesForTheDay = async () => {
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
      throw e;
    }
  };

  static fetchExistingQuiz = async (token: string) => {
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
      throw e;
    }
  };

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
      throw e;
    }
  };
}

export default QuizService;
