# Step 6/6 - Error handling
### Estimated time: 2 hours

Now it's time to make our `LoginMutation` as complete as possibile, and for that we're going to predict and treat some possible errors. Take some time to think about what are the possible errors that can happen on this operation, and how your server should proceed on each of them. And after that, take a look at our scenarios:

1. The client sends on e-mai field something random that is not an e-mail
1. The client sends an e-mail that doesn't exist on our database
1. The client sends an existing e-mail but the password is wrong

There are more possibilities but these 3 are enought for the onboard. What do you think we should do on these scenarios? Well, if you thought about returning something on the `errors` field, that is indeed a good approach. You should be able to research and find how you can treat errors when you find one on your code, but it's basically throwing an error and treating it on a proper function that the `graphql-yoga` library receives on the server setup.

But how should we return these errors to the client? Well, there are multiple solutions to that, but we have a suggestion:

```ts
{
  code: number;  // Conveniently equal to the HTTP Status Code 
  message: string;  // Message to describe the error
  additionalInfo?: string;   // Additional info, generally good for the client developer to know more of what happened
  // ... GraphQL default fields
}
```

Your task now is:

1. Implement the `formatError` function.
1. Crete a Typescript interface to represent how your error object will look like. You can follow our suggestion.
1. Create a class that extends `Error` and receives the `code`, the `message`, and optionally, the `additionalInfo`.
1. When you identify the erros on the scenarios described above, throw an error of this class you created with the proper info.
1. Now, create one additional test for your `LoginMutation` with those 3 (or more) scenarios, checking if the return is as expected.
