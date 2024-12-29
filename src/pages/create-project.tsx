import ProjectForm from "@/components/projects/project-form";
import BackButton from "@/components/ui/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateProject() {
  return (
    <div>
      <BackButton />
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Add New Project
          </CardTitle>
          <CardDescription className="text-center">
            Showcase your latest work by adding a new project to your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm />;
        </CardContent>
      </Card>
    </div>
  );
}
