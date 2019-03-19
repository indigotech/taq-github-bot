# Step 3 - Integrate the app with the server
#### Estimated time: 4 hours

In the previous step you made a GraphQL query using the GraphiQL tool, right? For this step, we'll make the same query in your project (code time 🎉).

In order to make GraphQL requests, we suggest the [Apollo Client](https://www.apollographql.com/docs/react/), but you can use any library you want.

Once the library is installed, your job is to do the **login mutation** when the user presses the login button (which makes sense 🤔).


## Login screen behaviour
When you finish this step, your login screen should have the following behaviour:

- Your form should not allow the user to submit the login request if there is an invalid/missing piece of data (i.e invalid email format, etc).

- In order to avoid submitting more than once, your app should block the submit button.

### On Login Success
If everything goes well with the login mutation, you should navigate to the User List page. It can be a blank page, since we didn't implement it yet.

### On Login Error
If you get an error with the login mutation, just **show the error message you'll receive from server**.

The error response you'll receive in this case will have the following structure:

```json
{
    "data": null,
    "errors": [
        {
            "name": "string",
            "original": "string",
            "message": "string"
        }
    ]
}
```
