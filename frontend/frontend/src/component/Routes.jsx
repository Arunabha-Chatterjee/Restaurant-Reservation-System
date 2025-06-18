// router.jsx
import { createBrowserRouter } from "react-router-dom";

import Register from "./Register.jsx";
import Login from "./Login.jsx";
import ProductHome from "./ProductHome.jsx";
import Cart from "./Cart.jsx";
import TableSlot from "./AdminLayout.jsx";
import AddProduct from "../form/AddForm/AddProduct.jsx";
import AddCategory from "../form/AddForm/AddCategory.jsx";
import Slot from "./Slot.jsx"
import Product from "./Product.jsx";
import Category from "./Category.jsx";
import UserOrders from "./UserOrders.jsx";
import AllOrders from "./AllOrders.jsx";
import Users from "./Users.jsx";

const Routes = createBrowserRouter([
    { path: "/", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/home", element: <ProductHome /> },
    {path:"/cart", element: <Cart /> },
    {path:"/all-orders", element: <AllOrders/> },
    {path:"/orders", element:<UserOrders/>},
    {path:"/check-form", element:<AddProduct/>},
    {path: "/table", element:<TableSlot/>},
    {path: "/add-category", element:<AddCategory/>},
    {path:"/admin/slot", element:<Slot/>},
    {path:"/admin/product", element:<Product/>},
    {path:"admin/category", element:<Category/>},
    {path:"/admin/users", element:<Users/>}

]);

export default Routes;
