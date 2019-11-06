import React, { Component } from 'react';
import Projects from './components/Projects'
import './App.css';

class App extends Component {
  state = {
    projects: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/projects').then(res => res.json).then(console.log)
  }

  render() {
    return (
      <div className="app">
        <Projects />
      </div>
    );
  }
}

export default App;
