# Step 5/6 - The Login Mutation test
### Estimated time: 3 hours

Now it's time to (finally) write the tests for your recently implemented `createUser` mutation. But first, some theory: unlike our simple `Hello` query, this mutation is integrated with database. How should be these tests? Well, some general good practices every test you're going to perform: replace your current `3. run a single test` step with:

+ **Setup the database:** to check if some feature is working, most of the time we need to have a certain state on the database before running the test. In this case, we should only need the user table properly setup, something we should already have by now.
+ **Create an input:** you should create one example of input to run your query/mutation. On this example, it should be those user input fields.
+ **Run the test:** well.... Run the test 🏃.
+ **Check the response:** Given the input and the state of database previously set up, you should check if the response is returned as expected. On a successfull user creation, an id should be generated and the user info should be returned. Check all fields to increase the test completeness.
+ **Check the database after the test:** we should check not only if the return is ok, but also if the user was created on database properly, and all fields are in accordance with the input. Don't forget to also check the password, that should have been hashed.
+ **Clear the database:** we want our tests to be independent, so we can make sure every piece of our lego works and can be properly united on a good system. So, it's important to reset the state of the database after every test. This way, the next one can be clear to run. You can read more about the importance of independant tests on the internet. We should talk about this too.

**NOTE:** don't forget to open a PR with your test.
