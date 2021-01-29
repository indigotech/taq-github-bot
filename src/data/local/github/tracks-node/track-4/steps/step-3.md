# Step 3/4 - Input validation
### Estimated time: 1 hour

Validating the input is an important part of the job. We have to make sure that the client is sending valid data to be stored, or we could end up having many inconsistencies on database.

1. The system should not allow a weak password. That being said, a valid password for our system should have:
  + It should have at least 7 characters
  + It should have at least 1 letter and 1 digit.
1. The system should not allow two or more users with the same e-mail

You can add some more validations if you want, like minimum and maximum birth date. But the most important are those two above, and for the onboard, it's enough.

Since we're using GraphQL, any error thrown on a resolver returns a response with the `errors` field filled. We will have a step later on to discuss about proper "error handling". For now, if any validation doesn't check, you can just throw a generic error with a message.
