import React, {useEffect, useState} from 'react';
import {FaChevronDown, FaChevronUp, FaPlus} from 'react-icons/fa';
import {FaMinus} from "react-icons/fa6";
import axios from "axios";
import {toast} from "react-hot-toast";
import AdminSidebar from "./AdminSidebar.jsx";
function AllOrders() {
    const [orders, setOrders] = useState([]);

    async function getOrders() {
        const token = localStorage.getItem("token");
        try{
            const response = await axios.get('http://localhost:8080/allOrders',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setOrders(response.data);
            toast.success("Orders added successfully");
        }catch (error) {
            toast.error(error.response.data || "Error in getting orders");
        }
    }

    async function updateOrderStatus(id, status) {
        const token = localStorage.getItem("token");
        try {
            await axios.put(
                `http://localhost:8080/update-order/${id}?status=${status}`,
                {}, // empty body because backend expects nothing in body
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            toast.success("Order status updated successfully");
            getOrders();
        } catch (error) {
            toast.error(error.response?.data || "Error updating order");
        }
    }

    useEffect(() => {
       getOrders();
    }, []);

    return (
        <div className={"flex w-screen h-screen pr-5 justify-between"}>

            <div className={"w-[19%] h-full shrink-0 mr-3"}>
                <AdminSidebar />
            </div>

            <div className={"w-[80%] shrink-0"}>
            {orders.map((order) => (
                <div className={"w-full flex flex-col items-center mt-5 mb-12 font-mono shrink-0"}
                key={order.id}>
                    <details
                        className={"flex justify-between w-full group flex-col"}>

                        <summary className={"flex justify-between h-13.5 cursor-pointer  items-center"}>
                            <table className={"w-full h-full"}>
                                <thead className={"bg-black text-white text-sm font-bold"}>
                                <tr>
                                    <td className={"border border-black  pl-2"}>ID</td>
                                    <td className={"border border-black  pl-2"}>Order Date & Time</td>
                                    <td className={"border border-black  pl-2"}>Book Date</td>
                                    <td className={"border border-black  pl-2"}>Book Time</td>
                                    <td className={"border border-black  pl-2"}>Persons</td>
                                    <td className={"border border-black  pl-2"}>Total Amount</td>
                                    <td className={"border border-black  pl-2"}>Change Status</td>
                                </tr>
                                </thead>

                                <tbody className={"bg-gray-200"}>
                                <tr>
                                    <td className={"border border-black  pl-2"}>{order.id}</td>

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

                                    <td className={"border border-black  pl-2"}>
                                        <select className={"outline-none cursor-pointer"} value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                                            <option value={"Placed"}>Placed</option>
                                            <option value={"Accepted"}>Accepted</option>
                                            <option value={"Rejected"}>Rejected</option>
                                            <option value={"Preparing"}>Preparing</option>
                                            <option value={"Delivered"}>Delivered</option>
                                        </select>
                                    </td>
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
                                    <tr key={item.id}>
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
        </div>
    );
}

export default AllOrders;
