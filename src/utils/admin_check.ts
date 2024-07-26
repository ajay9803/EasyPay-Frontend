export const isUserAdmin: (roleId: string) => boolean = (roleId: string) => {
  if (roleId === "1") {
    return true;
  } else {
    return false;
  }
};
