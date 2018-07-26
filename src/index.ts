import { Application, Context } from "probot";
import { GithubEvents } from "data/mappers/github-events";

export = (app: Application) => {
  // Your code here
  app.log('Yay, the app was loaded!');

  app.on(GithubEvents.Issues.Opened, async (context: Context) => {
    app.log('Issue opened!!! :)');
  });
}