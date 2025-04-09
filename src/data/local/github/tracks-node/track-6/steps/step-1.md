# Step 1/5 - The login endpoint setup

### Estimated time: 1 hour

In this track, you will implement a login endpoint fully integrated with the database. There are many ways to implement [authentication](https://en.wikipedia.org/wiki/Authentication_server). Our approach is as follows: the user provides a password to verify their identity, and the server then issues a token granting access to specific data in subsequent requests. This token typically has an expiration period, after which the user must log in again to obtain a new one.

This new endpoint will be `POST /auth`. It should receive an e-mail and a password on the request body and, in case of success, return the following structure:

```json
{
  "user": {
    "id": 12,
    "name": "User Name",
    "email": "user@email.com",
    "birthDate": "1990-04-25"
  },
  "token": "the_token"
}
```

For now, you can return the above structure directly on your code populated with some mock data.
