import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReviewDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReview();
  }, [id]);

  const fetchReview = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await axios.get(`${apiUrl}/reviews/${id}`);
      setReview(response.data);
    } catch (error) {
      console.error('Error fetching review:', error);
      toast.error('Failed to load review');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Review not found</h2>
          <Link to="/all-reviews" className="btn btn-primary">
            Back to All Reviews
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <figure className="h-96">
            <img
              src={review.foodImage}
              alt={review.foodName}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-4xl">{review.foodName}</h1>

            <div className="flex items-center gap-2 text-2xl text-yellow-500 my-4">
              {'★'.repeat(review.rating)}
              {'☆'.repeat(5 - review.rating)}
              <span className="text-base-content">({review.rating}/5)</span>
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Restaurant Details</h3>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Name:</span>{' '}
                  {review.restaurantName}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Location:</span> 📍{' '}
                  {review.location}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Review Info</h3>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Reviewed by:</span>{' '}
                  {review.reviewerName}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Date:</span>{' '}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="divider"></div>

            <div>
              <h3 className="font-bold text-lg mb-2">Review</h3>
              <p className="text-base leading-relaxed">{review.reviewText}</p>
            </div>

            <div className="card-actions justify-end mt-6">
              <Link to="/AllReviews" className="btn btn-primary">
                Back to All Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
