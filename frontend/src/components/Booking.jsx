import { useLoaderData } from "react-router-dom";
import { styled } from "styled-components";

function Booking() {
  //t will have the data returned to it from the above loader function
  let {data} = useLoaderData();
  console.log(data);

  return(
    <Container>
      {/* <div className="User">
        <h1>Passenger : {data.name}</h1>
        <h2>Contact : {data.email}</h2>
      </div> */}
      <div className="journey">
        <h2 className="details">Train No : {data.train} <span>{data.trainName}</span></h2> 
        <h2>Booked From <br />{data.source}</h2>
        <h2>TO: {data.destination}</h2>
        <h2>Departure: {data.departure}</h2>
        <h2>Arrival : {data.arrival}</h2>
        <h2>Coach : {data.seat}</h2>
        <h2>Seat : {data.seatno}</h2>
      </div>
    </Container>
  )
}

const Container = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
gap: 3rem;
align-items: center;
background-color: #131324;
.User{
  color:white;
  font-size:1.5rem;
}
.journey{
  color:white;
  font-size:1.2rem;
  .details{
    display:flex;
    gap:5rem;
  }
}
`;


export default Booking;
