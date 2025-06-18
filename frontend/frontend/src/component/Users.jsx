import axios from 'axios';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';


const Users = () => {
    const EmptyComponent = () => null;
    const [tableData, setTableData] = useState([]);
    const token = localStorage.getItem("token");

    const tableKeys = [
        "name",
        "username",
    ]

    const tableHead = [
        "Name",
        "Username",
    ]

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/all-users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTableData(response.data);
            toast.success("Users fetched successfully");
            console.log(response.data)
        } catch (error) {
            toast.error("Error fetching users"+error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);
    return (
        <>
            <AdminLayout tableData={tableData}
                tableHead={tableHead}
                tableKeys={tableKeys}
                title="All Users"
                description="All slots are listed here"
                buttonName=""
                rowHeight="h-10"
                FormComponent={EmptyComponent}
            /></>
    );
};

export default Users;