# Step 2/3 - Integrate with the database
### Estimated time: 4 hours

After checking the authentication, it's time to fully integrate your mutation with the database. If provided token is valid, the server should validate the given input, and if everything is right, create a user on database. Wait, validate what? 🧐

1. The system should not allow two or more users with the same e-mail
1. The system should not allow a very weak password. Follow these rules:
    + It should have at least 7 characters
    + It should have at least 1 letter and 1 digit.

You can add some validations if you want. For example, minimum and maximum birth date. But the most importants are those two above.

**NOTE:** as we discussed, remember not to save the password as plain text on database. Use at least a good hash algorithm (with salt system, optionally).
