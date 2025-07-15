"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { Button } from "../ui/button";
import { industries, Industry } from "@/lib/data/industries";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { onboardingInputSchema } from "@/lib/schema/onboardingSchema";
import { ROUTES } from "@/lib/helpers/constants";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { updateUser } from "@/actions/user";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/useFetch";

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>;
};

export const OnboardingForm = () => {
  const router = useRouter();

  const [selectedIndustry, setSelectedIndustry] = useState<
    Industry | undefined
  >();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingInputSchema),
  });

  const watchIndustry = watch("industry");

  useEffect(() => {
    if (selectedIndustry && selectedIndustry.subIndustries.length > 0) {
      setValue("subIndustry", selectedIndustry.subIndustries[0]);
    }
  }, [selectedIndustry, setValue]);

  const { data: updatedUser, loading, fn: updateUserFn } = useFetch(updateUser);

  const onSubmit = async (values: any) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.log("Error occurred while updating user profile");
    }
  };

  useEffect(() => {
    if (updatedUser?.success && !loading) {
      toast.success("Profile updated successfully");
      router.push(ROUTES.DASHBOARD);
      router.refresh();
    }
  }, [loading, updatedUser]);

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  const selectedInd = industries.find(
                    (ind) => ind.id === value
                  );
                  setValue("industry", value);
                  setSelectedIndustry(selectedInd);
                  if (selectedInd) {
                    setValue("subIndustry", selectedInd?.subIndustries[0]);
                  }
                }}
              >
                <SelectTrigger id="industry" className="w-full">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {industries.map((industry) => {
                    return (
                      <SelectItem key={industry.id} value={industry.id}>
                        {industry.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <ErrorMessage errorMessage={errors.industry?.message as string} />
            </div>
            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Select
                  value={watch("subIndustry")}
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                >
                  <SelectTrigger id="subIndustry" className="w-full">
                    <SelectValue placeholder="Select a specialization" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {selectedIndustry?.subIndustries.map((subIndustry) => {
                      return (
                        <SelectItem key={subIndustry} value={subIndustry}>
                          {subIndustry}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <ErrorMessage
                  errorMessage={errors.subIndustry?.message as string}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="experience">Experience (In Years)</Label>
              <Input
                {...register("experience")}
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
              />
              <ErrorMessage
                errorMessage={errors.experience?.message as string}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                {...register("skills")}
                id="skills"
                placeholder="e.g. Python, Django, Project Management etc."
              />
              <p className="text-xs text-muted-foreground">
                Enter input as comma-separated values
              </p>
              <ErrorMessage errorMessage={errors.skills?.message as string} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Professional Bio</Label>
              <Textarea
                {...register("bio")}
                id="bio"
                placeholder="e.g. Tell us about your professional background..."
              />
              <ErrorMessage errorMessage={errors.bio?.message as string} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && (
                <Loader2 className="mx-2 aspect-1 h-4 animate-spin" />
              )}
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
