
import FlipWords from "../userui/flip-words";


export function FlipWordsDemo() {
  const words = ["Futures,", "Destiny,", "Tomorrow,", "Journey,","Vision,"];

  return (
    <div className="mb-6 flex items-start justify-start px-10">
      <div className="text-4xl font-normal text-black dark:text-black mt-25">
      Empowering
        <FlipWords words={words} duration={3000} className="text-black" /> <br />
        One Student at a Time.Learn, Succeed!
      </div>
    </div>
  );
}
