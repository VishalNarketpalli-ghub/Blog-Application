import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Register() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState();

    const onSubmit = async (newUser) => {
        setLoading(true);
        // Create form data object
        const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = newUser;
        //add all fields except profileImageUrl to FormData object
        Object.keys(userObj).forEach((key) => {
            formData.append(key, userObj[key]);
        });
        // add profileImageUrl to Formdata object
        formData.append("profileImageUrl", profileImageUrl[0]);

        try {
            // Remove role from body because backend sets the canonical role per endpoint.
            // let { role, ...userObj } = newUser;

            if (role === "AUTHOR") {
                let resObj = await axios.post(
                    "http://localhost:4000/author-api/users",
                    formData,
                );
                if (resObj.status == 201) {
                    navigate("/login");
                }
            }
            if (role === "USER") {
                let resObj = await axios.post(
                    "http://localhost:4000/user-api/users",
                    formData,
                );
                if (resObj.status == 201) {
                    navigate("/login");
                }
            }
            // console.log(userObj)
        } catch (error) {
            setError(
                error?.response?.data?.error ||
                    error?.message ||
                    "Registration failed",
            );
        } finally {
            setLoading(false);
        }

        // loading
        if (loading) {
            return <p className="text-red-500"> Loading...</p>;
        }

        // error
        // if(error){
        //     return <p className='text-red-500 text-4xl'>Error</p>
        // }

        // remove preview from browser memory
        useEffect(() => {
            return () => {
                if (preview) {
                    URL.revokeObjectURL(preview);
                }
            };
        }, [preview]);
    };
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center font-bold mb-5">
                    Register to Our App
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-10 rounded-lg max-w-lg shadow-lg bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white"
                >
                    {/* error message */}
                    {error && <p className="text-red-500 text-lg">{error}</p>}

                    {/* role */}
                    <div className="flex gap-6 justify-items-end items-center ">
                        <h2 className="text-xl">Select Your Role: </h2>
                        <label>
                            <input
                                className="accent-red-600"
                                type="radio"
                                value="USER"
                                {...register("role", {
                                    required: "Role is required",
                                })}
                            />
                            <span className="ml-2">User</span>
                        </label>
                        <label>
                            <input
                                className="accent-red-600"
                                type="radio"
                                value="AUTHOR"
                                {...register("role", {
                                    required: "Role is required",
                                })}
                            />
                            <span className="ml-2">Author</span>
                        </label>
                    </div>
                    {errors.role && (
                        <p className="text-red-500 text-sm">
                            {errors.role.message}
                        </p>
                    )}
                    <div className="flex justify-even mt-5 gap-4">
                        <div className="w-1/2">
                            {/* first name */}
                            <input
                                type="text"
                                placeholder="enter your first name"
                                {...register("firstName", {
                                    required: "First Name is required",
                                })}
                                className="border rounded p-2 w-full"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2">
                            {/* first name */}
                            <input
                                type="text"
                                placeholder="enter your last name"
                                {...register("lastName", {
                                    required: "Last Name is required",
                                })}
                                className="border rounded p-2 w-full"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* email */}
                    <input
                        type="email"
                        placeholder="enter your email"
                        {...register("email", {
                            required:
                                "email is required(so that we can spam you! jk)",
                        })}
                        className="border rounded w-full mt-5 p-2"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                    {/* password */}
                    <input
                        type="password"
                        placeholder="enter your password"
                        {...register("password", {
                            required: "password is required",
                            minLength: {
                                value: 6,
                                message: "Minimum 6 characters",
                            },
                        })}
                        className="border rounded w-full mt-5 p-2"
                    />
                    {errors.password && (
                        <p className="text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                    {/* Backend schema expects profileImageUrl as a string URL, not a file object. */}
                    <div>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="border rounded w-full mt-5 p-2"
                            {...register("profileImageUrl")}
                            onChange={(e) => {
                                //get image file
                                const file = e.target.files[0];
                                // validation for image format
                                if (file) {
                                    if (
                                        !["image/jpeg", "image/png"].includes(
                                            file.type,
                                        )
                                    ) {
                                        setError("Only JPG or PNG allowed");
                                        return;
                                    }
                                    //validation for file size
                                    if (file.size > 2 * 1024 * 1024) {
                                        setError(
                                            "File size must be less than 2MB",
                                        );
                                        return;
                                    }
                                    //Converts file → temporary browser URL(create preview URL)
                                    const previewUrl =
                                        URL.createObjectURL(file);
                                    setPreview(previewUrl);
                                    setError(null);
                                }
                            }}
                        />
                        {preview && (
                            <div className="mt-3 flex justify-center">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded-full border"
                                />
                            </div>
                        )}
                        {errors.profileImageUrl && (
                            <p className="text-red-500">
                                {errors.profileImageUrl.message}
                            </p>
                        )}
                    </div>

                    {/* submit button */}
                    <div className="flex justify-center">
                        <button className="bg-gradient-to-br from-[#ffcc00] via-[#DD6F91] to-[#fe0022] hover:opacity-90 transition-opacity text-white font-bold rounded mt-5 px-7 py-2 cursor-pointer">
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
