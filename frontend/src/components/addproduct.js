import React, { useState } from 'react';
const AddProduct=()=>{
    const [name, setName] = useState("");
    const[category, setCategory]= useState("");
    const[brand, setBrand]= useState("");
    const[price, setPrice]= useState("");

    const UserId =JSON.parse(localStorage.getItem('user'))._id;
    const productData= async ()=>{
        console.warn(name,category,brand,price,UserId)

        let result = await fetch('http://localhost:3000/add',{
            method:"post",
            body:JSON.stringify({name,category,brand,price,UserId}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result=await result.json();
        console.warn(result)


    }
    return(
        <div className='register'>
            <h1>Add Product</h1>
            <input type='text' className='inStyle' placeholder='Enter Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type='text' className='inStyle' placeholder='Enter Category' value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            <input type='text' className='inStyle' placeholder='Enter Brand' value={brand} onChange={(e)=>{setBrand(e.target.value)}}/>
            <input type='text' className='inStyle' placeholder='Enter Price' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            <button className='btn' onClick={productData}>Add Product</button>

        </div>
    );
}

export default AddProduct;