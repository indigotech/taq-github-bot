# Step 5/5 - Formatting code and conventions
#### Estimated time: 2 hours

So, now that you have properly setup and run your project, let's talk about some nice tools that we use to format our code and also some conventions we have. These are very important subjects when we work as a team, making our work of reading and contributing on projects much easier.

## Prettier

[Prettier](https://prettier.io/) is a tool that helps us formatting our code. They have a [VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) that makes possible to auto-format a file according to these rules. We highly recommend you install it, if it's not already present on your machine.

This is the [.prettiertc.js](https://github.com/indigotech/template-react/blob/master/.prettierrc.js) we use on our projects, in case you want to copy.

## Lint

Lint is a very powerful tool to inspect code and warn about some possible mistakes. Lints use to be more language-specific. In our projects, we use [eslint](https://eslint.org/), which is a Javascript linter, but sure we have some additional support for Typescript features too. You can follow [this guide](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md) to configure eslint with Typescript. This doc already has a section to add a Prettier plugin as well \O/

We recommend you install [eslint Vscode extions](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), so the lint errors will be shown while you write your code.

This is our [.eslintrc.js](https://github.com/indigotech/template-node/blob/master/.eslintrc.js) presets, in case you want to copy.

## Conventions

Conventions are very important to maintain all projects code more readable for all developers and make the process of switching between projects less painful. We're going to list some of them here, but you will be learning and practicing more of them on code-reviews:

+ We name our folders and files with `kebab-case`: lowercase characters and words combined with a dash (-)
+ We name functions and local variables with `camelCase`: first char lowercase and words combined by the first letter at uppercase
+ We name Typescript interfaces, classes and exported objects with `PascalCase` - it's similar to `camelCase`, but first char is uppercase
+ We don't use `if` without brackets, even if it's a one command only condition. This can avoid some readability problems

Add these tools on your project, check the code you have untill now to follow our conventions, and then open a Pull Request.
