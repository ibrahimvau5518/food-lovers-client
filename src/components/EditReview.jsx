import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';

const EditReview = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    restaurantName: '',
    location: '',
    rating: 5,
    reviewText: '',
  });

  useEffect(() => {
    fetchReview();
  }, [id]);

  const fetchReview = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        'https://local-food-lovers-api-server.vercel.app';
      const response = await axios.get(`${apiUrl}/reviews/${id}`);
      const review = response.data;

      // Check if user owns this review
      if (review.userEmail !== user.email) {
        toast.error('You can only edit your own reviews');
        navigate('/my-reviews');
        return;
      }

      setFormData({
        foodName: review.foodName,
        foodImage: review.foodImage,
        restaurantName: review.restaurantName,
        location: review.location,
        rating: review.rating,
        reviewText: review.reviewText,
      });
    } catch (error) {
      console.error('Error fetching review:', error);
      toast.error('Failed to load review');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const apiUrl =
      import.meta.env.VITE_API_URL ||
      'https://local-food-lovers-api-server.vercel.app';
    const reviewData = {
      ...formData,
      rating: parseInt(formData.rating),
    };

    try {
      await axios.put(`${apiUrl}/reviews/${id}`, reviewData);
      toast.success('Review updated successfully!');
      navigate('/my-reviews');
    } catch (error) {
      toast.error('Failed to update review');
      console.error('Error updating review:', error);
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
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold mb-6">Edit Review</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Name</span>
                </label>
                <input
                  type="text"
                  name="foodName"
                  placeholder="e.g., Margherita Pizza"
                  className="input input-bordered"
                  value={formData.foodName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Food Image URL</span>
                </label>
                <input
                  type="url"
                  name="foodImage"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered"
                  value={formData.foodImage}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Restaurant Name</span>
                </label>
                <input
                  type="text"
                  name="restaurantName"
                  placeholder="e.g., Joe's Pizza Place"
                  className="input input-bordered"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Downtown, Main Street"
                  className="input input-bordered"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Star Rating</span>
                </label>
                <select
                  name="rating"
                  className="select select-bordered"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                >
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Very Good</option>
                  <option value="3">3 Stars - Good</option>
                  <option value="2">2 Stars - Fair</option>
                  <option value="1">1 Star - Poor</option>
                </select>
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Review Text</span>
                </label>
                <textarea
                  name="reviewText"
                  placeholder="Share your experience..."
                  className="textarea textarea-bordered h-32"
                  value={formData.reviewText}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Update Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
