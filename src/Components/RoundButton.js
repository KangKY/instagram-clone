import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HeartFull, CommentFull } from "./Icons";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s linear;
  svg {
    fill: white;
  }
`;

const Container = styled(Link)`
  background-image: url(${props => props.bg});
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const RoundButton = ({ id, likeCount, commentCount, file }) => (
  <Container to={`/p/${id}`} bg={file.url}>
    <Overlay>
      <Number>
        <HeartFull size={19} />
        <NumberText>{likeCount}</NumberText>
      </Number>
      <Number>
        <CommentFull size={19}/>
        <NumberText>{commentCount}</NumberText>
      </Number>
      <Number />
    </Overlay>
  </Container>
);

RoundButton.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.shape({
    url:PropTypes.string.isRequired
  }).isRequired
};

export default RoundButton;
