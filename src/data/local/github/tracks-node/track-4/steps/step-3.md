# Step 3/4 - Input validation
### Estimated time: 1 hour

Validating the input is an important part of the job. We have to make sure that the client is sending valid data to be stored, or we could end up having many inconsistencies on database.

1. The system should not allow a weak password. That being said, a valid password for this sample project should have:
  + At least 6 characters
  + At least 1 letter and 1 digit

2. The system should not allow two or more users with the same e-mail

You can add some more validations if you want, like minimum and maximum birth date. But the most important are those two above, and for the onboard, it's enough.

What should happen if any of these validations fail? For now, simply return a string with a clear error message. We will have a dedicated error handling step soon.
