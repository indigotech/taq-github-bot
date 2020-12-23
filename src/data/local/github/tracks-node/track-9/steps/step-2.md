# Step 2/3 - Relations on Databases
#### Estimated time: 1 hour

If you thought or researched about **relations**: yes, tha's the way we do it!

You should have realized by now that Postgres is a **relational** SQL database, but until now we haven't explored the "relational" part of it. So, let's learn and practive this core concept of it. When we have more than one table, there's a good chance they are somehow related. Let's take our case as an example: our users now should have the possibility to have addresses associated to them. We can achieve this by creating a new table, let's say: "address", and somehow they should be related, because we have to know what adress corresponds to its user.

We have 3 simlples types of relation: **one-to-one, one-to-many and many-to-many.** Check [this video](https://www.taqcursos.com.br/course/5?videoId=38) for more details about each of these types.

As you should have guessed, the relation we are doing here will be a **one-to-many**: a user can have more than one address, while an address is associated with only one user. After the video, think about what will be the columns of the "user" and "address" tables.

<details>
  <summary>Check out the spoilers below</summary>

  ```txt
  +-------------+--------------+
  |            user            |
  +-------------+--------------+
  | id          | PRIMARY KEY  |
  | name        |              | 
  | email       |              |
  | cpf         |              |
  | birthDate   |              |
  +-------------+--------------+

  +--------------+--------------+
  |          address            |
  +--------------+--------------+
  | id           | PRIMARY KEY  |
  | cep          |              | 
  | street       |              |
  | streetNumber |              |
  | complement   |              |
  | neighborhood |              |
  | city         |              |
  | state        |              |
  | userId       | FOREIGN KEY  |  ----> this is how we know which user this address belongs. The address table has a "foreign key", which is the "primary key" from the "user" table
  +--------------+--------------+
  ```

</details>

For details about how to implement this in our stack (Postgres + TypeORM), you can check [their docs about relations](https://github.com/typeorm/typeorm/blob/master/docs/relations.md). Your task now is:

- Create the "Address" entity
- Implement the relation between "User" and "Address"
- Make sure the relation is working by running some test code and adding a user with at least 2 addresses. Check TablePlus to see the table sctructure working as above.
- Open a Pull Request
