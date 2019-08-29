# Step 2/4 - Other library: supertest
### Estimated time: 1 hour

Another of those cool libraries is [supertest](https://github.com/visionmedia/supertest). This library is responsible to make it easier to perform requests to your own server and receive the proper responses. Take a look at their docs.

Now you're going to:
1. Install the library
2. Use the `request` function of `supertest` to have an instance of your server to send queries/mutations. You can do this by either exporting your `GraphQLServer` or pointing to `localhost:port/`, but if you choose this last one, don't forget that you should start the server `before(() => {})` (🤣) running the tests
3. Try to perform your previously implemented `Hello` query. For now, just check if it's working with `console.log`

**NOTE:** you can open a pull request after this step, so we can check if your setup is going ok for now.