import { NEW_ISSUE } from './types';
import { URL } from '../data/constants';

export const createIssue = issueData => dispatch => {
  console.log('creating issue');
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
