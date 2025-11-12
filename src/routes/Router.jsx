import { createBrowserRouter } from 'react-router';
import HomeLayout from '../layouts/HomeLayout';
import Home from '../pages/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import AllReviews from '../components/AllReviews';
import MyReviews from '../components/MyReviews';
import EditReview from '../components/EditReview';
import MyFavorites from '../components/MyFavorites';
import ReviewDetails from '../components/ReviewDetails';
import AddReview from '../components/AddReview';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/allReviews',
        element: <AllReviews></AllReviews>,
      },
      {
        path: '/review/:id',
        element: <ReviewDetails></ReviewDetails>,
      },
      {
        path: '/addReview',
        element: <AddReview></AddReview>, 
      },
      {
        path: '/myReviews',
        element: <MyReviews></MyReviews>,
      },
      {
        path: '/editReview/:id',
        element: <EditReview></EditReview>,
      },
      {
        path: '/myFavorites',
        element: <MyFavorites></MyFavorites>,
      },
    ],
  },
]);

export default Router;
