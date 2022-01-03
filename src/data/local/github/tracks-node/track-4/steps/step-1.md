# Step 1/4 - The mutation setup
### Estimated time: 1 hour

On this track, you're going to develop a mutation to create users on database. Let's start with baby steps, by creating the mutation prototype, with no integration to the dabatase (yet). The main purpose of this step is to exercise only how to create a mutation, a type and an input type on GraphQL Schema.

Let's call the mutation `createUser`. It will receive an object of the type `UserInput`, which you can call `data`, with the following fields:

```json
{
  "data": {
    "name": "User Name",
    "email": "User e-mail",
    "password": "user password",
    "birthDate": "01-01-1990"
  } 
}
```

The response will be almost the same type as the input, with the addition of an `id` field. This will be the primary key of the User table on database. Also, we shouldn't return `password` field 🔑, but the GraphQL Schema should get it covered for us. Thanks, GraphQL!

**Tip:** make sure to create the resolvers, which is the code that will be executed and the schema, which is the type definition of the GraphQL queries/mutations and input/types.

For now, you can just return the input that was given, adding an id with any number you like.

```json
{
  "data": {
    "createUser": {
      "id": 1,
      "name": "User Name",
      "email": "User e-mail",
      "birthDate": "01-01-1990"
    }
  } 
}
```

**Note:** Did you notice that there is a `data` object wrapping the `createUser` response? Don't worry, it's the GraphQL response format. It wraps all the successful response inside the `data` object and all the errors in an `errors` array of objects. You can read more about it [here](https://github.com/graphql/graphql-spec/blob/master/spec/Section%207%20--%20Response.md#data).

**Note 2:** don't forget to open Pull Requests at the end of every step that has some code to be written!
