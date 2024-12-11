import styled from "styled-components";
import "./css/tickets.css";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";


function Ticket() {

  useEffect(() =>{
    
  })

  let {data} = useLoaderData();
   console.log(data);
  return (
    <Wrapper>
      <h3>Your seat has been booked!!</h3>
      <h1>Ticket details:</h1>

      <div className="destination">
        <h2>From </h2>
        <p>{data.source}</p>
        <h2>To </h2>
        <p>{data.destination}</p>
      </div>
      <table>
        <tr>
          <th>Seat No.</th>
          <th>Departure</th>
          <th>Arrival</th>
          <th>Train Name</th>
          <th>Class</th>
        </tr>
        <tr>
          <td>{data.seatno}</td>
          <td>{data.departure}</td>
          <td>{data.arrival}</td>
          <td>{data.trainName}</td>
          <td>{data.seat}</td>
        </tr>
      </table>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  table {
    min-width: 50rem;
    padding:0 5rem;
  }

  th {
    color: red;
  }

  td {
    text-align: center;
    padding: 0 1.5rem;
  }

  .destination {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-width: 25rem;
    h2 {
      font-size: 2rem;
      color: red;
    }
    p {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
`;

export default Ticket;
