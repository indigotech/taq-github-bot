## Step 2 - Add User Screen Integration
#### Estimated time: 3 hours

After you create the frontend, it's time to send this data to the server for creating the user. 

The mutation used to create an user is the `UserCreate` mutation. Docs in Documentation Explorer.

When this integration is done, your screen should:
- Navigates to the User List page if the user create **request has succeded**
- Shows the incoming server error message on screen if the **request fails**
