# Step 1/2 - User Details Screen
#### Estimated time: 6 hours

The last (but not least) screen is the User Details screen. This screen will shows up when the user clicks in a list item from the User List Screen. 

In this step, you'll implement both frontend and integration 😮. 

After done, your screen should:

- Display the same user data that you asks in Add User Screen
- Get the user data from the server, using the `User(id: Int)` query. Tip: The `user's id` should be retrieved from the selected user in the User List Screen.
- If the `User(id: Int)` query return the data properly, it should be displayed in the screen. Otherwise, it should shows the incoming error message from server.

**NOTE:** at this point, maybe you're having some toughts like "Why are we perfoming a request to get user info if we have this info on the list?", "Why don't we use the info on list to populate this new page?" 🤔 (or something like that). If you're not, think about it for some time.

<details><summary>Check our reflections below:</summary>
<p>

+ The first reason to proceed this way is the difference of information we need on each page. On list, we only have 2 fields (name and e-mail), while on user details we need much more. So, using GraphQL in our favor, we can request only these 2 fields on list, and save some mobile data for the user.

+ In most of apps, you can reach a given page from different ways, right? A Facebook post can be accessed though your timeline, or even a push notification. For that reason it's not a good practice to rely always on the previous page data. We should be prepared to fetch the information given just an identifier.

</p>
</details>
