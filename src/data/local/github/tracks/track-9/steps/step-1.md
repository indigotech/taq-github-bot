# Step 2 - Challenge: edit a user

Add an edit screen to your application. The challenge here is to re-use code as much as possible while keeping things simple.

Remember, it's preferable to unify a code than to copy/paste multiple times, but it's better to duplicate a code than to make it much more complex.

## Endpoint

The endpoint is the same, but using a `PUT` instead. Additionally, the body sent should contain the user's id.

## Behavior

It's very similar to the creation behavior, except that instead of returning to the user list, it should go back to the user detail.
