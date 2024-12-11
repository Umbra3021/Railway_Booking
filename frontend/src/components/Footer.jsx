import React from "react";
import styled from "styled-components";
// import "./Footer.css";

const Footer = () => {
  return (
    <Wrapper>
      <h4>2024 TCKT. All rights reserved.</h4>
      <h4> Contact Us | About Us</h4>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  background-color: #0c0c16;
  color: white;
  padding: 2rem;
  min-height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
`;
