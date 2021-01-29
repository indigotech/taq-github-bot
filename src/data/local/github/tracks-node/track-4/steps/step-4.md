# Step 4/4 - Storing the password
### Estimated time: 2 hours

One of the required fields to create a user is the **password**. You should have read or heard already that storing users password as plain text in the database is a bad idea. If not, you're reading now: it **is** a bad idea 🤦‍. The minimum security we should have on this case is to use a hash algorithm to store the password. This is not a 100% secure method, but it helps already.

Change your `createUser` mutation to store the password with a hash algorithm of your choice.

**NOTE:** Want to know more about how to store passwords securely? Check [this post](https://itnext.io/how-not-to-store-passwords-4955569e6e84) for additional details. Since this is only an onboard server, you don't need to have an ultra-master-blaster security method. Our main goal here is to show you some levels of security and prevent you from making those basic security mistakes (like storing the plain-text password, for example).
