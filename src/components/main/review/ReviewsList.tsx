import { useState, useEffect } from 'react';
import { motion} from 'framer-motion';
import { getReviews } from '../../../api/review/getReviews';

interface Review {
  _id: string;
  name: string;
  email: string;
  feedback: string;
  rating: number;
  createdAt: string;
}

const ReviewCard = ({ review }: { review: Review }) => (
  <motion.div
    className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 mr-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <p className="text-gray-700 italic mb-4">{review.feedback}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="font-bold text-gray-800">{review.name}</p>
          <p className="font-semibold text-gray-600">{review.email}</p>
          <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export const ScrollingReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        console.log(response);
        
        if (response && Array.isArray(response)) {
          setReviews(response);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No reviews yet. Be the first to leave a review!</p>
          ) : (
            <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
              <div className="flex flex-nowrap">
                {reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollingReviews;