# Step 3/3 - Challenge: seed
### Estimated time: 3 hours

**[Spoiler alert]:** your next track is about writing a new endpoint to list users. But in order to do that, you should have users on database, right? Well, you could use your recently implemented `POST /users` to add them. However, this challenge is about presenting you a more efficient method, while you can learn something new: **database seed**.

The idea is to write some code to populate your database, creating an environment to facilitate your next request. Follow the steps:

1. Create a new script on `package.json` and name it `seeds`. Leave it empty, for now.
1. Create a file on a folder of your choice and write some code to add at least 50 users on database. This is going to be your seed script.
1. Think about how you would make it run properly, then return to `package.json` and create your `npm run seeds` command.

**NOTE:** don't forget that you have to connect with the database in order to run the code, right?

You can check on TablePlus (or DBeaver, if you are on a Linux machine) if your script worked.

**NOTE 2:** this is an example of task that we can use the `chore/` prefix on the name of the branch, because it's an auxiliar development task, and not a feature.
