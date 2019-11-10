import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProjects, createProject } from '../actions/projectActions';
import { createIssue } from '../actions/issueActions';

class IssueForm extends Component {
  state = {
    projectTitle: '',
    issueSummary: '',
    expectedOutput: '',
    actualOutput: '',
    status: 'Open',
    projectId: ''
  }

  componentDidMount() {
    this.props.fetchProjects();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.newProject) {
      this.props.projects.push(nextProps.newProject)
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const findProject = this.props.projects.find(p => Object.values(p).includes(this.state.projectTitle));
    let projectId = findProject ? findProject.id : null;
    if(!findProject) {
      this.props.createProject({ title: this.state.projectTitle });
      projectId = this.props.projects[this.props.projects.length - 1].id + 1;
    }
    this.props.createIssue({
      summary: this.state.issueSummary,
      expected_output: this.state.expectedOutput,
      actual_output: this.state.actualOutput,
      status: this.state.status,
      project_id: projectId
    });
  }

  render() {
    return (
      <div className="issue-form">
        <h2 className="add-issue-header">Add Issue</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-inputs">
            <div className="form-input">
              <label>Project Title</label><br />
              <input type="text" name="projectTitle" value={this.state.projectTitle} onChange={this.handleChange} />
            </div>
            <div className="form-input">
              <label>Issue Summary</label><br />
              <textarea name="issueSummary" value={this.state.issueSummary} onChange={this.handleChange} />
            </div>
            <div className="form-input">
              <label>Expected Output</label><br />
              <textarea name="expectedOutput" value={this.state.expectedOutput} onChange={this.handleChange} />
            </div>
            <div className="form-input">
              <label>Actual Output</label><br />
              <textarea name="actualOutput" value={this.state.actualOutput} onChange={this.handleChange} />
            </div>
          </div>
          <br />
          <br />
          <div className="submit-issue">
            <button type="submit" id="submit-issue">Add Issue</button>
          </div>
        </form>
      </div>
    );
  }
}

IssueForm.propTypes = {
  createIssue: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
  newProject: PropTypes.object,
  newIssue: PropTypes.object
}

const mapStateToProps = state => ({
  // `projects` fm reducers/index.js
  projects: state.projects.items,
  newProject: state.projects.item,
  newIssue: state.issues.item
})

export default connect(mapStateToProps, { fetchProjects, createProject, createIssue })(IssueForm);
