interface StarRatingProps {
  rating: number; // Rating out of 5
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 > 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <span key={index} className="text-yellow-400">&#9733;</span>
        ))}
      {halfStar && <span className="text-yellow-400">&#9733;</span>}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <span key={index} className="text-gray-400">&#9734;</span>
        ))}
    </div>
  );
};