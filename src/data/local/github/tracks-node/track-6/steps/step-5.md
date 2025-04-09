# Step 5/5 - The authentication
### Estimated time: 2 hours

Now that you have a login, let's explore the **authentication**. We're going to change the `POST /users` request to be authenticated. This means that only authenticated users will be able to create users. To check if a user is allowed to perform this operation, as you must imagine, we should receive and validate a JWT token. If it was properly signed by the system before, then we can execute the request code as intended.

This type of data (authentication tokens) are usually sent on a header. The most common header is called `Authorization`. Also, the authentication type is also generally sent as a prefix to the token. So the final format of the `Authorization` token should be: `Bearer {{jwt_token}}`. The "Bearer" type is the common type for JWT.

Your task is to check the `Authorization` header: the client must send a `Bearer {{jwt_token}}` Authorization header and it should be a valid one. It's important to check if:
  + The type `Bearer` is present as a prefix
  + It **is** a JWT token
  + It has all the payload data you designed earlier
  + It's not expired
  + Its signature is correct.

You can use a library to help you validate the token. If the JWT token has any problem, you should return an authentication error with a message.
As always, don't forget to update the tests for the `POST /users` endpoint to reflect this scenario.

**NOTE:** bear in mind that anyone can create a JWT token with any payload data they want (remember [jwt.io](https://jwt.io)?), but only those who have the secret can generate the right signature. Only the server should know this secret.
