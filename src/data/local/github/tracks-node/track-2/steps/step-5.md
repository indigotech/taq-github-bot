# Step 5/5 - Formatting code and conventions
#### Estimated time: 2 hours

So, now that you have properly set up and run your project, let's talk about some nice tools that we use to format our code and also some conventions we have. These are very important subjects when we work as a team, making our work of reading and contributing on projects much easier.

## Lint

Lint is a very powerful tool to inspect code and warn about some possible mistakes. Our projects use either [ESLint](https://eslint.org/) (older projects) or [Biome](https://biomejs.dev/) (newer projects), which are JavaScript linters, both with additional support for TypeScript features as well. If you are not sure which linter to use, please consult with your mentor.

We recommend you install the corresponding VSCode extension to the linter of choice ([ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or [Biome extension](https://marketplace.visualstudio.com/items/?itemName=biomejs.biome)), so that lint errors are shown as you write your code.

## Code formatting

### Biome

If you are using Biome as a linter, it already has built in code formatting features, without the need of any other plugins.

This is the configuration file used in our projects with Biome, in case you want to use the same: [biome.json](https://github.com/indigotech/template-react-web/blob/main/biome.json)

### ESLint and Prettier

When using eslint, [Prettier](https://prettier.io/) is the go to plugin for  code formatting. There is a [VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) that makes it possible to auto-format a file according to preset rules. We highly recommend you install it, if it's not already present on your machine. 

To add prettier in your project as a eslint plugin, please follow [this guide](https://github.com/prettier/eslint-plugin-prettier).

This is the configuration file we use in our projects with Prettier, in case you want to use the same: [.prettiertc.js](https://github.com/indigotech/template-react/blob/master/.prettierrc.js)

## Conventions

Conventions are very important to maintain all projects code more readable for all developers and make the process of switching between projects less painful. We're going to list some of them here, but you will be learning and practicing more of them on code-reviews:

- **Folders and files**: Use `kebab-case` (lowercase characters with words separated by dashes, e.g., `my-folder`).
- **Functions and local variables**: Use `camelCase` (first letter lowercase, subsequent words capitalized, e.g., `myFunction`).
- **TypeScript interfaces, classes, and exported objects**: Use `PascalCase` (similar to camelCase, but the first letter is uppercase, e.g., `MyClass`).
- **Conditional statements**: Always use brackets `{}` with `if` statements, even for single-line conditions, to improve readability.

## Next Steps

1. Add these tools to your project.
2. Review the code you have until now to ensure it follows the conventions and formatting rules.
3. Verify that lint and format errors are detected in real-time in your editor.
4. Open a Pull Request.
