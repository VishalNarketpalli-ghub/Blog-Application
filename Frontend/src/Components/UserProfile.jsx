import { userAuth } from "../Store/authStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";

function UserProfile() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const logout = userAuth((state) => state.logout);

    // const navigate = useNavigate()

    const onLogout = async () => {
        // logout
        await logout();

        // navigate to rout
        navigate("/login");
    };

    const viewArticle = (currentArticle) => {
        navigate(`/article/${currentArticle._id}`, {
            state: currentArticle,
        });
    };

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                let res = await axios.get(
                    "http://localhost:4000/user-api/user",
                    { withCredentials: true },
                );
                // console.log(res);

                setArticles(res.data.payload);
                // console.log(articles);
            } catch (error) {
                console.log("error ", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#42BAF0] to-[#EEABE3]">
            <div className="flex flex-col items-end">
                {/* <img src="" alt="" /> */}
                <button
                    onClick={onLogout}
                    className="items-end border rounded px-3 m-3 p-3 pointer bg-red-500 hover:opacity-70 cursor-pointer"
                >
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-white">
                {articles.map((e) => (
                    <div
                        key={e._id}
                        className="border m-2 p-4 bg-gray-200 bg-gradient-to-br from-indigo-950 via-slate-900 to-black hover:border-orange-700"
                    >
                        <p className="font-semibold">Title: {e.title}</p>
                        <p>Auhor: {e.author.firstName}</p>
                        <p>Category: {e.category}</p>
                        <button
                            onClick={() => viewArticle(e)}
                            className="text-blue-300 cursor-pointer "
                        >
                            View Article
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserProfile;
