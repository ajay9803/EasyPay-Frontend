/**
 * Checks if the user with the given roleId is an admin.
 *
 * @param {string} roleId - The roleId of the user.
 * @returns {boolean} - True if the user is an admin, false otherwise.
 */
export const isUserAdmin = (roleId: string): boolean => {
  if (roleId === "1") {
    return true;
  } else {
    return false;
  }
};
