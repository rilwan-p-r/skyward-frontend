
import { Carousel,Card } from "../../ui/mainUi/apple-cards-carousel";

export function EventsCard() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Our upcoming events.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Safe Journeys",
    title: "School Bus Services for skywards",
    src: "https://images.unsplash.com/photo-1579225844182-c41cac73efc7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Stay Safe",
    title: "Students, Wear Your Masks!",
    src: "https://images.unsplash.com/photo-1602542164986-edc061d9c52f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1632217138608-66217da0142f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Get Ready for Action",
    title: "Sports Day Celebration!",
    src: "https://plus.unsplash.com/premium_photo-1709303662276-65b37142e05e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHNwb3J0cyUyMGRheXxlbnwwfHwwfHx8MA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Hit the Track",
    title: "Running Events and Activities",
    src: "https://images.unsplash.com/photo-1526676317768-d9b14f15615a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHJ1bm5pbmd8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },
  {
    category: "Celebrate Success",
    title: "Graduation Day 2024",
    src: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JhZHVhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Innovation and Technology",
    title: "IT Event 2024",
    src: "https://images.unsplash.com/photo-1584697964038-28e16a2b6a3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHN0dWR5aW5nfGVufDB8fDB8fHww",
    content: <DummyContent />,
  },
];
