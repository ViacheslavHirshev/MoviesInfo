export interface IMovie {
  id: number;
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-Ray";
  actors: IActor[];
  createdAt: string;
  updatedAt: string;
}

export interface INewMovie {
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-Ray";
  actors: string[];
}

export interface IActor {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface INewUserData extends IUserData {
  name: string;
  confirmPassword: string;
}

export type TSortOption = "default" | "alphabetical";
