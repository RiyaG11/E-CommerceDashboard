import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch('https://e-commercedashboard-yk94.onrender.com/products');
        result = await result.json();
        setProducts(result);
        //console.warn(result)
    }
    console.warn("products", products)

    const searchHandle = async (event) => {
        const key = event.target.value;

        if (key) {
            let result = await fetch(`http://localhost:3000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }



    const DeleteData = async (id) => {


        let result = await fetch(`http://localhost:3000/products/${id}`, {
            method: "Delete"

        })
        result = await result.json();

        if (result) {

            getProducts();
        }

    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input className="search" type="text" placeholder="Search Product" onChange={searchHandle} />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Category</li>
                <li>Brand</li>
                <li>Price</li>
                <li>Operation</li>

            </ul>
            {
                products.length > 0 ?
                    products.map((item, index) =>
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.category}</li>
                            <li>{item.brand}</li>
                            <li>{item.price}</li>
                            <li><button onClick={() => DeleteData(item._id)} >Delete</button><button><Link to={"/update/" + item._id}>Update</Link></button></li>

                        </ul>
                    )
                    : <h1>No Product Found</h1>
            }
        </div>
    )
}

export default ProductList;