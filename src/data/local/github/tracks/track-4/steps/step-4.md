# Step 4 - Local Storage
#### Estimated time: 1 hour

Did you notice there was a `token` value inside the login mutation response?
 
This value is the server's **Authentication Token**. Our server uses it (spoiler alert) in most of it's requests to verify if you are logged in or not.

Your task now is to **store** the authentication token **locally** that is inside your app or the web browser. 

We have a few options to store some data locally:
- [Local Storage or Session Storage](https://www.robinwieruch.de/local-storage-react/)
- [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage)
- [Android SharedPreferences](https://developer.android.com/training/data-storage/shared-preferences)
- [iOS NsUserDefaults](https://www.hackingwithswift.com/example-code/system/how-to-save-user-settings-using-userdefaults)

These options differ depending on the platform (iOS, Android, Web), the framework used and (for some cases) how long does the data keep stored. Choose which one you think will fit best for storing the authentication token.