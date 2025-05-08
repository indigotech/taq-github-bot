# Step 1/1 - User Details Screen
#### Estimated time: 6 hours

The last (but not least) screen is the User Details screen. This screen will shows up when the user clicks in a list item from the User List Screen. 

In this step, you'll implement both frontend and integration 😮. 

After done, your screen should:

- Display the same user data that you asks in Add User Screen
- Get the user data from the server, using the `user(id: Int)` query. Tip: The `user's id` should be retrieved from the selected user in the User List Screen.
- If the `user(id: Int)` query return the data properly, it should be displayed in the screen. Otherwise, it should shows the incoming error message from server.

**NOTE:** At this point, you might be having some thoughts like "Why are we performing a request to get user info if we have this info on the list?" or "Why don't we use the info on the list to populate this new page?" 🤔 (or something like that). If you're not, think about it for some time.

<details><summary>Check our reflections below:</summary>
<p>

+ The first reason to proceed this way is the difference in information we need on each page. On the list, we only have 2 fields (name and email), while on user details we need much more. So, using GraphQL in our favor, we can request only these 2 fields on the list and save some mobile data for the user.

+ In most apps, you can reach a given page in different ways, right? A Facebook post can be accessed through your timeline or even a push notification. For that reason, it's not a good practice to rely always on the previous page data. We should be prepared to fetch the information given just an identifier.

</p>
</details>
