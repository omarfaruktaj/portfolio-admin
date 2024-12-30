export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user" | "guest";
  profilePicture: string;
  bio?: string;
  isActive: boolean;
  last_login?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  githubUrl?: string;
  frontendGithubUrl?: string;
  backendGithubUrl?: string;
  isFullStack: boolean;
  imageUrl: string;
};

export type ProjectResponse = {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  githubUrl?: string;
  frontendGithubUrl?: string;
  backendGithubUrl?: string;
  isFullStack: boolean;
  imageUrl: string;
};

export type BlogPost = {
  title: string;
  content: string;
  tags: string[];
  author: string;
  image: string;
};

export type BlogPostResponse = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  author: string;
  isPublished: boolean;
  publicationDate: Date;
  createdAt: Date;
  updatedAt: Date;
  image: string;
};
