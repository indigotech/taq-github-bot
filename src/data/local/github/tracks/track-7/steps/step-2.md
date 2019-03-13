## Challenge - Renew the Authentication Token
#### Estimated time: TODO add estimated time

Do you remember about the Authentication Token? Until now, we have used the Authentication Token for authenticate the `user listing`, `user creation` and the `user details` GraphQL requests.

For safety reasons, these tokens have an `expiration time`. It means that your token is valid for some period (defined by the server) and after it, you have to 'login' again in order to get a new token.

That said, your challenge is to **renew the authentication token** when it's expired. Here are some things to consider for this challenge:

- You can't redirect the user to the login screen when the token expires. Instead, you can save the user credentials locally when the user logged in successfully, in the same way you store the authentication token.
- When the authentication token is expired, our server will return the following error:
> TODO: Add the auth token expiration error