
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { StarRating } from "../../main/StarRating";

interface Item {
    studentName: string;
    description: string;
    date: string;
    rating: number;
  }
  
  interface HoverEffectProps {
    items: Item[];
  }
  
  export const HoverEffect: React.FC<HoverEffectProps> = ({ items }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2">
        {items.map((item, idx) => (
          <Link
            to="#"
            key={idx}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <Card rating={item.rating}>
              <CardTitle>{item.studentName}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <p className="mt-2 text-gray-500">{item.date}</p>
            </Card>
          </Link>
        ))}
      </div>
    );
  };

  interface CardProps {
  children: React.ReactNode;
  rating?: number;
}

export const Card: React.FC<CardProps> = ({ children, rating }) => {
  return (
    <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-white border border-black dark:border-white/[0.2] group-hover:border-slate-700 relative z-20">
      <div className="relative z-50">
        <div className="p-4">
          {children}
          {rating !== undefined && (
            <div className="mt-4">
              <StarRating rating={rating} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return (
    <h4 className="text-black font-bold tracking-wide mt-4">
      {children}
    </h4>
  );
};

interface CardDescriptionProps {
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children }) => {
  return (
    <p className="mt-8 text-black tracking-wide leading-relaxed text-sm">
      {children}
    </p>
  );
};