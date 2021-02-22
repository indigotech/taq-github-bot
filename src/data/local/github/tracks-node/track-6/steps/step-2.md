# Step 2/5 - Integrating with the database

### Estimated time: 2 hours

Now you're going to fully integrate the Login mutation with the database. Create a user with the `createUser` mutation so you can test it properly.

1. Get the input e-mail received on the mutation and try to find one on database.
1. Check if the given password is correct. Remember that: in order to compare them properly, the input password should be submitted to the same process of transformation that the ones stored on database, right?
1. If the e-mail can be found on the database and the password is valid, return the user info and a token. For now, the token can be only an empty string. You're going to implement it on next step.

Also, you should consider our "error handling" subject and check for errors. Try to consider all relevant error cases.
