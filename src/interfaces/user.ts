export interface INewUser {
  username: string;
  email: string;
  dob: string;
  gender: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  balance: string;
  createdAt: string;
  updatedAt: string | null;
  dob: string;
  gender: string;
  isVerified: boolean;
  roleId: string;
  permissions: string[];
}
