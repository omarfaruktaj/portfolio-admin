import api from "@/config/api";
import { Project } from "@/types";
import { AxiosError } from "axios";

export const getProjects = async (): Promise<Project> => {
  try {
    const { data } = await api.get("/projects");
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

export const createProject = async (formData: Project): Promise<Project> => {
  try {
    const { data } = await api.post("/projects", formData);
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

export const updateProject = async (
  id: string,
  formData: Project
): Promise<Project> => {
  try {
    const { data } = await api.put(`/projects/${id}`, formData);
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

export const deleteProject = async (id: string): Promise<Project> => {
  try {
    const { data } = await api.delete(`/projects/${id}`);
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
