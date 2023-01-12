# Step 2/2 - Pagination
#### Estimated time: 6 hours

Now, let's increment your `users` query with a nice feature: pagination. Let's say the clients using your server want to fetch a list of users and there are lots of them on database. It's not a good practice to return too much users on a single request, because generally the client is not interested in using all of them. So, the solution is to offer separated small parts of users, according to some conditions the client sends.

Let's consider our alphabetically ordered list of users. Change the query response type to be of the type below:

+ The users, obviously 🤣
+ The total number of users
+ Some way of knowing if there are users **before** those that just returned
+ Some way of knowing if there are users **after** those that just returned

The client should have the possibility, using optional parameters, to:

+ Skip a certain number of users
+ Choose the amount of users that will return (already implemented on previous step)

In case it's not that clear yet, let's take an example to help: an e-commerce app has to implement a feature of listing all the past orders for a user. The creation team decided that it's going to show, from the most recent to the oldest, the first 10 orders. If the user starts scrolling and reaches some point, 10 more should load. If he/she continues to scroll, 10 more are shown, and so on, until he/she reaches the last order.

In this case, the app should ask the server, in that order:

1. The first 10 orders
1. 10 more orders, skipping 10
1. 10 more orders, skipping 20
(...)

Let's say some user has a total of 35 orders. The steps above would be repeated until the client asks for the last 10 orders (after 30th), in which the server would return the 5 last orders, and the information that are no more orders to be loaded.

If you search on the internet, you're going to find different ways of doing pagination, but in general they follow the rules listed above. You can choose anyway you want to do this, given they are followed.

**NOTE:** as usual, don't forget to write the tests for you query!
