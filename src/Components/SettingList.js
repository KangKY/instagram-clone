import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Container = styled.ul`
  border-right: ${props => props.theme.boxBorder};
  a {
    color: ${props => props.theme.blackColor}
  }
  flex-grow: 1;
`;

const List = styled.li`

`;

const ELink = styled(Link)`
  border-left: 2px solid transparent;
  display: block;
  font-size: 16px;
  height: 100%;
  line-height: 20px;
  padding: 16px 16px 16px 30px;
  width: calc(100% - 48px);
  &.active {
    border-left:2px solid ${props => props.theme.blackColor};
    font-weight:600;
  }
`;

const SettingList = ({ active }) => {
  return (
    <Container>
      <List>
        <ELink className={active === "edit"? "active":""} to={`/account/edit`}>프로필 편집</ELink>
      </List>
      <List>
        <ELink className={active === "groups"? "active":""} to={`/account/groups`}>그룹 관리</ELink>
      </List>
      <List>
        <ELink className={active === "security"? "active":""} to={`/account/security`}>공개 범위 및 보안</ELink>
      </List>
      <List>
        <ELink className={active === "emails"? "active":""} to={`/account/emails`}>이메일 및 SMS</ELink>
      </List>
    </Container>
  );
};

SettingList.propTypes = {
  active: PropTypes.string
};

export default SettingList;
