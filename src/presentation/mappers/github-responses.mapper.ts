// import { GithubIssue, GithubUser, GitHubIssueComment, GithubPullRequest } from '../models/github-responses.model';
// import { get } from 'lodash';

// export function mapIssue(probotContext): GithubIssue {
//   return Object.assign({}, get(probotContext, 'payload.issue')) // It makes a shallow copy of JSON values. For deep copy, use JSON.parse(JSON.stringify(user))
// }

// export function mapIssueComment(probotContext): GitHubIssueComment {
//   return Object.assign({}, get(probotContext, 'payload.comment'))
// }

// export function mapUser(probotContext): GithubUser {
//   return Object.assign({}, get(probotContext, 'payload.sender'));
// }

// export function mapPullRequest(probotContext): GithubPullRequest {
//   const pr = get(probotContext, 'payload.pull_request');
//   return JSON.parse(JSON.stringify(pr));
// }
