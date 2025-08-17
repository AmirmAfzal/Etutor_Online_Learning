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

  const tabs = [
    {
      id: 1,
      value: "BasicInformation",
      icon: "ph:stack-duotone",
      title: "Basic Information",
    },
    {
      id: 2,
      value: "AdvanceInformation",
      icon: "ph:clipboard-text-duotone",
      title: "Advance Information",
    },
    {
      id: 3,
      value: "Curriculum",
      icon: "ph:monitor-play-duotone",
      title: "Curriculum",
    },
    {
      id: 4,
      value: "PublishCourse",
      icon: "ph:play-circle-duotone",
      title: "Publish Course",
    },
  ];
  const tabsContent = [
    {
      id: 1,
      value: "BasicInformation",
      child: (
        <BasicInformation
          course={course}
          onNext={() => setCurrentTab("AdvanceInformation")}
        />
      ),
    },
    {
      id: 2,
      value: "AdvanceInformation",
      child: (
        <AdvanceInformation
          onNext={() => setCurrentTab("Curriculum")}
          onBack={() => setCurrentTab("BasicInformation")}
          course={course}
        />
      ),
    },
    {
      id: 3,
      value: "Curriculum",
      child: (
        <Curriculum
          onNext={() => setCurrentTab("PublishCourse")}
          onBack={() => setCurrentTab("AdvanceInformation")}
          course={course}
        />
      ),
    },
    {
      id: 4,
      value: "PublishCourse",
      child: (
        <PublishCourse
          onBack={() => setCurrentTab("Curriculum")}
          course={course}
        />
      ),
    },
  ];

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
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.value}
                className="w-full cursor-pointer"
                onClick={() => setCurrentTab(tab.value)}
              >
                <Icon icon={tab.icon} width="24" height="24" />
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabsContent.map((content) => (
            <TabsContent
              key={content.id}
              value={content.value}
              className="mt-0"
            >
              {content.child}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CreateCourseTabs;
