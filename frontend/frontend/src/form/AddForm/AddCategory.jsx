import React from 'react';
import ReusableForm from '../ReusableForm';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddCategory = ({ showForm, setShowForm, refetchData }) => {
    const token = localStorage.getItem("token");

    async function onSubmit(data, reset) {
        try {
            await axios.post("http://localhost:8080/admin/addCategory", data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            reset()
            toast.success("Categroy added Suceessfully")
            refetchData();
            setShowForm();
        } catch (error) {
            const msg = error?.response?.data || "Error in add Category";
            toast.error(msg);
        }
    }

    const fileds = [
        { label: "Name", name: "name", type: "text", placeholder: "Name", errorMsg: "Name is required" }
    ]

    return <> {showForm && <ReusableForm list={fileds} buttonType={"Add"} title={"Add Category"} onSubmit={onSubmit}
        onClose={() => setShowForm(false)} />}</>
};

export default AddCategory;