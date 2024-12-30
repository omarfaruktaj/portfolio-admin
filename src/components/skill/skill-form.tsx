import { createSkill, updateSkill } from "@/actions/skill";
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
import { skillSchema, SkillType } from "@/schemas";
import { Skill, SkillResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SkillFormProps {
  initialData?: SkillResponse;
  onSuccess?: () => void;
}

export default function SkillForm({ initialData, onSuccess }: SkillFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation<SkillType, Error, SkillType>({
    mutationFn: async (data: SkillType) => {
      const response = await createSkill(data);
      return {
        ...response,
        category: response.category as
          | "Frontend"
          | "Backend"
          | "Database"
          | "Tools"
          | "Soft Skills",
        proficiency: response.proficiency as
          | "Beginner"
          | "Intermediate"
          | "Advanced"
          | "Expert",
      };
    },
    onSuccess: () => {
      toast.success("Skill successfully submitted!");
      navigate("/skills");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Skill }) =>
      updateSkill(id, data),
    onSuccess: () => {
      toast.success("Skill successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["skills"] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<SkillType>({
    resolver: zodResolver(skillSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          category: initialData.category as
            | "Frontend"
            | "Backend"
            | "Database"
            | "Tools"
            | "Soft Skills",
          proficiency: initialData.proficiency as
            | "Beginner"
            | "Intermediate"
            | "Advanced"
            | "Expert",
        }
      : {
          name: "",
          category: "Frontend",
          proficiency: "Intermediate",
        },
  });

  async function onSubmit(values: SkillType) {
    if (initialData) {
      await updateMutation.mutateAsync({ id: initialData._id, data: values });
    } else {
      await mutation.mutateAsync(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 grid-cols-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter skill name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "Frontend",
                      "Backend",
                      "Database",
                      "Tools",
                      "Soft Skills",
                    ].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proficiency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proficiency</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a proficiency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Beginner", "Intermediate", "Advanced", "Expert"].map(
                        (proficiency) => (
                          <SelectItem key={proficiency} value={proficiency}>
                            {proficiency}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
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
            "Submit Skill"
          )}
        </Button>
      </form>
    </Form>
  );
}
