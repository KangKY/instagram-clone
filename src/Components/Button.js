import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";


const Container = styled.button`
    background-color:${props=>props.theme.blueColor};
    border: 1px solid ${props=>props.theme.blueColor};
    border-radius:${props=>props.theme.borderRadius};
    cursor: pointer;
    font-size:14px;
    padding: 7px 0px;
    text-align:center;
    font-weight:600;
    color:#fff;
    width:100%;
`

Button.propTypes = {
    text:PropTypes.string.isRequired
};

export default function Button({ text, onClick}) {
  return (
    <Container onClick={onClick}>{text}</Container>
  )
}
