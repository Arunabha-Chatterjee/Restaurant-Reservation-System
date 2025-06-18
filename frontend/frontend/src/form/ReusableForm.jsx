import React, { useState } from 'react';
import { RiCloseLargeLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Category from '../component/Category';

const ReusableForm = ({ list, buttonType, title, onSubmit, option, onClose, modify }) => {
    const { register, handleSubmit, watch,
        reset,
        formState: { errors } } = useForm();
    
    if (modify!=null) {
        
    }


    return (
        <div className='h-screen w-screen font-mono box-border font-bold z-20'>
            <div className='fixed bottom-0 right-6 border w-[30%] flex flex-col items-center bg-white
                            border-gray-400 rounded-t-sm'>

                {/* from header */}
                <div className='bg-slate-100 h-9 w-full flex justify-between items-center mb-3 rounded-t-sm'>
                    <div className='pl-2'>
                        {title}
                    </div>
                    <button className='pr-2 text-lg flex justify-center items-center hover:bg-red-500 active:bg-red-600 
                    h-full w-10 cursor-pointer'
                    onClick={onClose}>
                        <RiCloseLargeLine />
                    </button>
                </div>


                <div className='w-[96%]'>

                    {/* form body */}
                    <form className='w-full text-sm ' onSubmit={handleSubmit((data) => onSubmit(data, reset))}>

                        {list.map((item, index) => (

                            <div key={index} className='w-full mb-1'>
                                <label className=' block h-6 w-full pl-1 text-sm'>
                                    {item.label}
                                </label>

                                {item.type === "text" ? (
                                    <input
                                        className='w-full h-10 rounded-sm border border-gray-300 pl-2 tracking-wider'
                                        type='text'
                                        placeholder={item.placeholder}
                                        {...register(item.name, { required: item.errorMsg })} />)

                                    : item.type === "textarea" ? (
                                        <textarea
                                            className='w-full h-20 pl-2 pt-1 rounded-sm border border-gray-300 mb-0'
                                            placeholder={item.placeholder}
                                            {...register(item.name, { required: item.errorMsg })} />)

                                        : item.type === "select" ? (
                                            <select className='w-full h-10 rounded-sm border border-gray-300 pl-2'
                                                defaultValue={""}
                                                {...register(item.name, { required: item.errorMsg })}>
                                                <option value={""} disabled>
                                                    Select an Option
                                                </option>
                                                {option.map((cat, index) => (
                                                    <option key={index} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>)

                                            : item.type === "file" ? (
                                                <input className='w-full pt-2 pl-2 h-10 rounded-sm border border-gray-300 
                                                                  file:pr-5 cursor-pointer file:cursor-pointer file:font-bold font-normal'
                                                    type='file'
                                                    {...register(item.name, { required: item.errorMsg })} />)

                                                : item.type === "number" ? (
                                                    <input className='w-full h-10 rounded-sm border border-gray-300 pl-2 tracking-wider'
                                                        placeholder={item.placeholder}
                                                        type='number'
                                                        {...register(item.name, { required: item.errorMsg })} />)

                                                : item.type === "date" ? (
                                                    <input className='w-full h-10 rounded-sm border border-gray-300 pl-2 tracking-wider pr-3'
                                                    type='date'
                                                    {...register(item.name, { required: item.errorMsg })}/>
                                                )

                                                : item.type === "time" ? (
                                                    <input className='w-full h-10 rounded-sm border border-gray-300 pl-2 tracking-wider pr-3'
                                                    type='time'
                                                    {...register(item.name, { required: item.errorMsg })}/>
                                                )
                                                
                                                :null}

                                <div className=' h-4 text-xs text-red-500 pl-1 font-normal'>
                                    {errors[item.name] && <span>{errors[item.name]?.message}</span>}
                                </div>
                            </div>
                        ))}

                        {/* form button */}
                        <div className='h-8 w-full flex justify-between mt-4'>
                            <button className='bg-black text-white w-[49%] 
                            h-full rounded-t-sm hover:bg-gray-800 active:bg-black cursor-pointer'
                                type='reset'>Reset</button>
                            <button className='bg-indigo-700 text-white w-[49%] 
                            h-full rounded-t-sm hover:bg-indigo-800 active:bg-indigo-700 cursor-pointer'>{buttonType}</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};
export default ReusableForm;