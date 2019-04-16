import React from "react";
import styled, { keyframes } from "styled-components";
import { Pet } from "./Icons";

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;
const Loader = styled.div`
  animation: ${Animation} 0.5s linear infinite;
  width: 100%;
  text-align: center;
`;

export default () => (
  <Loader>
    <Pet size={50} />
  </Loader>
);