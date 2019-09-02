# Step 1/1 - The component pattern
#### Estimated time: 4 hours

When talking about software architecture, the word here is **responsability**, or which set of tasks should a single part (component) of your app should handle?

The most used classification of components responsabilities may be the dumb and smart (or presentational and container) components. This classification is commonly called the **container pattern**. 

The main diference between this two component categories is the dumb components doesn't know how to retrieve the data it's presenting.

In a user list page, for example, a dumb (or presentational) component doesn't know if the data is coming from a web request, or from local storage - it doesn't matter for the component - the only responsability of this component is to display a list of users in screen. 

On the other hand, if this same user list component were a smart (or container) component, it (ideally) has the responsability to retrieve the list data and pass this data to a dumb component show it properly on screen.

That being said, your task here is to split the UI components of your **Login** and **Add User** pages into dumb and smart components.

If you want to know more about this component categorization, here are some articles for you:

- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)*
- [How to develop your React superpowers with the Container Pattern](https://medium.freecodecamp.org/react-superpowers-container-pattern-20d664bdae65)

**Note:** This pattern is being rethinked since [React Hooks](https://reactjs.org/docs/hooks-intro.html) were introduced (as stated in the first article). As a recent React feature, we are still using the dumb/smart components in our projects while studying/migrating to (maybe) a new architecture. Anyhow, the component pattern shown here is a widely used pattern in React community and it's worthy to know more about ;)

