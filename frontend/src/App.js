import React, { Component } from 'react';
import AppRouter from './route';
import {GlobalStyle, TF2FontFaces} from './theme/globalStyle';

class App extends Component {
  render() {
    return (
      <>
        <TF2FontFaces/>
        <GlobalStyle/>
        <AppRouter/>
      </>
    );
  }
}

export default App;