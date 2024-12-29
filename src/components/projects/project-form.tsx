// import { createProject } from "@/actions/projects";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { TECHNOLOGY_OPTIONS } from "@/constants";
// import { projectSchema, ProjectType } from "@/schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import ImageInput from "../image-input";
// import { Checkbox } from "../ui/checkbox";
// import MultipleSelector from "../ui/multiple-selector";
// import { Textarea } from "../ui/textarea";

// export default function ProjectForm() {
//   const mutation = useMutation({
//     mutationFn: createProject,
//     onSuccess: () => {
//       toast.success("Project successfully submitted!");
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   const form = useForm<ProjectType>({
//     resolver: zodResolver(projectSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       technologies: [],
//       link: "",
//       imageUrl: "",
//       githubUrl: "",
//       frontendGithubUrl: "",
//       backendGithubUrl: "",
//       isFullStack: false,
//     },
//   });

//   async function onSubmit(values: ProjectType) {
//     console.log(values);
//     // await mutation.mutateAsync(values);
//   }

//   return (
//     <div>
//       <div>
//         <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
//           Add New Project
//         </h2>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
//           >
//             <FormField
//               control={form.control}
//               name="imageUrl"
//               className="h-44 w-44 rounded-md"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Image</FormLabel>
//                   <FormControl>
//                     <ImageInput
//                       value={field.value as string}
//                       disabled={mutation.isPending}
//                       onChange={(url) => field.onChange(url)}
//                       onRemove={() => field.onChange("")}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/* Title Field */}
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Project Title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter project title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Description Field */}
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Enter project description"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Technologies Field (Multiple options) */}
//             <FormField
//               control={form.control}
//               name="technologies"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Technologies</FormLabel>
//                   <FormControl>
//                     <MultipleSelector
//                       {...field}
//                       defaultOptions={TECHNOLOGY_OPTIONS}
//                       placeholder="Select technologies"
//                       emptyIndicator="No technologies found"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Project Link Field */}
//             <FormField
//               control={form.control}
//               name="link"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Project Link</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter project URL" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* GitHub URL Fields */}
//             <FormField
//               control={form.control}
//               name="githubUrl"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>GitHub Repository</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter main GitHub URL (optional)"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="frontendGithubUrl"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Frontend GitHub Repository</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter frontend GitHub URL (optional)"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="backendGithubUrl"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Backend GitHub Repository</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter backend GitHub URL (optional)"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Full Stack Checkbox */}
//             <FormField
//               control={form.control}
//               name="isFullStack"
//               render={({ field }) => (
//                 <FormItem className="col-span-2">
//                   <div className="flex items-center space-x-2">
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                     <FormLabel>Is Full Stack</FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />

//             {/* Submit Button */}
//             <Button
//               disabled={mutation.isPending}
//               type="submit"
//               className="col-span-2 w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {mutation.isPending ? "Submitting..." : "Submit Project"}
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }

"use client";

import { createProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TECHNOLOGY_OPTIONS } from "@/constants";
import { projectSchema, ProjectType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Github, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import ImageInput from "../image-input";
import { Checkbox } from "../ui/checkbox";
import MultipleSelector from "../ui/multiple-selector";
import { Textarea } from "../ui/textarea";

export default function ProjectForm() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success("Project successfully submitted!");
      navigate("/projects");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<ProjectType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: [],
      link: "",
      imageUrl: "",
      githubUrl: "",
      frontendGithubUrl: "",
      backendGithubUrl: "",
      isFullStack: false,
    },
  });

  async function onSubmit(values: ProjectType) {
    const data = {
      ...values,
      technologies: values.technologies.map((tech) => tech.value),
    };
    await mutation.mutateAsync(data);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Add New Project
        </CardTitle>
        <CardDescription className="text-center">
          Showcase your latest work by adding a new project to your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Project Image</FormLabel>
                    <FormControl>
                      <ImageInput
                        value={field.value}
                        disabled={mutation.isPending}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a representative image for your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://your-project.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe your project..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Technologies Used</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        {...field}
                        defaultOptions={TECHNOLOGY_OPTIONS}
                        placeholder="Select technologies"
                        emptyIndicator="No technologies found"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">GitHub Repositories</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Repository</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Github className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="https://github.com/username/repo"
                            className="pl-8 pb-3"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="frontendGithubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frontend Repository</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Github className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="https://github.com/username/frontend"
                            className="pl-8 pb-3"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="backendGithubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Backend Repository</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Github className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="https://github.com/username/backend"
                            className="pl-8 pb-3"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="isFullStack"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Full Stack Project</FormLabel>
                    <FormDescription>
                      Check this if your project includes both frontend and
                      backend components.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={mutation.isPending}
          className="w-full"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Project"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
