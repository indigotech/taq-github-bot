# Step 6/6 - Error handling
### Estimated time: 2 hours

Now it's time to make our `createUser` mutation as complete as possible with the promised error handling. For that, we're going to predict and treat some possible errors. Let's take those cases we already predicted before:

1. The client sends an e-mail that already exists on our database
1. The client sends a password that doesn't follow the rules of security

As already said, there are more possibilities, but these 2 are ok for the onboard. What do you think we should do on these scenarios besides throwing a generic error?

Well, there are multiple solutions to that, but we have a suggestion. Let's return the following structure on the `errors` field:

```ts
{
  code: number;             // Conveniently equal to the HTTP protocol status code
  message: string;          // Message to describe the error
  additionalInfo?: string;  // Additional info, generally good for the client developer to know more of what happened
  // ... GraphQL default fields
}
```

You should be able to research and find how you can treat errors when you find one on your code, but it's basically throwing an error and treating it on a proper function that the `apollo-server` library receives on the server setup. Check their docs 😝

Your task now is:

1. Implement the error function to change the default error that is returned. Note that the error thrown at the code will not directly be the parameter of the function. Instead, `apollo-server` puts it on o field called `originalError`. You can see it in their docs or test with some logs.
1. Create a class that extends `Error` and receives the `code`, the `message`, and optionally, the `additionalInfo`.
1. When you identify the errors on the scenarios described above, throw an error of this class you created with the proper parameters.
1. Now, create additional test cases for your `createUser` with those 2 (or more) scenarios, checking if the returned error is as expected.
