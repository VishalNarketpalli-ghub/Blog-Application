import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./Components/RootLayout";
import { Children } from "react";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import UserProfile from "./Components/UserProfile";
import AuthorProfile from "./Components/AuthorProfile";
import { Toaster } from "react-hot-toast";
import ArticleById from "./Components/ArticleById";
import ProtectedRout from "./Components/ProtectedRout";
import ErrorBoundary from "./Components/ErrorBoundary";

function App() {
    const routerObj = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorBoundary />,
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "user-profile",
                    element: (
                        <ProtectedRout allowedRoles={["USER"]}>
                            <UserProfile />
                        </ProtectedRout>
                    ),
                },
                {
                    path: "author-profile",
                    element: (
                        <ProtectedRout alloweRoles={["AUTHOR"]}>
                            <AuthorProfile />
                        </ProtectedRout>
                    ),
                },
                {
                    path: "article",
                    element: (
                        <ProtectedRout allowedRoles={["AUTHOR", "USER"]}>
                            <ArticleById />
                        </ProtectedRout>
                    ),
                },
            ],
        },
    ]);

    return (
        <div>
            <Toaster position="top-center"></Toaster>
            <RouterProvider router={routerObj} />
        </div>
    );
}

export default App;
