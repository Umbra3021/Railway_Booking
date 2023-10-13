import { useState } from "react";
import {useNavigate} from "react-router-dom";

function Home(){

  const nav = useNavigate();
  const [modal,setmodal] = useState(false);
  const Show =()=>{
    return(
    <div className="modal">
      <div className="modal-wrapper">
      <button className="modalbtn" onClick={()=> nav("/register")}>Register</button>
      <span>OR</span>
      <button className="modalbtn" onClick={()=> nav("/login")}>Login</button>
      </div>
      
    </div>
    )
  }

  const check = async ()=>{
      if(!localStorage.getItem('User')){
        setmodal(true);
        console.log("hi");
      }
      else{
        console.log("in check");
      }
  }

  const submit = async (e)=>{
    e.preventDefault();
    check();
  }

    return (
        <div className="main-container">
          <h1>TCKT</h1>
          <button onClick={() => setmodal(true)}>A moment please?</button>
          {modal && <Show/>}
          <form className="input-form" action="http://localhost:5000/search" method="Post">
            <div className="lala">
              <p>To : </p>
              <input
                type="text"
                name="to"
                id="to"
                placeholder="Enter your destination" 
              />
            </div>
            <div className="lala">
              <p>From : </p>
              <input
                type="text"
                name="from"
                id="from"
                placeholder="Enter your current location"
              />
            </div>
      
            <button type="submit" className="submit-btn" onClick={submit}>
              Submit
            </button>
          </form>
        </div>
      );

}

export default Home;