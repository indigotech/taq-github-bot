# Step 4/5 - Typescript and Apollo Server
#### Estimated time: 3 hours

In this step you'll have two main tasks: **add Typescript to your project** and use **Apollo Server** to setup GraphQL. 

But first, let's create a new branch. You can call it `feature/apollo-typescript-setup` (but for now on, you're going to choose the branches names 😼).

[Apollo Server](https://www.apollographql.com/docs/apollo-server/) is a nice library that we use to make GraphQL setup much easier. We recommend the tutorial from Apollo, but you can follow one of your choice on the internet if you'd like. There are a bunch of posts like "create a Node GraphQL Server with Apollo and Typescript" or something like that 📝.

After the tutorial and setup, adapt your `index.ts` to have the `hello` query as the previous step had, and then you can remove the `js` code. Make sure that the `start` script is working and that you can use the `hello` query on the Apollo sandbox tool.

**TIP:** we recommend you to add a script called `dev` on your `package.json`. It will be similar to `start`, but you can use some lib to watch your code and restart the execution right after any changes. This will improve your speed when testing code with minimal modifications. You can find a tutorial for this on the internet. Something to help you research: "watch and reload with node and typescript", "hot reload", "live reload", etc. You can see if it's working by running the script `npm run dev`, changing something on your `hello` query, for example, and check if terminal reloaded the application correcly with that change.

After this, open a new pull request.

**NOTE:** when you open a PR, you have to select two branches: the "compare", the branch you're working, and the "base", which is the branch you desire to merge yours. Try to choose the base branch that allows reviewers to see only the changed code of the current branch (in this case, `feature/apollo-typescript-setup`) without showing previous PR changes. Look on the internet for ways to see your branches sketched (your local git tree) to help you do this. Also, we have a [complete documentation](https://www.notion.so/taqtile/Git-flow-rebase-para-iniciantes-fed6d98c2fba4502a3067d9560234c9f?pvs=4) about our git flow. Check this dos whenever you have doubts about your branches. As always, if you have any difficulties, feel free to ask your tutors, or any Taqtiler 😉.
