# Step 1/5 - The mutation setup
### Estimated time: 1 hour

In this track, you will implement a login mutation fully integrated with the database. There are many ways of implementing an [authentication](https://en.wikipedia.org/wiki/Authentication_server). The way we're doing it is: the user sends a password to prove that he is who he claims, and then the server provides a token that allows him to access some data on future requests. This token generally have an expiration, after which the user has to login again to get a new one. 

This new mutation can be called `login`. It should receive an e-mail and a password as parameters and, in case of success, return the following structure on body:

```json
{
  "data": {
    "login": {
      "user": {
        "id": 12,
        "name": "User Name",
        "email": "User e-mail",
        "birthDate": "04-25-1990",
      },
      "token": "the_token"
    }
  } 
}
```

For now, you can return the above structure directly on your code populated with some mock data.

**NOTE:** as a good practice, we recommend you create (or update) tests for this mutation after every step. This will help you create the right scenarios. Also, don't forget to open Pull Requests with the mutation and test codes.
