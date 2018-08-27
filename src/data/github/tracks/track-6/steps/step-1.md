Now that you have the UI ready, let's populate with real data from the server. 
In this track, you will **consume a web service** and **authenticate your web requests**

## Consume web service

So, the endpoint to be consumed is this one:

```
GET https://tq-template-server-sample.herokuapp.com/users
```

In this endpoint, you can pass a query param to specify the pagination, like this:

```
https://tq-template-server-sample.herokuapp.com/users?pagination={"page": 0 , "window": 10}
```

Notice that you probably **won't need to construct the endpoint with query params manually**. Generally, you use a **library or native resource** that abstracts these manipulations for you.