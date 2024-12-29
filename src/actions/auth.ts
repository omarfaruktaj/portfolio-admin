import api from "@/config/api";
import { LoginSchemaType, RegisterSchemaType } from "@/schemas/auth";
import axios, { AxiosError } from "axios";

export type LoginResponseData = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export const registerUser = async (formData: RegisterSchemaType) => {
  try {
    const { data } = await axios.post(
      "/auth/register",
      formData
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "An error occurred");
      } else {
        throw new Error(error.message || "An error occurred");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const loginUser = async (
  formData: LoginSchemaType
): Promise<LoginResponseData> => {
  try {
    const { data } = await api.post(
      "/auth/login",
      formData
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "An error occurred");
      } else {
        throw new Error(error.message || "An error occurred");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
}

export const getMe = async (): Promise<UserInterface> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      "auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "An error occurred");
      } else {
        throw new Error(error.message || "An error occurred");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
