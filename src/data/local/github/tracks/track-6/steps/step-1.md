# Step 1 - Add User Screen Frontend (FE)
#### Estimated time: 2 hours

Now, we need an Add User Screen so we can... well... add new user users into our app. 😑

Our screen should have:
- A field for all the properties listed in `UserType` GraphQL type, **except for**:
  - avatarUrl
  - answers
- An 'add user' button
- Fields validation, according to `UserType` GraphQL type.

**NOTE:** following the process of previous tracks, this step contemplates only FE
