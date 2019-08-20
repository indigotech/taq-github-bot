# Step 3 - Tests
### Estimated time: 3 hours

Now it's time to write some tests for the new mutation. it should be easier now that you have everything setup. Remember to test every single scenario you have in mind.

Another important thing to test is something that didn't happen on the previous track (login): the database changes. You should not only test if the return of the mutation is the expected, but also if the database was updated as it should be. For example, if you have 4 users on the database, and you add one more, you should check on your test if there are 5 users after the mutation is called, as well as if all the new user info were properly inserted.

**NOTE:** if you studied integration tests a little bit on the previous steps, you should have seen that one of the most important principles of it is the **independence** of each test. To follow this principle, a good practice is to empty your database data on every test, and setup a state before executing it, if that's the case.

After you write all tests and they are running properly, you can go to next track.
