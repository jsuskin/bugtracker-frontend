import React, { Component } from 'react';
import Projects from './components/Projects'
import IssueForm from './components/IssueForm'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">deBuggy</h1>
        </header>
        <div className="spacer"></div>
        <div className="content">
          <Projects />
          <IssueForm />
        </div>
      </div>
    );
  }
}

export default App;
