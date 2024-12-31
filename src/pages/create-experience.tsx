import ExperienceForm from "@/components/experience/experience-form";
import BackButton from "@/components/ui/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateExperience() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-10">
      <BackButton />

      <Card className="w-full max-w-4xl mx-auto mt-6 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900">
            Create New Experience
          </CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">
            Add a new experience to your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExperienceForm />
        </CardContent>
      </Card>
    </div>
  );
}
