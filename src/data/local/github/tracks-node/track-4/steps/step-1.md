In this track, you will implement a `CreateUser` mutation. This mutation allows **authenticated users** to create other users.

# Step 1 - The authentication
### Estimated time: 2 hours

Let's start by exploring the **authentication**. This mutation is considered an authenticated one, which means that the whoever uses it must be allowed to. The permission is granted by the token we were talking about on last track. 

Create the `CreateUser` mutation prototype and check client authentication (again: without integrating with database, for now). Follow the steps:

1. The prototype: it can be something like this.

```graphql
mutation CreateUser($user: CreateUserInput!) {
  CreateUser(user: $user) {
    // Your return
  }
}
```

2. The input. It can be something like this:

```json
{
  "name": "User Name",
  "email": "User e-mail",
  "birthDate": "04-25-1990",
  "cpf": "XXXXXXXXXXX",
}
```

2. The response: you can return either the created user or only a success message.
3. The first thing your mutation should do after called is checking user authentication. Check the `Authorization` header: the client must have sent a JWT token and it should be a valid one. It's important to check if:
    + It **is** a JWT token
    + It has all the payload data you designed earlier
    + It's not expired
    + Its signature is correct.

**NOTE:** have in mind that anyone can create a JWT token with any payload data they want (remember [jwt.io](https://jwt.io)?), but only those who have the secret can generate the right signature. Only the server should know this secret.

4. If the JWT token has any problem, you should return an authentication error with a message.

If everything is ok with the authentication, you can return a mocked user and go to next step to integrate with database.
