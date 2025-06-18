import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from './AdminLayout';
import AddSlot from '../form/AddForm/AddSlot';

const Slot = () => {
    const token = localStorage.getItem("token");
    const [tableData, setTableData] = useState([]);

    const tableHead = [
        "Date",
        "Time",
        "Capacity"
    ]

    const tableKeys = [
        "date",
        "time",
        "capacity"];

    async function fetchAllData() {
        try {
            const response = await axios.get("http://localhost:8080/get-all-table",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

            setTableData(response.data)
            toast.success("All Slots Fetched Successfully")
        } catch (error) {
            toast.error("Error in fetch data")
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/admin/delete-table/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            fetchAllData(); // Refetch updated list if you have this function
            toast.success("Delete Category successfully")
        } catch (error) {
            toast.error("Error in deleting" + error);
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
                title="Slot Managment"
                description="All slots are listed here you can manage them."
                buttonName="Add Slot"
                FormComponent={AddSlot}
                rowHeight="h-10"
                refetchData={fetchAllData}
                deleteData={handleDelete} />
        </>
    );
};

export default Slot;