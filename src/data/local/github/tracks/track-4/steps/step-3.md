# Step 3 - Integrate the app with the server
// TODO: Estimated time



- Sugerir client de graphQL
- Fazer a request que vc fez no step2 no código (com a biblioteca que vc escolheu)

After receiving the response from the server, you should save locally the `token` and the `name`. Use the easiest way to save these data but remember it should persist even if the user quits the application.

Here are a few common options to store these data locally: 
- local database
- local preferences
- local storage.

### Error

If it has returned fail, show the error message sent by the server.

Error response structure:

```
{
    data: null,
    errors: Array of
        {
            name: string;
            original: string;
            message: string;
        }
    ]
}
```

## Behaviour

Your app should behave as follow:

### Before submitting

Your form should not allow the user to submit the login request if there is an invalid/missing piece of data (i.e invalid email format, etc).

Following good UX practices, each wrong input should be highlighted and a message should appear below the corresponding input.

### While submitting

In order to avoid submitting more than once, your app should block the submit button and it should show a loading progress. It can be a full page loading or a button loading.

### After submitting

If the user was successfully logged in, your app should navigate to another page - a "Welcome" page showing the username.

Otherwise, it should remain on the form page and display the message received from the server.


## Test data

user: `admin@taqtile.com`
pass: `1111`



# Step 3 - Challenge: Loading

Add an activity loading indicator in the login screen. 
> TODO: Exemplos com níveis de dificuldade
