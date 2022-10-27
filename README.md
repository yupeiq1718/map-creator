# Vue 3 template

This template should help get you started developing with Vue 3, TypeScript and Tailwind in Vite. 
The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Goto definition alias](https://marketplace.visualstudio.com/items?itemName=antfu.goto-alias)

## Project Setup

This project requires Node version 16.13 or higher .

### Install Modules
```
yarn install
```

### Run for Development
```
yarn dev
```

### Compiles and minifies for Production
```
yarn build
```

### Preview for Production
```
yarn preview
```

### Lints JavaScript files
```
yarn lint:script
```

### Lints CSS files
```
yarn lint:style
```

## GitHub Flow

### Create a branch
Create a new branch from Master branch when you receive a new issue.

### Make changes
Everytime you do a commit, your message should meet the following rules.
```
<type>[optional scope]: <description>
```
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests
- style: A coding style only changes
- revert: Remove previous commits
- chore: Other changes

### Create a pull request
- Do `git merge master --no-ff` to your branch, and solves the conflicts. 
- Push your branch to Github
- Create a pull request, and waiting for approvals from other reviewers.

### Merge the pull request
- Reviewers can comment or add comments to the pull request. 
- Once your pull request is approved by reviewers, merge your pull request into Master branch.