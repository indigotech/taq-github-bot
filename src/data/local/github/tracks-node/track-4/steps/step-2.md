# Step 2/4 - Integrating with the database

### Estimated time: 3 hours

Now you're going to fully integrate the Login mutation with the database. Since we don't have a mutation to create users (yet), we should create one directly on the database, so we have the conditions to test it properly.

**NOTE:** One of the required data to create a user is the password. You should have read or heard already that storing users password as plain text in the database is a bad idea. If not, you're reading now: it **is** a bad idea 🤦‍. The minimum security we should have on this case is to use a hash algorithm to store the password. This is not a 100% secure method, but it helps already. Interested in this security matter? Check [this post](https://itnext.io/how-not-to-store-passwords-4955569e6e84) for additional details. Since this is only an onboard server, you don't need to have a ultra-master-blaster security method. Our main goal here is to show you some levels of security and prevent you from beginning your projects with an ultra-master-blaster insecure method.

After creating an user, you should implement your mutation as follows:

1. Get the input e-mail received on the mutation and try to find one on database.
1. Check if the given password is correct. Remember that, in order to compare them properly, the input password should be submitted to the same process of transformation that the ones stored on Database, right?
1. If the e-mail can be found on the database and the password is valid, return the user info and a token. For now, the token can be only an empty string. You're going to implement it on next step.
