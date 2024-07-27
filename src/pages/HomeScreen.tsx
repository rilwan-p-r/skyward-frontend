// import Navbar from "../components/user/Navbar";
import { FlipWordsDemo } from "../components/user/FlipWords";
import { MovingBorderDemo } from "../components/user/MovingBorderDemo";
import { AppleCardsCarouselDemo } from "../components/user/AppleCardsCarouselDemo";
import { ReviewsList } from "../components/user/ReviewsList";
import { Footer } from "../components/user/Footer";



const HomeScreen = () => {
  return (
    <>
      {/* <Navbar /> */}

      <div className="flex flex-col md:flex-row items-center p-4">
        <div className="flex-1 text-center md:text-left md:mr-6 lg:mr-10">
          <FlipWordsDemo />
          <h1 className="ml-10 text-xs md:text-sm lg:text-base xl:text-lg mt-4 md:mt-6">
            Discover a wide range of courses covering a variety of subjects,
            taught by expert instructors.
          </h1>
          <MovingBorderDemo />
        </div>
        <div className="flex-1 mt-4 md:mt-0 md:ml-4 lg:ml-6 xl:ml-8">
          <img
            className="w-full h-auto max-w-[80%] lg:max-w-[80%] xl:max-w-[90%] mx-auto md:mx-0"
            src="/images/homecoverphoto.jpg"
            alt="cover photo"
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-8">
        <h1 className="font-bold text-center text-sm md:text-base lg:text-lg xl:text-xl">
          Trusted by 2000+ Students worldwide.
        </h1>
      </div>
      <div className="flex items-center justify-center mt-8">
        <h1 className="font-bold text-2xl">Upcoming events</h1>
      </div>

      <AppleCardsCarouselDemo />

      <div className="w-full h-full">
        <h1 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          What's our students says
        </h1>
      </div>
      
      <ReviewsList/>

      <Footer/>
    </>
  );
};

export default HomeScreen;
