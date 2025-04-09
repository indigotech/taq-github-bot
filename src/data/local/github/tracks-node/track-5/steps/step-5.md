# Step 5/6 - The "create user" test
### Estimated time: 3 hours

Now it's time to (finally) write the tests for your recently implemented endpoint. But first, some theory: unlike our simple `GET /hello`, this endpoint is integrated with database. How should be these tests? Well, some general good practices every test you're going to perform: replace your current `3. run a single test` step with:

+ **Setup the database:** to check if some feature is working, most of the time we need to have a certain state on the database before running the test. In this case, we should only need the user table properly setup, something we should already have by now.
+ **Create an input:** you should create one example of input to run your request. On this example, it should be those user input fields.
+ **Run the test:** well.... Run the test 🏃.
+ **Check the response:** Given the input and the state of database previously set up, you should check if the response is returned as expected. On a successful user creation, an id should be generated and the user info should be returned. Check all fields to increase the test completeness.
+ **Check the database after the test:** we should check not only if the return is ok, but also if the user was created on database properly, and all fields are in accordance with the input. Also, don't forget to check the password, it should be hashed.
+ **Clear the database:** we want our tests to be independent, so we can make sure every piece of our lego works and can be properly united on a good system. So, it's important to reset the state of the database after every test. This way, one test has no influence on other tests. You can read more about the importance of independent tests on the internet. We should talk about this too.

**NOTE:** we have a more detailed doc about good practices of tests ofr our projects, please check it [here](https://www.notion.so/taqtile/Boas-pr-ticas-para-testes-66f8b1e317be4d88bde55604d45f8fe1?pvs=4).

**TIP**: to thoroughly check response bodies, it's best to verify all fields and values. This provides greater confidence that the response isn't missing data or unexpectedly returning information that we shouldn't (like passwords). We recommend using the `expect.to.be.deep.eq()` function from `chai`, as it checks each field and value individually.
