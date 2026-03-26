import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { userAuth } from "../Store/authStore";

function RootLayout() {
    const checkAuth = userAuth((state) => state.checkAuth);
    const loading = userAuth((state) => state.loading);

    useEffect(() => {
        checkAuth();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Header />
            <div className="h-screen bg-purple-300/80">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default RootLayout;
