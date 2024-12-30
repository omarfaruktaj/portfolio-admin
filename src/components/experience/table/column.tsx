import { Badge } from "@/components/ui/badge";
import { SkillResponse } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<SkillResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.category}</div>,
  },
  {
    accessorKey: "proficiency",
    header: "Proficiency",
    cell: ({ row }) => (
      <div>
        <Badge>{row.original.proficiency}</Badge>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
