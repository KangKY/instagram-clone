import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  order: 5;
  padding : 20px 0px;
`;

const FooterDiv = styled.div`
  max-width: ${props=>props.theme.maxWidth};
  font-weight: 600;
  font-size: 12px;
  margin: 20px 0px;
  text-transform: uppercase;
  display:flex;
  flex-direction:row;
  margin:0 auto;
  justify-content: space-between;
  @media (max-width: 875px) {
    text-align: center;
    padding: 10px 0px;
    flex-direction: column;
  }
`;

const FooterNav = styled.nav``;

const List = styled.ul`
  display: block;
  flex-grow: 1;
  @media (max-width: 875px) {
    justify-content: center;
    margin: 0 auto;
    max-width: 360px;
  }
`;

const ListItem = styled.li`
  display: inline-block;
  margin-bottom: 7px;
  margin-right: 16px;
  @media (max-width: 875px) {
    font-size:11px;
  }
`;

const Link = styled.a`
  line-height: 1.3;
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <FooterDiv>
      <FooterNav>
        <List>
          <ListItem>
            <Link href="#">INSTAGRAM 정보</Link>
          </ListItem>
          <ListItem>
            <Link href="#">지원</Link>
          </ListItem>
          <ListItem>
            <Link href="#">홍보 센터</Link>
          </ListItem>
          <ListItem>
            <Link href="#">API</Link>
          </ListItem>
          <ListItem>
            <Link href="#">채용 정보</Link>
          </ListItem>
          <ListItem>
            <Link href="#">개인정보처리방침</Link>
          </ListItem>
          <ListItem>
            <Link href="#">약관</Link>
          </ListItem>
          <ListItem>
            <Link href="#">디렉터리</Link>
          </ListItem>
          <ListItem>
            <Link href="#">프로필</Link>
          </ListItem>
          <ListItem>
            <Link href="#">해시태그</Link>
          </ListItem>
          <ListItem>
            <Link href="#">언어</Link>
          </ListItem>
        </List>
      </FooterNav>
      <Copyright>&copy;{new Date().getFullYear()} TRIZCORP</Copyright>
    </FooterDiv>
  </Footer>
);
