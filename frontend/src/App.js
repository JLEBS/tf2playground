import React, { Component } from 'react';
import AppRouter from './route';
import GlobalStyle from './theme/globalStyle';

class App extends Component {
  render() {
    return (
    <>
      <GlobalStyle/>
      <AppRouter/>
      </>
    );
  }
}

export default App;