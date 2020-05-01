import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
  font-family: "Roboto,  Helvetica, sans-serif";
  margin: 0;
  padding: 0;
  background: linear-gradient(0deg, rgba(63, 76, 92, 0.7), rgba(63, 76, 92, 0.7)), #0D0D0D;
 }
  .visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
`;
