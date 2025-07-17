import HeroSection from "./HeroSection"
import Category from "./Category"
import TopCourse from "./TopCourse"
import FeaturedCourses from "./FeaturedCourses"
import RecentCourse from "./RecentCourse"
import BecomeInstructor from "./BecomeInstructor"
import TopInstructor from "./TopInstructor"
import CompaniesLogo from "./CompaniesLogo"

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
