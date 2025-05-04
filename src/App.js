import React from "react";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useOutletContext,
} from "react-router-dom";
import ReactDOM from "React-dom/client";
import HomePage from "./component/auth/Home";
import LoginPage from "./component/auth/Login";
import SignupPage from "./component/auth/Signup";
import Error from "./Error";
import AllTasks from "./component/pages/AllTasks";
import Navbar from "./component/pages/Navbar";
import { Provider } from "react-redux";
import { Store } from "./redux/Store";

const App = () => {
  return (
    <Provider store={Store}>
      <Navbar />
      <Outlet />
    </Provider>
  );
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/task",
        element: <AllTasks />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes} />);
