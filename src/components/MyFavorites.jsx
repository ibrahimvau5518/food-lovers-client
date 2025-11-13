import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        'https://local-food-lovers-api-server.vercel.app';
      const response = await axios.get(`${apiUrl}/favorites/${user.email}`);
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async favoriteId => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        'https://local-food-lovers-api-server.vercel.app';
      await axios.delete(`${apiUrl}/favorites/${favoriteId}`);
      setFavorites(favorites.filter(f => f._id !== favoriteId));
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove favorite');
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
        <h1 className="text-4xl font-bold text-center mb-8">My Favorites</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">You haven't added any favorites yet</p>
            <Link to="/AllReviews" className="btn btn-primary">
              Browse Reviews
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(favorite => (
              <div
                key={favorite._id}
                className="card bg-base-100 shadow-xl h-full"
              >
                <figure className="h-48">
                  <img
                    src={favorite.review?.foodImage}
                    alt={favorite.review?.foodName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{favorite.review?.foodName}</h2>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {'★'.repeat(favorite.review?.rating)}
                    {'☆'.repeat(5 - favorite.review?.rating)}
                    <span className="text-base-content ml-1">
                      ({favorite.review?.rating})
                    </span>
                  </div>
                  <p className="font-semibold">
                    {favorite.review?.restaurantName}
                  </p>
                  <p className="text-sm text-base-content/70">
                    📍 {favorite.review?.location}
                  </p>
                  <p className="text-sm">By: {favorite.review?.reviewerName}</p>
                  <div className="card-actions justify-between mt-4">
                    <button
                      onClick={() => handleRemoveFavorite(favorite._id)}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/review/${favorite.reviewId}`}
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

export default MyFavorites;
