// src/components/CardHoverEffectDemo.tsx
import { HoverEffect } from '../../ui/mainUi/card-hover-effect';

interface ReviewItem {
  studentName: string;
  description: string;
  date: string;
  rating: number;
}

const reviews: ReviewItem[] = [
  {
    
    studentName: "Jane Smith",
    description: "The Math department has excellent faculty and resources.",
      date: "July 25, 2024",
      rating: 4.5,
    
  },
  {
  
      studentName: "Michael Johnson",
      description: "The Science Labs are well-equipped and the staff is very supportive.",
      date: "July 26, 2024",
      rating: 5,
    },
    {
  
        studentName: "Michael Johnson",
        description: "The Science Labs are well-equipped and the staff is very supportive.",
        date: "July 26, 2024",
        rating: 5,
      },
      {
  
        studentName: "Michael Johnson",
        description: "The Science Labs are well-equipped and the staff is very supportive.",
        date: "July 26, 2024",
        rating: 5,
      },
      {
  
        studentName: "Michael Johnson",
        description: "The Science Labs are well-equipped and the staff is very supportive.",
        date: "July 26, 2024",
        rating: 5,
      },
      {
  
        studentName: "Michael Johnson",
        description: "The Science Labs are well-equipped and the staff is very supportive.",
        date: "July 26, 2024",
        rating: 5,
      },
      {
    
          studentName: "Michael Johnson",
          description: "The Science Labs are well-equipped and the staff is very supportive.",
          date: "July 26, 2024",
          rating: 5,
        },
        {
    
          studentName: "Michael Johnson",
          description: "The Science Labs are well-equipped and the staff is very supportive.",
          date: "July 26, 2024",
          rating: 5,
        }

];

export function ReviewsList() {
    return (
      <div className="w-full min-h-screen flex items-start px-4 pt-2">
        <div className="max-w-6xl w-full mx-auto">
          <HoverEffect items={reviews} />
        </div>
      </div>
    );
  }
