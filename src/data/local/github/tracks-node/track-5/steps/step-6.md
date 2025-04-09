# Step 6/6 - Error handling
### Estimated time: 2 hours

Now it's time to make our `POST /users` request as complete as possible with the promised error handling. For that, we're going to predict and treat some possible errors. Let's take those cases we already predicted before:

1. The client sends an e-mail that already exists on our database
1. The client sends a password that doesn't follow the rules of security

As already said, there are more possibilities, but these 2 are ok for the onboard. What do you think we should do on these scenarios?

Well, there are multiple solutions to that, but we have a suggestion. Let's create the following structure for error fields:

```jsonc
{
  "message": "Credenciais inválidas. Por favor, reveja.",  // Clear message to the final user that describes the error
  "code": "USR_01",                                        // Specific code for the clients to identify the error
  "details": "Password should have min length of 6"        // Additional info (optional), generally good for the client developer to know more of what happened
}
```

Do you agree that this sctructure can be returned after any error in any endpoint? Yes, that's a good practice, because clients will know exactly the strcture an error will return if we garantee that it always return with this schema.

You should be able to research and find how you can treat errors when you find one on your code, but it's basically throwing an error and treating it the right way. For REST servers, there's generally a way to collect errors on a central function that can treat all of them, which is very convinient.

**IMPORTANT:** Another very important information that a good REST server returns on this type of errors is the [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status). Try to set this code according to the situation. For example: if the client sends a weak password, we should return 400 (Bad Request).

Your task now is:

1. Create an error stucture that you can pass the information of the schema above.
1. When you identify the errors on the scenarios described above, throw an error of this new structure.
1. Now, create additional test cases for your `POST /users` with those 2 (or more) scenarios, checking if the returned error is as expected.
