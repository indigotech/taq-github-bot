# Step 3 - The test 🤓

### Estimated time: 3 hours

This is another super-important concept on the process of building your own server. Have you ever stopped to think about how you would test if your code works? 🤔
If you thought about performing the query/mutation on one of those applications (browser, graphiql, graphql playground) and checking if it works as expected, that's one way of doing it. But we have a more solid proposal: writing more code for tests! The principle is simple: you give an entrance and check if the response is the expected. Why is it better? Well, some advantages:

1. The time gain: you write your test once, and then you can run it whenever you want.
1. While you develop other features, you can keep running the tests for all the previous implemented queries/mutation to make sure they are still working.
1. Test codes can serve as a kind of documentation as well. People who read them are able to know all the particular scenarios of a query/mutation.

If you search on the Internet, you'll find out there are many ways to test a code. Depending on the project, people decide to use one, or several of them. Here, we're going to write `Integration tests`. For each query/mutation of your server, you're going to setup the database for them, provide some input scenarios, and then check if the response is given as expected.

Let's talk about another libraries (we use a lot of them!) that helps us to test our code: [mocha](https://mochajs.org/), for test setup; [chai](https://www.chaijs.com/), for the assetions; and [supertest](https://github.com/visionmedia/supertest), to simulate a server running.

Your task now is to install these libraries and write one test for your recently implemented Login mutation. Some important things to have on mind:

1. You can either create an instance of your server with `supertest`, or just create an agent and send requests to your `localhost:3000/`. If the second option is chosen, you should run your server along with the tests.
1. Remember how you connected your server with the database? We said at the time about having a second container for tests with docker. That's right, we're going to use a second database for the tests, so we don't interfere with our normal database on the process. Before actually running your tests, you should connect with this test dabatase, just like you did when running the server locally.
1. Try to write a test script on `package.json`, so you can just run `npm run test` on terminal to perform them.
1. Your test should predict as much scenarios as possible. In case of the Login mutation, some examples are:
  1. "Success case": an existing e-mail with the right password is given to the system.
  1. "Wrong password": the input has a valid existing e-mail, but the password is not right.
  1. "User not found": e-mail sent on input is not present on database.
  1. "E-mail with invalid format": e-mail sent on input has an invalid format.
