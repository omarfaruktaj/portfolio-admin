"use client";

import { ProjectResponse } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<ProjectResponse>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className=" ">
        <img
          className="h-10 w-10 object-cover rounded-md"
          src={row.original.imageUrl}
          alt={row.original.title} // Using title as alt text for the image
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.original.title}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.description}</div>,
  },
  {
    accessorKey: "technologies",
    header: "Technologies",
    cell: ({ row }) => <div>{row.original.technologies.join(", ")}</div>,
  },
  {
    accessorKey: "link",
    header: "Project Link",
    cell: ({ row }) => (
      <div>
        <a href={row.original.link} target="_blank" rel="noopener noreferrer">
          {row.original.link}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "githubUrl",
    header: "GitHub Link",
    cell: ({ row }) => (
      <div>
        {row.original.githubUrl ? (
          <a
            href={row.original.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        ) : (
          "N/A"
        )}
      </div>
    ),
  },
  //   {
  //     accessorKey: "frontendGithubUrl",
  //     header: "Frontend GitHub",
  //     cell: ({ row }) => (
  //       <div>
  //         {row.original.frontendGithubUrl ? (
  //           <a
  //             href={row.original.frontendGithubUrl}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //           >
  //             Frontend GitHub
  //           </a>
  //         ) : (
  //           "N/A"
  //         )}
  //       </div>
  //     ),
  //   },
  //   {
  //     accessorKey: "backendGithubUrl",
  //     header: "Backend GitHub",
  //     cell: ({ row }) => (
  //       <div>
  //         {row.original.backendGithubUrl ? (
  //           <a
  //             href={row.original.backendGithubUrl}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //           >
  //             Backend GitHub
  //           </a>
  //         ) : (
  //           "N/A"
  //         )}
  //       </div>
  //     ),
  //   },
  {
    accessorKey: "isFullStack",
    header: "Full Stack",
    cell: ({ row }) => <div>{row.original.isFullStack ? "Yes" : "No"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
