// import { createBlogPost, updateBlogPost } from "@/actions/blogs";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { CATEGORY_OPTIONS, TAG_OPTIONS } from "@/constants";
// import { articleSchema, ArticleType } from "@/schemas";
// import { BlogPost, BlogPostResponse } from "@/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import ImageInput from "../image-input";
// import MultipleSelector from "../ui/multiple-selector";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Textarea } from "../ui/textarea";

// interface BlogPostFormProps {
//   initialData?: BlogPostResponse;
//   onSuccess?: () => void;
// }

// export default function BlogPostForm({
//   initialData,
//   onSuccess,
// }: BlogPostFormProps) {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createBlogPost,
//     onSuccess: () => {
//       toast.success("Blog post successfully submitted!");
//       navigate("/blog");
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }: { id: string; data: BlogPost }) =>
//       updateBlogPost(id, data),
//     onSuccess: () => {
//       toast.success("Blog post successfully updated!");
//       queryClient.invalidateQueries({ queryKey: ["blogPosts"] });

//       if (onSuccess) {
//         onSuccess();
//       }
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   const form = useForm<ArticleType>({
//     resolver: zodResolver(articleSchema),
//     defaultValues: initialData
//       ? {
//           ...initialData,
//           tags: initialData.tags?.map((tag) => ({
//             value: tag,
//             label: tag,
//           })),
//         }
//       : {
//           title: "",
//           content: "",
//           tags: [],
//           category: "Technology",
//           image: "",
//         },
//   });

//   async function onSubmit(values: ArticleType) {
//     const data = {
//       ...values,
//       tags: (values.tags ?? []).map((tag) => tag.value),
//     };

//     if (initialData) {
//       await updateMutation.mutateAsync({ id: initialData._id, data });
//     } else {
//       await mutation.mutateAsync(data);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <div className="grid gap-6 md:grid-cols-2">
//           <FormField
//             control={form.control}
//             name="image"
//             render={({ field }) => (
//               <FormItem className="col-span-full">
//                 <FormLabel>Article Image</FormLabel>
//                 <FormControl>
//                   <ImageInput
//                     value={field.value ?? null}
//                     disabled={mutation.isPending}
//                     onChange={(url) => field.onChange(url)}
//                     onRemove={() => field.onChange("")}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Upload an image to represent your blog post.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Article Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter article title" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {CATEGORY_OPTIONS?.map((category) => (
//                       <SelectItem key={category} value={category}>
//                         {category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem className="col-span-full">
//                 <FormLabel>Content</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Write your blog post content here..."
//                     className="resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="tags"
//             render={({ field }) => (
//               <FormItem className="col-span-full">
//                 <FormLabel>Tags</FormLabel>
//                 <FormControl>
//                   <MultipleSelector
//                     {...field}
//                     defaultOptions={TAG_OPTIONS}
//                     placeholder="Select tags"
//                     emptyIndicator="No tags found"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <Separator />
//       </form>
//       <Button
//         onClick={form.handleSubmit(onSubmit)}
//         disabled={mutation.isPending}
//         className="w-full mt-6"
//       >
//         {mutation.isPending ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Submitting...
//           </>
//         ) : (
//           "Submit Blog Post"
//         )}
//       </Button>
//     </Form>
//   );
// }

// import { createBlogPost, updateBlogPost } from "@/actions/blogs";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { CATEGORY_OPTIONS, TAG_OPTIONS } from "@/constants";
// import { articleSchema, ArticleType } from "@/schemas";
// import { BlogPost, BlogPostResponse } from "@/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";
// import { useForm } from "react-hook-form";
// import ReactQuill from "react-quill";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import ImageInput from "../image-input";
// import MultipleSelector from "../ui/multiple-selector";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

// // Dynamically import Quill editor component to avoid SSR issues
// import "react-quill/dist/quill.snow.css"; // import styles

// interface BlogPostFormProps {
//   initialData?: BlogPostResponse;
//   onSuccess?: () => void;
// }

// export default function BlogPostForm({
//   initialData,
//   onSuccess,
// }: BlogPostFormProps) {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createBlogPost,
//     onSuccess: () => {
//       toast.success("Blog post successfully submitted!");
//       navigate("/blog");
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }: { id: string; data: BlogPost }) =>
//       updateBlogPost(id, data),
//     onSuccess: () => {
//       toast.success("Blog post successfully updated!");
//       queryClient.invalidateQueries({ queryKey: ["blogPosts"] });

//       if (onSuccess) {
//         onSuccess();
//       }
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   const form = useForm<ArticleType>({
//     resolver: zodResolver(articleSchema),
//     defaultValues: initialData
//       ? {
//           ...initialData,
//           tags: initialData.tags?.map((tag) => ({
//             value: tag,
//             label: tag,
//           })),
//         }
//       : {
//           title: "",
//           content: "",
//           tags: [],
//           category: "Technology",
//           image: "",
//         },
//   });

//   async function onSubmit(values: ArticleType) {
//     const data = {
//       ...values,
//       tags: (values.tags ?? []).map((tag) => tag.value),
//     };

//     if (initialData) {
//       await updateMutation.mutateAsync({ id: initialData._id, data });
//     } else {
//       await mutation.mutateAsync(data);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <div className="grid gap-6 md:grid-cols-2">
//           <FormField
//             control={form.control}
//             name="image"
//             render={({ field }) => (
//               <FormItem className="col-span-full">
//                 <FormLabel>Article Image</FormLabel>
//                 <FormControl>
//                   <ImageInput
//                     value={field.value ?? null}
//                     disabled={mutation.isPending}
//                     onChange={(url) => field.onChange(url)}
//                     onRemove={() => field.onChange("")}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Upload an image to represent your blog post.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Article Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter article title" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {CATEGORY_OPTIONS?.map((category) => (
//                       <SelectItem key={category} value={category}>
//                         {category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Rich Text Editor (Quill) for Content */}
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem className="col-span-full">
//                 <FormLabel>Content</FormLabel>
//                 <FormControl>
//                   <ReactQuill
//                     value={field.value}
//                     onChange={field.onChange}
//                     placeholder="Write your blog post content here..."
//                     className="h-64"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Tags Field */}
//           <FormField
//             control={form.control}
//             name="tags"
//             render={({ field }) => (
//               <FormItem
//                 className="col-span-full mt-8
//               "
//               >
//                 <FormLabel>Tags</FormLabel>
//                 <FormControl>
//                   <MultipleSelector
//                     {...field}
//                     defaultOptions={TAG_OPTIONS}
//                     placeholder="Select tags"
//                     emptyIndicator="No tags found"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <Separator />
//       </form>
//       <Button
//         onClick={form.handleSubmit(onSubmit)}
//         disabled={mutation.isPending}
//         className="w-full mt-6"
//       >
//         {mutation.isPending ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Submitting...
//           </>
//         ) : (
//           "Submit Blog Post"
//         )}
//       </Button>
//     </Form>
//   );
// }

// import { createBlogPost, updateBlogPost } from "@/actions/blogs";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { CATEGORY_OPTIONS, TAG_OPTIONS } from "@/constants";
// import { articleSchema, ArticleType } from "@/schemas";
// import { BlogPost, BlogPostResponse } from "@/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";
// import React, { Suspense, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import "react-quill/dist/quill.snow.css";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import ImageInput from "../image-input";
// import MultipleSelector from "../ui/multiple-selector";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

// // Lazy-load ReactQuill to optimize performance
// const ReactQuill = React.lazy(() => import("react-quill"));

// interface BlogPostFormProps {
//   initialData?: BlogPostResponse;
//   onSuccess?: () => void;
// }

// export default function BlogPostForm({
//   initialData,
//   onSuccess,
// }: BlogPostFormProps) {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createBlogPost,
//     onSuccess: () => {
//       toast.success("Blog post successfully submitted!");
//       navigate("/blog");
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }: { id: string; data: BlogPost }) =>
//       updateBlogPost(id, data),
//     onSuccess: () => {
//       toast.success("Blog post successfully updated!");
//       queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
//       if (onSuccess) onSuccess();
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   const form = useForm<ArticleType>({
//     resolver: zodResolver(articleSchema),
//     defaultValues: initialData
//       ? {
//           ...initialData,
//           tags: initialData.tags?.map((tag) => ({
//             value: tag,
//             label: tag,
//           })),
//         }
//       : {
//           title: "",
//           content: "",
//           tags: [],
//           category: "Technology",
//           image: "",
//         },
//   });

//   const onSubmit = async (values: ArticleType) => {
//     const data = {
//       ...values,
//       tags: (values.tags ?? []).map((tag) => tag.value),
//     };

//     if (initialData) {
//       await updateMutation.mutateAsync({ id: initialData._id, data });
//     } else {
//       await mutation.mutateAsync(data);
//     }
//   };

//   const debouncedContentChange = useCallback(
//     (value: string) => {
//       form.setValue("content", value);
//     },
//     [form]
//   );

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <div className="grid gap-6 md:grid-cols-2">
//           <FormField
//             control={form.control}
//             name="image"
//             render={({ field }) => (
//               <FormItem className="col-span-full">
//                 <FormLabel>Article Image</FormLabel>
//                 <FormControl>
//                   <ImageInput
//                     value={field.value ?? null}
//                     disabled={mutation.isPending}
//                     onChange={(url) => field.onChange(url)}
//                     onRemove={() => field.onChange("")}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Upload an image to represent your blog post.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Article Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter article title" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {CATEGORY_OPTIONS?.map((category) => (
//                       <SelectItem key={category} value={category}>
//                         {category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem className="col-span-full">
//                 <FormLabel>Content</FormLabel>
//                 <FormControl>
//                   <Suspense fallback={<p>Loading editor...</p>}>
//                     <ReactQuill
//                       value={field.value}
//                       onChange={debouncedContentChange}
//                       placeholder="Write your blog post content here..."
//                       className="h-64"
//                     />
//                   </Suspense>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="tags"
//             render={({ field }) => (
//               <FormItem className="col-span-full mt-8">
//                 <FormLabel>Tags</FormLabel>
//                 <FormControl>
//                   <MultipleSelector
//                     {...field}
//                     defaultOptions={TAG_OPTIONS}
//                     placeholder="Select tags"
//                     emptyIndicator="No tags found"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <Separator />
//       </form>

//       <Button
//         onClick={form.handleSubmit(onSubmit)}
//         disabled={mutation.isPending || updateMutation.isPending}
//         className="w-full mt-6"
//       >
//         {mutation.isPending || updateMutation.isPending ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Submitting...
//           </>
//         ) : (
//           "Submit Blog Post"
//         )}
//       </Button>
//     </Form>
//   );
// }

import { createBlogPost, updateBlogPost } from "@/actions/blogs";
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
import { CATEGORY_OPTIONS, TAG_OPTIONS } from "@/constants";
import useAuth from "@/hooks/use-auth";
import { articleSchema, ArticleType } from "@/schemas";
import { BlogPost, BlogPostResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { Suspense, useCallback } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import ImageInput from "../image-input";
import MultipleSelector from "../ui/multiple-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ReactQuill = React.lazy(() => import("react-quill"));

interface BlogPostFormProps {
  initialData?: BlogPostResponse;
  onSuccess?: () => void;
}

export default function BlogPostForm({
  initialData,
  onSuccess,
}: BlogPostFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      toast.success("Blog post successfully submitted!");
      navigate("/blogs");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BlogPost }) =>
      updateBlogPost(id, data),
    onSuccess: () => {
      toast.success("Blog post successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<ArticleType>({
    resolver: zodResolver(articleSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          tags: initialData.tags?.map((tag) => ({
            value: tag,
            label: tag,
          })),
        }
      : {
          title: "",
          content: "",
          tags: [],
          category: "Technology",
          image: "",
        },
  });

  const onSubmit = async (values: ArticleType) => {
    if (!auth?.user?._id) {
      toast.error("User ID is missing.");
      return;
    }
    const data = {
      ...values,
      tags: (values.tags ?? []).map((tag) => tag.value),
    };

    if (initialData) {
      await updateMutation.mutateAsync({
        id: initialData._id,
        data: { ...data, author: auth.user._id, image: data.image ?? "" },
      });
    } else {
      await mutation.mutateAsync({
        ...data,
        author: auth.user._id,
        image: data.image ?? "",
      });
    }
  };

  const debouncedContentChange = useCallback(
    (value: string) => {
      form.setValue("content", value);
    },
    [form]
  );

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Article Image</FormLabel>
                <FormControl>
                  <ImageInput
                    value={field.value ?? null}
                    disabled={mutation.isPending}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormDescription>
                  Upload an image to represent your blog post.
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
                <FormLabel>Article Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter article title" {...field} />
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
                    {CATEGORY_OPTIONS?.map((category) => (
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
            name="content"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Suspense fallback={<p>Loading editor...</p>}>
                    <ReactQuill
                      value={field.value}
                      onChange={debouncedContentChange}
                      placeholder="Write your blog post content here..."
                      className="h-48 "
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link"],
                        ],
                      }}
                    />
                  </Suspense>
                </FormControl>
                <FormMessage className="pt-12" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="col-span-full mt-8">
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={TAG_OPTIONS}
                    placeholder="Select tags"
                    emptyIndicator="No tags found"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending || updateMutation.isPending}
          className="w-full mt-6"
        >
          {mutation.isPending || updateMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Blog Post"
          )}
        </Button>
      </form>
    </Form>
  );
}
