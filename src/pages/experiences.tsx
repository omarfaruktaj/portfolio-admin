import { getExperiences } from "@/actions/experience";
import { columns } from "@/components/experience/table/column";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function Experiences() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
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
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Experiences</h1>
        <Button
          onClick={() => navigate("/experiences/new")}
          className="flex items-center space-x-1"
        >
          <Plus className="h-6 w-6" />
          <span>Add Experience</span>
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
