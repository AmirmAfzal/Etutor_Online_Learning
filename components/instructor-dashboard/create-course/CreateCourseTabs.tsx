"use client";

import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Icon from "@/components/ui/Icon";
import BasicInformation from "./BasicInformation";
import AdvanceInformation from "./AdvanceInformation";
import Curriculum from "./Curriculum";
import PublishCourse from "./PublishCourse";

const CreateCourseTabs = () => {
  const [currentTab, setCurrentTab] = useState("BasicInformation");

  return (
    <div className="bg-base-200 p-6">
      <div className="bg-base-100 container mx-auto">
        <Tabs value={currentTab} onValueChange={() => {}} className="w-full">
          <TabsList className="bg-base-100 grid w-full grid-cols-4 gap-4 p-4">
            <TabsTrigger
              value="BasicInformation"
              className="cursor-pointer"
              onClick={() => setCurrentTab("BasicInformation")}
            >
              <Icon icon="ph:stack-duotone" width="24" height="24" />
              Basic Information
            </TabsTrigger>
            <TabsTrigger
              value="AdvanceInformation"
              className="cursor-pointer"
              onClick={() => setCurrentTab("AdvanceInformation")}
            >
              <Icon icon="ph:clipboard-text-duotone" width="24" height="24" />
              Advance Information
            </TabsTrigger>
            <TabsTrigger
              value="Curriculum"
              className="cursor-pointer"
              onClick={() => setCurrentTab("Curriculum")}
            >
              <Icon icon="ph:monitor-play-duotone" width="24" height="24" />
              Curriculum
            </TabsTrigger>
            <TabsTrigger
              value="PublishCourse"
              className="cursor-pointer"
              onClick={() => setCurrentTab("PublishCourse")}
            >
              <Icon icon="ph:play-circle-duotone" width="24" height="24" />
              Publish Course
            </TabsTrigger>
          </TabsList>

          <TabsContent value="BasicInformation">
            <BasicInformation
              onNext={() => setCurrentTab("AdvanceInformation")}
            />
          </TabsContent>

          <TabsContent value="AdvanceInformation">
            <AdvanceInformation
              onNext={() => setCurrentTab("Curriculum")}
              onBack={() => setCurrentTab("BasicInformation")}
            />
          </TabsContent>

          <TabsContent value="Curriculum">
            <Curriculum
              onNext={() => setCurrentTab("PublishCourse")}
              onBack={() => setCurrentTab("AdvanceInformation")}
            />
          </TabsContent>

          <TabsContent value="PublishCourse">
            <PublishCourse onBack={() => setCurrentTab("Curriculum")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateCourseTabs;
