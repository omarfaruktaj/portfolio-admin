import { BlogPostResponse } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<BlogPostResponse>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-16 h-16 overflow-hidden rounded-md">
        <img
          className="w-full h-full object-cover"
          src={row.original.image}
          alt={row.original.title}
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-semibold">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "publicationDate",
    header: "Published Date",
    cell: ({ row }) => (
      <div>{format(new Date(row.original.publicationDate), "yyyy-MM-dd")}</div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div>
        {row.original.tags.length > 0 ? (
          row.original.tags.join(", ")
        ) : (
          <span className="text-gray-500">No tags</span>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
