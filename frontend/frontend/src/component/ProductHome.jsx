import "../index.css"
import React, {useEffect, useRef, useState} from 'react';
import {FaCaretLeft, FaCaretRight} from "react-icons/fa";
import axios from "axios";
import {toast} from "react-hot-toast";
import category from "./Category.jsx";
import Header from "./Header.jsx";
import {useForm} from "react-hook-form";

const ProductHome = () => {

    const { register,
        handleSubmit,
        watch,
        reset,
        formState: { errors } } = useForm();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);
    const [quantities, setQuantities] = useState({});

    const token = localStorage.getItem("token");

    const scrollRef = useRef(null);

    function scroll(direction) {
        scrollRef.current.scrollBy({
            left: direction === "left" ? -300 : 300,
            behavior: "smooth"
        });
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/getAllCategory', {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const addToCart = async (productId) => {
        const quantity = quantities[productId] || 1;

        try {
            await axios.post("http://localhost:8080/addCart", {
                id: productId,
                quantity: quantity
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            toast.success("Added to cart!");
        } catch (error) {
            toast.error("Failed to add to cart");
        }
    };;

    const fetchProductsByCategory = async (id) => {
        try{
            const response = await axios.get(`http://localhost:8080//by-category/products/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            setProduct(response.data);
        }catch (error){
            toast.error("Error in fetching products");
        }
    }




    const fetchProducts = async (id) => {
        try {
            const response = await axios.get("http://localhost:8080/allProducts", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setProducts(response.data);
            toast.success("Products fetched successfully.");
        } catch (error) {
            toast.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);


    return (
        <div className={"m-0 p-0 box-border w-full flex flex-col items-center"}>
            <Header/>


            <div
                className="mt-20 w-full h-52 bg-black border border-t-gray-600 flex justify-center items-center">
                <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-wide">
                    Special Weekend Offer! 10% Off Today!
                </h1>
            </div>


            <div className={"mt-4 grid grid-cols-5 w-full"}>
                {/*product Card*/}
                {products.map((product) =>
                    <div key={product.id}
                         className={"pl-3 pr-3 flex flex-col items-center justify-between " +
                             "shrink-0 border border-gray-200 pt-3"}>

                        <div className={"h-[78%] w-[95%] flex flex-col gap-2.5 items-center"}>

                            {/*product image*/}
                            <div className={"h-[62%] w-full flex justify-center items-center"}>
                                <img className={"h-[98%]"}
                                     src={`http://localhost:8080/image/${product.id}`}/>
                            </div>

                            {/*product name*/}
                            <div className={"w-full h-[20%] font-mono font-bold " +
                                "flex items-center"}>
                                {product.name}
                            </div>

                            {/*product price & quantity*/}
                            <div className={"h-[12%] w-full flex items-center justify-between text-lg pl-0.5 pr-1"}>

                                {/*price*/}
                                <div className={"w-[65%] h-full font-mono font-bold " +
                                    "tracking-wider flex items-center "}>
                                    &#8377;<span>{product.price}</span>
                                </div>

                                {/*quantity*/}
                                <div className={"h-full w-[35%] flex items-center justify-end"}>
                                    <select value={quantities[product.id] || 1}
                                            onChange={(e) =>
                                                setQuantities({...quantities, [product.id]: parseInt(e.target.value)})}
                                            className={"h-full w-[80%] bg-gray-200 pl-1 rounded-sm"}>
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/*Add to cart button*/}
                        <div className={"border-1 border-gray-300 h-[10%] w-[97%] mb-2"}
                             onClick={() => addToCart(product.id)}>
                            <button
                                className={"w-full h-full flex items-center justify-center text-white font-mono " +
                                    "bg-black hover:bg-gray-800 active:bg-black rounded-sm cursor-pointer"}>
                                Add to Cart
                            </button>
                        </div>

                    </div>)}

            </div>

            {/*footer*/}
            <div
                className={"w-full h-52 bg-black border-t border-gray-600 flex justify-between pl-[5%] "+
                "pr-[5%] items-center mt-2 px-6 text-white text-sm font-mono"}>
                {/* About Section */}
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold mb-2">TestyBite.</h1>
                    <p className="max-w-xs text-justify">
                        TestyBite is a user-friendly restaurant reservation system, allowing customers to book tables,
                        pre-order food, view prices, and leave reviews, enhancing dining convenience and satisfaction.
                    </p>
                </div>

                {/* Opening Hours */}
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold mb-2">Opening Hours</h1>
                    Monday-Friday: 08:00-22:00<br/>
                    Tuesday 4PM: Till Midnight<br/>
                    Saturday: 10:00-16:00
                </div>

                {/* Contact Info */}
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold mb-2">Contact Info</h1>
                    <p>+1 (062) 109-9222</p>
                    <p>India, West Bengal</p>
                    <p>700001, Kolkata</p>
                </div>
            </div>


        </div>
    );
};

export default ProductHome;