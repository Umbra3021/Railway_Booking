import { styled } from "styled-components";
import { useState } from "react";
import pic from "../assests/logo3.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const nav = useNavigate();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handlechange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const error = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const validate = async () => {
    const { username, email, password, confirmpassword } = value;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      toast.error("Please fill details!", error);
      return false;
    }
    if (password.length < 3) {
      toast.error("Password should be greater than 3 in length");
    }
    if (password !== confirmpassword) {
      toast.error("Password Mismatch!", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { username, email, password } = value;
    if (validate()) {
      const { data } = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });
      console.log(data.status);

      if (data.status === false) {
        console.log("failed");
        toast.error("Failed , try again !");
      }
      if (data.status === true) {
        localStorage.setItem("User", JSON.stringify(value));
        nav("/search");
      }
    }
  };

  return (
    <div>
      <Container>
        <h1>TCKT</h1>
        <div className="brand">
          <img src={pic} alt="logo" />
          <form>
            <input
              type="text"
              placeholder="UserName"
              name="username"
              autoComplete="off"
              onChange={handlechange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="off"
              onChange={handlechange}
            />
            <input
              type="password"
              placeholder="Pasword"
              name="password"
              autoComplete="off"
              onChange={handlechange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              autoComplete="off"
              onChange={handlechange}
            />
            <button type="submit" onClick={submitForm}>
              Submit
            </button>
            <span>
              Already Have an <Link to="/login">Account?</Link>
            </span>
          </form>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  align-items: center;
  background-color: #131324;
  h1 {
    color: red;
    font-size: 4rem;
  }
  .brand {
    display: flex;
    flex-direction: row;
    color: white;
    gap: 1rem;
    h1 {
      padding: 0rem 3rem;
      font-size: 50px;
    }
    img {
      border-radius: 1rem;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    padding: 3rem 5rem;
    border-radius: 1rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid grey;
      }
    }
    button {
      background-color: grey;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      border-radius: 0.4rem;
      &:hover {
        color: black;
      }
    }
  }
`;

export default Register;
