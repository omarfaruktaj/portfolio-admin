import { getProjects } from "@/actions/projects";
import { columns } from "@/components/projects/table/column";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function Projects() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  if (!data) {
    return <p>No data</p>;
  }

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Projects</h1>
        <Button
          onClick={() => navigate("/projects/new")}
          variant="outline"
          className="flex items-center space-x-1 rounded-lg "
        >
          <Plus className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">New project</span>
        </Button>
      </div>

      <div className="shadow-sm rounded-lg overflow-hidden bg-white">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
