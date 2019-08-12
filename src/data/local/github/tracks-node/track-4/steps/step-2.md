# Step 2 - Integrate with the database
### Estimated time: 3 hours

After checking the authentication, it's time to fully integrate your mutation with the database. If the token provided is ok, the server should validate the given input, and if everything is right, create a user on database. Wait, what validations? 🧐

1. The system should not allow two or more users with the same e-mail
1. The system should not allow a very weak password. Follow these rules:
  + It should have at least 7 characters
  + It should have at least 1 letter and 1 digit.

You can add some validations if you want. For example, minimum and maximum birth date. But the most importants are these two above.
