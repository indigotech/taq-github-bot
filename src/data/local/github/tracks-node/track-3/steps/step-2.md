# Step 2/4 - Using database's data
### Estimated time: 3 hours

In this step, you'll connect your code with the database and create your first table using only Typescript 😎.

## Connecting with the database

Do we have libraries to access our database? Of course we do. We use ORMs to make our work easier by writing Typescript to perform queries to the database. We'd like you to use the same ORM that is used on the project you're going to work, , so if you don't know yet which ORM you should use, please ask your tutors. Some time ago, our main ORM was [TypeORM](https://typeorm.io/). Now we are more focused on [Prisma](https://www.prisma.io/), but we always keep an eye on the trends so it can even be a third one. Check with tour mentor which one you should use.

1. Take some time to learn how the ORM works. It's super cool, but it's also a lot of abstraction.
1. Follow their docs to add it to your project (remember that we're using postgres).
1. Choose an option provided by ORM to connect to your database. The credentials are the ones you set on `docker-compose.yml`.
1. Try to connect with database before running the apollo-server `start` code. For now, you can connect only with your **local** database, leaving the test connection for later.

**Note:** don't forget to check if your docker container is running before connecting to the DB, otherwise it will fail.

Now you can ask: "Do they have a tool to manage the data inside the database without code?" Of course we do, young padawan. Actually, we recommend these two apps:
- [Tableplus](https://tableplus.io/)
- [DBeaver](https://dbeaver.io/)
- [PopSQL](https://popsql.com/)

Feel free to choose one of these above, or any other app you want :D

## Creating your first entity

After successfully connecting the ORM to your database, it's time to see it working by creating your first table. Guess what? It will be called `User` (we told you so)

1. Check on the ORM docs how to create an table/entity.
1. The user entity should have the following fields: id (primary key), name, email, password and birthDate.
1. After creating the table, try creating a row (an user 🙆‍). You can do this either coding (it's possible) or directly on Tableplus, whatever you prefer.

**Note 2:** too much for one step? Don't get stuck and feel free to ask anything to any Taqtiler 👍

## Open a Pull Request

Now open a pull request for your `feature/setup-database` branch.
