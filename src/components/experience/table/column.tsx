import { Badge } from "@/components/ui/badge";
import { ExperienceResponse } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<ExperienceResponse>[] = [
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    cell: ({ row }) => <div>{row.original.jobTitle}</div>,
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => <div>{row.original.companyName}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div>{new Date(row.original.startDate).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <div>
        {row.original.endDate
          ? new Date(row.original.endDate).toLocaleDateString()
          : "Present"}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.description}</div>,
  },
  {
    accessorKey: "technologies",
    header: "Technologies",
    cell: ({ row }) => (
      <div>
        {row.original.technologies.map((tech, index) => (
          <Badge key={index}>{tech}</Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.original.location || "N/A"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
