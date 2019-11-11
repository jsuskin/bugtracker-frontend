import { NEW_ISSUE, UPDATE_ISSUE_STATUS } from './types';
import { URL } from '../data/constants';

export const createIssue = issueData => dispatch => {
  fetch(`${URL}/issues`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(issueData)
  })
    .then(res => res.json())
    .then(issue => dispatch({
      type: NEW_ISSUE,
      payload: issue
    })
  );
}

export const updateIssueStatus = issueData => dispatch => {
  // console.log(issueData);
  fetch(`${URL}/issues/${issueData.issueId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      status: issueData.status
    })
  })
    .then(res => res.json())
    .then(issue => dispatch({
      type: UPDATE_ISSUE_STATUS,
      payload: issue
    })
  );
}
