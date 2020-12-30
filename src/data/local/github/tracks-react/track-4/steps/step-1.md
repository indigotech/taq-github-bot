# Step 1/5 - Network Communication
#### Estimated time: 15 minutes

## REST
Network communication is a crucial part of any system nowadays. Here in Taqtile we use a framework called GraphQL, which you'll use thoughout this onboard.

But for now, in order to you understand what's happening under the GraphQL's hood, let's start with the (not so) old fashion way of doing network requests: The Representational State Transfer a.k.a. **REST**.

For this, we'll just make a REST request using a tool called [Postman](https://www.getpostman.com/). It should be installed in your mac already (download [here](https://www.postman.com/downloads/) if it doesn't). You will perform a Login request very similiar to the one you coding in the next steps. Here are the parameters of your request:

+ Method: POST
+ Base URL: https://tq-template-server-sample.herokuapp.com
+ Endpoint: /authenticate 
+ Body:

```JSON
{
	"email": "admin@taqtile.com.br",
	"password": "1234qwer"
}
```

**Note 1:** There's no code in this step! It's just a warming up for you to have some knowledge of what's going on inside the GraphQL. Be patient, young padawan. The code will come (in the next steps btw).

If your request succeed, you'll receive on body a JSON that looks like this:

```JSON
{
    "data": {
        "user": {
            "id": 51,
            "active": true,
            "email": "admin@taqtile.com.br",
            "createdAt": "2018-06-25T23:11:56.472Z",
            "updatedAt": "2019-01-17T15:28:04.567Z",
            "name": "Taqtile Adm",
            "role": "admin"
        },
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6NTF9LCJpYXQiOjE1NTYxMTc2NjgsImV4cCI6MTU1NjEyMTI2OH0.Kha7cfFUCOscXffh8nwj4gdCGDZ0ohHvMtkR2st2bso"
    }
}
```

**Note 2:** The **Postman** is just a suggestion. Feel free to use any other tool to make a REST request.
