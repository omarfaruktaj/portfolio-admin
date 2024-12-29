"use client";

import { useState } from "react";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteProject } from "@/actions/projects";
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
import { ProjectResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProjectForm from "../project-form";

export function CellAction({ data }: { data: ProjectResponse }) {
  const [open, setOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project Deleted Successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Project Deleting failed. Please try again."
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
        description="This action can not be undo."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <Modal
        title="Update Project"
        onClose={() => setOpenUpdateModel(false)}
        isOpen={openUpdateModel}
        className="h-5/6"
      >
        <ScrollArea className="h-full	">
          <ProjectForm
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
