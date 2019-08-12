In this track, you will implement a login mutation fully integrated with the database. The ideia of [authentication](https://en.wikipedia.org/wiki/Authentication_server) is simple: the user sends a password to prove that he is who he claims, and then the server provides a token that allows him to access some data on future requests.

# Step 1 - The mutation setup
### Estimated time: 30 minutes

Let's start with baby steps, by creating the mutation prototype, with no integration with the dabatase (yet).

Let's call the mutation `Login`. It should receive an e-mail and a password as parameters and return the following structure on body:

```json
{
  "data": {
    "Login": {
      "user": {
        "name": "User Name",
        "email": "User e-mail"
        // More user fields
      },
      "token": "the_token"
    }
  } 
}
```

**NOTE:** you must have noticed that the graphql responses use to have a field `data` on its body, followed by a field with the name of the query/mutation.

For now, you can return the above structure populated with some mock data.
