import { createGlobalStyle } from "styled-components";

import Roboto from "../assets/Fonts/Roboto-Regular.ttf";

import "react-circular-progressbar/dist/styles.css";

export default createGlobalStyle`

        @font-face {
            font-family: 'Roboto-Regular' ;
            src: url(${Roboto}) format('ttf ');
        }


        *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;   
        }

        body {
            -webkit-font-smoothing: antialiased !important;
            font-family: 'Roboto-Regular', sans-serif;
        }



`;
