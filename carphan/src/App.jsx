import { lazy, Suspense, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { currentUser, isLogOut } from "./redux/slices/authSLice";
import { useGetProtectQuery } from "./redux/api_Slices/protectSlice";
import Loader from "./components/Loader";
import TokenResetModal from "./components/modal";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/authPages/Register"));
const Login = lazy(() => import("./pages/authPages/Login"));
const Dashboard = lazy(() => import("./pages/dashboadPages/dashboard"));
const SingleCar = lazy(() => import("./pages/Cars/singleCars"));
const MyBookings = lazy(() => import("./pages/dashboadPages/myBookings"));
const MyVehicle = lazy(() => import("./pages/Cars/myVehicle"));
const CreateCar = lazy(() => import("./pages/Cars/createCar"));
const Profile = lazy(() => import("./pages/dashboadPages/profile"));
const Success = lazy(() => import("./pages/dashboadPages/success"));
const Cancelled = lazy(() => import("./pages/dashboadPages/cancelled"));
const ErrorPage = lazy(() => import("./pages/Error404"));
function App() {
  const user = useSelector(currentUser);
  console.log(user);
  const { data, error } = useGetProtectQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch(isLogOut());
  };
  useEffect(() => {
    if (error && error.status === 401) {
      setModalOpen(true);
      console.log("Token expired");
    }
  }, [data, error]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path='/'
          element={user ? <Navigate to={"/dashboard"} /> : <Home />}
        />
        <Route
          path='/register'
          element={user ? <Navigate to={"/dashboard"} /> : <Register />}
        />
        <Route
          path='/login'
          element={user ? <Navigate to={"/dashboard"} /> : <Login />}
        />
        <Route path='/load' element={<Loader />} />
        <Route
          path='/dashboard'
          element={!user ? <Navigate to={"/"} /> : <Dashboard />}
        />
        <Route
          path='/car/:id'
          element={!user ? <Navigate to={"/"} /> : <SingleCar />}
        />
        <Route
          path='my-bookings'
          element={!user ? <Navigate to={"/"} /> : <MyBookings />}
        />
        <Route
          path='myvehicles'
          element={!user ? <Navigate to={"/"} /> : <MyVehicle />}
        />
        <Route
          path='/createCar'
          element={!user ? <Navigate to={"/"} /> : <CreateCar />}
        />
        <Route
          path='/profile'
          element={!user ? <Navigate to={"/"} /> : <Profile />}
        />
        <Route
          path='/success'
          element={!user ? <Navigate to={"/"} /> : <Success />}
        />
        <Route
          path='/cancelled'
          element={!user ? <Navigate to={"/"} /> : <Cancelled />}
        />
        <Route path='*' element={<ErrorPage />} />
      </Route>,
    ),
  );
  return (
    <>
      <Box>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
          <TokenResetModal
            isOpen={modalOpen}
            handleLogin={handleLogOut}
            onClose={() => setModalOpen(false)}
          />
        </Suspense>
      </Box>
    </>
  );
}

export default App;
