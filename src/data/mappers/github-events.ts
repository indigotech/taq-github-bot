/**
 * Github events which will be listened by Probot
 * https://developer.github.com/v3/activity/events/types/
 */
export const GithubEvents = {
  Installation: {
    Created: 'installation.created'
  },

  Issues: {
    Opened: 'issues.opened',
    Reopened: 'issues.reopened',
    Edited: 'issues.edited',
    Closed: 'issues.closed',
  },

  IssueComment: {
    Created: 'issue_comment.created',
  },

  PullRequest: {
    Opened: 'pull_request.opened',
  }

  //Add more Github events if needed
}
