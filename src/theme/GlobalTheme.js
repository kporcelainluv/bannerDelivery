import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
  font-family: "Roboto,  Helvetica, sans-serif";
  margin: 0;
  padding: 0;
  background: linear-gradient(180deg, #2A2A2A 0%, #0D0D0D 100%);
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
