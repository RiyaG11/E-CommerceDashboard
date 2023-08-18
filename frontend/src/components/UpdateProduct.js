import React, {  useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const UpdateProduct=()=>{
    const [name, setName] = useState("");
    const[category, setCategory]= useState("");
    const[brand, setBrand]= useState("");
    const[price, setPrice]= useState("");
    const params = useParams();
    const navigate = useNavigate();



  
   
   /* useEffect(()=>{
        const getProductDetails= async()=>{
            console.warn(params)
            let result = await fetch(`http://localhost:3000/products/${params.id}`);
            result = await result.json();
            setName(result.name);
            setCategory(result.category);
            setBrand(result.brand);
            setPrice(result.price);
            console.warn(result)
        } 


        getProductDetails();
    },[params]);*/

    
    const updateData= async ()=>{
        console.warn(name, category, brand, price)
        let result = await fetch(`http://localhost:3000/products/${params.id}`,{
            method:"Put",
            body: JSON.stringify({name,category,brand,price}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        navigate('/')
 

    }
    return(
        <div className='register'>
            <h1>Update Product</h1>
            <input type='text' className='inStyle' placeholder='Enter Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type='text' className='inStyle' placeholder='Enter Category' value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            <input type='text' className='inStyle' placeholder='Enter Brand' value={brand} onChange={(e)=>{setBrand(e.target.value)}}/>
            <input type='text' className='inStyle' placeholder='Enter Price' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            <button className='btn' onClick={updateData}>Update Product</button>

        </div>
    );
}

export default UpdateProduct;