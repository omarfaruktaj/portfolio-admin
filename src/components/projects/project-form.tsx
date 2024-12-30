"use client";

import { createProject, updateProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
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
import { Project, ProjectResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Github, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import ImageInput from "../image-input";
import { Checkbox } from "../ui/checkbox";
import MultipleSelector from "../ui/multiple-selector";
import { Textarea } from "../ui/textarea";

interface ProjectFormProps {
  initialData?: ProjectResponse;
  onSuccess?: () => void;
}

export default function ProjectForm({
  initialData,
  onSuccess,
}: ProjectFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Project }) =>
      updateProject(id, data),
    onSuccess: () => {
      toast.success("Project successfully Updated!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<ProjectType>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          technologies: initialData.technologies.map((tech) => ({
            value: tech,
            label: tech,
          })),
        }
      : {
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

    if (initialData) {
      await updateMutation.mutateAsync({ id: initialData._id, data });
    } else {
      await mutation.mutateAsync(data);
    }
  }

  return (
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
                  <Input placeholder="https://your-project.com" {...field} />
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
                  Check this if your project includes both frontend and backend
                  components.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </form>
      <Button
        onClick={form.handleSubmit(onSubmit)}
        disabled={mutation.isPending}
        className="w-full mt-6"
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
    </Form>
  );
}
