import { INewUserData, IRegResponse, IUserData } from "../../types/types";
import { authApi } from "../authApi";

export const registerUser = async (
  newUserData: INewUserData
): Promise<IRegResponse> => {
  const response = await authApi.post("/users", newUserData);
  return response.data;
};

export const loginUser = async (userData: IUserData): Promise<string> => {
  const response = await authApi.post("/sessions", userData);
  return response.data.token;
};
