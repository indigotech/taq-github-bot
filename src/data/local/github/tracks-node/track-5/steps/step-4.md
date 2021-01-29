# Step 4/6 - Database and environments
### Estimated time: 1 hour

Now we're going to include the database on our tests. After all, we should test if our queries will be returning what is on the database correctly, and if our mutations are changing the database accordingly. 

Do you remember we talked about setting up 2 containers because we were going to use 2 databases? Yeah, the north remembers 🐺! As a preparation for this step, you're going to setup 2 environments: the one you're already using to develop with `npm start` and one additional to run the tests. Do some research about the importance of having separate environments on our development workflow. We will talk about it on our meetings too.

One way of handling separate environments is to use **environment variables**. They are variables that can be set for each environment, so when we start our server on that environment, we use the specific values for it. We could have as environment variables, for example, our database host, user, url, etc... 

Your task now is to set some environment variables to connect with the right database for each environment: `localhost` and `test`. Create a `.env` and a `test.env` file to store the values of these variables. This [package](https://www.npmjs.com/package/dotenv) can help you on reading the right file depending on the environment you're running.

Now, our step-by-step for the tests is incremented again:

1. Connect to database (the test one)
1. Start the server
1. Run the "Hello" query test

**NOTE:** remember that previous note about async tasks and Promises? Here's another example that we should use it properly, because **before** start running the tests (not that joke again), you should verify:
- if the connection with the database is finished successfully
- if server is successfully running and listening to port X. 
After it all, you can run the tests.
