# Step 4/4 - Turning theory into code
#### Estimated time: 8 hours

Now that you have the most important and powerful tool we use, let's turn our components of steps 1 and 2 into code!

To do that in a reasonable time, we will focus only on on **Login** and **Add User**, as we did before. Your job is to create some components and use them at both UIs, so you can see all of the thoughts of steps 1 and 2 on action.

Here are some specifications our "design team" is giving to help you build the components. You don't exactly need to follow all the detailed values if you don't want to. Whats's __extremely important__ is to __have__ those scpecs parametrized, as the values as not that important: we design our code to change them easily if necessary.

### H1: 
+ __Text size:__ 24px
+ __Text weigth:__ bold
+ __Color:__ black `#000000`
+ __Margins:__ 20px top, 20px bottom

### Button: 
+ __Text size:__ 16px
+ __Text weigth:__ regular
+ __Background color:__ pick one 😉
+ __Text color:__ black or white (what better the contrast is with the background color)
+ __Height:__ 44px (it's important to have at least 44px so the user can click it comfortably)

You can add some things to this specs if you want, such as borders radius, gradient, icons, etc. Just be careful with the time you're spending on this styling.

### Form
+ __Label on top:__
  + __Text size:__ 12px
  + __Text weigth:__ regular
  + __Color:__ gray `#777777`
  + __Margins:__ 12px bottom
+ __Text field:__
  + __Border:__ 1px (can be full or only on bottom), color gray `#777777`
+ __Caption on bottom:__
  + __Text size:__ 12px
  + __Text weigth:__ regular
  + __Color:__ red (pick one)
  + __Margins:__ 8px top

As the behaviour, your form should have two states:

+ __Normal:__ caption is hidden.
+ __Error:__ caption is shown and the 3 sub-components should be red. On the screens, this state will be triggered when the field is not filled or the condition not satisfied (do you remember track 3, step 2? 😁).

**TIP:** Anytime you implement a component, it's a good practice to test it isolated, so we can make sure it's working properly, including states/behaviours.
