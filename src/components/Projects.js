import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/projectActions';
import { updateIssueStatus } from '../actions/issueActions';


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

  handleCtx = (e, data) => {
    // console.log(data.issueId);
    this.props.updateIssueStatus(data);
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
                  {issue.status === 'Open' ? (
                    <>
                      <ContextMenuTrigger id={`issue-status-ctx-menu-${issue.id}`}>
                        {issue.status}
                      </ContextMenuTrigger>
                      <ContextMenu id={`issue-status-ctx-menu-${issue.id}`}>
                        <MenuItem data={{issueId: issue.id, status: 'Closed'}} onClick={this.handleCtx}>Closed</MenuItem>
                      </ContextMenu>
                    </>
                  ) : (
                    <>
                      <ContextMenuTrigger id={`issue-status-ctx-menu-${issue.id}`}>
                        {issue.status}
                      </ContextMenuTrigger>
                      <ContextMenu id={`issue-status-ctx-menu-${issue.id}`}>
                        <MenuItem data={{issueId: issue.id, status: 'Open'}} onClick={this.handleCtx}>Open</MenuItem>
                      </ContextMenu>
                    </>
                  )}
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
  updateIssueStatus: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  // `projects` fm reducers/index.js
  projects: state.projects.items,
  issue: state.issues.item
})

export default connect(mapStateToProps, { fetchProjects, updateIssueStatus })(Projects);
