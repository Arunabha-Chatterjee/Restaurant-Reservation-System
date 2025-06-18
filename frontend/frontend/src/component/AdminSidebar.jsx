import React, { use, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

const username = localStorage.getItem('username');

function AdminSidebar(props) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (

        <div className={"w-full h-full box-border font-mono border border-gray-200 rounded-lg " +
            "flex flex-col justify-between"}>

            <div className={"w-full h-[50%] flex flex-col "}>
                <div className={`text-xl font-bold h-[15%] flex items-center pl-2 
                    text-black`}>
                    TestyBite.
                </div>

                <div className={"h-[70%] flex flex-col w-[95%] gap-3 mt-2"}>
                    <NavLink to={"/all-orders"}
                        className={({ isActive }) =>
                        (isActive
                            ? "h-[20%] font-bold flex items-center pl-3 bg-gray-100 text-indigo-600 rounded-lg"
                            : "h-[20%] font-bold flex items-center pl-3 hover:bg-gray-100 hover:text-indigo-600 hover:rounded-lg")}>
                        <span className='text-xl pr-3'><FaBagShopping /></span>Orders
                    </NavLink>

                    <NavLink to={"/admin/product"}
                        className={({ isActive }) =>
                        (isActive
                            ? "h-[20%] font-bold flex items-center pl-3 bg-gray-100 text-indigo-600 rounded-lg"
                            : "h-[20%] font-bold flex items-center pl-3 hover:bg-gray-100 hover:text-indigo-600 hover:rounded-lg")}>
                        <span className='text-xl pr-3'><FaProductHunt /></span>Products
                    </NavLink>

                    <NavLink to={"/admin/slot"}
                        className={({ isActive }) =>
                        (isActive
                            ? "h-[20%] font-bold flex items-center pl-3 bg-gray-100 text-indigo-600 rounded-lg"
                            : "h-[20%] font-bold flex items-center pl-3 hover:bg-gray-100 hover:text-indigo-600 hover:rounded-lg")}>
                        <span className='text-lg pr-3'><FaCalendar /></span>Slots
                    </NavLink>

                    <NavLink to={"/admin/users"}
                        className={({ isActive }) =>
                        (isActive
                            ? "h-[20%] font-bold flex items-center pl-3 bg-gray-100 text-indigo-600 rounded-lg"
                            : "h-[20%] font-bold flex items-center pl-3 hover:bg-gray-100 hover:text-indigo-600 hover:rounded-lg")}>
                        <span className='text-lg pr-3'><FaUser /></span>Users
                    </NavLink>

                    <NavLink to={"/admin/category"}
                        className={({ isActive }) =>
                        (isActive
                            ? "h-[20%] font-bold flex items-center pl-3 bg-gray-100 text-indigo-600 rounded-lg"
                            : "h-[20%] font-bold flex items-center pl-3 hover:bg-gray-100 hover:text-indigo-600 hover:rounded-lg")}>
                        <span className='text-xl pr-3'><BiSolidCategory /></span>Categories
                    </NavLink>

                </div>
            </div>

            <div className={"h-[7%] w-[98%] flex items-center pl-3 tracking-wide font-bold " +
                "flex items-center justify-between pr-4"}>
                {username}
                <button className={"text-xl hover:text-indigo-600 cursor-pointer"}
                    onClick={handleLogout}><MdLogout /></button>

            </div>
        </div>
    );
}

export default AdminSidebar;