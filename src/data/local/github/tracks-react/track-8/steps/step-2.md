# Step 2/4 - Planning our components
#### Estimated time: 10 minutes

So, as promised, let's present our suggestions. First, we'd like to show [this document](https://docs.google.com/document/d/15aOg3uPWiQCetvrB107Yjj7m9fM11iS8_8ZVqAigjtk/edit), which is a nice Frontend guide and it has some conventions we adopt on our projects. It was not given to you on previous step on purpose, so you could think on your own. Based on it, we can answer the quesitons of the previous step:

> 1. What components can be extracted?

The way we thought about it, basically 3 components, as shown on the image below: **H1** (Header1 - text component), **Form field** and **button**.

![Suggestions](https://raw.githubusercontent.com/indigotech/taq-github-bot/master/images/screens-suggestion.jpg)

> 2. Why we should extract them?

Two of the most important reasons:

+ We avoid possible code repetition on all places the component is used
+ If some change is necessary, you can submit it on the component (if that's the case), and it will be propagated on all screens that it's used. So only one place on the code would require changes.

> 3. What attributes each of these components will contain?

There's not only one answer for this either. But, as general rule, a component can contain:

1. **Style attibutes**: sizes, formats, colors, margins, and every other style attribute that should look the same on all occurrences of the component.
2. **Behaviour attibutes**: interactions, different states, animations, etc.

So, for the components of question 1:

+ **H1**: we can put inside the component the font family, size, weight (normal, bold, semi-bold, etc...) and color.
+ **Button**: the style of the label, background color, borders, and also some behaviours, such as the state when clicked or loading.
+ **Form**: we may consider that the form is a component made of sub-components. For the form of the example, these sub-components are the textfield to enter text, the label above it and a possible caption for errors, below the textfield. Each of these sub-components can have its own attributes.
