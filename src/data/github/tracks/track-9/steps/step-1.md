Now that you have your form, it's time to send data to the server. Your task now is to **integrate your app with the server**.

# Task 1 - Integrate the app with the server

We are going to integrate the app with the server by sending the data you've collected in the form and checking the response.

## Endpoint

The endpoint you'll consume is this one:

```bash
POST https://tq-template-server-sample.herokuapp.com/users
```

And the body sent should be as follow:

```ts
{
  name: string;
  password: string;
  email: string;
  role: string;
}
```

**Important**
The role should have one of the following values: `admin`, `user`.

## Behaviour

Your app should behave as follow:

### Before submitting

Your form should not allow the user to submit the creation request if there is an invalid/missing piece of data (i.e missing name, invalid email format, etc).

Following good UX practices, each wrong form should be highlighted and a message should appear below the corresponding form.

### While submitting

In order to avoid submitting more than once, your app should block the submit button and it should show a loading. It can be a full page loading or a button loading.

### After submitting

If the user was successfully created, your app should navigate back to the list and show a success message.

Otherwise, it should remain on the form page and display the message received from the server.