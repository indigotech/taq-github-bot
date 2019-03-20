# Step 2 - Users List Integration
#### Estimated time: 6 hours

Let's get some real data. 

The GraphQL `query` you will use to get the user list is called `Users`. But before we start, did you try to make this request in GraphiQL? If so, you noticed that it throws an authentication error, something like 'You must be logged in'. But we are logged in, didn't we? 🤔

The server throws this error because inside the `Users` query, we didn't include the **authentication token** in it (yes, that token retrieved from the **login mutation** response 😲). The requests which require any kind of authentication is called **authenticated requests.**

It is a common practice to pass this token inside the **request header** and that's how our server expects you passing the authentication token. If you are using the Apollo Client, there is [an example](https://www.apollographql.com/docs/react/recipes/authentication.html#Header) in it's documentation showing how to set the authentication token in the request header.

That said, your task is to **get the user list** from server and show it inside the user list screen.


**Note:** GraphQL has a 'built-in' documentation that can be found on GraphiQL called **Documentation Explorer**. In it, you can find more details about `Users` query, as well as all other GraphQL requests we will made thoughout this tutorial.
