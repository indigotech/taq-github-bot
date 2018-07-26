/**
 * Github REST API v3 responses.
 * https://developer.github.com/v3/activity/events/types/
 */

export interface GithubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  body: string;
}

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
  organizations_url: string;
  repos_url: string;
  type: UserType;
  site_admin: boolean;
}

export type UserType = 'User'; //TODO: Add GitHub user types

export interface GitHubIssueComment {
  id: number;
  body: string;
  url: string;
  issue_url: string;
  created_at: string;
  updated_at: string;
}

export interface GithubLabel {
  id: number;
  url: string;
  name: string;
  color: string; // Color in hex code
  default: boolean;
}

export interface GithubPullRequest {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  url: string;
  labels: GithubLabel[];
}
