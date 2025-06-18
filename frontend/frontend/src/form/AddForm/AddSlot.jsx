import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import ReusableForm from '../ReusableForm';

const AddSlot = ({ showForm, setShowForm, refetchData}) => {
    const token = localStorage.getItem("token");

    async function onSubmit(data, reset) {
        try {
            await axios.post("http://localhost:8080/admin/add-table", data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            reset();
            setShowForm(false); 
            toast.success("Slot add Suceesfully");
            refetchData();
            setShowForm(false);
        } catch (error) {
            const msg = error?.response?.data || "Error in add slot";
            toast.error(msg)
        }
    }

    const fields = [
        { label: "Date", name: "date", type: "date", placeholder: "Date", errorMsg: "Date is Required" },
        { label: "Time", name: "time", type: "time", placeholder: "Time", errorMsg: "Time is Required" },
        { label: "Capacity", name: "capacity", placeholder: "Capacity", type: "number", errorMsg: "Capacity is Required" }
    ]

    return <> {showForm && <ReusableForm list={fields} buttonType={"Add"} title={"Add Slot"} onSubmit={onSubmit} onClose={() => setShowForm(false)}/>} </>
};

export default AddSlot;