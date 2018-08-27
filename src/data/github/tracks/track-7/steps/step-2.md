## Integration
To get the user info, make a request consuming this endpoint: 
```
GET https://tq-template-server-sample.herokuapp.com/users/{id}
```
Where `{id}` should be replaced with the id of the user (without the `{}`). An example:
```
GET https://tq-template-server-sample.herokuapp.com/users/1
```
**Note**: Don't use the data received from the list! Get the user data from the endpoint above.