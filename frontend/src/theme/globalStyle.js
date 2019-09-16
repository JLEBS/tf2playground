import { createGlobalStyle } from 'styled-components';
import TF2Main from './../assets/fonts/tf2-build.ttf';
import TF2Secondary from './../assets/fonts/tf2-secondary.ttf';

const TF2FontFaces = createGlobalStyle`
  @font-face{
    font-family: tf2-main;
    src: url(${TF2Main});
  }

  @font-face{
    font-family: tf2-secondary;
    src: url(${TF2Secondary});
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
`
export {GlobalStyle, TF2FontFaces};
