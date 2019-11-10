import { FETCH_PROJECTS, NEW_PROJECT } from './types';
import { URL } from '../data/constants';

export const fetchProjects = () => dispatch => {
    fetch(`${URL}/projects`)
      .then(res => res.json())
      .then(projects => dispatch({
        type: FETCH_PROJECTS,
        payload: projects
      })
    );
}

export const createProject = projectData => dispatch => {
  fetch(`${URL}/projects`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(projectData)
  })
    .then(res => res.json())
    .then(project => dispatch({
      type: NEW_PROJECT,
      payload: project
    })
  );
}
