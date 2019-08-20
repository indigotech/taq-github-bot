In this track, you will implement a login mutation fully integrated with the database. There are many ways of implementing an [authentication](https://en.wikipedia.org/wiki/Authentication_server). The way we're doing it is: the user sends a password to prove that he is who he claims, and then the server provides a token that allows him to access some data on future requests. This token generally have an expiration, after which the user has to login again to get a new one. 

# Step 1 - The mutation setup
### Estimated time: 1 hour

Let's start with baby steps, by creating the mutation prototype, with no integration with the dabatase (yet).

Let's call the mutation `Login`. It should receive an e-mail and a password as parameters and return the following structure on body:

```json
{
  "data": {
    "Login": {
      "user": {
        "id": "12",
        "name": "User Name",
        "email": "User e-mail",
        "birthDate": "04-25-1990",
        "cpf": "XXXXXXXXXXX",
      },
      "token": "the_token"
    }
  } 
}
```

Your `User` can have other information if you want, but these fields above should be enough.

**Note:** Did you notice that there is a `data` object wrapping the `Login` response? Don't worry, it's the GraphQL response format. It wraps all the successful response data inside the `data` object and all the errors in an `errors` array of objects. You can read more about it [here](https://github.com/graphql/graphql-spec/blob/master/spec/Section%207%20--%20Response.md#data).

For now, you can return the above structure populated with some mock data.
