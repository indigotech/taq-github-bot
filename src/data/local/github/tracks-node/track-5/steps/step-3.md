# Step 3 - Challenge: seed
### Estimated time: 3 hours

**[SPOILER]** Your next track is about writing a query to list users. But in order to do that, you should have users on database (and a lot of them), right? Well, you could use your recently implemented mutation `CreateUser` to add them. However, this challenge is about presenting you a more efficient method, while you can learn something new: database seed.

The idea is to write some code to populate your database, creating an environment to facilitate your `Users` query develop. Follow the steps:

1. Create a new script on `package.json` and name it `seeds`. Leave it empty, for now.
1. Create a file and write some code to add at least 50 users on database.
1. Setup the script to run this file. It should connect to database before running.

You can check on TablePlus if your script worked. One thing that can help you with this code is [Faker](https://www.npmjs.com/package/faker): a library that has some cool features to return several kinds of randomic data you want, like names, websites, numbers, sentences, and a lot more.

**NOTE:** this is an example of task that we use the `chore/` prefix on the name of the branch.
