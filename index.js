const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const constructMessage = () => {
  const pullAuthor = github.context.payload.pull_request.user.login;
  const pullURL = github.context.payload.pull_request.html_url;
  const repoName = github.context.payload.pull_request.base.repo.name;
  return `A Pull Request was posted by ${pullAuthor} on the ${repoName} repo. Check it out at ${pullURL}`;
}

const postMessageToFlow = (message, flow) => {
  axios.post(core.getInput('webhook_url'),
  {
    text: message
  }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      console.log('Success! Posted the message to Flowdock.');
    }
    else {
      console.warn(`We got a weird response... Status: ${response.status}, statusText: ${response.statusText}`);
      core.setFailed(JSON.stringify(response.data));
    }
  }).catch(error => {
    core.setFailed(error.message);
  });
}

try {
  const isDraftPR = github.context.payload.pull_request.draft;

  if (isDraftPR) {
    const reasonString = 'It is a draft PR';
    console.log(`Skipping posting PR, reason: ${reasonString}...`);
  }
  else {
    const messageContent = constructMessage();
    postMessageToFlow(messageContent);
  }
} catch (error) {
  core.setFailed(error.message);
}