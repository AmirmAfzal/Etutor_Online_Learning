"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseData } from "@/lib/db/models/courseModel";
import Icon from "@/components/ui/Icon";

import BasicInformation from "./BasicInformation";
import AdvanceInformation from "./AdvanceInformation";
import Curriculum from "./Curriculum";
import PublishCourse from "./PublishCourse";

interface Props {
  course: CourseData | null;
  tab: string;
}

const CreateCourseTabs = ({ course, tab }: Props) => {
  const [currentTab, setCurrentTab] = useState(tab || "BasicInformation");

  return (
    <div className="bg-base-200 p-6">
      <div className="bg-base-100 container mx-auto">
        <Tabs
          defaultValue="BasicInformation"
          value={currentTab}
          onValueChange={() => {}}
          className="w-full"
        >
          <TabsList className="bg-base-100 flex h-18 w-full flex-row justify-start gap-4 overflow-x-auto md:grid md:grid-cols-4">
            <TabsTrigger
              value="BasicInformation"
              className="w-48 cursor-pointer"
              onClick={() => setCurrentTab("BasicInformation")}
            >
              <Icon icon="ph:stack-duotone" width="24" height="24" />
              Basic Information
            </TabsTrigger>
            <TabsTrigger
              value="AdvanceInformation"
              className="w-48 cursor-pointer"
              onClick={() => setCurrentTab("AdvanceInformation")}
            >
              <Icon icon="ph:clipboard-text-duotone" width="24" height="24" />
              Advance Information
            </TabsTrigger>
            <TabsTrigger
              value="Curriculum"
              className="w-48 cursor-pointer"
              onClick={() => setCurrentTab("Curriculum")}
            >
              <Icon icon="ph:monitor-play-duotone" width="24" height="24" />
              Curriculum
            </TabsTrigger>
            <TabsTrigger
              value="PublishCourse"
              className="w-48 cursor-pointer"
              onClick={() => setCurrentTab("PublishCourse")}
            >
              <Icon icon="ph:play-circle-duotone" width="24" height="24" />
              Publish Course
            </TabsTrigger>
          </TabsList>

          <TabsContent value="BasicInformation" className="mt-0">
            <BasicInformation
              course={course}
              onNext={() => setCurrentTab("AdvanceInformation")}
            />
          </TabsContent>

          <TabsContent value="AdvanceInformation" className="mt-0">
            <AdvanceInformation
              onNext={() => setCurrentTab("Curriculum")}
              onBack={() => setCurrentTab("BasicInformation")}
              course={course}
            />
          </TabsContent>

          <TabsContent value="Curriculum" className="mt-0">
            <Curriculum
              onNext={() => setCurrentTab("PublishCourse")}
              onBack={() => setCurrentTab("AdvanceInformation")}
              course={course}
            />
          </TabsContent>

          <TabsContent value="PublishCourse" className="mt-0">
            <PublishCourse
              onBack={() => setCurrentTab("Curriculum")}
              course={course}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateCourseTabs;
