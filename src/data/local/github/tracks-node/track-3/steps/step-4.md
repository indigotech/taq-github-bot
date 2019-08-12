# Step 4 - Challenge: the token duration
### Estimated time: 2 hours

**NOTE:** some steps on this onboard are classified as "challenges". They are meant to be some additional tasks that add some bonus features, but are not necessarily core of the server. Try not to loose too much time on them 🙃

After implementing the login, you must have noticed that one of the possible parameters for creating a JWT token is the `expiration`. This parameter allows us set an expiration timestamp coded on the token. The challenge consists of:

1. Adding an aditional optional parameter on the Login mutation called `remeberMe`. It's a boolean.
1. If `rememberMe` was sent and its value is `true`, you should increase the expiration of the returned token. 1 week is good for the context.
1. Create a test for this case, evaluating if the token actually has the increased duration.
