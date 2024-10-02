"use client";
import { cn } from "../../lib/utils";
import { useState } from "react";
interface CollegeContentItem {
    title: string;
    description: string;
    image: string;
    gif: string;
  }
const collegeContent = [
  {
    title: "Campus Life",
    description: "Experience the vibrant atmosphere of college living",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG45a3VsaWV6NHV1YndmOWw0OWd6NjRzd2Z2aGQ2anBjdmdzYmQ2biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/87v4q8gYEBcEixAGtn/giphy.webp"
  },
  {
    title: "Academic Excellence",
    description: "Pursue knowledge and achieve your academic goals",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    gif: "https://media.giphy.com/media/3o7qE1YN7aBOFPRw8E/giphy.gif"
  },
  {
    title: "Sports and Athletics",
    description: "Compete and stay fit with our diverse sports programs",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    gif: "https://media.giphy.com/media/3o7TKoHNJTWWLgNXe0/giphy.gif"
  },
  {
    title: "Research Opportunities",
    description: "Engage in cutting-edge research across various fields",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    gif: "https://media.giphy.com/media/3o7TKMWxaYSNzBkPL2/giphy.gif"
  },
  {
    title: "Career Development",
    description: "Prepare for your future with our career services",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    gif: "https://media.giphy.com/media/l0HlQXlQ3nHyLMvte/giphy.gif"
  },
  {
    title: "Career Development",
    description: "Prepare for your future with our career services",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gif: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif"
  }
];

function Card({ item }:{item:CollegeContentItem}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
        "bg-cover bg-center",
        "transition-all duration-500"
      )}
      style={{
        backgroundImage: `url(${isHovered ? item.gif : item.image})`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text relative z-30">
        <h1 className="font-bold text-xl md:text-3xl text-white relative">
          {item.title}
        </h1>
        <p className="font-normal text-base text-gray-50 relative my-4">
          {item.description}
        </p>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500"></div>
    </div>
  );
}

export function HomeCards(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collegeContent.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
}