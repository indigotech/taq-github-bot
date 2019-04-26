## Challenge - Interceptors
#### Estimated time: 6 hours

At this point, you made some network request right? Do you realize that, for every request we make, we must add the `Authorization Header`?

The Authorization Header, as you could see so far, must be filled with the authentication token in all our request (except the login). So, is there a way to assign this Authorization Header only once in our code, so we don't need to set it explicitly in every request?

A common approach for this problem is to use an **interceptor**, which is a method that is executed before every GraphQL request you make in your app. The Apollo Client, for example, [has support for interceptors](https://www.apollographql.com/docs/react/recipes/authentication.html#Header).

Your task now is to use an interceptor in the library you choose to **set the authentication token only once** in your entire code.