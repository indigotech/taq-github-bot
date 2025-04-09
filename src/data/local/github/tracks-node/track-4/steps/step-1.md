# Step 1/4 - The create user endpoint

### Estimated time: 1 hour

On this track, you're going to develop an endpoint to create users on database. Let's start with baby steps, by creating the route prototype, with no integration to the dabatase (yet).

The endpoint should be a `POST /users`. It will receive on the request body a object with the schema as this example below:

```json
{
  "name": "User Name",
  "email": "User e-mail",
  "password": "user password",
  "birthDate": "01-01-1990"
}
```

The response body will be a type that is very alike to the request body, with the addition of an `id` field. This will be the primary key of the User table on database.

**NOTE:** make sure that you don't return the password field.

For now, you can just return the input that was given, adding an id with any number mocked.

```json
{
    "id": 1,
    "name": "User Name",
    "email": "User e-mail",
    "birthDate": "01-01-1990"
}
```

**Note 2:** don't forget to open Pull Requests at the end of every step that has some code to be written!
