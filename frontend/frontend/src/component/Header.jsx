import React, {useEffect, useRef, useState} from 'react';
import { FaUser, FaShoppingCart, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import {useNavigate, useNavigation} from "react-router-dom";

function Header() {
    const scrollRef = useRef(); // Reference for horizontal scrolling of categories
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);

    function handleLogout() {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate('/login');
    }

    // Function to scroll categories to the left
    function scrollLeft() {
        if (scrollRef.current) {
            console.log(scrollRef.current); // Debugging log to check the element reference
            scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
        }
    }

    // Function to scroll categories to the right
    function scrollRight() {
        if (scrollRef.current) {
            console.log(scrollRef.current); // Debugging log to check the element reference
            scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
        }
    }

    const username = localStorage.getItem("username");
    const firstName = username.split(" ")[0];

    useEffect(() => {
        localStorage.getItem("username");
    }, []);

    return (
        <div className="w-full h-20 flex flex-col fixed top-0 justify-center items-center">

            {/* Header Section */}
            <div className={"h-[65%] w-full flex justify-between items-center "+
            "relative pl-10 pr-10 bg-white"}>

                {/* Brand Name */}
                <div className="text-xl font-mono font-semibold h-auto tracking-wider">
                    TestyBite.
                </div>

                {/* Search Bar */}
                <div className="w-[30%] h-[65%] relative">
                    <input
                        placeholder="Search any product"
                        className="border-1 border-black pl-2 placeholder:text-sm placeholder:text-gray-800 h-full w-full placeholder:tracking-wider text-lg tracking-wide font-mono pb-1"
                    />
                    <button className="absolute top-0 right-0 w-[12%] h-full flex items-center justify-center text-xl text-white bg-black">
                        <IoSearch />
                    </button>
                </div>

                {/* Login and Cart Section */}
                <div className="cursor-pointer relative"
                     onMouseEnter={() => setIsHovered(true)}   // Set hover state to true when mouse enters the container
                     onMouseLeave={() => setIsHovered(false)} // Set hover state to false when mouse leaves the container
                >
                        <button className={"cursor-pointer"}>
                            <FaUser className="text-xl" /></button>

                    {isHovered && (
                        <div className={"absolute bg-black text-white font-mono z-50 w-50 flex flex-col "+
                        "pt-3 pb-3 h-44 right-[30%] rounded-sm"}>
                            <div className={"h-9 flex items-center pl-3"}>Hi, {firstName}</div>
                            <button className={"h-9 flex items-center pl-3 hover:bg-gray-800 active:bg-black cursor-pointer"}
                            onClick={()=>{navigate("/cart")}}>Cart</button>
                            <button className={"h-9 flex items-center pl-3 hover:bg-gray-800 active:bg-black cursor-pointer"}
                            onClick={()=>{navigate("/orders")}}>Orders</button>
                            <button className={"h-9 flex items-center pl-3 hover:bg-gray-800 active:bg-black cursor-pointer"}
                            onClick={()=>{handleLogout()}}>Logout</button>
                        </div>
                    )}
                </div>

            </div>

            <div className={"h-[35%] relative w-full"}>

            {/* Horizontal Scrollable Categories */}
            <div ref={scrollRef} className="h-full bg-black w-full text-white flex items-center overflow-x-auto
            whitespace-nowrap custom-scrollbar relative font-mono">



                {/* Food Category Items */}
                <div className="shrink-0 w-[10%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Pure Veg</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Non-Veg</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Chinese</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Italian</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Coffee</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Biriyani</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Rolls</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Thalis</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Kabap</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Desserts</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">South Indian</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Cake</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Salad</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Ice Cream</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Fish</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Chicken</div>
                <div className="shrink-0 w-[8%] h-full border-r border-gray-500 flex justify-center items-center text-sm">Snacks</div>
            </div>

            {/* Left Scroll Button */}
            <button onClick={scrollLeft} className="left-0 top-0 text-white text-2xl absolute h-full w-[2%] bg-black flex items-center justify-center">
                <FaAngleLeft />
            </button>

            {/* Right Scroll Button */}
            <button onClick={scrollRight} className="right-0 top-0 text-white text-2xl absolute h-full w-[2%] bg-black flex items-center justify-center">
                <FaAngleRight />
            </button>
            </div>
        </div>
    );
}

export default Header;
