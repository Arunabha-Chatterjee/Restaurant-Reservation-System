import React, { useEffect, useState } from 'react';
import ReusableForm from '../ReusableForm';
import axios from 'axios';
import { data } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddProduct = ({ showForm, setShowForm, refetchData }) => {
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState([]);

  async function fetchCategory() {
    try {
      const response = await axios.get("http://localhost:8080/admin/getAllCategory", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      setCategory(response.data);
      console.log(response.data);
    } catch (error) {
      const msg = error?.response?.data || "Error in fetch category";
      toast.error(msg)
    }
  }

  useEffect(() => {
    fetchCategory();
  }, [])

  async function onsubmit(data, reset) {
    const product = {
      name: data.name,
      price: data.price,
      description: data.description,
      category: { id: Number(data.category)},
      keyword: data.keyword
    }

    const formData = new FormData();
    // Append product JSON string with key "product"
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    
    formData.append("image", data.image[0]); // add image in formdata

    try {
      await axios.post("http://localhost:8080/admin/add-product", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      reset();
      toast.success("Product added Succsfully")
      refetchData();
      setShowForm(false);
    } catch (error) {
      const msg = error?.response?.data || "Error in add product";
      toast.error(msg);
    }
  }


  const fields = [
    { label: "Name", name: "name", type: "text", placeholder: "Name", errorMsg: "Name is required" },
    { label: "Price", name: "price", type: "number", placeholder: "Price", errorMsg: "Price is required" },
    { label: "Category", name: "category", type: "select", errorMsg: "Category is required" },
    { label: "Keyword", name: "keyword", type: "text", placeholder: "keyword", errorMsg: "At least one keyword is required" },
    { label: "Description", name: "description", type: "textarea", placeholder: "description", errorMsg: "Description is required" },
    { label: "Image", name: "image", type: "file", errorMsg: "Upload one image" }

  ]
  return <>{showForm && <ReusableForm list={fields} buttonType={"Add"} title={"Add Product"} onSubmit={onsubmit} 
  option={category} onClose={() => setShowForm(false)} />}</>
};

export default AddProduct;