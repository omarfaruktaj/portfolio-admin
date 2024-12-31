import api from "@/config/api";
import { Experience, ExperienceResponse } from "@/types";
import { AxiosError } from "axios";

// Get all experiences
export const getExperiences = async (): Promise<ExperienceResponse[]> => {
  try {
    const { data } = await api.get("/experiences");
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

// Create a new experience
export const createExperience = async (
  formData: Experience
): Promise<ExperienceResponse> => {
  try {
    const { data } = await api.post("/experiences", formData);
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

// Update an existing experience
export const updateExperience = async (
  id: string,
  formData: Experience
): Promise<ExperienceResponse> => {
  try {
    const { data } = await api.put(`/experiences/${id}`, formData);
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

// Delete an experience
export const deleteExperience = async (
  id: string
): Promise<ExperienceResponse> => {
  try {
    const { data } = await api.delete(`/experiences/${id}`);
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
