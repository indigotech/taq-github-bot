// import { Application } from "probot";

// export = (app: Application) => {
//   // Your code here
//   app.log('Yay, the app was loaded!')

//   // For more information on building apps:
//   // https://probot.github.io/docs/

//   // To get your app running against GitHub, see:
//   // https://probot.github.io/docs/development/
// }

// export robot => {
//   robot.on(GithubEvents.Installation.Created, async context => {
//     robot.log(context);
//     return undefined;
//   })

//   robot.on(GithubEvents.IssueComment.Created, async context => {
//     const comment = mapIssueComment(context)
//     robot.log(`Issue comment is ${comment.body}`);
//     return undefined;
//   })

//   robot.on(GithubEvents.Issues.Opened, async context => {
//     robot.log(`Issue title is ${mapIssue(context).title}`);
//     return undefined;
//   })

//   robot.on(GithubEvents.PullRequest.Opened, async context => {
//     const pr = mapPullRequest(context);

//     robot.log(`Pull Request title is ${pr.title}`);
//     if (pr.labels.length > 0) {
//       robot.log(`Pull Request labels are ${pr.labels.map(l => l.name).join(', ')}`);
//     }
//     else {
//       robot.log(`There are no labels in pull request ${pr.title}`);
//     }

//     return undefined;
//   })

// }
