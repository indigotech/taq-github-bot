# Step 1 - User Details Screen

The last (but not least) screen is the User Details screen. This screen will shows up when the user clicks in a list item from the User List Screen. 

In this step, you need to do both frontend and integration 😮. 

After done, your screen should:

- Display the same user data that you asks in Add User Screen
- Get the user data from the server, using the `User(id: Int)` query. Tip: The `user's id` should be retrieved from the selected user in the User List Screen.
- If the `User(id: Int)` query return the data properly, it should be displayed in the screen. Otherwise, it should shows the incoming error message from server.
