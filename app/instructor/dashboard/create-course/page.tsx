import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/Icon";
import BasicInformation from "@/components/instructor-dashboard/create-course/BasicInformation";
import AdvanceInformation from "@/components/instructor-dashboard/create-course/AdvanceInformation";
import Curriculum from "@/components/instructor-dashboard/create-course/Curriculum";
import PublishCourse from "@/components/instructor-dashboard/create-course/PublishCourse";

const CreateNewCoursePage = () => {
  return (
    <div className="bg-base-200 p-6">
      <div className="bg-base-100 container mx-auto">
        <Tabs defaultValue="BasicInformation" className="w-full">
          <TabsList className="bg-base-100 grid w-full grid-cols-4 gap-4 p-4">
            <TabsTrigger value="BasicInformation">
              <Icon icon="ph:stack-duotone" width="24" height="24" />
              Basic Information
            </TabsTrigger>
            <TabsTrigger value="AdvanceInformation">
              <Icon icon="ph:clipboard-text-duotone" width="24" height="24" />
              Advance Information
            </TabsTrigger>
            <TabsTrigger value="Curriculum">
              <Icon icon="ph:monitor-play-duotone" width="24" height="24" />
              Curriculum
            </TabsTrigger>
            <TabsTrigger value="PublishCourse">
              <Icon icon="ph:play-circle-duotone" width="24" height="24" />
              Publish Course
            </TabsTrigger>
          </TabsList>

          <TabsContent value="BasicInformation">
            <BasicInformation />
          </TabsContent>

          <TabsContent value="AdvanceInformation">
            <AdvanceInformation />
          </TabsContent>

          <TabsContent value="Curriculum">
            <Curriculum />
          </TabsContent>

          <TabsContent value="PublishCourse">
            <PublishCourse />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateNewCoursePage;
