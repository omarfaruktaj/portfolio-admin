"use client";

import { useState } from "react";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteExperience } from "@/actions/experience";
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
import { ExperienceResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ExperienceForm from "../experience-form";

export function CellAction({ data }: { data: ExperienceResponse }) {
  const [open, setOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience Deleted Successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Experience Deleting failed. Please try again."
      );
    },
  });

  const onDelete = () => {
    mutation.mutate(data._id as string);
  };

  if (mutation.isPending) return <div>Deleting...</div>;

  return (
    <>
      <AlertModal
        description="This action can not be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <Modal
        title="Update Experience"
        onClose={() => setOpenUpdateModel(false)}
        isOpen={openUpdateModel}
        className="min-h-5/6"
      >
        <ScrollArea className="h-full ">
          <div className="p-4">
            <ExperienceForm
              initialData={data}
              onSuccess={() => {
                setOpenUpdateModel(false);
              }}
            />
          </div>
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
