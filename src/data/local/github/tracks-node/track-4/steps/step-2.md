# Step 2/4 - Integrate with the database
### Estimated time: 2 hours

After creating the mutation prototype, it's time to integrate it with the database. For the given input, create a new user entity and save it on database. Then, return created user. Note that you can set TypeORM to create the primary key automatically, meaning you can return the user with its id already created.

You can check on TablePlus (or other software of your choice) if the user was properly created on database.

**NOTE:** any operation on database is an async task. This means that you should finish the mutation and return only when you're sure that the user was created on database. If you're not comfortable with the concept of Promises, we suggest you take some time to read about it.
