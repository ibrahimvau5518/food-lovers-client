import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(AuthContext);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // ✅ Fetch all or filtered reviews
  const fetchReviews = async (search = '') => {
    try {
      const url =
        search.trim() === ''
          ? `${apiUrl}/reviews`
          : `${apiUrl}/reviews/search?foodName=${encodeURIComponent(search)}`;

      const response = await axios.get(url);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    setLoading(true);
    fetchReviews(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setLoading(true);
    fetchReviews('');
  };

  const handleAddToFavorites = async reviewId => {
    if (!user) {
      toast.error('Please login to add favorites');
      return;
    }

    try {
      await axios.post(`${apiUrl}/favorites`, {
        userEmail: user.email,
        reviewId: reviewId,
      });
      toast.success('Added to favorites!');
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error('Already in favorites');
      } else {
        toast.error('Failed to add to favorites');
      }
      console.error('Error adding to favorites:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">All Reviews</h1>

        {/* 🔍 Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search by food name..."
              className="input input-bordered flex-1"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="btn btn-ghost"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* 💬 Reviews Grid */}
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl">No reviews found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div
                key={review._id}
                className="card bg-base-100 shadow-xl h-full"
              >
                <figure className="h-48 relative">
                  <img
                    src={review.foodImage || 'https://via.placeholder.com/300'}
                    alt={review.foodName}
                    className="w-full h-full object-cover"
                  />
                  {user && (
                    <button
                      onClick={() => handleAddToFavorites(review._id)}
                      className="btn btn-circle btn-sm absolute top-2 right-2 bg-white hover:bg-red-100"
                    >
                      ❤️
                    </button>
                  )}
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{review.foodName}</h2>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                    <span className="text-base-content ml-1">
                      ({review.rating})
                    </span>
                  </div>
                  <p className="font-semibold">{review.restaurantName}</p>
                  <p className="text-sm text-base-content/70">
                    📍 {review.location}
                  </p>
                  <p className="text-sm">By: {review.reviewerName}</p>
                  <p className="text-sm text-base-content/70">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : ''}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/review/${review._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
