import { useState } from "react";
import { styled } from "styled-components";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";


function Login() {
    const nav = useNavigate();
    const [value,setValue] =useState({
        username:"",password:""
    });

    const error ={
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"    
    }

    const validation = ()=>{
        const {username,password} =value;
        if(username==="" || password===""){
            toast.error("Please Fill details",error);
            return false;
        }
        else{
            return true;
        }
    }
    
    const handleChange = (e) =>{
        setValue({...value,[e.target.name]:e.target.value})
    }

    const Submit = async (e)=>{
        e.preventDefault();
        if(validation()){
            const {username,password} = value;
            const {data} =await axios.post("http://localhost:5000/login",{
                username,
                password
            });
            if(data.status===true){
                nav("/search");
            }
            if(data.status===false){
                console.log("nope");
            }

        }   
        
        

    }

    return(
        <div>
        <Container>
             <h2>TCKT</h2>
            <div className="container2">
                <form>
                    <h3>Welcome Back!</h3>
                    <input 
                    type="text"
                    placeholder="Username"
                    name="username"
                    autoComplete="off"
                    onChange={handleChange}
                    />

                    <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    onChange={handleChange}
                    />

                    <button type="submit" onClick={Submit}>Log In</button>
                    <span>Dont have an <Link to="/register">Account?</Link></span>
                    <span>Forgot UserName</span>
                </form>
            </div>
        </Container>
        <ToastContainer />
        </div>
    )
}

const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:3rem;
align-items:center;
background-color:#131324;
h2{
    color:red;
    font-size:4rem;
}
.container2{
    height:50vh;
    width:50vw;
    display:flex;
    flex-direction:row;
    justify-content:center;
    gap:3rem;
    align-items:center;
    border-radius:3rem;
    img{
        border-radius:2rem;
        object-fit:fill;
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#00000076;
        padding:3rem 5rem;
        border-radius:1rem;
        align-items:center;
        justify-content:center;
        h3{
            color:white;
        }
        input{
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border:0.1rem solid grey;
            }

        }
        button{
            background-color:grey;
            color:white;
            padding:1rem 2rem;
            border:none;
            font-weight:bold;
            border-radius:0.4rem;
            &:hover{
                color:black;
            }
        }
        span{
            color:white;
        }
    }
}
`

export default Login;