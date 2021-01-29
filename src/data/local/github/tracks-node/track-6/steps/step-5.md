# Step 5/5 - The authentication
### Estimated time: 2 hours

Now that you have a login mutation, let's explore the **authentication**. We're going to change the `createUser` mutation to be authenticated. This means that only authenticated users will be able to use this mutation. To check if a user is allowed to perform this operation, as you must imagine, we should receive and validate a JWT token. If it was properly signed by the system before, then we can execute the mutation code as intended.

Check the `Authorization` header: the client must have sent a JWT token and it should be a valid one. It's important to check if:
  + It **is** a JWT token
  + It has all the payload data you designed earlier
  + It's not expired
  + Its signature is correct.

**NOTE:** have in mind that anyone can create a JWT token with any payload data they want (remember [jwt.io](https://jwt.io)?), but only those who have the secret can generate the right signature. Only the server should know this secret.

If the JWT token has any problem, you should return an authentication error with a message.

**TIP:** create one more test case to validate this step, with the proper error checking if no token is sent (or an invalid one).
