import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";

function Login(props) {
    const { register, handleSubmit, watch,
        reset,
        formState: { errors } } = useForm();
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/login',data);

            const {roles, token, username} = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            console.log(username);
            reset();
            if (roles.includes('ADMIN')) {
                navigate("/all-orders");
            }
            else if (roles.includes('USER')) {
                navigate("/home");
            }
        } catch (error) {
            setErrorMsg(error.response.data);
           toast.error(error.response.data || "Error logging user");
        }
    };

    return (
        <div className={"h-screen w-screen flex"}>
            <div className={"bg-black w-1/2 h-full text-white flex items-center justify-center"}>
                <div className={"w-[78%]"}>
                    <p className={"text-5xl font-mono font-semibold leading-14"}>Welcome back to TestyBite.</p>
                    <p className={"mt-6 text-lg tracking-wider text-justify"}>TastyBite makes dining effortless order
                        food, reserve tables,
                        and enjoy a seamless experience in just a few clicks!</p>
                </div>
            </div>

            <div className={"w-1/2 h-full p-5 flex justify-center items-center"}>
                <div className="w-[68%]">
                    <div className={"text-2xl font-semibold tracking-normal"}>Sign in to TestyBite</div>
                    <form className={"text-lg mt-8"} onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <input className={"border-b-4  border-l-4 border-r-2 border-t-2 rounded-sm font-sans " +
                                "w-full p-2 mt-1 h-10 tracking-normal placeholder:text-gray-600"}
                                   {...register("username", {
                                       required: "Email is required",
                                       pattern: {
                                           value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                           message: "Please enter a valid email address"
                                       }
                                   })}
                                   type="text" placeholder="Email"/>
                            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                        </div>


                        <div className={"mt-6"}>
                            <input className={"border-b-4  border-l-4 border-r-2 border-t-2 rounded-sm w-full pl-2 font-sans " +
                                " mt-1 h-10 text-lg placeholder:text-gray-600"}
                                   type="password" id={"password"} placeholder="Password"
                                   {...register("password", {
                                       required: "Password is required"
                                   })}/>
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>

                        <div className={"mt-8"}>
                            <button type={"submit"} className={"bg-black w-full h-11 text-white" +
                                " rounded-sm text-lg tracking-wider hover:bg-gray-800 active:bg-black cursor-pointer"}>Submit
                            </button>
                        </div>
                    </form>

                    <p className={"font-semibold font-sans mt-2"}>
                        Not have an account? <Link to={"/"} className={"underline"}> Sign up → </Link></p>

                    <div className="mt-6 flex justify-end h-8">
                        {errorMsg && (
                            <p className="mt-1 text-red-600 border-l-4 bg-red-50 font-semibold w-2/3 h-full flex items-center p-2">
                                {errorMsg}
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;