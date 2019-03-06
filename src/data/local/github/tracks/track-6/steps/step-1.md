# Step 1 - Add User Screen Frontend
#### Estimated time: 2 hours

Now, we need an Add User Screen so we can... well... add new user users into our app. 😑

Our screen should have:
- A field for all the properties listed in `UserType` GraphQL type, **except for**:
  - avatarUrl
  - answers
- An 'add user' button
- Fields validation, according to `UserType` GraphQL type.


**Note:** Later on, we'll create an User Detail Screen and it's a common practice to reuse some UI components of Detail screen in Create screen. So think if is possible, in your app, to create the same UI for both detail and create user screen.