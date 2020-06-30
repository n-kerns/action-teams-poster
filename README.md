# Github Actions Flowdock PR Poster

## Inputs
 * `organization` ***[REQUIRED]***  
   The organization to post the PR message in.
 * `flow` ***[REQUIRED]***  
   The flow to post the message in. If passed as `(SKIP)`, will skip posting the PR.
 * `flowdock_api_token` ***[REQUIRED]***  
   Your API token for flowdock. See https://flowdock.com/account/tokens to obtain yours.

 * `flowdock_user_name` *[OPTIONAL]*  
  The user name of the bot. Make sure to not use any spaces! Defaults to `GitHub_PR_Bot`

## Developing

### Setup
To work on this action, you will need to install [NodeJS v12+](https://nodejs.org/en/download/current/), and run `npm install` in this directory.

You will also need to globally install `ncc` by doing:  
`npm i -g @zeit/ncc`

### Pushing a New Version
Make changes in the root directory `index.js` file.

Once you have made your changes, make sure to compile the version used by the action by running ncc:

`npm run build`

This will output the compiled version in `dist/index.js`, and must be committed + pushed alongside your source file changes.

You then tag your commit by using:  
`git tag -a -m "<Description of Change>" <version tag>`

And push using:

`git push --follow-tags`