import { Navigate } from "react-router";
import { userAuth } from "../Store/authStore";

function ProtectedRout({ children, alloweRoles }) {
    // get user login details from store
    const { loading, currentUser, isAuthenticated } = userAuth();

    // check authentication
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // check role
    if (alloweRoles && !alloweRoles.includes(currentUser?.role)) {
        return <Navigate to="/login" replace />;
    }

    // check loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    return children;
}

export default ProtectedRout;
