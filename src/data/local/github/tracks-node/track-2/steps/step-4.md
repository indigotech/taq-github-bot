# Step 4/5 - Typescript and Apollo Server
#### Estimated time: 3 hours

In this step you'll have two main tasks: **add Typescript to your project** and use **Apollo Server** to setup GraphQL. 

But first, let's create a new branch. You can call it `feature/apollo-typescript-setup` (but for now on, you're going to choose the branches names 😼).

[Apollo Server](https://www.apollographql.com/docs/apollo-server/) is a nice library that we use to make GraphQL setup much easier. We recommend the tutorial from Apollo, but you can follow one of your choice on the internet if you'd like. There are a bunch of posts like "create a Node GraphQL Server with Apollo and Typescript" or something like that 📝.

To make sure you're done, you should test your server the same way you did on previous step: start it and check if the `hello` query is returning accordingly. After you finish, open a new branch (following our name conventions) and a new Pull Request.

**TIP:** we recommend you to add a script called `dev` on your `package.json`. It will be similar to `start`, but you can use some lib to watch your code and restart the execution right after any changes. This will improve your speed when testing code with minimal modifications. You can find a tutorial for this on the internet. Something to help you research: "watch and reload with node and typescript", "hot reload", "live reload", etc. You can see if it's working by running the script `npm run dev`, changing something on your `hello` query, for example, and check if terminal reloaded the application correcly with that change.

**NOTE:** when you open a PR, you have to select two branches: the "compare", the branch you're working, and the "base", which is the branch you desire to merge yours. Try to choose the "base" branch that allows reviewers to see only the changed code, without showing previous PR changes. Look on the internet for ways to see your branches sketched to help you do this. If you have any difficulties, feel free to ask your tutors, or any Taqtiler 😉.
