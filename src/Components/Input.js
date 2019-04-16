import React from "react";
import styled from "styled-components";
import Proptypes from "prop-types";

const Container = styled.input`
  background-color: ${props => props.theme.bgColor};
  width: 100%;
  height: 35px;
  padding: 0px 15px;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
`;

const Input = ({ className='custom-input',placeholder, required = true, value, onChange, type = 'text' }) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  placeholder: Proptypes.string.isRequired,
  required: Proptypes.bool,
  value:Proptypes.string.isRequired,
  onChange:Proptypes.func.isRequired,
  type:Proptypes.string
};

export default Input;
