# Step 1/3 - The request
### Estimated time: 2 hours

This is the first GET request you're going to implement on the project. After logging in and creating user, now it's time to provide an endpoint for fetching a user information. Some details:

1. **Route:** `GET /users/:id`
1. **Path parameter:** a user id
1. It must be authenticated
1. **Response:** a user, the same of the `POST /users` route.

Unlike the previous tracks, now you're going to write the request prototype and integrate with the database already.

**NOTE:** don't forget to predict error cases. In this endpoint, the most obvious one is passing an id that is not found on database.
