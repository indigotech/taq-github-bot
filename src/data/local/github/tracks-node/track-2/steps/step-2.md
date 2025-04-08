# Step 2/5 - Server setup
#### Estimated time: 3 hours

In this step you'll create a basic **hello-world REST Server**. But before you start, there are some core concepts you need to know in order to understand what's going on on your code. Try to do some research on your own about these topics, but feel free to ask your tutor, or even another Taqtiler, for references, tips and/or clarifications:

1. Client-server architecture
1. HTTP communication
1. REST

When you are comfortable to follow, you can start the project. The goal of this step is to build a new Node project with a simple `GET /hello` request ready.

To call this step done, you must have:

1. A simple node server properly setup
1. A GET endpoint named `/hello` that returns a string, for example: `Hello, world!`
1. Create a script on `package.json` called `start`. For now, it will be `node index.js` (or the name of the entrypoint file you've chosen).
1. Make sure you tested your server running with `npm start` and performed the `hello` request. We recommend you use [Postman](https://www.postman.com/) or a similar app so you can save the requests you're performing. But you can also use `curl` command line if you want.

**NOTE:** Some internet guides will recommend that you use a library (or npm package) to set up your REST server, like `express` or `fastify`. Ask your tutor if there's any library recommended for you at this step, because then you can start training your knowledge in it.
