# Step 2/3 - Users List Integration
#### Estimated time: 4 hours

Let's get some real data. 

Your task here is to get the real users list from the server.

### Authentication

Every other request except Login demands an authorization token to be made. This is one way of guaranteeing user authentication. Some [reference](https://stackoverflow.com/a/1592572/6789109) if you want to know more.

So, on the next integration tasks, you should add a header on your HTTP Request:

```
Authorization: token_that_you_have_stored
```

### User list request

The GraphQL query used for users list is called `Users`. The query documentation can be found on GraphiQL Document Explorer.

You'll notice that this request returns a particular kind of structure (count, nodes, pageInfo). This is one way of doing **pagination**. You'll explore more about this on next step. For now, send the query with no parameters and show the data returned on `node` field.
