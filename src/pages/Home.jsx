import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';

const Home = () => {
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedReviews();
  }, []);

  const fetchFeaturedReviews = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${apiUrl}/reviews/featured`);
      setFeaturedReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="carousel w-full h-[500px]">
        <div id="slide1" className="carousel-item relative w-full">
          <div
            className="hero min-h-full"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200)',
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Welcome to Local Food Lovers
                </h1>
                <p className="mb-5">
                  Discover and share amazing food experiences from local
                  restaurants, street food, and home-cooked meals.
                </p>
                <Link to="/all-reviews" className="btn btn-primary">
                  Explore Reviews
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div
            className="hero min-h-full"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200)',
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Share Your Food Journey
                </h1>
                <p className="mb-5">
                  Join our community and share your favorite food experiences
                  with food lovers around you.
                </p>
                <Link to="/add-review" className="btn btn-primary">
                  Add Review
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <div
            className="hero min-h-full"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200)',
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Find Hidden Gems</h1>
                <p className="mb-5">
                  Discover hidden culinary treasures through honest reviews from
                  fellow food enthusiasts.
                </p>
                <Link to="/all-reviews" className="btn btn-primary">
                  View All Reviews
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      {/* Featured Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Reviews</h2>
          <p className="text-lg text-base-content/70">
            Check out the top-rated food experiences from our community
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredReviews.map(review => (
                <div
                  key={review._id}
                  className="card bg-base-100 shadow-xl h-full"
                >
                  <figure className="h-48">
                    <img
                      src={review.foodImage}
                      alt={review.foodName}
                      className="w-full h-full object-cover"
                    />
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
            <div className="text-center">
              <Link to="/all-reviews" className="btn btn-primary">
                Show All Reviews
              </Link>
            </div>
          </>
        )}
      </div>
      {/* Why Choose Us Section */}
      <div className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Join Local Food Lovers?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="card-title">Community Driven</h3>
                <p>
                  Join a passionate community of food lovers who share honest
                  reviews and recommendations.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">🗺️</div>
                <h3 className="card-title">Local Focus</h3>
                <p>
                  Discover amazing food spots in your neighborhood and nearby
                  areas.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="card-title">Honest Reviews</h3>
                <p>
                  Read genuine reviews from real food enthusiasts, not paid
                  promotions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
