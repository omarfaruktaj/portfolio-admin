export type User = {
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
