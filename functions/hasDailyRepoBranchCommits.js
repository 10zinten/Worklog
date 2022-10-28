const axios = require('axios');

exports.handler = async function (event, context) {
  const requestBody = JSON.parse(event.body);
  const response = await axios.get(requestBody.branchCommitsPageUrl);
  const page = response.data;
  if (page.includes('No commits found')) {
    return {
      statusCode: 200,
      body: JSON.stringify({ hasCommits: false }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ hasCommits: true }),
    };
  }
};
