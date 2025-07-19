import HeroSection from "../components/HomePage/HeroSection";
import Category from "../components/HomePage/Category";
import TopCourse from "../components/HomePage/TopCourse";
import FeaturedCourses from "../components/HomePage/FeaturedCourses";
import RecentCourse from "../components/HomePage/RecentCourse";
import BecomeInstructor from "../components/HomePage/BecomeInstructor";
import TopInstructor from "../components/HomePage/TopInstructor";
import CompaniesLogo from "../components/HomePage/CompaniesLogo";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Category />
      <TopCourse />
      <FeaturedCourses />
      <RecentCourse />
      <BecomeInstructor />
      <TopInstructor />
      <CompaniesLogo />
    </>
  );
};

export default HomePage;
