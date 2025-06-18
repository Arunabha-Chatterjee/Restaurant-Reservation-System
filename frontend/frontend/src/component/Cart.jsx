import React, {useEffect, useState} from 'react';
import {toast} from "react-hot-toast";
import {useForm} from "react-hook-form";
import axios from "axios";
import { MdDateRange } from "react-icons/md";
import {useNavigate} from "react-router-dom";
import { FaLock } from "react-icons/fa";

const token = localStorage.getItem("token");

function Cart(props) {

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const [slotByDate, setSlotByDate] = useState([]);
    const [slots, setSlots] = useState([]);
    const [totalPersons, setTotalPersons] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState(null);  // To track the selected slot
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    async function getCartItems() {
        try {
            const response = await axios.get('http://localhost:8080/getCart',{
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            setCartItems(response.data)
            setQuantity(cartItems.length)
            toast.success("Cart items fetch successfully.");
        }catch (error){
            toast.error("Error fetching cart:", error.response.data);
        }
    }

    async function getTotalPrice() {
        try {
            const response = await axios.get('http://localhost:8080/getTotalPrice',{
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            setTotalPrice(response.data)
            console.log(response.data);
            toast.success("Total price fetched successfully.");
        }catch (error){
            toast.error("Error fetching total price");
        }
    }

    useEffect(() => {
        getCartItems()
        getTotalPrice();
        getAllSlots();
    }, []);

    async function getSlotsByDate(date) {
        const response = await axios.get(`http://localhost:8080/slot-by-date?date=${date}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setSlotByDate(response.data);
        console.log(response.data);
    }

    async function getAllSlots() {
        const response = await axios.get(`http://localhost:8080/get-all-table`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setSlots(response.data);
        console.log(response.data);
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    async function placeOrder() {
        if (!selectedSlot) {
            toast.error("Choose a slot");
        } else if (totalPersons <= 0) {
            toast.error("Enter number of persons");
        } else if (totalPersons > selectedSlot.capacity) {
            toast.error("Number of persons greater than capacity");
        }

        // proceed with order
        else {
            const bookingDetails={
                date: selectedSlot.date,
                time: selectedSlot.time,
                numberOfPeople: totalPersons
            }

            try {
                await axios.post('http://localhost:8080/checkout', bookingDetails,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                toast.success("Order placed successfully.");
                navigate("/orders")
            }catch (error){
                toast.error("Error fetching booking details");
            }
        }
    }

    return (
        <div className={"w-full font-mono"}>
            <div className={"fixed top-0 text-2xl font-mono w-full bg-white h-10" +
                " flex justify-between items-center border-b-1 border-gray-200 font-bold pl-10 pr-10"}>
                <button className="text-xl font-mono font-semibold h-auto tracking-wider cursor-pointer"
                onClick={()=>navigate("/home")}>
                    TestyBite.
                </button>
                <div>Cart({cartItems.length})</div>
                <div className={"text-gray-600"}><FaLock /></div>
            </div>


            {cartItems.length > 0 &&
                <div className={"pl-5 w-[57%] flex flex-col gap-5 mt-14 mb-8"}>

                    {/*for each product*/}
                    {cartItems.map((cartItem) => (
                        <div className={"w-[100%] h-36 border border-gray-300 shrink-0 flex justify-between"}
                        key={cartItem.id}>
                            {/*for image*/}
                            <div className={"w-[26%] h-full flex justify-center items-center"}>
                                <img className={"h-[75%]"} src={`http://localhost:8080/image/${cartItem.product.id}`}/>
                            </div>

                            <div className={"w-[74%] h-full flex flex-col justify-around bg-gray-100 pl-4"}>
                                <div className={"font-bold"}>{cartItem.product.name}</div>

                                <div className={"text-sm"}>{cartItem.product.description}
                                </div>
                                <div className={"w-full flex"}>
                                    <div className={"w-[35%] font-bold"}>Price: &#8377;{cartItem.product.price}</div>
                                    <div className={"w-[65%]"}>Quantity: {cartItem.quantity}</div>
                                </div>
                            </div>
                        </div>))}
                </div>}


            {cartItems.length > 0 && <div className={"fixed right-5 top-15 " +
                "w-[40%] h-100 pl-3 pt-2"}>
                <div className={"font-bold text-2xl"}>Order Details</div>

                {/*book table*/}
                <div className={"flex justify-between h-48 flex-col w-full pr-6 mt-6 border-b border-t " +
                    "border-gray-300 pt-2 pb-4"}>

                    <div className={"text-xl font-bold"}>Book Table</div>
                    <div className={"flex w-full h-9 mt-4 items-center justify-between"}>

                        <div className={"flex h-full w-[33%] justify-between items-center"}>
                            <span className={"text-3xl"}><MdDateRange/></span>

                            <select className={"h-full w-[78%] border-b-2"} onChange={(e) => {
                                getSlotsByDate(e.target.value)
                            }}>
                                <option disabled selected>Choose Date</option>
                                {Array.from(new Set(slots.map(item => new Date(item.date).toISOString().split('T')[0])))  // Convert dates to unique values
                                    .filter(date => new Date(date) >= today) // Filter dates that are today or in the future
                                    .map((date) => (
                                        <option key={date} value={date}>{date}</option>
                                    ))}
                            </select>
                        </div>

                        <div className={"w-[33%] h-full flex justify-between items-center"}>
                            <div className={"font-bold "}>Person:</div>
                            <input type={"number"} onChange={(e)=>{setTotalPersons(e.target.value)}}
                                   className={"border-b-4 border-b-black w-[65%] h-full bg-gray-100 pl-2 text-lg pt-1"}/>
                        </div>
                    </div>

                    <div
                        className={"w-98% h-20 mt-4 overflow-x-auto flex items-center rounded-sm gap-3"}>
                        {
                            slotByDate.map((slot) => (
                                <div
                                    key={slot.id} // Make sure to use a unique key for each item
                                    className={`h-[75%] w-40 flex justify-center pl-2 flex-col rounded-sm cursor-pointer
                    ${selectedSlot && selectedSlot.id === slot.id ? 'border-3 border-blue-500' : 'border-3 border-gray-300'} // Border color change
                    ${slot.capacity === 0 ? 'opacity-90 cursor-not-allowed' : ''}`} // Disabled slot if capacity is 0
                                    onClick={() => {
                                        if (slot.capacity > 0) {  // Only allow selection if capacity > 0
                                            setSelectedSlot(slot); // Set selected slot when clicked
                                            console.log(slot)
                                        }
                                    }}
                                >
                                    <div className={"font-bold"}>{slot.time}</div>
                                    <div
                                        className={`font-bold ${slot.capacity === 0 ? 'text-red-500' : 'text-green-700'}`}>
                                        AVAILABLE-{slot.capacity}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>


                <div className={"mt-3 border-b border-gray-300 flex flex-col justify-between h-45 pb-4"}>
                    <div className={"text-xl font-bold"}>Order Summery</div>
                    <div className={"font-bold"}>Booking Date: {selectedSlot?.date ? selectedSlot.date : ''}</div>
                    <div className={"font-bold"}>Booking Time: {selectedSlot?.time ? selectedSlot.time : ''}</div>
                    <div className={"font-bold"}>Total Person: {totalPersons !== null ? totalPersons : 0}</div>
                    <div className={"font-bold"}>Price: &#8377;{totalPrice}</div>
                </div>

                <div className={"text-xl font-bold border-b border-gray-300 " +
                    "h-9 flex justify-center flex-col"}>Grand Total: &#8377;{totalPrice}</div>


                <button className={"mt-5 w-full h-10 flex justify-center items-center font-bold text-white rounded-sm "+
    "bg-black hover:bg-gray-800 active:bg-black cursor-pointer"}
                         onClick={placeOrder}>Place Order</button>
            </div>}

            {cartItems.length === 0 && (
                <div className="w-full h-screen flex justify-center items-center text-4xl text-2xl">
                     No Items in cart
                </div>
            )}

        </div>
    );
}

export default Cart;