import React, { Component } from 'react';
import Index from './pages/index';
import AppRouter from './route';

class App extends Component {
  render() {
    return (
      <AppRouter/>
    );
  }
}

export default App;