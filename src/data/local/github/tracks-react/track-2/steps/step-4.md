# Step 4/6 - Formatting code and conventions
#### Estimated time: 2 hours

So, now that you have properly setup and run your project, let's talk about some nice tools that we use to format our code and also some conventions we have. These are very important subjects when we work as a team, making our work of reading and contributing on projects much easier.

For this task, you are supposed to apply the following conventions on the basic app that you've created on the last step (rename some files and make sure that most of the files are following prettier and lint rules).

## Lint

Lint is a very powerful tool to inspect code and warn about some possible mistakes. Lints use to be more language-specific. In our projects, we use [eslint](https://eslint.org/). Eslint is a Javascript linter, but sure we have some additional support for Typescript feature too. You can follow [this guide](https://typescript-eslint.io/docs/linting/) to configure eslint with Typescript.

We recommend you install [eslint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), so the lint errors will be shown in real-time for you.

## Prettier

[Prettier](https://prettier.io/) is a tool that helps us formatting our code. It has a lot more options than editorconfig and language-specific formatting rules. They have a [VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) as well that makes possible to auto-format a file according to these rules. We highly recommend you install it, if it's not already installed in your pc.

We generally use prettier in our projects as a plugin for eslint, so code styling becomes something like lint rules. To add prettier in your project as a eslint plugin, please follow [this guide](https://github.com/prettier/eslint-plugin-prettier).

This is the [.prettierrc.js](https://github.com/indigotech/template-react/blob/master/.prettierrc.js) we use on our projects, in case you want to copy.

## Conventions

Conventions are very important to maintain all projects code more readable for all developers and make the process of switching between projects less painful. We're going to list some of them here, but you will be learning and practicing them on code-reviews:

+ We name our folders and files with `kebab-case`: lowercase characters and words combined with a dash (-)
+ We name functions and local variables with `camelCase`: first char lowercase and words combined by the first letter at uppercase
+ We name React components, Typescript interfaces, classes and exported objects with `PascalCase`: similar to `camelCase`, but first char is uppercase
+ We don't use `if` without brackets, even if it's a one command only condition. This can avoid some readability problems

Add these tools on your project, check the code you have untill now to follow our conventions. Also, make sure that if you change something on code that generates a format or lint error, it's detected in real-time on the editor. Then, open a Pull Request.
