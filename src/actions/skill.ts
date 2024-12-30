import api from "@/config/api";
import { Skill, SkillResponse } from "@/types";
import { AxiosError } from "axios";

// Get all skills
export const getSkills = async (): Promise<SkillResponse[]> => {
  try {
    const { data } = await api.get("/skills");
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

// Create a new skill
export const createSkill = async (formData: Skill): Promise<SkillResponse> => {
  try {
    const { data } = await api.post("/skills", formData);
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

// Update an existing skill
export const updateSkill = async (
  id: string,
  formData: Skill
): Promise<SkillResponse> => {
  try {
    const { data } = await api.put(`/skills/${id}`, formData);
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

// Delete a skill
export const deleteSkill = async (id: string): Promise<SkillResponse> => {
  try {
    const { data } = await api.delete(`/skills/${id}`);
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
