import React, { Component } from 'react';

const row = (
  <tr>
    <th scope="row">1</th>
    <td>Scalinator</td>
    <td>Some error</td>
  </tr>
)

class Projects extends Component {

  render() {
    return (
      <div className="projects">
        <table className="projects-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Project</th>
              <th>Issue Summary</th>
            </tr>
          </thead>
          <tbody>
            {row}
          </tbody>
        </table>
      </div>
    );
  }

}

export default Projects;
