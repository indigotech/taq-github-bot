# Step 3/3 - Tests
### Estimated time: 3 hours

Now it's time to write some tests for the new mutation. it should be easier now that you have everything setup. Remember to test every single scenario you have in mind.

Just to remember another important thing to test that didn't happen on the previous track (login): the database changes. You should not only test if the return of the mutation is the expected, but also if the database was updated as it should be. For example, if you have 4 users on the database, and you add one more, you should check on your test if there are 5 users after the mutation is called, as well as if all the new user info were properly inserted.

After you write all tests and they are running properly, you can open a PR and go to next track.
