# Step 1/2 - Add User Screen Frontend (FE)
#### Estimated time: 2 hours

Now, we need an Add User Screen so we can... well... add new user users into our app. 😑

Add a button on your users list to navigate to your new `Add User` page. It can be a [FAB - Floating Action Button](https://storage.googleapis.com/spec-host-backup/mio-components%2Fassets%2F1HDsE5gO9XoBBCQordDkSSjZeFGxoLNKY%2Fspecs-fab-placement.png), a [button on the navigation bar](https://i.stack.imgur.com/P3NvN.png) or some other implementation you research on a good internet reference.

Your screen should have:

- A field for each of the properties that are listed in `UserType` GraphQL type, **except for**:
  - avatarUrl
  - answers

- An `Add user` button

- Fields validation, like on your login page, but according to the field type. Examples:
  - Birth date can have a minimum date and can't be in the future
  - CPF could be validated with the proper algorithm, or at least 11 numbers.

**NOTE:** following the process of previous tracks, this step contemplates only FE
