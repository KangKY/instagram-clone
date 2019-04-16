import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import Routes from "./Router";
import Footer from "./Footer";
import Header from "./Header";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  max-width: 935px;
  width: 100%;
  margin: 0 auto;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
         
          <Wrapper>
            {isLoggedIn && <Header />}
          
            <Routes isLoggedIn={isLoggedIn} />
            <Footer />
            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
          </Wrapper>
        </Router>
      </>
    </ThemeProvider>
  );
};
