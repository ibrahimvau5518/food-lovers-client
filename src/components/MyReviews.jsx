import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchMyReviews();
    }
  }, [user]);

  const fetchMyReviews = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        'https://local-food-lovers-api-server.vercel.app';
      const response = await axios.get(`${apiUrl}/reviews/user/${user.email}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = review => {
    setSelectedReview(review);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedReview(null);
  };

  const handleDelete = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        'https://local-food-lovers-api-server.vercel.app';
      await axios.delete(`${apiUrl}/reviews/${selectedReview._id}`);
      toast.success('Review deleted successfully!');
      setReviews(reviews.filter(r => r._id !== selectedReview._id));
      closeDeleteModal();
    } catch (error) {
      toast.error('Failed to delete review');
      console.error('Error deleting review:', error);
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
        <h1 className="text-4xl font-bold text-center mb-8">My Reviews</h1>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">You haven't added any reviews yet</p>
            <Link to="/AddReview" className="btn btn-primary">
              Add Your First Review
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Food Image</th>
                  <th>Food Name</th>
                  <th>Restaurant Name</th>
                  <th>Posted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review._id}>
                    <td>
                      <div className="avatar">
                        <div className="w-16 h-16 rounded">
                          <img src={review.foodImage} alt={review.foodName} />
                        </div>
                      </div>
                    </td>
                    <td>{review.foodName}</td>
                    <td>{review.restaurantName}</td>
                    <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/edit-review/${review._id}`}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => openDeleteModal(review)}
                          className="btn btn-error btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {deleteModalOpen && (
          <dialog open className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Delete</h3>
              <p className="py-4">
                Are you sure you want to delete the review for "
                {selectedReview?.foodName}"?
              </p>
              <div className="modal-action">
                <button onClick={handleDelete} className="btn btn-error">
                  Confirm
                </button>
                <button onClick={closeDeleteModal} className="btn">
                  Cancel
                </button>
              </div>
            </div>
            <form
              method="dialog"
              className="modal-backdrop"
              onClick={closeDeleteModal}
            >
              <button>close</button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
