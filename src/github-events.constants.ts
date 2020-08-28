/**
 * Github events which will be listened by Probot
 * https://developer.github.com/v3/activity/events/types/
 */
export const GithubEvents = {
  Installation: {
    Created: 'installation.created',
    Added: 'installation_repositories.added',
  },
  IssueComment: {
    Created: 'issue_comment.created',
  },
  Member: {
    Added: 'member.added',
  },
  // Add more Github events if needed
};
