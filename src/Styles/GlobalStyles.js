import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    * {
        box-sizing:border-box;
    }
    body {
        background-color:${props=>props.theme.bgColor};
        color:${props=>props.theme.blackColor};
        font-size:14px;
    }
    a {
        color:${props=>props.theme.blueColor};
        text-decoration:none;
    }

`