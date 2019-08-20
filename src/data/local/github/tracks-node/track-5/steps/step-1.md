# Step 1 - The query
### Estimated time: 2 hours

This is the first query you're going to implement on the project. After logging in and creating user, now it's time to provide a query for fetching a user information. Some details:

1. **Query Name:** `User`
1. **Parameter:** a user id
1. **Response:** a user type. If you created a type to return a user on the previous track, you can reuse it. If not, create a GraphQL type with all user info that can be returned.

Unlike the previous tracks, now you're going to write the query prototype and integrate with the database already.

**NOTE:** think about the database fields you're going to return when creating the `User` GraphQL type. You wouldn't return, for example, the password hash, right? 👀

**NOTE:** don't forget to predict error cases. In this query, the most obvious one is an invalid user id.
