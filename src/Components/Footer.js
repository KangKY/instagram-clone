import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content:space-between;
  font-weight: 600;
  font-size: 12px;
  margin:50px 0px;
  text-transform:uppercase;
  position:relative;
`;

const List = styled.ul`
    display:flex;
    align-items:center;
`;

const ListItem = styled.li`
    &:not(:last-child) {
        margin-right:16px;
    }
`;

const Link = styled.a`
    color: ${props=>props.theme.darkBlueColor};
`;

const Copyright = styled.span`
    color: ${props=>props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
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
    <Copyright>
        &copy;{new Date().getFullYear()} INSTAGRAM
    </Copyright>
  </Footer>
);
