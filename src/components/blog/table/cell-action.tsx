import { useState } from "react";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteBlogPost } from "@/actions/blogs";
import AlertModal from "@/components/alert-model";
import Modal from "@/components/model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BlogPostResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BlogForm from "../blog-form";

export function CellAction({ data }: { data: BlogPostResponse }) {
  const [open, setOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog Deleted Successfully");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error?.response?.data?.message ||
          "Blog Deleting failed. Please try again."
      );
    },
  });

  const onDelete = () => {
    mutation.mutate(data._id);
  };

  if (mutation.isPending) return <div>Deleting...</div>;

  return (
    <>
      <AlertModal
        description="This action cannot be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <Modal
        title="Update Blog"
        onClose={() => setOpenUpdateModel(false)}
        isOpen={openUpdateModel}
        className="h-5/6"
      >
        <ScrollArea className="h-full">
          <BlogForm
            initialData={data}
            onSuccess={() => {
              setOpenUpdateModel(false);
            }}
          />
        </ScrollArea>
      </Modal>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenUpdateModel(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="!text-red-500"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
