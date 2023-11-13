import axios from "axios";
import { useEffect, useState } from "react";
import {  useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";

export const loader = async () => {
  let resp = await axios.get("http://localhost:5000/search");
  return resp;
};

const Trains = () => {
  const nav = useNavigate();

  const { data } = useLoaderData();
  const [seatsInfo, setSeatsInfo] = useState();

  //function to add which type of seat the customer needs in which train
  async function Add(seat_type, tr) {
    let user_info = JSON.parse(localStorage.getItem("User"));
    setSeatsInfo(seatsInfo => ({seat_type, tr,user_info}));
  }

  useEffect(() => {
  
    if(seatsInfo){
      Submit(seatsInfo)
      nav("/booking_details");
    }
  }, [seatsInfo]);
  // function to submit the customer requirements of seats
  async function Submit(lala) {
    console.log(lala);
    let resp = await axios.post("http://localhost:5000/booking", lala);
    if(resp!==null){
      return 1;
    }
  }

  // rendering the info of each and every availabe type of coach in which seats are available
  const res = data.map((train, index) => {
    return (
        <form key={index}>
          <Wrapper>
            <div className="trains">
              <h1>
                Train Name: {train.TraiName} <br/>Train Number: {train.trainNo}
              </h1>
              <h2>Start: {train.Source}</h2>
              <h2>Destination: {train.Destination}</h2>
              <h2>
                Arrival: {train.ArrivalTime} Departure: {train.DepartureTime}
              </h2>

              <h1>Seats: </h1>

              {train["3AC_Num"] === null ? (
                <></>
              ) : (
                <>
                  <h2>3AC: {train["3AC_Num"]}</h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Add("3AC_Num", train.trainNo);

                    }}
                  >
                    Add
                  </button>
                </>
              )}
              {train["3E_Num"] === null ? (
                <></>
              ) : (
                <>
                  <h2>3E: {train["3E_Num"]}</h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Add("3E_Num", train.trainNo);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
              {train["2AC_Num"] === null ? (
                <></>
              ) : (
                <>
                  <h2>2AC: {train["2AC_Num"]}</h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Add("2AC_Num", train.trainNo);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
              {train["1AC_Num"] === null ? (
                <></>
              ) : (
                <>
                  <h2>1AC: {train["1AC_Num"]}</h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Add("1AC_Num", train.trainNo);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
              {train["AC_CharCar_Num"] === null ? (
                <></>
              ) : (
                <>
                  <h2>AC chair car: {train["AC_CharCar_Num"]}</h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Add("AC_CharCar_Num", train.trainNo);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
              {train["ExechairCar_Num"] === null ? (
                <></>
              ) : (
                <>
                  <h2>Executive Chair car: {train["ExechairCar_Num"]}</h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Add("ExechairCar_Num", train.trainNo);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </Wrapper>
        </form>
    );
  });

  return res
};

const Wrapper = styled.div`
border-color:white;
background-color: #131324;
margin: 3rem 3rem;
  border: 1px solid white;
  border-radius:1rem;
  padding: 2rem 2rem;
  .trains{
    h1,h2,h3,p{
      color:red;
    }
    h1{
      color:white;
      font-size:3rem;
    }
    button{
      height:5rem;
      width:8rem;
      border-radius:1rem;
      border:none;
      font-size:1.3rem;
      background-color:grey;
    }
    button:hover{
      background-color:white;
      color:red;
    }

  }


`;

export default Trains;