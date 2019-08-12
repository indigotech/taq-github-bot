# Step 1 - Integrating with the database

### Estimated time: 4 hours

Now you're going to fully integrate the Login mutation with the database. Since we don't have a mutation to create users (yet), we should create one directly on the database, so we have the conditions to test it properly.

**NOTE:** One of the required data to create a user is the password. You should have read or heard already that storing users password in plain text on database is a bad ideia. If not, you're reading now: it **is** a bad ideia 🤦‍. The minimum security we should have on this case is to use a hash algorithm to store the password. This is not 100% secure method, but it helps already. Interested in this security matter? Check [this post](https://itnext.io/how-not-to-store-passwords-4955569e6e84) for additional details. Since this is only an onboard server, you don't need to have a ultra-master-blaster security method. Our main goal here is to show you the degrees of secutrity, and prevent you from beginning your projects with an ultra-master-blaster insecure method.

After creating a user, you should implement your mutation as follows:

1. Get the input e-mail received on the mutation and try to find one on database.
1. Check if the given password is correct. Remember that you should apply all the layers of security to the input password in oder to compare them correctly.
1. Return the user info and a token, so user can use this token as an `Authorization` header for future requests. You can use a [JWT token](https://jwt.io/introduction/) for that.

On each of these steps, some error may occur. It's important in these cases to provide a good description to the client of went wrong. For example, if the password is wrong, you could return an error message like "Invalid credentials, please check your e-mail and password". 

