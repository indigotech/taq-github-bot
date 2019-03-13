# Step 4 - Authentication Token

Did you notice there was a `token` value inside the login mutation response?
 
This value is the server's **Authentication Token**. Our server uses it (spoiler alert) in most of it's requests to verify if you are logged in or not.

In order to pass this value with the request, it's a common practice to add it inside the **request header**.

As you will use the authentication token for all your request from now, your task is to **set the authentication token**. If you are using the Apollo Client, they have an [example](https://www.apollographql.com/docs/react/recipes/authentication.html#Header) of how setting the request header with the authentication token.