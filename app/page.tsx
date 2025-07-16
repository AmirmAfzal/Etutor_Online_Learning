import HeroSection from "./HeroSection"
import Category from "./Category"
import TopCourse from "./TopCourse"
import FeaturedCourses from "./FeaturedCourses"
import RecentCourse from "./RecentCourse"

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Category />
      <TopCourse />
      <FeaturedCourses />
      <RecentCourse />
    </>
  );
};

export default HomePage;
