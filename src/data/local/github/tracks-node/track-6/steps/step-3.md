# Step 3/5 - The token
### Estimated time: 2 hours

Now you're going to finish your login returning a proper token instead of an empty string. Take a look at an example of the token you're going to implement:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

This may look like a random string, but this token has a lot of power, because there are some information encoded in it. The server can know only with a token, for example:

1. When it was created
1. When it expires
1. Which user is sending

This is an example of the famous [JWT token](https://jwt.io/). You're going to build this token and return it in your request. [This](https://auth0.com/learn/token-based-authentication-made-easy/) link has some information about token based authentication, jwt tokens and an example of how to implement it on code.

Your task now is to implement a model of JWT tokens for your server and return them on your login. Now that you a have a complete authentication integration, create the tests cases for this endpoint, considering the happy path (successfull login) and the possible input errors.

**NOTE:** generally, the payload of a JWT token only the minimum information for the server to idetify a user. So, for this case, only the user id is necessary.

**NOTE 2:** as a good practice for future requests as well, we recommend creating (or updating) tests alongside the development. This will help you identify the correct scenarios and prevent potential bugs.
