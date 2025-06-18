import React, { useState } from 'react';
import AdminSidebar from "./AdminSidebar.jsx";
import { useForm } from "react-hook-form";
import AddSlot from '../form/AddForm/AddSlot.jsx';
import { MdDelete } from "react-icons/md";

function AdminLayout({ tableData, tableHead, tableKeys, title,
    description, FormComponent, rowHeight, buttonName, refetchData, deleteData }) {

    const [showForm, setShowForm] = useState(false);

    return (
        <div className={"flex w-screen h-screen justify-between font-mono box-border"}>

            <FormComponent showForm={showForm} setShowForm={setShowForm} refetchData={refetchData} />
            <div className={"w-[19%] h-full shrink-0"}>
                <AdminSidebar />
            </div>

            <div className={"w-[81%] shrink-0 h-full"}>

                <div className={"h-[15%] flex items-center justify-between pr-3 pl-5 pb-4 pt-3"}>
                    <div className={"h-full flex flex-col justify-evenly"}>
                        <div className={"font-bold text-lg tracking-wider"}>
                            {title}
                        </div>

                        <div className={"text-sm font-medium tracking-wide text-gray-600"}>
                            {description}
                        </div>
                    </div>

                    <div className={"h-full flex items-center"}>
                        <button className={"bg-black text-white w-full " +
                            "h-[45%] hover:bg-gray-800 active:bg-black rounded-sm cursor-pointer pl-3 pr-3"}
                            onClick={() => setShowForm(true)}>{buttonName}</button>
                    </div>

                </div>

                <div className="h-[82%] overflow-auto">

                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr className="sticky top-0 h-10 border-b border-gray-50 bg-white z-10 shadow-sm">
                                <th
                                    className='w-10 border-r border-gray-200'>#</th>
                                {tableHead.map((item, index) => (
                                    <th key={index}
                                        className='text-left pl-2 border-r border-gray-200'>{item}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {tableData.map((item, rowIndex) => (
                                <tr key={rowIndex} className={`w-full relative group border-b border-gray-200 text-center ${rowHeight}`}>

                                    <td>{rowIndex + 1}</td>
                                    {tableKeys.map((key, index) => (
                                        <td className={`text-left pl-2 border border-gray-200`}
                                        key={index}>
                                            {key === "image" ? (
                                                <img
                                                    src={`http://localhost:8080/image/${item.id}`}
                                                    alt="product"
                                                    className="h-10 w-10 object-cover mx-auto rounded"
                                                />
                                            ) : (
                                                item[key]
                                            )}
                                        </td>
                                    ))}

                                    <td className="absolute top-0 right-0 opacity-0 group-hover:opacity-75 bg-gray-300 text-xl 
                                    h-full w-full flex items-center justify-end pr-5">
                                        <button className='text-black text-2xl hover:text-red-600 cursor-pointer'
                                        onClick={()=>deleteData(item.id)}>
                                            <MdDelete/>
                                        </button>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default AdminLayout;