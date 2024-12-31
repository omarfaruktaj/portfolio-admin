import { createExperience, updateExperience } from "@/actions/experience";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TECHNOLOGY_OPTIONS } from "@/constants";
import useAuth from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { experienceSchema, ExperienceType } from "@/schemas";
import { Experience, ExperienceResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Calendar } from "../ui/calendar";
import MultipleSelector from "../ui/multiple-selector";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";

interface ExperienceFormProps {
  initialData?: ExperienceResponse;
  onSuccess?: () => void;
}

export default function ExperienceForm({
  initialData,
  onSuccess,
}: ExperienceFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      toast.success("Experience successfully submitted!");
      navigate("/experiences");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Experience }) =>
      updateExperience(id, data),
    onSuccess: () => {
      toast.success("Experience successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<ExperienceType>({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          technologies: initialData.technologies.map((tech) => ({
            value: tech,
            label: tech,
          })),
        }
      : {
          jobTitle: "",
          companyName: "",
          location: "",
          startDate: new Date(),
          endDate: null,
          description: "",
          technologies: [],
        },
  });

  async function onSubmit(values: ExperienceType) {
    if (!auth?.user?._id) {
      toast.error("User not found");
      return;
    }
    console.log(auth?.user?._id);

    if (initialData) {
      await updateMutation.mutateAsync({
        id: initialData._id,
        data: {
          ...values,
          endDate: values.endDate || undefined,
          technologies: values.technologies.map((tech) => tech.value),
          author: auth?.user?._id,
        },
      });
    } else {
      await mutation.mutateAsync({
        ...values,
        endDate: values.endDate || undefined,
        technologies: values.technologies.map((tech) => tech.value),
        author: auth?.user?._id,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
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
                    cols={5}
                    placeholder="Enter description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "yyyy-MM-dd")
                          : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(new Date(date));
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "yyyy-MM-dd")
                          : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(new Date(date));
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                    creatable
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
            "Submit Experience"
          )}
        </Button>
      </form>
    </Form>
  );
}
