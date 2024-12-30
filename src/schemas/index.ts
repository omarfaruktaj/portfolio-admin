import { z } from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const projectSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Project title must be at least 3 characters long" })
    .trim()
    .max(255, { message: "Project title can't be more than 255 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(1000, { message: "Description can't be more than 1000 characters" }),

  technologies: z
    .array(optionSchema)
    .nonempty({ message: "At least one technology must be specified" }),

  link: z.string().url({ message: "Project link must be a valid URL" }),

  githubUrl: z.string().optional(),
  frontendGithubUrl: z.string().optional(), // Optional field

  backendGithubUrl: z.string().optional(),

  isFullStack: z.boolean().default(false),

  imageUrl: z
    .string()
    .regex(urlRegex, { message: "Image URL must be a valid URL" }),
});

const articleSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Article title must be at least 5 characters long" })
    .trim()
    .refine((value) => value.length > 0, {
      message: "Article title is required",
    }),

  content: z
    .string()
    .min(20, { message: "Article content must be at least 20 characters long" })
    .refine((value) => value.length > 0, {
      message: "Article content is required",
    }),

  tags: z.array(optionSchema).optional(),

  category: z.enum(
    [
      "Technology",
      "Health",
      "Education",
      "Business",
      "Entertainment",
      "Lifestyle",
      "Science",
      "Travel",
      "Finance",
      "Food",
      "Sports",
      "Politics",
      "Art",
      "Music",
      "Environment",
      "Social Issues",
      "Books",
      "Movies",
      "Gaming",
    ],
    {
      errorMap: () => ({ message: "Category is required" }),
    }
  ),

  image: z.string().url().optional(),
});

const testimonialSchema = z.object({
  clientName: z.string().min(1, { message: "Client name is required" }),
  content: z.string().min(10, {
    message: "Testimonial content must be at least 10 characters long",
  }),
  rating: z
    .number()
    .min(1, { message: "Rating must be between 1 and 5" })
    .max(5, { message: "Rating must be between 1 and 5" }),
  company: z.string().min(1, { message: "Company name is required" }),
  isActive: z.boolean().optional().default(true),
});

const analyticsSchema = z.object({
  page: z.string().min(1, { message: "Page name is required" }),
  views: z
    .number()
    .min(0, { message: "Views must be a non-negative number" })
    .optional(),
  uniqueVisitors: z
    .number()
    .min(0, { message: "Unique Visitors must be a non-negative number" })
    .optional(),
  totalClicks: z
    .number()
    .min(0, { message: "Total Clicks must be a non-negative number" })
    .optional(),
  engagementRate: z
    .number()
    .min(0, { message: "Engagement rate must be a non-negative number" })
    .optional(),
  formSubmissions: z
    .number()
    .min(0, { message: "Form submissions must be a non-negative number" })
    .optional(),
});

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
  phone: z.string().optional(),
  isResponded: z.boolean().optional().default(false),
  respondedAt: z.date().optional(),
});

const SkillCategoryEnum = z.enum([
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Soft Skills",
]);
const ProficiencyEnum = z.enum([
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
]);

const skillSchema = z.object({
  name: z
    .string()
    .min(2, "Skill name must be at least 2 characters")
    .trim()
    .nonempty("Skill name is required"),

  category: SkillCategoryEnum.refine(
    (val) =>
      ["Frontend", "Backend", "Database", "Tools", "Soft Skills"].includes(val),
    {
      message:
        "Category must be one of: Frontend, Backend, Database, Tools, Soft Skills",
    }
  ),

  proficiency: ProficiencyEnum.default("Intermediate"),
});

const userSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),

  lastName: z.string().trim().min(1, "Last name is required"),

  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .min(1, "Email is required"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  role: z.enum(["admin", "user", "guest"]).default("user"),

  profilePicture: z
    .string()
    .url("Profile picture URL must be a valid URL")
    .default("https://example.com/default-profile.jpg"),

  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),

  isActive: z.boolean().default(true),

  lastLogin: z.date().optional(),
});

const registerSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),

  last_name: z.string().trim().min(1, "Last name is required"),

  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .min(1, "Email is required"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  role: z.enum(["admin", "user", "guest"]).default("user"),

  profilePicture: z
    .string()
    .url("Profile picture URL must be a valid URL")
    .default("https://example.com/default-profile.jpg"),

  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
});
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .min(1, "Email is required"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export {
  analyticsSchema,
  articleSchema,
  contactFormSchema,
  loginSchema,
  projectSchema,
  registerSchema,
  skillSchema,
  testimonialSchema,
  userSchema,
};

export type UserType = z.infer<typeof userSchema>;
export type ProjectType = z.infer<typeof projectSchema>;
export type ArticleType = z.infer<typeof articleSchema>;
export type TestimonialType = z.infer<typeof testimonialSchema>;
export type AnalyticsType = z.infer<typeof analyticsSchema>;
export type ContactFormSubmissionType = z.infer<typeof contactFormSchema>;
export type SkillType = z.infer<typeof skillSchema>;
