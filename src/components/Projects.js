import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/projectActions'

class Projects extends Component {
  state = {
    value: ''
  }

  componentDidMount() {
    this.props.fetchProjects();
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleCtx = e => {
    console.log(e.data);
  }

  render() {
    const projectOptions = this.props.projects.map(p => <option key={p.id} value={p.title}>{p.title}</option>);
    const selectedProject = this.props.projects.length ? this.props.projects.find(p => p.title === this.state.value) : null;
    const issues = selectedProject ? selectedProject.issues : null;

    return (
      <div>
        <div className="show-project-options">
          <select id="show-project-options" onChange={this.handleChange}>
            <option defaultValue className="select-project-default">Select Project</option>
            {projectOptions}
          </select>
        </div>
        <br />
        <br />
        <table className="issues-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Summary</th>
              <th>Expected Output</th>
              <th>Actual Output</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {issues ? issues.map((issue, idx) => (
              <tr key={issue.id}>
                <th scope="row">{idx + 1}</th>
                <td>{issue.summary}</td>
                <td>{issue.expected_output}</td>
                <td>{issue.actual_output}</td>
                <td id="issue-status" className="disable-text-highlighting">
                  <ContextMenuTrigger id="ctx-menu">
                    {issue.status}
                  </ContextMenuTrigger>

                  <ContextMenu id="ctx-menu">
                    {issue.status === 'Open' ? <MenuItem data={{foo: 'bar'}} onClick={this.handleCtx}>Closed</MenuItem> : <MenuItem data={{foo: 'bar'}} onClick={this.handleCtx}>Open</MenuItem>}
                  </ContextMenu>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
}

Projects.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  // `projects` fm reducers/index.js
  projects: state.projects.items
})

export default connect(mapStateToProps, { fetchProjects })(Projects);
