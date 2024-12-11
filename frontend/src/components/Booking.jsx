import { useLoaderData } from "react-router-dom";


function Booking() {
  //t will have the data returned to it from the above loader function
  let {data} = useLoaderData();
  console.log(data);

  return <h1>booking details here</h1>;
}

export default Booking;
