import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
const Signup = ()=>{
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[mobile,setMobile]=useState("");

    const navigate=useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate('/')
        }
    })

    const collectData = async ()=>{
        console.warn(name, email, password, mobile);
        let result = await fetch('http://localhost:3000/register',{
            method:"post",
            body: JSON.stringify({name, email, password, mobile}),
            headers:{
                "Content-Type":'application/JSON'
            },
        } )
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/')
        
    }

    return(
        
<div className="register">
            <h1>Register Now</h1>
            <input type="text" className="inStyle" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Username" />
            <input type="text" className="inStyle" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
            <input type="password" className="inStyle" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            <input type="tel" className="inStyle" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Mobile No." />
            <input type="date" className="inStyle" placeholder="Date of Birth" />
            <input type="checkbox" className="checkStyle"/>I Hereby confirm that all the details are correct<br></br>
            <button className="btn" onClick={collectData}>Sign up</button>
            <button className="btn" >Reset</button>


        </div>
    );
}
export default Signup;