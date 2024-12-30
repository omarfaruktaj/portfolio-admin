import api from "@/config/api";
import { BlogPost, BlogPostResponse } from "@/types";
import { AxiosError } from "axios";

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPostResponse[]> => {
  try {
    const { data } = await api.get("/articles");
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

// Create a new blog post
export const createBlogPost = async (
  formData: BlogPost
): Promise<BlogPostResponse> => {
  try {
    const { data } = await api.post("/articles", formData);
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

// Update an existing blog post
export const updateBlogPost = async (
  id: string,
  formData: BlogPost
): Promise<BlogPostResponse> => {
  try {
    const { data } = await api.put(`/articles/${id}`, formData);
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

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<BlogPostResponse> => {
  try {
    const { data } = await api.delete(`/articles/${id}`);
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
