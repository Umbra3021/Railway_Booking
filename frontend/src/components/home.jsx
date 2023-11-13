import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Home() {
  var islogged;
  const nav = useNavigate();
  const [modal, setmodal] = useState(false);
  const Show = () => {
    return (
      <div className="modal">
        <div className="modal-wrapper">
          <button className="modalbtn" onClick={() => nav("/")}>
            Register
          </button>
          <span>OR</span>
          <button className="modalbtn" onClick={() => nav("/login")}>
            Login
          </button>
        </div>
      </div>
    );
  };

  const [value, setValue] = useState({
    to: "",
    from: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const check = async () => {
    if (!localStorage.getItem("User")) {
      setmodal(true);
      islogged = 0;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    check();
    if (islogged !== 0) {
      const { to, from } = value;
      const { data } = await axios.post("http://localhost:5000/form", {
        to,
        from,
      });
      if (data.status === true) {
        nav("/results");
      } else {
        window.alert("No Trains");
      }
    }
  };

  return (
    <Container>
      <div className="main-container">
        <h1>TCKT</h1>
        <h2>A faster Solution to your booking problems</h2>
        {modal && <Show />}
        <form>
          <div className="lala">
            <p>To : </p>
            <input
              type="text"
              name="to"
              id="to"
              placeholder="Enter your destination"
              onChange={handleChange}
            />
          </div>
          <div className="lala">
            <p>From : </p>
            <input
              type="text"
              name="from"
              id="from"
              placeholder="Enter your current location"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn" onClick={submit}>
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #131324;

  h1 {
    color: red;
    text-shadow: 2px 2px 2px white;
    margin: 1rem 2rem;
    margin-bottom: 0.5rem;
  }
  h2 {
    color: white;
    text-shadow: 2px 2px 2px black;
    margin: 2rem 2rem;
    margin-bottom: 5rem;
  }
  .lala {
    p {
      color: white;
      text-shadow: 2px 2px 2px grey;
    }
    input {
      background-color: white;
      padding: 1rem;
      border: 1rem solid;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid red;
      }
    }
  }
`;

export default Home;
