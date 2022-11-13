import { lazy } from "react";
import { RouterProvider, createHashRouter as createRouter } from "react-router-dom";

let Employee = lazy(() => import("./components/employee"));

const router = createRouter([
  {
    path: "/employee",
    element: <Employee />,
  },
]);
export default function MyRouter() {
  return (
      <RouterProvider router={router}></RouterProvider>
  );
}