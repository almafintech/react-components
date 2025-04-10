# @almafintech/react-components

This is a component library for React projects, developed by Almafintech.

## Permissions

To use this package in projects of the same organization, follow this steps:

#### 1. Create Personal Access Token (classic)

To use or manage a package hosted by a package registry, you must use a **personal access token** (classic) with the appropriate scope, and your personal account must have appropriate permissions.

For example:

To download and install packages from a repository, your personal access token (classic) must have the **read:packages** scope, and your user account must have read permission.

[Create a token with read:packages permission and no exipration](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)

#### 2. Create global environment variable called `GITHUB_TOKEN`

Use this command to create the variable on zsh terminal:

```
echo "export GITHUB_TOKEN=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" >> ~/.zshenv
```

#### 3. Create `.npmrc` file in the root

With this content:

```
@almafintech:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Installation

To install this package, run the following command in your terminal:

```
npm install @almafintech/react-components
```

Once installed import the component styles on the root of the project:

```
import "@almafintech/react-components/index.css"
```

## Usage

You can import the components from this library like so:

```
import { Button, Alert } from '@almafintech/react-components';
```

Or individually for better performance:

```
import { Button } from '@almafintech/react-components/Button';
import { Alert } from '@almafintech/react-components/Alert';
```

## Bundling

Bundle the package running:

```
npm run build
```

## Deploy

The deploy is managed automatically by Github Actions when merging to the following branches:

```
["main", "next", "beta"]
```

## How to commit?

It's extremely important to follow this guidelines when committing new changes to the repo for proper versioning of the package.

This repo uses [Commitizen](https://github.com/commitizen/cz-cli), it's a package that structures commits with a certain format for [Semantic Release](https://github.com/semantic-release/semantic-release) to understand them and infer the package version automatically.

This removes the immediate connection between human emotions and version numbers, strictly following the [Semantic Versioning](https://semver.org/) specification and communicating the impact of changes to consumers.

The first step is installing [Commitizen](https://github.com/commitizen/cz-cli) globally:

```
npm install -g commitizen
```

After this, the usual commmit flow would be similar to this example:

```
git add .
npm run commit
git push
```

When running `npm run commit` multiple prompts would be presented in the terminal, read the [Commitizen](https://github.com/commitizen/cz-cli) docs to understand them. The decisions selected in this step will determine the version released, for example:

- When committing a `fix` a patch version would be released, like v0.0.x
- When committing a `feat` a minor version would be released like v0.x.x
- When committing a `perf` with a `BREAKING CHANGE` a major version would be released vx.x.x
