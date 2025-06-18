import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";

function Register(props) {
    const { register, handleSubmit, reset,
        watch, formState: { errors } } = useForm();
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        data.role = [{ id: 1}];
        try {
            const response = await axios.post(
                'http://localhost:8080/register',data);
            reset();
            navigate("/login");
        } catch (error) {
            if (error.response.status === 400) {
                setErrorMsg(error.response.data);
            }

            toast.error(error || "Error registering user");
        }
    };



    return (
        <div className={"h-screen w-screen flex"}>

            <div className={"bg-black w-1/2 h-full text-white flex items-center justify-center"}>
                <div className={"w-[78%]"}>
                    <p className={"text-5xl font-mono font-semibold"}>Welcome to TestyBite.</p>
                    <p className={"mt-6 text-lg tracking-wider text-justify"}>TastyBite makes dining effortless order food, reserve tables,
                        and enjoy a seamless experience in just a few clicks!</p>
                </div>
            </div>

            <div className={"w-1/2 h-full p-5 flex justify-center items-center"}>
                <div className="w-[68%]">
                    <div className={"text-2xl font-semibold tracking-normal mt-16"}>Sign up to TestyBite</div>
                    <form className={"text-lg mt-10"} onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <input className={"border-b-4  border-l-4 border-r-2 border-t-2 font-sans " +
                                "w-full p-2 mt-1 h-10 tracking-normal placeholder:text-gray-600 rounded-sm"}
                                   {...register("name", {
                                       required: "Name is required"})}
                                   type="text" placeholder="Name"/>
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>


                        <div className={"mt-7"}>
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



                        <div className={"mt-7"}>
                            <input className={"border-b-4  border-l-4 border-r-2 border-t-2 rounded-sm w-full pl-2 font-sans " +
                                " mt-1 h-10 placeholder:text-gray-600"}
                                   type="password" id={"password"} placeholder="Password" name="password"
                                   {...register("password", {
                                       required: "Password is required",
                                       minLength: {
                                           value: 8,
                                           message: "Password must be at least 8 characters"
                                       },
                                       pattern: {
                                           value: /^(?=.*[a-z])(?=.*[0-9]).{8,}$/,
                                           message: "Password must contain at least one number and one lowercase letter"
                                       }
                                   })}/>
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}


                            <div className={"text-sm text-gray-500 text-justify mt-0.5 "}>
                                Password should be at least 15 characters or at least 8
                                characters including a number and a lowercase letter.
                            </div>
                        </div>

                        <div className={"mt-8"}>
                            <button type={"submit"} className={"bg-black w-full h-11 text-white" +
                                " rounded-sm text-lg tracking-wider hover:bg-gray-800 active:bg-black cursor-pointer"}>Submit
                            </button>
                        </div>
                    </form>

                    <p className={"text-sm text-gray-500 text-justify mt-2"}>
                        By creating an account, you agree to the
                        <span className={"text-blue-600"}> Terms of Service. </span>
                        For more information about TestyBite's privacy practices, see the
                        <span className={"text-blue-600"}> TestyBite Privacy Statement. </span>
                        We'll occasionally send you account-related emails.</p>

                    <p className={"font-semibold font-sans mt-2"}>
                        Already have an account? <Link to={"/login"} className={"underline"}> Sign in → </Link></p>


                    <div className="mt-8 flex justify-end h-8">
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

export default Register;