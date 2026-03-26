import { useEffect, useState } from "react";
import loginImg from "../assets/Login-side-img.png";
import { useForm } from "react-hook-form";
import { userAuth } from "../Store/authStore";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null)
    // const login = userAuth((state)=> state.login)
    const login = userAuth((state) => state.login);
    const isAuthenticated = userAuth((state) => state.isAuthenticated);
    const currentUser = userAuth((state) => state.currentUser);
    const navigate = useNavigate();
    const error = userAuth((state) => state.error);

    const onUserLogin = async (userCredObj) => {
        // console.log(userCredObj);
        await login(userCredObj);
        // console.log("is Auth :", isAuthenticated)
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (currentUser.role === "USER") {
                toast.success("Logged in successfully");
                navigate("/user-profile");
            }
            if (currentUser.role === "AUTHOR") {
                navigate("/author-profile");
            }
        }
    }, [isAuthenticated, currentUser]);

    return (
        <div className="flex flex-row text-white">
            <img src={loginImg} className="h-screen" />
            <div className="flex flex-col items-center justify-around w-[100%]">
                <form
                    onSubmit={handleSubmit(onUserLogin)}
                    className="p-20 rounded-lg max-w-lg shadow-lg mb-30 bg-gradient-to-br from-indigo-950 via-slate-900 to-black"
                >
                    {/* role */}
                    {/* <div className='flex gap-6 justify-items-end items-center '>
                    <h2 className='text-xl'>Select Your Role: </h2>
                    <label>
                    <input type="radio" value="USER" {...register("role", { required: "Role is required" })} />
                    <span className="ml-2">User</span>
                    </label>
                    <label>
                    <input type="radio" value="AUTHOR" {...register("role", { required: "Role is required" })} />
                    <span className="ml-2">Author</span>
                    </label>
                    <label>
                    <input type="radio" value="ADMIN" {...register("role", { required: "Role is required" })} />
                    <span className="ml-2">Admin</span>
                    </label>
                </div> */}
                    <p className="text-3xl text-center">Login</p>

                    {errors.role && (
                        <p className="text-red-500 text-sm">
                            {errors.role.message}
                        </p>
                    )}
                    {/* email */}
                    <input
                        type="email"
                        placeholder="enter your email"
                        {...register("email", {
                            required:
                                "email is required(so that we can spam you! jk)",
                        })}
                        className="border rounded w-full mt-5 p-2 text-white"
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
                    {/* submit button */}
                    <div className="flex justify-center">
                        <button className="bg-gradient-to-br from-[#ffcc00] via-[#DD6F91] to-[#fe0022] hover:opacity-90 transition-opacity text-white font-bold rounded mt-5 px-7 py-2 cursor-pointer">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
