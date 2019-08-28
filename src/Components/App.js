import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import Routes from "./Routes";
import Footer from "./Footer";
import Header from "./Header";
import FloatingButton from "./FloatingButton";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`

  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  max-width: 935px;
  width: 100%;
  margin: 0 auto 30px;
  padding-top:5rem;
  @media (min-width: 736px) {
    box-sizing: content-box;
    padding: 120px 20px 0;
    width: calc(100% - 40px);
  }
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
            <ContentWrapper>
              <Routes isLoggedIn={isLoggedIn} />
            </ContentWrapper>
            <Footer />
            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
            <FloatingButton />
          </Wrapper>
        </Router>
      </>
    </ThemeProvider>
  );
};
