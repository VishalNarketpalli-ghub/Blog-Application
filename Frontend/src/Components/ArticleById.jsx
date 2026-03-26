import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { userAuth } from "../Store/authStore";
import axios from "axios";
import { useEffect } from "react";

// import { useState, useEffect } from "react";

function ArticleById() {
    const location = useLocation();
    const articleObj = location.state;
    // const [user, setUser] = useState();
    // console.log(location);
    // console.log(articleObj);

    // fetch user details and display their name pfp comment

    const currentUser = userAuth((state) => state.currentUser);
    // console.log(currentUser);

    const user = currentUser?.role;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitComment = async (newComment) => {
        // console.log(newComment.comment);
        const reqData = {
            uid: currentUser._id,
            articleId: articleObj._id,
            comment: newComment.comment,
        };
        // console.log(reqData);
        const res = await axios.post(
            "http://localhost:4000/user-api/users-comment",
            reqData,
            { withCredentials: true },
        );
        console.log("res is :", res);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black min-w-[415px]">
            <div className="bg-gray-300 pt-5 mx-18">
                <p className="text-6xl text-center font-mono">
                    {articleObj.title}
                </p>
                <p className="text-center">-{articleObj.author.firstName}</p>
                <div className="flex justify-between flex-wrap">
                    <p className="flex text-2xl ml-5 items-center font-sans">
                        {articleObj.category}
                    </p>
                    <div className="flex flex-col items-end m-5 p-3">
                        <div className="flex gap-1">
                            <p>Published :</p>
                            <p>
                                {articleObj.createdAt.slice(0, 10)} :
                                {articleObj.createdAt.slice(11, 16)}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p>Last updated :</p>
                            <p>
                                {articleObj.updatedAt.slice(0, 10)} :
                                {articleObj.createdAt.slice(11, 16)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-purple-300 mx-18 p-5">
                <p className="font-serif p-5">{articleObj.content}</p>
                <div>
                    <div>
                        <p className="text-2xl">Comments:</p>
                        {user == "USER" && (
                            <form onSubmit={handleSubmit(submitComment)}>
                                <input
                                    type="text"
                                    placeholder="add comment.."
                                    className="border p-2 w-[] rounded w-3xl"
                                    {...register("comment")}
                                />
                                <button className="border bg-blue-500">
                                    Add comment
                                </button>
                            </form>
                        )}
                        {articleObj.comments.map((e) => (
                            <div key={e._id} className="p-4">
                                <p>{e.user?.firstName}</p>
                                <p>{e.comments}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleById;

// author
// :
// "69ae92141b905bf3821f53d3"
// category
// :
// "comedy"
// comments
// :
// (2) [{…}, {…}]
// content
// :
// "sdjvbskdjv ksjdvbsdjbv "
// createdAt
// :
// "2026-03-09T15:14:01.902Z"
// isArticleActive
// :
// true
// title
// :
// "Bhalu"
// updatedAt
// :
// "2026-03-09T15:51:18.386Z"
// _id
// :
// "69aee3b90251a40e36443ba3"
