# Step 1/2 - Add User Screen Frontend (FE)
#### Estimated time: 2 hours

Now, we need an Add User Screen so we can... well... add new users into our app. 😑

Add a button on your users list to navigate to your new `Add User` page. It can be a [FAB - Floating Action Button](https://storage.googleapis.com/spec-host-backup/mio-components%2Fassets%2F1HDsE5gO9XoBBCQordDkSSjZeFGxoLNKY%2Fspecs-fab-placement.png), a [button on the navigation bar](https://i.stack.imgur.com/P3NvN.png), or some other implementation you research on a good internet reference.

Your screen should have:

- A form field for each of the properties that are listed in the `User` GraphQL type

- An `Add user` button

- Field validations, like on your login page, but according to the field type. Examples:
  - Name must be complete: at least 2 words
  - Phone should have only 10~11 digits (considering DDD code)
  - Birth date can have a minimum date and can't be in the future
  - Role should be a fixed set of values, according to the `UserRole` enum

**NOTE:** Following the process of previous tracks, this step contemplates only FE.
