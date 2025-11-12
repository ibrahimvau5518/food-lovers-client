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
    </div>
  );
};

export default Home;
