## Challenge!!!

For security reasons, we generate authentication tokens (in server-side) with a small window of validation (i.e the token is valid for 30min). In order to keep the user logged in, we must renew the token if it's no longer valid.

That said, your bonus task is to implement a general mechanism (which will be used every time you made a request) that is able to **renew your token** when it's necessary.
**Tip**: Search for `web interceptors` in language/technology you are using. 👍 