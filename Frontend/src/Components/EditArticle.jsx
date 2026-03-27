import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";

function EditArticle() {
    const { articleId } = useParams();
    const location = useLocation();
    const [article, setArticle] = useState(location.state || null);
    const [loading, setLoading] = useState(!location.state);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!article) {
            const fetchArticle = async () => {
                try {
                    const res = await axios.get(
                        `http://localhost:4000/common-api/article/${articleId}`,
                        { withCredentials: true },
                    );
                    setArticle(res.data.payload);
                } catch (err) {
                    setError(err.response?.data?.message || err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchArticle();
        }
    }, [articleId, article]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // prefill form
    useEffect(() => {
        if (!article) return;

        setValue("title", article.title);
        setValue("category", article.category);
        setValue("content", article.content);
    }, [article]);

    const updateArticle = async (data) => {
        // console.log(data);

        const reqData = {
            author: article.author._id,
            articleId: article._id,
            title: data.title,
            category: data.category,
            content: data.content,
        };

        const res = await axios.patch(
            "http://localhost:4000/author-api/articles",
            reqData,
            { withCredentials: true },
        );
        // console.log("data is :", res);
        navigate(`/article/${res.data.payload._id}`, {
            state: res.data.payload,
        });
    };

    if (loading)
        return (
            <p className="text-white text-center mt-10 text-2xl">Loading...</p>
        );
    if (error)
        return (
            <p className="text-red-500 text-center mt-10 text-2xl">
                Error: {error}
            </p>
        );
    if (!article)
        return (
            <p className="text-white text-center mt-10 text-2xl">
                Article not found
            </p>
        );

    return (
        <div className="h-[100%] flex flex-col justify-center items-center">
            <form
                onSubmit={handleSubmit(updateArticle)}
                className="border p-5 w-[80%] rounded flex flex-col gap-3 rounded-lg shadow-lg bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white"
            >
                <div className="flex flex-col">
                    {/* title */}
                    <label className="">Title </label>
                    <input
                        type="text"
                        className="border p-2 rounded"
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
                <div className="flex flex-col">
                    {/* category */}
                    <label>Category </label>
                    <input
                        type="text"
                        className="border p-2 rounded"
                        {...register("category", {
                            required: "Category is required",
                        })}
                    />
                    {errors.category && (
                        <p className={errorClass}>{errors.category.message}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    {/* content */}
                    <label>Content </label>
                    <textarea
                        rows="14"
                        type="text"
                        className="border p-2 rounded whitespace-pre-wrap"
                        {...register("content", {
                            required: "Content is required",
                        })}
                    />
                    {errors.content && (
                        <p className={errorClass}>{errors.content.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="border rounded bg-green-400 w-20"
                >
                    submit
                </button>
            </form>
        </div>
    );
}

export default EditArticle;
