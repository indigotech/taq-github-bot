# Step 2/5 - Other library: supertest
### Estimated time: 1 hour

Another of those cool libraries is [supertest](https://github.com/visionmedia/supertest). This library is makes our work of performing requests to our server easier. Take a look at their docs.

Now, let's increment our step-by-step for the test execution:

1. Start the server
1. Run a single test

In order to acomplish this new first step, your task is to:

1. Install the library
2. Change your code to start the server `before(() => {})` (🤣) beginning the test
2. Use the `request` function of `supertest` to communicate with the server you just started. You can use the `localhost:port` for this.
3. Try to perform your previously implemented `Hello` query, from the `graphql-yoga` setup. For now, just check if it's working with `console.log`

**NOTE:** you can open a pull request after this step, so we can check if your setup is going ok for now.
