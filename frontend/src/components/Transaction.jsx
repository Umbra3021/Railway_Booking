import { useLoaderData, useNavigation } from "react-router-dom";
import styled from "styled-components";
import "./css/transaction.css";

const TransactionsWrapper = styled.section`
  min-height: 20vh;
  padding: 2rem 0; /* Adjusts spacing above and below */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  margin: 0 auto;
  padding: 1rem;
  overflow-y: auto;
`;

function Trans() {
  const data = useLoaderData();
  const nav = useNavigation();

  if (nav.state === "loading") {
    return <h1>Loading...</h1>;
  }

  const data2 = data.data || [];
  const transactionItems = data2.map((item, index) => (
    <div key={index} className="transaction-item">
      <div>
        <h2>Train Name:</h2>
        <p>{item.trainName}</p>
        <h2>Train Number:</h2>
        <p>{item.train}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Source:</th>
            <th>Destination:</th>
            <th>Seat:</th>
            <th>Date:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{item.source}</td>
            <td>{item.destination}</td>
            <td>
              {item.seatno}  {item.coach}
            </td>
            <td>{item.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ));

  return (
    <TransactionsWrapper>
      <h1>Transactions</h1>
      <TransactionContainer>{transactionItems}</TransactionContainer>
    </TransactionsWrapper>
  );
}

export default Trans;
