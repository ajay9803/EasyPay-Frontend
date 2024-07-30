/**
 * A utility class for manipulating and formatting dates.
 */
class DateUtils {
  /**
   * Formats the given date string into a human-readable date format.
   *
   * @param {string} date - The date string to format.
   * @return {string} The formatted date string.
   */
  static formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  /**
   * Formats the given date in milliseconds into a human-readable date format.
   *
   * @param {number} milliseconds - The date in milliseconds to format.
   * @return {string} The formatted date string.
   */
  static formatDateFromMilliseconds = (milliseconds: number): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(milliseconds).toLocaleDateString(undefined, options);
  };

  /**
   * Formats the given date string into the format "YYYY-MM-DD".
   *
   * @param {string} date - The date string to format.
   * @return {string} The formatted date string in the format "YYYY-MM-DD".
   */
  static formatToYYYYMMDD = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };
}

export default DateUtils;
