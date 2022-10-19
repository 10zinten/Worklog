// const OCR_REPOS_LIST_API = '';
// const REPO_CONTRIBUTORS_LIST_API =
//   'https://api.github.com/repos/{org}/{repo}/contributors';
const axios = require('axios');
const fs = require('fs');

const IGNORE_REPOS = ['prose', 'Santry', 'vscode-spell-checker'];

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

async function getOrgRepos(org) {
  const response = await githubAPI.get(`/orgs/${org}/repos?per_page=100`);
  const repos = response.data.map((repo) => repo.name);
  return repos;
}

async function getRepoContributors(org, repo) {
  const response = await githubAPI.get(`/repos/${org}/${repo}/contributors`);
  const contributors = response.data.map((contributor) => contributor.login);
  return contributors;
}

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

async function main() {
  const org = 'OpenPecha';
  const repos = await getOrgRepos(org);
  const contributors_repos = {};
  const promises = repos.map((repo) => {
    if (IGNORE_REPOS.includes(repo)) {
      return;
    }
    return getRepoContributors(org, repo).then((contributors) => {
      for (const contributor of contributors) {
        if (contributor in contributors_repos) {
          contributors_repos[contributor].push(repo);
        } else {
          contributors_repos[contributor] = [repo];
        }
      }
    });
  });
  await Promise.all(promises);
  storeData(contributors_repos, 'data/contributors_repos.json');
}

main();
