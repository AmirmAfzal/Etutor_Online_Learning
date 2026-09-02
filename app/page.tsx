import { connectDB } from "@/lib/db/db";

import HeroSection from "../components/HomePage/HeroSection";
import Category from "../components/HomePage/Category";
import TopCourse from "../components/HomePage/TopCourse";
import FeaturedCourses from "../components/HomePage/FeaturedCourses";
import RecentCourse from "../components/HomePage/RecentCourse";
import BecomeInstructor from "../components/HomePage/BecomeInstructor";
import TopInstructor from "../components/HomePage/TopInstructor";
import CompaniesLogo from "../components/HomePage/CompaniesLogo";
import courseModel from "../lib/db/models/courseModel";

export const dynamic = "force-dynamic";
export interface CourseTypes {
  _id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  description: string;
  authors: string[];
  sections: string[];
  price: number;
  offer: number;
  offerEndsAt: Date;
  language: string;
  subtitleLanguage: string;
  studentsCount: number;
  duration: number;
  category: { name: string };
  tags: string[];
  video: string[];
  subCategory: { name: string };
  topic: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationUnit: "Day" | "Week" | "Hour";
  trailer?: string;
  learningOutcomes?: string[];
  targetAudience?: string[];
  requirements?: string[];
  tools: string[];
  rating: number;
  instructors: {
    id: number;
    profile: string;
    name: string;
    skill: string;
  }[];
}

const HomePage = async () => {
  await connectDB();

  const foundCourse = await courseModel
    .find()
    .populate("category", "name")
    .populate("subCategory", "name")
    .lean()
    .exec();

  const plainCourse = JSON.parse(JSON.stringify(foundCourse ?? []));
  return (
    <>
      <HeroSection />
      <Category />
      <TopCourse courses={plainCourse.slice(0, 10)} />
      <FeaturedCourses courses={plainCourse.slice(0, 4)} />
      <RecentCourse courses={plainCourse.slice(0, 4)} />
      <BecomeInstructor />
      <TopInstructor />
      <CompaniesLogo />
    </>
  );
};

export default HomePage;
