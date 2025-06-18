import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaLock, FaPlus } from 'react-icons/fa';
import { FaMinus } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
function UserOrders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    async function getOrders() {
        try {
            const response = await axios.get('http://localhost:8080/userOrders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setOrders(response.data);
            toast.success("Orders added successfully");
        } catch (error) {
            toast.error(error.response.data || "Error in getting orders");
        }
    }

    useEffect(() => {
        getOrders()
    }, []);

    return (
        <div>
            <div className={"fixed top-0 text-2xl font-mono w-full bg-white h-10" +
                " flex justify-between items-center border-b-1 border-gray-200 font-bold pl-10 pr-10"}>
                <button className="text-xl font-mono font-semibold h-auto tracking-wider cursor-pointer"
                    onClick={() => navigate("/home")}>
                    TestyBite.
                </button>
                <div>Orders</div>
                <div className={"text-gray-600"}><FaLock /></div>
            </div>            {orders.map((order, index) => (<div className={"w-full flex flex-col items-center mt-15 mb-12 font-mono"} key={order.id}>                    <details className={"flex justify-between w-[89%] group flex-col"}>                        <summary className={"flex justify-between h-13.5 cursor-pointer  items-center"}>                            <table className={"w-[97%] h-full"}>                                <thead className={"bg-black text-white text-sm font-bold"}>                                <tr>                                    <td className={"border border-black  pl-2"}>#</td>                                    <td className={"border border-black  pl-2"}>Order Date & Time</td>                                    <td className={"border border-black  pl-2"}>Book Date</td>                                    <td className={"border border-black  pl-2"}>Book Time</td>                                    <td className={"border border-black  pl-2"}>Persons</td>                                    <td className={"border border-black  pl-2"}>Total Amount</td>                                    <td className={"border border-black  pl-2"}>Status</td>
            </tr>
            </thead>

                <tbody className={"bg-gray-200"}>
                    <tr>
                        <td className={"border border-black  pl-2"}>{index + 1}</td>

                        <td className={"border border-black pl-2"}>
                            {new Date(order.orderDateTime).toLocaleString('en-GB', {  //this time convert code
                                day: '2-digit', month: 'short', year: 'numeric',                    //is copy from Ai
                                hour: '2-digit', minute: '2-digit', hour12: true
                            })}
                        </td>
                        <td className={"border border-black  pl-2"}>{order.date}</td>
                        <td className={"border border-black  pl-2"}>{order.time}</td>
                        <td className={"border border-black  pl-2"}>{order.totalPerson}</td>
                        <td className={"border border-black  pl-2"}>&#8377;{order.totalPrice}</td>

                        <td className={"border border-black  pl-2 w-[15%]"}>{order.status}</td>
                    </tr>
                </tbody>
            </table>

                {/* Plus/Minus button */}
                <div className="bg-black w-[3%] h-full text-white flex justify-center items-center">
                    <span className="block group-open:hidden">
                        <FaPlus className="font-bold text-xl" />
                    </span>
                    <span className="hidden group-open:block">
                        <FaMinus className="font-bold text-xl" />
                    </span>
                </div>
            </summary>

                <div className="w-full flex justify-between mt-0.5 ">
                    <table className={"w-full"}>
                        <thead className={"bg-black text-white"}>
                            <tr>
                                <td className={"border pl-2"}>Id</td>
                                <td className={"border pl-2"}>Product Name</td>
                                <td className={"border pl-2 w-[22%]"}>Price</td>
                                <td className={"border pl-2"}>Quantity</td>
                            </tr>
                        </thead>

                        <tbody className={"bg-gray-100"}>
                            {order.orderItemDtoList.map((item) => (
                                <tr>
                                    <td className={"border pl-2"}>{item.id}</td>
                                    <td className={"border pl-2"}>{item.product.name}</td>
                                    <td className={"border pl-2"}>&#8377;{item.product.price}</td>
                                    <td className={"border pl-2"}>{item.quantity}</td>
                                </tr>))}

                        </tbody>
                    </table>
                </div>
            </details>
            </div>
            ))}

        </div>
    );
}

export default UserOrders;