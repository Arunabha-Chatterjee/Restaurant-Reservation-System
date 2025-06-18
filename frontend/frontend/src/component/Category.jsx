import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';
import axios from 'axios';
import AddCategory from '../form/AddForm/AddCategory';

const Category = () => {
    const token = localStorage.getItem("token");
    const [tableData, setTableData] = useState([]);

    async function fetchAllData() {
        try {
            const response = await axios.get("http://localhost:8080/admin/getAllCategory",
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
            await axios.delete(`http://localhost:8080/admin/delete-category/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            fetchAllData(); // Refetch updated list if you have this function
            toast.success("Delete Category successfully")
        } catch (error) {
            toast.error("Error in deleting" +error);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [])

    const tableHead = [
        "Name",
    ]


    const tableKeys = [
        "name",
    ];

    return (
        <>
            <AdminLayout tableData={tableData}
                tableHead={tableHead}
                tableKeys={tableKeys}
                title="Category Managment"
                description="All categories are listed here you can manage them."
                rowHeight="h-10"
                buttonName="Add Category"
                FormComponent={AddCategory}
                refetchData={fetchAllData} 
                deleteData={handleDelete}/>
        </>
    );
};

export default Category;