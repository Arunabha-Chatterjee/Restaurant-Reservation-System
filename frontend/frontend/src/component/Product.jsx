import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';
import axios from 'axios';
import AddProduct from '../form/AddForm/AddProduct';

const Product = () => {
    const token = localStorage.getItem("token");
    const [tableData, setTableData] = useState([]);

    const tableHead = [
        "Image",
        "Name",
        "Price",
        "Category",
        "Keywords",
        "Description",
    ]


    const tableKeys = [
        "image",
        "name",
        "price",
        "category",
        "keywords",
        "description",
    ];

    async function fetchAllData() {
        try {
            const response = await axios.get("http://localhost:8080/allProducts",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

            setTableData(response.data);
            console.log(response.data);
            toast.success("All Products Fetched Successfully")
        } catch (error) {
            toast.error("Error in fetch data")
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/admin/delete/product/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            fetchAllData(); // Refetch updated list if you have this function
            toast.success("Delete product successfully")
        } catch (error) {
            toast.error("Error in deleting");
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [])

    return (
        <>
            <AdminLayout tableData={tableData}
                tableHead={tableHead}
                tableKeys={tableKeys}
                title="Product Managment"
                description="All products are listed here you can manage them."
                rowHeight="h-20"
                buttonName="Add Product"
                FormComponent={AddProduct}
                refetchData={fetchAllData}
                deleteData={handleDelete} />
        </>
    );
};

export default Product;