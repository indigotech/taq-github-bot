# Step 5 - Using database's data
### Estimated time: 3 hours

In this step, you'll connect your code with the database and create your first table using only Typescript 😎.

## Connecting with the database

Do we have a library to access our database? Of course we do. For this, we use the [TypeORM](https://typeorm.io/#/) library. It helps us to make database operations (create tables, access data and so on) in a very simple way.

1. Take some time to learn how this library works. It's super cool, but it's also a lot of abstraction.
1. Follow their docs to add it to your project (remember that we're using postgres).
1. Choose an option provided by typeorm to connect to your database. The credentials are the ones you set on `docker-compose.yml`.
1. Try to connect with database before running the yoga `start` code. For now, you can connect only with your **local** database, leaving the test connection for later.

**Note:** don't forget to check if your docker container is running before connecting to the DB, otherwise it will fail.

Now you can ask: "Do they have a tool to manage the data inside the database without code?" Of course we do, young padawan. Actually, we recommend these two apps:
- [Tableplus](https://tableplus.io/)
- [PopSQL](https://popsql.com/)

Feel free to choose one of these above, or any other app you want :D

## Creating your first entity

After successfully connecting TypeORM to your database, it's time to see it working by creating your first table. Guess what? It will be called `User` (we told you so)

1. Check on TypeORM docs how to create a [TypeORM entity](https://github.com/typeorm/typeorm/blob/master/docs/entities.md#what-is-entity)
1. After creating the table, try creating a row (an user 🙆‍). You can do this either coding (it's possible) or directly on Tableplus, whatever you prefer.

**Note 2:** too much for one step? Don't get stuck and feel free to ask anything to any Taqtiler 👍
