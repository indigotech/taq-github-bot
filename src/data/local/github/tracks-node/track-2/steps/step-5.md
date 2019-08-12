# Step 5 - Adding the database
### Estimated time: 2 hours

The features of your server are about a simplified [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) of users, right? So, to have these users stored, we need a database. Let's add the database setup on it! 🎉

## Creating the database containers

We use [Docker](https://www.docker.com/) to create containers on our machines and have a database to work locally while developing. We use to create 2 containers: one database for running server locally, and one for using it for the tests. Yeah, you will write tests (SPOILER!).

1. Install docker and check on the internet what is `docker-compose` and how to use it to add database containers.
1. Create your `docker-compose.yml` on the root of your repository. You can use [this](https://gist.github.com/alanraso/8341faa973918392d55e39a7b323209a) as an inspiration if you want.
1. Run `$ docker-compose up -d` on terminal to mount your containers.

**NOTE:** everytime docker stops running, you will need to run it again. If you want to stop them yourself, you can use `$ docker-compose stop`.

## Connecting and using the database

We use a pretty cool library here to connect and manipulate the database. It's called [typeorm](https://typeorm.io/#/). It helps us to operate with the database in a very simple way. But again: this doesn't decrease the importance of knowing about relational database and SQL. On the contrary (you should remember what uncle Ben said)!

1. Take some time to learn how this library works. It's super cool, but it's also a lot of abstraction.
1. Follow their docs add it to your project (remember that we're using postgres).
1. Choose an option provided by typeorm to connect to your database. The credentials are the ones you set on `docker-compose.yml`.
1. Try to connect with database before running the yoga `start` code. For now, you can connect only with your **local** database, leaving the test connection for later.

**NOTE:** don't forget to check if your docker container is running before connecting to the DB, otherwise it will fail.

Another useful tool to check if things are going well with the database is [Tableplus](https://tableplus.io/) app. You can connect on your database from it, check and/or manipulate all the tables, rows and columns.

## Creating your first entity

After successfully connecting to database, it's time to see it working by creating your first entity. Guess what? It will be table called `users`!

1. Check on typeorm docs how to create your entity.
1. After creating the table, try creating a row (an user 🙆‍). You can do this either coding or directly on Tableplus, whatever you prefer.

**NOTE:** After all the dabatase setup, don't forget to open a pull request on another branch for people to review your code.
